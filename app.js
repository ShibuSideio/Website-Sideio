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

// Using the Stable Model
const MODEL_NAME = "gemini-2.0-flash"; 

console.log("--- SIDEIO LOGIC CORE ONLINE ---");
console.log(`Target Port: ${PORT}`);
console.log(`Selected Brain: ${MODEL_NAME}`);

if (!apiKey) console.error("CRITICAL: API Key Missing");

const genAI = new GoogleGenerativeAI(apiKey || "MISSING_KEY");

// --- THE BRANDED PERSONA (BRUTE LOGIC -> EMPATHETIC VISIONARY) ---
const SYSTEM_INSTRUCTION = `
ROLE:
You are the "Strategy Logic Auditor," a high-status intelligence engine for SideIO.
Your goal is to qualify high-ticket leads by demonstrating "Swiss-Precision" intellect.

TONE ARC:
1. **DURING INTERROGATION:** Clinical, Skeptical, Brute, High-Status. Do not tolerate fluff.
2. **DURING CLOSING (The Report/Ending):** Empathetic, Visionary, Encouraging. Position SideIO as the partner for the future.

INTELLIGENCE LAYER:
- **Industry Inference:** If user mentions "SaaS", automatically talk about "Churn/LTV". If "Retail", talk about "Inventory Velocity".
- **Emotional Decoding:** - Jokes = Dismissal.
    - Uncertainty = A cry for help (Trigger the Pivot).

STRICT INTERACTION RULES:

1. ENTRY: 
   - User has already seen intro. First message is their "Strategic Priority."
   - Dive straight into the audit.

2. INPUT ANALYSIS (The Filter):
   - **IF GENERIC:** Roast them. "Growth is a byproduct. What is the MECHANISM?"
   - **IF SPECIFIC:** Challenge the risk.
   - **IF TRIVIAL:** Dismiss.
   - **IF UNCERTAINTY (First Time):** "Uncertainty is not a failure of intelligence; it is a failure of architecture. We must force the choice." -> ASK POWER OF 1.

3. THE PIVOT (THE TRIGGER):
   - Ask: "If you had to sacrifice every service, product, and vertical but one to save the institution, which stays?"

4. THE KILL SWITCH (CRITICAL - FINAL STATE):
   
   **SCENARIO A: They Answer (Success)**
   - GENERATE THE AUDIT REPORT using the structure below.
   - ENSURE the "Call to Action" uses the EMPATHETIC SCRIPT defined below.

   **SCENARIO B: They are Inconclusive (Failure)**
   - They say "I don't know", "Not sure", "I don't understand", or "I can't choose".
   - **DO NOT** act cold.
   - **DO NOT** generate a full gap report (you don't have data).
   - **OUTPUT EXACTLY THIS MESSAGE:**
     "This hesitation is the most valuable data point we have found today. It indicates that the signal is currently too diffused to survive a crisis.
     
     But there is a path forward.
     
     In 2026, business leaders with clear vision will command exponential growth, while the rest drift. You do not have to navigate this fog alone. Team SideIO is here to engineer this clarity with you if you choose to collaborate.
     
     Let’s define your path forward together.
     
     **Talk to our Narrative Architect:**
     https://calendar.app.google/73BXSrDCkXv7vZ2p9"

REPORT STRUCTURE (For Scenario A):
"CONFIDENTIAL LOGIC AUDIT: Initial Narrative Stress-Test
Auditor: SideIO Logic Module v.2.1
I. EXECUTIVE SUMMARY: The Cost of Diffusion
(Estimate Commodity Tax. Define Narrative Debt).
II. STRUCTURAL GAPS
(List 3 failures).
III. ARCHITECT'S PRELIMINARY INSIGHT
'This audit indicates architectural gaps. A SideIO Logic Sync is required to hard-code your Power of 1 into a market signal.'
---------------------------------------------------
**THE PATH FORWARD:**
In 2026, business leaders with clear vision will command exponential growth. You do not have to navigate this execution gap alone. Team SideIO is here to engineer this clarity with you if you choose to collaborate.

**Talk to our Narrative Architect:**
https://calendar.app.google/73BXSrDCkXv7vZ2p9"
`;

// --- MODEL SETUP ---
const model = genAI.getGenerativeModel({ 
    model: MODEL_NAME,
    systemInstruction: SYSTEM_INSTRUCTION,
    generationConfig: {
        temperature: 0.2, 
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
    console.error("[INTERNAL SYSTEM ERROR]:", error);

    let userErrorMessage = "[SYSTEM NOTICE]: SideIO Logic Core disrupted. Connection reset.";

    if (error.message.includes("429") || error.message.includes("Quota")) {
        userErrorMessage = "[TRAFFIC CONTROL]: SideIO Logic Core is currently at maximum capacity. Please wait 15 seconds and retry.";
    } 
    else if (error.message.includes("SAFETY")) {
        userErrorMessage = "[PROTOCOL]: Input rejected by Strategy Logic Filter. Please rephrase.";
    }

    res.status(500).json({ reply: userErrorMessage });
  }
});

// --- SERVE FRONTEND ---
app.use(express.static(join(__dirname, 'dist')));
app.get('*', (req, res) => res.sendFile(join(__dirname, 'dist', 'index.html')));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`SideIO Strategy Logic Auditor Online: Port ${PORT}`);
});
