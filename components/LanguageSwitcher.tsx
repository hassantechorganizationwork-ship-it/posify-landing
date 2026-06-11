"use client";

import { useState, useRef, useEffect } from "react";
import { useLang, LANGS, type Lang } from "@/lib/i18n";

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = LANGS.find((l) => l.code === lang)!;

  const pick = (code: Lang) => {
    setLang(code);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 rounded-lg border border-[#30363d] hover:border-indigo-500/50 text-[#e6edf3] transition-all ${
          compact ? "px-3 py-2 text-sm w-full justify-between" : "px-3 py-1.5 text-xs"
        }`}
        aria-label="Change language"
      >
        <span className="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
          </svg>
          {current.native}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          className={`absolute mt-2 w-44 rounded-xl border border-[#21262d] shadow-2xl overflow-hidden z-50 ${
            compact ? "left-0" : "right-0"
          }`}
          style={{ background: "var(--dark-surface)" }}
        >
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => pick(l.code)}
              dir={l.code === "ur" ? "rtl" : "ltr"}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                lang === l.code
                  ? "bg-indigo-500/15 text-indigo-300"
                  : "text-[#8b949e] hover:bg-[#21262d] hover:text-[#e6edf3]"
              }`}
            >
              <span className="text-base">{l.flag}</span>
              <span className="flex-1 text-left">{l.native}</span>
              {lang === l.code && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
