"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "roman" | "ur";

export const LANGS: { code: Lang; label: string; native: string; flag: string }[] = [
  { code: "en", label: "English", native: "English", flag: "🇬🇧" },
  { code: "roman", label: "Roman Urdu", native: "Roman Urdu", flag: "🇵🇰" },
  { code: "ur", label: "Urdu", native: "اردو", flag: "🇵🇰" },
];

/* ------------------------------------------------------------------ */
/*  Dictionary — `en` is the source of truth (default language).       */
/* ------------------------------------------------------------------ */

const en = {
  nav: {
    features: "Features",
    why: "Why Posify",
    pricing: "Pricing",
    faq: "FAQ",
    contact: "Contact",
    demo: "Free Demo",
    language: "Language",
  },

  hero: {
    badge: "🇵🇰 Built for Pakistan",
    titleA: "Pakistan's",
    titleHi: "Smartest",
    titleB: "Point of Sale",
    titleEm: "System",
    subtitle:
      "Restaurant, Grocery, Boutique, Pharmacy — one solution for every business. FBR compliant, offline-first, and starting at just",
    price: "Rs. 2,000/month",
    ctaPrimary: "Start Free Demo",
    ctaSecondary: "Explore Features",
    stats: [
      { value: "4", label: "Business Types" },
      { value: "FBR", label: "Compliant" },
      { value: "3", label: "Languages" },
      { value: "100%", label: "Offline First" },
    ],
    mockTitle: "Posify POS — Restaurant Mode",
    cart: "Cart",
    total: "Total",
    pay: "Pay Now",
    shift: "Shift Active",
    table: "Table 4 — Dine In",
    scroll: "Scroll",
  },

  features: {
    badge: "Business Types",
    title: "One App, Every Business",
    subtitle:
      "Four specialised modes built into one app. Pick your business type and everything else configures itself.",
    cards: [
      {
        icon: "🍽️",
        title: "Restaurant & Café",
        tagline: "Dine-in, takeaway & delivery — handled.",
        items: [
          "Visual table floor plan",
          "Kitchen Display System (KDS)",
          "Dine-in / Takeaway / Delivery",
          "Split & merge bills",
          "Table-wise order tracking",
          "Live chef order queue",
        ],
      },
      {
        icon: "🛒",
        title: "Grocery / Mart",
        tagline: "Scan, bill, done — in seconds.",
        items: [
          "Lightning-fast barcode scan",
          "Bundle & promo offers",
          "Weight-based billing",
          "One-click FBR invoicing",
          "Bulk & tiered discounts",
          "Low-stock alerts",
        ],
      },
      {
        icon: "👗",
        title: "Boutique & Retail",
        tagline: "Every size, every colour, tracked.",
        items: [
          "Size × Colour variant matrix",
          "Per-variant stock tracking",
          "Alteration notes per order",
          "Exchange & return flow",
          "On-screen size guide",
          "Variant-level barcodes",
        ],
      },
      {
        icon: "💊",
        title: "Pharmacy",
        tagline: "Compliant, safe & expiry-aware.",
        items: [
          "Batch & expiry tracking",
          "FIFO batch deduction",
          "Prescription alerts",
          "Rack location system",
          "Near-expiry discounts",
          "Controlled-medicine alerts",
        ],
      },
    ],
  },

  why: {
    badge: "Why Posify",
    title: "More Than a POS",
    subtitle: "Not just a cash register — a complete digital partner for your business.",
    cards: [
      {
        icon: "✅",
        title: "FBR Integrated",
        desc: "Real-time FBR invoice submission with automatic USIN generation. Stay compliant without the headache.",
      },
      {
        icon: "⚡",
        title: "Offline First",
        desc: "No internet? No problem. Keep selling and your data syncs automatically the moment you reconnect.",
      },
      {
        icon: "🔒",
        title: "Private & Secure",
        desc: "Your data lives on your device — not on someone else's cloud. No leaks, no third parties, full control.",
      },
      {
        icon: "📊",
        title: "Smart Reports",
        desc: "Daily, weekly and monthly insights. Export to Excel or PDF in a single click and know your numbers.",
      },
      {
        icon: "💰",
        title: "Honestly Affordable",
        desc: "Plans from Rs. 2,000/month with zero hidden charges. Your first month is completely free.",
      },
      {
        icon: "🇵🇰",
        title: "Made for Pakistan",
        desc: "Urdu support, JazzCash, Easypaisa, cash and FBR — built around how Pakistani businesses actually work.",
      },
    ],
  },

  how: {
    badge: "Process",
    title: "Getting Started Is Easy",
    subtitle: "Three simple steps and you're up and running.",
    steps: [
      {
        icon: "💬",
        title: "Request a Demo",
        desc: "Reach out on WhatsApp or via the form. We reply within 5 minutes during business hours.",
      },
      {
        icon: "⚙️",
        title: "We Set It Up",
        desc: "Our team configures your full system in 15 minutes. Zero technical knowledge required from you.",
      },
      {
        icon: "🚀",
        title: "Start Selling",
        desc: "Go live on day one. Every sale, every invoice, every report — all in one place.",
      },
    ],
  },

  pricing: {
    badge: "Pricing",
    title: "Simple, Honest Pricing",
    subtitle: "No hidden charges. No contracts. Cancel anytime.",
    perMonth: "/month",
    popular: "Most Popular",
    billed: "Billed monthly — cancel anytime",
    cta: "Start Free Trial",
    ctaEnterprise: "Talk to Sales",
    firstFree: "7-day free trial on all plans",
    riskFree: "— no credit card required",
    trialBadge: "7 Days Free",
    comingSoon: "Coming Soon",
    monthly: "Monthly",
    annual: "Annual",
    save: "Save",
    plans: [
      {
        name: "Solo",
        tag: "💻",
        price: "Rs. 2,000",
        priceNote: "/month",
        blurb: "One computer. One owner. Full power.",
        cta: "Start Free Trial",
        highlight: false,
        comingSoon: false,
        perks: [
          "Single computer setup",
          "All 4 business types",
          "Unlimited sales & invoices",
          "Barcode & receipt printing",
          "FBR integration",
          "Daily & monthly reports",
          "WhatsApp support",
        ],
      },
      {
        name: "Business",
        tag: "🚀",
        price: "Rs. 3,500",
        priceNote: "/month",
        blurb: "Bigger shop, more staff — fully managed.",
        cta: "Start Free Trial",
        highlight: true,
        comingSoon: true,
        perks: [
          "Everything in Solo",
          "Up to 3 computers",
          "Multi-user with roles & PIN override",
          "Manager approval system",
          "Advanced reports + Excel/PDF export",
          "Backup & restore",
          "Priority WhatsApp support",
          "Free updates forever",
        ],
      },
      {
        name: "Warehouse",
        tag: "🏭",
        price: "Rs. 8,000",
        priceNote: "/month",
        blurb: "Main server + unlimited counters, all synced live.",
        cta: "Talk to Sales",
        highlight: false,
        comingSoon: true,
        perks: [
          "1 main server computer",
          "Unlimited counter computers on LAN",
          "All counters sync in real time",
          "Central stock & sales dashboard",
          "Multi-branch support",
          "Role-based access per counter",
          "Dedicated account manager",
          "On-site setup & training",
        ],
      },
    ],
    addonsTitle: "Optional Add-ons",
    addonsSubtitle: "Power up any plan with extras — pay only for what you need.",
    addons: [
      { icon: "🖨️", name: "Thermal Printer", desc: "80mm receipt printer, pre-configured.", price: "Rs. 6,500 one-time" },
      { icon: "📷", name: "Barcode Scanner", desc: "USB laser scanner, plug & play.", price: "Rs. 3,500 one-time" },
      { icon: "💳", name: "Card Machine Link", desc: "Connect your POS to card terminals.", price: "Rs. 500/month" },
      { icon: "📱", name: "Customer SMS", desc: "Send digital receipts & offers via SMS.", price: "Rs. 800/month" },
      { icon: "☁️", name: "Cloud Backup", desc: "Automatic encrypted cloud backups.", price: "Rs. 400/month" },
      { icon: "🎓", name: "Staff Training", desc: "On-site team training session.", price: "Rs. 5,000 one-time" },
    ],
  },

  testimonials: {
    badge: "Reviews",
    title: "What Our Customers Say",
    subtitle: "Real reviews from real business owners — unfiltered.",
    items: [],
    writeBtn: "Write a Review",
    waBtn: "Review on WhatsApp",
    formTitle: "Share Your Experience",
    ratingLabel: "Your Rating",
    namePlaceholder: "Your Name",
    cityPlaceholder: "City (optional)",
    reviewLabel: "Your Review",
    reviewPlaceholder: "Tell others about your experience with Posify...",
    submitBtn: "Post Review",
    cancelBtn: "Cancel",
    thanks: "Thank you! Your review has been posted.",
    emptyTitle: "No reviews yet — be the first!",
    emptyDesc: "Share your experience with Posify and help other businesses make the right choice.",
  },

  faq: {
    badge: "FAQ",
    title: "Frequently Asked Questions",
    items: [
      {
        q: "Do I need an internet connection?",
        a: "No! Posify works fully offline. All your data stays safely on your device. Internet is only needed for FBR sync and WhatsApp support.",
      },
      {
        q: "Can it run on more than one device?",
        a: "Yes — the Business plan supports up to 3 devices, and Enterprise is unlimited. Multi-branch sync is built in for larger setups.",
      },
      {
        q: "Is FBR registration required?",
        a: "No. FBR integration is optional. If you're registered, connect it in one click — otherwise Posify works perfectly without it.",
      },
      {
        q: "How do I get support?",
        a: "24/7 WhatsApp support is available. Setup, training and troubleshooting are all included free. You're never on your own.",
      },
      {
        q: "Is there a free trial?",
        a: "Absolutely! Your first full month is free — no credit card needed. Request a demo and get started the same day.",
      },
      {
        q: "Which payment methods are supported?",
        a: "Cash, JazzCash, Easypaisa, bank transfer and card machines — all built in. Split payments across methods are also supported.",
      },
    ],
  },

  cta: {
    badge: "🎉 First Month Free",
    titleA: "Start",
    titleEm: "Today!",
    subtitle:
      "Your first month is free — no commitment, no risk. You're just one WhatsApp message away.",
    whatsapp: "Request a Demo on WhatsApp",
    email: "info@posify.pk",
    response: "Typical response time: under 5 minutes during business hours",
  },

  footer: {
    tagline: "Pakistan's Smart POS System",
    product: "Product",
    company: "Company",
    links: {
      features: "Features",
      pricing: "Pricing",
      faq: "FAQ",
      contact: "Contact",
      about: "About",
      support: "Support",
    },
    rights: "All rights reserved.",
    made: "Made with ❤️ in Pakistan 🇵🇰",
  },
};

/* ------------------------------------------------------------------ */
/*  Roman Urdu                                                         */
/* ------------------------------------------------------------------ */

const roman: typeof en = {
  nav: {
    features: "Features",
    why: "Kyun Posify",
    pricing: "Pricing",
    faq: "Sawalat",
    contact: "Raabta",
    demo: "Free Demo",
    language: "Zaban",
  },

  hero: {
    badge: "🇵🇰 Pakistan Ke Liye",
    titleA: "Pakistan Ka",
    titleHi: "Sabse Smart",
    titleB: "Point of Sale",
    titleEm: "System",
    subtitle:
      "Restaurant, Grocery, Boutique, Pharmacy — har business ke liye ek hi solution. FBR compliant, offline-first, aur sirf",
    price: "Rs. 2,000/month",
    ctaPrimary: "Free Demo Shuru Karein",
    ctaSecondary: "Features Dekhein",
    stats: [
      { value: "4", label: "Business Types" },
      { value: "FBR", label: "Compliant" },
      { value: "3", label: "Languages" },
      { value: "100%", label: "Offline First" },
    ],
    mockTitle: "Posify POS — Restaurant Mode",
    cart: "Cart",
    total: "Total",
    pay: "Pay Karein",
    shift: "Shift Active",
    table: "Table 4 — Dine In",
    scroll: "Scroll",
  },

  features: {
    badge: "Business Types",
    title: "Har Business Ke Liye",
    subtitle:
      "Ek hi app mein 4 specialized modes. Apna business type choose karein, baaki sab khud configure ho jata hai.",
    cards: [
      {
        icon: "🍽️",
        title: "Restaurant & Café",
        tagline: "Dine-in, takeaway aur delivery — sab handle.",
        items: [
          "Visual table floor plan",
          "Kitchen Display (KDS)",
          "Dine-in / Takeaway / Delivery",
          "Bill split aur merge",
          "Table-wise order tracking",
          "Live chef order queue",
        ],
      },
      {
        icon: "🛒",
        title: "Grocery / Mart",
        tagline: "Scan karo, bill banao — seconds mein.",
        items: [
          "Tez barcode scan",
          "Bundle aur promo offers",
          "Weight-based billing",
          "One-click FBR invoice",
          "Bulk aur tiered discounts",
          "Low-stock alerts",
        ],
      },
      {
        icon: "👗",
        title: "Boutique & Retail",
        tagline: "Har size, har colour, track.",
        items: [
          "Size × Colour variant matrix",
          "Per-variant stock tracking",
          "Har order pe alteration notes",
          "Exchange aur return flow",
          "Screen pe size guide",
          "Variant-level barcodes",
        ],
      },
      {
        icon: "💊",
        title: "Pharmacy",
        tagline: "Compliant, safe aur expiry-aware.",
        items: [
          "Batch aur expiry tracking",
          "FIFO batch deduction",
          "Prescription alerts",
          "Rack location system",
          "Near-expiry discounts",
          "Controlled-medicine alerts",
        ],
      },
    ],
  },

  why: {
    badge: "Kyun Posify",
    title: "Sirf Ek POS Nahi",
    subtitle: "Sirf cash register nahi — aapke business ka poora digital partner.",
    cards: [
      {
        icon: "✅",
        title: "FBR Integrated",
        desc: "Real-time FBR invoice submission, USIN generation automatic. Bina tension ke compliant rahein.",
      },
      {
        icon: "⚡",
        title: "Offline First",
        desc: "Internet band? Koi masla nahi. Bechte raho — connection aate hi data khud sync ho jata hai.",
      },
      {
        icon: "🔒",
        title: "Private & Secure",
        desc: "Aapka data aapki device pe — kisi aur ke cloud pe nahi. Koi leak nahi, poora control aapka.",
      },
      {
        icon: "📊",
        title: "Smart Reports",
        desc: "Daily, weekly, monthly insights. Ek click mein Excel ya PDF export — apne numbers jaanein.",
      },
      {
        icon: "💰",
        title: "Sach Mein Affordable",
        desc: "Rs. 2,000/month se plans, koi hidden charges nahi. Pehla mahina bilkul free.",
      },
      {
        icon: "🇵🇰",
        title: "Pakistan Ke Liye",
        desc: "Urdu support, JazzCash, Easypaisa, cash aur FBR — Pakistani business ke hisaab se banaya gaya.",
      },
    ],
  },

  how: {
    badge: "Process",
    title: "Shuru Karna Bohat Aasan",
    subtitle: "Teen simple steps — aur aap ready hain.",
    steps: [
      {
        icon: "💬",
        title: "Demo Request Karein",
        desc: "WhatsApp ya form se raabta karein. Business hours mein 5 minute mein reply.",
      },
      {
        icon: "⚙️",
        title: "Setup Hum Karein",
        desc: "Hamari team 15 minute mein poora system set kar deti hai. Aapko koi technical knowledge ki zarurat nahi.",
      },
      {
        icon: "🚀",
        title: "Selling Shuru!",
        desc: "Pehle din se live. Har sale, har invoice, har report — sab ek jagah.",
      },
    ],
  },

  pricing: {
    badge: "Pricing",
    title: "Simple Aur Honest Pricing",
    subtitle: "Koi hidden charges nahi. Koi contract nahi. Jab chahein cancel.",
    perMonth: "/month",
    popular: "Sabse Popular",
    billed: "Monthly billing — jab chahein cancel",
    cta: "Free Trial Shuru Karein",
    ctaEnterprise: "Sales Se Baat Karein",
    firstFree: "Saaray plans pe 7 din free trial",
    riskFree: "— koi credit card nahi chahiye",
    trialBadge: "7 Din Free",
    comingSoon: "Jald Aa Raha Hai",
    monthly: "Monthly",
    annual: "Annual",
    save: "Bachao",
    plans: [
      {
        name: "Solo",
        tag: "💻",
        price: "Rs. 2,000",
        priceNote: "/month",
        blurb: "Ek computer. Ek maalik. Puri power.",
        cta: "Free Trial Shuru Karein",
        highlight: false,
        comingSoon: false,
        perks: [
          "Single computer setup",
          "Saaray 4 business types",
          "Unlimited sales aur invoices",
          "Barcode aur receipt printing",
          "FBR integration",
          "Daily aur monthly reports",
          "WhatsApp support",
        ],
      },
      {
        name: "Business",
        tag: "🚀",
        price: "Rs. 3,500",
        priceNote: "/month",
        blurb: "Bari dukaan, zyada staff — poora managed.",
        cta: "Free Trial Shuru Karein",
        highlight: true,
        comingSoon: true,
        perks: [
          "Solo ka sab kuch",
          "3 computers tak",
          "Multi-user + roles aur PIN override",
          "Manager approval system",
          "Advanced reports + Excel/PDF export",
          "Backup aur restore",
          "Priority WhatsApp support",
          "Hamesha free updates",
        ],
      },
      {
        name: "Warehouse",
        tag: "🏭",
        price: "Rs. 8,000",
        priceNote: "/month",
        blurb: "Main server + unlimited counters, sab live sync.",
        cta: "Sales Se Baat Karein",
        highlight: false,
        comingSoon: true,
        perks: [
          "1 main server computer",
          "LAN pe unlimited counter computers",
          "Saaray counters real time sync",
          "Central stock aur sales dashboard",
          "Multi-branch support",
          "Har counter pe role-based access",
          "Dedicated account manager",
          "On-site setup aur training",
        ],
      },
    ],
    addonsTitle: "Optional Add-ons",
    addonsSubtitle: "Kisi bhi plan ko extras se power up karein — sirf zarurat ka kharcha.",
    addons: [
      { icon: "🖨️", name: "Thermal Printer", desc: "80mm receipt printer, pehle se configured.", price: "Rs. 6,500 one-time" },
      { icon: "📷", name: "Barcode Scanner", desc: "USB laser scanner, plug & play.", price: "Rs. 3,500 one-time" },
      { icon: "💳", name: "Card Machine Link", desc: "POS ko card terminal se connect karein.", price: "Rs. 500/month" },
      { icon: "📱", name: "Customer SMS", desc: "Digital receipts aur offers SMS pe bhejein.", price: "Rs. 800/month" },
      { icon: "☁️", name: "Cloud Backup", desc: "Automatic encrypted cloud backup.", price: "Rs. 400/month" },
      { icon: "🎓", name: "Staff Training", desc: "On-site team training session.", price: "Rs. 5,000 one-time" },
    ],
  },

  testimonials: {
    badge: "Reviews",
    title: "Customers Kya Kehte Hain",
    subtitle: "Asli business owners ke asli reviews — koi jhoot nahi.",
    items: [],
    writeBtn: "Review Likhein",
    waBtn: "WhatsApp pe Review",
    formTitle: "Apna Tajurba Share Karein",
    ratingLabel: "Aapki Rating",
    namePlaceholder: "Aapka Naam",
    cityPlaceholder: "Sheher (optional)",
    reviewLabel: "Aapka Review",
    reviewPlaceholder: "Doosron ko Posify ke baare mein batayein...",
    submitBtn: "Review Post Karein",
    cancelBtn: "Cancel",
    thanks: "Shukriya! Aapka review post ho gaya.",
    emptyTitle: "Abhi koi review nahi — pehle aap bano!",
    emptyDesc: "Apna tajurba share karein aur doosre businesses ki madad karein sahi faisla karne mein.",
  },

  faq: {
    badge: "Sawalat",
    title: "Aksar Poochay Janay Wale Sawalat",
    items: [
      {
        q: "Kya internet zaroori hai?",
        a: "Nahi! Posify offline kaam karta hai. Saari data device pe safe rehti hai. Internet sirf FBR sync aur WhatsApp support ke liye chahiye.",
      },
      {
        q: "Kya ek se zyada device pe chal sakta hai?",
        a: "Haan — Business plan 3 devices tak support karta hai, aur Enterprise unlimited. Multi-branch sync bhi built-in hai.",
      },
      {
        q: "FBR registration zaroori hai?",
        a: "Nahi. FBR integration optional hai. Agar registered hain to ek click mein connect karein, warna Posify bina FBR ke bhi perfectly kaam karta hai.",
      },
      {
        q: "Support kaise milega?",
        a: "WhatsApp pe 24/7 support available hai. Setup, training aur troubleshooting — sab free. Aap akele nahi hain!",
      },
      {
        q: "Free trial hai?",
        a: "Haan! Pehla poora mahina bilkul free. Koi credit card nahi. Demo request karein aur usi din shuru ho jain.",
      },
      {
        q: "Kaun se payment methods support hain?",
        a: "Cash, JazzCash, Easypaisa, bank transfer aur card machine — sab built-in. Split payment bhi support hai.",
      },
    ],
  },

  cta: {
    badge: "🎉 Pehla Mahina Free",
    titleA: "Aaj Hi",
    titleEm: "Shuru Karein!",
    subtitle:
      "Pehla mahina free — koi commitment nahi, koi risk nahi. Sirf ek WhatsApp message door hain.",
    whatsapp: "WhatsApp Pe Demo Request Karein",
    email: "info@posify.pk",
    response: "Typical response time: business hours mein 5 minute se kam",
  },

  footer: {
    tagline: "Pakistan Ka Smart POS System",
    product: "Product",
    company: "Company",
    links: {
      features: "Features",
      pricing: "Pricing",
      faq: "Sawalat",
      contact: "Raabta",
      about: "About",
      support: "Support",
    },
    rights: "Tamam haqooq mehfooz.",
    made: "Made with ❤️ in Pakistan 🇵🇰",
  },
};

/* ------------------------------------------------------------------ */
/*  Urdu (RTL)                                                         */
/* ------------------------------------------------------------------ */

const ur: typeof en = {
  nav: {
    features: "خصوصیات",
    why: "کیوں Posify",
    pricing: "قیمتیں",
    faq: "سوالات",
    contact: "رابطہ",
    demo: "مفت ڈیمو",
    language: "زبان",
  },

  hero: {
    badge: "🇵🇰 پاکستان کے لیے",
    titleA: "پاکستان کا",
    titleHi: "سب سے اسمارٹ",
    titleB: "پوائنٹ آف سیل",
    titleEm: "سسٹم",
    subtitle:
      "ریسٹورنٹ، گروسری، بوتیک، فارمیسی — ہر کاروبار کے لیے ایک ہی حل۔ FBR کمپلائنٹ، آف لائن، اور صرف",
    price: "2,000 روپے/ماہ",
    ctaPrimary: "مفت ڈیمو شروع کریں",
    ctaSecondary: "خصوصیات دیکھیں",
    stats: [
      { value: "4", label: "کاروباری اقسام" },
      { value: "FBR", label: "کمپلائنٹ" },
      { value: "3", label: "زبانیں" },
      { value: "100%", label: "آف لائن فرسٹ" },
    ],
    mockTitle: "Posify POS — ریسٹورنٹ موڈ",
    cart: "کارٹ",
    total: "کل",
    pay: "ابھی ادائیگی",
    shift: "شفٹ فعال",
    table: "ٹیبل 4 — ڈائن اِن",
    scroll: "اسکرول",
  },

  features: {
    badge: "کاروباری اقسام",
    title: "ہر کاروبار کے لیے",
    subtitle:
      "ایک ہی ایپ میں 4 خصوصی موڈز۔ اپنا کاروبار منتخب کریں، باقی سب خود سیٹ ہو جاتا ہے۔",
    cards: [
      {
        icon: "🍽️",
        title: "ریسٹورنٹ اور کیفے",
        tagline: "ڈائن اِن، ٹیک اوے اور ڈیلیوری — سب سنبھال لیں۔",
        items: [
          "ویژول ٹیبل فلور پلان",
          "کچن ڈسپلے سسٹم (KDS)",
          "ڈائن اِن / ٹیک اوے / ڈیلیوری",
          "بل تقسیم اور یکجا کریں",
          "ٹیبل وار آرڈر ٹریکنگ",
          "لائیو شیف آرڈر قطار",
        ],
      },
      {
        icon: "🛒",
        title: "گروسری / مارٹ",
        tagline: "اسکین کریں، بل بنائیں — سیکنڈوں میں۔",
        items: [
          "تیز بارکوڈ اسکین",
          "بنڈل اور پروموشن آفرز",
          "وزن کے حساب سے بلنگ",
          "ایک کلک FBR انوائس",
          "بلک اور ٹائرڈ ڈسکاؤنٹ",
          "کم اسٹاک الرٹ",
        ],
      },
      {
        icon: "👗",
        title: "بوتیک اور ریٹیل",
        tagline: "ہر سائز، ہر رنگ، ٹریک۔",
        items: [
          "سائز × رنگ ویریئنٹ میٹرکس",
          "فی ویریئنٹ اسٹاک ٹریکنگ",
          "ہر آرڈر پر الٹریشن نوٹس",
          "ایکسچینج اور ریٹرن",
          "اسکرین پر سائز گائیڈ",
          "ویریئنٹ بارکوڈ سپورٹ",
        ],
      },
      {
        icon: "💊",
        title: "فارمیسی",
        tagline: "کمپلائنٹ، محفوظ اور ایکسپائری سے باخبر۔",
        items: [
          "بیچ اور ایکسپائری ٹریکنگ",
          "FIFO بیچ کٹوتی",
          "نسخہ الرٹ",
          "ریک لوکیشن سسٹم",
          "ایکسپائری کے قریب ڈسکاؤنٹ",
          "کنٹرولڈ دوا الرٹ",
        ],
      },
    ],
  },

  why: {
    badge: "کیوں Posify",
    title: "صرف ایک POS نہیں",
    subtitle: "صرف کیش رجسٹر نہیں — آپ کے کاروبار کا مکمل ڈیجیٹل پارٹنر۔",
    cards: [
      {
        icon: "✅",
        title: "FBR انٹیگریٹڈ",
        desc: "ریئل ٹائم FBR انوائس جمع، USIN خودکار طور پر بنتا ہے۔ بغیر پریشانی کمپلائنٹ رہیں۔",
      },
      {
        icon: "⚡",
        title: "آف لائن فرسٹ",
        desc: "انٹرنیٹ بند؟ کوئی مسئلہ نہیں۔ بیچتے رہیں — کنکشن آتے ہی ڈیٹا خود سِنک ہو جاتا ہے۔",
      },
      {
        icon: "🔒",
        title: "پرائیویٹ اور محفوظ",
        desc: "آپ کا ڈیٹا آپ کی ڈیوائس پر — کسی اور کے کلاؤڈ پر نہیں۔ کوئی لیک نہیں، پورا کنٹرول آپ کا۔",
      },
      {
        icon: "📊",
        title: "اسمارٹ رپورٹس",
        desc: "روزانہ، ہفتہ وار، ماہانہ رپورٹس۔ ایک کلک میں Excel یا PDF — اپنے اعداد جانیں۔",
      },
      {
        icon: "💰",
        title: "واقعی سستا",
        desc: "2,000 روپے/ماہ سے پلانز، کوئی پوشیدہ چارجز نہیں۔ پہلا مہینہ بالکل مفت۔",
      },
      {
        icon: "🇵🇰",
        title: "پاکستان کے لیے",
        desc: "اردو سپورٹ، جاز کیش، ایزی پیسہ، کیش اور FBR — پاکستانی کاروبار کے حساب سے۔",
      },
    ],
  },

  how: {
    badge: "طریقہ کار",
    title: "شروع کرنا بہت آسان",
    subtitle: "تین آسان مرحلے — اور آپ تیار ہیں۔",
    steps: [
      {
        icon: "💬",
        title: "ڈیمو ریکویسٹ کریں",
        desc: "واٹس ایپ یا فارم سے رابطہ کریں۔ کاروباری اوقات میں 5 منٹ میں جواب۔",
      },
      {
        icon: "⚙️",
        title: "سیٹ اپ ہم کریں",
        desc: "ہماری ٹیم 15 منٹ میں پورا سسٹم سیٹ کر دیتی ہے۔ آپ کو کسی تکنیکی علم کی ضرورت نہیں۔",
      },
      {
        icon: "🚀",
        title: "سیلنگ شروع!",
        desc: "پہلے دن سے لائیو۔ ہر سیل، ہر انوائس، ہر رپورٹ — سب ایک جگہ۔",
      },
    ],
  },

  pricing: {
    badge: "قیمتیں",
    title: "آسان اور شفاف قیمتیں",
    subtitle: "کوئی پوشیدہ چارجز نہیں۔ کوئی کنٹریکٹ نہیں۔ جب چاہیں منسوخ کریں۔",
    perMonth: "/ماہ",
    popular: "سب سے مقبول",
    billed: "ماہانہ بلنگ — جب چاہیں منسوخ کریں",
    cta: "مفت ٹرائل شروع کریں",
    ctaEnterprise: "سیلز سے بات کریں",
    firstFree: "تمام پلانز پر 7 دن مفت ٹرائل",
    riskFree: "— کوئی کریڈٹ کارڈ نہیں",
    trialBadge: "7 دن مفت",
    comingSoon: "جلد آ رہا ہے",
    monthly: "ماہانہ",
    annual: "سالانہ",
    save: "بچت",
    plans: [
      {
        name: "سولو",
        tag: "💻",
        price: "2,000 روپے",
        priceNote: "/ماہ",
        blurb: "ایک کمپیوٹر۔ ایک مالک۔ پوری طاقت۔",
        cta: "مفت ٹرائل شروع کریں",
        highlight: false,
        comingSoon: false,
        perks: [
          "سنگل کمپیوٹر سیٹ اپ",
          "چاروں کاروباری اقسام",
          "لامحدود سیلز اور انوائس",
          "بارکوڈ اور رسید پرنٹنگ",
          "FBR انٹیگریشن",
          "روزانہ اور ماہانہ رپورٹس",
          "واٹس ایپ سپورٹ",
        ],
      },
      {
        name: "بزنس",
        tag: "🚀",
        price: "3,500 روپے",
        priceNote: "/ماہ",
        blurb: "بڑی دکان، زیادہ عملہ — مکمل انتظام۔",
        cta: "مفت ٹرائل شروع کریں",
        highlight: true,
        comingSoon: true,
        perks: [
          "سولو کا سب کچھ",
          "3 کمپیوٹرز تک",
          "ملٹی یوزر + رولز اور PIN اوور رائیڈ",
          "مینیجر اپروول سسٹم",
          "ایڈوانس رپورٹس + Excel/PDF ایکسپورٹ",
          "بیک اپ اور ریسٹور",
          "پرائیورٹی واٹس ایپ سپورٹ",
          "ہمیشہ مفت اپڈیٹس",
        ],
      },
      {
        name: "ویئر ہاؤس",
        tag: "🏭",
        price: "8,000 روپے",
        priceNote: "/ماہ",
        blurb: "مین سرور + لامحدود کاؤنٹرز، سب لائیو سِنک۔",
        cta: "سیلز سے بات کریں",
        highlight: false,
        comingSoon: true,
        perks: [
          "1 مین سرور کمپیوٹر",
          "LAN پر لامحدود کاؤنٹر کمپیوٹرز",
          "تمام کاؤنٹرز ریئل ٹائم سِنک",
          "سینٹرل اسٹاک اور سیلز ڈیش بورڈ",
          "ملٹی برانچ سپورٹ",
          "ہر کاؤنٹر پر رول بیسڈ رسائی",
          "وقف اکاؤنٹ مینیجر",
          "آن سائٹ سیٹ اپ اور ٹریننگ",
        ],
      },
    ],
    addonsTitle: "اختیاری ایڈ-آنز",
    addonsSubtitle: "کسی بھی پلان کو extras سے بہتر بنائیں — صرف ضرورت کا خرچ۔",
    addons: [
      { icon: "🖨️", name: "تھرمل پرنٹر", desc: "80mm رسید پرنٹر، پہلے سے سیٹ۔", price: "6,500 روپے ایک بار" },
      { icon: "📷", name: "بارکوڈ اسکینر", desc: "USB لیزر اسکینر، پلگ اینڈ پلے۔", price: "3,500 روپے ایک بار" },
      { icon: "💳", name: "کارڈ مشین لنک", desc: "POS کو کارڈ ٹرمینل سے جوڑیں۔", price: "500 روپے/ماہ" },
      { icon: "📱", name: "کسٹمر SMS", desc: "ڈیجیٹل رسید اور آفرز SMS پر بھیجیں۔", price: "800 روپے/ماہ" },
      { icon: "☁️", name: "کلاؤڈ بیک اپ", desc: "خودکار encrypted کلاؤڈ بیک اپ۔", price: "400 روپے/ماہ" },
      { icon: "🎓", name: "اسٹاف ٹریننگ", desc: "آن سائٹ ٹیم ٹریننگ سیشن۔", price: "5,000 روپے ایک بار" },
    ],
  },

  testimonials: {
    badge: "ریویوز",
    title: "کسٹمرز کیا کہتے ہیں",
    subtitle: "اصل کاروباری مالکان کے اصل ریویوز — کوئی جھوٹ نہیں۔",
    items: [],
    writeBtn: "ریویو لکھیں",
    waBtn: "واٹس ایپ پر ریویو",
    formTitle: "اپنا تجربہ شیئر کریں",
    ratingLabel: "آپ کی ریٹنگ",
    namePlaceholder: "آپ کا نام",
    cityPlaceholder: "شہر (اختیاری)",
    reviewLabel: "آپ کا ریویو",
    reviewPlaceholder: "Posify کے بارے میں دوسروں کو بتائیں...",
    submitBtn: "ریویو پوسٹ کریں",
    cancelBtn: "منسوخ",
    thanks: "شکریہ! آپ کا ریویو پوسٹ ہو گیا۔",
    emptyTitle: "ابھی کوئی ریویو نہیں — پہلے آپ بنیں!",
    emptyDesc: "اپنا تجربہ شیئر کریں اور دوسرے کاروباروں کی مدد کریں صحیح فیصلہ کرنے میں۔",
  },

  faq: {
    badge: "سوالات",
    title: "اکثر پوچھے جانے والے سوالات",
    items: [
      {
        q: "کیا انٹرنیٹ ضروری ہے؟",
        a: "نہیں! Posify آف لائن کام کرتا ہے۔ ساری ڈیٹا ڈیوائس پر محفوظ رہتی ہے۔ انٹرنیٹ صرف FBR سِنک اور واٹس ایپ سپورٹ کے لیے چاہیے۔",
      },
      {
        q: "کیا ایک سے زیادہ ڈیوائس پر چل سکتا ہے؟",
        a: "ہاں — بزنس پلان 3 ڈیوائسز تک، اور انٹرپرائز لامحدود۔ ملٹی برانچ سِنک بھی شامل ہے۔",
      },
      {
        q: "کیا FBR رجسٹریشن ضروری ہے؟",
        a: "نہیں۔ FBR انٹیگریشن اختیاری ہے۔ اگر رجسٹرڈ ہیں تو ایک کلک میں جوڑیں، ورنہ Posify بغیر FBR کے بھی بہترین کام کرتا ہے۔",
      },
      {
        q: "سپورٹ کیسے ملے گی؟",
        a: "واٹس ایپ پر 24/7 سپورٹ دستیاب ہے۔ سیٹ اپ، ٹریننگ اور ٹربل شوٹنگ — سب مفت۔ آپ اکیلے نہیں ہیں!",
      },
      {
        q: "کیا مفت ٹرائل ہے؟",
        a: "بالکل! پہلا پورا مہینہ بالکل مفت۔ کوئی کریڈٹ کارڈ نہیں۔ ڈیمو ریکویسٹ کریں اور اسی دن شروع ہو جائیں۔",
      },
      {
        q: "کون سے پیمنٹ طریقے سپورٹڈ ہیں؟",
        a: "کیش، جاز کیش، ایزی پیسہ، بینک ٹرانسفر اور کارڈ مشین — سب شامل۔ اسپلٹ پیمنٹ بھی سپورٹڈ ہے۔",
      },
    ],
  },

  cta: {
    badge: "🎉 پہلا مہینہ مفت",
    titleA: "آج ہی",
    titleEm: "شروع کریں!",
    subtitle:
      "پہلا مہینہ مفت — کوئی کمٹمنٹ نہیں، کوئی رسک نہیں۔ صرف ایک واٹس ایپ میسج دور ہیں۔",
    whatsapp: "واٹس ایپ پر ڈیمو ریکویسٹ کریں",
    email: "info@posify.pk",
    response: "عام جواب کا وقت: کاروباری اوقات میں 5 منٹ سے کم",
  },

  footer: {
    tagline: "پاکستان کا اسمارٹ POS سسٹم",
    product: "پروڈکٹ",
    company: "کمپنی",
    links: {
      features: "خصوصیات",
      pricing: "قیمتیں",
      faq: "سوالات",
      contact: "رابطہ",
      about: "تعارف",
      support: "سپورٹ",
    },
    rights: "جملہ حقوق محفوظ ہیں۔",
    made: "محبت ❤️ کے ساتھ پاکستان میں بنایا 🇵🇰",
  },
};

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

const dictionaries = { en, roman, ur };
export type Dict = typeof en;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict; dir: "ltr" | "rtl" };

const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined"
      ? (localStorage.getItem("posify-lang") as Lang | null)
      : null);
    if (saved && saved in dictionaries) setLangState(saved);
  }, []);

  const dir: "ltr" | "rtl" = lang === "ur" ? "rtl" : "ltr";

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang === "ur" ? "ur" : lang === "roman" ? "ur" : "en";
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("posify-lang", l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: dictionaries[lang], dir }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): Ctx {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
