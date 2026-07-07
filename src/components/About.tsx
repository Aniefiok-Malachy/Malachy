import { motion } from 'motion/react';
import { Layers, Server, Cpu, Zap, Shield, Sparkles, Download } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const CAPABILITIES = [
  {
    title: 'Frontend Engineering',
    description: 'Crafting responsive, high-fidelity user experiences using React.js, ES6+ JavaScript, and modern Framer Motion micro-animations.',
    icon: Layers,
    color: 'from-blue-500 to-cyan-500',
    lightBg: 'bg-blue-500/5 border-blue-500/10 text-blue-600',
    darkBg: 'dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-400',
  },
  {
    title: 'Web3 & Decentralization',
    description: 'Developing secure, audited Solidity smart contracts and clean decentralized app (dApp) client-side wallet integrations.',
    icon: Cpu,
    color: 'from-emerald-500 to-teal-500',
    lightBg: 'bg-emerald-500/5 border-emerald-500/10 text-emerald-600',
    darkBg: 'dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400',
  },
  {
    title: 'Backend Development',
    description: 'Designing modular, light server-side RESTful API architectures utilizing Node.js, Express, and JWT security keys.',
    icon: Server,
    color: 'from-purple-500 to-indigo-500',
    lightBg: 'bg-purple-500/5 border-purple-500/10 text-purple-600',
    darkBg: 'dark:bg-purple-500/10 dark:border-purple-500/20 dark:text-purple-400',
  },
  {
    title: 'Modern Tools & Testing',
    description: 'Testing smart contracts with Hardhat/Foundry, organizing database schemas with MongoDB, and maintaining active version control.',
    icon: Zap,
    color: 'from-amber-500 to-orange-500',
    lightBg: 'bg-amber-500/5 border-amber-500/10 text-amber-600',
    darkBg: 'dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="mb-16 text-center md:text-left">
        <h2 className="font-display font-bold text-3xl md:text-5xl text-gray-900 dark:text-white mb-4">
          Development Philosophy
        </h2>
        <div className="h-1.5 w-20 bg-blue-500 rounded-full mx-auto md:mx-0 mb-6" />
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl text-lg leading-relaxed">
          I build interfaces and decentralized systems that prioritize speed, security, and exceptional user interactions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Biography Column */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="font-display font-bold text-xl md:text-2xl text-gray-900 dark:text-white">
            About Me
          </h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
            I am a software developer specializing in building modern web applications. My core expertise lies in designing modular user interfaces with React.js and writing secure smart contracts on Ethereum using Solidity.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
            I also build secure, solid server-side APIs using Node.js and Express to tie Web2 persistence and security with off-chain Web3 services. I focus on clean, self-documenting code and scalable layout design.
          </p>
          <div className="pt-4">
            <a
              id="about-download-resume"
              href={PERSONAL_INFO.resumeUrl}
              download="Anicrypt_Malachy_Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-950 font-semibold text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-all cursor-pointer shadow-md"
            >
              <Download className="w-4.5 h-4.5" />
              Download Resume
            </a>
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {CAPABILITIES.map((cap, idx) => {
            const IconComponent = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group p-6 rounded-2xl glass hover:shadow-lg transition-all duration-300 relative overflow-hidden"
              >
                {/* Visual accent lines */}
                <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${cap.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Icon Container */}
                <div className={`inline-flex p-3 rounded-xl mb-5 border ${cap.lightBg} ${cap.darkBg} group-hover:scale-105 transition-transform duration-300`}>
                  <IconComponent className="w-6 h-6" />
                </div>

                <h4 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-2.5">
                  {cap.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {cap.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
