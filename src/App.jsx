import { HashLink as Link } from 'react-router-hash-link'
import { motion } from 'framer-motion'

const App = () => {
  return (
    <div className="font-sans leading-relaxed bg-light text-gray-800">
      {/* Sticky Navigation */}
      <header className="fixed top-0 w-full z-50 bg-white/75 backdrop-blur-lg border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald to-teal bg-clip-text text-transparent">SIDEIO</h1>
          <ul className="hidden md:flex space-x-10 text-sm font-medium text-gray-700">
            <li><Link smooth to="#home" className="hover:text-emerald transition">Home</Link></li>
            <li><Link smooth to="#services" className="hover:text-emerald transition">Frameworks</Link></li>
            <li><Link smooth to="#assessment" className="hover:text-emerald transition">Assessment</Link></li>
            <li><Link smooth to="#impact" className="hover:text-emerald transition">Proven Impact</Link></li>
            <li><Link smooth to="#products" className="hover:text-emerald transition">Solutions</Link></li>
            <li><Link smooth to="#about" className="hover:text-emerald transition">About</Link></li>
            <li><Link smooth to="#contact" className="bg-gradient-to-r from-emerald to-teal text-white px-6 py-3 rounded-full hover:shadow-lg transition font-bold">
              Get Started
            </Link></li>
          </ul>
        </nav>
      </header>

      {/* Hero */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-8">
            Ignite Your <span className="bg-gradient-to-r from-emerald to-teal bg-clip-text text-transparent text-6xl md:text-8xl">Delta</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto">
            Confidential strategic advisory that turns complexity into multiplied growth for ambitious CXOs.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link smooth to="#contact" className="bg-gradient-to-r from-emerald to-teal text-white px-12 py-5 rounded-full text-xl font-bold hover:shadow-2xl transition shadow-lg">
              Schedule Confidential Assessment
            </Link>
            <a href="https://shibu-thomas-website.vercel.app/" target="_blank" rel="noopener noreferrer" className="border-2 border-emerald text-emerald px-12 py-5 rounded-full text-xl font-bold hover:bg-emerald hover:text-white transition">
              Take 90-Second Revenue Gap Assessment
            </a>
            <Link smooth to="#impact" className="border-2 border-teal text-teal px-12 py-5 rounded-full text-xl font-bold hover:bg-teal hover:text-white transition">
              See Proven Impact
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Multi-Dimensional Advisory Frameworks */}
      <section id="services" className="py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-5xl md:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-emerald to-teal bg-clip-text text-transparent">
            Multi-Dimensional Advisory Frameworks
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white/75 backdrop-blur-lg rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition glass-hover">
              <div className="h-64 bg-cover bg-center-top" style={{backgroundImage: "url('https://www.shutterstock.com/image-photo/businessman-climbed-stairs-double-exposure-600nw-2322524389.jpg')"}}></div>
              <div className="p-10">
                <h3 className="text-3xl font-bold text-emerald mb-4">Concept to Cash</h3>
                <p className="text-lg text-gray-700">Rapid validation. Innovation turned into revenue with battle-tested frameworks.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/75 backdrop-blur-lg rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition glass-hover">
              <div className="h-64 bg-cover bg-center-top" style={{backgroundImage: "url('https://www.shutterstock.com/image-photo/2026-growth-strategy-concept-businessman-260nw-2669693039.jpg')"}}></div>
              <div className="p-10">
                <h3 className="text-3xl font-bold text-teal mb-4">Profit Hacking</h3>
                <p className="text-lg text-gray-700">Aggressive revenue growth + precision cost optimisation = EBITDA breakthrough.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/75 backdrop-blur-lg rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition glass-hover">
              <div className="h-64 bg-cover bg-center-top" style={{backgroundImage: "url('https://www.shutterstock.com/image-photo/business-people-working-together-on-600nw-2322524391.jpg')"}}></div>
              <div className="p-10">
                <h3 className="text-3xl font-bold text-cyan mb-4">Deconstruct to Reimagine</h3>
                <p className="text-lg text-gray-700">Data-driven organisational redesign for the next decade.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/75 backdrop-blur-lg rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition glass-hover">
              <div className="h-64 bg-cover bg-center-top" style={{backgroundImage: "url('https://www.shutterstock.com/image-photo/diverse-marketing-team-members-collaborating-600nw-2575222311.jpg')"}}></div>
              <div className="p-10">
                <h3 className="text-3xl font-bold text-emerald mb-4">Social Identity Engineering</h3>
                <p className="text-lg text-gray-700">Crafting brand narratives that align with customers' desired social identities, fostering emotional connections, loyalty, and organic advocacy.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/75 backdrop-blur-lg rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition glass-hover">
              <div className="h-64 bg-cover bg-center-top" style={{backgroundImage: "url('https://imageio.forbes.com/specials-images/imageserve/685d8589f3582f3eb2b03834/0x0.jpg?format=jpg&height=600&width=1200&fit=bounds')"}}></div>
              <div className="p-10">
                <h3 className="text-3xl font-bold text-teal mb-4">Operational Excellence 4.0</h3>
                <p className="text-lg text-gray-700">Integrating Industry 4.0 technologies (IoT, AI, big data) with lean principles for real-time optimization and sustainable operational breakthroughs.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white/75 backdrop-blur-lg rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition glass-hover">
              <div className="h-64 bg-cover bg-center-top" style={{backgroundImage: "url('https://durolabs.co/wp-content/uploads/2024/12/4IR-Digital-twin-scaled.jpg')"}}></div>
              <div className="p-10">
                <h3 className="text-3xl font-bold text-cyan mb-4">Smart Automation (Industry 4.0)</h3>
                <p className="text-lg text-gray-700">Deploying interconnected cyber-physical systems and intelligent automation for adaptive, resilient, and highly efficient production ecosystems.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Revenue Gap Assessment */}
      <section id="assessment" className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-5xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-emerald to-teal bg-clip-text text-transparent">
            Revenue Gap Assessment
          </motion.h2>
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white/75 backdrop-blur-lg p-12 rounded-3xl glass-hover">
              <p className="text-xl text-gray-700 mb-8">
                In just 90 seconds, uncover where your business story isn't converting into customer conviction.
              </p>
              <p className="text-lg text-gray-600 mb-10">
                This quick diagnostic reveals your <strong>Brand Engineering Maturity Score</strong> and highlights the critical gap between your brand narrative and revenue outcomes.
              </p>
              <a href="https://shibu-thomas-website.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-block bg-gradient-to-r from-emerald to-teal text-white px-12 py-5 rounded-full text-xl font-bold hover:shadow-2xl transition shadow-lg">
                Take Assessment Now
              </a>
              <p className="mt-8 text-gray-600">
                Strategic storytelling × operational excellence = measurable growth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Proven Impact */}
      <section id="impact" className="py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-5xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-emerald to-teal bg-clip-text text-transparent">
            Proven Delta Transformations
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-xl text-gray-600 mb-16 max-w-4xl mx-auto">
            At SIDEIO, we operate with the utmost discretion — our most transformative work remains confidential by design. The leaders we partner with demand privacy for their strategic pivots, and we honor that trust unequivocally. Our track record speaks through results alone.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white/75 backdrop-blur-lg p-10 rounded-3xl glass-hover">
              <h4 className="text-2xl font-bold text-emerald mb-6">Healthcare Revenue Cycle</h4>
              <p><strong>Challenge:</strong> Manual eligibility checks delaying reimbursements</p>
              <p><strong>Delta:</strong> Automated portal integration + workflow redesign</p>
              <p className="mt-4 font-semibold text-teal">Result: 300% faster cashflow • 98% accuracy</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/75 backdrop-blur-lg p-10 rounded-3xl glass-hover">
              <h4 className="text-2xl font-bold text-teal mb-6">HVAC Project Traceability</h4>
              <p><strong>Challenge:</strong> No visibility across multi-site projects</p>
              <p><strong>Delta:</strong> Real-time custom dashboard implementation</p>
              <p className="mt-4 font-semibold text-cyan">Result: 40% faster decisions • Zero project delays</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/75 backdrop-blur-lg p-10 rounded-3xl glass-hover">
              <h4 className="text-2xl font-bold text-cyan mb-6">Hospital Finance Optimization</h4>
              <p><strong>Challenge:</strong> Fragmented manual finance operations</p>
              <p><strong>Delta:</strong> End-to-end visibility + automation layer</p>
              <p className="mt-4 font-semibold text-emerald">Result: 20% operational cost reduction in 9 months</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/75 backdrop-blur-lg p-10 rounded-3xl glass-hover">
              <h4 className="text-2xl font-bold text-emerald mb-6">Retail Supply Chain</h4>
              <p><strong>Challenge:</strong> High inventory carrying costs and stockouts</p>
              <p><strong>Delta:</strong> Demand forecasting + lean replenishment model</p>
              <p className="mt-4 font-semibold text-teal">Result: 35% inventory reduction • 15% revenue uplift</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/75 backdrop-blur-lg p-10 rounded-3xl glass-hover">
              <h4 className="text-2xl font-bold text-teal mb-6">Manufacturing Efficiency</h4>
              <p><strong>Challenge:</strong> Downtime and quality variance across plants</p>
              <p><strong>Delta:</strong> Predictive maintenance + process standardization</p>
              <p className="mt-4 font-semibold text-cyan">Result: 28% reduction in unplanned downtime • 12% quality improvement</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white/75 backdrop-blur-lg p-10 rounded-3xl glass-hover">
              <h4 className="text-2xl font-bold text-cyan mb-6">Startup Go-to-Market</h4>
              <p><strong>Challenge:</strong> No structured GTM strategy for new product launch</p>
              <p><strong>Delta:</strong> Customer discovery + phased rollout framework</p>
              <p className="mt-4 font-semibold text-emerald">Result: 6-month time-to-revenue • 3× faster customer acquisition</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scalable Solutions */}
      <section id="products" className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-5xl md:text-6xl font-bold mb-20 bg-gradient-to-r from-emerald to-teal bg-clip-text text-transparent">Scalable Solutions</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white/75 backdrop-blur-lg p-12 rounded-3xl glass-hover">
              <h3 className="text-4xl font-bold text-emerald mb-4">Scale Up</h3>
              <p className="text-xl text-gray-700">Growth frameworks for ambitious enterprises</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/75 backdrop-blur-lg p-12 rounded-3xl glass-hover">
              <h3 className="text-4xl font-bold text-teal mb-4">Tech Up</h3>
              <p className="text-xl text-gray-700">Future-ready technology architecture</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/75 backdrop-blur-lg p-12 rounded-3xl glass-hover">
              <h3 className="text-4xl font-bold text-cyan mb-4">Smart Up</h3>
              <p className="text-xl text-gray-700">Intelligent, data-driven advisory</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expert Impetus / About */}
      <section id="about" className="py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-5xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-emerald to-teal bg-clip-text text-transparent">Expert Impetus</motion.h2>
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white/75 backdrop-blur-lg p-12 rounded-3xl">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Shibu Thomas – Narrative Architect</h3>
              <p className="text-xl text-gray-700 mb-8">
                With over a decade transforming businesses across FMCG, retail, technology, and healthcare, Shibu architects brand narratives that drive measurable results.
              </p>
              <p className="text-lg text-gray-600 mb-10">
                Combining strategic storytelling with operational excellence, he bridges the gap between vision and execution — helping 50+ businesses engineer sustainable growth across 5 industries.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
                <div className="p-6">
                  <p className="text-5xl font-bold bg-gradient-to-r from-emerald to-teal bg-clip-text text-transparent">10+</p>
                  <p className="text-gray-600">Years Experience</p>
                </div>
                <div className="p-6">
                  <p className="text-5xl font-bold bg-gradient-to-r from-emerald to-teal bg-clip-text text-transparent">50+</p>
                  <p className="text-gray-600">Businesses Transformed</p>
                </div>
                <div className="p-6">
                  <p className="text-5xl font-bold bg-gradient-to-r from-emerald to-teal bg-clip-text text-transparent">3×</p>
                  <p className="text-gray-600">Average Growth Delivered</p>
                </div>
              </div>
              <p className="text-lg text-gray-700">
                Expertise: <strong>Brand Engineering • Growth Strategy • Digital Transformation</strong><br/>
                One roof. Narrative-driven advisory. Infinite outcomes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-5xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-emerald to-teal bg-clip-text text-transparent">
            Initiate Your Delta
          </motion.h2>
          <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white/75 backdrop-blur-lg p-12 rounded-3xl space-y-6 max-w-2xl mx-auto">
            <input type="text" placeholder="Name" className="w-full px-6 py-4 bg-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald" required/>
            <input type="email" placeholder="Email" className="w-full px-6 py-4 bg-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald" required/>
            <input type="tel" placeholder="Phone" className="w-full px-6 py-4 bg-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald"/>
            <textarea placeholder="How can we help you achieve nX growth?" rows="4" className="w-full px-6 py-4 bg-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald"></textarea>
            <button type="submit" className="w-full bg-gradient-to-r from-emerald to-teal text-white py-5 rounded-xl text-xl font-bold hover:shadow-2xl transition">
              Request Confidential Consultation
            </button>
          </motion.form>
          <p className="mt-10 text-gray-600">
            Cochin • Trivandrum • contact@sideio.com
          </p>
        </div>
      </section>

      <footer className="py-12 text-center text-gray-500 border-t border-gray-200">
        © 2025 Sideio Impetus Pvt. Ltd. • Driving nX Growth
      </footer>
    </div>
  )
}

export default App
