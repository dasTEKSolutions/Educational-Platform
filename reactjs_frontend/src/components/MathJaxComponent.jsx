import React, { useEffect, useRef } from "react";
import "./MathJax.css"; // Ensure you have the CSS file in the same directory

const MathJaxComponent = ({ text }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise([contentRef.current]).catch((err) =>
        console.error(err)
      );
    }
  }, [text]);

  return (
    <div ref={contentRef} className="mathjax-container">
      <div>{text}</div>
    </div>
  );
};

export default MathJaxComponent;
