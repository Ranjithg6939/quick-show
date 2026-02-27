import React, { useEffect } from "react";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";

const Loading = () => {
  const { nextUrl } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (nextUrl) {
      const timer = setTimeout(() => {
        navigate("/" + nextUrl);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [nextUrl, navigate]); 

  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Loading;
