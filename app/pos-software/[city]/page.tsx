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
    keywords: [
      `POS software ${c.name}`,
      `POS system ${c.name}`,
      `point of sale ${c.name}`,
      `restaurant POS ${c.name}`,
      `pharmacy software ${c.name}`,
      `grocery POS ${c.name}`,
      `billing software ${c.name}`,
      `retail software ${c.name}`,
      `FBR POS ${c.name}`,
      `${c.name} POS software price`,
    ],
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description, siteName: "Posify", locale: "en_PK" },
    twitter: { card: "summary_large_image", title, description },
  };
}

function cityFaqs(name: string): { q: string; a: string }[] {
  return [
    { q: `How much does POS software cost in ${name}?`, a: `Posify starts at just Rs. 2,000 per month in ${name}, with your first month completely free and no hidden charges. You get unlimited sales, products and reports.` },
    { q: `Does Posify POS work offline in ${name}?`, a: `Yes. Posify is offline-first, so shops in ${name} can keep billing even when the internet is down — all your data stays safely on your own computer.` },
    { q: `Is Posify FBR integrated?`, a: `Yes. Businesses in ${name} can connect FBR in one click for tax-compliant invoices, or use Posify perfectly well without it — FBR is optional.` },
    { q: `Which businesses in ${name} can use Posify?`, a: `Restaurants and cafes, grocery and kiryana stores, clothing boutiques, and pharmacies and medical stores in ${name} all run on Posify.` },
    { q: `How do I get Posify POS in ${name}?`, a: `Message us on WhatsApp at 0317-4065200 and our team will set you up the same day in ${name}, with free training and support.` },
  ];
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const c = getCity(city);
  if (!c) notFound();

  const url = `${SITE}/pos-software/${c.slug}`;
  const otherCities = cities.filter((x) => x.slug !== c.slug).slice(0, 8);
  const faqs = cityFaqs(c.name);

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
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
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
      faqs={faqs}
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
