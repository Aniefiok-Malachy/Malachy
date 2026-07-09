import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  if (!username) {
    return res.status(500).json({
      error: "GITHUB_USERNAME is missing.",
    });
  }

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "portfolio",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`,
      { headers }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        githubStatus: response.status,
        githubResponse: data,
      });
    }

    const repos = data
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

    return res.status(200).json(repos);
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
}