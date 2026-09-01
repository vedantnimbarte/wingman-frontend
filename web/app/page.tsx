import { Hero } from "@/components/sections/Hero";
import { ContextTax } from "@/components/sections/ContextTax";
import { ProviderMarquee } from "@/components/sections/ProviderMarquee";
import { PillarSection } from "@/components/sections/PillarSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { InstallBand } from "@/components/sections/InstallBand";
import { SocialProof } from "@/components/sections/SocialProof";
import { CompareTeaser } from "@/components/sections/CompareTeaser";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { pillars, secondaryFeatures } from "@/content/features";
import { product } from "@/content/product";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ContextTax />

      {pillars.map((f, i) => (
        <PillarSection key={f.id} feature={f} index={i} />
      ))}

      <ProviderMarquee />

      <FeatureGrid
        eyebrow="Everything else"
        title="The rest is table stakes — it has those too"
        lead="A batteries-included tool layer, an MCP host and server, a multi-agent pilot, a board, a remote API, and safety nets — all gated by the active permission mode."
        features={secondaryFeatures}
      />

      <SocialProof />
      <CompareTeaser />
      <InstallBand />
      <CtaBanner />

      {/* SoftwareApplication structured data */}
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
            license: "https://opensource.org/licenses/MIT",
          }),
        }}
      />
    </>
  );
}
