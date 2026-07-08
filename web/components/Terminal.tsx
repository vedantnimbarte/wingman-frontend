import { cn } from "@/lib/cn";
import { terminals } from "@/content/terminals";
import { renderLine } from "@/components/terminalRender";
import { AnimatedBody } from "@/components/AnimatedBody";

/**
 * The dominant card type — the site's "product screenshot." Renders a Wingman
 * terminal capture as real, selectable text (crisp at any DPI, theme-consistent).
 * Pass `animated` to type it out line-by-line (hero use).
 */
export function Terminal({
  name,
  caption,
  animated = false,
  className,
}: {
  name: keyof typeof terminals;
  caption?: string;
  animated?: boolean;
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
          {animated ? (
            <AnimatedBody term={term} />
          ) : (
            <pre className="font-mono text-mono leading-relaxed text-ink" aria-label={term.summary}>
              <code>{term.lines.map((l, i) => renderLine(l, i))}</code>
            </pre>
          )}
        </div>
      </div>
      {caption ? (
        <figcaption className="mt-3 text-caption text-ink-tertiary">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
