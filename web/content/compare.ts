// Comparison matrix. Cells are true (yes), false (no), or a short string.
// Competitor claims are conservative and reflect our understanding at publish
// time — corrections welcome via a GitHub issue (noted on the page).

export type Cell = boolean | string;

export const compareColumns = ["Wingman", "Claude Code", "Cursor", "Aider"] as const;

export type CompareRow = {
  feature: string;
  wingman: Cell;
  claude: Cell;
  cursor: Cell;
  aider: Cell;
};

export const compareRows: CompareRow[] = [
  { feature: "Open source", wingman: "MIT / Apache-2.0", claude: false, cursor: false, aider: "Apache-2.0" },
  { feature: "Provider-agnostic", wingman: "73+ providers", claude: "Anthropic", cursor: "Several", aider: "Many" },
  { feature: "Runs in the terminal", wingman: true, claude: true, cursor: false, aider: true },
  { feature: "Local models (Ollama/vLLM/LM Studio)", wingman: true, claude: false, cursor: "Limited", aider: true },
  { feature: "Bring your own API key", wingman: true, claude: "Anthropic account", cursor: "Subscription", aider: true },
  { feature: "MCP host", wingman: true, claude: true, cursor: true, aider: "Limited" },
  { feature: "Multi-agent (plan → delegate → PR)", wingman: true, claude: "Subagents", cursor: false, aider: false },
  { feature: "Self-improving memory & skills", wingman: true, claude: "Limited", cursor: "Limited", aider: false },
  { feature: "Headless / scriptable (JSON, batch)", wingman: true, claude: true, cursor: false, aider: "Limited" },
  { feature: "Keys stay in your OS keyring", wingman: true, claude: true, cursor: false, aider: true },
  { feature: "Price", wingman: "Free (BYO key)", claude: "Usage / plan", cursor: "Subscription", aider: "Free (BYO key)" },
];
