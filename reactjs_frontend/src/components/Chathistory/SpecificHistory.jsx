import Dashnav from '../dashboard/DashboardNav'
import React, { useState, useRef, useEffect } from 'react';
import { IoSendSharp } from "react-icons/io5";
import { MdAddToPhotos } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { FaShareFromSquare } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa";
import { CgProfile } from 'react-icons/cg';

export default function SpecificHistory({activeOption,optionid}){
  const lastMessageRef = useRef(null);
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
 
    const [messages, setMessages] = useState([
      {
        text: "HI WELCOME BACL TO HERE DASTEK EDU YOU CAN ASK ANY QUESTIONS HERES",
        sender: 'server'
      },
      {
        text: "HI WELCOME ACL TO HERE DASTEK EDU YOU CAN ASK ANY QUESTIONS HERES",
        sender: 'user'
      },
      {
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        sender: 'server'
      },
      {
        text: "HI WELCOME ACL TO HERE DASTEK EDU YOU CAN ASK ANY QUESTIONS HERES",
        sender: 'user'
      },
      {
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        sender: 'server'
      },
      {
        text: "HI WELCOME ACL TO HERE DASTEK EDU YOU CAN ASK ANY QUESTIONS HERES",
        sender: 'user'
      },
      {
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        sender: 'server'
      },
      {
        text: "HI WELCOME ACL TO HERE DASTEK EDU YOU CAN ASK ANY QUESTIONS HERES",
        sender: 'user'
      },
      {
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        sender: 'server'
      },
      {
        text: "HI WELCOME ACL TO HERE DASTEK EDU YOU CAN ASK ANY QUESTIONS HERES",
        sender: 'user'
      },
      {
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        sender: 'server'
      },
    ]);
    // Function to handle the submission of the message
//   useEffect(()=>{
//     // use here optionid and perform a fetch operation and store them in messages and we can show them .
//   },[])
   
  return (
   <>
      <Dashnav  />
      <div className='h-[74px]'></div>
      <div className="flex flex-col h-[80vh] bg-transparent sticky sm:h-[88vh]">
        <div className="overflow-auto p-3 mt-10 flex-grow">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`rounded-2xl px-4 py-2 my-5 ${msg.sender === 'user' ? '  border-2 border-black bg-green-100' : '  border-2 border-black bg-gray-200'}`}>
                {
                  (msg.sender === 'server') &&  (msg.text !== 'HI WELCOME BACL TO HERE DASTEK EDU YOU CAN ASK ANY QUESTIONS HERES') &&
                  <div className='text-gradient font-bold text-xl'>NexGen Study :-</div>

                }
                {
                  (msg.sender === 'user')  &&
                  <span className="  transition ease-in duration-300  font-bold  "><span className='flex align-middle justify-start text-gradient font-bold text-xl' > <CgProfile className='m-1 text-black' size={20} />
                  profile</span></span>

                }
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-3  flex-none">
          {file && 
            <img src={file}/>
          }
          
        </div>
      </div>
   </>
  )
}
