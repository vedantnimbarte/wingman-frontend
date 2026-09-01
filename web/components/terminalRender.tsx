import type { Line, Span } from "@/content/terminals";

// Shared, pure rendering for terminal fixtures — used by both the static
// <Terminal> (server) and the <AnimatedBody> (client). No client/server APIs.

export const colorClass: Record<string, string> = {
  accent: "text-primary",
  dim: "text-ink-subtle",
  ok: "text-success",
  path: "text-ink-muted",
  user: "text-primary-hover",
  unres: "text-unresolved",
};

function renderSpan(span: Span, key: number) {
  if (typeof span === "string") return <span key={key}>{span}</span>;
  return (
    <span key={key} className={colorClass[span.c]}>
      {span.t}
    </span>
  );
}

export function renderLine(line: Line, key: number) {
  const spans = Array.isArray(line) ? line : [line];
  const empty = !Array.isArray(line) && line === "";
  return (
    <div key={key} className="min-h-[1.4em] whitespace-pre">
      {empty ? " " : spans.map(renderSpan)}
    </div>
  );
}
