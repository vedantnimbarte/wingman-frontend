import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "tertiary" | "inverse";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md text-button font-medium " +
  "whitespace-nowrap select-none no-underline transition-all duration-200 ease-soft " +
  "active:translate-y-px";

const sizes: Record<Size, string> = {
  // CTAs hold >= 40px tap height (PRD touch targets).
  md: "px-4 py-2 min-h-[40px]",
  lg: "px-6 py-3 min-h-[48px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-on-primary shadow-glow hover:bg-primary-hover hover:shadow-[0_0_0_1px_rgba(143,155,255,0.4),0_24px_70px_-24px_rgba(107,120,232,0.55)] active:bg-primary-focus",
  secondary:
    "bg-surface-1 text-ink border border-hairline hover:border-hairline-strong hover:bg-surface-2",
  tertiary: "bg-transparent text-ink-subtle hover:text-ink",
  inverse: "bg-inverse-canvas text-inverse-ink hover:bg-white/90",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Fires a `data-analytics` event on click (see components/Analytics). */
  analytics?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  href,
  external,
  analytics,
  children,
}: ButtonAsLink) {
  const classes = cn(base, sizes[size], variants[variant], className);
  const data = analytics ? { "data-analytics": analytics } : {};
  if (external || href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={classes} {...data}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...data}>
      {children}
    </Link>
  );
}
