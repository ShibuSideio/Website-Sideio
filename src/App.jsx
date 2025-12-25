import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { motion } from 'framer-motion';

// --- The Shibu Loop Visual Component ---
const ShibuLoopVisual = () => (
  <svg viewBox="0 0 500 500" className="w-full max-w-lg mx-auto drop-shadow-2xl">
    <defs>
      {/* Grid Pattern */}
      <pattern id="lightGrid" width="125" height="125" patternUnits="userSpaceOnUse">
        <path d="M 125 0 L 0 0 0 125" fill="none" stroke="#f3f4f6" strokeWidth="2" />
      </pattern>
    </defs>
    
    {/* Background */}
    <rect width="500" height="500" fill="white" rx="20" />
    <rect width="500" height="500" fill="url(#lightGrid)" rx="20" />
    
    {/* Border */}
    <rect x="0" y="0" width="500" height="500" fill="none" stroke="#e5e7eb" strokeWidth="4" rx="20"/>

    {/* The Curve (Emerald Gradient Style) */}
    <path 
      d="M 60 440 C 200 440, 60 60, 440 60" 
      fill="none" 
      stroke="#10b981" 
      strokeWidth="6" 
      strokeLinecap="round"
    />
    
    {/* The Invisible KPI (Friction Point) - Red Pulse */}
    <circle cx="160" cy="280" r="10" fill="#ef4444">
       <animate attributeName="r" values="10;14;10" dur="2s" repeatCount="indefinite" />
       <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
    </circle>
    
    {/* Friction Label connecting to dot */}
    <line x1="160" y1="280" x2="210" y2="280" stroke="#ef4444" strokeWidth="2" strokeDasharray="4"/>
    <text x="220" y="285" fill="#ef4444" fontSize="14" fontWeight="bold" fontFamily="monospace">INVISIBLE KPI</text>

    {/* --- X-AXIS LABELS (Intent Evolution) --- */}
    <text x="62.5" y="480" fill="#6b7280" fontSize="12" fontWeight="bold" textAnchor="middle">PASSIVE</text>
    <text x="187.5" y="480" fill="#6b7280" fontSize="12" fontWeight="bold" textAnchor="middle">REACTIVE</text>
    <text x="312.5" y="480" fill="#6b7280" fontSize="12" fontWeight="bold" textAnchor="middle">ACTIVE</text>
    <text x="437.5" y="480" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">SOVEREIGN</text>

    {/* --- Y-AXIS LABELS (Velocity Evolution) --- */}
    <text x="-437.5" y="30" transform="rotate(-90)" fill="#6b7280" fontSize="12" fontWeight="bold" textAnchor="middle">STATIC</text>
    <text x="-312.5" y="30" transform="rotate(-90)" fill="#6b7280" fontSize="12" fontWeight="bold" textAnchor="middle">LINEAR</text>
    <text x="-187.5" y="30" transform="rotate(-90)" fill="#6b7280" fontSize="12" fontWeight="bold" textAnchor="middle">COMPOUND</text>
    <text x="-62.5" y="30" transform="rotate(-90)" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">EXPONENTIAL</text>
  </svg>
)

const App = () => {
  return (
    <div className="font-sans leading-relaxed bg-white text-gray-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Sticky Navigation */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent tracking-tight">SIDEIO</h1>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 text-sm font-semibold text-gray-600 items-center tracking-wide">
            <li><Link smooth to="#home" className="hover:text-emerald-600 transition-colors duration-200">Home</Link></li>
            <li><Link smooth to="#shibu-loop" className="hover:text-emerald-600 transition-colors duration-200">The Loop</Link></li>
            <li><Link smooth to="#services" className="hover:text-emerald-600 transition-colors duration-200">Frameworks</Link></li>
            <li><Link smooth to="#impact" className="hover:text-emerald-600 transition-colors duration-200">Impact</Link></li>
            <li><Link smooth to="#about" className="hover:text-emerald-600 transition-colors duration-200">About</Link></li>
            <li>
              {/* Header CTA */}
              <a 
                href="https://shibu-thomas-website.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:brightness-110 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Get Started
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-50 via-white to-white">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }} 
          className="max-w-6xl mx-auto text-center"
        >
          <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase shadow-sm">
            Beyond SWOT Analysis
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight text-gray-900 tracking-tight">
            Stop Flying Blind in <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Low Definition.</span>
          </h2>
          <p className="text-lg md:text-2xl text-gray-500 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
            Your dashboard shows the result, but hides the drag. SideIO reveals the <strong className="text-gray-800">Invisible KPI</strong>—the friction coefficient hidden between your growth stages.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            {/* --- Primary Assessment Link (Restored) --- */}
            <a 
              href="https://shibu-thomas-website.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-5 rounded-full text-lg font-bold hover:shadow-xl hover:brightness-110 transition-all duration-300 shadow-emerald-200 shadow-lg text-center"
            >
              Take 90-Second Revenue Gap Assessment
            </a>
            
            {/* Secondary CTA */}
            <Link smooth to="#shibu-loop" className="border-2 border-emerald-500 text-emerald-600 px-10 py-5 rounded-full text-lg font-bold hover:bg-emerald-50 transition-colors duration-300">
              See The Logic
            </Link>
          </div>
        </motion.div>
      </section>

      {/* The Shibu 16-Quadrant Loop Section */}
      <section id="shibu-loop" className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <ShibuLoopVisual />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-emerald-600 font-bold tracking-widest uppercase mb-3 text-sm">High-Definition Strategy</h3>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 leading-tight">The Shibu 16-Quadrant Loop</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Most businesses die in the corners of a 4-quadrant grid. They miss the nuance. We replaced the old binary models with a <strong>16-Quadrant Diagnostic</strong>.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We don't just tell you where your business <em>is</em>. We identify the <strong className="text-red-500">Red Dot</strong>—the specific friction point where your "Reactive" customers get stuck before becoming "Active."
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start group">
                <div className="bg-emerald-100 p-2.5 rounded-xl mr-5 group-hover:bg-emerald-200 transition-colors">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Evolutionary Axes</h4>
                  <p className="text-sm text-gray-500 mt-1">Measuring Intent (Why) vs Velocity (How Fast) across 4 evolutionary stages.</p>
                </div>
              </div>
              <div className="flex items-start group">
                <div className="bg-red-100 p-2.5 rounded-xl mr-5 group-hover:bg-red-200 transition-colors">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Ghost Metrics</h4>
                  <p className="text-sm text-gray-500 mt-1">The invisible data points that P&L sheets miss but sovereign brands master.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Multi-Dimensional Advisory Frameworks */}
      <section id="services" className="py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"
          >
            Multi-Dimensional Frameworks
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
              <div className="h-56 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{backgroundImage: "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80')"}}></div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-emerald-600 mb-3 group-hover:text-emerald-700 transition-colors">Concept to Cash</h3>
                <p className="text-gray-600 leading-relaxed">Rapid validation. Innovation turned into revenue using the Velocity Loop.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
              <div className="h-56 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{backgroundImage: "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80')"}}></div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-teal-600 mb-3 group-hover:text-teal-700 transition-colors">Profit Hacking</h3>
                <p className="text-gray-600 leading-relaxed">Aggressive revenue growth + precision cost optimisation = EBITDA breakthrough.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
              <div className="h-56 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80')"}}></div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-cyan-600 mb-3 group-hover:text-cyan-700 transition-colors">Deconstruct & Reimagine</h3>
                <p className="text-gray-600 leading-relaxed">Data-driven organisational redesign for the next decade of complexity.</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
              <div className="h-56 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{backgroundImage: "url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80')"}}></div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-emerald-600 mb-3 group-hover:text-emerald-700 transition-colors">Social Identity</h3>
                <p className="text-gray-600 leading-relaxed">Crafting brand narratives that align with customers' desired social identities.</p>
              </div>
            </div>

             {/* Card 5 */}
             <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
              <div className="h-56 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80')"}}></div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-teal-600 mb-3 group-hover:text-teal-700 transition-colors">Ops Excellence 4.0</h3>
                <p className="text-gray-600 leading-relaxed">Integrating Industry 4.0 technologies with lean principles for real-time optimization.</p>
              </div>
            </div>

             {/* Card 6 */}
             <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
              <div className="h-56 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{backgroundImage: "url('https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80')"}}></div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-cyan-600 mb-3 group-hover:text-cyan-700 transition-colors">Smart Automation</h3>
                <p className="text-gray-600 leading-relaxed">Deploying interconnected cyber-physical systems for adaptive ecosystems.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Gap Assessment */}
      <section id="assessment" className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"
          >
            Revenue Gap Assessment
          </motion.h2>
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              className="bg-white border border-gray-200 p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
            >
              {/* Decorative Blur */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -ml-32 -mb-32"></div>
              
              <div className="relative z-10">
                <p className="text-2xl text-gray-800 mb-8 font-medium">
                  In just 90 seconds, uncover the <strong className="text-emerald-600">Invisible KPI</strong> preventing your conversion.
                </p>
                <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
                  This quick diagnostic reveals your <strong>Brand Engineering Maturity Score</strong> and highlights where you sit on the 16-Quadrant Loop.
                </p>
                
                {/* --- Secondary Assessment Link (Restored) --- */}
                <a 
                  href="https://shibu-thomas-website.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-12 py-5 rounded-full text-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Take Assessment Now
                </a>
                
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Proven Impact */}
      <section id="impact" className="py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"
          >
            Proven Delta Transformations
          </motion.h2>
          <p className="text-xl text-gray-600 mb-16 max-w-4xl mx-auto">
             At SIDEIO, our most transformative work remains confidential. The leaders we partner with demand privacy for their strategic pivots.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <h4 className="text-xl font-bold text-emerald-600 mb-4">Healthcare Revenue Cycle</h4>
              <p className="text-gray-600 text-sm mb-4"><strong>Delta:</strong> Automated portal integration + workflow redesign</p>
              <p className="text-2xl font-bold text-gray-900">300% faster cashflow</p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <h4 className="text-xl font-bold text-teal-600 mb-4">HVAC Traceability</h4>
              <p className="text-gray-600 text-sm mb-4"><strong>Delta:</strong> Real-time custom dashboard</p>
              <p className="text-2xl font-bold text-gray-900">40% faster decisions</p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <h4 className="text-xl font-bold text-cyan-600 mb-4">Retail Supply Chain</h4>
              <p className="text-gray-600 text-sm mb-4"><strong>Delta:</strong> Lean replenishment model</p>
              <p className="text-2xl font-bold text-gray-900">35% inventory reduction</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-12 text-gray-900"
          >
            Expert Impetus
          </motion.h2>
          <div className="max-w-5xl mx-auto">
            <div className="bg-gray-50 p-12 md:p-16 rounded-[3rem] border border-gray-100">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Shibu Thomas</h3>
              <p className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-8">Architect of The Shibu 16-Quadrant Loop</p>
              
              <p className="text-xl text-gray-700 mb-10 leading-relaxed max-w-3xl mx-auto">
                With over a decade transforming businesses across FMCG, retail, and technology, Shibu architects brand narratives that drive measurable results. He bridges the gap between vision and execution.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-gray-200 pt-10">
                <div className="p-4">
                  <p className="text-5xl font-black text-emerald-500">10+</p>
                  <p className="text-gray-500 mt-2 font-semibold uppercase tracking-wide text-sm">Years Experience</p>
                </div>
                <div className="p-4 border-l-0 md:border-l border-gray-200">
                  <p className="text-5xl font-black text-teal-500">50+</p>
                  <p className="text-gray-500 mt-2 font-semibold uppercase tracking-wide text-sm">Businesses Transformed</p>
                </div>
                <div className="p-4 border-l-0 md:border-l border-gray-200">
                  <p className="text-5xl font-black text-cyan-500">3×</p>
                  <p className="text-gray-500 mt-2 font-semibold uppercase tracking-wide text-sm">Average Growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-12 text-gray-900"
          >
            Initiate Your <span className="text-emerald-500">Delta</span>
          </motion.h2>
          <form className="bg-white p-10 md:p-14 rounded-[2.5rem] shadow-xl space-y-6 max-w-2xl mx-auto border border-gray-100">
            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" placeholder="Name" className="w-full px-6 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all" required/>
              <input type="email" placeholder="Email" className="w-full px-6 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all" required/>
            </div>
            <textarea placeholder="Where is your current friction point?" rows="4" className="w-full px-6 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"></textarea>
            <button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-5 rounded-xl text-xl font-bold hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
              Request Confidential Consultation
            </button>
          </form>
          <p className="mt-12 text-gray-400 font-medium">
            Cochin • Trivandrum • contact@sideio.com
          </p>
        </div>
      </section>

      <footer className="py-12 text-center text-gray-400 border-t border-gray-200 text-sm bg-white">
        © 2025 Sideio Impetus Pvt. Ltd. • Architected by Shibu Thomas
      </footer>
    </div>
  )
}

export default App;
