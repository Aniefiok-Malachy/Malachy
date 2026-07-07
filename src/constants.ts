import { ExperienceItem, SkillCategory, CertificationItem, Project, EducationItem } from './types';

export const PERSONAL_INFO = {
  name: 'Anicrypt Malachy',
  title: 'React.js, Solidity & Python Developer',
  subtitle: 'Building high-fidelity decentralized web platforms and automated messaging bots.',
  description: 'Self-taught Frontend Developer specialized in React.js & modern layouts, with blockchain development education from Cyfrin Updraft, and custom server APIs & Telegram automation using Node.js and Python.',
  availability: 'Available for Core Contracts & Collaborative Projects',
  resumeUrl: '/api/resume/download', // Serves a professionally generated PDF from our Node.js backend
  phone: '+2348143551135',
  location: 'Uyo, Akwa Ibom State, Nigeria',
  socials: {
    github: 'https://github.com/Aniefiok-Malachy',
    linkedin: 'https://www.linkedin.com/in/anicrypt/',
    twitter: 'https://x.com/AniCrypt62',
    email: 'malaniefiok@gmail.com',
    telegram: 'https://t.me/Anicrypt_7',
    telegramBot: 'https://t.me/Anicrypt_bot',
  },
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    skills: [
      { name: 'React.js (React 19)', level: 95 },
      { name: 'JavaScript (ES6+)', level: 94 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Framer Motion', level: 88 },
      { name: 'TypeScript', level: 85 },
      { name: 'HTML5 & CSS3', level: 96 },
    ],
  },
  {
    id: 'web3',
    name: 'Web3 & Solidity',
    skills: [
      { name: 'Solidity (Smart Contracts)', level: 90 },
      { name: 'Ethers.js / Viem', level: 86 },
      { name: 'Hardhat / Foundry', level: 82 },
      { name: 'ERC-20, ERC-721, ERC-1155', level: 88 },
      { name: 'DApp Integration (Wagmi/Web3Modal)', level: 85 },
    ],
  },
  {
    id: 'backend',
    name: 'Backend & APIs',
    skills: [
      { name: 'Node.js', level: 70 },
      { name: 'Express.js', level: 72 },
      { name: 'RESTful API Design', level: 75 },
      { name: 'JWT & OAuth Authentication', level: 70 },
    ],
  },
  {
    id: 'database-tools',
    name: 'Databases & Tools',
    skills: [
      { name: 'MongoDB', level: 72 },
      { name: 'PostgreSQL', level: 68 },
      { name: 'Git & GitHub Workflows', level: 88 },
      { name: 'Docker (Basics)', level: 60 },
    ],
  },
];

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    company: 'VestPi',
    position: 'Junior Software Engineer',
    duration: 'Feb 2024 — Jul 2025',
    description: 'Developed and maintained web applications using JavaScript and React. Collaborated with senior engineers to enhance software functionality and performance.',
    achievements: [
      'Implemented unit tests, increasing code reliability and reducing bugs by 30%.',
      'Engaged in continuous learning, acquiring new skills in Python and cloud technologies.',
      'Supported deployment processes, ensuring smooth transitions to production environments.',
    ],
    icon: 'Briefcase',
  },
  {
    company: 'Independent / Freelance',
    position: 'Web3 & Bot Developer',
    duration: 'Jul 2025 — Present',
    description: 'Building autonomous automation bots and interactive decentralized Web3 applications.',
    achievements: [
      'Engineered an interactive, multi-purpose Telegram group moderation and automated utility bot using Python.',
      'Constructed custom NFT staking dApps with high-fidelity React frontend frameworks and Solidity contract layers.',
      'Designed and documented secure REST APIs with Node.js, Express, and MongoDB integration.',
    ],
    icon: 'Cpu',
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'edu-1',
    institution: 'Akwa Ibom State University',
    degree: 'BSc, Mathematics',
    date: 'Nov 2019 — Dec 2023',
    location: 'Akwa Ibom State, Nigeria',
    gpa: '4.56',
    details: [
      'Graduated with Honors, achieving a GPA of 4.56.',
      'Completed advanced coursework in Abstract Algebra and Real Analysis.',
      'Presented research on mathematical modeling at a national conference.',
      'Led a team project that developed a statistical analysis tool for data sets.',
    ],
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'cert-1',
    institution: 'Cyfrin Updraft',
    certificate: 'Smart Contract & Blockchain Development (Foundry & Solidity)',
    date: 'In Progress / Active Student',
    credentialUrl: 'https://updraft.cyfrin.io/dashboard',
  },
];

export const FALLBACK_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'nft-staking-dapp',
    description: 'A decentralized NFT staking protocol. Features audited Solidity staking contracts and a gorgeous React.js dashboard for seamless wallet connections.',
    language: 'Solidity',
    stargazers_count: 85,
    forks_count: 12,
    updated_at: '2026-06-15T10:00:00Z',
    html_url: 'https://github.com/Aniefiok-Malachy/nft-staking-dapp',
    homepage: null,
  },
  {
    id: 'p2',
    name: 'telegram-moderator-bot',
    description: 'An advanced, asynchronous Telegram group moderation and automated utility bot built with Python and python-telegram-bot. Supports interactive inline buttons, spam filters, and warning hierarchies.',
    language: 'Python',
    stargazers_count: 94,
    forks_count: 14,
    updated_at: '2026-06-22T16:20:00Z',
    html_url: 'https://github.com/Aniefiok-Malachy/telegram-moderator-bot',
    homepage: 'https://t.me/Anicrypt_bot',
  },
  {
    id: 'p3',
    name: 'express-secure-api',
    description: 'A lightweight, secure REST API blueprint built with Node.js, Express, and MongoDB. Includes JWT authentication, error handling, and rate-limiting.',
    language: 'JavaScript',
    stargazers_count: 64,
    forks_count: 8,
    updated_at: '2026-05-20T14:30:00Z',
    html_url: 'https://github.com/Aniefiok-Malachy/express-secure-api',
    homepage: null,
  },
  {
    id: 'p4',
    name: 'crypto-tracker-react',
    description: 'Real-time cryptocurrency valuation tracking application built with React.js, Tailwind CSS, and Chart.js integration. Fetches live Coingecko coin data.',
    language: 'JavaScript',
    stargazers_count: 112,
    forks_count: 15,
    updated_at: '2026-06-28T18:15:00Z',
    html_url: 'https://github.com/Aniefiok-Malachy/crypto-tracker-react',
    homepage: null,
  },
  {
    id: 'p5',
    name: 'multisig-escrow-solidity',
    description: 'A highly secure, audited multi-signature escrow smart contract deployed on Ethereum. Restricts fund transfers until all parties sign.',
    language: 'Solidity',
    stargazers_count: 72,
    forks_count: 10,
    updated_at: '2026-04-10T09:12:00Z',
    html_url: 'https://github.com/Aniefiok-Malachy/multisig-escrow-solidity',
    homepage: null,
  },
];
