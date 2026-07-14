import type { MetadataRoute } from "next";

const siteUrl = "https://portfolio-kappa-teal-68.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
