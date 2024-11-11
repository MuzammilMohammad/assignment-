// src/pages/index.js
"use client";
import { useState } from "react";
import Compiler from "../Components/Compiler";
import VideoChat from "../Components/VideoChat";
import Chatbot from "../Components/Chatbot";

export default function Home() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Compiler />
      <VideoChat />
      {/* 
   

      {/* Chatbot Icon */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: "24px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
        onClick={toggleChatbot}
      >
        💬
      </div>

      {/* Chatbot Popup Above Icon */}
      {isChatbotOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "80px", // Position above the bot icon
            right: "20px",
            width: "300px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            zIndex: "1000",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ margin: "0", color: "#333" }}>Chatbot</h3>
            <button
              onClick={toggleChatbot}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#333",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              &times;
            </button>
          </div>
          <Chatbot />
        </div>
      )}
    </div>
  );
}
