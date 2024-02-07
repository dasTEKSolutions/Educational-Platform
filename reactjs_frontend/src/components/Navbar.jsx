import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../UserAuth";

export default function Navbar() {
  const [onclick, setonclick] = useState(false);
  const handleonclick = () => {
    setonclick(!onclick);
    console.log(onclick);
  };
  const { logOut, user } = useUserAuth();

  return (
    <>
      <nav className=" sm:mb-0 mb-10 sm:justify-around  md:justify-around  lg:justify-around  xl:justify-around  p-2 mt-2 flex justify-between  shadow-xl">
        <div className="text-2xl  font-bold">
          <Link to={"/home"}>dasTEkEdu</Link>{" "}
        </div>
        <div className="hidden sm:block md:block lg:block xl:block">
          <div className="text-gray-500 font-semibold mt-2 flex space-x-6">
            <Link to={"/Dashboard"}>
              <div>Dashboard</div>
            </Link>
            <Link to={"/threads"}>
              <div>Threads </div>
            </Link>
          </div>
        </div>
        <div
          onClick={handleonclick}
          className="align-middle justify-center block sm:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </div>

        <div className="hidden sm:block md:block lg:block xl:block flex space-x-4">
          {user ? (
            <button
              type="button"
              onClick={logOut}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 capitalize"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">
                <button
                  type="button"
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 capitalize"
                >
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button
                  type="button"
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 capitalize"
                >
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
      <div className="align-middle justify-center block sm:hidden">
        {onclick ? (
          <div className="absolute z-10  w-full bg-white text-gray-500 font-semibold mt-2 grid space-x-6">
            <center className="space-x-6">
              <Link to={"/HOMEWORK-HELP"}>
                <div>HOMEWORK HELP</div>
              </Link>
              <Link to={"/threads"}>
                <div>Threads </div>
              </Link>
              <div className="grid w-64 mt-8">
                <Link to={"/login"}>
                  <button
                    type="button"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:    ring-gray-700 dark:border-gray-700 capitalize"
                  >
                    Login
                  </button>
                </Link>
                <Link to={"/signup"}>
                  <button
                    type="button"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:    ring-gray-700 dark:border-gray-700 capitalize"
                  >
                    signup
                  </button>
                </Link>
              </div>
            </center>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
