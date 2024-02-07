import React, { useEffect, useRef } from "react";

const MathJaxComponent = ({ content }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise([contentRef.current]);
    }
  }, [content]);

  return <div ref={contentRef}>{content}</div>;
};

export default MathJaxComponent;
