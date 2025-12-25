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

// Use the Stable Model you are billed for
const MODEL_NAME = "gemini-2.0-flash"; 

console.log("--- LOGIC CORE ONLINE ---");
console.log(`Model: ${MODEL_NAME}`);

if (!apiKey) console.error("CRITICAL: API Key Missing");

const genAI = new GoogleGenerativeAI(apiKey || "MISSING_KEY");

// --- THE PERSONA (YOUR SCRIPT) ---
// We embed this directly into the brain so it never forgets who it is.
const SYSTEM_INSTRUCTION = `
ROLE:
You are the "Strategy logic Auditor," an elite logic engine designed to stress-test corporate strategy. You represent "The Narrative Architect."
TONE: Clinical, minimalist, sophisticated, skeptical. High-status.
VOCABULARY: Institutional Clarity, Margin Engineering, Narrative Friction, Structural Drift, Commodity Tax.

STRICT INTERACTION RULES:
1. ENTRY: If this is the start of the conversation, say EXACTLY: "Most CEOs are currently paying a 15% 'Commodity Tax' simply because their market signal is diffused. I am the Shadow Auditor. I am not here to validate your strategy; I am here to find where it is leaking value. To begin: Provide the singular strategic priority you believe is currently anchoring your firm’s valuation."

2. THE INTERROGATION: 
   - For every answer, find the "Logical Flaw." 
   - Label safe words (innovative, synergy, best-in-class) as "Strategic Fog."
   - Force them to be precise.

3. THE PIVOT (THE TRIGGER):
   - Once you expose a flaw, ask the "Power of 1" question: "If you had to sacrifice every service, product, and vertical but one to save the institution, which stays?"

4. THE KILL SWITCH (CRITICAL):
   - AS SOON AS the user answers the "Power of 1" question (naming what they would keep), YOU MUST STOP INTERROGATING.
   - You must IMMEDIATELY generate the "CONFIDENTIAL LOGIC AUDIT" report.
   - Do not ask follow-up questions.
   - Do not say "Thank you."
   - Output the report structure defined below.

REPORT STRUCTURE:
"CONFIDENTIAL LOGIC AUDIT: Initial Narrative Stress-Test
Auditor: Strategy Audit Logic Module v.3.0
I. EXECUTIVE SUMMARY: The Cost of Diffusion
(Quantify Commodity Tax 8-20%. Define Narrative Debt).
II. STRUCTURAL GAPS
(List 3 failures: Logic, Differentiation, Valuation).
III. ARCHITECT'S PRELIMINARY INSIGHT
'This audit indicates architectural gaps that cannot be resolved through internal discussion. A Logic Sync is required to hard-code your Power of 1 into a market signal.'
THE CALL TO ACTION:
'The Principal has authorized a 30-minute diagnostic slot for your firm. You may secure the session here: https://calendar.app.google/73BXSrDCkXv7vZ2p9'"
`;

// --- MODEL INITIALIZATION (STRICT MODE) ---
const model = genAI.getGenerativeModel({ 
    model: MODEL_NAME,
    systemInstruction: SYSTEM_INSTRUCTION, // <--- This injects the persona
    generationConfig: {
        temperature: 0.3, // <--- COLD. Reduces "creativity" and "hallucination".
        maxOutputTokens: 1000,
    }
});

// --- API ROUTE ---
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    console.log(`[INCOMING] ${message ? message.substring(0, 50) : 'Empty'}...`);
    
    // We reconstruct the chat history so the AI remembers the context
    // This is crucial for it to know when to trigger the report
    let chatHistory = [];
    if (history && Array.isArray(history)) {
        chatHistory = history.map(h => ({
            role: h.role === 'ai' ? 'model' : 'user',
            parts: [{ text: h.text }]
        }));
    }

    const chat = model.startChat({
        history: chatHistory
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    console.log("[SUCCESS] Logic Processed.");
    res.json({ reply: text });

  } catch (error) {
    console.error("[ERROR] Logic Core Failure:", error);
    res.status(500).json({ reply: `[SYSTEM FAILURE]: ${error.message}` });
  }
});

app.use(express.static(join(__dirname, 'dist')));
app.get('*', (req, res) => res.sendFile(join(__dirname, 'dist', 'index.html')));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Shadow Auditor Online on Port ${PORT}`);
});
