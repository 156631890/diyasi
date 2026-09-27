import type { Metadata } from "next";
import localFont from "next/font/local";
import SiteFooter from "@/components/SiteFooter";
import TopNav from "@/components/TopNav";
import JsonLd from "@/components/JsonLd";
import ProductComparison from "@/components/ProductComparison";
import AnalyticsConsent from "@/components/AnalyticsConsent";
import SampleList from "@/components/SampleList";
import { catalogProducts } from "@/lib/catalog-source";
import {
  absoluteUrl,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_ORIGIN,
} from "@/lib/seo";
import { getServerLang } from "@/lib/server-lang";
import { companyInfo } from "@/lib/site-info";
import "./globals.css";
import "./editorial.css";
import "./news/news.css";

const headingFont = localFont({
  src: [
    {
      path: "../public/fonts/cormorant-normal.ttf",
      weight: "400 600",
      style: "normal",
    },
    {
      path: "../public/fonts/cormorant-italic.ttf",
      weight: "400 600",
      style: "italic",
    },
  ],
  variable: "--font-heading",
  display: "swap",
});
const bodyFont = localFont({
  src: "../public/fonts/manrope-normal.ttf",
  weight: "400 700",
  variable: "--font-body",
  display: "swap",
});
const defaultImage = absoluteUrl("/media/editorial/cotton-lace-story.png");
export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: "DIYASI | Thoughtfully Made Private Label Intimates",
    template: "%s | DIYASI",
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: companyInfo.name }],
  creator: SITE_NAME,
  publisher: companyInfo.name,
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "16x16 32x32 48x48 64x64",
        type: "image/x-icon",
      },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  alternates: { canonical: SITE_ORIGIN },
  robots: { index: true, follow: true },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
    url: SITE_ORIGIN,
    siteName: SITE_NAME,
    images: [
      { url: defaultImage, alt: "DIYASI cotton and lace materials story" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [defaultImage],
  },
  verification: {
    google: "hDSPhnbzMVua4_hudRRSdKZclQDNa0GG3Z36Kg0smXQ",
    other: { "msvalidate.01": "FAADC7678B79EDCF1CD8FADD2D9D5261" },
  },
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = await getServerLang();
  return (
    <html lang={lang} data-scroll-behavior="smooth">
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": absoluteUrl("/") + "#website",
            name: SITE_NAME,
            url: SITE_ORIGIN,
            description: SITE_DESCRIPTION,
            inLanguage: ["en", "es"],
            publisher: { "@id": absoluteUrl("/") + "#organization" },
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": absoluteUrl("/") + "#organization",
            name: companyInfo.name,
            alternateName: "DIYASI",
            foundingDate: String(companyInfo.establishedYear),
            url: SITE_ORIGIN,
            logo: {
              "@type": "ImageObject",
              url: absoluteUrl("/media/brand/diyasi-monogram.png"),
              width: 512,
              height: 512,
            },
            description: SITE_DESCRIPTION,
            email: companyInfo.emailPrimary,
            telephone: companyInfo.phone,
            address: {
              "@type": "PostalAddress",
              streetAddress: "No. 16 Dashi Road, Fotang Town",
              addressLocality: "Yiwu",
              addressRegion: "Zhejiang",
              postalCode: "322000",
              addressCountry: "CN",
            },
            sameAs: [
              "https://www.diyasiunderwear.com/",
              "https://diyasiapparel.com/",
              "https://www.linkedin.com/company/111228105/",
              "https://www.facebook.com/profile.php?id=61586239027302",
            ],
            knowsAbout: [
              "Private-label underwear",
              "Cotton underwear manufacturing",
              "Lace underwear",
              "Seamless underwear",
              "Custom labels and packaging",
            ],
          }}
        />
        <ProductComparison
          products={catalogProducts.map(
            ({
              slug,
              product_name,
              model_number,
              image_url,
              fabric,
              fit,
              rise,
              size,
              moq,
            }) => ({
              slug,
              product_name,
              model_number,
              image_url,
              fabric,
              fit,
              rise,
              size,
              moq,
            }),
          )}
        >
          <SampleList products={catalogProducts.map(({ slug, product_name, model_number, image_url }) => ({ slug, product_name, model_number, image_url }))}>
          <TopNav initialLang={lang} />
          {children}
          <SiteFooter initialLang={lang} />
          <AnalyticsConsent />
          </SampleList>
        </ProductComparison>
      </body>
    </html>
  );
}
