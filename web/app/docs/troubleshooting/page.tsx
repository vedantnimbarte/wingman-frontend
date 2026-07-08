import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/docs/DocPage";
import { DocHeading } from "@/components/docs/DocHeading";
import { CodeBlock, Code } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { product } from "@/content/product";

export const metadata: Metadata = {
  title: "Troubleshooting",
  description: "Common install and runtime issues, and how to fix them.",
};

export default function Troubleshooting() {
  return (
    <DocPage
      path="/docs/troubleshooting"
      group="Reference"
      title="Troubleshooting"
      description="Fixes for the issues people hit most often. If yours isn't here, ask in Discussions or open an issue."
    >
      <DocHeading as="h2" id="glibc">“version GLIBC_2.38 not found” on Linux</DocHeading>
      <p>
        The prebuilt Linux binaries embed ONNX Runtime, which requires{" "}
        <strong>glibc ≥ 2.38</strong> (Ubuntu 24.04+, Debian 13+, Fedora 39+). On an older distro,
        build from source instead:
      </p>
      <CodeBlock>{product.fromSource}</CodeBlock>

      <DocHeading as="h2" id="intel-mac">No install on Intel Mac</DocHeading>
      <p>
        There&rsquo;s no prebuilt binary for Intel macOS (GitHub is retiring Intel runners). Install
        from source:
      </p>
      <CodeBlock>{product.fromSource}</CodeBlock>

      <DocHeading as="h2" id="no-provider">“No provider configured”</DocHeading>
      <p>
        Wingman ships without keys — connect one first. The TUI still opens so you can run{" "}
        <Code>/login</Code>; from the CLI:
      </p>
      <CodeBlock>{`wingman login anthropic     # or openai, gemini, ollama, …`}</CodeBlock>
      <p>
        For local models, <Code>wingman discover</Code> needs no key — see{" "}
        <Link href="/docs/providers">Providers &amp; models</Link>.
      </p>

      <DocHeading as="h2" id="keyring">Keyring errors on a headless server</DocHeading>
      <p>
        On machines with no OS keyring (headless Linux, containers), storing a key can fail. Reference
        the key from an environment variable in config instead:
      </p>
      <CodeBlock>{`[providers.anthropic]
api_key = "\${ANTHROPIC_API_KEY}"`}</CodeBlock>

      <DocHeading as="h2" id="rate-limits">Rate limits or provider errors</DocHeading>
      <p>Set a fallback chain so the runtime walks to the next model on failure:</p>
      <CodeBlock>{`[router]
fallback_models = ["openai/gpt-4.1", "openrouter/anthropic/claude-opus-4-8"]`}</CodeBlock>

      <DocHeading as="h2" id="context">“Context window exceeded” on long sessions</DocHeading>
      <p>
        Wingman compacts history automatically past <Code>compact_at_tokens</Code> (default 120k). You
        can also compact on demand in the TUI with <Code>/compact</Code>, or lower the threshold in{" "}
        <Link href="/docs/configuration">config</Link>.
      </p>

      <DocHeading as="h2" id="undo">Undo an unwanted change</DocHeading>
      <CodeBlock>{`wingman undo        # restore the most recent checkpoint (git stash pop)`}</CodeBlock>
      <p>
        Snapshots are created around mutating tools; <Code>wingman checkpoint</Code> takes one
        manually.
      </p>

      <DocHeading as="h2" id="uninstall">Uninstall</DocHeading>
      <p>
        Remove the binary from your install dir (default <Code>~/.local/bin/wingman</Code>) and, if you
        want a clean slate, the data directory:
      </p>
      <CodeBlock>{`rm ~/.local/bin/wingman
rm -rf ~/.wingman        # config, memory, sessions, usage`}</CodeBlock>

      <Callout variant="note" title="Still stuck?">
        Run with <Code>-v</Code> / <Code>-vv</Code> for more logs, then{" "}
        <a href={product.issues} target="_blank" rel="noreferrer noopener">
          open an issue
        </a>{" "}
        with the output.
      </Callout>
    </DocPage>
  );
}
