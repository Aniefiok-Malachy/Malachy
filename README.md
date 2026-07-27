# Enterprise-Grade Personal Developer Portfolio

An enterprise-quality personal portfolio website designed for senior software engineers. Built with a robust, modern stack centering around React, Express, Vite, Tailwind CSS (v4), and Framer Motion. 

This portfolio features fluid glassmorphism aesthetics, dynamic interactive timelines, filterable skill matrices, custom theme toggling (system dark-mode first), and real-time synchronization with public GitHub repositories via a secured Express proxy backend.

---

## Technical Stack
- **Frontend Layer**: React 19 + TypeScript + Vite
- **Server proxy Layer**: Express + `tsx` (TypeScript Executor)
- **Styling Architecture**: Tailwind CSS (v4) with custom @theme font & layout layers
- **Motion Orchestrator**: Framer Motion
- **Icon Assets**: Lucide React
- **Bundling System**: `esbuild` (compiles the entire backend into a production-optimized `dist/server.cjs`)

---

## File Structure

```
portfolio/
├── server.ts                 # Full-stack Express backend server (Vite middleware proxy)
├── index.html                # Main entry index
├── package.json              # Dependency and build scripts manifest
├── vite.config.ts            # Vite asset & watch config
├── src/
│   ├── main.tsx              # React mounting root
│   ├── App.tsx               # Primary portfolio page shell
│   ├── index.css             # Tailwind v4 globals, custom Google Fonts, and glassmorphic layers
│   ├── types.ts              # Global TypeScript interfaces (Project, ExperienceItem, etc.)
│   ├── constants.ts          # Personal bios, skill matrices, credentials, and robust fallback projects
│   ├── hooks/
│   │   └── useTheme.ts       # Secure theme toggle sync (prevents light flashes, saves in localStorage)
│   └── components/
│       ├── AnimatedBackground.tsx  # Dynamic floating CSS blobs & grid pattern
│       ├── Navbar.tsx              # Sticky glassmorphic header, intersection observer highlighting, mobile menu
│       ├── Hero.tsx                # Attention-grabbing headline, CTA, and real-time availability badges
│       ├── About.tsx               # Biography with modular capability cards
│       ├── Skills.tsx              # Interactive filterable skill grids with animated level meters
│       ├── Projects.tsx            # Live GitHub repo synchronizer (search, filter, pagination, loading skeletons)
│       ├── Experience.tsx          # Vertical trajectory timeline with custom Lucide icons
│       ├── Certifications.tsx      # Credential verification badges
│       ├── Contact.tsx             # Validated contact form with processing, success, and error states
│       ├── Footer.tsx              # Copyright and social anchors with Back-To-Top trigger
│       └── ThemeToggle.tsx         # Animated icon switcher
```

---

## Configuration & Environment Variables

Create or adjust your `.env` configuration file in the project root. The following keys are supported:

```env
# The GitHub username to pull open-source repositories from.
# Defaults to "octocat" if not provided.
GITHUB_USERNAME="your-github-username"

# Optional GitHub Personal Access Token to prevent client rate-limits.
GITHUB_TOKEN="your_personal_access_token"
```

---

## Getting Started

### 1. Installation
Install all base dependencies:
```bash
npm install
```

### 2. Run Development Server
Launches the Express backend proxy on port `3000` with the Vite HMR engine:
```bash
npm run dev
```

### 3. Production Compilation & Packaging
Compiles the static frontend assets and bundles the Express server file into `dist/server.cjs` utilizing the automated `esbuild` system:
```bash
npm run build
```

### 4. Run Production Build
Starts the compiled CommonJS server in production mode:
```bash
npm run start
```

---

## Customization Guide

### Personal Information & Trajectory
All personal details (e.g., name, credentials, history, and backup projects) are centralized in `/src/constants.ts`. Update the `PERSONAL_INFO`, `SKILL_CATEGORIES`, `EXPERIENCE_TIMELINE`, and `CERTIFICATIONS` arrays to customize the portfolio content in seconds.

### Aesthetics & Typography
Google Fonts ("Inter", "Space Grotesk", and "JetBrains Mono") are declared in `/src/index.css`. Theme tokens and visual variables can be modified within the `@theme` block in the same file.

---

## Features Walkthrough

- **Dark Mode First**: Defaults to a space-inspired dark palette. Remembers user selections via `localStorage` to avoid blinding page flashing on reloads.
- **GitHub Synced**: Queries the server proxy `GET /api/github/repos` to serve up-to-date repo statistics (descriptions, language tags, star counts, forks) directly from GitHub's live database.
- **Form Verification**: Secures and validates contact data both in client UI states and on server endpoints.
