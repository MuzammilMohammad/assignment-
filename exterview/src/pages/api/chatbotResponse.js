// src/pages/api/chatbotResponse.js

export default function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    // Sentiment Analysis Logic
    const sentimentAnalysis = (text) => {
      const positiveWords = ["good", "excellent", "great", "positive", "happy"];
      const negativeWords = ["bad", "poor", "negative", "sad", "unhappy"];

      const lowerText = text.toLowerCase();
      if (positiveWords.some((word) => lowerText.includes(word)))
        return "Positive";
      if (negativeWords.some((word) => lowerText.includes(word)))
        return "Negative";
      return "Neutral";
    };

    // Automated Skill Tagging Logic
    const skillTagging = (text) => {
      const skills = ["JavaScript", "React", "Node", "Python", "Java"]; // Add more skills as needed
      return skills.filter((skill) => text.includes(skill));
    };

    // Interview Scheduling Responses
    const schedulingResponses = [
      "Please provide a date and time for the interview.",
      "I'm here to help with your interview scheduling.",
      "Can you tell me the preferred time for the interview?",
      "What date would you like to schedule the interview for?",
      "Please share your preferred interview timing.",
      "I can help you set up the interview. Just tell me when!",
    ];

    // Determine the response based on the message content
    let response = "";

    if (message.toLowerCase().includes("schedule")) {
      // Interview scheduling response
      response =
        schedulingResponses[
          Math.floor(Math.random() * schedulingResponses.length)
        ];
    } else if (message.toLowerCase().includes("analyze sentiment")) {
      // Perform sentiment analysis
      const sentiment = sentimentAnalysis(message);
      response = `The sentiment of the message is: ${sentiment}.`;
    } else if (message.toLowerCase().includes("tag skills")) {
      // Perform skill tagging
      const taggedSkills = skillTagging(message);
      response =
        taggedSkills.length > 0
          ? `The detected skills are: ${taggedSkills.join(", ")}.`
          : "No relevant skills detected.";
    } else {
      response =
        "I'm here to assist you. Please ask about scheduling, sentiment analysis, or skill tagging.";
    }

    res.status(200).json({ response });
  } else {
    // If method is not POST, send a 405 (Method Not Allowed) error
    res.status(405).end();
  }
}
