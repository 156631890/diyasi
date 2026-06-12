import type { Metadata } from "next";
import { buildMetadata, buildBreadcrumbJsonLd, absoluteUrl } from "@/lib/seo";
import { companyInfo } from "@/lib/site-info";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us — Request a Quote",
  description: `Contact ${companyInfo.name} for private label underwear manufacturing quotes, OEM/ODM inquiries, and factory visits. Email: ${companyInfo.emailPrimary}, WhatsApp: ${companyInfo.phone}.`,
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);
  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: companyInfo.name,
    description: `Private label underwear manufacturer since ${companyInfo.establishedYear}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: companyInfo.address,
      addressCountry: "CN",
    },
    telephone: companyInfo.phone,
    email: companyInfo.emailPrimary,
    url: absoluteUrl("/contact"),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }} />
      {children}
    </>
  );
}
