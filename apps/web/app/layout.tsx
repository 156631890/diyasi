import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import SiteFooter from "@/components/SiteFooter";
import TopNav from "@/components/TopNav";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";
import { getServerLang } from "@/lib/server-lang";

import "./globals.css";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading"
});

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "underwear manufacturer",
    "private label underwear factory",
    "OEM ODM underwear",
    "bra manufacturer",
    "shapewear manufacturer",
    "activewear manufacturer",
    "China underwear factory"
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: SITE_URL
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = getServerLang();

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: ["en", "zh", "es"]
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    foundingDate: "2002",
    email: "imbella.vicky@diyasidress.com",
    telephone: "+86-18042579030",
    faxNumber: "+86-579-85569925",
    areaServed: "Worldwide",
    knowsLanguage: ["en", "zh", "es"]
  };

  const clothingStoreJsonLd = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: "YiWu DiYaSi Dress CO., LTD",
    alternateName: "义乌市迪亚斯服饰有限公司",
    image: `${SITE_URL}/media/generated/factory-capability-panorama.png`,
    "@id": SITE_URL,
    url: SITE_URL,
    telephone: "+86-18042579030",
    address: {
      "@type": "PostalAddress",
      streetAddress: "NO.16 DaShi Road, FoTang Town",
      addressLocality: "Yiwu",
      addressRegion: "Zhejiang",
      postalCode: "322000",
      addressCountry: "CN"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 29.3068,
      longitude: 120.0751
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00"
    },
    description:
      "YiWu DiYaSi Dress CO., LTD is a professional sustainable underwear manufacturer with 23+ years of experience. We specialize in eco-friendly fabrics, seamless technology, and OEM/ODM services for global brands.",
    brand: {
      "@type": "Brand",
      name: "DiYaSi"
    },
    foundingDate: "2002",
    knowsAbout: [
      "Sustainable Underwear Manufacturing",
      "Eco-friendly Fabrics",
      "Seamless Lingerie Production",
      "Cross-border E-commerce Supply Chain",
      "Yiwu Sourcing"
    ]
  };

  return (
    <html lang={lang}>
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clothingStoreJsonLd) }}
        />
        <TopNav initialLang={lang} />
        {children}
        <SiteFooter initialLang={lang} />
      </body>
    </html>
  );
}
