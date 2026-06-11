"use client";

import { useLang } from "@/lib/i18n";

const items = [
  { icon: "⚡", text: "Offline First" },
  { icon: "🧾", text: "FBR Compliant" },
  { icon: "🍽️", text: "Restaurant Mode" },
  { icon: "🛒", text: "Grocery & Mart" },
  { icon: "👗", text: "Boutique & Retail" },
  { icon: "💊", text: "Pharmacy Mode" },
  { icon: "📊", text: "Smart Reports" },
  { icon: "💰", text: "Rs. 2,000/month" },
  { icon: "🔒", text: "Data on Your Device" },
  { icon: "🇵🇰", text: "Made for Pakistan" },
  { icon: "📱", text: "WhatsApp Support" },
  { icon: "🚀", text: "Setup in 15 Minutes" },
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div
      className="relative py-4 overflow-hidden border-y border-[#21262d]"
      style={{ background: "var(--dark-surface)" }}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--dark-surface), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--dark-surface), transparent)" }} />

      <div className="marquee-track flex gap-8 w-max">
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#21262d] bg-[#0f1117] whitespace-nowrap text-sm text-[#8b949e] shrink-0"
          >
            <span>{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
