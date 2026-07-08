// Single source of truth for product facts. Keep in sync with the repo
// (README.md / docs/) — the PRD §9 accuracy gate checks against this file.

export const product = {
  name: "Wingman",
  tagline: "Your terminal's wingman.",
  positioning:
    "The open, provider-agnostic coding agent for your terminal — 73+ LLM providers behind one streaming interface, a built-in tool layer, and a self-improving memory of you and your projects.",
  altTo: ["Claude Code", "Cursor", "Aider"],
  repo: "https://github.com/vedantnimbarte/Wingman",
  docs: "https://github.com/vedantnimbarte/Wingman/blob/main/docs/INDEX.md",
  architectureDocs:
    "https://github.com/vedantnimbarte/Wingman/blob/main/docs/ARCHITECTURE.md",
  issues: "https://github.com/vedantnimbarte/Wingman/issues",
  discussions: "https://github.com/vedantnimbarte/Wingman/discussions",
  license: "MIT OR Apache-2.0",
  version: "v0.1.0",
  installOneLiner:
    "curl -fsSL https://raw.githubusercontent.com/vedantnimbarte/Wingman/main/scripts/install.sh | sh",
  fromSource:
    "cargo install --git https://github.com/vedantnimbarte/Wingman wingman-cli",
} as const;

export const trustPoints = [
  "73+ providers",
  "MIT / Apache-2.0",
  "Linux · macOS · Windows",
  "Written in Rust",
];
