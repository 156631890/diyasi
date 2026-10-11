import type { Metadata } from "next";
import { buildMetadata, buildBreadcrumbJsonLd, absoluteUrl } from "@/lib/seo";
import { companyInfo } from "@/lib/site-info";

export const metadata: Metadata = buildMetadata({
  title: "Request Underwear Samples and Quote: Your Brief",
  description: "Request underwear samples and quote details from DIYASI. Send models, sizes, colors and artwork; MOQ 120 pieces per style, sample guidance 5–7 days.",
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
    description: "Private-label underwear manufacturer in Yiwu, China",
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
