type Variant = "note" | "tip" | "warning";

const labels: Record<Variant, string> = { note: "Note", tip: "Tip", warning: "Heads up" };

export function Callout({
  variant = "note",
  title,
  children,
}: {
  variant?: Variant;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`callout ${variant}`}>
      <b>{title ?? labels[variant]}</b>
      <div>{children}</div>
    </div>
  );
}
