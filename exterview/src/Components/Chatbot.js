// src/components/Chatbot.js
"use client";
import { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleSend = async () => {
    const userMessage = input;
    setMessages([...messages, { text: userMessage, sender: "user" }]);
    setInput("");

    // Fetch response from API
    const response = await getResponseFromAPI(userMessage);

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: response, sender: "bot" },
    ]);
  };

  const getResponseFromAPI = async (message) => {
    try {
      const res = await fetch("/api/chatbotResponse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      return data.response;
    } catch (error) {
      console.error("Error fetching response:", error);
      return "Sorry, I couldn't process your request.";
    }
  };

  // Update input when a dropdown option is selected
  const handleOptionSelect = (option) => {
    setInput(option);
    setSelectedOption(option);
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "500px",
        margin: "0 auto",
        borderRadius: "8px",
        backgroundColor: "#f4f4f9",
      }}
    >
      <h2 style={{ color: "#333", fontWeight: "600" }}>
        Interview Scheduling Chatbot
      </h2>
      {messages.length > 0 && (
        <div
          style={{
            maxHeight: "200px",
            overflowY: "scroll",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "#fff",
          }}
        >
          {messages.map((msg, index) => (
            <p
              key={index}
              style={{ textAlign: msg.sender === "user" ? "right" : "left" }}
            >
              <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong>{" "}
              {msg.text}
            </p>
          ))}
        </div>
      )}

      {/* Dropdown for suggestions */}
      <select
        value={selectedOption}
        onChange={(e) => handleOptionSelect(e.target.value)}
        style={{
          width: "90%",
          marginTop: "10px",
          padding: "8px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          color: "#333",
        }}
      >
        <option value="" disabled>
          Select an option
        </option>
        <option value="Analyze sentiment">Analyze sentiment</option>
        <option value="Tag skills">Tag skills</option>
        <option value="Schedule interview">Schedule interview</option>
      </select>

      {/* Input field for additional message */}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type additional details here..."
        style={{
          width: "80%",
          marginTop: "10px",
          padding: "8px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={handleSend}
        style={{
          marginLeft: "10px",
          padding: "8px 12px",
          borderRadius: "5px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </div>
  );
};

export default Chatbot;
