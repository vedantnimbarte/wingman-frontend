"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

/** Multi-line code with a copy button (config/command snippets). */
export function CodeBlock({
  children,
  className,
  copyable = true,
}: {
  children: string;
  className?: string;
  copyable?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked — text is still selectable */
    }
  }

  return (
    <div className={cn("group relative my-4", className)}>
      <pre className="overflow-x-auto rounded-md border border-hairline bg-surface-1 p-4 pr-12 font-mono text-mono leading-relaxed text-ink-muted">
        <code>{children}</code>
      </pre>
      {copyable ? (
        <button
          type="button"
          onClick={copy}
          aria-label="Copy code"
          className="absolute right-2 top-2 rounded-md border border-hairline bg-surface-2 px-2 py-1 text-caption text-ink-subtle opacity-0 transition-opacity hover:text-ink focus-visible:opacity-100 group-hover:opacity-100"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      ) : null}
    </div>
  );
}

/** Inline monospace token. */
export function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-xs bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-ink">
      {children}
    </code>
  );
}
