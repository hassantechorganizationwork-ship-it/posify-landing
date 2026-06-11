"use client";

import { useState, useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";

export default function FAQ() {
  const { t } = useLang();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
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
    <section id="faq" ref={ref} className="py-24" style={{ background: "var(--dark-surface)" }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="fade-up inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-4">
            {t.faq.badge}
          </div>
          <h2 className="fade-up delay-1 text-3xl sm:text-4xl font-bold text-[#e6edf3]">
            {t.faq.title}
          </h2>
        </div>

        <div className="space-y-3">
          {t.faq.items.map((faq, i) => (
            <div key={faq.q} className={`fade-up delay-${(i % 6) + 1}`}>
            <div
              className={`rounded-2xl border overflow-hidden transition-all duration-200 faq-item ${
                openIdx === i ? "border-indigo-500/40 bg-indigo-500/5" : "border-[#21262d] hover:border-indigo-500/30"
              }`}
              style={{ background: openIdx === i ? undefined : "var(--dark-bg)" }}
            >
              <button
                className="w-full px-5 py-4 flex items-center justify-between text-start gap-3 cursor-pointer group"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className="text-sm font-medium text-[#e6edf3]">{faq.q}</span>
                <span
                  className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${
                    openIdx === i ? "bg-indigo-500 text-white rotate-45" : "bg-[#21262d] text-[#8b949e]"
                  }`}
                >
                  +
                </span>
              </button>
              {openIdx === i && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-[#8b949e] leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
