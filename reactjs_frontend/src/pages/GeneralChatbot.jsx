import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import { MdAddToPhotos } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { FaShareFromSquare } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa";
import axios from "axios";
import MathJaxComponent from "../components/MathJaxComponent";
import { useUserAuth } from "../UserAuth";

const ChatComponent = ({ endpoint }) => {
  const lastMessageRef = useRef(null);
  const fileInputRef = useRef(null);
  const [askMsg, setAskMsg] = useState(false);
  const [file, setFile] = useState(null);
  const [filedata, setfiledata] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUrl_2, setImageUrl_2] = useState(null);
  const [taskID, setTaskID] = useState("");
  const { user } = useUserAuth();
  useEffect(() => {
    if (filedata) {
      setImageUrl(URL.createObjectURL(filedata));
      setImageUrl_2(URL.createObjectURL(filedata));
    }
  }, [filedata]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/progress/${taskID}`
        );
        const newMessages = response.data["data"];

        if (newMessages.length > 0) {
          // Find the index of the last known message in the new messages array
          const lastKnownMsgIndex = lastMessageRef.current
            ? newMessages.findIndex((msg) => msg === lastMessageRef.current)
            : -1;

          // Get all messages after the last known message
          const messagesToAdd = newMessages.slice(lastKnownMsgIndex + 1);

          // Filter out "done" and empty messages
          const validMessagesToAdd = messagesToAdd.filter(
            (msg) => msg !== "done" && msg.trim() !== ""
          );

          setMessages((prevMessages) => [
            ...prevMessages,
            ...validMessagesToAdd.map((text) => ({ text, sender: "server" })),
          ]);

          // Update the last message reference
          if (validMessagesToAdd.length > 0) {
            lastMessageRef.current =
              validMessagesToAdd[validMessagesToAdd.length - 1];
          }

          // Stop polling if "done" message is received
          if (messagesToAdd.includes("done")) {
            const { data } = await axios.post("http://localhost:5000/clear", {
              msg: "recv_clear_data",
              task_id: taskID,
            });
            setAskMsg(false);
          }
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    let intervalId;
    if (askMsg) {
      fetchData();
      intervalId = setInterval(fetchData, 5000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [askMsg]);

  const handleFilechange = (event) => {
    setfiledata(event.target.files[0]);
    setFile(event.target.files[0]);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Function to handle the submission of the message

  const sendMessage = async () => {
    if (inputValue.trim()) {
      const userMessage = { image: filedata, text: inputValue, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/start",
          {
            prompt: inputValue,
            img: file,
            uid: user.uid,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (data["task_id"]) {
          setTaskID(data["task_id"]);
          setAskMsg(!askMsg);
        }
      } catch (error) {
        console.error("There was an error sending the message:", error);
      }

      setInputValue("");
      setfiledata("");
      setImageUrl_2("");
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
                <MathJaxComponent content={msg.text} />
                <img src={imageUrl} />
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 bg-white flex-none">
          <img src={imageUrl_2} />
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
