import { cn } from "@/lib/cn";

/** Section label. The display face doing graphic duty at small size. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("label text-primary", className)}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  className,
  as: As = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? <Eyebrow className="mb-5">{eyebrow}</Eyebrow> : null}
      <As className={cn(As === "h1" ? "text-display-lg" : "text-display-md", "text-ink")}>
        {title}
      </As>
      {lead ? <p className="mt-5 max-w-prose text-body-lg text-ink-subtle">{lead}</p> : null}
    </div>
  );
}

export function StatusBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-hairline bg-surface-2 px-2.5 py-0.5 text-caption text-ink-muted">
      {children}
    </span>
  );
}
