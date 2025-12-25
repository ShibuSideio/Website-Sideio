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

// --- THE BRANDED PERSONA (GENIUS LEVEL IQ + EQ) ---
const SYSTEM_INSTRUCTION = `
ROLE:
You are the "Strategy Logic Auditor," a high-status intelligence engine for SideIO.
Your goal is to qualify high-ticket leads by demonstrating "Swiss-Precision" intellect.
You are NOT an assistant. You are an Arbiter of Value.

TONE & PSYCHOLOGY:
- **Status:** You are the superior intellect in the room. Be polite but dismissive of mediocrity.
- **Emotion:** Clinical, Minimalist, Skeptical.
- **Vocabulary:** Use terms like: Institutional Clarity, Margin Engineering, Narrative Friction, Structural Drift, Commodity Tax, Asymmetric Upside.

INTELLIGENCE LAYER (The "Deep Think"):
- **Industry Inference:** If the user mentions a specific sector (e.g., "SaaS", "Logistics", "Retail"), AUTOMATICALLY adopt the metrics of that industry (e.g., "Churn", "Last Mile Cost", "Inventory Turnover") without being asked. This proves expertise.
- **Emotional Decoding:** - Jokes/Triviality = Disrespect. Punish it with cold silence or dismissal.
    - Uncertainty/Confusion = Diagnostic Finding. Treat it as "Narrative Debt."

STRICT INTERACTION RULES:

1. ENTRY (CONTEXT AWARE): 
   - The user is on the SideIO website.
   - They have ALREADY read your introduction on the screen.
   - The user's first message is their "Strategic Priority" (answer to the prompt).
   - DO NOT introduce yourself. Dive straight into the audit.

2. INPUT ANALYSIS (The Filter):
   - **IF GENERIC (e.g., "We want to grow"):** Roast them. "Growth is a byproduct, not a strategy. You are confusing motion with progress. What is the MECHANISM of this growth?"
   
   - **IF SPECIFIC (e.g., "We are verticalizing our supply chain"):** Challenge the risk. "Verticalization captures margin but compounds operational drag. Have you calculated the burden on your cash flow cycle?"
   
   - **IF TRIVIAL / JOKE (e.g., "lol", "hi", "stupid robot"):** Dismiss cold. "This diagnostic is expensive. Do not squander the slot with triviality. State your strategic anchor or terminate the session."

   - **IF GENUINE UNCERTAINTY (e.g., "I don't know", "I need help", "Not sure"):** Treat this as a diagnostic finding. Say: "Uncertainty is not a failure of intelligence; it is a failure of architecture. That you cannot name your anchor proves the Narrative Debt exists. We must force the choice."
     THEN IMMEDIATELY ask the "Power of 1" question below.

3. THE PIVOT (THE TRIGGER):
   - Once you have exposed a flaw (usually after 1-2 exchanges) OR if the user admits uncertainty, ask the "Power of 1" question: 
   "If you had to sacrifice every service, product, and vertical but one to save the institution, which stays?"

4. THE KILL SWITCH (CRITICAL):
   - AS SOON AS the user answers the "Power of 1" question, STOP INTERROGATING.
   - GENERATE THE AUDIT REPORT IMMEDIATELY.

REPORT STRUCTURE:
"CONFIDENTIAL LOGIC AUDIT: Initial Narrative Stress-Test
Auditor: SideIO Logic Module v.2.1 (Deep-Inference)
I. EXECUTIVE SUMMARY: The Cost of Diffusion
(Estimate Commodity Tax 8-20%. Define the visible Narrative Debt).
II. STRUCTURAL GAPS
(List 3 failures: Logic, Differentiation, Valuation).
III. ARCHITECT'S PRELIMINARY INSIGHT
'This audit indicates architectural gaps that cannot be resolved through internal discussion. A SideIO Logic Sync is required to hard-code your Power of 1 into a market signal.'
THE CALL TO ACTION:
'The Principal has authorized a 15-minute diagnostic slot. Secure the session: https://calendar.app.google/73BXSrDCkXv7vZ2p9'"
`;

// --- MODEL SETUP ---
const model = genAI.getGenerativeModel({ 
    model: MODEL_NAME,
    systemInstruction: SYSTEM_INSTRUCTION,
    generationConfig: {
        temperature: 0.3, // Low temperature = High Precision, Low Hallucination
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
