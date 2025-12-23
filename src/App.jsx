import { HashLink as Link } from 'react-router-hash-link'
import { motion } from 'framer-motion'

const App = () => {
  return (
    <div className="font-sans leading-relaxed bg-gray-50">
      {/* Navigation */}
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

      {/* Frameworks */}
      <section id="services" className="py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-5xl md:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-emerald to-teal bg-clip-text text-transparent">
            Multi-Dimensional Advisory Frameworks
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Concept to Cash */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white/75 backdrop-blur-lg rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition">
              <div className="h-60 bg-cover bg-center" style={{backgroundImage: "url('https://www.shutterstock.com/image-photo/businessman-climbed-stairs-double-exposure-600nw-2322524389.jpg')"}}></div>
              <div className="p-8">
                <h3 className="text-3xl font-bold text-emerald mb-4">Concept to Cash</h3>
                <p className="text-lg text-gray-800">Rapid validation. Innovation turned into revenue with battle-tested frameworks.</p>
              </div>
            </motion.div>

            {/* Profit Hacking */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} delay={0.1} className="bg-white/75 backdrop-blur-lg rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition">
              <div className="h-60 bg-cover bg-center" style={{backgroundImage: "url('https://www.shutterstock.com/image-photo/2026-growth-strategy-concept-businessman-260nw-2669693039.jpg')"}}></div>
              <div className="p-8">
                <h3 className="text-3xl font-bold text-teal mb-4">Profit Hacking</h3>
                <p className="text-lg text-gray-800">Aggressive revenue growth + precision cost optimisation = EBITDA breakthrough.</p>
              </div>
            </motion.div>

            {/* Deconstruct to Reimagine */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} delay={0.2} className="bg-white/75 backdrop-blur-lg rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition">
              <div className="h-60 bg-cover bg-center" style={{backgroundImage: "url('https://www.shutterstock.com/image-photo/business-people-working-together-on-600nw-2322524391.jpg')"}}></div>
              <div className="p-8">
                <h3 className="text-3xl font-bold text-cyan mb-4">Deconstruct to Reimagine</h3>
                <p className="text-lg text-gray-800">Data-driven organisational redesign for the next decade.</p>
              </div>
            </motion.div>

            {/* Social Identity Engineering */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} delay={0.3} className="bg-white/75 backdrop-blur-lg rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition">
              <div className="h-60 bg-cover bg-center" style={{backgroundImage: "url('https://www.shutterstock.com/image-photo/diverse-marketing-team-members-collaborating-600nw-2575222311.jpg')"}}></div>
              <div className="p-8">
                <h3 className="text-3xl font-bold text-emerald mb-4">Social Identity Engineering</h3>
                <p className="text-lg text-gray-800">Crafting brand narratives that align with customers' desired social identities, fostering emotional connections, loyalty, and organic advocacy.</p>
              </div>
            </motion.div>

            {/* Operational Excellence 4.0 */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} delay={0.4} className="bg-white/75 backdrop-blur-lg rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition">
              <div className="h-60 bg-cover bg-center" style={{backgroundImage: "url('https://imageio.forbes.com/specials-images/imageserve/685d8589f3582f3eb2b03834/0x0.jpg?format=jpg&height=600&width=1200&fit=bounds')"}}></div>
              <div className="p-8">
                <h3 className="text-3xl font-bold text-teal mb-4">Operational Excellence 4.0</h3>
                <p className="text-lg text-gray-800">Integrating Industry 4.0 technologies (IoT, AI, big data) with lean principles for real-time optimization and sustainable operational breakthroughs.</p>
              </div>
            </motion.div>

            {/* Smart Automation (Industry 4.0) */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} delay={0.5} className="bg-white/75 backdrop-blur-lg rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition">
              <div className="h-60 bg-cover bg-center" style={{backgroundImage: "url('https://durolabs.co/wp-content/uploads/2024/12/4IR-Digital-twin-scaled.jpg')"}}></div>
              <div className="p-8">
                <h3 className="text-3xl font-bold text-cyan mb-4">Smart Automation (Industry 4.0)</h3>
                <p className="text-lg text-gray-800">Deploying interconnected cyber-physical systems and intelligent automation for adaptive, resilient, and highly efficient production ecosystems.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Assessment, Proven Impact, Products, About, Contact sections – full code as in final mockup */}
      {/* (To keep this message short, I'll send the remaining sections in the next reply if needed, but the core is now set) */}
    </div>
  )
}

export default App
