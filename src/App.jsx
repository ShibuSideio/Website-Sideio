import React, { useState, useEffect, useRef } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { motion, AnimatePresence } from 'framer-motion';

// --- VISUAL ASSET: THE SHIBU LOOP ---
const ShibuLoopVisual = () => (
  <svg viewBox="0 0 500 500" className="w-full max-w-lg mx-auto drop-shadow-2xl">
    <defs>
      <pattern id="lightGrid" width="125" height="125" patternUnits="userSpaceOnUse">
        <path d="M 125 0 L 0 0 0 125" fill="none" stroke="#f3f4f6" strokeWidth="2" />
      </pattern>
    </defs>
    <rect width="500" height="500" fill="white" rx="20" />
    <rect width="500" height="500" fill="url(#lightGrid)" rx="20" />
    <rect x="0" y="0" width="500" height="500" fill="none" stroke="#e5e7eb" strokeWidth="4" rx="20"/>
    <path d="M 60 440 C 200 440, 60 60, 440 60" fill="none" stroke="#10b981" strokeWidth="6" strokeLinecap="round"/>
    <circle cx="160" cy="280" r="10" fill="#ef4444">
       <animate attributeName="r" values="10;14;10" dur="2s" repeatCount="indefinite" />
       <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
    </circle>
    <line x1="160" y1="280" x2="210" y2="280" stroke="#ef4444" strokeWidth="2" strokeDasharray="4"/>
    <text x="220" y="285" fill="#ef4444" fontSize="14" fontWeight="bold" fontFamily="monospace">INVISIBLE KPI</text>
    <text x="62.5" y="480" fill="#6b7280" fontSize="12" fontWeight="bold" textAnchor="middle">PASSIVE</text>
    <text x="187.5" y="480" fill="#6b7280" fontSize="12" fontWeight="bold" textAnchor="middle">REACTIVE</text>
    <text x="312.5" y="480" fill="#6b7280" fontSize="12" fontWeight="bold" textAnchor="middle">ACTIVE</text>
    <text x="437.5" y="480" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">SOVEREIGN</text>
    <text x="-437.5" y="30" transform="rotate(-90)" fill="#6b7280" fontSize="12" fontWeight="bold" textAnchor="middle">STATIC</text>
    <text x="-312.5" y="30" transform="rotate(-90)" fill="#6b7280" fontSize="12" fontWeight="bold" textAnchor="middle">LINEAR</text>
    <text x="-187.5" y="30" transform="rotate(-90)" fill="#6b7280" fontSize="12" fontWeight="bold" textAnchor="middle">COMPOUND</text>
    <text x="-62.5" y="30" transform="rotate(-90)" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">EXPONENTIAL</text>
  </svg>
)

// --- COMPONENT: THE SHADOW AUDITOR BOARDROOM (Chat Interface) ---
const ShadowAuditorModal = ({ isOpen, onClose }) => {
  // Initial State: The "Entry" Prompt
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Most CEOs are currently paying a 15% 'Commodity Tax' simply because their market signal is diffused. I am the Shadow Auditor. I am not here to validate your strategy; I am here to find where it is leaking value.\n\nTo begin: Provide the singular strategic priority you believe is currently anchoring your firm’s valuation." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      // 🚀 CALLING YOUR BACKEND LOGIC CORE
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, history: messages })
      });
      const data = await response.json();
      
      // Add AI Response
      setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Connection to Logic Core unstable. Re-calibrating..." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }} 
          animate={{ scale: 1, opacity: 1, y: 0 }} 
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="w-full max-w-4xl bg-[#0f172a] border border-gray-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[70vh] md:h-[800px]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Boardroom Header */}
          <div className="bg-[#1e293b] px-6 py-5 flex items-center justify-between border-b border-gray-700 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
              <div>
                <h3 className="text-white font-bold tracking-widest text-sm uppercase">SHADOW_LOGIC_CORE v3.0</h3>
                <p className="text-gray-400 text-[10px] uppercase tracking-wider">Confidential Clearance: Alpha</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition p-2 hover:bg-white/10 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          {/* Chat Stream */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-slate-900/50 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] md:max-w-[75%] p-5 rounded-2xl text-sm md:text-base leading-relaxed shadow-lg backdrop-blur-sm ${
                  msg.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-br-none border border-emerald-500' 
                    : 'bg-[#1e293b] text-gray-200 border border-gray-700 rounded-bl-none'
                }`}>
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#1e293b] px-6 py-4 rounded-2xl rounded-bl-none border border-gray-700 flex items-center gap-1">
                  <span className="text-xs text-emerald-500 font-mono mr-2">ANALYZING NARRATIVE DEBT</span>
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-75"></span>
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Console */}
          <form onSubmit={handleSend} className="p-6 bg-[#1e293b] border-t border-gray-700 flex gap-4 shadow-[0_-5px_20px_rgba(0,0,0,0.2)]">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Input strategic priority..." 
              className="flex-1 bg-slate-900 text-white px-6 py-4 rounded-xl border border-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition font-medium placeholder-gray-500"
              autoFocus
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-500 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-emerald-900/50 uppercase tracking-wide text-sm"
            >
              Submit
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => {
  const [isAuditorOpen, setIsAuditorOpen] = useState(false);

  // Database Tracking: Fire & Forget
  useEffect(() => {
    fetch('/api/visit', { method: 'POST' }).catch(() => {});
  }, []);

  return (
    <div className="font-sans leading-relaxed bg-white text-gray-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* THE SHADOW MODAL */}
      <ShadowAuditorModal isOpen={isAuditorOpen} onClose={() => setIsAuditorOpen(false)} />

      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent tracking-tight">SIDEIO</h1>
          
          <ul className="hidden md:flex space-x-8 text-sm font-semibold text-gray-600 items-center tracking-wide">
            <li><Link smooth to="#home" className="hover:text-emerald-600 transition-colors">Home</Link></li>
            <li><Link smooth to="#shibu-loop" className="hover:text-emerald-600 transition-colors">The Loop</Link></li>
            <li><Link smooth to="#services" className="hover:text-emerald-600 transition-colors">Frameworks</Link></li>
            <li><Link smooth to="#impact" className="hover:text-emerald-600 transition-colors">Impact</Link></li>
            <li>
              <button 
                onClick={() => setIsAuditorOpen(true)}
                className="bg-gray-900 text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg"
              >
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                Login
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* HERO SECTION: THE DUAL GATE */}
      <section id="home" className="min-h-screen flex flex-col justify-center px-6 pt-28 pb-12 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-50 via-white to-white">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }} 
          className="max-w-6xl mx-auto text-center w-full"
        >
          <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-bold tracking-[0.2em] uppercase shadow-sm">
            Global Strategy Architecture
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight text-gray-900 tracking-tight">
            Select Your <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Resolution.</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-500 mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
            SideIO operates on two frequencies. Choose the protocol that matches your current velocity.
          </p>
          
          {/* THE GATES */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto px-4">
            
            {/* GATE 1: SME / VELOCITY */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="group relative bg-white border border-gray-100 p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-300 text-left overflow-hidden ring-1 ring-gray-100"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-emerald-100 transition-colors"></div>
              
              <div className="relative z-10">
                <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Velocity Diagnostic</h3>
                <p className="text-xs text-gray-500 mb-6 font-bold uppercase tracking-widest">For Emerging Giants (SME)</p>
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                  Identify the <strong className="text-emerald-600">Revenue Gap</strong> in your current model. Quick, precise, and actionable.
                </p>
                
                <a 
                  href="https://shibu-thomas-website.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center bg-emerald-500 text-white py-4 rounded-xl font-bold hover:bg-emerald-600 transition shadow-lg hover:shadow-emerald-200"
                >
                  Start 90-Sec Audit
                </a>
              </div>
            </motion.div>

            {/* GATE 2: CORPORATE / SHADOW */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="group relative bg-[#1e293b] border border-gray-700 p-10 rounded-[2.5rem] shadow-2xl hover:shadow-gray-900/50 transition-all duration-300 text-left overflow-hidden"
            >
              {/* Subtle grid background */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
              
              <div className="relative z-10">
                <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-700 text-white border border-gray-600 shadow-inner">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">The Shadow Auditor</h3>
                <p className="text-xs text-gray-400 mb-6 font-bold uppercase tracking-widest">For Corporate / Enterprise</p>
                <p className="text-slate-300 mb-8 leading-relaxed text-lg">
                  AI-driven interrogation to expose <strong className="text-white">Narrative Debt</strong> and Strategic Drift. Ruthless logic.
                </p>
                
                <button 
                  onClick={() => setIsAuditorOpen(true)}
                  className="w-full text-center bg-white text-gray-900 py-4 rounded-xl font-bold hover:bg-gray-100 transition shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  Enter Boardroom
                </button>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* SHIBU LOOP SECTION */}
      <section id="shibu-loop" className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <ShibuLoopVisual />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-emerald-600 font-bold tracking-widest uppercase mb-3 text-sm">High-Definition Strategy</h3>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 leading-tight">The Shibu 16-Quadrant Loop</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Most businesses die in the corners of a 4-quadrant grid. We replaced the old binary models with a <strong>16-Quadrant Diagnostic</strong>.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We identify the <strong className="text-red-500">Red Dot</strong>—the specific friction point where your "Reactive" customers get stuck.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FRAMEWORKS */}
      <section id="services" className="py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Multi-Dimensional Frameworks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {/* Cards Content (Simplified for brevity - your previous cards go here) */}
             {[
               { title: "Concept to Cash", color: "text-emerald-600", desc: "Rapid validation." },
               { title: "Profit Hacking", color: "text-teal-600", desc: "EBITDA breakthrough." },
               { title: "Deconstruct & Reimagine", color: "text-cyan-600", desc: "Organisational redesign." }
             ].map((c, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className={`text-2xl font-bold ${c.color} mb-3`}>{c.title}</h3>
                    <p className="text-gray-600">{c.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* ABOUT & CONTACT */}
      <section id="contact" className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-8">Initiate Your Delta</h2>
            <p className="text-gray-500 mb-12">contact@sideio.com</p>
        </div>
      </section>

      <footer className="py-12 text-center text-gray-400 border-t border-gray-100 text-sm">
        © 2025 Sideio Impetus Pvt. Ltd. • Architected by Shibu Thomas
      </footer>
    </div>
  )
}

export default App;
