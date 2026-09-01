"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNav } from "@/content/docs-nav";
import { cn } from "@/lib/cn";

export function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Documentation" className="space-y-9">
      {docsNav.map((group) => (
        <div key={group.group}>
          <p className="label mb-3 text-ink-tertiary">{group.group}</p>
          <ul className="space-y-px border-l border-hairline">
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "-ml-px block border-l py-1.5 pl-4 text-body-sm transition-colors duration-200 ease-soft",
                      active
                        ? "border-primary font-medium text-ink"
                        : "border-transparent text-ink-subtle hover:border-hairline-strong hover:text-ink",
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
