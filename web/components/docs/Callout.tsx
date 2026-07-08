import { cn } from "@/lib/cn";

type Variant = "note" | "tip" | "warning";

// Palette stays within the design system: lavender + success + neutral.
// No red/amber (DESIGN.md allows one accent + success only).
const styles: Record<Variant, { border: string; icon: string; label: string; iconColor: string }> = {
  note: { border: "border-l-primary", icon: "i", label: "Note", iconColor: "text-primary" },
  tip: { border: "border-l-success", icon: "✓", label: "Tip", iconColor: "text-success" },
  warning: { border: "border-l-hairline-strong", icon: "!", label: "Heads up", iconColor: "text-ink" },
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
    <div className={cn("my-5 rounded-md border border-hairline border-l-2 bg-surface-1 p-4", s.border)}>
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "grid h-5 w-5 shrink-0 place-items-center rounded-full border border-hairline text-caption font-semibold",
            s.iconColor,
          )}
          aria-hidden="true"
        >
          {s.icon}
        </span>
        <span className="text-body-sm font-medium text-ink">{title ?? s.label}</span>
      </div>
      <div className="mt-2 pl-7 text-body-sm text-ink-subtle [&_a]:link-emphasis [&_code]:text-ink">
        {children}
      </div>
    </div>
  );
}
