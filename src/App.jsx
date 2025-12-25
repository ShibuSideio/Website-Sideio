import { HashLink as Link } from 'react-router-hash-link'
import { motion } from 'framer-motion'
import React from 'react'

// --- The Shibu Loop Visual Component (Light Theme Version) ---
const ShibuLoopVisual = () => (
  <svg viewBox="0 0 400 400" className="w-full max-w-lg mx-auto drop-shadow-2xl">
    <defs>
      <pattern id="lightGrid" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#e5e7eb" strokeWidth="1" />
      </pattern>
    </defs>
    
    {/* Background & Grid */}
    <rect width="400" height="400" fill="white" rx="20" />
    <rect width="400" height="400" fill="url(#lightGrid)" rx="20" />
    <rect x="0" y="0" width="400" height="400" fill="none" stroke="#d1d5db" strokeWidth="2" rx="20"/>

    {/* The Curve (Emerald Gradient Style) */}
    <path 
      d="M 50 350 C 150 350, 50 50, 350 50" 
      fill="none" 
      stroke="#10b981" 
      strokeWidth="5" 
      strokeLinecap="round"
    />
    
    {/* The Invisible KPI (Friction Point) - Red Pulse */}
    <circle cx="130" cy="220" r="8" fill="#ef4444">
       <animate attributeName="r" values="8;11;8" dur="2s" repeatCount="indefinite" />
       <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite" />
    </circle>
    
    {/* Labels */}
    <line x1="130" y1="220" x2="170" y2="220" stroke="#ef4444" strokeWidth="1" strokeDasharray="4"/>
    <text x="175" y="225" fill="#ef4444" fontSize="12" fontWeight="bold" fontFamily="monospace">INVISIBLE KPI (FRICTION)</text>

    {/* Axis Labels */}
    <text x="50" y="385" fill="#6b7280" fontSize="10" fontWeight="bold" textAnchor="middle">PASSIVE</text>
    <text x="350" y="385" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">SOVEREIGN</text>
    
    <text x="-20" y="350" transform="rotate(-90, 20, 350)" fill="#6b7280" fontSize="10" fontWeight="bold">STATIC</text>
    <text x="-20" y="50" transform="rotate(-90, 20, 50)" fill="#10b981" fontSize="10" fontWeight="bold">EXPONENTIAL</text>
    
    {/* Title inside Grid */}
    <text x="20" y="30" fill="#374151" fontSize="14" fontWeight="bold">FIG 1.0: THE SHIBU LOOP</text>
  </svg>
)

const App = () => {
  return (
    <div className="font-sans leading-relaxed bg-white text-gray-800">
      {/* Sticky Navigation */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">SIDEIO</h1>
          <ul className="hidden md:flex space-x-8 text-sm font-medium text-gray-600 items-center">
            <li><Link smooth to="#home" className="hover:text-emerald-600 transition">Home</Link></li>
            <li><Link smooth to="#shibu-loop" className="hover:text-emerald-600 transition">The Loop</Link></li>
            <li><Link smooth to="#services" className="hover:text-emerald-600 transition">Frameworks</Link></li>
            <li><Link smooth to="#impact" className="hover:text-emerald-600 transition">Impact</Link></li>
            <li><Link smooth to="#about" className="hover:text-emerald-600 transition">About</Link></li>
            <li><Link smooth to="#contact" className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition font-bold transform hover:-translate-y-0.5">
              Get Started
            </Link></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 bg-gradient-to-b from-white to-gray-50">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-1 mb-6 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold tracking-wide uppercase">
            Beyond SWOT Analysis
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight text-gray-900">
            Stop Flying Blind in <br/>
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Low Definition.</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Your dashboard shows the result, but hides the drag. SideIO reveals the <strong>Invisible KPI</strong>—the friction coefficient hidden between your growth stages.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link smooth to="#contact" className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-4 rounded-full text-lg font-bold hover:shadow-xl transition shadow-md">
              Initialize Audit
            </Link>
            <Link smooth to="#shibu-loop" className="border-2 border-emerald-500 text-emerald-600 px-10 py-4 rounded-full text-lg font-bold hover:bg-emerald-50 transition">
              See The Logic
            </Link>
          </div>
        </motion.div>
      </section>

      {/* NEW: The Shibu 16-Quadrant Loop Section */}
      <section id="shibu-loop" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <ShibuLoopVisual />
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-emerald-600 font-bold tracking-wider uppercase mb-2 text-sm">High-Definition Strategy</h3>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">The Shibu 16-Quadrant Loop</h2>
            <p className="text-lg text-gray-600 mb-6">
              Most businesses die in the corners of a 4-quadrant grid. They miss the nuance. We replaced the old binary models with a <strong>16-Quadrant Diagnostic</strong>.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              We don't just tell you where your business <em>is</em>. We identify the <strong className="text-red-500">Red Dot</strong>—the specific friction point where your "Reactive" customers get stuck before becoming "Active."
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-emerald-100 p-2 rounded-lg mr-4 mt-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Evolutionary Axes</h4>
                  <p className="text-sm text-gray-500">Measuring Intent (Why) vs Velocity (How Fast) across 4 evolutionary stages.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-red-100 p-2 rounded-lg mr-4 mt-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Ghost Metrics</h4>
                  <p className="text-sm text-gray-500">The invisible data points that P&L sheets miss but sovereign brands master.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Multi-Dimensional Advisory Frameworks */}
      <section id="services" className="py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-4xl md:text-5xl font-bold text-center mb-20 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            Multi-Dimensional Frameworks
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Card 1 */}
            <motion.div whileHover={{ y: -10 }} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100">
              <div className="h-48 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80')"}}></div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-emerald-600 mb-3">Concept to Cash</h3>
                <p className="text-gray-600">Rapid validation. Innovation turned into revenue using the Velocity Loop.</p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div whileHover={{ y: -10 }} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100">
              <div className="h-48 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80')"}}></div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-teal-600 mb-3">Profit Hacking</h3>
                <p className="text-gray-600">Aggressive revenue growth + precision cost optimisation = EBITDA breakthrough.</p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div whileHover={{ y: -10 }} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100">
              <div className="h-48 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80')"}}></div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-cyan-600 mb-3">Deconstruct & Reimagine</h3>
                <p className="text-gray-600">Data-driven organisational redesign for the next decade of complexity.</p>
              </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div whileHover={{ y: -10 }} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100">
              <div className="h-48 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80')"}}></div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-emerald-600 mb-3">Social Identity</h3>
                <p className="text-gray-600">Crafting brand narratives that align with customers' desired social identities.</p>
              </div>
            </motion.div>

             {/* Card 5 */}
             <motion.div whileHover={{ y: -10 }} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100">
              <div className="h-48 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80')"}}></div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-teal-600 mb-3">Ops Excellence 4.0</h3>
                <p className="text-gray-600">Integrating Industry 4.0 technologies with lean principles for real-time optimization.</p>
              </div>
            </motion.div>

             {/* Card 6 */}
             <motion.div whileHover={{ y: -10 }} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100">
              <div className="h-48 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80')"}}></div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-cyan-600 mb-3">Smart Automation</h3>
                <p className="text-gray-600">Deploying interconnected cyber-physical systems for adaptive ecosystems.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Revenue Gap Assessment */}
      <section id="assessment" className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-4xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            Revenue Gap Assessment
          </motion.h2>
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white border border-gray-200 p-12 rounded-3xl shadow-xl">
              <p className="text-xl text-gray-700 mb-8">
                In just 90 seconds, uncover the <strong>Invisible KPI</strong> preventing your conversion.
              </p>
              <p className="text-lg text-gray-500 mb-10">
                This quick diagnostic reveals your <strong>Brand Engineering Maturity Score</strong> and highlights where you sit on the 16-Quadrant Loop.
              </p>
              <a href="https://shibu-thomas-website.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-12 py-5 rounded-full text-xl font-bold hover:shadow-2xl transition shadow-lg transform hover:-translate-y-1">
                Run Diagnostic
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Proven Impact */}
      <section id="impact" className="py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-4xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            Proven Delta Transformations
          </motion.h2>
          <motion.p className="text-xl text-gray-600 mb-16 max-w-4xl mx-auto">
             At SIDEIO, our most transformative work remains confidential. The leaders we partner with demand privacy for their strategic pivots.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <h4 className="text-xl font-bold text-emerald-600 mb-4">Healthcare Revenue Cycle</h4>
              <p className="text-gray-600 text-sm mb-4"><strong>Delta:</strong> Automated portal integration + workflow redesign</p>
              <p className="font-bold text-gray-900">300% faster cashflow</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <h4 className="text-xl font-bold text-teal-600 mb-4">HVAC Traceability</h4>
              <p className="text-gray-600 text-sm mb-4"><strong>Delta:</strong> Real-time custom dashboard</p>
              <p className="font-bold text-gray-900">40% faster decisions</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <h4 className="text-xl font-bold text-cyan-600 mb-4">Retail Supply Chain</h4>
              <p className="text-gray-600 text-sm mb-4"><strong>Delta:</strong> Lean replenishment model</p>
              <p className="font-bold text-gray-900">35% inventory reduction</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-4xl md:text-6xl font-bold mb-12 text-gray-900">Expert Impetus</motion.h2>
          <div className="max-w-5xl mx-auto">
            <motion.div className="bg-gray-50 p-12 rounded-3xl border border-gray-100">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Shibu Thomas</h3>
              <p className="text-emerald-600 font-bold uppercase tracking-wide text-sm mb-6">Architect of The Shibu 16-Quadrant Loop</p>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                With over a decade transforming businesses across FMCG, retail, and technology, Shibu architects brand narratives that drive measurable results. He bridges the gap between vision and execution.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
                <div className="p-4">
                  <p className="text-5xl font-bold text-emerald-500">10+</p>
                  <p className="text-gray-500 mt-2 font-medium">Years Experience</p>
                </div>
                <div className="p-4">
                  <p className="text-5xl font-bold text-teal-500">50+</p>
                  <p className="text-gray-500 mt-2 font-medium">Businesses Transformed</p>
                </div>
                <div className="p-4">
                  <p className="text-5xl font-bold text-cyan-500">3×</p>
                  <p className="text-gray-500 mt-2 font-medium">Average Growth</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-4xl md:text-6xl font-bold mb-12 text-gray-900">
            Initiate Your <span className="text-emerald-500">Delta</span>
          </motion.h2>
          <form className="bg-white p-10 rounded-3xl shadow-xl space-y-6 max-w-2xl mx-auto border border-gray-100">
            <input type="text" placeholder="Name" className="w-full px-6 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" required/>
            <input type="email" placeholder="Email" className="w-full px-6 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" required/>
            <textarea placeholder="Where is your current friction point?" rows="4" className="w-full px-6 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"></textarea>
            <button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-5 rounded-xl text-xl font-bold hover:shadow-2xl transition transform hover:-translate-y-1">
              Request Confidential Consultation
            </button>
          </form>
          <p className="mt-10 text-gray-500">
            Cochin • Trivandrum • contact@sideio.com
          </p>
        </div>
      </section>

      <footer className="py-12 text-center text-gray-400 border-t border-gray-100 text-sm">
        © 2025 Sideio Impetus Pvt. Ltd. • Architected by Shibu Thomas
      </footer>
    </div>
  )
}

export default App
