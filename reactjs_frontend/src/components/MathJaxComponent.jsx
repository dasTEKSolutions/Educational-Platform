import React, { useEffect, useRef } from "react";
import "./MathJax.css"; // Ensure you have the CSS file in the same directory

const MathJaxComponent = ({ content }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise([contentRef.current]).catch((err) =>
        console.error(err)
      );
    }
  }, [content]);

  return (
    <div ref={contentRef} className="mathjax-container">
      {content}
    </div>
  );
};

export default MathJaxComponent;
