"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type Item = { id: string; text: string; level: number };

/**
 * Auto-generated "on this page" nav with scroll-spy. Collects h2/h3 with ids
 * from the article and highlights the section currently in view.
 */
export function Toc() {
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const article = document.getElementById("doc-article");
    if (!article) return;
    const headings = Array.from(article.querySelectorAll<HTMLElement>("h2[id], h3[id]"));
    setItems(
      headings.map((h) => ({
        id: h.id,
        text: h.textContent?.replace(/#$/, "").trim() ?? "",
        level: h.tagName === "H3" ? 3 : 2,
      })),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page" className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-auto xl:block">
      <p className="text-caption uppercase tracking-wide text-ink-tertiary">On this page</p>
      <ul className="mt-3 space-y-2 border-l border-hairline">
        {items.map((it) => (
          <li key={it.id} style={{ paddingLeft: it.level === 3 ? 24 : 12 }}>
            <a
              href={`#${it.id}`}
              className={cn(
                "-ml-px block border-l text-body-sm transition-colors",
                it.level === 3 && "text-caption",
                active === it.id
                  ? "border-l-primary pl-3 text-ink"
                  : "border-l-transparent pl-3 text-ink-subtle hover:text-ink",
              )}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
