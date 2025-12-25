import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());

// --- CONFIGURATION ---
const PORT = process.env.PORT || 8080;
// We hardcode the model to ensure stability
const MODEL_NAME = "gemini-pro"; 
const apiKey = process.env.GEMINI_API_KEY;

// --- LOGGING STARTUP ---
console.log("--- SYSTEM BOOT SEQUENCE ---");
console.log(`Target Port: ${PORT}`);
console.log(`AI Model: ${MODEL_NAME}`);

// --- AI INIT ---
// If key is missing, we don't crash yet, we just warn.
if (!apiKey) console.error("CRITICAL WARNING: GEMINI_API_KEY is missing!");
const genAI = new GoogleGenerativeAI(apiKey || "MISSING_KEY");
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

// --- API ROUTE ---
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    // Log the input to confirm the brain is receiving signals
    console.log(`[INCOMING] ${message ? message.substring(0, 50) : 'Empty Message'}...`);
    
    if (!apiKey) {
        throw new Error("Server configuration error: GEMINI_API_KEY is missing.");
    }

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    console.log("[SUCCESS] Inference complete.");
    res.json({ reply: text });

  } catch (error) {
    console.error("[ERROR] Logic Core Failure:", error);
    res.status(500).json({ reply: `[SYSTEM FAILURE]: ${error.message}` });
  }
});

// --- SERVE FRONTEND ---
app.use(express.static(join(__dirname, 'dist')));
app.get('*', (req, res) => res.sendFile(join(__dirname, 'dist', 'index.html')));

// --- START SERVER (BIND TO 0.0.0.0) ---
// This explicit binding is required for Cloud Run to "see" the app.
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server V2 LIVE on port ${PORT}`);
});
