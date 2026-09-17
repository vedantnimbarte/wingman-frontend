import { Code } from "@/components/ui/CodeBlock";

/** A scrollable reference table; the first column renders as code by default. */
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
    <div className="table">
      <table>
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{j === 0 && codeFirst ? <Code>{cell}</Code> : cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
