import { ArrowUp, Code, Github, Linkedin, Twitter, Mail, Send } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="border-t border-gray-200 dark:border-gray-900/50 bg-white/30 dark:bg-[#030305]/30 py-12 px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo and Info */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/15">
            <Code className="w-4 h-4" />
          </div>
          <span className="font-display font-bold text-base text-gray-900 dark:text-white">
            {PERSONAL_INFO.name}<span className="text-blue-500">.</span>
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-500 hidden sm:inline-block">
            | {PERSONAL_INFO.title}
          </span>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a
            id="footer-github-link"
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-4.5 h-4.5" />
          </a>
          <a
            id="footer-linkedin-link"
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4.5 h-4.5" />
          </a>
          <a
            id="footer-twitter-link"
            href={PERSONAL_INFO.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label="Twitter or X Profile"
          >
            <Twitter className="w-4.5 h-4.5" />
          </a>
          <a
            id="footer-telegram-link"
            href={PERSONAL_INFO.socials.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label="Telegram"
          >
            <Send className="w-4.5 h-4.5" />
          </a>
          <a
            id="footer-email-link"
            href={`mailto:${PERSONAL_INFO.socials.email}`}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label="Email Address"
          >
            <Mail className="w-4.5 h-4.5" />
          </a>
        </div>

        {/* Copyright and Back to Top */}
        <div className="flex items-center gap-6">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-500">
            &copy; {currentYear} {PERSONAL_INFO.name}. All rights reserved.
          </p>

          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/40 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900/60 cursor-pointer focus:outline-none"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
