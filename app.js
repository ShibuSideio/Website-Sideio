import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());

// --- HARDCODED STABILITY CONFIG ---
// We bypass all fancy logic. We just want it to work.
const MODEL_NAME = "gemini-pro"; 
const apiKey = process.env.GEMINI_API_KEY;

console.log("--- SYSTEM REBOOT: V2.0 ---");
console.log(`Model Selected: ${MODEL_NAME}`);

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    console.log("Received Message:", message);

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    console.log("Response Generated Successfully");
    res.json({ reply: text });

  } catch (error) {
    console.error("FATAL ERROR:", error);
    // This is the NEW error message. If you don't see this, the deploy failed.
    res.status(500).json({ reply: `[SYSTEM REBOOT FAILURE]: ${error.message}` });
  }
});

app.use(express.static(join(__dirname, 'dist')));
app.get('*', (req, res) => res.sendFile(join(__dirname, 'dist', 'index.html')));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server V2 Online on Port ${PORT}`));
