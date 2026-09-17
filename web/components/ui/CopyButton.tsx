"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

/** Copy → Copied, announced to screen readers. */
export function CopyButton({ code, label = "Copy" }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      track("copy_command", { command: code.slice(0, 60) });
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked — text is still selectable */
    }
  }
  return (
    <>
      <button type="button" onClick={copy} className="copy" aria-label={label}>
        {copied ? "Copied" : "Copy"}
      </button>
      <span className="sr" role="status" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </>
  );
}
