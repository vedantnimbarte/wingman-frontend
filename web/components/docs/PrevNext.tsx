import Link from "next/link";
import { adjacentDocs } from "@/content/docs-nav";

export function PrevNext({ path }: { path: string }) {
  const { prev, next } = adjacentDocs(path);
  if (!prev && !next) return null;
  return (
    <nav className="mt-14 grid grid-cols-1 gap-4 border-t border-hairline pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={prev.href}
          className="rounded-lg border border-hairline bg-surface-1 p-4 transition-colors hover:border-hairline-strong"
        >
          <span className="text-caption text-ink-tertiary">← Previous</span>
          <span className="mt-1 block text-body font-medium text-ink">{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={next.href}
          className="rounded-lg border border-hairline bg-surface-1 p-4 text-right transition-colors hover:border-hairline-strong"
        >
          <span className="text-caption text-ink-tertiary">Next →</span>
          <span className="mt-1 block text-body font-medium text-ink">{next.title}</span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
