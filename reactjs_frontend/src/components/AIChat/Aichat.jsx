import React, { useState, useRef, useEffect } from "react";
import Dashnav from "../dashboard/DashboardNav";
import { IoSendSharp } from "react-icons/io5";
import { MdAddToPhotos } from "react-icons/md";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { FaShareFromSquare, FaCopy } from "react-icons/fa6";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useUserAuth } from "../../UserAuth"; // Assuming this hook provides user authentication context
import ContentRenderer from "../MathJaxComponent";

export default function Aichat() {
  const lastMessageRef = useRef(null);
  const fileInputRef = useRef(null);
  const [askMsg, setAskMsg] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState([]);
  const [currentUrl, setCurrentUrl] = useState("");
  const [taskID, setTaskID] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "HI WELCOME BACK TO HERE DASTEK EDU YOU CAN ASK ANY QUESTIONS HERE",
      sender: "server",
    },
  ]);
  const [useLatex, setUseLatex] = useState(false);

  const ws = useRef(null);
  const { user } = useUserAuth(); // Assuming this is how you access the current user

  useEffect(() => {
    // Establish the WebSocket connection
    ws.current = new WebSocket("ws://localhost:5000/chat");

    ws.current.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.current.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      if (messageData.resp == "done") {
        setUseLatex(true);
      } else {
        setMessages((prevMessages) => {
          const lastMessageIndex = prevMessages.length - 1;
          // Check if the last message is from the server
          if (
            lastMessageIndex >= 0 &&
            prevMessages[lastMessageIndex].sender === "server"
          ) {
            // Clone the messages array
            const newMessages = [...prevMessages];
            // Append the new text to the last server message
            newMessages[lastMessageIndex] = {
              ...newMessages[lastMessageIndex],
              text: `${newMessages[lastMessageIndex].text}${messageData.resp}`,
            };
            return newMessages;
          } else {
            // If the last message is not from the server or there are no messages,
            // add a new server message
            return [
              ...prevMessages,
              { text: messageData.resp, sender: "server" },
            ];
          }
        });
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const handleFileChange = async (event) => {
    setFile(event.target.files[0]);
    const imageRef = ref(
      storage,
      `chat_images/${new Date().toISOString()}_${event.target.files[0].name}`
    );
    await uploadBytes(imageRef, event.target.files[0]).then((snapshot) => {
      console.log("Uploaded the image");
    });
    getDownloadURL(imageRef).then((refUrl) => {
      setImageUrl([...imageUrl, refUrl]);
      setCurrentUrl(refUrl);
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const sendMessage = async () => {
    if (inputValue.trim() || file) {
      setUseLatex(false);
      const userMessage = {
        text: inputValue,
        sender: "user",
        img_url: currentUrl,
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      ws.current.send(
        JSON.stringify({
          message: inputValue,
          image_url: currentUrl,
          subject: "general",
        })
      );

      setInputValue(""); // Clear the input field
      setCurrentUrl(""); // Clear the current URL
      setFile(null); // Clear the file
    }
  };

  return (
    <>
      <Dashnav LOGO={true} />
      <div className="h-[74px]"></div>
      <div className="flex flex-col h-[80vh] bg-transparent sticky sm:h-[88vh]">
        <div className="overflow-auto p-3 flex-grow">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-2xl px-4 max-w-[60vw] text-wrap my-5 py-2 ${
                  msg.sender === "user"
                    ? "min-w-[30vw] border-2 bg-green-100 border-black"
                    : "border-2 min-w-[60vw] border-gray-700 bg-gray-100"
                }`}
              >
                {msg.sender === "server" ? (
                  <div className="text-gradient font-bold">{" NextGen :"}</div>
                ) : (
                  <div className="text-gradient font-bold">{"You :"}</div>
                )}
                {msg.img_url && (
                  <img src={msg.img_url} alt="Message Attachment" />
                )}
                {useLatex ? (
                  <ContentRenderer text={msg.text} />
                ) : (
                  <pre
                    style={{
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      overflowX: "hidden",
                    }}
                  >
                    {msg.text}
                  </pre>
                )}
                {msg.sender === "server" &&
                  msg.text !==
                    "HI WELCOME BACK TO HERE DASTEK EDU YOU CAN ASK ANY QUESTIONS HERE" && (
                    <div className="flex gap-x-4 text-gray-700 mt-5">
                      <BiSolidLike size={20} />
                      <BiSolidDislike size={20} />
                      <FaCopy size={20} />
                      <FaShareFromSquare size={20} />
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 flex-none">
          {currentUrl && <img src={currentUrl} alt="Uploaded file preview" />}
          <div className="flex rounded-2xl p-1 border-black border-2 overflow-hidden">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }} // Hide the file input
            />
            <button
              onClick={triggerFileInput}
              className="py-2 px-4 rounded-xl h-10 bg-black text-white font-semibold m-1 text-sm"
            >
              <MdAddToPhotos />
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-2 outline-none"
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-black rounded-2xl text-white px-4 py-2 focus:outline-none"
            >
              <IoSendSharp />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
