import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/docs/DocPage";
import { DocHeading } from "@/components/docs/DocHeading";
import { CodeBlock, Code } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { ReferenceTable } from "@/components/docs/ReferenceTable";

export const metadata: Metadata = {
  title: "Providers & models",
  description: "Connect hosted providers or fully local models, and switch between them freely.",
};

export default function Providers() {
  return (
    <DocPage
      path="/docs/providers"
      group="Guides"
      title="Providers & models"
      description="Wingman is provider-agnostic. Log in to a hosted provider, or point it at a local model — and switch any time."
    >
      <DocHeading as="h2" id="logging-in">Logging in</DocHeading>
      <p>
        <Code>wingman login &lt;provider&gt;</Code> probes the key, stores it in the OS keyring, and
        records a default model. It&rsquo;s the non-interactive equivalent of the TUI&rsquo;s{" "}
        <Code>/login</Code> wizard.
      </p>
      <CodeBlock>{`wingman login anthropic
wingman login openai
wingman logout openai      # removes the stored key`}</CodeBlock>
      <Callout variant="note" title="Keys stay in your keyring">
        Credentials go to the OS keyring, not a plaintext file. In config you can reference a key as
        a <Code>{"${ENV_VAR}"}</Code> placeholder so nothing secret is written to disk.
      </Callout>

      <DocHeading as="h2" id="hosted">Hosted providers</DocHeading>
      <ReferenceTable
        head={["Provider", "Auth", "Notes"]}
        rows={[
          ["anthropic", "API key", "Reference adapter: streaming, tool use, prompt caching."],
          ["openai", "API key", "OpenAI-compatible adapter."],
          ["chatgpt", "Browser OAuth", "Sign in through the browser flow."],
          ["gemini", "API key", "Native Google Gemini adapter."],
          ["openrouter", "API key", "Access many models via one OpenAI-compatible endpoint."],
          ["litellm", "API key", "Proxy to yet more providers."],
        ]}
      />

      <DocHeading as="h2" id="local">Local models</DocHeading>
      <p>
        Run entirely offline with Ollama, LM Studio, or vLLM. Auto-detect what&rsquo;s running:
      </p>
      <CodeBlock>{`wingman discover
# probes localhost for Ollama (11434), LM Studio (1234), vLLM (8000)
# and prints the models each exposes`}</CodeBlock>
      <p>Or point a provider at a custom endpoint in config:</p>
      <CodeBlock>{`# ~/.wingman/config.toml
[providers.ollama]
base_url = "http://localhost:11434/v1"
model = "llama3.1"`}</CodeBlock>

      <DocHeading as="h2" id="switching">Switching &amp; fallback</DocHeading>
      <p>Change provider/model live in the TUI — history is preserved, no restart:</p>
      <CodeBlock>{`/model openrouter/anthropic/claude-opus-4-8
/model ollama/llama3.1`}</CodeBlock>
      <p>
        Or from the CLI with <Code>--model</Code>. Set a fallback chain so the runtime walks to the
        next model on failure (see <Link href="/docs/configuration">Configuration → router</Link>):
      </p>
      <CodeBlock>{`[router]
fallback_models = ["openai/gpt-4.1", "openrouter/anthropic/claude-opus-4-8"]`}</CodeBlock>
    </DocPage>
  );
}
