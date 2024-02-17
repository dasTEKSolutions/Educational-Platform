import React, { useState, useEffect } from 'react';
// import './404.css'; // Include your custom CSS file, optional

const NotFound = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Trigger mounting animation on component load
    return () => setIsMounted(false); // Unmount animation on component unmount
  }, []);
 
  return (
    <div
      className={`not-found-container overflow-hidden  min-h-screen flex items-center justify-center`}
    >
      {isMounted && (
        <div className="not-found-content bg-white dark:bg-gray-700 shadow-md rounded-lg p-8 mx-auto flex flex-col items-center">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-200">
            Oops! Page Not Found
          </h1>
          <p className="text-base mt-4 text-gray-600 dark:text-gray-400">
            Looks like you've strayed off the beaten path. No worries, it happens to
            the best of us. Let's help you get back on track.
          </p>
          <div className="mt-8 flex gap-3 justify-around">
            <button
              className="relative  text-white bg-blackhover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
            <button
              className="relative text-white bg-blackhover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              onClick={() => window.location.href = '/'}
            >
              Head Home
            </button>
          </div>

          <div className="error-404 mt-8 flex justify-center">
            {/* Add your custom error 404 image or animation here */}
            {/* Example:
              <img src="path/to/your/error-404.png" alt="Page Not Found" />
            */}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotFound;
