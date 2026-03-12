import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/TopNav";
import SiteFooter from "@/components/SiteFooter";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";
import { getServerLang } from "@/lib/server-lang";

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
    areaServed: "Worldwide",
    knowsLanguage: ["en", "zh", "es"]
  };

  return (
    <html lang={lang}>
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <TopNav initialLang={lang} />
        {children}
        <SiteFooter initialLang={lang} />
      </body>
    </html>
  );
}
