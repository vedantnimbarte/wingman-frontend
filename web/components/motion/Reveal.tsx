"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Reveals its children once, when they scroll into view. The hidden state
 * lives behind `html.js` (set in layout) so a reader without JavaScript gets
 * the whole page; `prefers-reduced-motion` short-circuits it in CSS.
 *
 * Motion is an enhancement, so it fails open twice over: if
 * IntersectionObserver is missing the content shows immediately, and a timer
 * reveals anything the observer has not reported on within a second. Content
 * hidden by an effect that never fires is the one outcome worth engineering
 * against.
 */
export function Reveal({
  as: As = "div",
  delay = 0,
  className,
  children,
}: {
  as?: "div" | "section" | "li" | "article" | "header";
  /** Milliseconds. Use to stagger siblings — keep the whole run under ~400ms. */
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.classList.add("is-in");

    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        show();
        io.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    io.observe(el);

    const failOpen = window.setTimeout(() => {
      show();
      io.disconnect();
    }, 1200);

    return () => {
      window.clearTimeout(failOpen);
      io.disconnect();
    };
  }, []);

  return (
    <As
      ref={ref as never}
      className={cn("reveal", className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </As>
  );
}
