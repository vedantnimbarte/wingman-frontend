import { highlight } from "@/lib/highlighter";
import { CopyButton } from "./CopyButton";

/** Code with build-time Shiki highlighting. No highlighter ships to the client. */
export async function CodeBlock({
  children,
  lang = "bash",
  copyable = true,
}: {
  children: string;
  lang?: string;
  copyable?: boolean;
}) {
  const html = await highlight(children, lang);
  return (
    <div className="code">
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {copyable ? <CopyButton code={children.replace(/\n$/, "")} label="Copy code" /> : null}
    </div>
  );
}

/** Inline code token. */
export function Code({ children }: { children: React.ReactNode }) {
  return <code>{children}</code>;
}
