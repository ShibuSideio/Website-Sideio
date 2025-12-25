import React, { useState, useEffect, useRef } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from "jspdf"; // <--- NEW IMPORT FOR PDF GENERATION

// --- CONFIGURATION ---
const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/in/narrative-architect/recent-activity/all/"; 
const CALENDAR_URL = "https://calendar.app.google/73BXSrDCkXv7vZ2p9";

// --- COMPONENT: LINKEDIN FLOATING INTELLIGENCE UNIT ---
const LinkedInFloater = () => (
  <motion.a 
    href={LINKEDIN_PROFILE_URL}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 2, duration: 0.8, type: "spring" }}
    className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-3 bg-white p-2 pr-6 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-gray-100 hover:scale-105 transition-transform group cursor-pointer"
  >
    <div className="relative">
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500">
        <img src="https://ui-avatars.com/api/?name=Narrative+Architect&background=10b981&color=fff" alt="Shibu" className="w-full h-full object-cover" />
      </div>
      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse"></div>
    </div>
    <div className="text-left">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Incoming Signal</p>
      <p className="text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">Read Latest Insight</p>
    </div>
  </motion.a>
);

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

// --- COMPONENT: THE STRATEGY LOGIC AUDITOR (High-Status Interface) ---
const ShadowAuditorModal = ({ isOpen, onClose }) => {
  // 1. STATE MANAGEMENT
  const [messages, setMessages] = useState([
    { 
      role: 'ai', 
      text: "Most CEOs are currently paying a 15% 'Commodity Tax' simply because their market signal is diffused. I am the Strategy Logic Auditor.\n\n" +
            "To begin: Provide the singular strategic priority you believe is currently anchoring your firm’s valuation.\n\n" +
            "(Examples: 'Transitioning from Service to SaaS Platform', 'Vertical integration of the supply chain', or 'Aggressive mid-market consolidation')."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSessionExpired, setIsSessionExpired] = useState(false); 
  const [timeLeft, setTimeLeft] = useState(90); 
  const messagesEndRef = useRef(null);
  const timerRef = useRef(null);

  // 2. SCROLL LOGIC
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  // 3. BODY SCROLL LOCK
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // 4. SCARCITY PROTOCOL
  useEffect(() => {
    if (!isOpen || isSessionExpired) return;
    const resetTimer = () => setTimeLeft(90);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsSessionExpired(true); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    return () => {
      clearInterval(timerRef.current);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [isOpen, isSessionExpired]);

  // 5. PDF GENERATION LOGIC
  const generatePDF = (content) => {
    const doc = new jsPDF();
    
    // Branding
    doc.setTextColor(0, 0, 0);
    doc.setFont("courier", "bold");
    doc.setFontSize(22);
    doc.text("SIDEIO STRATEGY AUDIT", 20, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("CONFIDENTIAL DOSSIER // GENERATED BY LOGIC CORE", 20, 28);
    
    doc.setDrawColor(0, 0, 0);
    doc.line(20, 32, 190, 32);

    // Content Body
    doc.setFont("courier", "normal");
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    
    // Split text to fit PDF width
    const splitText = doc.splitTextToSize(content, 170);
    doc.text(splitText, 20, 45);

    // Clickable Call to Action
    doc.setTextColor(16, 185, 129); // Emerald Color
    doc.setFont("courier", "bold");
    doc.setFontSize(12);
    
    const pageHeight = doc.internal.pageSize.height;
    doc.textWithLink("CLICK TO SECURE DIAGNOSTIC SESSION >>", 20, pageHeight - 30, { url: CALENDAR_URL });
    
    doc.save("SideIO_Confidential_Audit.pdf");
  };

  // 6. SEND MESSAGE LOGIC
  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading || isSessionExpired) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            message: userMsg, 
            history: messages 
        }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
      
      // Stop timer if audit is concluded
      if (data.reply.includes("audit is concluded") || data.reply.includes("CONFIDENTIAL LOGIC AUDIT")) {
          // Keep timer running for effect, but maybe stop strict timeout
      }

    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "[SYSTEM NOTICE]: Connection disrupted due to high latency." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  // Helper to detect if a message is a report/final state
  const isReport = (text) => text.includes("CONFIDENTIAL LOGIC AUDIT") || text.includes("path forward");

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md font-mono"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }} 
          animate={{ scale: 1, opacity: 1, y: 0 }} 
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="w-full h-[100dvh] md:h-[85vh] md:max-w-4xl bg-[#0f172a] md:border border-gray-700 md:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-[#1e293b] px-4 py-4 md:px-6 flex items-center justify-between border-b border-gray-700 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
              <div>
                <h3 className="text-white font-bold tracking-widest text-xs md:text-sm uppercase text-emerald-400">STRATEGY LOGIC AUDITOR</h3>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
                <div className={`hidden md:block text-xs font-bold px-2 py-1 rounded ${timeLeft < 20 ? 'text-red-500 animate-pulse' : 'text-gray-500'}`}>
                    SESSION CLOSES IN: {timeLeft}s
                </div>

                <button onClick={onClose} className="text-gray-400 hover:text-white transition p-2 hover:bg-white/10 rounded-full">
                <span className="sr-only">Close</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
          </div>

          {/* Chat Stream */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-[#0f172a] scrollbar-thin scrollbar-thumb-gray-700">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                
                <div className={`max-w-[90%] md:max-w-[80%] p-4 md:p-5 rounded-2xl text-sm md:text-base leading-relaxed shadow-lg ${
                  msg.role === 'user' 
                    ? 'bg-emerald-900/40 text-white rounded-br-none border border-emerald-800' 
                    : 'bg-[#1e293b] text-cyan-50 border border-gray-700 rounded-bl-none shadow-[0_0_15px_rgba(16,185,129,0.05)]'
                }`}>
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>

                {/* SHOW PDF BUTTON IF THIS IS THE FINAL REPORT */}
                {msg.role === 'ai' && isReport(msg.text) && (
                    <motion.button 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => generatePDF(msg.text)}
                        className="mt-3 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition shadow-lg"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        Download Official Audit (.pdf)
                    </motion.button>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-[#1e293b] px-5 py-3 rounded-2xl rounded-bl-none border border-gray-700 flex items-center gap-2">
                  <span className="text-[10px] text-emerald-500 font-mono uppercase tracking-widest">[ANALYZING LOGIC PATTERNS]</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Console */}
          <div className="bg-[#1e293b] border-t border-gray-700 p-4 shrink-0">
            {isSessionExpired ? (
                <div className="text-center py-4 text-red-400 border border-red-900/30 bg-red-950/10 rounded-xl">
                    <p className="font-bold tracking-widest text-sm uppercase">SESSION TERMINATED DUE TO INACTIVITY.</p>
                    <p className="text-xs mt-2 text-red-500 opacity-70">High-value strategy requires decisiveness.</p>
                    <button 
                        onClick={() => { setIsSessionExpired(false); setTimeLeft(90); setMessages([{role: 'ai', text: "Session Restored. State your priority."}]); }}
                        className="mt-4 px-6 py-2 text-xs font-bold uppercase tracking-wider bg-red-900/20 hover:bg-red-900/40 text-red-200 border border-red-800 rounded transition-all"
                    >
                        REQUEST RE-CONNECTION
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSend} className="flex gap-2 md:gap-4 max-w-full">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Input strategic priority..." 
                    className="flex-1 bg-slate-900 text-white px-4 py-3 md:px-6 md:py-4 rounded-xl border border-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition font-mono placeholder-gray-600 text-sm md:text-base"
                    autoFocus
                />
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-emerald-900/50 text-emerald-400 border border-emerald-800 px-4 md:px-8 py-3 md:py-4 rounded-xl font-bold hover:bg-emerald-900 transition disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide text-xs md:text-sm"
                >
                    ➔
                </button>
                </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => {
  const [isAuditorOpen, setIsAuditorOpen] = useState(false);

  useEffect(() => {
    fetch('/api/visit', { method: 'POST' }).catch(() => {});
  }, []);

  return (
    <div className="font-sans leading-relaxed bg-white text-gray-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* 1. THE FLOATING LINKEDIN SIGNAL */}
      <LinkedInFloater />

      {/* 2. THE STRATEGY AUDITOR MODAL */}
      <ShadowAuditorModal isOpen={isAuditorOpen} onClose={() => setIsAuditorOpen(false)} />

      {/* Navigation */}
      <header className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
        <nav className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent tracking-tight">SIDEIO</h1>
          
          <ul className="hidden md:flex space-x-8 text-sm font-semibold text-gray-600 items-center tracking-wide">
            <li><Link smooth to="#home" className="hover:text-emerald-600 transition-colors">Home</Link></li>
            <li><Link smooth to="#shibu-loop" className="hover:text-emerald-600 transition-colors">The Loop</Link></li>
            <li><Link smooth to="#services" className="hover:text-emerald-600 transition-colors">Frameworks</Link></li>
            <li>
              <Link 
                smooth to="#contact" 
                className="bg-gray-900 text-white px-6 py-2.5 rounded-full hover:bg-emerald-600 transition text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg hover:shadow-emerald-200"
              >
                Book Briefing
              </Link>
            </li>
          </ul>
          
          <Link 
            smooth to="#contact"
            className="md:hidden bg-gray-900 text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-emerald-600 transition"
          >
            Book Briefing
          </Link>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section id="home" className="min-h-screen flex flex-col justify-center px-4 md:px-6 pt-28 pb-12 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-50 via-white to-white">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="max-w-6xl mx-auto text-center w-full"
        >
          <div className="inline-block px-4 py-1.5 mb-6 md:mb-8 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase shadow-sm">
            Global Strategy Architecture
          </div>
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight text-gray-900 tracking-tight">
            Select Your <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Resolution.</span>
          </h2>
          <p className="text-base md:text-xl text-gray-500 mb-12 md:mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
            SideIO operates on two frequencies. Choose the protocol that matches your current velocity.
          </p>
          
          {/* THE GATES */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto px-4">
            
            {/* GATE 1: SME */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="group bg-white border border-gray-100 p-8 md:p-10 rounded-3xl shadow-xl transition-all duration-300 text-left relative overflow-hidden ring-1 ring-gray-100"
            >
               <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-emerald-100 transition-colors"></div>
              <div className="relative z-10">
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Velocity Diagnostic</h3>
                <p className="text-xs text-gray-500 mb-6 font-bold uppercase tracking-widest">For Emerging Giants (SME)</p>
                <p className="text-gray-600 mb-8 leading-relaxed text-sm md:text-base">
                  Identify the <strong className="text-emerald-600">Revenue Gap</strong> in your current model. Quick, precise, and actionable.
                </p>
                <a href="https://shibu-thomas-website.vercel.app/" target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-emerald-500 text-white py-4 rounded-xl font-bold hover:bg-emerald-600 transition shadow-lg">Start 90-Sec Audit</a>
              </div>
            </motion.div>

            {/* GATE 2: CORPORATE */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="group bg-[#1e293b] border border-gray-700 p-8 md:p-10 rounded-3xl shadow-2xl transition-all duration-300 text-left relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
              <div className="relative z-10">
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-700 text-white border border-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Strategy Logic Auditor</h3>
                <p className="text-xs text-gray-400 mb-6 font-bold uppercase tracking-widest">For Corporate / Enterprise</p>
                <p className="text-slate-300 mb-8 leading-relaxed text-sm md:text-base">
                  AI-driven interrogation to expose <strong className="text-white">Narrative Debt</strong> and Strategic Drift. Ruthless logic.
                </p>
                <button onClick={() => setIsAuditorOpen(true)} className="w-full text-center bg-white text-gray-900 py-4 rounded-xl font-bold hover:bg-gray-100 transition shadow-inner">Enter Boardroom</button>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* SHIBU LOOP LOGIC */}
      <section id="shibu-loop" className="py-20 md:py-32 px-4 md:px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <ShibuLoopVisual />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-emerald-600 font-bold tracking-widest uppercase mb-3 text-sm">High-Definition Strategy</h3>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-gray-900 leading-tight">The Shibu 16-Quadrant Loop</h2>
            <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
              Most businesses die in the corners of a 4-quadrant grid. We replaced the old binary models with a <strong>16-Quadrant Diagnostic</strong>.
            </p>
            <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
              We identify the <strong className="text-red-500">Red Dot</strong>—the specific friction point where your "Reactive" customers get stuck before becoming "Active."
            </p>
          </motion.div>
        </div>
      </section>

      {/* FRAMEWORKS SECTION */}
      <section id="services" className="py-20 md:py-32 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Multi-Dimensional Frameworks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Concept to Cash", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80", desc: "Rapid validation. Innovation turned into revenue using the Velocity Loop." },
              { title: "Profit Hacking", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80", desc: "Aggressive revenue growth + precision cost optimisation = EBITDA breakthrough." },
              { title: "Deconstruct & Reimagine", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80", desc: "Data-driven organisational redesign for the next decade of complexity." },
              { title: "Social Identity", img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80", desc: "Crafting brand narratives that align with customers' desired social identities." },
              { title: "Ops Excellence 4.0", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80", desc: "Integrating Industry 4.0 technologies with lean principles for real-time optimization." },
              { title: "Smart Automation", img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80", desc: "Deploying interconnected cyber-physical systems for adaptive ecosystems." }
            ].map((card, index) => (
              <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
                <div className="h-48 md:h-56 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{backgroundImage: `url('${card.img}')`}}></div>
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">{card.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ASSESSMENT REINFORCEMENT */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-white">
        <div className="max-w-4xl mx-auto bg-white border border-gray-200 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -ml-32 -mb-32"></div>
            <div className="relative z-10">
                <p className="text-xl md:text-2xl text-gray-800 mb-8 font-medium">In just 90 seconds, uncover the <strong className="text-emerald-600">Invisible KPI</strong> preventing your conversion.</p>
                <a href="https://shibu-thomas-website.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-4 rounded-full text-lg font-bold hover:shadow-xl transition shadow-lg transform hover:-translate-y-1">Run Diagnostic</a>
            </div>
        </div>
      </section>

      {/* IMPACT & PROOF */}
      <section id="impact" className="py-20 md:py-32 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-gray-900">Proven Delta Transformations</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
                { title: "Healthcare Revenue", delta: "Automated workflow", result: "300% faster cashflow", color: "text-emerald-600" },
                { title: "HVAC Traceability", delta: "Real-time dashboard", result: "40% faster decisions", color: "text-teal-600" },
                { title: "Retail Supply Chain", delta: "Lean replenishment", result: "35% inventory reduction", color: "text-cyan-600" }
            ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h4 className={`text-xl font-bold ${item.color} mb-4`}>{item.title}</h4>
                    <p className="text-gray-600 text-sm mb-4"><strong>Delta:</strong> {item.delta}</p>
                    <p className="text-2xl font-bold text-gray-900">{item.result}</p>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 md:py-32 px-4 md:px-6 bg-white">
        <div className="max-w-5xl mx-auto bg-gray-50 p-8 md:p-16 rounded-[2.5rem] border border-gray-100 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Shibu Thomas</h3>
            <p className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-8">Architect of The Shibu 16-Quadrant Loop</p>
            <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed max-w-3xl mx-auto">
              With over a decade transforming businesses across FMCG, retail, and technology, Shibu architects brand narratives that drive measurable results. He bridges the gap between vision and execution.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-200 pt-10">
              <div><p className="text-4xl md:text-5xl font-black text-emerald-500">10+</p><p className="text-gray-500 mt-2 font-bold text-xs uppercase">Years Experience</p></div>
              <div><p className="text-4xl md:text-5xl font-black text-teal-500">50+</p><p className="text-gray-500 mt-2 font-bold text-xs uppercase">Clients Served</p></div>
              <div><p className="text-4xl md:text-5xl font-black text-cyan-500">3×</p><p className="text-gray-500 mt-2 font-bold text-xs uppercase">Avg Growth</p></div>
            </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 md:py-32 px-4 md:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-gray-900">
            Initiate Your <span className="text-emerald-500">Delta</span>
          </h2>
          <form className="bg-white p-8 md:p-14 rounded-[2.5rem] shadow-xl space-y-6 max-w-2xl mx-auto border border-gray-100">
            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" placeholder="Name" className="w-full px-6 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all" required/>
              <input type="email" placeholder="Email" className="w-full px-6 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all" required/>
            </div>
            <textarea placeholder="Where is your current friction point?" rows="4" className="w-full px-6 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"></textarea>
            <button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 md:py-5 rounded-xl text-lg md:text-xl font-bold hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
              Request Confidential Consultation
            </button>
          </form>
          <p className="mt-12 text-gray-400 font-medium">Cochin • Trivandrum • contact@sideio.com</p>
        </div>
      </section>

      <footer className="py-12 text-center text-gray-400 border-t border-gray-100 text-sm bg-white">
        © 2025 Sideio Impetus Pvt. Ltd. • Architected by Shibu Thomas
      </footer>
    </div>
  )
}

export default App;
