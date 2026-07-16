import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { features, site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: `${site.url}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  if (features.archive) {
    entries.push({ url: `${site.url}/archive`, lastModified: now, changeFrequency: "monthly", priority: 0.7 });
  }
  if (features.now) {
    entries.push({ url: `${site.url}/now`, lastModified: now, changeFrequency: "weekly", priority: 0.6 });
  }
  if (features.bookshelf) {
    entries.push({ url: `${site.url}/bookshelf`, lastModified: now, changeFrequency: "monthly", priority: 0.5 });
  }
  if (features.notes) {
    entries.push({ url: `${site.url}/notes`, lastModified: now, changeFrequency: "weekly", priority: 0.7 });
  }

  return entries;
}
