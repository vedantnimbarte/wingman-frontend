import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { PillarSection } from "@/components/sections/PillarSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { pillars, secondaryFeatures } from "@/content/features";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Resolved code intelligence, a verification gate, 73+ providers, and a memory you can read. Everything Wingman does, in depth.",
};

export default function FeaturesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Features"
        title="Five things comparable agents don't do"
        lead="Everything else Wingman does is table stakes, and it has those too. These are the differences worth the switch — each one a claim you can check against the code."
      />

      {pillars.map((f, i) => (
        <PillarSection key={f.id} feature={f} index={i} />
      ))}

      <FeatureGrid
        eyebrow="Table stakes"
        title="And the rest of the toolkit"
        lead="A multi-agent pilot, a cross-repo board, a remote HTTP API, background shell jobs, an MCP host and server, and the permission model that gates all of it."
        features={secondaryFeatures}
      />

      <CtaBanner />
    </>
  );
}
