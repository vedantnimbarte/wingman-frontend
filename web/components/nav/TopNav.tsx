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
    <header className="sticky top-0 z-50 border-b border-hairline/60 bg-canvas/85 backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Wordmark />
          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noreferrer noopener" : undefined}
                className="text-body-sm text-ink-subtle transition-colors hover:text-ink"
              >
                {l.label}
                {l.external ? <span aria-hidden="true"> ↗</span> : null}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button href={product.repo} external variant="secondary" analytics="nav_github">
            <GitHubIcon />
            Star
            {starLabel ? <span className="text-ink-subtle">{starLabel}</span> : null}
          </Button>
          <Button href="/install" variant="primary" analytics="nav_install">
            Install
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-ink"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-5">
            <span className={cn("absolute left-0 top-0 h-0.5 w-5 bg-ink transition-transform", open && "translate-y-[7px] rotate-45")} />
            <span className={cn("absolute left-0 top-1.5 h-0.5 w-5 bg-ink transition-opacity", open && "opacity-0")} />
            <span className={cn("absolute left-0 top-3 h-0.5 w-5 bg-ink transition-transform", open && "-translate-y-[5px] -rotate-45")} />
          </span>
        </button>
      </Container>

      {open ? (
        <div className="md:hidden border-t border-hairline/60 bg-canvas">
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noreferrer noopener" : undefined}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-body text-ink-muted hover:bg-surface-1 hover:text-ink"
              >
                {l.label}
                {l.external ? <span aria-hidden="true"> ↗</span> : null}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Button href={product.repo} external variant="secondary" size="lg" analytics="nav_github">
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
