"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLang } from "@/lib/i18n";

const mockItems = [
  { name: "Polo Shirt",      cat: "Boutique",    price: 1200, qty: 1, icon: "👔" },
  { name: "Basmati Rice 5kg",cat: "Grocery",     price: 750,  qty: 1, icon: "🌾" },
  { name: "Chicken Biryani", cat: "Restaurant",  price: 350,  qty: 2, icon: "🍛" },
  { name: "Panadol 500mg",   cat: "Pharmacy",    price: 85,   qty: 1, icon: "💊" },
];

function playBeep() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(1046, ctx.currentTime);
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.12);
  } catch {}
}

function ProductCard({ item, qty, maxed, onAdd }: {
  item: typeof mockItems[0]; qty: number; maxed: boolean; onAdd: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => !maxed && onAdd()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={e => { if (!maxed) (e.currentTarget as HTMLDivElement).style.transform = "scale(0.94)"; }}
      onMouseUp={e => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1)"; }}
      style={{
        background: qty > 0 ? "rgba(99,102,241,0.08)" : "#161b22",
        border: `1px solid ${qty > 0 ? "rgba(99,102,241,0.4)" : hovered ? "rgba(99,102,241,0.45)" : "#21262d"}`,
        borderRadius: 8, padding: "7px 8px",
        display: "flex", flexDirection: "column", gap: 2,
        cursor: maxed ? "not-allowed" : "pointer",
        opacity: maxed ? 0.6 : 1,
        transition: "all 0.15s",
        boxShadow: hovered && !maxed ? "0 0 10px 3px rgba(99,102,241,0.25)" : "none",
        transform: "scale(1)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ fontSize: 17 }}>{item.icon}</div>
        {qty > 0 && (
          <div style={{
            background: "#6366f1", color: "#fff", borderRadius: "50%",
            width: 13, height: 13, fontSize: 7, fontWeight: 800,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>{qty}</div>
        )}
      </div>
      <div style={{ color: "#e6edf3", fontWeight: 600, fontSize: 8.5, lineHeight: 1.2 }}>{item.name}</div>
      <div style={{ color: "#484f58", fontSize: 7 }}>{item.cat}</div>
      <div style={{ color: "#818cf8", fontWeight: 700, fontSize: 9, marginTop: 2 }}>
        Rs. {item.price.toLocaleString()}
      </div>
    </div>
  );
}

function CatPill({ label, active, onClick }: { label: string; active: boolean; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "2.5px 7px", borderRadius: 20, fontSize: 7.5, fontWeight: 600,
        whiteSpace: "nowrap", cursor: "pointer", transition: "all 0.18s",
        background: active ? "#6366f1" : hovered ? "rgba(99,102,241,0.12)" : "transparent",
        color: active ? "#fff" : hovered ? "#a5b4fc" : "#8b949e",
        border: active ? "1px solid #6366f1" : hovered ? "1px solid rgba(99,102,241,0.5)" : "1px solid #30363d",
        boxShadow: hovered && !active ? "0 0 8px 2px rgba(99,102,241,0.3)" : "none",
        transform: hovered ? "scale(1.06)" : "scale(1)",
      }}
    >{label}</div>
  );
}

function PayBtn({ label, glow, active, onPay, children }: {
  label: string; glow: string; active: boolean; onPay: () => void; children: ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={active ? onPay : undefined}
      onMouseEnter={() => active && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff", borderRadius: 6, padding: "5px 3px 4px",
        textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5,
        cursor: active ? "pointer" : "default",
        opacity: active ? 1 : 0.45,
        transition: "box-shadow 0.18s, transform 0.12s, opacity 0.2s",
        boxShadow: hovered && active ? `0 0 10px 2px ${glow}, 0 2px 8px rgba(0,0,0,0.15)` : "none",
        transform: hovered && active ? "scale(1.06)" : "scale(1)",
      }}
    >
      {children}
      <span style={{ color: "#111", fontSize: 6.5, fontWeight: 800, letterSpacing: 0.2, fontFamily: "Arial,sans-serif" }}>{label}</span>
    </div>
  );
}

function playSuccess() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    [[523, 0], [659, 0.1], [784, 0.2], [1047, 0.32]].forEach(([freq, when]) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = "sine"; osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.15, ctx.currentTime + when);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + when + 0.18);
      osc.start(ctx.currentTime + when);
      osc.stop(ctx.currentTime + when + 0.18);
    });
  } catch {}
}

function PosMockup() {
  const [qtys, setQtys] = useState<number[]>([0, 0, 0, 0]);
  const [paid, setPaid] = useState(false);
  const [activeCat, setActiveCat] = useState("All");

  const visibleItems = activeCat === "All"
    ? mockItems
    : mockItems.filter(item => item.cat === activeCat);

  function handleAdd(i: number) {
    playBeep();
    setQtys(prev => prev.map((q, idx) => idx === i ? Math.min(q + 1, 4) : q));
  }

  function handlePay() {
    if (cartItems.length === 0) return;
    playSuccess();
    setPaid(true);
    setTimeout(() => { setPaid(false); setQtys([0, 0, 0, 0]); }, 2200);
  }

  const cartItems = mockItems.map((item, i) => ({ ...item, qty: qtys[i] })).filter(item => item.qty > 0);
  const cartTotal = cartItems.reduce((s, item) => s + item.price * item.qty, 0);

  return (
    <div style={{ width: "100%", maxWidth: 780, margin: "0 auto" }}>
      <div style={{
        background: "linear-gradient(160deg, #dde0e6 0%, #c8ccd4 100%)",
        borderRadius: 22,
        padding: 12,
        boxShadow: "0 0 0 1px rgba(0,0,0,0.18), 0 40px 100px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.5)",
      }}>
        {/* Screen */}
        <div style={{ background: "#080c12", borderRadius: 12, overflow: "hidden", aspectRatio: "16 / 9.4", position: "relative" }}>

          {/* Payment success overlay */}
          {paid && (
            <div style={{
              position: "absolute", inset: 0, zIndex: 50,
              background: "rgba(8,12,18,0.92)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
              animation: "fadeInOverlay 0.25s ease",
              backdropFilter: "blur(3px)",
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "linear-gradient(135deg, #10b981, #34d399)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 30px rgba(16,185,129,0.5)",
                animation: "popIn 0.3s cubic-bezier(0.34,1.56,0.64,1)",
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div style={{ color: "#34d399", fontSize: 11, fontWeight: 800, letterSpacing: 0.5, animation: "fadeUp 0.3s 0.1s both ease" }}>
                Payment Successful
              </div>
              <div style={{ color: "#22c55e", fontSize: 14, fontWeight: 900, animation: "fadeUp 0.3s 0.18s both ease" }}>
                Rs. {cartTotal.toLocaleString()}
              </div>
              <div style={{ color: "#484f58", fontSize: 7.5, animation: "fadeUp 0.3s 0.26s both ease" }}>
                Thank you! Receipt printed.
              </div>
            </div>
          )}

          {/* Glossy screen reflection */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 40, pointerEvents: "none",
            background: "linear-gradient(125deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 16%, rgba(255,255,255,0) 82%, rgba(255,255,255,0.04) 100%)",
          }} />

          <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

            {/* OS Title bar */}
            <div style={{
              background: "#0d1117", borderBottom: "1px solid #21262d",
              padding: "5px 10px", display: "flex", alignItems: "center", gap: 7, flexShrink: 0,
            }}>
              <div style={{ display: "flex", gap: 5 }}>
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#ff5f57" }} />
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#febc2e" }} />
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#28c840" }} />
              </div>
              <div style={{ flex: 1, textAlign: "center", color: "#8b949e", fontSize: 9, fontWeight: 600 }}>
                <span style={{ color: "#6366f1", fontWeight: 800 }}>Posify</span> POS
              </div>
              <div style={{ width: 38, textAlign: "right", color: "#484f58", fontSize: 8 }}>02:37 AM</div>
            </div>

            {/* App body */}
            <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

              {/* Sidebar */}
              <div style={{
                width: 52, background: "#0d1117", borderRight: "1px solid #21262d",
                display: "flex", flexDirection: "column", alignItems: "center",
                padding: "10px 0", gap: 5, flexShrink: 0,
              }}>
                <div style={{
                  width: 28, height: 28,
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, color: "#fff", fontSize: 13, marginBottom: 7,
                  boxShadow: "0 3px 10px rgba(99,102,241,0.4)",
                }}>P</div>
                {[
                  { icon: "🛒", active: true },
                  { icon: "📊", active: false },
                  { icon: "📦", active: false },
                  { icon: "👥", active: false },
                  { icon: "📋", active: false },
                  { icon: "⚙️", active: false },
                ].map((n, idx) => (
                  <div key={idx} style={{
                    width: 34, height: 34, borderRadius: 7, fontSize: 14,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: n.active ? "rgba(99,102,241,0.18)" : "transparent",
                    boxShadow: n.active ? "inset 0 0 0 1px rgba(99,102,241,0.3)" : "none",
                  }}>{n.icon}</div>
                ))}
              </div>

              {/* Center content */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "#0d1117" }}>

                {/* App header */}
                <div style={{
                  padding: "6px 10px", borderBottom: "1px solid #21262d",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <span style={{ color: "#e6edf3", fontWeight: 700, fontSize: 10.5 }}>Point of Sale</span>
                  <span style={{ color: "#484f58", fontSize: 8, marginLeft: "auto" }}>Cashier: Hassan</span>
                </div>

                {/* Category pills */}
                <div style={{
                  padding: "5px 8px", borderBottom: "1px solid #21262d",
                  display: "flex", gap: 4, flexShrink: 0, overflow: "hidden",
                }}>
                  {["All", "Boutique", "Grocery", "Restaurant", "Pharmacy"].map((c) => (
                    <CatPill key={c} label={c} active={activeCat === c} onClick={() => setActiveCat(c)} />
                  ))}
                </div>

                {/* Search */}
                <div style={{ padding: "5px 8px", borderBottom: "1px solid #21262d" }}>
                  <div style={{
                    background: "#161b22", border: "1px solid #30363d", borderRadius: 6,
                    padding: "3px 8px", color: "#484f58", fontSize: 8,
                    display: "flex", alignItems: "center", gap: 4,
                  }}>🔍 Search products or barcode...</div>
                </div>

                {/* Tap hint */}
                <div style={{ padding: "3px 8px 0", display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 3,
                    background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)",
                    borderRadius: 20, padding: "2px 7px",
                    animation: "tapPulse 2s ease-in-out infinite",
                  }}>
                    <svg width="7" height="9" viewBox="0 0 7 9" fill="none">
                      <path d="M3.5 1v3.5M1 3l2.5 2.5L6 3" stroke="#818cf8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ color: "#818cf8", fontSize: 6.5, fontWeight: 700, letterSpacing: 0.4 }}>TAP TO ADD</span>
                  </div>
                </div>

                {/* Product grid 2×2 */}
                <div style={{
                  flex: 1, padding: "6px 8px",
                  display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, overflow: "hidden",
                }}>
                  {visibleItems.map((item) => {
                    const i = mockItems.indexOf(item);
                    const qty = qtys[i];
                    const maxed = qty >= 4;
                    return <ProductCard key={i} item={item} qty={qty} maxed={maxed} onAdd={() => handleAdd(i)} />;
                  })}
                </div>
              </div>

              {/* Right cart panel */}
              <div style={{
                width: 158, background: "#0b0f17", borderLeft: "1px solid #21262d",
                display: "flex", flexDirection: "column", flexShrink: 0,
              }}>
                <div style={{
                  padding: "6px 10px", borderBottom: "1px solid #21262d",
                  color: "#e6edf3", fontWeight: 700, fontSize: 10,
                }}>Order</div>

                {/* Cart items */}
                <div style={{ flex: 1, overflow: "hidden", padding: "3px 0" }}>
                  {cartItems.length === 0 ? (
                    <div style={{ padding: "14px 10px", textAlign: "center", color: "#30363d", fontSize: 7.5 }}>
                      Tap products to add
                    </div>
                  ) : cartItems.map((item, i) => (
                    <div key={i} style={{
                      padding: "4px 9px", display: "flex", alignItems: "center", gap: 5,
                      borderBottom: "1px solid rgba(33,38,45,0.6)",
                      animation: "cartSlideIn 0.18s ease",
                    }}>
                      <span style={{ fontSize: 11 }}>{item.icon}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ color: "#c9d1d9", fontSize: 7.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</div>
                        <div style={{ color: "#484f58", fontSize: 7 }}>×{item.qty}</div>
                      </div>
                      <div style={{ color: "#e6edf3", fontSize: 7.5, fontWeight: 700 }}>
                        Rs.{(item.price * item.qty).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer search */}
                <div style={{ padding: "4px 8px", borderTop: "1px solid #21262d" }}>
                  <div style={{
                    background: "#161b22", border: "1px solid #30363d", borderRadius: 5,
                    padding: "3px 7px", color: "#484f58", fontSize: 7.5,
                  }}>Search by name or phone...</div>
                </div>

                {/* Total */}
                <div style={{
                  padding: "5px 10px", borderTop: "1px solid #21262d",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <span style={{ color: "#8b949e", fontSize: 7.5, letterSpacing: 0.5 }}>TOTAL</span>
                  <span style={{ color: "#f97316", fontWeight: 900, fontSize: 13 }}>
                    Rs. {cartTotal.toLocaleString()}
                  </span>
                </div>

                {/* Payment buttons 2×2 */}
                <div style={{ padding: "4px 7px 8px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                  {[
                    { label: "Cash",       glow: "rgba(22,163,74,0.5)",   content: (
                      <svg width="30" height="20" viewBox="0 0 60 40" fill="none">
                        <rect x="3" y="7" width="54" height="26" rx="3.5" fill="#16a34a"/>
                        <rect x="6" y="10" width="48" height="20" rx="2" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" fill="none"/>
                        <circle cx="13" cy="20" r="5" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8"/>
                        <circle cx="47" cy="20" r="5" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8"/>
                        <ellipse cx="30" cy="20" rx="9" ry="7" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8"/>
                        <text x="26.5" y="24" fontSize="9" fontWeight="900" fill="white" fontFamily="Arial,sans-serif">₨</text>
                      </svg>
                    )},
                    { label: "Debit Card", glow: "rgba(59,130,246,0.5)",  content: (
                      <svg width="30" height="20" viewBox="0 0 60 40" fill="none">
                        <rect x="4" y="6" width="52" height="28" rx="4" fill="#3b82f6"/>
                        <rect x="4" y="13" width="52" height="7" fill="#1e3a5f"/>
                        <rect x="10" y="22" width="10" height="7" rx="1.5" fill="#facc15" opacity="0.9"/>
                        <line x1="15" y1="22" x2="15" y2="29" stroke="#b45309" strokeWidth="0.8"/>
                        <line x1="10" y1="25.5" x2="20" y2="25.5" stroke="#b45309" strokeWidth="0.8"/>
                        <circle cx="28" cy="26" r="1.2" fill="rgba(255,255,255,0.6)"/>
                        <circle cx="32" cy="26" r="1.2" fill="rgba(255,255,255,0.6)"/>
                        <circle cx="36" cy="26" r="1.2" fill="rgba(255,255,255,0.6)"/>
                        <circle cx="40" cy="26" r="1.2" fill="rgba(255,255,255,0.6)"/>
                        <circle cx="44" cy="26" r="1.2" fill="rgba(255,255,255,0.6)"/>
                      </svg>
                    )},
                    { label: "JazzCash",   glow: "rgba(212,25,32,0.45)",  content: (
                      <svg width="30" height="20" viewBox="0 0 60 40" fill="none">
                        <defs><mask id="jcMask"><rect width="60" height="40" fill="white"/><circle cx="38" cy="20" r="15" fill="black"/></mask></defs>
                        <circle cx="24" cy="20" r="15" fill="#F4A81D" mask="url(#jcMask)"/>
                        <circle cx="38" cy="20" r="15" fill="#D41920"/>
                      </svg>
                    )},
                    { label: "easypaisa", glow: "rgba(34,197,94,0.45)",   content: (
                      <svg width="22" height="20" viewBox="0 0 44 40" fill="none">
                        <path d="M33 19C33 19 11 19 11 19C11 13.5 15.5 9 22 9C28.5 9 33 13.5 33 19C33 24.5 28.5 29 22 29C17 29 13 26 11.5 22" stroke="#1a1a2e" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
                        <path d="M6 35 Q22 43 38 35" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                      </svg>
                    )},
                  ].map(({ label, glow, content }) => (
                    <PayBtn key={label} label={label} glow={glow} active={cartItems.length > 0} onPay={handlePay}>
                      {content}
                    </PayBtn>
                  ))}
                </div>
              </div>

            </div>{/* end app body */}
          </div>
        </div>
      </div>

      {/* Monitor stand */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
        <div style={{
          width: 70, height: 28,
          background: "linear-gradient(180deg, #c5c9d0, #b0b4bc)",
          clipPath: "polygon(18% 0, 82% 0, 100% 100%, 0% 100%)",
        }} />
        <div style={{
          width: 180, height: 11, borderRadius: "0 0 6px 6px",
          background: "linear-gradient(180deg, #b0b4bc, #9fa3aa)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }} />
        {/* Glowing floor puddle */}
        <div style={{
          width: 320, height: 36, marginTop: 4,
          background: "radial-gradient(ellipse at center, rgba(99,102,241,0.28) 0%, rgba(99,102,241,0.08) 40%, transparent 72%)",
          filter: "blur(6px)", pointerEvents: "none",
        }} />
      </div>
    </div>
  );
}

export default function Hero() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) (e.target as HTMLElement).classList.add("visible");
      }),
      { threshold: 0.05 }
    );
    el.querySelectorAll(".fade-up").forEach((node) => obs.observe(node));
    return () => obs.disconnect();
  }, [t]);

  return (
    <section
      ref={ref}
      className="relative pt-20 pb-10 overflow-hidden bg-grid"
      style={{ background: "var(--dark-bg)" }}
    >
      {/* Glow behind monitor */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(99,102,241,0.14) 0%, transparent 70%)" }} />
      <div className="absolute top-0 right-0 w-[350px] h-[350px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">

          {/* LEFT — text content */}
          <div className="flex-1 min-w-0 text-center lg:text-left">

            {/* Badge */}
            <div className="fade-up flex justify-center lg:justify-start mb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium">
                {t.hero.badge}
              </div>
            </div>

            {/* Headline */}
            <h1 className="fade-up delay-1 text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight text-[#e6edf3] mb-4">
              {t.hero.titleA}{" "}
              <span className="gradient-text">{t.hero.titleHi}</span>
              <br />
              {t.hero.titleB}{" "}
              <span className="gradient-text-em">{t.hero.titleEm}</span>
            </h1>

            <p className="fade-up delay-2 text-base sm:text-lg text-[#8b949e] mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0">
              {t.hero.subtitle}{" "}
              <strong className="text-[#e6edf3]">{t.hero.price}</strong>.
            </p>

            {/* CTAs */}
            <div className="fade-up delay-3 flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-10">
              <a href="#contact" className="px-7 py-3.5 rounded-xl btn-shimmer font-semibold text-sm">
                {t.hero.ctaPrimary}
              </a>
              <a href="#features"
                className="px-7 py-3.5 rounded-xl border border-[#30363d] hover:border-indigo-500/50 text-[#e6edf3] font-semibold text-sm transition-all">
                {t.hero.ctaSecondary} →
              </a>
            </div>

            {/* Stats */}
            <div className="fade-up delay-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3">
              {t.hero.stats.map((s) => (
                <div key={s.label} className="stat-card text-center p-3 rounded-xl border border-[#21262d] relative overflow-hidden">
                  <div className="text-lg font-bold text-indigo-400 tabular-nums">
                    {s.value}
                  </div>
                  <div className="text-xs text-[#8b949e] mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — monitor mockup with floating accents */}
          <div className="fade-up delay-2 w-full lg:w-[55%] xl:w-[58%] shrink-0 relative" dir="ltr">

            {/* Soft glow ring behind monitor */}
            <div className="absolute pointer-events-none" style={{
              inset: "-8% -6%", zIndex: 0,
              background: "radial-gradient(ellipse at 50% 42%, rgba(99,102,241,0.22) 0%, rgba(139,92,246,0.10) 38%, transparent 68%)",
              filter: "blur(18px)",
            }} />

            {/* Monitor */}
            <div className="relative" style={{ zIndex: 10, animation: "monitorFloat 4s ease-in-out infinite" }}>
              <PosMockup />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
