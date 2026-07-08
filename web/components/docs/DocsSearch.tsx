"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { docsSearchIndex, type DocLink } from "@/content/docs-nav";
import { cn } from "@/lib/cn";

/** The button that opens search. Can appear in multiple places. */
export function SearchTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-2 rounded-md border border-hairline bg-surface-1 px-3 py-2 text-body-sm text-ink-tertiary transition-colors hover:border-hairline-strong"
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="m11 11 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span className="flex-1 text-left">Search docs</span>
      <kbd className="rounded border border-hairline bg-surface-2 px-1.5 text-caption text-ink-tertiary">⌘K</kbd>
    </button>
  );
}

/** The single search modal. Rendered once by the docs shell. */
export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results: DocLink[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return docsSearchIndex;
    return docsSearchIndex.filter((d) => `${d.title} ${d.keywords ?? ""}`.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSel(0);
      inputRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  function go(href: string) {
    router.push(href);
    onClose();
  }

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && results[sel]) {
      go(results[sel].href);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-black/60 p-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search documentation"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl border border-hairline-strong bg-surface-2 shadow-lift"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSel(0);
          }}
          onKeyDown={onInputKey}
          placeholder="Search documentation…"
          className="w-full border-b border-hairline bg-transparent px-4 py-3.5 text-body text-ink placeholder:text-ink-tertiary focus:outline-none"
        />
        <ul className="max-h-[50vh] overflow-auto p-2">
          {results.length === 0 ? (
            <li className="px-3 py-6 text-center text-body-sm text-ink-tertiary">No results.</li>
          ) : (
            results.map((r, i) => (
              <li key={r.href}>
                <button
                  type="button"
                  onMouseEnter={() => setSel(i)}
                  onClick={() => go(r.href)}
                  className={cn(
                    "flex w-full flex-col items-start rounded-md px-3 py-2 text-left",
                    i === sel ? "bg-surface-3" : "hover:bg-surface-3/60",
                  )}
                >
                  <span className="text-body-sm text-ink">{r.title}</span>
                  <span className="text-caption text-ink-tertiary">{r.href}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
