import Link from "next/link";
import { SiteLang } from "@/lib/i18n";

type SiteFooterProps = {
  initialLang: SiteLang;
};

type FooterCopy = {
  brandDesc: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaPrimary: string;
  ctaSecondary: string;
  navTitle: string;
  navItems: Array<{ href: string; label: string }>;
  capabilityTitle: string;
  capabilityItems: Array<{ href: string; label: string }>;
  resourceTitle: string;
  resourceItems: Array<{ href: string; label: string }>;
  contactTitle: string;
  rights: string;
};

const copy: Record<SiteLang, FooterCopy> = {
  en: {
    brandDesc:
      "YiWu DiYaSi Dress CO., LTD. Sustainable premium underwear manufacturing with 23+ years of OEM/ODM execution experience.",
    ctaTitle: "Build your next underwear collection with a reliable factory partner",
    ctaDesc: "From product development to bulk delivery, our team supports every stage with quality, speed, and consistency.",
    ctaPrimary: "Start Project",
    ctaSecondary: "View Products",
    navTitle: "Navigation",
    navItems: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/products", label: "Products" },
      { href: "/contact", label: "Contact" }
    ],
    capabilityTitle: "Capabilities",
    capabilityItems: [
      { href: "/oem-odm", label: "OEM / ODM" },
      { href: "/sustainability", label: "Sustainability" },
      { href: "/factory", label: "Factory" }
    ],
    resourceTitle: "Resources",
    resourceItems: [
      { href: "/blog", label: "Blog" },
      { href: "/admin", label: "Admin" },
      { href: "/checkout/mock", label: "Payment Framework" }
    ],
    contactTitle: "Contact",
    rights: "All rights reserved."
  },
  zh: {
    brandDesc: "\u4e49\u4e4c\u8fea\u4e9a\u65af\u670d\u9970\u6709\u9650\u516c\u53f8\u300223+\u5e74 OEM/ODM \u7ecf\u9a8c\uff0c\u4e13\u6ce8\u53ef\u6301\u7eed\u9ad8\u54c1\u8d28\u5185\u8863\u5236\u9020\u4e0e\u4ea4\u4ed8\u3002",
    ctaTitle: "\u4e0e\u7a33\u5b9a\u53ef\u9760\u7684\u5de5\u5382\u5408\u4f5c\uff0c\u6253\u9020\u4f60\u7684\u4e0b\u4e00\u4e2a\u5185\u8863\u7cfb\u5217",
    ctaDesc: "\u4ece\u4ea7\u54c1\u5f00\u53d1\u3001\u6253\u6837\u5230\u5927\u8d27\u4ea4\u4ed8\uff0c\u5168\u7a0b\u4fdd\u969c\u8d28\u91cf\u4e0e\u65f6\u6548\u3002",
    ctaPrimary: "\u542f\u52a8\u9879\u76ee",
    ctaSecondary: "\u67e5\u770b\u4ea7\u54c1",
    navTitle: "\u7f51\u7ad9\u5bfc\u822a",
    navItems: [
      { href: "/", label: "\u9996\u9875" },
      { href: "/about", label: "\u5173\u4e8e\u6211\u4eec" },
      { href: "/products", label: "\u4ea7\u54c1" },
      { href: "/contact", label: "\u8054\u7cfb\u6211\u4eec" }
    ],
    capabilityTitle: "\u80fd\u529b\u6a21\u5757",
    capabilityItems: [
      { href: "/oem-odm", label: "OEM / ODM" },
      { href: "/sustainability", label: "\u53ef\u6301\u7eed" },
      { href: "/factory", label: "\u5de5\u5382" }
    ],
    resourceTitle: "\u8d44\u6e90",
    resourceItems: [
      { href: "/blog", label: "\u535a\u5ba2" },
      { href: "/admin", label: "\u540e\u53f0" },
      { href: "/checkout/mock", label: "\u652f\u4ed8\u6846\u67b6" }
    ],
    contactTitle: "\u8054\u7cfb\u65b9\u5f0f",
    rights: "\u4fdd\u7559\u6240\u6709\u6743\u5229\u3002"
  },
  es: {
    brandDesc:
      "YiWu DiYaSi Dress CO., LTD. Manufactura premium sostenible de ropa interior con mas de 23 anos de experiencia OEM/ODM.",
    ctaTitle: "Construye tu siguiente coleccion con una fabrica confiable",
    ctaDesc: "Desde desarrollo de producto hasta entrega masiva, apoyamos cada etapa con calidad y consistencia.",
    ctaPrimary: "Iniciar Proyecto",
    ctaSecondary: "Ver Productos",
    navTitle: "Navegacion",
    navItems: [
      { href: "/", label: "Inicio" },
      { href: "/about", label: "Nosotros" },
      { href: "/products", label: "Productos" },
      { href: "/contact", label: "Contacto" }
    ],
    capabilityTitle: "Capacidades",
    capabilityItems: [
      { href: "/oem-odm", label: "OEM / ODM" },
      { href: "/sustainability", label: "Sostenibilidad" },
      { href: "/factory", label: "Fabrica" }
    ],
    resourceTitle: "Recursos",
    resourceItems: [
      { href: "/blog", label: "Blog" },
      { href: "/admin", label: "Admin" },
      { href: "/checkout/mock", label: "Framework de Pago" }
    ],
    contactTitle: "Contacto",
    rights: "Todos los derechos reservados."
  }
};

export default function SiteFooter({ initialLang }: SiteFooterProps) {
  const t = copy[initialLang];
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-slate-200 bg-[#0f1b2d] text-slate-200">
      <div className="container-shell py-10">
        <section className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#152845] via-[#11213b] to-[#1a3153] p-6 md:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="kicker text-[#f3d7a1]">YiWu DiYaSi</p>
              <h2 className="heading-font mt-2 text-3xl font-semibold text-white md:text-4xl">{t.ctaTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{t.ctaDesc}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary text-sm">
                {t.ctaPrimary}
              </Link>
              <Link href="/products" className="btn bg-white text-sm text-[#102949]">
                {t.ctaSecondary}
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <p className="heading-font text-2xl font-semibold text-white">YiWu DiYaSi</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">{t.brandDesc}</p>
            <div className="mt-5 grid gap-2 text-xs text-slate-400">
              <p>Sampling: 5-7 days</p>
              <p>Production: 20-30 days</p>
              <p>MOQ: 300-500 pcs</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#f3d7a1]">{t.navTitle}</p>
            <div className="mt-3 grid gap-2 text-sm">
              {t.navItems.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-lg px-2 py-1 hover:bg-white/10 hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#f3d7a1]">{t.capabilityTitle}</p>
            <div className="mt-3 grid gap-2 text-sm">
              {t.capabilityItems.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-lg px-2 py-1 hover:bg-white/10 hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#f3d7a1]">{t.resourceTitle}</p>
            <div className="mt-3 grid gap-2 text-sm">
              {t.resourceItems.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-lg px-2 py-1 hover:bg-white/10 hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
            <p className="mt-4 text-sm font-semibold text-white">{t.contactTitle}</p>
            <p className="mt-1 text-sm text-slate-300">sales@diyasidress.com</p>
            <p className="text-sm text-slate-300">Yiwu, Zhejiang, China</p>
          </div>
        </section>
      </div>

      <div className="border-t border-white/10">
        <div className="container-shell flex flex-col items-center justify-between gap-3 py-4 text-xs text-slate-400 md:flex-row">
          <p>(c) {year} YiWu DiYaSi Dress CO., LTD. {t.rights}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/sustainability" className="hover:text-white">
              Sustainability
            </Link>
            <Link href="/factory" className="hover:text-white">
              Factory
            </Link>
            <Link href="/admin" className="hover:text-white">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
