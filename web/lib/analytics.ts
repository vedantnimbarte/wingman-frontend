// Privacy-first analytics: a thin wrapper that forwards to Plausible when it's
// configured (NEXT_PUBLIC_PLAUSIBLE_DOMAIN set), and no-ops otherwise. No
// cookies, no PII — just aggregate event counts.

type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Props }) => void;
  }
}

export function track(event: string, props?: Props): void {
  if (typeof window === "undefined") return;
  window.plausible?.(event, props ? { props } : undefined);
}

export const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
