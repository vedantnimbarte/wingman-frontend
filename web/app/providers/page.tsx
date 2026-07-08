import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Button } from "@/components/ui/Button";
import { product } from "@/content/product";

export const metadata: Metadata = {
  title: "Providers",
  description:
    "73+ LLM providers behind one streaming interface — hosted or fully local, bring your own key, no lock-in.",
};

const groups = [
  {
    heading: "Native adapters",
    note: "Purpose-built for provider-specific features.",
    items: [
      { name: "Anthropic", note: "reference impl · streaming · prompt caching" },
      { name: "OpenAI", note: "GPT models" },
      { name: "Google Gemini", note: "native adapter" },
      { name: "ChatGPT", note: "browser OAuth" },
    ],
  },
  {
    heading: "OpenAI-compatible",
    note: "One adapter reaches any OpenAI-compatible endpoint — that's most of the 73+.",
    items: [
      { name: "OpenRouter", note: "hundreds of models, one key" },
      { name: "LiteLLM", note: "proxy to many providers" },
      { name: "Groq, Together, Fireworks…", note: "any OpenAI-compatible host" },
      { name: "Custom endpoint", note: "set base_url in config" },
    ],
  },
  {
    heading: "Local & offline",
    note: "No key, no data leaving your machine. Auto-detected by wingman discover.",
    items: [
      { name: "Ollama", note: "localhost:11434" },
      { name: "LM Studio", note: "localhost:1234" },
      { name: "vLLM", note: "localhost:8000" },
      { name: "Any local server", note: "OpenAI-compatible" },
    ],
  },
];

export default function ProvidersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Providers"
        title="73+ providers, one interface"
        lead="Anthropic is the reference implementation; a single OpenAI-compatible adapter covers most of the rest; Gemini and ChatGPT have their own. All speak one message contract — swap any time, no lock-in."
      />

      <section className="py-8">
        <Container>
          <div className="space-y-8">
            {groups.map((g) => (
              <div key={g.heading} className="rounded-xl border border-hairline bg-surface-1 p-6 shadow-lift md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-card-title text-ink">{g.heading}</h2>
                  <p className="text-body-sm text-ink-tertiary">{g.note}</p>
                </div>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {g.items.map((it) => (
                    <li key={it.name} className="rounded-lg border border-hairline bg-surface-2/50 p-4">
                      <span className="block text-body font-medium text-ink">{it.name}</span>
                      <span className="mt-1 block text-caption text-ink-tertiary">{it.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/docs/providers" variant="primary">
              Provider setup guide
            </Button>
            <Button href={product.repo} external variant="secondary">
              See the full list ↗
            </Button>
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
