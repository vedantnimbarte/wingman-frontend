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
const seed: Release[] = [
  {
    tag: "v0.3.0",
    name: "v0.3.0",
    date: "2026-09-05",
    url: `${product.repo}/releases/tag/v0.3.0`,
    highlights: [
      "Actionable desktop notifications: an agent can stop, ask, and be answered in place — from a detached run, a worker, or the TUI.",
      "The web panel `wingman serve` hosts: live runs, the plan gate, streaming sessions, worker transcripts, and spend charted by day.",
      "A kanban board over every pilot run, with its own TUI and columns derived from run state.",
      "`run_plan` chains dependent tool calls in one round trip; background shell jobs are drivable over stdin.",
      "`WINGMAN_HOME` relocates the whole global directory, and an existing Claude Code hooks block runs as-is.",
    ],
  },
  {
    tag: "v0.2.0",
    name: "v0.2.0",
    date: "2026-08-20",
    url: `${product.repo}/releases/tag/v0.2.0`,
    highlights: [
      "LSP-backed code intelligence across 11 languages, with tree-sitter fallback.",
      "The verification gate folds LSP diagnostics for changed files into the verdict.",
      "Pilot mode and `wingman serve`, plus Wingman as an MCP server.",
      "Hybrid dense + BM25 repo index, cost budgets, and `wingman doctor`.",
      "Homebrew, Scoop, and winget packaging.",
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

/**
 * The seed, with inline markdown flattened the same way a fetched body is.
 *
 * Highlights render as plain text, so a seed written with backticks showed
 * `wingman serve` with the backticks in it while the fetched ones came out
 * clean. Normalising here rather than at the call sites means the next person
 * to add a seed entry cannot reintroduce that by writing natural markdown.
 */
const fallback: Release[] = seed.map((r) => ({
  ...r,
  highlights: r.highlights.map(plain),
}));

const REPO_API = "https://api.github.com/repos/vedantnimbarte/Wingman/releases";

/**
 * Markdown inline syntax, flattened — highlights render as plain text.
 *
 * Only backticks and asterisks come out. Underscores and tildes are emphasis in
 * markdown but they are also `ask_user` and `~/.wingman/`, and this body is
 * mostly identifiers and paths — stripping them turned those into "askuser" and
 * "/.wingman/".
 */
function plain(line: string): string {
  return line
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // [text](url) -> text
    .replace(/[`*]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Pull display highlights out of a release body.
 *
 * Bullets are preferred and everything structural is skipped, because the body
 * is written for the GitHub releases page rather than for this one: it opens
 * with prose, carries fenced install commands, and uses tables. Taking the
 * first few lines verbatim — which this did — surfaced "```bash" as a
 * highlight the moment a release shipped with an install snippet near the top.
 */
function bodyToHighlights(body: string | null): string[] {
  if (!body) return [];
  const bullets: string[] = [];
  const prose: string[] = [];
  let fenced = false;

  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (line.startsWith("```")) {
      fenced = !fenced;
      continue;
    }
    // Code, headings, tables and rules are structure, not content.
    if (fenced || line.length === 0) continue;
    if (line.startsWith("#") || line.startsWith("|") || /^-{3,}$/.test(line)) continue;

    const bullet = line.match(/^[-*]\s+(.*)$/);
    if (bullet) {
      const text = plain(bullet[1]);
      if (text) bullets.push(text);
    } else {
      const text = plain(line);
      if (text) prose.push(text);
    }
  }

  // Prose only when a release wrote no bullets at all, so a short announcement
  // still says something rather than nothing.
  return (bullets.length > 0 ? bullets : prose).slice(0, 5);
}

/** The curated highlights for a tag, when GitHub has nothing to say about it. */
function seeded(tag: string): string[] {
  return fallback.find((r) => r.tag === tag)?.highlights ?? [];
}

/**
 * Fetched at build time (SSG). Falls back to a static seed on any error.
 *
 * The seed is also used per-release, not just when the whole request fails:
 * v0.1.0 and v0.2.0 were published with empty bodies, so the API returns them
 * with nothing to show and the changelog listed two versions and a date. A tag
 * we have written highlights for should use them rather than render blank.
 */
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
      .map((r) => {
        const parsed = bodyToHighlights(r.body);
        return {
          tag: r.tag_name,
          name: r.name || r.tag_name,
          date: r.published_at ? r.published_at.slice(0, 10) : null,
          url: r.html_url,
          highlights: parsed.length > 0 ? parsed : seeded(r.tag_name),
        };
      });
    return releases.length > 0 ? releases : fallback;
  } catch {
    return fallback;
  }
}
