const { GoogleGenAI } = require("@google/genai");

// Use string key authentication
const API_KEY = "AIzaSyADYNt1TLRJ6ZXDM17WzHGfqmIpNm2X72U";

// In-memory chat history (optional, per session you can replace with DB or Redis)
let chatHistory = [];

const solvedoubt = async (req, res) => {
  const { messages } = req.body; // array of previous messages + new one
  if (!messages || !messages.length) {
    return res.status(400).json({ error: "Messages are required" });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    // Build conversation string for LLM with history
    const conversation = messages.map(msg => `${msg.role === "user" ? "User" : "AI"}: ${msg.text}`).join("\n");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: conversation,
      config: {
        systemInstruction: `
        SYSTEM INSTRUCTION for QueHub AI Tutor:
        You are an AI tutor for B.Tech / engineering students.
        Speak in short, numbered steps. Use line breaks. Avoid long paragraphs.
        Use mini examples or pseudo-code when helpful.
        Tone: friendly, encouraging, easy to read.
        `
      }
    });

    const aiText = response.text || "Sorry, I could not generate a response.";

    // Push AI response to chat history
    chatHistory.push({ role: "model", text: aiText });

    res.json({ message: aiText });
  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = solvedoubt;
