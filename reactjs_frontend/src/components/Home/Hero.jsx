import React from "react";
import { HiArrowSmRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  return (
    <>
      <center>
        <div className="rounded-3xl text-lg bg-gray-200 border-2 border-gray-300 shadow-2xl text-black font-semibold m-auto w-[300px]  py-2 z-0 ">
          &#129321; <span className="text-gradient font-bold">10X</span> more
          productivity
        </div>
        <section className=" w-[70vw] m-[40px]">
          <span className="text-[78px] text-black font-bold ">
            Experience the Next Generation of Education{" "}
          </span>
          <br />{" "}
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              "Advanced Learning",
              1000, // wait 1s before replacing "Mice" with "Hamsters"
              "Comprehensive Understanding",
              1000,
              "Strategic Studying",
              1000,
              "Interactive Education",
              1000,
            ]}
            wrapper="span"
            className="text-8xl  text-gradient font-bold"
            speed={50}
            repeat={Infinity}
          />
          <p className="my-8 w-[700px] font-semibold bg-gray-200 p-3 border-2 border-gray-300 shadow-lg rounded-full text-xl text-black">
            Any question. Any subject. Get instant, step-by-step solutions{" "}
          </p>
          <Link to="/login">
            <button
              type="button"
              className="relative text-white bg-black focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-full text-sm px-5 py-2.5 text-center "
            >
              <div className="flex items-center justify-center text-xl gap-x-3">
                Start for free <HiArrowSmRight size={20} />
              </div>
              <div className="absolute top-0 right-0 bottom-0 left-0 rounded-lg"></div>
            </button>
          </Link>
        </section>
      </center>
    </>
  );
}
