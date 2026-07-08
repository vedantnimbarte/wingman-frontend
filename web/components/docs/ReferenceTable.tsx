import { Code } from "@/components/ui/CodeBlock";

/**
 * A scrollable reference table (CLI commands, config keys, slash commands).
 * The first column of each row is rendered as an inline code token.
 */
export function ReferenceTable({
  head,
  rows,
  codeFirst = true,
}: {
  head: string[];
  rows: React.ReactNode[][];
  codeFirst?: boolean;
}) {
  return (
    <div className="my-5 overflow-x-auto rounded-lg border border-hairline bg-surface-1 shadow-lift">
      <table className="w-full min-w-[480px] border-collapse text-left">
        <thead>
          <tr className="border-b border-hairline text-caption uppercase text-ink-tertiary">
            {head.map((h) => (
              <th key={h} className="px-5 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-hairline/50 align-top last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="px-5 py-3 text-body-sm text-ink-subtle">
                  {j === 0 && codeFirst ? <Code>{cell}</Code> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
