import React, { useState } from "react";
import { GrSafariOption } from "react-icons/gr";
import Subjechatbot from "../../components/dashboard/Subjectchatbot";
import { Link } from "react-router-dom";
import DashboardNav from "./DashboardNav";
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { FaCopy, FaShareFromSquare } from "react-icons/fa6";

const options = [
  { name: "Maths", content: "maths" },
  { name: "Physics", content: "physics" },
  { name: "Chemistry", content: "chemistry" },
  { name: "Social", content: "social" },
  { name: "English", content: "english" },
  // Add more options as needed
];

const Sidebar = () => {
  const [activeContent, setActiveContent] = useState(options[0].content);
  const [activeOption, setActiveOption] = useState(options[0].name); // Added state to track active option

  return (
    <>
      <div
        className="min-h-[100vh]"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="h-[100px] mb-11"></div>
        <div style={{ width: "20%", borderRight: "1px solid #ccc" }}>
          <div className=" px-[40px] py-[10px] text-3xl font-bold ">
            <Link to="/">
              <h1 className="text  text-slate-900 mt-6 mb-3 mr-10">
                NexGen Study
              </h1>
            </Link>
          </div>
          <div className="text-gradient px-[40px] py-[10px] text-3xl font-bold mb-6 underline">
            Subjects
          </div>
          {options.map((option) => (
            <div
              key={option.name}
              className={`m-[15px] rounded-xl  ${
                activeOption === option.name
                  ? " text-white bg-black  "
                  : "text-black"
              }`} // Conditional styling
              style={{ cursor: "pointer" }}
              onClick={() => {
                setActiveContent(option.content);
                setActiveOption(option.name); // Update active option state
              }}
            >
              <div className="m-3 rounded-lg text-2xl p-1 font-semibold  flex gap-x-2">
                <GrSafariOption className="m-2" size={20} />
                {option.name}
              </div>
            </div>
          ))}
        </div>
        <div style={{ width: "80%", padding: "10px" }}>
          <Subjechatbot content={activeContent} />
          {/* Pass activeContent as a prop */}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
