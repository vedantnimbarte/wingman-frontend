"use client";

import { useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { GitHubIcon } from "@/components/GitHubIcon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { navLinks } from "@/content/nav";
import { product } from "@/content/product";
import { formatCount } from "@/lib/github";
import { cn } from "@/lib/cn";

export function TopNav({ stars = 0 }: { stars?: number }) {
  const [open, setOpen] = useState(false);
  const starLabel = stars > 0 ? formatCount(stars) : null;

  return (
    <header className="sticky top-0 z-50 border-b border-hairline/50 bg-canvas/70 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-10">
          <Wordmark />
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noreferrer noopener" : undefined}
                className="text-body-sm text-ink-subtle transition-colors duration-200 ease-soft hover:text-ink"
              >
                {l.label}
                {l.external ? <span aria-hidden="true"> ↗</span> : null}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button href={product.repo} external variant="tertiary" analytics="nav_github">
            <GitHubIcon />
            {starLabel ? <span className="figure text-caption">{starLabel}</span> : "GitHub"}
          </Button>
          <Button href="/install" variant="primary" analytics="nav_install">
            Install
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-5">
            <span
              className={cn(
                "absolute left-0 top-0 h-px w-5 bg-ink transition-transform duration-300 ease-soft",
                open && "translate-y-[7px] rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1.5 h-px w-5 bg-ink transition-opacity duration-200",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-3 h-px w-5 bg-ink transition-transform duration-300 ease-soft",
                open && "-translate-y-[5px] -rotate-45",
              )}
            />
          </span>
        </button>
      </Container>

      {open ? (
        <div className="border-t border-hairline/50 bg-canvas md:hidden">
          <Container className="flex flex-col gap-1 py-5">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noreferrer noopener" : undefined}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-body text-ink-muted hover:bg-surface-1 hover:text-ink"
              >
                {l.label}
                {l.external ? <span aria-hidden="true"> ↗</span> : null}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2">
              <Button
                href={product.repo}
                external
                variant="secondary"
                size="lg"
                analytics="nav_github"
              >
                <GitHubIcon />
                Star on GitHub{starLabel ? ` · ${starLabel}` : ""}
              </Button>
              <Button href="/install" variant="primary" size="lg" analytics="nav_install">
                Install
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
