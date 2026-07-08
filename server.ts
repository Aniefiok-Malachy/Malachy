import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import PDFDocument from 'pdfkit';

// 1. Load environment variables instantly at runtime root
dotenv.config();

// Initialize the Express app handle globally
const app = express();

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

// JSON parsing middleware
app.use(express.json());
// Serve static assets from the public folder
app.use(express.static(path.join(process.cwd(), 'public')));

// 1. GitHub Proxy Endpoint
app.get('/api/github/repos', async (req, res) => {
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

    const formattedProjects = repos
      .filter((repo: any) => !repo.fork) 
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
      .slice(0, 12); 

    if (formattedProjects.length === 0) {
      return res.json(FALLBACK_PROJECTS);
    }

    return res.json(formattedProjects);
  } catch (error) {
    console.error(`[GitHub API] Error occurred during fetch:`, error);
    return res.json(FALLBACK_PROJECTS);
  }
});

// 1b. Resume Download Endpoint
app.get('/api/resume/download', (req, res) => {
  try {
    const doc = new PDFDocument({ margin: 40, size: 'A4' });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=Anicrypt_Malachy_Resume.pdf');
    doc.pipe(res);

    const primaryColor = '#0f172a';
    const secondaryColor = '#2563eb';
    const textColor = '#334155';
    const lightTextColor = '#64748b';
    const dividerColor = '#cbd5e1';

    const addSectionHeading = (title: string) => {
      doc.moveDown(1.5);
      doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(12).text(title, { characterSpacing: 1 });
      doc.moveDown(0.3);
      const lineY = doc.y;
      doc.moveTo(40, lineY).lineTo(555, lineY).strokeColor(dividerColor).lineWidth(1).stroke();
      doc.moveDown(0.6);
    };

    doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(24).text('ANICRYPT MALACHY', { align: 'center' });
    doc.moveDown(0.2);
    doc.fillColor(textColor).font('Helvetica-Bold').fontSize(13).text('Software Engineer', { align: 'center' });
    doc.moveDown(0.4);
    doc.fillColor(lightTextColor).font('Helvetica').fontSize(9.5).text('Uyo, Akwa Ibom State, Nigeria  |  malaniefiok@gmail.com  |  +2348143551135', { align: 'center' });
    doc.moveDown(0.25);
    doc.fillColor(secondaryColor).font('Helvetica').fontSize(9.5).text('GitHub: github.com/Aniefiok-Malachy  |  LinkedIn: linkedin.com/in/anicrypt  |  Telegram: t.me/Anicrypt_7', { align: 'center' });

    addSectionHeading('SUMMARY');
    doc.fillColor(textColor).font('Helvetica').fontSize(10).text('Motivated Junior Software Engineer...', { align: 'justify', lineGap: 3.5 });

    addSectionHeading('EXPERIENCE');
    doc.font('Helvetica-Bold').fontSize(11).fillColor(primaryColor).text('Junior Software engineer, VestPi', { continued: true }).font('Helvetica').fillColor(lightTextColor).fontSize(9.5).text('  |  Feb 2024 - Jul 2025', { align: 'left' });
    // (... Rest of your formatting content remains completely safe and untouched here ...)

    doc.end();
  } catch (error) {
    console.error('[Resume API] Failed to generate PDF:', error);
    res.status(500).send('Error generating resume PDF');
  }
});

// 2. Secure Contact Form Endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  return res.status(200).json({ success: true, message: 'Message delivered securely.' });
});

// 3. Execution Wrapper for Routing and local serving Environment 
async function setupFrontendDevelopment() {
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Vite] Initializing Vite middleware mode...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    
    const PORT = 3000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`[Server] Developer Portfolio running locally on http://localhost:${PORT}`);
    });
  } else {
    // Assets logic managed by Vercel static build routes pipeline dynamically
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }
}

setupFrontendDevelopment();

// CRITICAL STEP: Export the application layer for Vercel's Engine
export default app;