"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { waLink, PHONE_DISPLAY, EMAIL } from "@/lib/contact";
import { cities } from "@/lib/seo-data";

const WA_LINK = waLink();

// Solutions grouped by Posify's 4 business types + closely related terms
const solutions = [
  { icon: "🍽️", slug: "restaurant", name: "Restaurant & Cafe", links: ["Restaurant POS", "Cafe POS", "Fast Food POS"] },
  { icon: "🛒", slug: "grocery", name: "Grocery & Store",   links: ["Grocery POS", "Kiryana Store POS", "Supermarket POS"] },
  { icon: "👗", slug: "boutique", name: "Boutique & Retail", links: ["Boutique POS", "Clothing Store POS", "Shoe Store POS"] },
  { icon: "💊", slug: "pharmacy", name: "Pharmacy & Medical", links: ["Pharmacy POS", "Medical Store POS", "Chemist POS"] },
];

export default function Footer() {
  const { t, dir } = useLang();

  const product = [
    { href: "#features", label: t.footer.links.features },
    { href: "#pricing", label: t.footer.links.pricing },
    { href: "#faq", label: t.footer.links.faq },
  ];
  const company = [
    { href: "#why", label: t.footer.links.about },
    { href: "#contact", label: t.footer.links.contact },
    { href: "#contact", label: t.footer.links.support },
  ];

  return (
    <footer className="border-t border-[#21262d] py-12" style={{ background: "var(--dark-surface)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-sm font-black">
                P
              </span>
              <span className="text-lg font-bold text-[#e6edf3]">Posify</span>
            </div>
            <p className="text-sm text-[#8b949e] max-w-xs leading-relaxed">{t.footer.tagline}</p>

            <a
              href={`mailto:${EMAIL}`}
              className="block w-fit mt-3 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              dir="ltr"
            >
              {EMAIL}
            </a>

            {/* WhatsApp click-to-chat */}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
              className="mt-4 inline-flex w-fit items-center gap-2.5 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all"
              style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.35)", color: "#4ade80" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.47 14.38c-.3-.15-1.74-.86-2-.96-.27-.1-.47-.15-.66.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.9-2.18-.24-.57-.48-.5-.66-.5l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.74-.71 1.98-1.4.25-.68.25-1.27.17-1.4-.07-.12-.27-.2-.57-.34M12.04 21.5h-.01a9.43 9.43 0 0 1-4.8-1.32l-.34-.2-3.57.93.96-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.43 9.45-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.43 9.43M20.52 3.45A11.78 11.78 0 0 0 12.04 0C5.46 0 .1 5.35.1 11.92c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.9 11.9 0 0 0 5.73 1.46h.01c6.58 0 11.93-5.35 11.93-11.92 0-3.19-1.24-6.18-3.49-8.44"/>
              </svg>
              {PHONE_DISPLAY}
            </a>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold text-[#e6edf3] uppercase tracking-wider mb-3">{t.footer.product}</h4>
            <ul className="space-y-2">
              {product.map((l, i) => (
                <li key={i}>
                  <a href={l.href} className="text-sm text-[#8b949e] hover:text-[#e6edf3] transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-[#e6edf3] uppercase tracking-wider mb-3">{t.footer.company}</h4>
            <ul className="space-y-2">
              {company.map((l, i) => (
                <li key={i}>
                  <a href={l.href} className="text-sm text-[#8b949e] hover:text-[#e6edf3] transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Solutions by business — Posify's 4 categories + related */}
        <div className="pt-10 mb-8 border-t border-[#21262d]" dir="ltr">
          <h3 className="text-xs font-bold text-[#c9d1d9] uppercase tracking-wider mb-5">POS Solutions by Business</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((group) => (
              <div key={group.name}>
                <div className="flex items-center gap-2 mb-3 text-sm font-bold text-[#e6edf3]">
                  <span>{group.icon}</span> {group.name}
                </div>
                <ul className="space-y-2">
                  {group.links.map((label) => (
                    <li key={label}>
                      <Link href={`/pos-software-for/${group.slug}`} className="text-sm text-[#8b949e] hover:text-indigo-400 transition-colors">{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Cities — chip row (SEO) */}
        <div className="pt-8 mb-8 border-t border-[#21262d]" dir="ltr">
          <h3 className="text-xs font-bold text-[#c9d1d9] uppercase tracking-wider mb-4">Posify POS Software — Available All Over Pakistan</h3>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/pos-software/${city.slug}`}
                title={`POS Software in ${city.name}`}
                className="px-3 py-1.5 rounded-full text-xs font-medium text-[#8b949e] border border-[#21262d] hover:border-indigo-500/50 hover:text-indigo-400 transition-all"
              >
                POS Software in {city.name}
              </Link>
            ))}
          </div>
        </div>

        {/* SEO content — shows in the selected language only */}
        <div className="pt-8 mb-8 border-t border-[#21262d]" dir={dir}>
          <h3 className="text-sm font-bold text-[#c9d1d9] mb-3">{t.footer.seoHeading}</h3>
          <p className="text-[13px] text-[#6e7681] leading-relaxed max-w-4xl">
            {t.footer.seoText}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#21262d] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-[#8b949e]">© 2026 Posify. {t.footer.rights}</span>
          <div className="flex items-center gap-5" dir="ltr">
            <Link href="/privacy" className="text-xs text-[#8b949e] hover:text-[#e6edf3] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-xs text-[#8b949e]">{t.footer.made}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
