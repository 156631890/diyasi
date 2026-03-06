import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/TopNav";
import SiteFooter from "@/components/SiteFooter";
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
  title: "YiWu DiYaSi Dress CO., LTD",
  description:
    "Founded on sustainability and quality, YiWu DiYaSi Dress CO., LTD helps global brands develop and manufacture premium underwear lines.",
  openGraph: {
    title: "YiWu DiYaSi Dress CO., LTD",
    description:
      "23+ years of OEM/ODM experience for premium sustainable underwear manufacturing and reliable global delivery.",
    type: "website",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "YiWu DiYaSi"
  },
  twitter: {
    card: "summary_large_image",
    title: "YiWu DiYaSi Dress CO., LTD",
    description: "Premium sustainable underwear manufacturing partner with 23+ years of OEM/ODM execution."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = getServerLang();
  return (
    <html lang={lang}>
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        <TopNav initialLang={lang} />
        {children}
        <SiteFooter initialLang={lang} />
      </body>
    </html>
  );
}
