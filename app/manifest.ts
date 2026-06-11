import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Posify — Pakistan's #1 POS Software",
    short_name: "Posify",
    description:
      "FBR integrated POS software for Restaurant, Grocery, Boutique and Pharmacy businesses in Pakistan. Offline-first, from Rs. 2,000/month.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d1117",
    theme_color: "#0d1117",
    lang: "en-PK",
    dir: "ltr",
    categories: ["business", "finance", "productivity", "shopping"],
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
