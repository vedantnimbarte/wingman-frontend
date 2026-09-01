"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";

/**
 * An install one-liner in a mono chip with one-click copy. Copy success is
 * announced to screen readers via aria-live.
 */
export function CopyOneLiner({
  command,
  label = "Copy install command",
  className,
}: {
  command: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      track("copy_command", { command: command.slice(0, 60) });
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked — the text is still selectable in the chip.
    }
  }

  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-md border border-hairline bg-surface-1/70 py-2 pl-4 pr-2",
        "transition-colors duration-200 ease-soft hover:border-hairline-strong",
        className,
      )}
    >
      <span className="select-none font-mono text-mono text-primary/70" aria-hidden="true">
        $
      </span>
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-mono text-ink-muted [scrollbar-width:none]">
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={label}
        className="shrink-0 rounded-md border border-hairline bg-surface-2 px-3.5 py-2 text-button text-ink-subtle transition-colors duration-200 ease-soft hover:border-hairline-strong hover:text-ink"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </div>
  );
}
