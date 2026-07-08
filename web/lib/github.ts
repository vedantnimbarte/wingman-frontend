// Build-time GitHub repo stats (stars, forks). Fetched during the build with a
// graceful fallback, so the number is fresh per deploy without any client call.

export type RepoStats = { stars: number; forks: number };

const fallback: RepoStats = { stars: 0, forks: 0 };

export async function getRepoStats(): Promise<RepoStats> {
  try {
    const res = await fetch("https://api.github.com/repos/vedantnimbarte/Wingman", {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return fallback;
    const d = (await res.json()) as { stargazers_count?: number; forks_count?: number };
    return { stars: d.stargazers_count ?? 0, forks: d.forks_count ?? 0 };
  } catch {
    return fallback;
  }
}

/** 1234 → "1.2k", 999 → "999". */
export function formatCount(n: number): string {
  if (n < 1000) return String(n);
  return `${(n / 1000).toFixed(n < 10000 ? 1 : 0)}k`;
}
