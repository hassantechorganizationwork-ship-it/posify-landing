import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://posify.pk"),
  title: {
    default: "Posify — Pakistan ka #1 POS Software | Restaurant, Grocery, Pharmacy, Boutique",
    template: "%s | Posify Pakistan",
  },
  description:
    "Pakistan ka sabse smart POS system sirf Rs. 2,000/month. Restaurant, Grocery, Boutique aur Pharmacy ke liye FBR integrated point of sale software. Lahore, Karachi, Islamabad — poore Pakistan mein. Free trial!",
  keywords: [
    "POS software Pakistan",
    "POS system Pakistan",
    "point of sale Pakistan",
    "restaurant POS Pakistan",
    "pharmacy software Pakistan",
    "grocery POS software",
    "boutique POS Pakistan",
    "FBR POS software",
    "FBR integrated POS",
    "POS software Lahore",
    "POS software Karachi",
    "POS software Islamabad",
    "POS software Rawalpindi",
    "POS software Faisalabad",
    "POS software Multan",
    "POS software Peshawar",
    "POS software price Pakistan",
    "sasta POS software",
    "retail software Pakistan",
    "billing software Pakistan",
    "inventory software Pakistan",
    "medical store software",
    "restaurant management software Pakistan",
    "cash register software Pakistan",
    "dukaan ka software",
    "restaurant ka software",
    "medical store ka software",
    "POS software price in Pakistan",
    // Urdu-script keywords
    "پی او ایس سافٹ ویئر",
    "پاکستان پی او ایس سسٹم",
    "دکان کا سافٹ ویئر",
    "میڈیکل اسٹور سافٹ ویئر",
    "ریسٹورنٹ سافٹ ویئر",
    "بلنگ سافٹ ویئر پاکستان",
    "ایف بی آر پی او ایس",
  ],
  authors: [{ name: "Posify" }],
  creator: "Posify",
  publisher: "Posify",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    alternateLocale: ["ur_PK"],
    url: "https://posify.pk",
    siteName: "Posify",
    title: "Posify — Pakistan ka #1 POS Software",
    description:
      "Restaurant, Grocery, Boutique, Pharmacy — har business ke liye FBR integrated POS. Sirf Rs. 2,000/month. Free trial!",
  },
  twitter: {
    card: "summary_large_image",
    title: "Posify — Pakistan ka #1 POS Software",
    description: "FBR integrated POS sirf Rs. 2,000/month",
  },
  alternates: {
    canonical: "https://posify.pk",
    languages: {
      "en-PK": "https://posify.pk",
      "ur-PK": "https://posify.pk",
      "x-default": "https://posify.pk",
    },
  },
  manifest: "/manifest.webmanifest",
  applicationName: "Posify",
  appleWebApp: {
    capable: true,
    title: "Posify POS",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  category: "technology",
  other: {
    // Geo targeting — helps local SEO for Pakistan
    "geo.region": "PK",
    "geo.placename": "Pakistan",
    "geo.position": "31.5204;74.3587",
    ICBM: "31.5204, 74.3587",
  },
  // Replace with the real code from Google Search Console once verified.
  verification: {
    google: "GOOGLE_VERIFICATION_CODE_HERE",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d1117",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full ${inter.variable}`}>
      <body className={`min-h-full ${inter.className}`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
