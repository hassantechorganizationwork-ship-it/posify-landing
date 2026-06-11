"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";

const stepMeta = [
  {
    num: "01",
    color: "#6366f1",
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.22)",
    glow: "rgba(99,102,241,0.15)",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <line x1="9" y1="10" x2="15" y2="10" />
        <line x1="9" y1="14" x2="13" y2="14" />
      </svg>
    ),
  },
  {
    num: "02",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.22)",
    glow: "rgba(139,92,246,0.15)",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    num: "03",
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.22)",
    glow: "rgba(16,185,129,0.15)",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          if (el.classList.contains("how-card")) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          } else {
            el.classList.add("visible");
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 80px 0px" }
    );
    root.querySelectorAll<HTMLElement>(".how-card, .fade-up").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [t]);

  return (
    <section ref={ref} className="py-28" style={{ background: "var(--dark-bg)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="fade-up inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-4">
            {t.how.badge}
          </div>
          <h2 className="fade-up delay-1 text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-3">
            {t.how.title}
          </h2>
          <p className="fade-up delay-2 text-[#8b949e]">{t.how.subtitle}</p>
        </div>

        {/* Step cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {t.how.steps.map((s, i) => {
            const m = stepMeta[i];
            return (
              <div
                key={s.title}
                className="how-card rounded-2xl p-7 border relative overflow-hidden group"
                style={{
                  background: m.bg,
                  borderColor: m.border,
                  opacity: 0,
                  transform: "translateY(28px)",
                  transition: `opacity 0.55s ease ${i * 0.12}s, transform 0.55s ease ${i * 0.12}s`,
                }}
              >
                {/* Watermark number */}
                <div
                  className="absolute top-4 right-5 text-6xl font-black select-none pointer-events-none leading-none"
                  style={{ color: m.color, opacity: 0.08 }}
                >
                  {m.num}
                </div>

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{
                    background: `linear-gradient(135deg, ${m.color}22, ${m.color}0a)`,
                    border: `1px solid ${m.border}`,
                    color: m.color,
                    boxShadow: `0 6px 20px ${m.glow}`,
                  }}
                >
                  {m.icon}
                </div>

                {/* Step label */}
                <span className="text-xs font-bold tracking-widest uppercase block mb-2" style={{ color: m.color }}>
                  Step {m.num}
                </span>

                {/* Text */}
                <h3 className="font-bold text-[#e6edf3] text-xl mb-2">{s.title}</h3>
                <p className="text-sm text-[#8b949e] leading-relaxed">{s.desc}</p>

                {/* Hover bottom bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${m.color}, transparent)` }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
