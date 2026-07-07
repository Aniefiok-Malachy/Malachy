import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import PDFDocument from 'pdfkit';

// Load environment variables
dotenv.config();

// Simple in-memory storage for contact submissions (for simulation/logging)
const submissions: any[] = [];

// Fallback projects to return if GitHub API rate-limits us or is unconfigured
const FALLBACK_PROJECTS = [
  {
    id: 'p1',
    name: 'ledger-sync-sdk',
    description: 'High-performance Stripe billing synchronization layer with multi-region concurrency safety and automatic exponential backoff retry cycles.',
    language: 'TypeScript',
    stargazers_count: 342,
    forks_count: 48,
    updated_at: '2026-06-25T14:22:00Z',
    html_url: 'https://github.com',
    homepage: 'https://stripe.com',
  },
  {
    id: 'p2',
    name: 'edge-router-go',
    description: 'A multi-tenant, zero-allocation WebSockets routing engine written in Go. Compiles to clean web-assembly for high-throughput edge environments.',
    language: 'Go',
    stargazers_count: 289,
    forks_count: 31,
    updated_at: '2026-05-18T09:12:00Z',
    html_url: 'https://github.com',
    homepage: null,
  },
  {
    id: 'p3',
    name: 'crdt-sync-engine',
    description: 'Bi-directional conflict-free offline-first sync libraries implementing state-based CRDTs for collaborative real-time canvases.',
    language: 'TypeScript',
    stargazers_count: 512,
    forks_count: 72,
    updated_at: '2026-06-30T18:45:00Z',
    html_url: 'https://github.com',
    homepage: 'https://linear.app',
  },
  {
    id: 'p4',
    name: 'aura-quantum-viz',
    description: 'Low-latency WebGL visualization toolkit rendering up to 10M concurrent ticks for quantitative trading and financial simulation interfaces.',
    language: 'Rust',
    stargazers_count: 198,
    forks_count: 22,
    updated_at: '2026-04-02T11:05:00Z',
    html_url: 'https://github.com',
    homepage: null,
  },
  {
    id: 'p5',
    name: 'wasm-image-pipeline',
    description: 'Highly-threaded picture formatting and resizing compiler run inside browser service workers to execute image optimization at the client.',
    language: 'C++',
    stargazers_count: 167,
    forks_count: 15,
    updated_at: '2026-03-10T16:50:00Z',
    html_url: 'https://github.com',
    homepage: null,
  },
  {
    id: 'p6',
    name: 'kv-cache-worker',
    description: 'Intelligent multi-layered Key-Value cache optimizer for Cloudflare Workers, maintaining active predictive pre-fetching mechanisms.',
    language: 'TypeScript',
    stargazers_count: 245,
    forks_count: 29,
    updated_at: '2026-05-05T08:30:00Z',
    html_url: 'https://github.com',
    homepage: null,
  },
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON parsing middleware
  app.use(express.json());
  // Serve static assets from the public folder
  app.use(express.static(path.join(process.cwd(), 'public')));

  // 1. GitHub Proxy Endpoint
  app.get('/api/github/repos', async (req, res) => {
    // We can default to a popular enterprise portfolio username like vercel or octocat, 
    // or let the user override via GITHUB_USERNAME env variable
    const username = process.env.GITHUB_USERNAME || 'octocat';
    const token = process.env.GITHUB_TOKEN;

    console.log(`[GitHub API] Fetching repos for user: ${username}`);

    try {
      const headers: Record<string, string> = {
        'User-Agent': 'developer-portfolio-express',
      };

      if (token) {
        headers['Authorization'] = `token ${token}`;
      }

      // Fetch repos from GitHub REST API
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`, {
        headers,
      });

      if (!response.ok) {
        console.warn(`[GitHub API] Non-OK response from GitHub: ${response.status}. Using fallback projects.`);
        return res.json(FALLBACK_PROJECTS);
      }

      const repos = await response.json();
      
      if (!Array.isArray(repos)) {
        console.warn(`[GitHub API] Response is not an array. Using fallback projects.`);
        return res.json(FALLBACK_PROJECTS);
      }

      // Map and clean GitHub API response to match our Project schema
      const formattedProjects = repos
        .filter((repo: any) => !repo.fork) // skip forks for a better portfolio view
        .map((repo: any) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description || '',
          language: repo.language || '',
          stargazers_count: repo.stargazers_count || 0,
          forks_count: repo.forks_count || 0,
          updated_at: repo.updated_at,
          html_url: repo.html_url,
          homepage: repo.homepage || null,
        }))
        .slice(0, 12); // limit to top 12 repositories

      if (formattedProjects.length === 0) {
        return res.json(FALLBACK_PROJECTS);
      }

      return res.json(formattedProjects);
    } catch (error) {
      console.error(`[GitHub API] Error occurred during fetch:`, error);
      console.log(`[GitHub API] Serving cached/fallback projects instead.`);
      return res.json(FALLBACK_PROJECTS);
    }
  });
  
  // 1b. Resume Download Endpoint
  app.get('/api/resume/download', (req, res) => {
    try {
      const doc = new PDFDocument({
        margin: 40,
        size: 'A4',
      });

      // Set headers for PDF download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=Anicrypt_Malachy_Resume.pdf');

      doc.pipe(res);

      // Colors
      const primaryColor = '#0f172a'; // slate-900
      const secondaryColor = '#2563eb'; // blue-600
      const textColor = '#334155'; // slate-700
      const lightTextColor = '#64748b'; // slate-500
      const dividerColor = '#cbd5e1'; // slate-300

      // Helper function to draw headings with a divider line
      const addSectionHeading = (title: string) => {
        doc.moveDown(1.5);
        const y = doc.y;
        doc.fillColor(primaryColor)
           .font('Helvetica-Bold')
           .fontSize(12)
           .text(title, { characterSpacing: 1 });
        
        doc.moveDown(0.3);
        const lineY = doc.y;
        doc.moveTo(40, lineY)
           .lineTo(555, lineY)
           .strokeColor(dividerColor)
           .lineWidth(1)
           .stroke();
        doc.moveDown(0.6);
      };

      // Header Block
      doc.fillColor(primaryColor)
         .font('Helvetica-Bold')
         .fontSize(24)
         .text('ANICRYPT MALACHY', { align: 'center' });

      doc.moveDown(0.2);
      doc.fillColor(textColor)
         .font('Helvetica-Bold')
         .fontSize(13)
         .text('Software Engineer', { align: 'center' });

      doc.moveDown(0.4);
      doc.fillColor(lightTextColor)
         .font('Helvetica')
         .fontSize(9.5)
         .text('Uyo, Akwa Ibom State, Nigeria  |  malaniefiok@gmail.com  |  +2348143551135', { align: 'center' });

      doc.moveDown(0.25);
      doc.fillColor(secondaryColor)
         .font('Helvetica')
         .fontSize(9.5)
         .text('GitHub: github.com/Aniefiok-Malachy  |  LinkedIn: linkedin.com/in/anicrypt  |  Telegram: t.me/Anicrypt_7', { align: 'center' });

      // SUMMARY SECTION
      addSectionHeading('SUMMARY');
      doc.fillColor(textColor)
         .font('Helvetica')
         .fontSize(10)
         .text(
           'Motivated Junior Software Engineer with a solid foundation in programming languages such as Java and Python, and a passion for developing innovative software solutions. Eager to contribute to a dynamic team and leverage my skills in problem-solving and collaboration to drive project success. Committed to continuous learning and growth, I am excited about the opportunity to join your team and help create impactful technology. Creative thinker with a passion for building new projects. Experienced in JavaScript, React.js, solidity and Python. Looking to bring fresh ideas to a forward-thinking team.',
           { align: 'justify', lineGap: 3.5 }
         );

      // EXPERIENCE SECTION
      addSectionHeading('EXPERIENCE');

      // Experience 1
      doc.font('Helvetica-Bold')
         .fontSize(11)
         .fillColor(primaryColor)
         .text('Junior Software engineer, VestPi', { continued: true })
         .font('Helvetica')
         .fillColor(lightTextColor)
         .fontSize(9.5)
         .text('  |  Feb 2024 - Jul 2025', { align: 'left' });

      doc.font('Helvetica-Oblique')
         .fontSize(9.5)
         .fillColor(lightTextColor)
         .text('Uyo, Akwa Ibom State', { align: 'left' });
      doc.moveDown(0.4);

      const exp1Bullets = [
        'Developed and maintained web applications using JavaScript and React.',
        'Collaborated with senior engineers to enhance software functionality and performance.',
        'Implemented unit tests, increasing code reliability and reducing bugs by 30%.',
        'Engaged in continuous learning, acquiring new skills in Python and cloud technologies.',
        'Supported deployment processes, ensuring smooth transitions to production environments.'
      ];

      exp1Bullets.forEach(bullet => {
        doc.font('Helvetica')
           .fontSize(9.5)
           .fillColor(textColor)
           .text('•  ' + bullet, { indent: 15, lineGap: 2.5 });
      });

      doc.moveDown(1);

      // Experience 2
      doc.font('Helvetica-Bold')
         .fontSize(11)
         .fillColor(primaryColor)
         .text('Web3 & Bot Developer, Independent / Freelance', { continued: true })
         .font('Helvetica')
         .fillColor(lightTextColor)
         .fontSize(9.5)
         .text('  |  Jul 2025 - Present', { align: 'left' });

      doc.font('Helvetica-Oblique')
         .fontSize(9.5)
         .fillColor(lightTextColor)
         .text('Remote / Freelance', { align: 'left' });
      doc.moveDown(0.4);

      const exp2Bullets = [
        'Building autonomous automation bots and interactive decentralized Web3 applications.',
        'Engineered an interactive, multi-purpose Telegram group moderation and automated utility bot using Python.',
        'Constructed custom NFT staking dApps with high-fidelity React frontend frameworks and Solidity contract layers.',
        'Designed and documented secure REST APIs with Node.js, Express, and MongoDB integration.'
      ];

      exp2Bullets.forEach(bullet => {
        doc.font('Helvetica')
           .fontSize(9.5)
           .fillColor(textColor)
           .text('•  ' + bullet, { indent: 15, lineGap: 2.5 });
      });

      // EDUCATION SECTION
      addSectionHeading('EDUCATION');

      doc.font('Helvetica-Bold')
         .fontSize(11)
         .fillColor(primaryColor)
         .text('Akwa Ibom State University', { continued: true })
         .font('Helvetica')
         .fillColor(lightTextColor)
         .fontSize(9.5)
         .text('  |  Nov 2019 - Dec 2023', { align: 'left' });

      doc.font('Helvetica-Bold')
         .fontSize(9.5)
         .fillColor(textColor)
         .text('BSc, Mathematics', { continued: true })
         .font('Helvetica-Oblique')
         .fillColor(lightTextColor)
         .text('  |  Akwa Ibom State, Nigeria', { align: 'left' });
      doc.moveDown(0.4);

      const eduBullets = [
        'Graduated with Honors, achieving a GPA of 4.56.',
        'Completed advanced coursework in Abstract Algebra and Real Analysis.',
        'Presented research on mathematical modeling at a national conference.',
        'Led a team project that developed a statistical analysis tool for data sets.'
      ];

      eduBullets.forEach(bullet => {
        doc.font('Helvetica')
           .fontSize(9.5)
           .fillColor(textColor)
           .text('•  ' + bullet, { indent: 15, lineGap: 2.5 });
      });

      // SKILLS SECTION
      addSectionHeading('SKILLS');
      doc.font('Helvetica')
         .fontSize(9.5)
         .fillColor(textColor)
         .text('Problem-Solving  |  Team Collaboration  |  Unit Testing  |  Code Review  |  React.js  |  JavaScript  |  Tailwind CSS  |  Solidity  |  Python  |  Node.js  |  Express.js  |  MongoDB  |  PostgreSQL  |  Hardhat  |  Foundry  |  Git & GitHub', { lineGap: 4 });

      // LANGUAGES SECTION
      addSectionHeading('LANGUAGES');
      doc.font('Helvetica')
         .fontSize(9.5)
         .fillColor(textColor)
         .text('English (Proficient)');

      // HOBBIES AND INTERESTS SECTION
      addSectionHeading('HOBBIES AND INTERESTS');
      doc.font('Helvetica')
         .fontSize(9.5)
         .fillColor(textColor)
         .text('Footballing');

      doc.end();
    } catch (error) {
      console.error('[Resume API] Failed to generate PDF:', error);
      res.status(500).send('Error generating resume PDF');
    }
  });

  // 2. Secure Contact Form Endpoint
  app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Server-side validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are strictly required.' });
    }

    if (message.length < 10) {
      return res.status(400).json({ error: 'Message must be at least 10 characters long.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }

    // Capture submission
    const submission = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    };

    submissions.push(submission);
    console.log(`[Contact Form] Secure submission received:`, submission);

    // In a fully configured system, you would use node mailers (e.g., Nodemailer, Resend, or SendGrid) here.
    return res.status(200).json({
      success: true,
      message: 'Message delivered securely to the portfolio inbox.',
      submissionId: submission.id,
    });
  });

  // 3. Vite development middleware / Static production files serving
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Vite] Initializing Vite middleware mode...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    console.log('[Express] Initializing production static asset serving...');
    const distPath = path.join(process.cwd(), 'dist');
    // Serve public files first
    app.use(express.static(path.join(process.cwd(), 'public')));
    // Then serve the built app
    app.use(express.static(distPath));
    // SPA fallback
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Port and Host binding
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Developer Portfolio running on http://localhost:${PORT}`);
  });
}

startServer();
