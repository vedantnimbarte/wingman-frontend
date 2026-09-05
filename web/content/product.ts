// Single source of truth for product facts. Keep in sync with the repo
// (README.md / docs/) — the PRD §9 accuracy gate checks against this file.

export const product = {
  name: "Wingman",
  tagline: "It asks the compiler instead of guessing.",
  positioning:
    "A terminal coding agent that resolves your code instead of grepping it. It asks the language server and a local semantic index — so it follows imports, types, and re-exports rather than matching names, and spends a fraction of the context doing it.",
  altTo: ["Claude Code", "Cursor", "Aider"],
  repo: "https://github.com/vedantnimbarte/Wingman",
  docs: "https://github.com/vedantnimbarte/Wingman/blob/main/docs/INDEX.md",
  architectureDocs:
    "https://github.com/vedantnimbarte/Wingman/blob/main/docs/ARCHITECTURE.md",
  featuresDocs:
    "https://github.com/vedantnimbarte/Wingman/blob/main/docs/FEATURES.md",
  issues: "https://github.com/vedantnimbarte/Wingman/issues",
  discussions: "https://github.com/vedantnimbarte/Wingman/discussions",
  releases: "https://github.com/vedantnimbarte/Wingman/releases",
  license: "MIT OR Apache-2.0",
  version: "v0.3.0",
  installOneLiner:
    "curl -fsSL https://raw.githubusercontent.com/vedantnimbarte/Wingman/main/scripts/install.sh | sh",
  installWindows:
    "irm https://raw.githubusercontent.com/vedantnimbarte/Wingman/main/scripts/install.ps1 | iex",
  fromSource:
    "cargo install --git https://github.com/vedantnimbarte/Wingman wingman-cli",
} as const;

/**
 * `wingman context` — the per-turn context tax, from the repo README. Every
 * agent pays one; this is the number, and the hero is built on it. Update
 * these together with the README block.
 */
export const contextTax = {
  command: "wingman context",
  rows: [
    { label: "system prompt", tokens: 583, note: "" },
    { label: "tool schemas", tokens: 3653, note: "24 tools" },
  ],
  total: { label: "first turn", tokens: 4236, note: "before your prompt" },
} as const;

export const trustPoints = [
  "11 languages via LSP",
  "73+ providers",
  "MIT / Apache-2.0",
  "Linux · macOS · Windows",
];
