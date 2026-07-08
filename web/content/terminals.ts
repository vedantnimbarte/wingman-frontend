// Terminal "screenshots" as structured text (crisp, themeable, accessible).
// A span is a string or { t, c } where c is a restrained on-dark color key.
// Keep the palette narrow per DESIGN.md — no rainbow.

export type Span = string | { t: string; c: "accent" | "dim" | "ok" | "path" | "user" };
export type Line = Span | Span[];

export type Term = {
  title: string;
  /** One-line description for accessibility / captions. */
  summary: string;
  lines: Line[];
};

const P = (t: string): Span => ({ t, c: "user" }); // shell prompt marker

export const terminals: Record<string, Term> = {
  hero: {
    title: "wingman — ~/acme-api",
    summary: "The Wingman TUI: transcript, tool calls, and status line.",
    lines: [
      [{ t: "▍ wingman", c: "accent" }, { t: "  read-only  ·  anthropic/claude-opus-4-8", c: "dim" }],
      "",
      [{ t: "you", c: "user" }, "  where is the rate limiter configured?"],
      "",
      [{ t: "wingman", c: "accent" }, "  Searching the project…"],
      [{ t: "  ⏺ grep", c: "ok" }, { t: "  \"RateLimiter\"  → 3 matches", c: "dim" }],
      [{ t: "  ⏺ read", c: "ok" }, { t: "  src/mw/ratelimit.rs", c: "path" }],
      "",
      "  It's in src/mw/ratelimit.rs — a token-bucket keyed by API",
      "  key, 100 req/min, configured from [limits] in config.toml.",
      "",
      [{ t: "  › ", c: "dim" }, { t: "ask a follow-up…", c: "dim" }, { t: "▏", c: "accent" }],
    ],
  },

  model: {
    title: "wingman — /model",
    summary: "Switching provider and model mid-session with /model.",
    lines: [
      [P("/model"), " openrouter/anthropic/claude-opus-4-8"],
      [{ t: "  ✓", c: "ok" }, " provider → openrouter"],
      [{ t: "  ✓", c: "ok" }, " model    → anthropic/claude-opus-4-8"],
      { t: "  history preserved · no restart", c: "dim" },
      "",
      [P("/model"), " ollama/llama3.1"],
      [{ t: "  ✓", c: "ok" }, " now running fully local (ollama)"],
    ],
  },

  print: {
    title: "bash — headless",
    summary: "Headless one-shot with newline-delimited JSON events.",
    lines: [
      [P("wingman --print --json"), ' "list the crates" \\'],
      [{ t: "    | jq -r 'select(.type==\"text\") | .text'", c: "dim" }],
      "",
      { t: '{"type":"tool","name":"list_dir","path":"crates/"}', c: "dim" },
      "wingman-cli, wingman-core, wingman-tui, wingman-tools,",
      "wingman-providers, wingman-rag, wingman-mcp, wingman-learn…",
      { t: '{"type":"stop","reason":"end_turn"}', c: "dim" },
    ],
  },

  knows: {
    title: "wingman knows",
    summary: "What Wingman has learned about the current project.",
    lines: [
      [P("wingman knows")],
      "",
      [{ t: "memories", c: "accent" }, { t: "   12 project · 4 global", c: "dim" }],
      "  • prefers small PRs, conventional commits",
      "  • test runner: cargo test --workspace",
      [{ t: "skills", c: "accent" }, { t: "     3 learned · avg outcome 0.86", c: "dim" }],
      [{ t: "routing", c: "accent" }, { t: "    opus for plan · haiku for edits", c: "dim" }],
      [{ t: "index", c: "accent" }, { t: "      fresh · 1,204 chunks", c: "dim" }],
    ],
  },

  pilot: {
    title: "wingman pilot run",
    summary: "Pilot mode planning and delegating tasks to worker agents.",
    lines: [
      [P("wingman pilot run"), ' "add pagination to the /users API"'],
      "",
      { t: "  Estimated: 3 tasks · 6–18 min · $0.12–$0.31 · risk: low", c: "dim" },
      { t: "  Confidence: medium (4 similar past runs)", c: "dim" },
      "",
      [{ t: "  ◐ t1", c: "accent" }, "  developer   add cursor pagination   ", { t: "running", c: "ok" }],
      [{ t: "  ◐ t2", c: "accent" }, "  developer   update handler+types    ", { t: "running", c: "ok" }],
      [{ t: "  ○ t3", c: "dim" }, "  tester      pagination tests        ", { t: "queued", c: "dim" }],
      "",
      [{ t: "  → ", c: "dim" }, "each worker in its own git worktree · converges to a PR"],
    ],
  },
};
