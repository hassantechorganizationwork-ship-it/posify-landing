"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";

const styles = [
  { gradient: "from-orange-500/20 to-amber-500/10", border: "border-orange-500/20", iconBg: "bg-orange-500/20" },
  { gradient: "from-emerald-500/20 to-cyan-500/10", border: "border-emerald-500/20", iconBg: "bg-emerald-500/20" },
  { gradient: "from-violet-500/20 to-purple-500/10", border: "border-violet-500/20", iconBg: "bg-violet-500/20" },
  { gradient: "from-red-500/20 to-rose-500/10", border: "border-red-500/20", iconBg: "bg-red-500/20" },
];

export default function Features() {
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
    <section id="features" ref={ref} className="py-24 bg-grid" style={{ background: "var(--dark-bg)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="fade-up inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-4">
            {t.features.badge}
          </div>
          <h2 className="fade-up delay-1 text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">
            {t.features.title}
          </h2>
          <p className="fade-up delay-2 text-[#8b949e] max-w-lg mx-auto">
            {t.features.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.features.cards.map((f, i) => (
            <div
              key={f.title}
              className={`fade-up delay-${i + 1} card-hover rounded-2xl p-6 border ${styles[i].border} bg-gradient-to-br ${styles[i].gradient}`}
              style={{ background: "var(--dark-surface)" }}
            >
              <div className={`w-12 h-12 rounded-xl ${styles[i].iconBg} flex items-center justify-center text-2xl mb-4`}>
                {f.icon}
              </div>
              <h3 className="font-bold text-[#e6edf3] text-lg mb-1">{f.title}</h3>
              <p className="text-xs text-[#8b949e] mb-4">{f.tagline}</p>
              <ul className="space-y-2">
                {f.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#8b949e]">
                    <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
