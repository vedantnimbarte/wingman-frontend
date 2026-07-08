import { cn } from "@/lib/cn";
import { terminals, type Line, type Span } from "@/content/terminals";

const colorClass: Record<string, string> = {
  accent: "text-primary",
  dim: "text-ink-subtle",
  ok: "text-success",
  path: "text-ink-muted",
  user: "text-primary-hover",
};

function renderSpan(span: Span, key: number) {
  if (typeof span === "string") return <span key={key}>{span}</span>;
  return (
    <span key={key} className={colorClass[span.c]}>
      {span.t}
    </span>
  );
}

function renderLine(line: Line, key: number) {
  const spans = Array.isArray(line) ? line : [line];
  const empty = !Array.isArray(line) && line === "";
  return (
    <div key={key} className="min-h-[1.4em] whitespace-pre">
      {empty ? " " : spans.map(renderSpan)}
    </div>
  );
}

/**
 * The dominant card type — the site's "product screenshot." Renders a Wingman
 * terminal capture as real, selectable text (crisp at any DPI, theme-consistent).
 */
export function Terminal({
  name,
  caption,
  className,
}: {
  name: keyof typeof terminals;
  caption?: string;
  className?: string;
}) {
  const term = terminals[name];
  return (
    <figure className={cn("group", className)}>
      <div className="overflow-hidden rounded-xl border border-hairline bg-surface-1 shadow-lift">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-hairline/70 px-4 py-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-surface-4" />
            <span className="h-3 w-3 rounded-full bg-surface-4" />
            <span className="h-3 w-3 rounded-full bg-surface-4" />
          </span>
          <span className="ml-2 truncate text-caption text-ink-tertiary">{term.title}</span>
        </div>
        {/* Body */}
        <div className="overflow-x-auto p-5">
          <pre className="font-mono text-mono leading-relaxed text-ink" aria-label={term.summary}>
            <code>{term.lines.map(renderLine)}</code>
          </pre>
        </div>
      </div>
      {caption ? (
        <figcaption className="mt-3 text-caption text-ink-tertiary">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
