import React, { useRef, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import image from "../assets/demo-img.png";
import { MdAddToPhotos } from "react-icons/md";
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { FaCopy, FaShareFromSquare } from "react-icons/fa6";

import { useParams } from "react-router-dom";
import { ref, get, push, set } from "firebase/database";
import {
  ref as sRef,
  getStorage,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../firebase";

export default function IndividualThread() {
  const { threadId } = useParams();
  const username = "";
  const [thread, setThread] = useState({
    id: 0,
    title: "",
    desc: "",
    createdBy: "",
    createdAt: "",
    total_messages: 0,
  });
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [messages, setMessages] = useState([]);

  const fileInputRef = useRef(null);
  const triggerFileInput = () => {
    // Trigger the file input click event
    fileInputRef.current.click();
  };

  // Declare fetchMessages function outside useEffect
  const fetchMessages = async () => {
    try {
      // Reference to the 'messages' node within the specific thread in Firebase Realtime Database
      const messagesRef = ref(db, `threads/${threadId}/messages`);

      // Fetch the messages
      const snapshot = await get(messagesRef);

      const messagesArray = [];
      snapshot.forEach((messageSnapshot) => {
        const messageData = messageSnapshot.val();
        messagesArray.push(messageData);
      });

      // Set the messages array in the component state
      setMessages(messagesArray);
    } catch (error) {
      console.error("Error fetching messages:", error.message);
    }
  };

  useEffect(() => {
    const fetchThread = async () => {
      try {
        // Reference to the specific thread in Firebase Realtime Database
        const threadRef = ref(db, `threads/${threadId}`);

        // Fetch the thread details
        const snapshot = await get(threadRef);
        if (snapshot.exists()) {
          setThread(snapshot.val());
        } else {
          console.log("Thread not found");
        }
      } catch (error) {
        console.error("Error fetching thread details:", error.message);
      }
    };

    // Fetch thread details on component mount
    fetchThread();

    // Fetch messages on component mount and whenever threadId changes
    if (threadId) {
      fetchMessages();
    }
  }, [threadId]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handlePostMessage = async () => {
    if (message != "") {
      try {
        set(
          ref(db, `threads/${threadId}/total_messages`),
          thread.total_messages + 1
        );

        // Reference to the 'messages' node within the specific thread in Firebase Realtime Database
        const messagesRef = ref(db, `threads/${threadId}/messages`);
        // Create a new message object
        const newMessage = {
          msg: message,
          sentBy: "User", // Replace with the actual user information
          timestamp: new Date().toISOString(),
          file: null, // Default value, can be updated if a file is attached
        };

        // Check if a file is attached
        if (file) {
          // Reference to the 'files' node within the specific thread in Firebase Realtime Database
          const filesRef = ref(db, `threads/${threadId}/files`);

          // Generate a unique file name to avoid overwriting existing files
          const fileName = `${Date.now()}_${file.name}`;

          // Reference to the specific file in Firebase Storage
          const fileStorageRef = sRef(getStorage(), fileName);

          // Upload the file to Firebase Storage
          await uploadBytes(fileStorageRef, file);

          // Get the download URL of the uploaded file
          const downloadURL = await getDownloadURL(fileStorageRef);

          // Update the file URL in the message object
          newMessage.file = downloadURL;
          console.log(newMessage.file);
        }

        // Push the new message to the 'messages' node
        const newMessageRef = push(messagesRef);
        await set(newMessageRef, newMessage);

        // Clear the input fields after posting the message
        setMessage("");
        setFile(null);

        // Refresh the messages to display the updated messages
        fetchMessages();
      } catch (error) {
        console.error("Error posting message:", error.message);
      }
      setMessage("");
      setFile(null);
    } else {
      alert("MSG is Empty!");
    }
  };

  return (
    <>
      <Navbar />
      <section className="m-8 border border-gray-60 min-h-screen rounded-2xl p-3  shadow-2xl">
        <div className="border border-gray-500 rounded-lg p-3 border-solid">
          <h1 className=" text-gray-900 font-semibold text-2xl p-1">
            <u className=" font-bold">Question-</u> {thread.title}
          </h1>
          <h2 className="p-3 font-semibold">
            <u className="text-gray-700 font-bold">Description-</u>
            {thread.desc}
          </h2>
          {/* {ThreadInfo.tags.map((tag) => (
            <span
              key={tag}
              className="text p-3 m-3 font-semibold  text-gray-700 bg-blue-50 rounded-lg px-2 mr-2"
            >
              {tag}
            </span>
          ))} */}
          <div>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sentBy === username ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg px-4 py-2 my-1 ${
                    msg.sentBy === "user"
                      ? "bg-black text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <div className="font-semibold uppercase">
                    {msg.sentBy}:-
                    <span className="text-gray-700">{msg.timestamp}</span>
                  </div>
                  <div className="px-3 font-semibold">{msg.msg}</div>
                  <div>
                    <img src={msg.file} alt=" " />
                  </div>
                  {/* {msg.sender !== username &&
                    msg.text !==
                      "HI WELCOME BACL TO HERE DASTEK EDU YOU CAN ASK ANY QUESTIONS HERES" && (
                      <div className="flex gap-x-10 mt-5">
                        <BiSolidLike size={20} />
                        <BiSolidDislike size={20} />
                        <FaCopy size={20} />
                        <FaShareFromSquare size={20} />
                      </div>
                    )} */}
                </div>
              </div>
            ))}
            <div className="flex rounded-lg border-2 sticky border-gray-300 overflow-hidden">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                className="block  text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100 m-"
              />
              <button
                onClick={triggerFileInput}
                className="py-2 px-4 rounded-full h-10 bg-black text-white font-semibold m-1  text-sm"
              >
                <MdAddToPhotos />
              </button>
              <input
                type="text"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                className="w-full p-2 outline-none"
                placeholder="Type a message..."
                onKeyDown={(e) => e.key === "Enter" && handlePostMessage()}
              />
              <button
                onClick={handlePostMessage}
                className=" bg-black text-white px-4 py-2 focus:outline-none"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
