/**
 * Structured data (JSON-LD) for rich results.
 *
 * NOTE: aggregateRating is intentionally omitted. Google's review-snippet
 * guidelines require ratings to be genuine and verifiable — publishing a fake
 * rating risks a manual penalty (the opposite of ranking well). Add an
 * `aggregateRating` block here once real customer reviews exist.
 */

const SITE = "https://posify.pk";
const PHONE = "+923174065200"; // 0317-4065200

const faqs: { q: string; a: string }[] = [
  { q: "Do I need an internet connection?", a: "No! Posify works fully offline. All your data stays safely on your device. Internet is only needed for FBR sync and WhatsApp support." },
  { q: "Can it run on more than one device?", a: "Yes — the Business plan supports up to 3 devices, and Enterprise is unlimited. Multi-branch sync is built in for larger setups." },
  { q: "Is FBR registration required?", a: "No. FBR integration is optional. If you're registered, connect it in one click — otherwise Posify works perfectly without it." },
  { q: "How do I get support?", a: "24/7 WhatsApp support is available. Setup, training and troubleshooting are all included free. You're never on your own." },
  { q: "Is there a free trial?", a: "Absolutely! Your first full month is free — no credit card needed. Request a demo and get started the same day." },
  { q: "Which payment methods are supported?", a: "Cash, JazzCash, Easypaisa, bank transfer and card machines — all built in. Split payments across methods are also supported." },
];

const cities = ["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala", "Hyderabad", "Bahawalpur"];

const graph: Record<string, unknown>[] = [
  {
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    name: "Posify",
    url: SITE,
    logo: `${SITE}/logo.png`,
    description: "Pakistan ka smart POS software for Restaurant, Grocery, Boutique and Pharmacy businesses.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: PHONE,
      contactType: "sales",
      areaServed: "PK",
      availableLanguage: ["en", "ur"],
    },
    sameAs: [],
  },
  {
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    url: SITE,
    name: "Posify",
    publisher: { "@id": `${SITE}/#organization` },
    inLanguage: "en-PK",
  },
  {
    "@type": "SoftwareApplication",
    "@id": `${SITE}/#software`,
    name: "Posify",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Windows",
    description: "Pakistan ka smart POS system for Restaurant, Grocery, Boutique, Pharmacy — FBR integrated, offline-first point of sale software.",
    url: SITE,
    publisher: { "@id": `${SITE}/#organization` },
    offers: {
      "@type": "Offer",
      price: "2000",
      priceCurrency: "PKR",
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
    },
    featureList: [
      "FBR integrated invoicing",
      "Offline-first local database",
      "Restaurant, Grocery, Boutique & Pharmacy modes",
      "Barcode & receipt printing",
      "JazzCash & Easypaisa support",
      "Inventory & sales reports",
    ],
  },
  {
    "@type": "LocalBusiness",
    "@id": `${SITE}/#localbusiness`,
    name: "Posify",
    image: `${SITE}/og-image.png`,
    url: SITE,
    telephone: PHONE,
    priceRange: "Rs. 2,000",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
    areaServed: cities.map((city) => ({ "@type": "City", name: city })),
  },
  {
    "@type": "FAQPage",
    "@id": `${SITE}/#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
  {
    "@type": "BreadcrumbList",
    "@id": `${SITE}/#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Features", item: `${SITE}/#features` },
      { "@type": "ListItem", position: 3, name: "Pricing", item: `${SITE}/#pricing` },
      { "@type": "ListItem", position: 4, name: "FAQ", item: `${SITE}/#faq` },
    ],
  },
  // Service schema per business type — targets "<business> POS Pakistan" queries
  ...[
    { name: "Restaurant POS Software", desc: "Point of sale and billing software for restaurants, cafes and fast food in Pakistan — tables, kitchen orders and FBR invoicing." },
    { name: "Grocery & Kiryana Store POS", desc: "POS and inventory software for grocery, kiryana and supermarket stores in Pakistan with barcode billing and stock control." },
    { name: "Boutique & Retail POS", desc: "Point of sale software for clothing boutiques, shoe and retail shops in Pakistan with size/variant tracking." },
    { name: "Pharmacy & Medical Store POS", desc: "Pharmacy management and POS software for medical stores and chemists in Pakistan with batch and expiry tracking." },
  ].map((s, i) => ({
    "@type": "Service",
    "@id": `${SITE}/#service-${i + 1}`,
    serviceType: s.name,
    name: s.name,
    description: s.desc,
    provider: { "@id": `${SITE}/#organization` },
    areaServed: { "@type": "Country", name: "Pakistan" },
    offers: { "@type": "Offer", price: "2000", priceCurrency: "PKR" },
  })),
];

const jsonLd = { "@context": "https://schema.org", "@graph": graph };

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
