import React, { useState } from "react";

const InterviewPlayback = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const executeCode = async () => {
    try {
      const response = await fetch("/api/executeCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      setOutput(data.output);
    } catch (err) {
      setOutput(`Error: ${err.message}`);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#1f2937",
        color: "#fff",
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          padding: "1rem",
          borderBottom: "1px solid #374151",
          display: "flex",
          alignItems: "center",
        }}
      ></div>

      {/* Main Content */}
      <div
        style={{
          flex: "1",
          display: "flex",
        }}
      >
        {/* Code Editor */}
        <div
          style={{
            flex: "1",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Run Code Button */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
              borderBottom: "1px solid #374151",
              backgroundColor: "#2d3748",
              borderRadius: "0.5rem 0.5rem 0 0",
            }}
          >
            <span
              style={{
                backgroundColor: "#4a5568",
                color: "#fff",
                padding: "0.25rem 0.75rem",
                borderRadius: "0.25rem",
                fontSize: "0.75rem",
              }}
            >
              JavaScript
            </span>
            <button
              onClick={executeCode}
              style={{
                padding: "10px 20px",
                borderRadius: "5px",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Run Code
            </button>
          </div>

          {/* Code Input Area */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{
              width: "100%",
              backgroundColor: "#2d3748",
              color: "#d1d5db",
              padding: "1rem",
              fontFamily: "monospace",
              fontSize: "0.875rem",
              border: "none",
              outline: "none",
              flex: "1",
              borderRadius: "0 0 0.5rem 0.5rem",
            }}
            spellCheck="false"
          />
        </div>

        {/* Console Output */}
        <div
          style={{
            width: "24rem",
            borderLeft: "1px solid #374151",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <div
              style={{
                padding: "1rem",
                borderBottom: "1px solid #374151",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "500",
                  }}
                >
                  Console
                </span>
              </div>
            </div>
            <div
              style={{
                flex: "1",
                overflowY: "auto",
                padding: "1rem",
                backgroundColor: "#1f2937",
                color: "#d1d5db",
              }}
            >
              <pre
                style={{
                  fontSize: "0.875rem",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                }}
              >
                {output}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPlayback;
