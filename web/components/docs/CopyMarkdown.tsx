"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import { SITE } from "@/content/product";


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
    <button type="button" onClick={copy} className="text-btn" data-pagefind-ignore>
      {copied ? "Copied" : "Copy for LLM"}
    </button>
  );
}
