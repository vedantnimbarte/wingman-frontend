import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { Container } from "@/components/ui/Container";
import { footerColumns } from "@/content/nav";
import { product } from "@/content/product";

export function Footer() {
  return (
    <footer className="border-t border-hairline/50">
      <Container className="py-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,1fr))]">
          <div className="col-span-2 md:col-span-1">
            <Wordmark />
            <p className="mt-5 max-w-[26ch] text-body-sm text-ink-subtle">
              A terminal coding agent that asks the compiler instead of guessing.
            </p>
          </div>
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="label text-ink-tertiary">{col.heading}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      target={l.external ? "_blank" : undefined}
                      rel={l.external ? "noreferrer noopener" : undefined}
                      className="text-body-sm text-ink-subtle transition-colors duration-200 ease-soft hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-3 border-t border-hairline/50 pt-8 text-caption text-ink-tertiary sm:flex-row sm:items-center">
          <p className="font-mono">
            {product.license} · {product.version}
          </p>
          <p>Linux · macOS · Windows · built in Rust</p>
        </div>
      </Container>
    </footer>
  );
}
