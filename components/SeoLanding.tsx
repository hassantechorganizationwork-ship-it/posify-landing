import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { waLink, EMAIL } from "@/lib/contact";

export type SeoLandingProps = {
  badge: string;
  h1: string;
  intro: string;
  bullets: string[];
  sections?: { h2: string; body: string }[];
  relatedTitle: string;
  related: { href: string; label: string }[];
  ctaTitle: string;
  waMessage: string;
  jsonLd: { "@context": string; "@graph": Record<string, unknown>[] };
};

export default function SeoLanding(props: SeoLandingProps) {
  const { badge, h1, intro, bullets, sections, relatedTitle, related, ctaTitle, waMessage, jsonLd } = props;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      <main style={{ background: "var(--dark-bg)" }}>
        {/* Hero */}
        <section className="relative pt-28 pb-16 overflow-hidden bg-grid">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[360px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(99,102,241,0.14) 0%, transparent 70%)" }} />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-5">
              {badge}
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#e6edf3] mb-5 leading-tight">
              {h1}
            </h1>
            <p className="text-base sm:text-lg text-[#8b949e] max-w-2xl mx-auto leading-relaxed mb-8">
              {intro}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href={waLink(waMessage)} target="_blank" rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-xl btn-shimmer font-semibold text-sm">
                Request a Free Demo
              </a>
              <a href={`mailto:${EMAIL}`}
                className="px-7 py-3.5 rounded-xl border border-[#30363d] hover:border-indigo-500/50 text-[#e6edf3] font-semibold text-sm transition-all">
                Email Us
              </a>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16" style={{ background: "var(--dark-surface)" }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#e6edf3] text-center mb-10">What you get</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bullets.map((b) => (
                <div key={b} className="flex items-start gap-3 rounded-xl border border-[#21262d] p-5" style={{ background: "var(--dark-bg)" }}>
                  <span className="w-6 h-6 mt-0.5 rounded-full flex items-center justify-center text-xs shrink-0 bg-indigo-500/20 text-indigo-400">✓</span>
                  <span className="text-sm text-[#c9d1d9] leading-relaxed">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content sections */}
        {sections && sections.length > 0 && (
          <section className="py-16" style={{ background: "var(--dark-bg)" }}>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-10">
              {sections.map((s) => (
                <article key={s.h2}>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#e6edf3] mb-3">{s.h2}</h2>
                  <p className="text-[15px] text-[#8b949e] leading-relaxed">{s.body}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Internal links */}
        <section className="py-14" style={{ background: "var(--dark-surface)" }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-lg font-bold text-[#e6edf3] mb-5">{relatedTitle}</h2>
            <div className="flex flex-wrap gap-2">
              {related.map((r) => (
                <Link key={r.href} href={r.href}
                  className="px-3 py-1.5 rounded-full text-xs font-medium text-[#8b949e] border border-[#21262d] hover:border-indigo-500/50 hover:text-indigo-400 transition-all">
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center" style={{ background: "var(--dark-bg)" }}>
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#e6edf3] mb-4">{ctaTitle}</h2>
            <p className="text-[#8b949e] mb-8">First month free — no credit card required. Sirf Rs. 2,000/month.</p>
            <a href={waLink(waMessage)} target="_blank" rel="noopener noreferrer"
              className="inline-block px-8 py-4 rounded-xl btn-shimmer font-semibold text-base">
              Request a Free Demo on WhatsApp
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
