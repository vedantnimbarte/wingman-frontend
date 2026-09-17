import { Install } from "@/components/Install";
import { TurnDiagram } from "@/components/TurnDiagram";
import { CopyButton } from "@/components/ui/CopyButton";
import { product } from "@/content/product";

const why = [
  {
    title: "It resolves, it doesn't grep.",
    body: (
      <>
        Definitions and references come from your language server, across 11 languages, so a rename
        follows imports and types rather than matching names. Tree-sitter covers the gap when no
        server is installed.
      </>
    ),
  },
  {
    title: "It proves the work before it says done.",
    body: (
      <>
        An edit arms a gate: your build and language-server diagnostics have to pass. A failure goes
        back to the model, with a limit on retries instead of a loop until green.
      </>
    ),
  },
  {
    title: "Any model, your keys.",
    body: (
      <>
        Hosted providers or a local model through Ollama, LM Studio or vLLM, all behind one message
        format. <code>wingman cost --compare</code> reprices a session on other models.
      </>
    ),
  },
];

const steps = [
  { title: "Create a config.", command: "wingman config init", note: "Writes ~/.wingman/config.toml." },
  { title: "Add a key.", command: "export ANTHROPIC_API_KEY=sk-ant-...", note: "Any provider works. Local models need no key." },
  { title: "Ask.", command: "wingman", note: <>Or run one prompt without the UI: <code>wingman --print &quot;explain this repo&quot;</code></> },
];

export default function HomePage() {
  return (
    <>
      <section className="sec hero">
        <h1>{product.tagline}</h1>
        <p className="lede">
          Wingman runs in your terminal with the model you choose. It reads code through your
          language server, and checks its own edits before it tells you it&apos;s done.
        </p>
        <Install />
      </section>

      <section className="sec" aria-labelledby="how">
        <div className="wide">
          <h2 id="how">How one turn works.</h2>
          <p className="lede">
            One request through the agent loop: a tool call, a failed build, a retry, and a pass.
          </p>
          <TurnDiagram />
        </div>
      </section>

      <section className="sec" aria-labelledby="why">
        <div className="wide">
          <h2 id="why">Why it&apos;s different.</h2>
          <ul className="rows">
            {why.map((w) => (
              <li key={w.title}>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec" aria-labelledby="start">
        <div className="col">
          <h2 id="start">Start in three steps.</h2>
          <p className="lede">Once it&apos;s installed, run these in the project you want to work on.</p>
          <ol className="rows steps">
            {steps.map((s, i) => (
              <li key={s.command}>
                <span className="n" aria-hidden="true">{i + 1}</span>
                <div>
                  <h3>{s.title}</h3>
                  <div className="cmd">
                    <code>{s.command}</code>
                    <CopyButton code={s.command} label={`Copy ${s.command}`} />
                  </div>
                  <p className="note">{s.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: product.name,
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Linux, macOS, Windows",
            softwareVersion: product.version,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            description: product.positioning,
            url: product.repo,
            license: "https://www.apache.org/licenses/LICENSE-2.0",
          }),
        }}
      />
    </>
  );
}
