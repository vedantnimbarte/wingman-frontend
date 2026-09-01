import { cn } from "@/lib/cn";

type Variant = "note" | "tip" | "warning";

// Palette stays within the design system: the lavender accent, the single
// `verify` mint, and neutrals. No red, no amber.
const styles: Record<
  Variant,
  { rail: string; icon: string; label: string; tone: string }
> = {
  note: { rail: "bg-primary", icon: "i", label: "Note", tone: "text-primary" },
  tip: { rail: "bg-verify", icon: "✓", label: "Tip", tone: "text-verify" },
  warning: {
    rail: "bg-hairline-strong",
    icon: "!",
    label: "Heads up",
    tone: "text-ink",
  },
};

export function Callout({
  variant = "note",
  title,
  children,
}: {
  variant?: Variant;
  title?: string;
  children: React.ReactNode;
}) {
  const s = styles[variant];
  return (
    <div className="my-7 flex max-w-prose gap-4 rounded-md border border-hairline bg-surface-1/60 p-5">
      <span className={cn("w-px shrink-0 rounded-full", s.rail)} aria-hidden="true" />
      <div className="min-w-0">
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              "grid h-5 w-5 shrink-0 place-items-center rounded-full border border-hairline text-caption font-semibold",
              s.tone,
            )}
            aria-hidden="true"
          >
            {s.icon}
          </span>
          <span className="text-body-sm font-medium text-ink">{title ?? s.label}</span>
        </div>
        <div className="mt-2.5 text-body-sm text-ink-subtle [&_a]:link-emphasis [&_code]:text-ink">
          {children}
        </div>
      </div>
    </div>
  );
}
