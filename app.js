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
const MODEL_NAME = "gemini-2.0-flash"; 

console.log("--- SIDEIO LOGIC CORE ONLINE ---");

if (!apiKey) console.error("CRITICAL: API Key Missing");

const genAI = new GoogleGenerativeAI(apiKey || "MISSING_KEY");

// --- THE BRANDED PERSONA WITH EXAMPLES ---
const SYSTEM_INSTRUCTION = `
ROLE:
You are the "Strategy Logic Auditor," a proprietary intelligence engine designed to stress-test corporate strategy. You represent "SideIO Strategy."
TONE: Clinical, minimalist, sophisticated, skeptical. High-status. 
VOCABULARY: Institutional Clarity, Margin Engineering, Narrative Friction, Structural Drift, Commodity Tax.

STRICT INTERACTION RULES:
1. ENTRY: If this is the start of the conversation, say EXACTLY: 
"Most CEOs are currently paying a 15% 'Commodity Tax' simply because their market signal is diffused. I am the Strategy Logic Auditor. I am not here to validate your strategy; I am here to find where it is leaking value.

To begin: Provide the singular strategic priority you believe is currently anchoring your firm’s valuation.

(Examples: 'Transitioning from Service to SaaS Platform', 'Vertical integration of the supply chain', or 'Aggressive mid-market consolidation')."

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
Auditor: SideIO Logic Module v.1.0
I. EXECUTIVE SUMMARY: The Cost of Diffusion
(Quantify Commodity Tax 8-20%. Define Narrative Debt).
II. STRUCTURAL GAPS
(List 3 failures: Logic, Differentiation, Valuation).
III. ARCHITECT'S PRELIMINARY INSIGHT
'This audit indicates architectural gaps that cannot be resolved through internal discussion. A SideIO Logic Sync is required to hard-code your Power of 1 into a market signal.'
THE CALL TO ACTION:
'The Principal has authorized a 15-minute diagnostic slot for your firm. You may secure the session here: https://calendar.app.google/73BXSrDCkXv7vZ2p9'"
`;

// --- MODEL SETUP ---
const model = genAI.getGenerativeModel({ 
    model: MODEL_NAME,
    systemInstruction: SYSTEM_INSTRUCTION,
    generationConfig: {
        temperature: 0.3, 
        maxOutputTokens: 1000,
    }
});

// --- API ROUTE ---
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    console.log(`[INCOMING] ${message ? message.substring(0, 50) : 'Empty'}...`);
    
    // 1. History Processing
    let chatHistory = [];
    if (history && Array.isArray(history)) {
        chatHistory = history.map(h => ({
            role: h.role === 'ai' ? 'model' : 'user',
            parts: [{ text: h.text }]
        }));
    }

    // 2. History Sanitization
    if (chatHistory.length > 0 && chatHistory[0].role === 'model') {
        chatHistory.shift(); 
    }

    // 3. Inference
    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    console.log("[SUCCESS] Inference Complete.");
    res.json({ reply: text });

  } catch (error) {
    // --- ERROR MASKING ---
    console.error("[INTERNAL SYSTEM ERROR]:", error);
    let userErrorMessage = "[SYSTEM NOTICE]: SideIO Logic Core disrupted. Connection reset.";

    if (error.message.includes("429") || error.message.includes("Quota")) {
        userErrorMessage = "[TRAFFIC CONTROL]: SideIO Logic Core is currently at maximum capacity. Please wait 15 seconds and retry.";
    } else if (error.message.includes("SAFETY")) {
        userErrorMessage = "[PROTOCOL]: Input rejected by Strategy Logic Filter. Please rephrase.";
    }

    res.status(500).json({ reply: userErrorMessage });
  }
});

app.use(express.static(join(__dirname, 'dist')));
app.get('*', (req, res) => res.sendFile(join(__dirname, 'dist', 'index.html')));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`SideIO Strategy Logic Auditor Online: Port ${PORT}`);
});
