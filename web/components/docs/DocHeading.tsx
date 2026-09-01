import { slugify } from "@/lib/slug";
import { cn } from "@/lib/cn";

/**
 * A section heading with a stable id + a hover-reveal permalink anchor.
 * The scroll-spy TOC picks these up by id.
 */
export function DocHeading({
  as = "h2",
  id,
  children,
}: {
  as?: "h2" | "h3";
  id?: string;
  children: string;
}) {
  const anchor = id ?? slugify(children);
  const Tag = as;
  return (
    <Tag
      id={anchor}
      className={cn(
        "group scroll-mt-24 text-ink",
        as === "h2" ? "mt-12 text-display-md first:mt-0" : "mt-8 text-card-title",
      )}
    >
      {/* `.doc-prose a` colours body links lavender; a heading is not a body
          link, so it opts out explicitly. Hover still tints it, which is the
          affordance for the permalink. */}
      <a href={`#${anchor}`} className="relative text-ink no-underline">
        {children}
        <span
          className="ml-2 text-ink-tertiary opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden="true"
        >
          #
        </span>
      </a>
    </Tag>
  );
}
