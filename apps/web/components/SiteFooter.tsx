import Link from "next/link";

import { SiteLang } from "@/lib/i18n";
import { companyInfo, launchCollections } from "@/lib/site-info";

type SiteFooterProps = {
  initialLang: SiteLang;
};

type FooterCopy = {
  eyebrow: string;
  brandDesc: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaPrimary: string;
  ctaSecondary: string;
  quickTitle: string;
  productTitle: string;
  supportTitle: string;
  contactTitle: string;
  rights: string;
};

const copy: Record<SiteLang, FooterCopy> = {
  en: {
    eyebrow: "YiWu DiYaSi",
    brandDesc:
      "Private label intimates manufacturer supporting DTC, retail, and wholesale brands from fabric selection and sampling to custom packaging and bulk delivery.",
    ctaTitle: "Start your private label underwear project with a real factory team",
    ctaDesc:
      "Send your category, target market, quantity range, packaging needs, and launch timing. We will respond with a practical sampling and MOQ path.",
    ctaPrimary: "Start a Project",
    ctaSecondary: "View Collections",
    quickTitle: "Company",
    productTitle: "Collections",
    supportTitle: "Services",
    contactTitle: "Contact",
    rights: "All rights reserved."
  },
  zh: {
    eyebrow: "YiWu DiYaSi",
    brandDesc:
      "\u9762\u5411 DTC\u3001\u96f6\u552e\u548c\u6279\u53d1\u54c1\u724c\u7684\u5185\u8863\u8d34\u724c\u5de5\u5382\uff0c\u652f\u6301\u9762\u6599\u9009\u62e9\u3001\u6253\u6837\u3001\u5b9a\u5236\u5305\u88c5\u548c\u5927\u8d27\u4ea4\u4ed8\u3002",
    ctaTitle: "\u4ece\u5de5\u5382\u56e2\u961f\u5f00\u59cb\u4f60\u7684\u5185\u8863\u8d34\u724c\u9879\u76ee",
    ctaDesc:
      "\u53d1\u9001\u54c1\u7c7b\u3001\u76ee\u6807\u5e02\u573a\u3001\u6570\u91cf\u533a\u95f4\u3001\u5305\u88c5\u9700\u6c42\u548c\u4e0a\u5e02\u65f6\u95f4\uff0c\u6211\u4eec\u4f1a\u56de\u590d\u53ef\u6267\u884c\u7684 MOQ \u548c\u6253\u6837\u8def\u5f84\u3002",
    ctaPrimary: "\u53d1\u8d77\u9879\u76ee",
    ctaSecondary: "\u67e5\u770b\u4ea7\u54c1",
    quickTitle: "\u516c\u53f8",
    productTitle: "\u7cfb\u5217",
    supportTitle: "\u670d\u52a1",
    contactTitle: "\u8054\u7cfb",
    rights: "\u4fdd\u7559\u6240\u6709\u6743\u5229\u3002"
  },
  es: {
    eyebrow: "YiWu DiYaSi",
    brandDesc:
      "Fabricante private label de intimates para marcas DTC, retail y wholesale, desde tejido y muestra hasta empaque custom y entrega bulk.",
    ctaTitle: "Inicia tu proyecto private label con un equipo de fabrica real",
    ctaDesc:
      "Envia categoria, mercado objetivo, cantidad, empaque y timing. Responderemos con una ruta practica de muestra y MOQ.",
    ctaPrimary: "Iniciar Proyecto",
    ctaSecondary: "Ver Colecciones",
    quickTitle: "Empresa",
    productTitle: "Colecciones",
    supportTitle: "Servicios",
    contactTitle: "Contacto",
    rights: "Todos los derechos reservados."
  }
};

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/factory", label: "Factory & Quality" },
  { href: "/sustainability", label: "Sustainability" },
  { href: "/contact", label: "Contact" }
];

const serviceLinks = [
  { href: "/oem-odm", label: "Private Label Services" },
  { href: "/packaging", label: "Custom Labels & Packaging" },
  { href: "/fabrics", label: "Fabrics" },
  { href: "/resources", label: "Resources" }
];

const bottomLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/return-policy", label: "Return Policy" }
];

export default function SiteFooter({ initialLang }: SiteFooterProps) {
  const t = copy[initialLang];
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer-shell mt-16">
      <div className="border-b border-[rgba(154,97,70,0.18)]">
        <div className="home-full-bleed-shell py-9">
          <section className="site-footer-panel grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="kicker text-[#9e5637]">{t.eyebrow}</p>
              <h2 className="mt-2 font-[Arial] text-[26px] font-bold leading-[1.2] text-[#1d2521]">
                {t.ctaTitle}
              </h2>
              <p className="mt-3 max-w-3xl font-[Arial] text-[14px] leading-[1.8] text-[#5f6b66]">
                {t.ctaDesc}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/contact" className="btn btn-primary site-footer-btn-primary">
                {t.ctaPrimary}
              </Link>
              <Link href="/products" className="btn site-footer-btn-secondary">
                {t.ctaSecondary}
              </Link>
            </div>
          </section>
        </div>
      </div>

      <div className="home-full-bleed-shell py-9">
        <section className="grid gap-8 lg:grid-cols-[1.05fr_1fr_1fr_1.15fr] lg:gap-10">
          <div className="pr-4">
            <p className="font-[Arial] text-[24px] font-bold leading-none text-[#1d2521]">YiWu DiYaSi</p>
            <p className="mt-3 max-w-md font-[Arial] text-[14px] leading-[1.8] text-[#5f6b66]">{t.brandDesc}</p>
          </div>

          <div>
            <p className="site-footer-heading">{t.quickTitle}</p>
            <div className="mt-3 grid gap-2.5">
              {companyLinks.map((item) => (
                <Link key={item.href} href={item.href} className="site-footer-link">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="site-footer-heading">{t.productTitle}</p>
            <div className="mt-3 grid gap-2.5">
              {launchCollections.slice(0, 6).map((item) => (
                <Link key={item.href} href={item.href} className="site-footer-link">
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="site-footer-heading">{t.supportTitle}</p>
            <div className="mt-3 grid gap-2.5">
              {serviceLinks.map((item) => (
                <Link key={item.href} href={item.href} className="site-footer-link">
                  {item.label}
                </Link>
              ))}
            </div>
            <p className="site-footer-heading mt-6">{t.contactTitle}</p>
            <div className="mt-3 grid gap-2.5">
              <p className="site-footer-contact-value">{companyInfo.emailPrimary}</p>
              <p className="site-footer-contact-value">{companyInfo.phone}</p>
              <p className="site-footer-contact-value">{companyInfo.address}</p>
            </div>
          </div>
        </section>
      </div>

      <div className="border-t border-[rgba(154,97,70,0.18)]">
        <div className="home-full-bleed-shell flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
          <p className="font-[Arial] text-[12px] text-[#7d8a85]">
            (c) {year} {companyInfo.name}. {t.rights}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {bottomLinks.map((item) => (
              <Link key={item.href} href={item.href} className="site-footer-bottom-link">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
