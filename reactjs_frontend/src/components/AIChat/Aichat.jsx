import Dashnav from '../dashboard/DashboardNav'
import React, { useState, useRef } from 'react';
import { IoSendSharp } from "react-icons/io5";
import { MdAddToPhotos } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { FaShareFromSquare } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa";

export default function Aichat() {
  const lastMessageRef = useRef(null);
  const fileInputRef = useRef(null);
  const [askMsg, setAskMsg] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState([]);
  const [currentUrl, setCurrentUrl] = useState("");
  const [taskID, setTaskID] = useState("");
  const [inputValue, setInputValue] = useState("");




    const handleFilechange = (event) => {
      // Handle the file change event
      // You can access the selected files using event.target.files
      setFile(event.target.files[0]);
      console.log(event.target.files);
      // ... additional code to handle the files
   
    };
  
    const triggerFileInput = (event) => {
      // Trigger the file input click event
      fileInputRef.current.click();

    };
  
    const [messages, setMessages] = useState([
      {
        text: "HI WELCOME BACL TO HERE DASTEK EDU YOU CAN ASK ANY QUESTIONS HERES",
        sender: 'server'
      }
    ]);
    // Function to handle the submission of the message
  
    const sendMessage = async () => {
      if (inputValue.trim()) {
        const userMessage = { text: inputValue, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
  
        // Here you would send the message to the server endpoint
        // and wait for the response
        try {
          // const response = await fetch(endpoint, {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify({ message: inputValue }),
          // });
          // const data = await response.json();
  
          // Add server response to chat
          const serverMessage = { text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae laudantium voluptas repellat?", sender: 'server' };
          setMessages((prevMessages) => [...prevMessages, serverMessage]);
        } catch (error) {
          console.error('There was an error sending the message:', error);
        }
  
        setInputValue(''); // Clear the input after sending
      }
    };
  return (
   <>
      <Dashnav LOGO={true} />
      <div className='h-[74px]'></div>
      <div className="flex flex-col h-[80vh] bg-transparent sticky sm:h-[88vh]">
        <div className="overflow-auto p-3 flex-grow">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end  ' : 'justify-start'}`}>
              <div className={`rounded-2xl px-4 max-w-[60vw] text-wrap my-5 py-2  ${msg.sender === 'user' ? ' min-w-[30vw]  border-2 bg-green-100  border-black' : '  border-2 min-w-[60vw]  border-gray-700 bg-gray-100'}`}>
                {
                  msg.sender =='server' ? <div className='text-gradient  font-bold'>{" NextGen :"}</div> : <div className='text-gradient font-bold '>{"You :"}</div>
                }
                {msg.text}
                {
                  (msg.sender === 'server') &&  (msg.text !== 'HI WELCOME BACL TO HERE DASTEK EDU YOU CAN ASK ANY QUESTIONS HERES') &&
                  <div className='flex gap-x-4 text-gray-700 mt-5'>
                    <BiSolidLike size={20} />
                    <BiSolidDislike size={20} />
                    <FaCopy size={20} />
                    <FaShareFromSquare size={20} />
                  </div>

                }
              </div>
            </div>
          ))}
        </div>
        <div className="p-3  flex-none">
          {file && 
            <img src={file}/>
          }
          <div className="flex rounded-2xl  p-1 border-black border-2  overflow-hidden">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFilechange}
              style={{ display: 'none' }} // Hide the file input
              className="block  text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100 m-"
             
            />
            <button
              onClick={triggerFileInput}
              className="py-2 px-4 rounded-xl h-10 bg-black  text-white font-semibold m-1  text-sm"
            >
              <MdAddToPhotos />

            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-2 outline-none"
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
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
  )
}
