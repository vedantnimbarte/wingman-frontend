import { product } from "@/content/product";

export type Release = {
  tag: string;
  name: string;
  date: string | null;
  url: string;
  highlights: string[];
};

// Static fallback so the page always renders, even if the GitHub API is
// unavailable or rate-limited at build time.
const fallback: Release[] = [
  {
    tag: "v0.2.0",
    name: "v0.2.0",
    date: "2026-08-20",
    url: `${product.repo}/releases/tag/v0.2.0`,
    highlights: [
      "LSP-backed code intelligence across 11 languages, with tree-sitter fallback.",
      "The verification gate folds LSP diagnostics for changed files into the verdict.",
      "Pilot mode, the board, and `wingman serve` with an HTTP/SSE API and web panel.",
      "Background shell jobs, `run_plan`, and a Claude Code hooks bridge.",
      "`wingman cost --compare` reprices your token volume against other models.",
    ],
  },
  {
    tag: "v0.1.0",
    name: "v0.1.0 — first release",
    date: "2026-07-08",
    url: `${product.repo}/releases/tag/v0.1.0`,
    highlights: [
      "Prebuilt binaries for Linux (x86_64/aarch64), macOS (Apple Silicon), and Windows.",
      "One-line install via install.sh.",
      "Multi-provider TUI, headless --print, and --batch modes.",
    ],
  },
];

const REPO_API = "https://api.github.com/repos/vedantnimbarte/Wingman/releases";

function bodyToHighlights(body: string | null): string[] {
  if (!body) return [];
  return body
    .split("\n")
    .map((l) => l.replace(/^[-*]\s+/, "").trim())
    .filter((l) => l.length > 0 && !l.startsWith("#"))
    .slice(0, 5);
}

/** Fetched at build time (SSG). Falls back to a static seed on any error. */
export async function getReleases(): Promise<Release[]> {
  try {
    const res = await fetch(REPO_API, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return fallback;
    const data = (await res.json()) as Array<{
      tag_name: string;
      name: string | null;
      published_at: string | null;
      html_url: string;
      body: string | null;
      draft: boolean;
      prerelease: boolean;
    }>;
    const releases = data
      .filter((r) => !r.draft)
      .map((r) => ({
        tag: r.tag_name,
        name: r.name || r.tag_name,
        date: r.published_at ? r.published_at.slice(0, 10) : null,
        url: r.html_url,
        highlights: bodyToHighlights(r.body),
      }));
    return releases.length > 0 ? releases : fallback;
  } catch {
    return fallback;
  }
}
