import type { MetadataRoute } from "next";

const siteUrl = "https://portfolio-kappa-teal-68.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
