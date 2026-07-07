import { MouseEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Download, Github, Linkedin, Twitter, Mail, Send } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

export default function Hero() {
  const handleViewProjects = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 md:px-8 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center z-10 flex flex-col items-center">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 font-medium text-xs md:text-sm mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          {PERSONAL_INFO.availability}
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-display font-bold text-4xl sm:text-5xl md:text-7xl tracking-tight text-gray-900 dark:text-white leading-tight md:leading-[1.1] mb-6"
        >
          I am{' '}
          <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-500">
            {PERSONAL_INFO.name}
          </span>
        </motion.h1>

        {/* Subtitle / Role */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-display font-semibold text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mb-6"
        >
          {PERSONAL_INFO.title}
        </motion.h2>

        {/* Short introduction */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed mb-10"
        >
          {PERSONAL_INFO.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12"
        >
          <button
            id="view-projects-btn"
            onClick={handleViewProjects}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-950 font-semibold text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 cursor-pointer shadow-md shadow-gray-950/10 dark:shadow-white/5 group"
          >
            View Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            id="download-resume-link"
            href={PERSONAL_INFO.resumeUrl}
            download="Anicrypt_Malachy_Resume.pdf"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/40 text-gray-800 dark:text-gray-200 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors duration-200 cursor-pointer"
          >
            Download Resume
            <Download className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="flex items-center gap-5"
        >
          <a
            id="github-social-link"
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/40 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-700 transition-all"
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            id="linkedin-social-link"
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/40 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-700 transition-all"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            id="twitter-social-link"
            href={PERSONAL_INFO.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/40 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-700 transition-all"
            aria-label="Twitter or X Profile"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            id="telegram-social-link"
            href={PERSONAL_INFO.socials.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/40 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-700 transition-all"
            aria-label="Telegram"
          >
            <Send className="w-5 h-5" />
          </a>
          <a
            id="email-social-link"
            href={`mailto:${PERSONAL_INFO.socials.email}`}
            className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/40 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-700 transition-all"
            aria-label="Email Address"
          >
            <Mail className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      {/* Floating abstract geometrical shapes that drift */}
      <div className="absolute top-[30%] left-[10%] w-6 h-6 border-2 border-dashed border-gray-300 dark:border-gray-800 rounded-full animate-spin [animation-duration:10s] opacity-50 hidden md:block" />
      <div className="absolute bottom-[25%] right-[12%] w-10 h-10 border border-gray-200 dark:border-gray-800 rounded-lg animate-bounce [animation-duration:4s] opacity-40 hidden md:block" />
    </section>
  );
}
