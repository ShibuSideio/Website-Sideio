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
const apiKey = process.env.GEMINI_API_KEY;

// --- THE FIX ---
// We selected "gemini-2.0-flash" from your authorized list.
const MODEL_NAME = "gemini-2.0-flash"; 

console.log("--- SYSTEM BOOT FINAL ---");
console.log(`Target Port: ${PORT}`);
console.log(`AI Model: ${MODEL_NAME}`);

if (!apiKey) console.error("CRITICAL WARNING: GEMINI_API_KEY is missing!");

const genAI = new GoogleGenerativeAI(apiKey || "MISSING_KEY");
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

// --- API ROUTE ---
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    console.log(`[INCOMING] ${message ? message.substring(0, 50) : 'Empty'}...`);
    
    if (!apiKey) throw new Error("API Key Missing");

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

app.use(express.static(join(__dirname, 'dist')));
app.get('*', (req, res) => res.sendFile(join(__dirname, 'dist', 'index.html')));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server V4 LIVE on port ${PORT}`);
});
