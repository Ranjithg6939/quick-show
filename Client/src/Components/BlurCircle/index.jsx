import React from "react"
import "./index.css"

const BlurCircle = ({
  top = "auto",
  left = "auto",
  right = "auto",
  bottom = "auto",
}) => {
  return (
    <div
      className="blur-container"
      style={{
        top:top,
        left:left,
        right:right,
        bottom:bottom
      }}
    />
  );
};

export default BlurCircle
