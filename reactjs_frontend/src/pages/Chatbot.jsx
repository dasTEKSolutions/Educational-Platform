import React, { useState, useRef } from 'react';
import { MdAddToPhotos } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";
import { MdCalculate } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { FaShareFromSquare } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa";





const PhotoUploadComponent = () => {
    const [inputValue, setInputValue] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const fileInputRef = useRef(null);
    const error = "loading"
    console.log(loading)

    const handleFilechange = (event) => {
        // Handle the file change event
        // You can access the selected files using event.target.files
        console.log(event.target.files);
        // ... additional code to handle the files
    };

    const triggerFileInput = () => {
        // Trigger the file input click event
        fileInputRef.current.click();
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setResponse(null);
        try {
                // Simulated delay for response
            setTimeout(() => {
                
                setResponse("  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat voluptatibus, dignissimos tenetur iusto <br>ipsa rem earum. Totam aspernatur maxime error reiciendis, maiores molestias iure eos tenetur id eligendi, aliquid dolorum minus doloremque suscipit asperiores eum. Optio doloremque architecto non porro, dolore dicta placeat natus tenetur quibusdam saepe quia laborum alias quis odio maiores. Dolorem quidem quis quam, repellat quasi ab magni eos! Voluptas, optio quisquam. Commodi, error vel, recusandae ad id harum velit, non perspiciatis voluptatem reiciendis beatae! Animi exercitationem, officiis sit alias tempora ducimus earum consequatur iure dolor expedita vitae adipisci, maiores nisi maxime molestias autem ex praesentium possimus! Assumenda deleniti quidem illo. Numquam nam fuga dolorem ab voluptate beatae eaque asperiores, eum et ducimus amet, qui odit eos quo.  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat voluptatibus, dignissimos tenetur iusto ipsa rem earum. Totam aspernatur maxime error reiciendis, maiores molestias iure eos tenetur id eligendi, aliquid dolorum minus doloremque suscipit asperiores eum. Optio doloremque architecto non porro, dolore dicta placeat natus tenetur quibusdam saepe quia laborum alias quis odio maiores. Dolorem quidem quis quam, repellat quasi ab magni eos! Voluptas, optio quisquam. Commodi, error vel, recusandae ad id harum velit, non perspiciatis voluptatem reiciendis beatae! Animi exercitationem, officiis sit alias tempora ducimus earum consequatur iure dolor expedita vitae adipisci, maiores nisi maxime molestias autem ex praesentium possimus! Assumenda deleniti quidem illo. Numquam nam fuga dolorem ab voluptate beatae eaque asperiores, eum et ducimus amet, qui odit eos quo.");
                ;
                setLoading(false);
            }, 5000);
        } catch (error) {
            console.error('Error:', error);
            setResponse({ error: 'Failed to fetch data' });
        }
    };

    return (
        <div className="container mx-auto p-4 m-8   bg-white shadow ">
            <div className='border flex align-middle  justify-around p-1  border-gray-900 rounded-3xl h-16'>
            <div className=" border  rounded-lg ">
                   
                   <inputx
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
                       multiple // Remove this if you want only single file selection
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
                    className={`bg-black h-10 m-1 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : <IoSendSharp />}
                </button>
            </div>
            
            <div className='font-bold m-5 text-xl '>Answer: </div>
           
                <div className="mt-4  p-4 rounded">
                        
                        { loading ? <center className="text-gray-800 font-semibold"> <MdCalculate size={200} />{"Loading ...."}</center> : 
                            <p className="text-gray-800 font-semibold">{ response && JSON.stringify(response)} 
                            {response && <div className='flex gap-x-10 mt-5'>
                            <BiSolidLike size={25}/>
                            <BiSolidDislike size={25} />
                            <FaCopy size={25}/>                      
                            <FaShareFromSquare size={25}/>
                            </div>}
                            </p>
                        }
                </div>
        </div>
    );
};

export default PhotoUploadComponent;
