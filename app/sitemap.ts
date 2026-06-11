import type { MetadataRoute } from "next";
import { cities, businesses } from "@/lib/seo-data";

const SITE = "https://posify.pk";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const cityPages: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `${SITE}/pos-software/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const businessPages: MetadataRoute.Sitemap = businesses.map((b) => ({
    url: `${SITE}/pos-software-for/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...businessPages,
    ...cityPages,
    {
      url: `${SITE}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
