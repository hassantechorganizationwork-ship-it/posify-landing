"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { fireLiveEvent } from "@/components/LiveActivity";
import { waLink } from "@/lib/contact";

const avatarColors = ["#6366f1", "#8b5cf6", "#10b981", "#f59e0b", "#ec4899"];

type Review = {
  name: string;
  city: string;
  text: string;
  rating: number;
  time: string;
};

const STORAGE_KEY = "posify-reviews";

export default function Testimonials() {
  const { t, dir } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setReviews(JSON.parse(saved) as Review[]);
    } catch {}
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) (e.target as HTMLElement).classList.add("visible"); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".fade-up").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [t]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    const newReview: Review = {
      name: name.trim(),
      city: city.trim(),
      text: text.trim(),
      rating,
      time: new Date().toLocaleDateString("en-PK", { year: "numeric", month: "short", day: "numeric" }),
    };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
    fireLiveEvent(city.trim() || "Pakistan", "review");
    setName(""); setCity(""); setText(""); setRating(5); setHoverRating(0);
    setShowForm(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  const waReviewLink = waLink("Posify ke baare mein mera review dena chahta hoon!");

  return (
    <section ref={ref} className="py-24 bg-grid" style={{ background: "var(--dark-bg)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="fade-up inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-4">
            {t.testimonials.badge}
          </div>
          <h2 className="fade-up delay-1 text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-3">
            {t.testimonials.title}
          </h2>
          <p className="fade-up delay-2 text-[#8b949e] max-w-lg mx-auto mb-6">
            {t.testimonials.subtitle}
          </p>

          {/* Submit Review button */}
          <div className="fade-up delay-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setShowForm((v) => !v)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
              </svg>
              {t.testimonials.writeBtn}
            </button>
            <a
              href={waReviewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t.testimonials.waBtn}
            </a>
          </div>
        </div>

        {/* Success toast */}
        {submitted && (
          <div className="mb-6 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-medium">
              ✓ {t.testimonials.thanks}
            </span>
          </div>
        )}

        {/* Inline review form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-10 rounded-2xl border border-indigo-500/30 p-6"
            style={{ background: "var(--dark-surface)" }}
          >
            <h3 className="font-bold text-[#e6edf3] text-base mb-5">{t.testimonials.formTitle}</h3>

            {/* Star rating */}
            <div className="mb-4" dir="ltr">
              <label className="block text-xs text-[#8b949e] mb-2">{t.testimonials.ratingLabel}</label>
              <div className="flex gap-1">
                {[1,2,3,4,5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="text-2xl transition-transform hover:scale-110"
                  >
                    <span className={(hoverRating || rating) >= star ? "text-yellow-400" : "text-[#30363d]"}>★</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs text-[#8b949e] mb-1">{t.testimonials.namePlaceholder} *</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-[#30363d] bg-[#0f1117] text-[#e6edf3] text-sm placeholder-[#484f58] focus:outline-none focus:border-indigo-500/60 transition-colors"
                  placeholder={t.testimonials.namePlaceholder}
                />
              </div>
              <div>
                <label className="block text-xs text-[#8b949e] mb-1">{t.testimonials.cityPlaceholder}</label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#30363d] bg-[#0f1117] text-[#e6edf3] text-sm placeholder-[#484f58] focus:outline-none focus:border-indigo-500/60 transition-colors"
                  placeholder={t.testimonials.cityPlaceholder}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs text-[#8b949e] mb-1">{t.testimonials.reviewLabel} *</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-[#30363d] bg-[#0f1117] text-[#e6edf3] text-sm placeholder-[#484f58] focus:outline-none focus:border-indigo-500/60 transition-colors resize-none"
                placeholder={t.testimonials.reviewPlaceholder}
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold transition-colors"
              >
                {t.testimonials.submitBtn}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2 rounded-lg border border-[#30363d] hover:border-[#484f58] text-[#8b949e] text-sm transition-colors"
              >
                {t.testimonials.cancelBtn}
              </button>
            </div>
          </form>
        )}

        {/* Reviews grid */}
        {reviews.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="fade-up card-hover rounded-2xl p-6 border border-[#21262d]"
                style={{ background: "var(--dark-surface)" }}
              >
                <div className="flex gap-0.5 mb-3" dir="ltr">
                  {Array(5).fill(0).map((_, j) => (
                    <span key={j} className={`text-sm ${j < r.rating ? "text-yellow-400" : "text-[#30363d]"}`}>★</span>
                  ))}
                </div>
                <p className="text-sm text-[#8b949e] leading-relaxed mb-5">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: avatarColors[i % avatarColors.length] }}
                    dir="ltr"
                  >
                    {r.name.charAt(0).toUpperCase()}
                  </div>
                  <div className={dir === "rtl" ? "text-right" : ""}>
                    <div className="text-sm font-semibold text-[#e6edf3]">{r.name}</div>
                    <div className="text-xs text-[#8b949e]">{r.city && `${r.city} · `}{r.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="fade-up text-center py-16 rounded-2xl border border-dashed border-[#30363d]" style={{ background: "var(--dark-surface)" }}>
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-lg font-semibold text-[#e6edf3] mb-2">{t.testimonials.emptyTitle}</h3>
            <p className="text-sm text-[#8b949e] max-w-sm mx-auto">{t.testimonials.emptyDesc}</p>
          </div>
        )}
      </div>
    </section>
  );
}
