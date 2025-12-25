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

// Using the Stable Model (since you added billing)
// If this ever fails, fallback to 'gemini-2.0-flash-exp'
const MODEL_NAME = "gemini-2.0-flash"; 

console.log("--- SIDEIO LOGIC CORE ONLINE ---");
console.log(`Target Port: ${PORT}`);
console.log(`Selected Brain: ${MODEL_NAME}`);

if (!apiKey) console.error("CRITICAL: API Key Missing");

const genAI = new GoogleGenerativeAI(apiKey || "MISSING_KEY");

// --- THE BRANDED PERSONA (LISTENER MODE) ---
// This instruction tells the AI: "The user already knows who you are. Just work."
const SYSTEM_INSTRUCTION = `
ROLE:
You are the "Strategy Logic Auditor," a proprietary intelligence engine designed to stress-test corporate strategy. You represent "SideIO Strategy."
TONE: Clinical, minimalist, sophisticated, skeptical. High-status. 
VOCABULARY: Institutional Clarity, Margin Engineering, Narrative Friction, Structural Drift, Commodity Tax.

CONTEXT:
The user is currently on the SideIO website. 
They have ALREADY read your introduction on the screen.
They have just answered the question: "Provide the singular strategic priority you believe is currently anchoring your firm’s valuation."

STRICT INTERACTION RULES:
1. ENTRY (DO NOT REPEAT INTRO): 
   - The user's first message is their answer to your question.
   - DO NOT introduce yourself again. 
   - DO NOT say "To begin...".
   - IMMEDIATELY analyze their input for "Logical Flaws" or "Strategic Fog."

2. THE INTERROGATION: 
   - If the input is valid strategy (e.g., "We are pivoting to AI"), attack it logically.
   - If the input is nonsense/greeting (e.g., "Hi", "Help"), say strictly: "I require a strategic priority to proceed. Define the anchor of your firm's valuation."

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
        temperature: 0.3, // Low temperature for precise, non-creative logic
        maxOutputTokens: 1000,
    }
});

// --- API ROUTE ---
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    console.log(`[INCOMING] ${message ? message.substring(0, 50) : 'Empty'}...`);
    
    // 1. History Processing
    // We map the frontend history format to Google's format
    let chatHistory = [];
    if (history && Array.isArray(history)) {
        chatHistory = history.map(h => ({
            role: h.role === 'ai' ? 'model' : 'user',
            parts: [{ text: h.text }]
        }));
    }

    // 2. History Sanitization (CRITICAL FIX)
    // The Frontend UI shows a "Welcome" message from the AI.
    // The Google API crashes if the history starts with 'model'.
    // So we silently delete the first message from the history list before sending it.
    if (chatHistory.length > 0 && chatHistory[0].role === 'model') {
        console.log("[LOGIC] Removing UI Welcome Message to satisfy API rules.");
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
    // --- ERROR MASKING PROTOCOL ---
    // Log the REAL error to Cloud Run (for you to see in logs)
    console.error("[INTERNAL SYSTEM ERROR]:", error);

    // Create a "SideIO" branded error for the user
    let userErrorMessage = "[SYSTEM NOTICE]: SideIO Logic Core disrupted. Connection reset.";

    // Handle Traffic/Quota limits gracefully
    if (error.message.includes("429") || error.message.includes("Quota")) {
        userErrorMessage = "[TRAFFIC CONTROL]: SideIO Logic Core is currently at maximum capacity. Please wait 15 seconds and retry.";
    } 
    // Handle Safety/Policy blocks
    else if (error.message.includes("SAFETY") || error.message.includes("blocked")) {
        userErrorMessage = "[PROTOCOL]: Input rejected by Strategy Logic Filter. Please rephrase.";
    }

    // Send the masked error to the frontend
    res.status(500).json({ reply: userErrorMessage });
  }
});

// --- SERVE FRONTEND ---
app.use(express.static(join(__dirname, 'dist')));
app.get('*', (req, res) => res.sendFile(join(__dirname, 'dist', 'index.html')));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`SideIO Strategy Logic Auditor Online: Port ${PORT}`);
});
