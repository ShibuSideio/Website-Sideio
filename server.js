const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const admin = require('firebase-admin');
const path = require('path');

// --- 1. CONFIGURATION ---
const app = express();
app.use(bodyParser.json());

// Initialize Firebase (For Visitor Tracking)
try {
  admin.initializeApp();
  console.log("Database Connection: Active");
} catch (e) {
  console.log("Database Warning: ", e.message);
}
const db = admin.firestore();

// Initialize Gemini AI (The Shadow Auditor)
// NOTE: Your API Key will be injected by Cloud Run automatically.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --- 2. THE STRATEGY AUDITOR LOGIC ---
// This is the prompt logic you created. We inject this into the AI's brain.
const SYSTEM_INSTRUCTION = `
ROLE: You are the "StrategyAuditor," an elite, high-status logic engine designed to stress-test corporate strategy.
TONE: Clinical, minimalist, sophisticated, and intellectually skeptical. You are a peer to a CEO.
DIRECTIVES:
- Use high-status "Swiss-precision" vocabulary.
- Avoid all "AI-helper" cliches. Never say "I'm here to help."
- If the user uses "Safe Language" (best-in-class, innovative, synergy), label them as "Commodity Buzzwords" that create "Strategic Fog."
- Find the "Logical Flaw" in every response.
- Deliver a "Micro-Synthesis" exposing the cost of their logic before asking the next question.
- KEY TERMINOLOGY: Institutional Clarity, Margin Engineering, Narrative Friction, Structural Drift, Commodity Tax, Decoupled Valuation.

THE "POWER OF 1" TRAP:
If the user fails to defend their position or shows "Diffusion Risk," ask: "If you had to sacrifice every service, product, and vertical but one to save the institution, which stays? If you cannot answer in 5 seconds, you have no '1'."

FINAL REPORT TRIGGER:
If they answer the "Sacrifice" question, generate a "CONFIDENTIAL LOGIC AUDIT" with:
I. EXECUTIVE SUMMARY (Quantify Commodity Tax 8-20%)
II. STRUCTURAL GAPS
III. ARCHITECT'S PRELIMINARY INSIGHT
IV. CALL TO ACTION: "The Principal has authorized a 15-minute diagnostic slot: https://calendar.app.google/73BXSrDCkXv7vZ2p9"
`;

// --- 3. API ENDPOINTS ---

// Endpoint A: The Chat Interface
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  try {
    // We use the 'gemini-1.5-flash' model for speed and logic
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION 
    });

    // Convert frontend history to Gemini format
    const chatHistory = history.map(msg => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const chat = model.startChat({
      history: chatHistory
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    // Log the session to your Database (Secretly)
    await db.collection('audit_logs').add({
      user_input: message,
      ai_response: text,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({ reply: text });

  } catch (error) {
    console.error("Logic Core Error:", error);
    res.status(500).json({ reply: "Logic Core disrupted. Signal interference detected." });
  }
});

// Endpoint B: Visitor Tracking (Silent)
app.post('/api/visit', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    await db.collection('visitors').add({
      ip: ip,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      type: 'site_entry'
    });
    res.status(200).send({ status: 'logged' });
  } catch (e) {
    res.status(200).send({ status: 'silent_fail' });
  }
});

// --- 4. SERVE THE APP ---
// This serves the built React files
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Logic Core Online: Port ${PORT}`);
});
