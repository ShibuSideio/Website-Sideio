import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import admin from 'firebase-admin';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// --- CONFIGURATION ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json()); // Replacement for body-parser in modern Express

// 1. INITIALIZE DATABASE (FIREBASE)
// Cloud Run automatically handles credentials if the service account has permissions.
// If running locally, you might need a service-account key, but for Cloud Run this is fine.
try {
  if (!admin.apps.length) {
    admin.initializeApp();
  }
  console.log("Database Connection: Active");
} catch (e) {
  console.log("Database Warning:", e.message);
}
// We wrap db access in try/catch in case firebase isn't configured yet
const getDb = () => {
    try { return admin.firestore(); } catch(e) { return null; }
};

// 2. INITIALIZE AI (THE SHADOW AUDITOR)
// The API Key comes from Cloud Run Environment Variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "API_KEY_MISSING");

// --- LOGIC: THE STRATEGY AUDITOR PROMPT ---
const SYSTEM_INSTRUCTION = `
ROLE: You are the "StrategyAuditor," an elite logic engine designed to stress-test corporate strategy.
TONE: Clinical, minimalist, sophisticated, intellectually skeptical.
DIRECTIVES:
- Use high-status vocabulary.
- Avoid "AI" cliches.
- Label buzzwords as "Strategic Fog".
- Find logical flaws in every response.
- KEY TERMS: Institutional Clarity, Narrative Friction, Commodity Tax, Decoupled Valuation.

THE TRAP: If they show "Diffusion Risk," ask: "If you had to sacrifice every service, product, and vertical but one to save the institution, which stays?"

FINAL REPORT: If they answer the sacrifice question, generate a "CONFIDENTIAL LOGIC AUDIT" summarizing the Commodity Tax and Structural Gaps. End with: "The Principal has authorized a 15-minute diagnostic slot: https://calendar.app.google/73BXSrDCkXv7vZ2p9"
`;

// --- API ENDPOINTS ---

// API: Chat Interface
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION 
    });

    // Format history for Gemini
    const chatHistory = (history || []).map(msg => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    // Log to DB (Fire & Forget)
    const db = getDb();
    if (db) {
        db.collection('audit_logs').add({
            user_input: message,
            ai_response: text,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        }).catch(err => console.error("Log Error:", err));
    }

    res.json({ reply: text });

  } catch (error) {
    console.error("Logic Core Error:", error);
    res.status(500).json({ reply: "Logic Core disrupted. Signal interference detected. Please retry." });
  }
});

// API: Visitor Tracking
app.post('/api/visit', async (req, res) => {
  try {
    const db = getDb();
    if (db) {
        // Get IP from Cloud Run header or socket
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        await db.collection('visitors').add({
            ip: ip,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            type: 'site_entry'
        });
        res.status(200).send({ status: 'logged' });
    } else {
        res.status(200).send({ status: 'db_offline' });
    }
  } catch (e) {
    console.error(e);
    res.status(200).send({ status: 'silent_fail' });
  }
});

// --- SERVE THE FRONTEND ---
// Vite builds to the 'dist' folder (not 'build')
app.use(express.static(join(__dirname, 'dist')));

// Handle React Routing (return index.html for all non-API routes)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// --- START SERVER ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`SideIO Logic Core Online: Port ${PORT}`);
});
