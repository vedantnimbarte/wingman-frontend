import type { MetadataRoute } from "next";
import { docsOrder } from "@/content/docs-nav";
import { SITE } from "@/content/product";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const top = ["", "/changelog"];
  const docs = docsOrder.map((d) => d.href); // /docs and all sub-pages
  const routes = [...top, ...docs];
  return routes.map((r) => ({
    url: `${SITE}${r}`,
    lastModified: new Date("2026-09-17"),
    changeFrequency: "weekly",
    priority: r === "" ? 1 : r.startsWith("/docs") ? 0.6 : 0.7,
  }));
}
