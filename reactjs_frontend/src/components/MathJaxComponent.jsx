import React, { useEffect, useRef } from "react";
import DOMPurify from "dompurify";
import "./MathJax.css"; // Ensure you have the CSS file in the same directory

const MathJaxComponent = ({ text }) => {
  useEffect(() => {
    // Call MathJax to typeset the content after setting the HTML
    window.MathJax.typesetPromise();
  }, [text]); // Depend on content so it updates when content changes

  const formatTextAsHtml = (text) => {
    // Replace bold syntax with HTML <b> tags
    const boldedText = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

    // Convert line breaks to <br> and spaces to &nbsp;
    return boldedText
      .split("\n")
      .map((line) => line.replace(/ /g, "\u00A0"))
      .join("<br/>");
  };

  // Format the content with HTML bold tags and line breaks
  const formattedContent = formatTextAsHtml(text);

  // Sanitize the formatted content using DOMPurify
  const sanitizedContent = DOMPurify.sanitize(formattedContent);

  return (
    <div
      className="mathjax-format"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    ></div>
  );
};

export default MathJaxComponent;
