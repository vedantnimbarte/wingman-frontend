import { Hero } from "@/components/sections/Hero";
import { ProviderMarquee } from "@/components/sections/ProviderMarquee";
import { PillarSection } from "@/components/sections/PillarSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { InstallBand } from "@/components/sections/InstallBand";
import { SocialProof } from "@/components/sections/SocialProof";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { pillars, secondaryFeatures } from "@/content/features";
import { product } from "@/content/product";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProviderMarquee />

      <div className="py-8">
        {pillars.map((f, i) => (
          <PillarSection key={f.id} feature={f} index={i} />
        ))}
      </div>

      <FeatureGrid
        eyebrow="Built-in"
        title="Everything else in the box"
        lead="A batteries-included tool layer, MCP host, safety nets, and observability — all gated by the active permission mode."
        features={secondaryFeatures}
      />

      <SocialProof />
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
