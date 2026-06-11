"use client";

import { useLang } from "@/lib/i18n";

export default function TrustBar() {
  const { lang } = useLang();

  const label =
    lang === "ur" ? "یہ ادائیگی کے طریقے قبول کرتے ہیں"
    : lang === "roman" ? "In payment methods ko accept karta hai"
    : "Accepts all major payment methods";

  const badges = [
    { label: "JazzCash", color: "#e63946", bg: "#e6394615" },
    { label: "Easypaisa", color: "#00b341", bg: "#00b34115" },
    { label: "Cash", color: "#f59e0b", bg: "#f59e0b15" },
    { label: "Bank Transfer", color: "#6366f1", bg: "#6366f115" },
    { label: "Card", color: "#8b5cf6", bg: "#8b5cf615" },
    { label: "FBR ✓", color: "#10b981", bg: "#10b98115" },
  ];

  return (
    <div className="py-6 border-b border-[#21262d]" style={{ background: "var(--dark-bg)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="text-center text-xs text-[#8b949e] mb-4 uppercase tracking-widest">{label}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {badges.map((b) => (
            <div
              key={b.label}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm font-semibold transition-all hover:scale-105"
              style={{
                background: b.bg,
                borderColor: b.color + "40",
                color: b.color,
              }}
            >
              {b.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
