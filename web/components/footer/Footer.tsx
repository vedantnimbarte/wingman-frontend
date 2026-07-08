import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { Container } from "@/components/ui/Container";
import { footerColumns } from "@/content/nav";
import { product } from "@/content/product";

export function Footer() {
  return (
    <footer className="border-t border-hairline/60 bg-canvas">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div className="col-span-2 md:col-span-1">
            <Wordmark />
            <p className="mt-4 max-w-xs text-body-sm text-ink-subtle">
              The open, provider-agnostic coding agent for your terminal.
            </p>
          </div>
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-caption uppercase tracking-wide text-ink-tertiary">{col.heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      target={l.external ? "_blank" : undefined}
                      rel={l.external ? "noreferrer noopener" : undefined}
                      className="text-body-sm text-ink-subtle transition-colors hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-hairline/60 pt-6 text-caption text-ink-tertiary sm:flex-row sm:items-center">
          <p>
            {product.license} · {product.version}
          </p>
          <p>Linux · macOS · Windows · built in Rust</p>
        </div>
      </Container>
    </footer>
  );
}
