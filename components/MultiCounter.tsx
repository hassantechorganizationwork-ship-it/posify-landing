"use client";

import { useEffect, useRef } from "react";
import { useLang, type Lang } from "@/lib/i18n";

/* Self-contained copy (keeps section translated without touching the big dictionary) */
const COPY: Record<Lang, {
  badge: string; title: string; titleHi: string; subtitle: string;
  master: string; online: string; counter: string; server: string;
}> = {
  en: {
    badge: "🖧 Multi-Counter Ready",
    title: "Many Counters.",
    titleHi: "One Network.",
    subtitle: "Connect unlimited billing counters over your local LAN — no internet needed. One master computer holds the data, every cashier terminal stays in perfect sync.",
    master: "MASTER", online: "ONLINE", counter: "COUNTER", server: "Posify Server",
  },
  roman: {
    badge: "🖧 Multi-Counter Ready",
    title: "Bohat Saaray Counter.",
    titleHi: "Aik Network.",
    subtitle: "Apni local LAN par unlimited billing counters connect karein — internet ki zaroorat nahi. Aik master computer data rakhta hai, har cashier terminal live sync rehta hai.",
    master: "MASTER", online: "ONLINE", counter: "COUNTER", server: "Posify Server",
  },
  ur: {
    badge: "🖧 ملٹی کاؤنٹر",
    title: "کئی کاؤنٹر۔",
    titleHi: "ایک نیٹ ورک۔",
    subtitle: "اپنی لوکل LAN پر لامحدود بلنگ کاؤنٹر جوڑیں — انٹرنیٹ کی ضرورت نہیں۔ ایک ماسٹر کمپیوٹر ڈیٹا رکھتا ہے، ہر کیشئر ٹرمینل لائیو سنک رہتا ہے۔",
    master: "ماسٹر", online: "آن لائن", counter: "کاؤنٹر", server: "Posify سرور",
  },
};

const terminals = [
  { n: "01", ip: "192.168.1.14", ping: "1ms", cx: 200 },
  { n: "02", ip: "192.168.1.15", ping: "2ms", cx: 500 },
  { n: "03", ip: "192.168.1.16", ping: "1ms", cx: 800 },
];

export default function MultiCounter() {
  const { t, lang } = useLang();
  const c = COPY[lang] ?? COPY.en;
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
    <section id="network" ref={ref} className="py-24 overflow-hidden" style={{ background: "var(--dark-bg)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="fade-up inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-4">
            {c.badge}
          </div>
          <h2 className="fade-up delay-1 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#e6edf3] mb-3">
            {c.title}{" "}
            <span className="gradient-text">{c.titleHi}</span>
          </h2>
          <p className="fade-up delay-2 text-[#8b949e] max-w-2xl mx-auto leading-relaxed">
            {c.subtitle}
          </p>
        </div>

        {/* Network diagram */}
        <div className="fade-up delay-3 relative rounded-3xl border border-[#21262d] overflow-hidden"
          style={{ background: "linear-gradient(180deg, rgba(99,102,241,0.04), rgba(13,17,23,0))" }}>

          {/* dotted grid backdrop */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "radial-gradient(rgba(99,102,241,0.10) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage: "radial-gradient(ellipse 70% 70% at 50% 45%, #000 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 45%, #000 40%, transparent 100%)",
          }} />

          <div className="relative mx-auto" style={{ width: "100%", maxWidth: 900, aspectRatio: "1000 / 470" }}>

            {/* SVG connection layer (lines + flowing data dots) */}
            <svg viewBox="0 0 1000 470" preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
              <defs>
                <linearGradient id="wire" gradientUnits="userSpaceOnUse" x1="500" y1="150" x2="500" y2="340">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.45" />
                </linearGradient>
              </defs>

              {terminals.map((tm, i) => {
                const d = `M500,165 C500,250 ${tm.cx},230 ${tm.cx},330`;
                return (
                  <g key={tm.n}>
                    <path id={`wire-${i}`} d={d} fill="none" stroke="url(#wire)" strokeWidth="2.5" strokeLinecap="round" />
                    {/* flowing data packet */}
                    <circle r="4.5" fill="#a5b4fc">
                      <animateMotion dur={`${1.8 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.5}s`}>
                        <mpath href={`#wire-${i}`} />
                      </animateMotion>
                      <animate attributeName="opacity" values="0;1;1;0" dur={`${1.8 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.5}s`} />
                    </circle>
                  </g>
                );
              })}
            </svg>

            {/* MASTER node */}
            <div className="absolute" style={{ left: "50%", top: "16%", transform: "translate(-50%, -50%)", zIndex: 10 }}>
              <div className="flex flex-col items-center">
                <span style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff",
                  fontSize: 10, fontWeight: 800, letterSpacing: 1, padding: "3px 12px", borderRadius: 999,
                  marginBottom: -7, zIndex: 2, boxShadow: "0 4px 12px rgba(99,102,241,0.45)",
                }}>{c.master}</span>
                <div style={{
                  width: 92, height: 78, borderRadius: 18,
                  background: "rgba(13,17,23,0.9)", border: "2px solid rgba(99,102,241,0.6)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 0 0 6px rgba(99,102,241,0.08), 0 0 40px rgba(99,102,241,0.35)",
                  animation: "serverGlow 2.6s ease-in-out infinite",
                }}>
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="1.6">
                    <ellipse cx="12" cy="5" rx="8" ry="3" />
                    <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
                    <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
                  </svg>
                </div>
                <div className="text-center" style={{ marginTop: 8 }}>
                  <div style={{ color: "#e6edf3", fontWeight: 800, fontSize: 13 }}>{c.server}</div>
                  <div style={{ color: "#6366f1", fontFamily: "monospace", fontSize: 11, marginTop: 1 }}>192.168.1.1</div>
                </div>
              </div>
            </div>

            {/* TERMINAL nodes */}
            {terminals.map((tm) => (
              <div key={tm.n} className="absolute" style={{
                left: `${(tm.cx / 1000) * 100}%`, top: "82%",
                transform: "translate(-50%, -50%)", zIndex: 10,
              }}>
                <div className="flex flex-col items-center">
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.4)",
                    color: "#a5b4fc", fontSize: 8.5, fontWeight: 800, letterSpacing: 0.8,
                    padding: "2px 8px", borderRadius: 999, marginBottom: -6, zIndex: 2,
                  }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12.55a11 11 0 0 1 14 0M8.5 16.1a6 6 0 0 1 7 0M12 20h.01" />
                    </svg>
                    {c.online}
                  </span>
                  <div style={{
                    width: 74, height: 64, borderRadius: 14,
                    background: "rgba(13,17,23,0.9)", border: "1px solid rgba(99,102,241,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                  }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8b949e" strokeWidth="1.6">
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <path d="M8 21h8M12 17v4" />
                    </svg>
                  </div>
                  <div className="text-center rounded-lg" style={{
                    marginTop: 8, padding: "5px 12px",
                    background: "rgba(22,27,34,0.6)", border: "1px solid #21262d",
                  }}>
                    <div style={{ color: "#e6edf3", fontWeight: 800, fontSize: 11, letterSpacing: 0.5 }}>{c.counter} {tm.n}</div>
                    <div style={{ color: "#6e7681", fontFamily: "monospace", fontSize: 9.5, marginTop: 1 }}>{tm.ip}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3, marginTop: 2, color: "#818cf8", fontSize: 9, fontWeight: 700 }}>
                      <svg width="10" height="8" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 8h4l3 6 4-12 3 6h7" />
                      </svg>
                      {tm.ping}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
