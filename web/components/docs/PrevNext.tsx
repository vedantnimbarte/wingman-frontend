import Link from "next/link";
import { adjacentDocs } from "@/content/docs-nav";

export function PrevNext({ path }: { path: string }) {
  const { prev, next } = adjacentDocs(path);
  if (!prev && !next) return null;
  return (
    <nav className="prevnext" aria-label="Previous and next page" data-pagefind-ignore>
      {prev ? (
        <Link href={prev.href}>
          <span>Previous</span>
          {prev.title}
        </Link>
      ) : null}
      {next ? (
        <Link href={next.href} className="next">
          <span>Next</span>
          {next.title}
        </Link>
      ) : null}
    </nav>
  );
}
