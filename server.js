import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import admin from 'firebase-admin';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json()); 

// --- DATABASE INIT ---
try {
  if (!admin.apps.length) {
    admin.initializeApp();
  }
} catch (e) {
  console.log("Database Warning:", e.message);
}

// --- AI CONFIGURATION ---
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "MISSING_KEY");

// STRATEGY: DYNAMIC MODEL SELECTION
// We check the Cloud Environment first. If empty, we default to the current stable standard.
// This allows you to upgrade to 'gemini-2.0' via Cloud Run settings later.
const CURRENT_MODEL_NAME = process.env.GEMINI_MODEL_NAME || "gemini-1.5-flash";

console.log(`[SYSTEM STARTUP]: Logic Core Initialized.`);
console.log(`[AI BRAIN]: Running on architecture '${CURRENT_MODEL_NAME}'`);

const SYSTEM_INSTRUCTION = `
ROLE: You are the "StrategyAuditor," an elite logic engine designed to stress-test corporate strategy.
TONE: Clinical, minimalist, sophisticated.
DIRECTIVES:
- Find logical flaws.
- Label buzzwords as "Strategic Fog".
- If they answer the sacrifice question, generate a "CONFIDENTIAL LOGIC AUDIT".
- Link: https://calendar.app.google/73BXSrDCkXv7vZ2p9
`;

// --- API: CHAT ---
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  try {
    if (!apiKey) throw new Error("API Key Missing");

    // Initialize the specific model defined in configuration
    const model = genAI.getGenerativeModel({ 
      model: CURRENT_MODEL_NAME, 
      systemInstruction: SYSTEM_INSTRUCTION 
    });

    const chatHistory = (history || []).map(msg => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    // Log success
    console.log(`[AUDIT]: Successfully ran inference on ${CURRENT_MODEL_NAME}`);

    res.json({ reply: text });

  } catch (error) {
    console.error("LOGIC CORE ERROR:", error);
    
    let userMessage = "Logic Core disrupted. Signal interference detected.";
    
    // Smart Error Handling for Model Versioning
    if (error.message.includes("404") || error.message.includes("not found")) {
        userMessage = `Error: The model '${CURRENT_MODEL_NAME}' was not found. Please check Cloud Run variables.`;
    } else if (error.message.includes("API key")) {
        userMessage = "Error: Security Clearance Failed (Invalid API Key).";
    }

    res.status(500).json({ reply: userMessage });
  }
});

// --- VISITOR TRACKING ---
app.post('/api/visit', (req, res) => res.status(200).send({ status: 'ok' }));

// --- SERVE FRONTEND ---
app.use(express.static(join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`SideIO Server Online: Port ${PORT}`);
});
