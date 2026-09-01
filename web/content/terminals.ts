// Terminal "screenshots" as structured text (crisp, themeable, accessible).
// A span is a string or { t, c } where c is a restrained on-dark color key.
// Keep the palette narrow — no rainbow. `unres` is reserved for the
// grep/name-match state, `accent` for what the language server resolved.

export type Span =
  | string
  | { t: string; c: "accent" | "dim" | "ok" | "path" | "user" | "unres" };
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
      [{ t: "wingman", c: "accent" }, "  Resolving through the language server…"],
      [{ t: "  ⏺ lsp_references", c: "ok" }, { t: "  RateLimiter  → 3 resolved", c: "dim" }],
      [{ t: "  ⏺ read_file", c: "ok" }, { t: "  src/mw/ratelimit.rs", c: "path" }],
      "",
      "  It's in src/mw/ratelimit.rs — a token-bucket keyed by API",
      "  key, 100 req/min, configured from [limits] in config.toml.",
      "",
      [{ t: "  › ", c: "dim" }, { t: "ask a follow-up…", c: "dim" }, { t: "▏", c: "accent" }],
    ],
  },

  context: {
    title: "wingman context",
    summary: "The per-turn context tax: what a turn costs before your prompt.",
    lines: [
      [P("wingman context")],
      "",
      ["  system prompt       ", { t: "583", c: "accent" }, { t: " tokens", c: "dim" }],
      ["  tool schemas       ", { t: "3653", c: "accent" }, { t: " tokens  (24 tools)", c: "dim" }],
      { t: "  --------------------------------------------", c: "dim" },
      ["  first turn         ", { t: "4236", c: "accent" }, { t: " tokens  before your prompt", c: "dim" }],
    ],
  },

  lsp: {
    title: "wingman — resolved vs. matched",
    summary: "A name-match search against a resolved language-server lookup.",
    lines: [
      [P("grep -rn"), ' "dispatch" .'],
      [{ t: "  47 matches", c: "unres" }, { t: "  — comments, strings, a doc example, 4 crates", c: "dim" }],
      "",
      [P("wingman --print"), ' "who calls dispatch?"'],
      [{ t: "  ⏺ lsp_references", c: "ok" }, { t: "  ToolRegistry::dispatch", c: "dim" }],
      ["  ", { t: "12 resolved references", c: "accent" }, { t: "  — through 2 re-exports", c: "dim" }],
      "",
      { t: "  no language server? the tools degrade to tree-sitter,", c: "dim" },
      { t: "  they don't fail.", c: "dim" },
    ],
  },

  verify: {
    title: "wingman — the turn gate",
    summary: "The verification gate proving a change before the turn may end.",
    lines: [
      [{ t: "  ⏺ edit_file", c: "ok" }, { t: "  src/mw/ratelimit.rs", c: "path" }],
      "",
      { t: "  verifying before finishing the turn…", c: "dim" },
      ["  ", { t: "✓", c: "ok" }, " builds            ", { t: "cargo check --workspace", c: "dim" }],
      ["  ", { t: "✓", c: "ok" }, " affected tests    ", { t: "3/3 passed", c: "dim" }],
      ["  ", { t: "✓", c: "ok" }, " lsp diagnostics   ", { t: "0 new", c: "dim" }],
      "",
      { t: "  on red it retries twice, then stops and exits non-zero.", c: "dim" },
      { t: "  bounded correction — not loop-until-green.", c: "dim" },
    ],
  },

  cost: {
    title: "wingman cost --compare",
    summary: "Repricing your real token volume against other models.",
    lines: [
      [P("wingman cost --compare")],
      "",
      ["  ", { t: "this month", c: "dim" }, "        4.1M in · 210K out"],
      "",
      ["  claude-opus-4-8   ", { t: "$18.42", c: "accent" }, { t: "   ← what you paid", c: "dim" }],
      ["  gpt-5             ", { t: "$11.90", c: "dim" }],
      ["  claude-haiku-4-8  ", { t: " $2.31", c: "dim" }],
      ["  deepseek-v3       ", { t: " $0.74", c: "dim" }],
      "",
      { t: "  only a provider-agnostic agent can show you this.", c: "dim" },
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
      "",
      { t: "  plain markdown under .wingman/memory — read it, edit it,", c: "dim" },
      { t: "  delete it, share it over git.", c: "dim" },
    ],
  },

  doctor: {
    title: "wingman doctor",
    summary: "What containment is actually active on this machine.",
    lines: [
      [P("wingman doctor")],
      "",
      ["  ", { t: "✓", c: "ok" }, " windows x86_64      ", { t: "tested from day one", c: "dim" }],
      ["  ", { t: "✓", c: "ok" }, " rust-analyzer       ", { t: "on PATH", c: "dim" }],
      ["  ", { t: "✓", c: "ok" }, " keyring             ", { t: "credential manager", c: "dim" }],
      ["  ", { t: "!", c: "unres" }, " shell containment   ", { t: "job object — process, not files", c: "dim" }],
      "",
      { t: "  it names the gap rather than claiming a sandbox it", c: "dim" },
      { t: "  doesn't have.", c: "dim" },
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

  board: {
    title: "wingman board",
    summary: "A kanban board over pilot runs, across every repo.",
    lines: [
      [P("wingman board")],
      "",
      ["  ", { t: "BACKLOG", c: "dim" }, "        ", { t: "IN PROGRESS", c: "accent" }, "      ", { t: "REVIEW", c: "dim" }],
      "  fix restart    add pagination    drop intel",
      "  storm          ├ t1 developer    mac target",
      ["  ", { t: "acme-api", c: "dim" }, "       ├ t2 developer    ", { t: "wingman", c: "dim" }],
      "                 └ t3 tester",
      "",
      { t: "  columns are derived from run state, never stored — the", c: "dim" },
      { t: "  board can't disagree with pilot watch.", c: "dim" },
    ],
  },
};
