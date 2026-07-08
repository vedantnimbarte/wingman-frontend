"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNav } from "@/content/docs-nav";
import { cn } from "@/lib/cn";

export function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Documentation" className="space-y-7">
      {docsNav.map((group) => (
        <div key={group.group}>
          <p className="mb-2 text-caption uppercase tracking-wide text-ink-tertiary">{group.group}</p>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-md px-3 py-1.5 text-body-sm transition-colors",
                      active
                        ? "bg-surface-2 font-medium text-ink"
                        : "text-ink-subtle hover:bg-surface-1 hover:text-ink",
                    )}
                  >
                    {item.title}
                    {item.href === "/install" ? (
                      <span className="ml-1 text-ink-tertiary" aria-hidden="true">
                        ↗
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
