// The docs navigation tree: single source for the sidebar, the /docs index,
// the search fallback, prev/next, the sitemap and llms.txt.

export type DocLink = {
  title: string;
  href: string;
  /** One line for the /docs index. */
  summary?: string;
  /** Extra search terms beyond the title. */
  keywords?: string;
};

export type DocGroup = { group: string; items: DocLink[] };

export const docsNav: DocGroup[] = [
  {
    group: "Get started",
    items: [
      { title: "Overview", href: "/docs", keywords: "introduction what is wingman" },
      { title: "Quickstart", href: "/docs/quickstart", summary: "Install, connect a provider, and run a first task.", keywords: "first task tutorial getting started install login download binary platforms glibc windows" },
    ],
  },
  {
    group: "Guides",
    items: [
      { title: "Core concepts", href: "/docs/concepts", summary: "Providers, permission modes, and the three ways to run Wingman.", keywords: "providers permission modes surfaces read-only plan auto-edit yolo tui print batch" },
      { title: "Providers and models", href: "/docs/providers", summary: "Connect hosted providers or local models, and switch between them.", keywords: "anthropic openai gemini chatgpt oauth ollama lm studio vllm openrouter litellm local api key model" },
      { title: "Configuration", href: "/docs/configuration", summary: "Layered TOML config: models, routing, tools, hooks and schedules.", keywords: "config.toml keys router fallback hooks schedule tui theme tokens compact env vars" },
      { title: "Tools and MCP", href: "/docs/tools-mcp", summary: "The built-in tools, and adding MCP servers as tools.", keywords: "read write edit grep glob shell semantic search web fetch apply_patch mcp server namespacing" },
      { title: "Memory, skills and hooks", href: "/docs/memory", summary: "Persistent memory, learned skills, session recall and lifecycle hooks.", keywords: "learning loop memories skills recall sessions hooks lifecycle user commands" },
      { title: "Pilot mode", href: "/docs/pilot", summary: "Hand a goal to agents that work in worktrees and open a PR.", keywords: "multi-agent orchestration worktrees approval tiers cost estimate PR daemon" },
      { title: "Automation", href: "/docs/formats", summary: "Headless one-shots, JSON events and batch runs for scripts and CI.", keywords: "print json events ndjson batch jsonl scripting ci headless" },
    ],
  },
  {
    group: "Reference",
    items: [
      { title: "CLI reference", href: "/docs/cli", summary: "Every subcommand and global flag.", keywords: "commands subcommands config init checkpoint undo cost session worktree memory review discover knows schedule skill diff login logout pilot flags" },
      { title: "TUI and slash commands", href: "/docs/tui", summary: "In-session commands and keyboard shortcuts.", keywords: "slash commands keybindings /model /mode /mcp /compact /commit /pr /find /usage /learn /memory /recall shortcuts" },
      { title: "Troubleshooting", href: "/docs/troubleshooting", summary: "Common install and runtime problems, and fixes.", keywords: "faq glibc keyring no provider rate limit uninstall errors" },
    ],
  },
];

/** Every page in reading order (for prev/next). */
export const docsOrder: DocLink[] = docsNav.flatMap((g) => g.items);

export function adjacentDocs(pathname: string): { prev?: DocLink; next?: DocLink } {
  const i = docsOrder.findIndex((d) => d.href === pathname);
  if (i === -1) return {};
  return { prev: docsOrder[i - 1], next: docsOrder[i + 1] };
}

/** Flat search index: every page title + keywords. */
export const docsSearchIndex: DocLink[] = docsNav.flatMap((g) =>
  g.items.map((i) => ({ ...i, keywords: `${g.group} ${i.keywords ?? ""}` })),
);
