"use client";

import { useEffect, useState } from "react";
import type { Term } from "@/content/terminals";
import { renderLine } from "@/components/terminalRender";

/**
 * Reveals a terminal fixture line-by-line on view, with a blinking caret.
 * Honors prefers-reduced-motion (renders everything immediately).
 */
export function AnimatedBody({ term }: { term: Term }) {
  const total = term.lines.length;
  const [shown, setShown] = useState(total); // start "done" for SSR / no-JS

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(total);
      return;
    }
    setShown(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= total) clearInterval(id);
    }, 130);
    return () => clearInterval(id);
  }, [total]);

  const done = shown >= total;

  return (
    <pre className="font-mono text-mono leading-relaxed text-ink" aria-label={term.summary}>
      <code>
        {term.lines.slice(0, shown).map((l, i) => renderLine(l, i))}
        {!done ? <span className="inline-block h-[1.1em] w-[0.5ch] translate-y-[0.15em] bg-primary animate-blink" aria-hidden="true" /> : null}
      </code>
    </pre>
  );
}
