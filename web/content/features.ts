// Message pillars + secondary features. Copy derives from the repo README
// Highlights and docs/. `terminal` refers to a fixture in content/terminals.ts.

export type Feature = {
  id: string;
  eyebrow: string;
  title: string;
  blurb: string;
  points?: string[];
  terminal?: string;
};

export const pillars: Feature[] = [
  {
    id: "providers",
    eyebrow: "Provider-agnostic",
    title: "73+ providers, one shape",
    blurb:
      "Anthropic is the reference implementation — streaming, tool use, explicit prompt caching. A single OpenAI-compatible adapter covers OpenAI, OpenRouter, LiteLLM, LM Studio, vLLM, and Ollama. Gemini and ChatGPT (OAuth) have their own adapters. All speak the same message contract.",
    points: [
      "Swap provider/model mid-session with /model — no restart, history preserved.",
      "Bring your own key, or run fully local models. No lock-in.",
      "Model fallback chains on primary failure.",
    ],
    terminal: "model",
  },
  {
    id: "surfaces",
    eyebrow: "Three surfaces",
    title: "A TUI, a one-shot, and a batch runner",
    blurb:
      "A ratatui-based TUI for interactive coding, a headless --print mode that emits text or newline-delimited JSON events, and a --batch mode that runs a file of prompts non-interactively. All ready to pipe into other tools or CI.",
    points: [
      "wingman — interactive terminal UI.",
      'wingman --print "…" — scriptable one-shot (add --json for events).',
      "wingman --batch prompts.jsonl — non-interactive batch.",
    ],
    terminal: "print",
  },
  {
    id: "learning",
    eyebrow: "Self-improving",
    title: "It learns you and your projects",
    blurb:
      "Persistent memories (markdown + frontmatter under ~/.wingman and <project>/.wingman), skill usage stats with outcome scoring, and cross-session semantic recall via the built-in RAG pipeline. Quiet-session nudges ask the agent to persist what it learned.",
    points: [
      "save_memory / recall_memory / recall_session tools.",
      "Skills refined from observed work.",
      "wingman knows — print what Wingman knows about this project.",
    ],
    terminal: "knows",
  },
  {
    id: "pilot",
    eyebrow: "Multi-agent · advanced",
    title: "Pilot mode plans, delegates, and opens a PR",
    blurb:
      "wingman pilot run \"<goal>\" plans a multi-task goal, delegates to worker agents in isolated git worktrees, reviews as it goes, and converges into a pull request — with trust-tiered approval gates and cost estimates before it fires.",
    points: [
      "Isolated worktrees per worker — no clobbering.",
      "Trust-tiered approval: auto / notify-only / hard gate.",
      "Upfront cost bands gate auto-approval on the worst case.",
    ],
    terminal: "pilot",
  },
];

export const secondaryFeatures: Feature[] = [
  {
    id: "mcp",
    eyebrow: "MCP host",
    title: "External MCP servers as first-class tools",
    blurb:
      "Declare Model Context Protocol servers under [mcp.<name>] (stdio or HTTP). Their tools are namespaced mcp__<server>__<tool> and dispatched like built-ins. Manage them live from the TUI with /mcp.",
  },
  {
    id: "permissions",
    eyebrow: "Permission modes",
    title: "read-only · plan · auto-edit · yolo",
    blurb:
      "read-only prompts on every write; plan requires an explicit plan first; auto-edit auto-allows writes inside the project tree; yolo removes prompts (per-session only). Switch live with /mode — it re-gates the running agent, not just the status line.",
  },
  {
    id: "login",
    eyebrow: "Guided login",
    title: "Keys in the OS keyring",
    blurb:
      "wingman login <provider> probes the key, stores it in the OS keyring, and records the default model. ChatGPT uses a browser OAuth flow. wingman logout clears it.",
  },
  {
    id: "tools",
    eyebrow: "Built-in tools",
    title: "Read, search, edit, run — gated by mode",
    blurb:
      "File read/write/edit, glob, grep, directory listing, shell execution, semantic search, atomic multi-file patches, and web fetch/search — each gated by the active permission mode.",
  },
  {
    id: "checkpoints",
    eyebrow: "Safety net",
    title: "Checkpoints & undo",
    blurb:
      "wingman checkpoint snapshots the working tree into a tagged git stash; wingman undo restores the most recent one. The apply_patch tool writes multi-file edits atomically — no partial writes on failure.",
  },
  {
    id: "cost",
    eyebrow: "Observability",
    title: "Per-model cost, live",
    blurb:
      "wingman cost prints a per-model token + USD spend table from ~/.wingman/usage.json. A token-aware pipeline truncates tool output and compacts long histories to stay inside the model's context window.",
  },
];
