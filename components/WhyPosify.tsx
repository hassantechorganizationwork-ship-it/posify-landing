"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";

const styles = [
  { color: "from-emerald-500/20 to-teal-500/10", border: "border-emerald-500/25" },
  { color: "from-yellow-500/20 to-amber-500/10", border: "border-yellow-500/25" },
  { color: "from-blue-500/20 to-cyan-500/10", border: "border-blue-500/25" },
  { color: "from-violet-500/20 to-purple-500/10", border: "border-violet-500/25" },
  { color: "from-indigo-500/20 to-blue-500/10", border: "border-indigo-500/25" },
  { color: "from-green-500/20 to-emerald-500/10", border: "border-green-500/25" },
];

export default function WhyPosify() {
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
    <section id="why" ref={ref} className="py-24" style={{ background: "var(--dark-surface)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="fade-up inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-4">
            {t.why.badge}
          </div>
          <h2 className="fade-up delay-1 text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">
            {t.why.title}
          </h2>
          <p className="fade-up delay-2 text-[#8b949e] max-w-lg mx-auto">
            {t.why.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.why.cards.map((b, i) => (
            <div
              key={b.title}
              className={`fade-up delay-${(i % 6) + 1} card-hover rounded-2xl p-6 border ${styles[i].border} bg-gradient-to-br ${styles[i].color}`}
              style={{ background: "var(--dark-bg)" }}
            >
              <div className="text-3xl mb-3">{b.icon}</div>
              <h3 className="font-bold text-[#e6edf3] text-base mb-2">{b.title}</h3>
              <p className="text-sm text-[#8b949e] leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
