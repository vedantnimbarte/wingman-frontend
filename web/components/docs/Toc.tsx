"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Item = { id: string; text: string; level: number };

/** "On this page" with scroll-spy, built from the article's h2/h3 ids. */
export function Toc() {
  const pathname = usePathname();
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    const article = document.getElementById("doc-article");
    if (!article) return;
    const headings = Array.from(article.querySelectorAll<HTMLElement>(".prose h2[id], .prose h3[id]"));
    setItems(
      headings.map((h) => ({ id: h.id, text: h.textContent?.trim() ?? "", level: h.tagName === "H3" ? 3 : 2 })),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px" },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [pathname]);

  if (items.length < 2) return null;

  return (
    <nav aria-label="On this page" className="toc">
      <p>On this page</p>
      <ul>
        {items.map((it) => (
          <li key={it.id} className={it.level === 3 ? "l3" : undefined}>
            <a href={`#${it.id}`} className={active === it.id ? "on" : undefined}>
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
