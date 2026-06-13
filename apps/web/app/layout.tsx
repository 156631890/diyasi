import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";

import SiteFooter from "@/components/SiteFooter";
import TopNav from "@/components/TopNav";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";
import { getServerLang } from "@/lib/server-lang";
import { companyInfo } from "@/lib/site-info";

import "./globals.css";

const headingFont = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-heading"
});

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body"
});

const defaultImage = `${SITE_URL}/media/home/factory-1.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "private label underwear manufacturer",
    "private label intimates manufacturer",
    "OEM ODM underwear factory",
    "custom underwear packaging",
    "bra manufacturer",
    "shapewear manufacturer",
    "activewear manufacturer",
    "China underwear factory"
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en': SITE_URL,
      'zh': SITE_URL,
      'es': SITE_URL,
      'x-default': SITE_URL,
    },
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
    siteName: SITE_NAME,
    images: [defaultImage]
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [defaultImage]
  },
  verification: {
    google: "hDSPhnbzMVua4_hudRRSdKZclQDNa0GG3Z36Kg0smXQ"
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
    name: companyInfo.name,
    alternateName: companyInfo.shortName,
    url: SITE_URL,
    image: defaultImage,
    description: SITE_DESCRIPTION,
    foundingDate: companyInfo.establishedYear,
    email: companyInfo.emailPrimary,
    telephone: companyInfo.phone,
    faxNumber: companyInfo.fax,
    areaServed: "Worldwide",
    knowsLanguage: ["en", "zh", "es"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "No. 16 Dashi Road, Fotang Town",
      addressLocality: "Yiwu",
      addressRegion: "Zhejiang",
      postalCode: "322000",
      addressCountry: "CN"
    },
    knowsAbout: [
      "Private label underwear manufacturing",
      "OEM ODM intimates development",
      "Underwear fabric selection",
      "Custom labels and packaging",
      "Underwear quality control"
    ]
  };

  return (
    <html lang={lang}>
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <TopNav initialLang={lang} />
        {children}
        <SiteFooter initialLang={lang} />
      </body>
    </html>
  );
}
