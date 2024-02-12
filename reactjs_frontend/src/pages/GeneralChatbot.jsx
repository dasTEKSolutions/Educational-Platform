import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import { MdAddToPhotos } from "react-icons/md";
import axios from "axios";
import MathJaxComponent from "../components/MathJaxComponent";
import { useUserAuth } from "../UserAuth";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ChatComponent = ({ endpoint }) => {
  const lastMessageRef = useRef(null);
  const fileInputRef = useRef(null);
  const [askMsg, setAskMsg] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState([]);
  const [currentUrl, setCurrentUrl] = useState("");
  const [taskID, setTaskID] = useState("");
  const { user } = useUserAuth();
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    // Use the endpoint prop to establish the WebSocket connection
    ws.current = new WebSocket(endpoint);

    ws.current.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.current.onmessage = (event) => {
      const messageData = JSON.parse(event.data);

      setMessages((prevMessages) => {
        // Check if there are any messages and the last message is from the server
        if (
          prevMessages.length > 0 &&
          prevMessages[prevMessages.length - 1].sender === "server"
        ) {
          // Create a new array with all but the last message
          const restOfMessages = prevMessages.slice(0, -1);

          // Copy the last message and append the new text
          const lastMessage = { ...prevMessages[prevMessages.length - 1] };
          lastMessage.text += messageData.resp;

          // Return the new array of messages
          return [...restOfMessages, lastMessage];
        } else {
          // If the last message is not from the server or there are no messages,
          // add a new server message
          return [
            ...prevMessages,
            { text: messageData.resp, sender: "server", image: "" },
          ];
        }
      });
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [endpoint]); // Dependency array includes endpoint to re-establish connection if endpoint changes

  const handleFilechange = async (event) => {
    setFile(event.target.files[0]);
    const imageRef = ref(
      storage,
      new Date().toISOString() + "_" + event.target.files[0].name
    );
    await uploadBytes(imageRef, event.target.files[0]).then((snapshot) => {
      console.log("Uploaded the image");
      console.log(snapshot);
    });
    getDownloadURL(imageRef).then((refUrl) => {
      setImageUrl(...imageUrl, refUrl);
      setCurrentUrl(refUrl);
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const [inputValue, setInputValue] = useState("");

  // Function to handle the submission of the message

  const sendMessage = async () => {
    if (inputValue.trim() || file) {
      const userMessage = {
        image: currentUrl,
        text: inputValue,
        sender: "user",
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      ws.current.send(
        JSON.stringify({
          message: inputValue,
          image_url: currentUrl,
          subject: "general",
        })
      );

      setInputValue("");
      setCurrentUrl("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col h-[80vh] bg-gray-200 sticky sm:h-[88vh]">
        <div className="overflow-auto p-3 flex-grow">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded max-w-[75vw]  ${
                  msg.sender !== "user" ? "min-w-[75vw]" : ""
                } px-4 py-2  ${
                  msg.sender === "user" ? "bg-black text-white" : "bg-white"
                }`}
              >
                {/* {msg.text} */}
                <MathJaxComponent content={msg.text} />
                <img src={msg.image} />
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 bg-white flex-none">
          <img src={currentUrl} />
          <div className="flex rounded-lg border-2 border-gray-300 overflow-hidden">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFilechange}
              style={{ display: "none" }} // Hide the file input
              className="block  text-sm text-gray-500
              file:rounded-full file:border-0
              file:mr-4 file:py-2 file:px-4
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100 m-"
            />
            <button
              onClick={triggerFileInput}
              className=" bg-black text-white px-4 py-2 focus:outline-none"
            >
              <MdAddToPhotos />
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={`w-full p-2 outline-none ${
                inputValue.length > 12 ? "h-[70px]" : ""
              }`}
              placeholder="Type a message..."
              // onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              onClick={sendMessage}
              className=" bg-black text-white px-4 py-2 focus:outline-none"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatComponent;
