import { cn } from "@/lib/cn";
import { terminals } from "@/content/terminals";
import { renderLine } from "@/components/terminalRender";
import { AnimatedBody } from "@/components/AnimatedBody";

/**
 * The site's "product screenshot": a Wingman terminal capture rendered as real,
 * selectable text — crisp at any DPI, theme-consistent, and searchable.
 *
 * It reads as a plane catching the page's light rather than a card with a
 * border: one hairline, one top-edge highlight, and a long soft shadow that
 * lifts it off the canvas.
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
      <div className="plane overflow-hidden rounded-xl">
        {/* Window chrome — a title, not three fake traffic lights. */}
        <div className="flex items-center gap-3 border-b border-hairline/70 px-5 py-3.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-[7px] w-[7px] rounded-full bg-hairline-strong" />
            <span className="h-[7px] w-[7px] rounded-full bg-hairline-strong" />
            <span className="h-[7px] w-[7px] rounded-full bg-hairline-strong" />
          </span>
          <span className="ml-1 truncate font-mono text-caption text-ink-tertiary">
            {term.title}
          </span>
        </div>

        <div className="overflow-x-auto p-6">
          {animated ? (
            <AnimatedBody term={term} />
          ) : (
            <pre
              className="font-mono text-mono leading-[1.75] text-ink"
              aria-label={term.summary}
            >
              <code>{term.lines.map((l, i) => renderLine(l, i))}</code>
            </pre>
          )}
        </div>
      </div>
      {caption ? (
        <figcaption className="mt-4 text-caption text-ink-tertiary">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
