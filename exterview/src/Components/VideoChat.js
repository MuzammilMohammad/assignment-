// src/components/VideoChat.js
"use client";
import dynamic from "next/dynamic";
import { useState } from "react";

const VideoSDKMeeting = dynamic(
  () => import("@videosdk.live/react-sdk").then((mod) => mod.VideoSDKMeeting),
  { ssr: false }
);

const VideoChat = () => {
  const [meetingId, setMeetingId] = useState("");

  const startMeeting = () => {
    const generatedMeetingId =
      "meeting-" + Math.random().toString(36).substr(2, 9);
    setMeetingId(generatedMeetingId);
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
      <h2 style={{ color: "#333", fontWeight: "600" }}>Video Chat Feature</h2>
      {meetingId ? (
        <VideoSDKMeeting
          meetingId={meetingId}
          name="User"
          onMeetingLeave={() => setMeetingId("")}
          config={{ micEnabled: true, webcamEnabled: true }}
        />
      ) : (
        <button
          onClick={startMeeting}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Start Video Call
        </button>
      )}
    </div>
  );
};

export default VideoChat;
