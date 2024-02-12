import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdAddToPhotos } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";
import { MdCalculate } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { FaShareFromSquare } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa";
import MathJaxComponent from "../components/MathJaxComponent";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const PhotoUploadComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const ws = useRef(null);
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const { subject } = useParams();

  useEffect(() => {
    // Initialize WebSocket connection
    ws.current = new WebSocket("ws://localhost:5000/chat");
    ws.current.onopen = () => {
      console.log("WebSocket Connected");
    };
    ws.current.onmessage = (e) => {
      const message = JSON.parse(e.data);
      setResponse((response) => `${response ? response : ""}${message.resp}`);
      setLoading(false);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setLoading(false);
    };
    ws.current.onclose = () => console.log("WebSocket Disconnected");

    // Cleanup on component unmount
    return () => {
      ws.current.close();
    };
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      setLoading(true);
      ws.current.send(
        JSON.stringify({
          message: inputValue,
          image_url: imgUrl,
          subject: subject,
        })
      );
    }
  };
  const handleFilechange = async (event) => {
    setFile(event.target.files[0]);
    const imageRef = ref(
      storage,
      new Date().toISOString() + "_" + event.target.files[0].name
    );
    await uploadBytes(imageRef, event.target.files[0]).then((snapshot) => {
      console.log("Uploaded Image");
    });
    getDownloadURL(imageRef).then((refUrl) => {
      setImgUrl(refUrl);
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="container mx-auto p-4 m-8   bg-white shadow ">
      <img src={imgUrl} alt="" />
      <div className="border flex align-middle  justify-around p-1  border-gray-900 rounded-3xl h-16">
        <div className=" border  rounded-lg ">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFilechange}
            style={{ display: "none" }} // Hide the file input
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
        </div>
        <textarea
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className=" h p-3 rounded-3xl outline-none  w-full transition ease-in-out duration-150"
          placeholder="Enter text"
        />

        <button
          onClick={handleSubmit}
          className={`bg-black h-10 m-1 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Loading..." : <IoSendSharp />}
        </button>
      </div>

      <div className="font-bold m-5 text-xl ">Answer: </div>

      <div className="mt-4  p-4 rounded">
        {loading ? (
          <center className="text-gray-800 font-semibold">
            {" "}
            <MdCalculate size={200} />
            {"Loading ...."}
          </center>
        ) : (
          <div className="text-gray-800 font-semibold">
            {response && <MathJaxComponent content={response} />}
            {response && (
              <div className="flex gap-x-10 mt-5">
                <BiSolidLike size={25} />
                <BiSolidDislike size={25} />
                <FaCopy size={25} />
                <FaShareFromSquare size={25} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoUploadComponent;
