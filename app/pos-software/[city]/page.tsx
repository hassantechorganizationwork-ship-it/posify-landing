import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoLanding from "@/components/SeoLanding";
import { cities, businesses, SITE } from "@/lib/seo-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const c = getCity(city);
  if (!c) return {};
  const url = `${SITE}/pos-software/${c.slug}`;
  const title = `POS Software in ${c.name} — Posify | Restaurant, Grocery & Pharmacy POS`;
  const description = `Looking for the best POS software in ${c.name}? Posify is an FBR integrated, offline-first point of sale system for restaurants, grocery & kiryana stores, boutiques and pharmacies in ${c.name}, ${c.province}. From Rs. 2,000/month. Free trial!`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description, siteName: "Posify", locale: "en_PK" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const c = getCity(city);
  if (!c) notFound();

  const url = `${SITE}/pos-software/${c.slug}`;
  const otherCities = cities.filter((x) => x.slug !== c.slug).slice(0, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: `POS Software in ${c.name}`, item: url },
        ],
      },
      {
        "@type": "Service",
        serviceType: `POS Software in ${c.name}`,
        name: `Posify POS Software — ${c.name}`,
        description: `FBR integrated point of sale and billing software for businesses in ${c.name}, Pakistan.`,
        provider: { "@type": "Organization", name: "Posify", url: SITE },
        areaServed: { "@type": "City", name: c.name },
        offers: { "@type": "Offer", price: "2000", priceCurrency: "PKR" },
      },
      {
        "@type": "LocalBusiness",
        name: `Posify POS — ${c.name}`,
        image: `${SITE}/og-image.png`,
        url,
        telephone: "+923174065200",
        priceRange: "Rs. 2,000",
        address: { "@type": "PostalAddress", addressLocality: c.name, addressRegion: c.province, addressCountry: "PK" },
        areaServed: { "@type": "City", name: c.name },
      },
    ] as Record<string, unknown>[],
  };

  return (
    <SeoLanding
      badge={`🇵🇰 POS Software in ${c.name}`}
      h1={`Pakistan's #1 POS Software in ${c.name}`}
      intro={`Posify is the smart, affordable POS system for businesses in ${c.name}. ${c.note} Restaurant, grocery, boutique or pharmacy — bill faster, track stock and stay FBR-ready, all offline. Starting at just Rs. 2,000/month.`}
      bullets={[
        "FBR integrated invoicing",
        "Works 100% offline — your data stays on your device",
        "Restaurant, Grocery, Boutique & Pharmacy modes",
        "Barcode scanning & receipt printing",
        "JazzCash, Easypaisa, cash & card payments",
        "Full Urdu support & free WhatsApp setup",
      ]}
      sections={[
        {
          h2: `Why ${c.name} businesses choose Posify`,
          body: `Shops across ${c.name} need a POS that just works — fast at the counter, reliable when the internet drops, and simple enough for any cashier. Posify keeps all your sales, inventory and customer data safely on your own computer, so billing never stops. When you're ready, connect FBR in one click for tax-compliant invoices.`,
        },
        {
          h2: `Affordable POS software pricing in ${c.name}`,
          body: `Posify starts at just Rs. 2,000 per month with no hidden charges and a free first month. Whether you run a single counter or multiple billing counters on a local network, you get unlimited sales, inventory and reports. It's the sasta, dependable POS software ${c.name} businesses can grow with.`,
        },
      ]}
      relatedTitle="POS Software in other cities"
      related={[
        ...otherCities.map((x) => ({ href: `/pos-software/${x.slug}`, label: `POS Software in ${x.name}` })),
        ...businesses.map((b) => ({ href: `/pos-software-for/${b.slug}`, label: b.title })),
        { href: "/", label: "Home" },
      ]}
      ctaTitle={`Get Posify POS in ${c.name} today`}
      waMessage={`Assalam o Alaikum! Mujhe ${c.name} ke liye Posify POS ka demo chahiye.`}
      jsonLd={jsonLd}
    />
  );
}
