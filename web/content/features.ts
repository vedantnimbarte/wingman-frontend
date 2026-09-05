// Message pillars + secondary features. Copy derives from the repo README
// ("What makes it different") and docs/FEATURES.md. `terminal` refers to a
// fixture in content/terminals.ts.

export type Feature = {
  id: string;
  eyebrow: string;
  title: string;
  blurb: string;
  points?: string[];
  terminal?: string;
};

/**
 * The five things the README claims comparable agents don't do. Order is the
 * README's order and the argument's order — everything else is table stakes.
 */
export const pillars: Feature[] = [
  {
    id: "resolve",
    eyebrow: "Resolved, not matched",
    title: "It asks the language server",
    blurb:
      "“Where is this used, and what breaks if I change it?” is a question a compiler can answer exactly. Most agents answer it by grepping and reading files until the context window fills. Wingman runs lsp_definition, lsp_references, lsp_hover, lsp_rename, and lsp_code_action through whatever language server is already on your PATH — 11 languages.",
    points: [
      "A rename is the language server's rename, not a find-and-replace that catches a comment.",
      "Follows re-exports, aliases, and generic instantiations that name matching misses.",
      "No server installed? The tools degrade to tree-sitter heuristics rather than failing.",
    ],
    terminal: "lsp",
  },
  {
    id: "verify",
    eyebrow: "Proof, not confidence",
    title: "It has to prove the work before it says done",
    blurb:
      "The verification gate runs your build, the affected tests, and the language server's diagnostics for the changed files before the agent is allowed to end a turn. A change that introduces a type error the compile step missed fails verification.",
    points: [
      "✓ builds · ✓ affected tests · ✓ 0 new LSP diagnostics — the receipt, every turn.",
      "On red it retries a bounded number of times, then stops and exits non-zero.",
      "Bounded correction, not loop-until-green.",
    ],
    terminal: "verify",
  },
  {
    id: "providers",
    eyebrow: "No lock-in",
    title: "73+ providers — and it prices the alternative for you",
    blurb:
      "One Message contract over Anthropic, OpenAI, ChatGPT (OAuth), Gemini, OpenRouter, LiteLLM, LM Studio, vLLM, and Ollama. That contract covers reasoning too: a single --reasoning off|low|medium|high maps onto Anthropic's thinking budget, OpenAI's reasoning_effort, and Gemini's thinkingConfig.",
    points: [
      "wingman cost --compare reprices your real token volume against a spread of models.",
      "Swap provider or model mid-session with /model — no restart, history preserved.",
      "wingman doctor names the backends with no reasoning control, instead of letting the setting look like it took.",
    ],
    terminal: "cost",
  },
  {
    id: "memory",
    eyebrow: "Between sessions",
    title: "It remembers your repo, in files you can read",
    blurb:
      "Memories are plain markdown under ~/.wingman/memory/ and <project>/.wingman/memory/ — readable, editable, deletable, and shareable over git with wingman memory sync. Plus a hybrid dense + BM25 index of the codebase and semantic recall across past sessions.",
    points: [
      "Not an opaque store you have to trust — open the file and read it.",
      "wingman knows prints the memories, skills, routing, and index freshness for this project.",
      "Rate an answer with /feedback good|bad and that rating scores the skill outright.",
    ],
    terminal: "knows",
  },
  {
    id: "windows",
    eyebrow: "First-class, not ported",
    title: "Windows was a target from day one",
    blurb:
      "Developed and tested on Windows from the first commit rather than ported to it later. The one place that isn't yet true is shell containment — and wingman doctor reports exactly which containment is active on your machine instead of implying a sandbox that isn't there.",
    points: [
      "Prebuilt binaries for Linux (x86_64 / aarch64), macOS (Apple silicon), and Windows.",
      "Keys go to the OS keyring — Credential Manager, Keychain, or Secret Service.",
      "Known limits are documented in the README, not discovered in production.",
    ],
    terminal: "doctor",
  },
];

/** Table stakes, and the surfaces built on top. Full list in docs/FEATURES.md. */
export const secondaryFeatures: Feature[] = [
  {
    id: "pilot",
    eyebrow: "Multi-agent",
    title: "Pilot plans, delegates, and opens a PR",
    blurb:
      "wingman pilot run \"<goal>\" plans a multi-task goal, spawns workers in isolated git worktrees, and converges them into one pull request. Three capability tiers — assist, copilot, autopilot — with cost bands shown before it fires. Tasks whose write-sets overlap are serialised, not raced.",
  },
  {
    id: "board",
    eyebrow: "Backlog",
    title: "A kanban board over every pilot run",
    blurb:
      "wingman board is persistent and multi-project. Cards are goals you author; they outlive the runs that execute them. Columns are derived from run state, never stored, so the board can't disagree with pilot watch. Expand a card for each task's agent, model, cost, and transcript id.",
  },
  {
    id: "serve",
    eyebrow: "Remote control",
    title: "Drive it from another machine, a phone, or CI",
    blurb:
      "wingman serve puts an HTTP/SSE API and a web panel in front of an allowlist of repos. Turns stream back over SSE, pilot runs are steerable, and a request can never obtain more authority than [serve].max_permission_mode. It does not terminate TLS — put it behind Tailscale or a proxy.",
  },
  {
    id: "notifications",
    eyebrow: "It asks, from anywhere",
    title: "A plan waiting on you shouldn't wait in a terminal you closed",
    blurb:
      "A detached pilot run, a worker, and a serve child share no terminal, so an agent that needs a decision has nowhere to ask. Notifications are a file inbox under ~/.wingman/ instead of a daemon — which is why a card raised by any of them reaches the popup in the corner of your screen, and the web panel, and can be answered in either. Approving writes the run's own control.jsonl, the file it was already waiting on.",
  },
  {
    id: "jobs",
    eyebrow: "Background shell",
    title: "Dev servers and cold builds, without blocking the turn",
    blurb:
      "run_shell blocks and caps at 600s, which rules out watch processes. background: true returns a job id instead; job_output, job_send, job_stop, and job_list control it — job_send writes to stdin, so a REPL can be driven across tool calls. Every job dies with the session.",
  },
  {
    id: "permissions",
    eyebrow: "Permission modes",
    title: "read-only · plan · auto-edit · yolo",
    blurb:
      "Each tool declares what it needs — read, write, shell, network — and the registry refuses anything the active mode doesn't grant. Enforced centrally, not per-tool. .git/, .wingman/config.toml, and .wingman/skills/ are never writable in any mode. There are no approval prompts by design: a disallowed call is refused, not queued.",
  },
  {
    id: "trust",
    eyebrow: "Untrusted config",
    title: "A cloned repo can pick a model, not run commands",
    blurb:
      "A project's .wingman/config.toml may set a model and tune the UI, but [hooks], [mcp], [verify], [providers], and permission_mode are ignored until you run wingman trust in that repo. Trust is pinned to the file's contents and lapses whenever it changes.",
  },
  {
    id: "mcp",
    eyebrow: "MCP, both ways",
    title: "An MCP host and an MCP server",
    blurb:
      "Declare servers under [mcp.<name>] (stdio or HTTP) and their tools dispatch like built-ins, namespaced mcp__<server>__<tool>. Going the other way, wingman mcp-serve exposes Wingman's own tools — most valuably semantic_search over the warm repo index — to Claude Code, Cursor, or another Wingman.",
  },
  {
    id: "acp",
    eyebrow: "Editors",
    title: "One protocol instead of a plugin per editor",
    blurb:
      "wingman acp speaks the Agent Client Protocol over stdio, so Zed, JetBrains, Neovim, and Emacs can drive Wingman as their agent. The editor can decline an individual tool call and serve reads from unsaved buffers — on top of Wingman's permission mode, so a client can narrow what the agent may do but never widen it.",
  },
  {
    id: "hooks",
    eyebrow: "Arriving from Claude Code",
    title: "Run your existing hooks block as-is",
    blurb:
      "[hooks].import_claude_code = true runs the hooks from an existing Claude Code settings.json. Matchers are translated (Bash → run_shell, Edit → edit_file) rather than copied, since a verbatim matcher would import cleanly and then never fire. Off by default — hooks run shell commands.",
  },
];
