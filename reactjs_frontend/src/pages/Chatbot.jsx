import React, { useState, useRef, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { MdAddToPhotos } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";
import { MdCalculate } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { FaShareFromSquare } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa";
import axios from "axios";
import MathJaxComponent from "../components/MathJaxComponent";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const PhotoUploadComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [askMsg, setAskMsg] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [imageurl_2, setImageUrl2] = useState("");
  const [taskID, setTaskID] = useState("");
  const { subject } = useParams();
  const [showAns, setShowAns] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:5000/api/progress/${taskID}`
        );
        if (resp.data["state"] == "SUCCESS") {
          const msgsArr = resp.data["data"];
          msgsArr.shift();
          let str = "";
          msgsArr.map((e) => {
            str += e;
            str += "\n";
          });
          setResponse(str);
          setLoading(false);
          setAskMsg(!askMsg);
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
      setCurrentUrl(refUrl);
      setImageUrl2(refUrl);
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    setShowAns(true);
    setLoading(true);
    setResponse(null);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/start",
        {
          prompt: inputValue,
          img: file,
          uid: subject,
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
      console.error("Error:", error);
      setResponse({ error: "Failed to fetch data" });
    }
  };

  return (
    <div className="container mx-auto p-4 m-8   bg-white shadow ">
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

      <img src={imageurl_2} alt="" />

      {showAns ? <div className="font-bold m-5 text-xl ">Answer: </div> : ""}

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
