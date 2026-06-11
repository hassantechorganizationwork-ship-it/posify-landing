"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";
import { fireLiveEvent } from "@/components/LiveActivity";
import { waLink } from "@/lib/contact";

export default function CTA() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) (e.target as HTMLElement).classList.add("visible"); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".fade-up").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [t]);

  return (
    <section id="contact" ref={ref} className="relative py-24 bg-grid overflow-hidden" style={{ background: "var(--dark-bg)" }}>
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)" }}
      />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="fade-up inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium mb-6">
          {t.cta.badge}
        </div>

        <h2 className="fade-up delay-1 text-4xl sm:text-5xl font-extrabold text-[#e6edf3] mb-4">
          {t.cta.titleA}{" "}
          <span className="gradient-text">{t.cta.titleEm}</span>
        </h2>

        <p className="fade-up delay-2 text-lg text-[#8b949e] mb-10 max-w-lg mx-auto">
          {t.cta.subtitle}
        </p>

        <div className="fade-up delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href={waLink("Assalam o Alaikum! Mujhe Posify POS ka free demo chahiye. Please details bhejein.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => fireLiveEvent("Pakistan", "demo")}
            className="wa-btn flex items-center gap-3 px-7 py-4 rounded-2xl text-white font-semibold text-base"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t.cta.whatsapp}
          </a>

          <a
            href="mailto:info@posify.pk"
            className="flex items-center gap-2 px-6 py-4 rounded-2xl border border-[#30363d] hover:border-indigo-500/50 text-[#e6edf3] font-medium text-sm transition-all"
            dir="ltr"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            {t.cta.email}
          </a>
        </div>

        <p className="fade-up delay-4 text-xs text-[#8b949e]">
          {t.cta.response}
        </p>
      </div>
    </section>
  );
}
