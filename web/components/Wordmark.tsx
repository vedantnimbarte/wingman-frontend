import Link from "next/link";
import { cn } from "@/lib/cn";

/** Brand mark — lavender chevron (one of the few sanctioned uses of primary). */
export function Wordmark({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2", className)} aria-label="Wingman home">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M3 4.5 10 15l7-10.5-3.6 0L10 9.6 6.6 4.5 3 4.5Z"
          fill="#5e6ad2"
        />
      </svg>
      <span className="text-body font-semibold tracking-tight text-ink">wingman</span>
    </Link>
  );
}
