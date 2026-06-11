"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

export type LiveEvent = {
  city: string;
  type: "demo" | "review" | "signup";
  ts: number;
};

// Called from CTA / Review form when a real action happens
export function fireLiveEvent(city: string, type: LiveEvent["type"] = "demo") {
  if (typeof window === "undefined") return;
  const ev: LiveEvent = { city, type, ts: Date.now() };
  localStorage.setItem("posify-live-event", JSON.stringify(ev));
  window.dispatchEvent(new CustomEvent("posify-live", { detail: ev }));
}

const typeEmoji: Record<string, string> = {
  demo: "🚀",
  review: "⭐",
  signup: "🎉",
};

export default function LiveActivity() {
  const { lang } = useLang();
  const [event, setEvent] = useState<LiveEvent | null>(null);
  const [visible, setVisible] = useState(false);

  const show = (ev: LiveEvent) => {
    setEvent(ev);
    setVisible(true);
    setTimeout(() => setVisible(false), 6000);
  };

  useEffect(() => {
    const handler = (e: Event) => {
      show((e as CustomEvent<LiveEvent>).detail);
    };
    window.addEventListener("posify-live", handler);

    // Show last event from localStorage on mount if it's recent (< 30s)
    try {
      const stored = localStorage.getItem("posify-live-event");
      if (stored) {
        const ev: LiveEvent = JSON.parse(stored);
        if (Date.now() - ev.ts < 30_000) show(ev);
      }
    } catch {}

    return () => window.removeEventListener("posify-live", handler);
  }, []);

  if (!event) return null;

  const label =
    lang === "ur"
      ? `${event.city} سے نئی درخواست`
      : lang === "roman"
      ? `${event.city} se naya request`
      : `Demo requested from ${event.city}`;

  const sub =
    event.type === "review"
      ? lang === "ur"
        ? "نیا ریویو پوسٹ ہوا"
        : lang === "roman"
        ? "Naya review post hua"
        : "New review posted"
      : lang === "ur"
      ? "ابھی Posify join کیا"
      : lang === "roman"
      ? "Abhi Posify join kiya"
      : "Just joined Posify";

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-[#21262d] shadow-2xl max-w-[260px]"
        style={{ background: "var(--dark-surface)" }}
      >
        <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center text-lg shrink-0">
          {typeEmoji[event.type]}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-[#e6edf3] truncate">{label}</p>
          <p className="text-[11px] text-[#8b949e]">{sub}</p>
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 dot-pulse" />
      </div>
    </div>
  );
}
