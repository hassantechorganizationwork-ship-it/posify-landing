import Link from "next/link";
import { cities, businesses } from "@/lib/seo-data";

// Internal-linking section on the homepage — passes link equity from the
// site's highest-authority page to every city & business landing page.
export default function CitiesSeo() {
  return (
    <section className="py-20" style={{ background: "var(--dark-surface)" }} dir="ltr">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-4">
            🇵🇰 All Over Pakistan
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#e6edf3] mb-2">
            POS Software in Every Major City
          </h2>
          <p className="text-[#8b949e] max-w-xl mx-auto">
            Restaurants, grocery stores, boutiques and pharmacies across Pakistan run on Posify. Find POS software for your city.
          </p>
        </div>

        {/* City links */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {cities.map((c) => (
            <Link
              key={c.slug}
              href={`/pos-software/${c.slug}`}
              className="px-4 py-2 rounded-full text-sm font-medium text-[#c9d1d9] border border-[#21262d] hover:border-indigo-500/50 hover:text-indigo-400 transition-all"
              style={{ background: "var(--dark-bg)" }}
            >
              POS Software in {c.name}
            </Link>
          ))}
        </div>

        {/* Business links */}
        <div className="flex flex-wrap justify-center gap-2">
          {businesses.map((b) => (
            <Link
              key={b.slug}
              href={`/pos-software-for/${b.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-[#c9d1d9] border border-indigo-500/20 hover:border-indigo-500/50 hover:text-indigo-400 transition-all"
              style={{ background: "var(--dark-bg)" }}
            >
              <span>{b.icon}</span> {b.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
