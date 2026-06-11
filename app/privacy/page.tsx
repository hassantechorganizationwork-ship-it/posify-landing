import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Posify POS",
  description: "How Posify POS collects, uses, and protects your business data.",
};

const sections = [
  {
    h: "1. Introduction",
    p: "Posify (\"we\", \"our\", \"us\") provides point-of-sale software for businesses in Pakistan. This Privacy Policy explains what information we collect, how we use it, and the choices you have. By using Posify POS or our website, you agree to this policy.",
  },
  {
    h: "2. Data We Collect",
    list: [
      "Account details — your name, business name, email, and phone number when you request a demo or sign up.",
      "Business data — products, sales, inventory, customers, and reports you enter into the app. This is stored locally on your own computer (offline-first), not on our servers.",
      "Support messages — anything you send us over WhatsApp, email, or our contact form.",
    ],
  },
  {
    h: "3. How We Use Your Data",
    list: [
      "To set up, deliver, and support your Posify POS installation.",
      "To respond to your demo requests, questions, and support tickets.",
      "To send you important updates about your plan, billing, or the software.",
    ],
  },
  {
    h: "4. Local & Offline Storage",
    p: "Posify is offline-first. Your sales, inventory, and customer records live in a local database on your own device. We do not upload or read this business data unless you explicitly share it with us for support purposes.",
  },
  {
    h: "5. Data Sharing",
    p: "We do not sell your data. We only share information where required by law, or with trusted service providers (such as FBR integration) strictly to deliver features you have enabled.",
  },
  {
    h: "6. FBR Compliance",
    p: "If you enable FBR integration, invoice data required for tax compliance is transmitted to the FBR system as mandated by Pakistani law. This is done only for invoices you choose to submit.",
  },
  {
    h: "7. Security",
    p: "We use reasonable technical and organizational measures to protect your information. However, keeping your own device, backups, and login credentials secure is your responsibility.",
  },
  {
    h: "8. Your Rights",
    p: "You can request access to, correction of, or deletion of the personal information we hold about you by contacting us. Since most business data stays on your device, you remain in full control of it.",
  },
  {
    h: "9. Changes to This Policy",
    p: "We may update this policy from time to time. The latest version will always be available on this page with the updated date below.",
  },
  {
    h: "10. Contact Us",
    p: "Questions about your privacy? Reach us on WhatsApp at 0317-4065200 or email info@posify.pk.",
  },
];

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen py-16 px-4 sm:px-6" style={{ background: "var(--dark-bg)" }}>
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors mb-8">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-base font-black">P</span>
          <span className="text-xl font-bold text-[#e6edf3]">Posify</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#e6edf3] mb-2">Privacy Policy</h1>
        <p className="text-sm text-[#6e7681] mb-10">Last updated: June 2026</p>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-lg font-bold text-[#e6edf3] mb-2">{s.h}</h2>
              {s.p && <p className="text-[15px] text-[#8b949e] leading-relaxed">{s.p}</p>}
              {s.list && (
                <ul className="mt-2 space-y-2">
                  {s.list.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] text-[#8b949e] leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 pt-6 border-t border-[#21262d] text-xs text-[#6e7681]">
          © 2026 Posify. All rights reserved.
        </div>
      </div>
    </main>
  );
}
