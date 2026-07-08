import { cn } from "@/lib/cn";
import { highlight } from "@/lib/highlighter";
import { CopyButton } from "./CopyButton";

/**
 * Multi-line code with build-time Shiki highlighting and a copy button.
 * Async server component — no highlighter code ships to the client.
 */
export async function CodeBlock({
  children,
  lang = "bash",
  className,
  copyable = true,
}: {
  children: string;
  lang?: string;
  className?: string;
  copyable?: boolean;
}) {
  const html = await highlight(children, lang);
  return (
    <div className={cn("group relative my-4", className)}>
      <div
        className="overflow-x-auto rounded-md border border-hairline bg-surface-1 p-4 pr-12 font-mono text-mono leading-relaxed [&_code]:!bg-transparent [&_pre]:!m-0 [&_pre]:!bg-transparent"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {copyable ? <CopyButton code={children.replace(/\n$/, "")} /> : null}
    </div>
  );
}

/** Inline monospace token. */
export function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-xs bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-ink">
      {children}
    </code>
  );
}
