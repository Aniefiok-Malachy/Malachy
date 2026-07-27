import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import { useTheme } from './hooks/useTheme';

export default function App() {
  // Initialize and run the theme effect to prevent any light/dark flash.
  useTheme();

  return (
    <div id="portfolio-app-root" className="min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-500">
      {/* Background with Grid, glowing blobs, and color toggles */}
      <AnimatedBackground />

      {/* Header / Sticky Navigation */}
      <Navbar />

      {/* Main Sections layout */}
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
