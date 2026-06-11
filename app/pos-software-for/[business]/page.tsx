import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoLanding from "@/components/SeoLanding";
import { businesses, cities, SITE } from "@/lib/seo-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return businesses.map((b) => ({ business: b.slug }));
}

function getBusiness(slug: string) {
  return businesses.find((b) => b.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ business: string }> }): Promise<Metadata> {
  const { business } = await params;
  const b = getBusiness(business);
  if (!b) return {};
  const url = `${SITE}/pos-software-for/${b.slug}`;
  const title = `${b.title} in Pakistan — Posify | FBR Integrated POS`;
  const description = `${b.intro} FBR ready, offline-first, from Rs. 2,000/month. Available in Lahore, Karachi, Islamabad and all over Pakistan. Free trial!`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description, siteName: "Posify", locale: "en_PK" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function BusinessPage({ params }: { params: Promise<{ business: string }> }) {
  const { business } = await params;
  const b = getBusiness(business);
  if (!b) notFound();

  const url = `${SITE}/pos-software-for/${b.slug}`;
  const others = businesses.filter((x) => x.slug !== b.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: b.title, item: url },
        ],
      },
      {
        "@type": "Service",
        serviceType: b.title,
        name: `Posify — ${b.title}`,
        description: b.intro,
        provider: { "@type": "Organization", name: "Posify", url: SITE },
        areaServed: { "@type": "Country", name: "Pakistan" },
        offers: { "@type": "Offer", price: "2000", priceCurrency: "PKR" },
      },
    ] as Record<string, unknown>[],
  };

  return (
    <SeoLanding
      badge={`${b.icon} ${b.title}`}
      h1={`${b.title} for Pakistan`}
      intro={b.intro}
      bullets={b.features}
      sections={[
        {
          h2: `Built for ${b.name.toLowerCase()} businesses in Pakistan`,
          body: `Posify is designed around how ${b.name.toLowerCase()} businesses actually work. It runs fully offline so your billing never stops, keeps your data on your own device, and connects to FBR in one click when you need tax-compliant invoices. Setup takes minutes and our team helps you free over WhatsApp.`,
        },
        {
          h2: "Simple, affordable pricing",
          body: `Start free for the first month, then just Rs. 2,000/month with no hidden charges — unlimited sales, products and reports included. It's the affordable, sasta POS software thousands of Pakistani businesses can rely on.`,
        },
      ]}
      relatedTitle="Explore Posify for your business & city"
      related={[
        ...others.map((x) => ({ href: `/pos-software-for/${x.slug}`, label: x.title })),
        ...cities.slice(0, 6).map((cty) => ({ href: `/pos-software/${cty.slug}`, label: `POS Software in ${cty.name}` })),
        { href: "/", label: "Home" },
      ]}
      ctaTitle={`Get Posify for your ${b.name.toLowerCase()} business`}
      waMessage={`Assalam o Alaikum! Mujhe ${b.name} ke liye Posify POS ka demo chahiye.`}
      jsonLd={jsonLd}
    />
  );
}
