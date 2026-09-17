"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNav } from "@/content/docs-nav";
import { SearchTrigger, SearchModal } from "./DocsSearch";

function DocNav({ pathname }: { pathname: string }) {
  return (
    <nav aria-label="Documentation" className="doc-nav">
      {docsNav.map((group) => (
        <div key={group.group}>
          <p>{group.group}</p>
          <ul>
            {group.items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function DocsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [search, setSearch] = useState(false);

  // Cmd/Ctrl+K toggles search; Escape closes it.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch((v) => !v);
      }
      if (e.key === "Escape") setSearch(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="docs">
      <aside className="docs-side">
        <SearchTrigger onClick={() => setSearch(true)} />
        <DocNav pathname={pathname} />
      </aside>

      <div>
        {/* Below 900px the sidebar folds into a native disclosure, keyed on the
            path so it closes after navigating. */}
        <details className="docs-menu" key={pathname}>
          <summary>
            Docs menu <span aria-hidden="true">+</span>
          </summary>
          <SearchTrigger onClick={() => setSearch(true)} />
          <DocNav pathname={pathname} />
        </details>
        {children}
      </div>

      <SearchModal open={search} onClose={() => setSearch(false)} />
    </div>
  );
}
