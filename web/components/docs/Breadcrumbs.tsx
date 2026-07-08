import Link from "next/link";

export function Breadcrumbs({ group, title }: { group?: string; title: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-2 text-caption text-ink-tertiary">
      <Link href="/docs" className="hover:text-ink-subtle">
        Docs
      </Link>
      {group ? (
        <>
          <span aria-hidden="true">/</span>
          <span>{group}</span>
        </>
      ) : null}
      <span aria-hidden="true">/</span>
      <span className="text-ink-subtle">{title}</span>
    </nav>
  );
}
