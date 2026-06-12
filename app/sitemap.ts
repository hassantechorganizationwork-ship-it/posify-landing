import type { MetadataRoute } from "next";
import { cities, businesses } from "@/lib/seo-data";

const SITE = "https://posify.pk";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const ogImage = `${SITE}/opengraph-image`;

  const cityPages: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `${SITE}/pos-software/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [ogImage],
  }));

  const businessPages: MetadataRoute.Sitemap = businesses.map((b) => ({
    url: `${SITE}/pos-software-for/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [ogImage],
  }));

  return [
    {
      url: SITE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images: [ogImage],
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
