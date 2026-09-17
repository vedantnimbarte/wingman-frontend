import type { Line, Span } from "@/content/terminals";

// Span colours map to .t-<name> classes in globals.css.

function renderSpan(span: Span, key: number) {
  if (typeof span === "string") return <span key={key}>{span}</span>;
  return (
    <span key={key} className={`t-${span.c}`}>
      {span.t}
    </span>
  );
}

export function renderLine(line: Line, key: number) {
  const spans = Array.isArray(line) ? line : [line];
  const empty = !Array.isArray(line) && line === "";
  return (
    <div key={key} className="ln">
      {empty ? " " : spans.map(renderSpan)}
    </div>
  );
}
