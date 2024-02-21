import React, { useRef, useState, useEffect } from "react";
import { IoSend, IoImage } from "react-icons/io5";
import DashboardNav from "./DashboardNav";
import ContentRenderer from "../MathJaxComponent";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const QuestionForm = ({ content }) => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentUrl, setCurrentUrl] = useState("");
  const [useLatex, setUseLatex] = useState(false);
  const [connectionError, setConnectionError] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [content]);

  const connectWebSocket = () => {
    ws.current = new WebSocket("ws://localhost:5000/chat");
    ws.current.onopen = () => {
      console.log("Server Connected");
      setConnectionError("");
    };
    ws.current.onmessage = (e) => {
      const message = JSON.parse(e.data);
      if (message.resp === "done") {
        setUseLatex(true);
      } else {
        setData((data) => `${data ? data : ""}${message.resp}`);
      }
      setIsLoading(false);
    };
    ws.current.onerror = (error) => {
      console.error("Server error:", error);
      setConnectionError("Server encountered an error. Try again later.");
      setIsLoading(false);
    };
    ws.current.onclose = () => {
      console.log("Server Disconnected");
      setConnectionError("Server disconnected. Attempting to reconnect...");
      setTimeout(() => {
        connectWebSocket();
      }, 3000); // Attempt to reconnect after 3 seconds
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      setIsLoading(true);
      setData(null);
      setUseLatex(false);
      const messageData = JSON.stringify({
        message: question,
        image_url: currentUrl,
        subject: content,
      });
      ws.current.send(messageData);
    } else {
      setConnectionError("Not connected to the server. Trying to reconnect...");
      connectWebSocket(); // Attempt to reconnect
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    const imageRef = ref(storage, new Date().toISOString() + "_" + file.name);
    await uploadBytes(imageRef, file).then(() => {
      console.log("Uploaded the image");
    });
    getDownloadURL(imageRef).then((refUrl) => {
      setCurrentUrl(refUrl);
    });
  };

  const handleNewQuestion = () => {
    setQuestion("");
    setData(null);
    setSelectedImage(null);
    setCurrentUrl("");
  };

  return (
    <>
      <DashboardNav />
      <div className="h-[100px]"></div>
      <div className="grid place-items-center">
        <h1 className="text-4xl font-bold mb-4 text-gradient">
          The evolution of 24/7 study starts here
        </h1>
        <p className="mb-4 text-slate-900 font-bold">
          Any question. Any subject. Get instant, step-by-step solutions the
          moment you need them.
        </p>
        {connectionError && <p className="text-red-500">{connectionError}</p>}
      </div>
      <div className="flex flex-col items-center justify-center p-4">
        {currentUrl && <img src={currentUrl} alt="Selected" />}
        <form className="w-full max-w-3xl" onSubmit={handleSubmit}>
          <div className="flex items-center border-2 border-black px-4 py-2 rounded-2xl mb-4">
            <input
              className="appearance-none bg-transparent w-full text-gray-900 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="What's your question?"
              aria-label="Question input"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`flex-shrink-0 ${
                isLoading ? "text-gray-500" : "text-gray-700"
              } py-1 px-2 rounded`}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : <IoSend size={25} />}
            </button>
            <label
              className={`flex-shrink-0 ${
                isLoading ? "text-gray-500" : "text-gray-700"
              } py-1 px-2 rounded cursor-pointer`}
            >
              <IoImage size={25} />
              <input
                type="file"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isLoading}
              />
            </label>
          </div>
          {isLoading && <div className="loader">Loading...</div>}
          {data && (
            <div
              className="data-display bg-gray-200 p-3 rounded-lg"
              style={{ maxWidth: "100%", overflowX: "auto" }}
            >
              {useLatex ? (
                <ContentRenderer text={data} />
              ) : (
                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    overflowX: "hidden",
                  }}
                >
                  {data}
                </pre>
              )}
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default QuestionForm;
