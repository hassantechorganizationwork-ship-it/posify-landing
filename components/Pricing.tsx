"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

const planMeta = [
  { color: "#6366f1", bg: "rgba(99,102,241,0.06)", border: "rgba(99,102,241,0.20)", iconBg: "rgba(99,102,241,0.12)" },
  { color: "#8b5cf6", bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.35)", iconBg: "rgba(139,92,246,0.15)" },
  { color: "#10b981", bg: "rgba(16,185,129,0.06)", border: "rgba(16,185,129,0.20)", iconBg: "rgba(16,185,129,0.12)" },
];

// Annual billing data per plan (index 1 = Business has no toggle, just static price)
const annualData = [
  { price: "Rs. 19,999", note: "/year", savePercent: 17, subNote: "≈ Rs. 1,666/mo" },
  null, // Business — Coming Soon, no toggle
  { price: "Rs. 6,000", note: "/mo", savePercent: 25, subNote: "billed annually" },
];

export default function Pricing() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  // Per-card annual toggle: [solo, business, warehouse]
  const [annuals, setAnnuals] = useState([false, false, false]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) (e.target as HTMLElement).classList.add("visible"); }),
      { threshold: 0.05 }
    );
    ref.current?.querySelectorAll(".fade-up").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [t]);

  const toggle = (i: number) =>
    setAnnuals((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <section id="pricing" ref={ref} className="py-24" style={{ background: "var(--dark-surface)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="fade-up inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-4">
            {t.pricing.badge}
          </div>
          <h2 className="fade-up delay-1 text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-2">
            {t.pricing.title}
          </h2>
          <p className="fade-up delay-2 text-[#8b949e] mb-4">{t.pricing.subtitle}</p>
          <div className="fade-up delay-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-semibold">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            {t.pricing.firstFree} {t.pricing.riskFree}
          </div>
        </div>

        {/* Plans */}
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {t.pricing.plans.map((plan, i) => {
            const m = planMeta[i];
            const isHi = plan.highlight;
            const hasToggle = !plan.comingSoon && annualData[i] !== null;
            const isAnnual = annuals[i];
            const aData = annualData[i];

            return (
              <div
                key={plan.name}
                className={`fade-up delay-${i + 1} relative rounded-2xl p-7 flex flex-col border group transition-all duration-300 ${isHi ? "lg:-mt-4 lg:mb-4" : ""}`}
                style={{
                  background: isHi ? m.bg : "var(--dark-bg)",
                  borderColor: m.border,
                  boxShadow: isHi ? `0 0 40px ${m.color}18` : "none",
                }}
              >
                {/* Most Popular badge */}
                {isHi && !plan.comingSoon && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white text-[11px] font-bold whitespace-nowrap"
                    style={{ background: `linear-gradient(90deg, ${m.color}, #a78bfa)`, boxShadow: `0 4px 14px ${m.color}40` }}>
                    ⭐ {t.pricing.popular}
                  </div>
                )}

                {/* Billing Toggle — top of card, only for plans with annual option */}
                {hasToggle && (
                  <div className="flex items-center self-start gap-0 mb-5 rounded-lg overflow-hidden border"
                    style={{ borderColor: m.border }}>
                    <button
                      onClick={() => toggle(i)}
                      className={`px-3 py-1.5 text-[11px] font-semibold transition-all`}
                      style={!isAnnual
                        ? { background: m.color, color: "#fff" }
                        : { background: "transparent", color: "#8b949e" }}
                    >
                      {t.pricing.monthly}
                    </button>
                    <button
                      onClick={() => toggle(i)}
                      className="px-3 py-1.5 text-[11px] font-semibold transition-all flex items-center gap-1.5"
                      style={isAnnual
                        ? { background: m.color, color: "#fff" }
                        : { background: "transparent", color: "#8b949e" }}
                    >
                      {t.pricing.annual}
                      {!isAnnual && aData && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold"
                          style={{ background: `${m.color}22`, color: m.color }}>
                          -{aData.savePercent}%
                        </span>
                      )}
                    </button>
                  </div>
                )}

                {/* Trial badge (active plans only) */}
                {!plan.comingSoon && (
                  <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-lg text-[11px] font-bold mb-4"
                    style={{ background: m.iconBg, color: m.color }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    {t.pricing.trialBadge}
                  </div>
                )}

                {/* Plan name */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{plan.tag}</span>
                  <span className={`text-xl font-bold ${plan.comingSoon ? "text-[#484f58]" : "text-[#e6edf3]"}`}>{plan.name}</span>
                </div>

                {/* Price */}
                <div className="flex items-end gap-1.5 mb-1">
                  <span className={`text-4xl font-extrabold transition-all duration-300 ${plan.comingSoon ? "text-[#484f58]" : "text-[#e6edf3]"}`}>
                    {isAnnual && aData ? aData.price : plan.price}
                  </span>
                  <span className="text-[#8b949e] mb-1.5 text-sm">
                    {isAnnual && aData ? aData.note : plan.priceNote}
                  </span>
                </div>

                {/* Annual subNote + save badge */}
                {isAnnual && aData && !plan.comingSoon && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-[#8b949e]">{aData.subNote}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                      style={{ background: "rgba(16,185,129,0.15)", color: "#34d399" }}>
                      {t.pricing.save} {aData.savePercent}% 🎉
                    </span>
                  </div>
                )}
                {!isAnnual && !plan.comingSoon && (
                  <p className="text-[11px] text-[#484f58] mb-0">
                    {/* spacer so layout doesn't jump */}&nbsp;
                  </p>
                )}

                <p className={`text-sm mb-6 min-h-[36px] mt-2 ${plan.comingSoon ? "text-[#484f58]" : "text-[#8b949e]"}`}>{plan.blurb}</p>

                {/* Divider */}
                <div className="h-px mb-5" style={{ background: m.border }} />

                {/* Perks */}
                <ul className="space-y-3 mb-7 flex-1">
                  {plan.perks.map((p) => (
                    <li key={p} className={`flex items-start gap-2.5 text-sm ${plan.comingSoon ? "text-[#484f58]" : "text-[#c9d1d9]"}`}>
                      <span className="w-5 h-5 mt-0.5 rounded-full flex items-center justify-center text-xs shrink-0"
                        style={{ background: plan.comingSoon ? "#21262d" : `${m.color}20`, color: plan.comingSoon ? "#484f58" : m.color }}>
                        ✓
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {!plan.comingSoon ? (
                  <a
                    href="#contact"
                    className="block w-full py-3 rounded-xl font-semibold text-sm text-center transition-all"
                    style={isHi ? {
                      background: `linear-gradient(135deg, ${m.color}, #a78bfa)`,
                      color: "#fff",
                      boxShadow: `0 4px 20px ${m.color}40`,
                    } : {
                      border: `1px solid ${m.border}`,
                      color: "#e6edf3",
                    }}
                  >
                    {plan.cta}
                  </a>
                ) : (
                  <div className="block w-full py-3 rounded-xl font-semibold text-sm text-center"
                    style={{ border: `1px solid ${m.color}45`, background: `${m.color}12`, color: m.color, cursor: "default" }}>
                    {t.pricing.comingSoon}
                  </div>
                )}

                {/* Hover bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${m.color}, transparent)` }} />
              </div>
            );
          })}
        </div>

        <p className="fade-up text-center mt-10 text-xs text-[#8b949e]">
          {t.pricing.firstFree} {t.pricing.riskFree}
        </p>
      </div>
    </section>
  );
}
