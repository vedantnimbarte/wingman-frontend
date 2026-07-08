// The docs portal navigation tree — single source for the sidebar, the
// search index, and prev/next ordering.

export type DocLink = {
  title: string;
  href: string;
  /** Extra search terms beyond the title. */
  keywords?: string;
  /** External (opens in new tab); excluded from prev/next. */
  external?: boolean;
};

export type DocGroup = { group: string; items: DocLink[] };

export const docsNav: DocGroup[] = [
  {
    group: "Get started",
    items: [
      { title: "Overview", href: "/docs", keywords: "introduction what is wingman" },
      { title: "Quickstart", href: "/docs/quickstart", keywords: "first task tutorial getting started install login" },
      { title: "Install", href: "/install", keywords: "download binary platforms glibc" },
    ],
  },
  {
    group: "Guides",
    items: [
      { title: "Core concepts", href: "/docs/concepts", keywords: "providers permission modes surfaces read-only plan auto-edit yolo tui print batch" },
      { title: "Providers & models", href: "/docs/providers", keywords: "anthropic openai gemini chatgpt oauth ollama lm studio vllm openrouter litellm local api key model" },
      { title: "Configuration", href: "/docs/configuration", keywords: "config.toml keys router fallback hooks schedule tui theme tokens compact env vars" },
      { title: "Tools & MCP", href: "/docs/tools-mcp", keywords: "read write edit grep glob shell semantic search web fetch apply_patch mcp server namespacing" },
      { title: "Memory, skills & hooks", href: "/docs/memory", keywords: "learning loop memories skills recall sessions hooks lifecycle user commands" },
      { title: "Pilot mode", href: "/docs/pilot", keywords: "multi-agent orchestration worktrees approval tiers cost estimate PR daemon" },
      { title: "Automation", href: "/docs/formats", keywords: "print json events ndjson batch jsonl scripting ci headless" },
    ],
  },
  {
    group: "Reference",
    items: [
      { title: "CLI reference", href: "/docs/cli", keywords: "commands subcommands config init checkpoint undo cost session worktree memory review discover knows schedule skill diff login logout pilot flags" },
      { title: "TUI & slash commands", href: "/docs/tui", keywords: "slash commands keybindings /model /mode /mcp /compact /commit /pr /find /usage /learn /memory /recall shortcuts" },
      { title: "Troubleshooting", href: "/docs/troubleshooting", keywords: "faq glibc keyring no provider rate limit uninstall errors" },
    ],
  },
];

/** Internal pages in reading order (for prev/next). Excludes external links. */
export const docsOrder: DocLink[] = docsNav
  .flatMap((g) => g.items)
  .filter((i) => i.href.startsWith("/docs"));

export function adjacentDocs(pathname: string): { prev?: DocLink; next?: DocLink } {
  const i = docsOrder.findIndex((d) => d.href === pathname);
  if (i === -1) return {};
  return { prev: docsOrder[i - 1], next: docsOrder[i + 1] };
}

/** Flat search index: every page title + keywords. */
export const docsSearchIndex: DocLink[] = docsNav.flatMap((g) =>
  g.items.map((i) => ({ ...i, keywords: `${g.group} ${i.keywords ?? ""}` })),
);
