import React, { useRef, useState, useEffect } from "react";
import { HiArrowSmRight } from "react-icons/hi";
import { IoSend, IoImage, IoAttach } from "react-icons/io5";
import DashboardNav from "./DashboardNav";
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { FaCopy, FaShareFromSquare } from "react-icons/fa6";
import ContentRenderer from "../MathJaxComponent";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const QuestionForm = ({ content }) => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [useLatex, setUseLatex] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
    ws.current = new WebSocket("ws://localhost:5000/chat");
    ws.current.onopen = () => {
      console.log("WebSocket Connected");
    };
    ws.current.onmessage = (e) => {
      const message = JSON.parse(e.data);
      if (message.resp === "done") {
        setUseLatex(true);
      }
      setData((data) => `${data ? data : ""}${message.resp}`);
      setIsLoading(false);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsLoading(false);
    };
    ws.current.onclose = () => console.log("WebSocket Disconnected");

    // Cleanup on component unmount
    return () => {
      ws.current.close();
    };
  }, [content]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setData(null);
    setUseLatex(false);
    try {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(
          JSON.stringify({
            message: question,
            image_url: "",
            subject: content,
          })
        );
      }
    } catch (error) {
      console.error("There was an error!", error);
      setIsLoading(false);
    }
  };

  const handleNewQuestion = () => {
    setQuestion("");
    setData(null);
    setSelectedImage(null);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
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
      </div>
      <div className="flex flex-col items-center justify-center p-4">
        <form className="w-[800px] " onSubmit={handleSubmit}>
          <div className="flex items-center  border-2 border-black w-[800px] px- py-1 rounded-2xl mb-4">
            <input
              class="appearance-none bg-transparent  w-full text-gray-900 mr-3 py-1 px-2 leading-tight focus:outline-none h-16 "
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
              } text-md py-1 px-2 rounded`}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : <IoSend size={25} />}
            </button>
            <label
              className={`flex-shrink-0 ${
                isLoading ? "text-gray-500" : "text-gray-700"
              } text-md py-1 px-2 rounded`}
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
                  className={{
                    whiteSpace: "pre-wrap", // Allows the text to wrap
                    wordWrap: "break-word", // Breaks the word to prevent overflow
                    overflowWrap: "break-word", // Ensures overflow text is wrapped
                  }}
                >
                  {data}
                </pre>
              )}
              <div className="flex gap-x-4 text-gray-700 mt-5">
                <BiSolidLike size={20} />
                <BiSolidDislike size={20} />
                <FaCopy size={20} />
                <FaShareFromSquare size={20} />
              </div>
            </div>
          )}
        </form>

        {data && !isLoading && (
          <button
            className="bg-black mt-8 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200  font-medium rounded-full text-sm px-5 py-2.5 text-center text-white"
            onClick={handleNewQuestion}
          >
            <div className="flex items-center justify-center gap-x-3">
              One More Question ? <HiArrowSmRight size={20} />
            </div>
          </button>
        )}
      </div>
    </>
  );
};

export default QuestionForm;
