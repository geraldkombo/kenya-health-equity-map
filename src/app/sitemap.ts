import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL || "https://geraldkombo.github.io/kenya-health-equity-map";
  const lastMod = new Date("2026-06-05");
  return [
    { url: baseUrl, lastModified: lastMod, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/method`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/compare`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/brief`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/dua`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.3 },
  ];
}
