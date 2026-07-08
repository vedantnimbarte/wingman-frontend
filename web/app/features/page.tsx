import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { PillarSection } from "@/components/sections/PillarSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { pillars, secondaryFeatures } from "@/content/features";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Provider-agnostic, terminal-first, self-improving, multi-agent. Everything Wingman does, in depth.",
};

export default function FeaturesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Features"
        title="One agent. Every provider. Your terminal."
        lead="Wingman pairs a fast terminal UI with a batteries-included tool layer, a memory that compounds across sessions, and an optional multi-agent pilot — without tying you to a single model vendor."
      />

      <div className="py-6">
        {pillars.map((f, i) => (
          <PillarSection key={f.id} feature={f} index={i} />
        ))}
      </div>

      <FeatureGrid
        eyebrow="More"
        title="The rest of the toolkit"
        lead="MCP host, permission modes, guided login, checkpoints, cost tracking, and the built-in tools — each gated by the active permission mode."
        features={secondaryFeatures}
      />

      <CtaBanner />
    </>
  );
}
