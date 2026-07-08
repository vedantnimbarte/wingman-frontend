"use client";

import Script from "next/script";
import { useEffect } from "react";
import { track, PLAUSIBLE_DOMAIN } from "@/lib/analytics";

/**
 * Loads privacy-first analytics only when configured, and adds one delegated
 * click listener so any element with `data-analytics="name"` reports an event.
 * Renders nothing (and loads no script) when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is
 * unset — the default.
 */
export function Analytics() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement)?.closest<HTMLElement>("[data-analytics]");
      if (el) track(el.dataset.analytics!, el.dataset.analyticsLabel ? { label: el.dataset.analyticsLabel } : undefined);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!PLAUSIBLE_DOMAIN) return null;
  return (
    <Script
      src="https://plausible.io/js/script.js"
      data-domain={PLAUSIBLE_DOMAIN}
      strategy="afterInteractive"
    />
  );
}
