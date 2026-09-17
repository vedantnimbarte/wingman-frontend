import { slugify } from "@/lib/slug";

/** A section heading with a stable id, linked to itself. The TOC reads these. */
export function DocHeading({
  as: Tag = "h2",
  id,
  children,
}: {
  as?: "h2" | "h3";
  id?: string;
  children: string;
}) {
  const anchor = id ?? slugify(children);
  return (
    <Tag id={anchor}>
      <a href={`#${anchor}`}>{children}</a>
    </Tag>
  );
}
