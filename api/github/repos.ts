import type { VercelRequest, VercelResponse } from '@vercel/node';

const FALLBACK_PROJECTS = [
  {
    id: 'p1',
    name: 'ledger-sync-sdk',
    description: 'High-performance Stripe billing synchronization layer.',
    language: 'TypeScript',
    stargazers_count: 342,
    forks_count: 48,
    updated_at: '2026-06-25T14:22:00Z',
    html_url: 'https://github.com',
    homepage: null,
  },
];

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const username = process.env.GITHUB_USERNAME || 'Aniefiok-Malachy';
  const token = process.env.GITHUB_TOKEN;

  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'portfolio',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`,
      { headers }
    );

    if (!response.ok) {
      return res.status(200).json(FALLBACK_PROJECTS);
    }

    const repos = await response.json();

    const formatted = repos
      .filter((repo: any) => !repo.fork)
      .map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        updated_at: repo.updated_at,
        html_url: repo.html_url,
        homepage: repo.homepage,
      }))
      .slice(0, 12);

    return res.status(200).json(formatted);
  } catch (err) {
    return res.status(200).json(FALLBACK_PROJECTS);
  }
}