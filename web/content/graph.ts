// The hero's symbol graph. Real symbols from the Wingman codebase, because a
// graph of `node_1 … node_47` is a screensaver and a graph of
// `AgentLoop::run` is the product's argument.
//
// `matches` are what a name-match search returns for "dispatch" — the noise a
// grep-based agent has to read. `nodes` + `edges` are what the language server
// resolves: fewer, typed, connected.

export type GraphNode = {
  id: string;
  label: string;
  /** Depth layer: 0 = surfaces, 1 = core, 2 = backends. Drives the Z plane. */
  layer: 0 | 1 | 2;
  /** Grid position within the layer, -1..1 on each axis. */
  x: number;
  y: number;
};

export type GraphEdge = [from: string, to: string];

// Three tiers, drawn as three shelves in depth. Every surface funnels into one
// loop; the loop dispatches through one registry; the registry fans into the
// backends. Three fans, few crossings — the drawing is legible because the
// architecture is.
export const graphNodes: GraphNode[] = [
  // Tier 0 — the surfaces that drive a turn.
  { id: "tui", label: "wingman-tui", layer: 0, x: -0.78, y: 0.72 },
  { id: "print", label: "--print", layer: 0, x: -0.26, y: 0.84 },
  { id: "serve", label: "wingman serve", layer: 0, x: 0.26, y: 0.84 },
  { id: "pilot", label: "pilot worker", layer: 0, x: 0.78, y: 0.72 },

  // Tier 1 — the loop everything funnels through.
  { id: "loop", label: "AgentLoop::run", layer: 1, x: 0, y: 0.14 },
  { id: "registry", label: "ToolRegistry", layer: 1, x: -0.64, y: -0.2 },
  { id: "message", label: "core::Message", layer: 1, x: 0.64, y: -0.2 },
  { id: "gate", label: "verify::gate", layer: 1, x: 0, y: -0.5 },

  // Tier 2 — the backends the registry dispatches into.
  { id: "lsp", label: "wingman-lsp", layer: 2, x: -0.82, y: -0.86 },
  { id: "rag", label: "wingman-rag", layer: 2, x: -0.28, y: -0.96 },
  { id: "mcp", label: "wingman-mcp", layer: 2, x: 0.28, y: -0.96 },
  { id: "learn", label: "wingman-learn", layer: 2, x: 0.82, y: -0.86 },
];

export const graphEdges: GraphEdge[] = [
  ["tui", "loop"],
  ["print", "loop"],
  ["serve", "loop"],
  ["pilot", "loop"],
  ["loop", "registry"],
  ["loop", "message"],
  ["loop", "gate"],
  ["registry", "lsp"],
  ["registry", "rag"],
  ["registry", "mcp"],
  ["registry", "learn"],
  ["gate", "lsp"],
];

/** Text alternative for the canvas, and the no-WebGL fallback's content. */
export const graphSummary =
  "Every surface — the TUI, headless --print, wingman serve, and each pilot worker — drives the same AgentLoop, which dispatches through one ToolRegistry into the language server, the semantic index, MCP servers, and memory.";

export const resolveCaption = {
  before: { count: 47, label: "name matches", tool: "grep \"dispatch\"" },
  after: { count: 12, label: "resolved references", tool: "lsp_references" },
} as const;
