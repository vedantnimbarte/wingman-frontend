import Link from "next/link";
import { product } from "@/content/product";

/** The wing: a double chevron. Matches app/icon.svg. */
function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Wingman home">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 14.5 L12 5 L20 14.5" stroke="#6b78e8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.5 18.5 L12 13 L16.5 18.5" stroke="#8f9bff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
      </svg>
      wingman
    </Link>
  );
}

function Links() {
  return (
    <>
      <li><Link href="/docs">Docs</Link></li>
      <li><Link href="/changelog">Changelog</Link></li>
      <li>
        <a href={product.repo} target="_blank" rel="noreferrer noopener" data-analytics="nav_github">
          GitHub
        </a>
      </li>
    </>
  );
}

export function Header() {
  return (
    <header className="header">
      <Brand />
      <nav aria-label="Primary">
        <ul className="links"><Links /></ul>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <p>
        <Brand />
        <span>
          {product.license}, {product.version}
        </span>
      </p>
      <ul className="links"><Links /></ul>
    </footer>
  );
}
