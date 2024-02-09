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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/progress/${taskID}`
        );
        const newMessages = response.data["data"];
        newMessages.shift();

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
            const { data } = await axios.post(
              "http://localhost:5000/api/clear",
              {
                msg: "recv_clear_data",
                task_id: taskID,
              }
            );
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

  const [messages, setMessages] = useState([]);
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
