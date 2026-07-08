import type { MetadataRoute } from "next";
import { docsOrder } from "@/content/docs-nav";

const base = "https://wingman.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const top = ["", "/features", "/install", "/changelog", "/about"];
  const docs = docsOrder.map((d) => d.href); // /docs and all sub-pages
  const routes = [...top, ...docs];
  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date("2026-07-09"),
    changeFrequency: "weekly",
    priority: r === "" ? 1 : r.startsWith("/docs") ? 0.6 : 0.7,
  }));
}
