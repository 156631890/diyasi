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
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg"
  },
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
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    image: `${SITE_URL}/media/generated/factory-capability-panorama.png`,
    foundingDate: "2002",
    email: "imbella.vicky@diyasidress.com",
    telephone: "+86-18042579030",
    faxNumber: "+86-579-85569925",
    address: {
      "@type": "PostalAddress",
      streetAddress: "NO.16 DaShi Road, FoTang Town",
      addressLocality: "Yiwu",
      addressRegion: "Zhejiang",
      addressCountry: "CN"
    },
    areaServed: ["North America", "Europe", "Asia", "Worldwide"],
    knowsLanguage: ["en", "zh", "es"],
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Manufacturing Experience",
        value: "23+ years"
      },
      {
        "@type": "PropertyValue",
        name: "First Sample Lead Time",
        value: "5-7 days"
      },
      {
        "@type": "PropertyValue",
        name: "Bulk Production Lead Time",
        value: "20-30 days"
      },
      {
        "@type": "PropertyValue",
        name: "MOQ per style and color",
        value: "300-500 pcs"
      },
      {
        "@type": "PropertyValue",
        name: "Flexible MOQ",
        value: "100-500 pcs/style"
      },
      {
        "@type": "PropertyValue",
        name: "Factory Size",
        value: "20,000 m²"
      },
      {
        "@type": "PropertyValue",
        name: "Employees",
        value: "100+"
      },
      {
        "@type": "PropertyValue",
        name: "Monthly Capacity",
        value: "600,000+ pieces"
      },
      {
        "@type": "PropertyValue",
        name: "Export Markets",
        value: "30+ countries"
      }
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Private-label underwear manufacturing"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "OEM / ODM product development"
        }
      }
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <TopNav initialLang={lang} />
        {children}
        <SiteFooter initialLang={lang} />
      </body>
    </html>
  );
}
