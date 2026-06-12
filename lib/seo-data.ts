// Data source for programmatic SEO landing pages (city + business-type).

export const SITE = "https://posify.pk";

export type City = {
  slug: string;
  name: string;
  urdu: string;
  province: string;
  note: string; // one local-flavoured sentence, keeps each page unique
};

export const cities: City[] = [
  { slug: "lahore", name: "Lahore", urdu: "لاہور", province: "Punjab", note: "From Anarkali to Liberty Market, Lahore's restaurants, boutiques and kiryana stores run faster with Posify." },
  { slug: "karachi", name: "Karachi", urdu: "کراچی", province: "Sindh", note: "Karachi's busy supermarkets, pharmacies and food spots trust Posify to handle high-volume billing without slowing down." },
  { slug: "islamabad", name: "Islamabad", urdu: "اسلام آباد", province: "Islamabad Capital Territory", note: "Cafes and retail shops across Islamabad's sectors and markets bill faster with Posify's offline POS." },
  { slug: "rawalpindi", name: "Rawalpindi", urdu: "راولپنڈی", province: "Punjab", note: "From Raja Bazaar to Saddar, Rawalpindi shopkeepers keep stock and sales in order with Posify." },
  { slug: "faisalabad", name: "Faisalabad", urdu: "فیصل آباد", province: "Punjab", note: "Faisalabad's cloth markets and grocery stores manage inventory and billing easily with Posify." },
  { slug: "multan", name: "Multan", urdu: "ملتان", province: "Punjab", note: "Multan's bazaars, medical stores and restaurants stay organised with Posify's simple POS." },
  { slug: "peshawar", name: "Peshawar", urdu: "پشاور", province: "Khyber Pakhtunkhwa", note: "Peshawar businesses get fast Urdu-friendly billing and FBR-ready invoices with Posify." },
  { slug: "quetta", name: "Quetta", urdu: "کوئٹہ", province: "Balochistan", note: "Quetta shops run reliably even offline — Posify keeps your sales going without internet." },
  { slug: "sialkot", name: "Sialkot", urdu: "سیالکوٹ", province: "Punjab", note: "Sialkot's retailers and exporters' outlets manage stock and receipts with Posify." },
  { slug: "gujranwala", name: "Gujranwala", urdu: "گوجرانوالہ", province: "Punjab", note: "Gujranwala's wholesale and retail stores speed up checkout with Posify's barcode billing." },
  { slug: "hyderabad", name: "Hyderabad", urdu: "حیدرآباد", province: "Sindh", note: "Hyderabad's grocery and clothing shops keep daily accounts tidy with Posify." },
  { slug: "bahawalpur", name: "Bahawalpur", urdu: "بہاولپور", province: "Punjab", note: "Bahawalpur's stores and pharmacies handle billing and inventory the easy way with Posify." },
  { slug: "sargodha", name: "Sargodha", urdu: "سرگودھا", province: "Punjab", note: "Sargodha's citrus-belt traders, grocery stores and clothing shops keep billing and stock tidy with Posify." },
  { slug: "sahiwal", name: "Sahiwal", urdu: "ساہیوال", province: "Punjab", note: "Sahiwal's shops, restaurants and pharmacies bill faster and track inventory easily with Posify." },
  { slug: "gujrat", name: "Gujrat", urdu: "گجرات", province: "Punjab", note: "Gujrat's furniture, fan and retail businesses manage sales and stock with Posify's offline POS." },
  { slug: "sheikhupura", name: "Sheikhupura", urdu: "شیخوپورہ", province: "Punjab", note: "Sheikhupura's kiryana stores and retail shops speed up checkout with Posify's barcode billing." },
  { slug: "sukkur", name: "Sukkur", urdu: "سکھر", province: "Sindh", note: "Sukkur's bazaars, medical stores and eateries stay organised with Posify's simple POS." },
  { slug: "larkana", name: "Larkana", urdu: "لاڑکانہ", province: "Sindh", note: "Larkana shopkeepers get fast, Urdu-friendly billing and FBR-ready invoices with Posify." },
  { slug: "rahim-yar-khan", name: "Rahim Yar Khan", urdu: "رحیم یار خان", province: "Punjab", note: "Rahim Yar Khan's grocery and clothing stores manage daily sales and stock with Posify." },
  { slug: "mardan", name: "Mardan", urdu: "مردان", province: "Khyber Pakhtunkhwa", note: "Mardan's retail shops and pharmacies run reliably even offline with Posify." },
  { slug: "abbottabad", name: "Abbottabad", urdu: "ایبٹ آباد", province: "Khyber Pakhtunkhwa", note: "Abbottabad's cafes, shops and medical stores bill quickly with Posify's offline POS." },
  { slug: "jhang", name: "Jhang", urdu: "جھنگ", province: "Punjab", note: "Jhang's traders and stores keep accounts and inventory in order with Posify." },
  { slug: "dera-ghazi-khan", name: "Dera Ghazi Khan", urdu: "ڈیرہ غازی خان", province: "Punjab", note: "Dera Ghazi Khan's bazaars and shops handle billing the easy way with Posify." },
  { slug: "mirpur", name: "Mirpur", urdu: "میرپور", province: "Azad Kashmir", note: "Mirpur's retail and grocery stores keep sales and stock tidy with Posify." },
];

export type Business = {
  slug: string;
  name: string;       // short, e.g. "Restaurant"
  title: string;      // full, e.g. "Restaurant & Cafe POS Software"
  icon: string;
  intro: string;
  features: string[];
};

export const businesses: Business[] = [
  {
    slug: "restaurant",
    name: "Restaurant",
    title: "Restaurant & Cafe POS Software",
    icon: "🍽️",
    intro:
      "Posify is a complete restaurant POS and billing software for Pakistan — built for dine-in, takeaway and delivery. Manage tables, send orders straight to the kitchen, split bills and print FBR-compliant invoices, all from one screen.",
    features: [
      "Dine-in, takeaway & delivery order modes",
      "Table floor plan & live order status",
      "Kitchen display & order tickets",
      "Split bills & multiple payment methods",
      "FBR invoicing for registered restaurants",
      "Daily sales & item-wise reports",
    ],
  },
  {
    slug: "grocery",
    name: "Grocery & Kiryana",
    title: "Grocery & Kiryana Store POS Software",
    icon: "🛒",
    intro:
      "Posify is fast, affordable POS software for grocery, kiryana and supermarket stores across Pakistan. Scan barcodes, manage thousands of products, track stock and bill customers in seconds — even fully offline.",
    features: [
      "Barcode scanning & quick billing",
      "Unlimited products & categories",
      "Low-stock alerts & inventory control",
      "Supplier & purchase management",
      "Cash, JazzCash & Easypaisa payments",
      "Works 100% offline",
    ],
  },
  {
    slug: "boutique",
    name: "Boutique & Retail",
    title: "Boutique & Retail POS Software",
    icon: "👗",
    intro:
      "Posify is modern POS software for clothing boutiques, shoe shops and retail stores in Pakistan. Track sizes, colours and variants, manage stock, and give customers a fast, professional checkout.",
    features: [
      "Size, colour & variant tracking",
      "Barcode labels & receipt printing",
      "Customer profiles & loyalty",
      "Discounts & seasonal sales",
      "Inventory across multiple counters",
      "Sales & profit reports",
    ],
  },
  {
    slug: "pharmacy",
    name: "Pharmacy & Medical Store",
    title: "Pharmacy & Medical Store POS Software",
    icon: "💊",
    intro:
      "Posify is reliable pharmacy management and POS software for medical stores and chemists in Pakistan. Track batches and expiry dates, manage suppliers, and bill customers quickly while staying compliant.",
    features: [
      "Batch & expiry date tracking",
      "Salt / generic name search",
      "Supplier & purchase records",
      "Low-stock & near-expiry alerts",
      "Fast barcode billing",
      "Daily, weekly & monthly reports",
    ],
  },
];
