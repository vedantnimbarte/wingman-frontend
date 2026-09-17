// Single source of truth for product facts. Keep in sync with the Wingman repo
// (README.md / docs/) — the PRD §9 accuracy gate checks against this file.

export const product = {
  name: "Wingman",
  tagline: "A coding agent that asks the compiler instead of guessing.",
  positioning:
    "Wingman is a terminal coding agent. It reads your code through the language server instead of grepping it, and checks its own edits before it tells you it's done.",
  repo: "https://github.com/vedantnimbarte/Wingman",
  docs: "https://github.com/vedantnimbarte/Wingman/blob/main/docs/INDEX.md",
  issues: "https://github.com/vedantnimbarte/Wingman/issues",
  discussions: "https://github.com/vedantnimbarte/Wingman/discussions",
  releases: "https://github.com/vedantnimbarte/Wingman/releases",
  license: "Apache-2.0",
  version: "v0.4.0",
  installOneLiner:
    "curl -fsSL https://raw.githubusercontent.com/vedantnimbarte/Wingman/main/scripts/install.sh | sh",
  installWindows:
    "irm https://raw.githubusercontent.com/vedantnimbarte/Wingman/main/scripts/install.ps1 | iex",
  fromSource:
    "cargo install --git https://github.com/vedantnimbarte/Wingman wingman-cli",
} as const;

export const SITE = "https://wingman.dev";
