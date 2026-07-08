"use client";

import { useState } from "react";

/** Small copy button used on code blocks (client — clipboard access). */
export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked — text is still selectable */
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy code"
      className="absolute right-2 top-2 rounded-md border border-hairline bg-surface-2 px-2 py-1 text-caption text-ink-subtle opacity-0 transition-opacity hover:text-ink focus-visible:opacity-100 group-hover:opacity-100"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
