"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

const SITE = "https://wingman.dev";

/**
 * "Copy for LLM" — copies a compact Markdown summary of the page (title,
 * description, canonical URL) that's easy to paste into an AI assistant.
 */
export function CopyMarkdown({
  title,
  description,
  path,
}: {
  title: string;
  description?: string;
  path: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const md = `# ${title}\n\n${description ? `> ${description}\n\n` : ""}Source: ${SITE}${path}\nDocs: ${SITE}/llms.txt`;
    try {
      await navigator.clipboard.writeText(md);
      setCopied(true);
      track("copy_markdown", { path });
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-md border border-hairline bg-surface-1 px-2.5 py-1 text-caption text-ink-subtle transition-colors hover:border-hairline-strong hover:text-ink"
    >
      {copied ? "Copied" : "Copy for LLM"}
    </button>
  );
}
