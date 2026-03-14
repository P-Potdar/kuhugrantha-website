// server/index.js
require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://www.kuhugrantha.com"
        : "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());

// 🔐 Secret from .env (NEVER expose to client)
const CHATBASE_SECRET = process.env.CHATBASE_IDENTITY_SECRET;
if (!CHATBASE_SECRET) {
  console.error("❌ CHATBASE_IDENTITY_SECRET not found in .env");
  process.exit(1);
}

// 🎯 Mock user store (Replace with real DB/auth)
const sessions = new Map();

// Helper: Get/create user session
async function getUserSession(sessionId) {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, {
      id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      email: `visitor@kuhugrantha.com`,
      name: "Website Visitor",
      role: "prospect",
    });
  }
  return sessions.get(sessionId);
}

// 🚀 Generate Chatbase Identity Token
app.post("/api/chatbase/token", async (req, res) => {
  try {
    const sessionId = req.headers["x-session-id"] || `anon_${Date.now()}`;
    const user = await getUserSession(sessionId);

    const token = jwt.sign(
      {
        user_id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        company: "KuhuGrantha Prospect",
      },
      CHATBASE_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
        issuer: "kuhugrantha.com",
      },
    );

    res.json({ success: true, token, expires_in: 3600 });
  } catch (error) {
    console.error("Token error:", error);
    res.status(500).json({ error: "Token generation failed" });
  }
});

// Health check
app.get("/api/health", (req, res) =>
  res.json({ status: "ok", service: "kuhugrantha-chatbase" }),
);

// Start server
app.listen(PORT, () => {
  console.log(`🔐 Chatbase Identity Server: http://localhost:${PORT}`);
});
