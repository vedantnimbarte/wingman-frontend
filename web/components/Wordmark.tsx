import Link from "next/link";
import { cn } from "@/lib/cn";

/** Brand mark — a lavender "wing" (double chevron). One of the few sanctioned
 *  uses of the primary accent. Matches app/icon.svg. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2", className)} aria-label="Wingman home">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 14.5 L12 5 L20 14.5" stroke="#5e6ad2" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.5 18.5 L12 13 L16.5 18.5" stroke="#828fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
      </svg>
      <span className="text-body font-semibold tracking-tight text-ink">wingman</span>
    </Link>
  );
}
