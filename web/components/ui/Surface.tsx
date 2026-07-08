import { cn } from "@/lib/cn";

type Level = 1 | 2 | 3 | 4;

const bg: Record<Level, string> = {
  1: "bg-surface-1",
  2: "bg-surface-2",
  3: "bg-surface-3",
  4: "bg-surface-4",
};

/**
 * A lifted panel — surface background + hairline border + subtle top-edge
 * highlight (DESIGN.md elevation). Depth without drop shadows.
 */
export function Surface({
  level = 1,
  rounded = "lg",
  className,
  children,
}: {
  level?: Level;
  rounded?: "lg" | "xl" | "xxl";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        bg[level],
        level >= 2 ? "lift-strong" : "lift",
        rounded === "xl" ? "rounded-xl" : rounded === "xxl" ? "rounded-xxl" : "rounded-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}
