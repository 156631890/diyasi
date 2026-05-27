import Link from "next/link";

import { SiteLang } from "@/lib/i18n";

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
  quickItems: Array<{ href: string; label: string }>;
  productTitle: string;
  productItems: Array<{ href: string; label: string }>;
  supportTitle: string;
  supportItems: Array<{ href: string; label: string }>;
  contactTitle: string;
  contactRows: Array<{ label: string; value: string }>;
  rights: string;
  bottomLinks: Array<{ href: string; label: string }>;
};

const copy: Record<SiteLang, FooterCopy> = {
  en: {
    eyebrow: "YiWu DiYaSi",
    brandDesc:
      "Diyasi helps startup founders, creators, boutiques, and DTC stores launch underwear brands with Starter Kits, ready-stock testing, packaging direction, and fulfillment support.",
    ctaTitle: "Get a Starter Kit recommendation before you invest in bulk inventory",
    ctaDesc:
      "Share your audience, channel, style direction, budget, and launch timeline. Diyasi will recommend a practical Starter Kit and validation path.",
    ctaPrimary: "Get Starter Kit Recommendation",
    ctaSecondary: "View Starter Kits",
    quickTitle: "Quick Links",
    quickItems: [
      { href: "/", label: "Home" },
      { href: "/starter-kits", label: "Starter Kits" },
      { href: "/validation-system", label: "Validation System" },
      { href: "/brand-quiz", label: "Brand Quiz" }
    ],
    productTitle: "Platform",
    productItems: [
      { href: "/founder-academy", label: "Founder Academy" },
      { href: "/fulfillment-proof", label: "Fulfillment Proof" },
      { href: "/comparison-hub", label: "Comparison Hub" },
      { href: "/contact", label: "Contact" }
    ],
    supportTitle: "Support",
    supportItems: [
      { href: "/payments", label: "Payments" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/return-policy", label: "Return Policy" }
    ],
    contactTitle: "Contact Us",
    contactRows: [
      { label: "Email", value: "imbella.vicky@diyasidress.com" },
      { label: "Tel", value: "+86-18042579030" },
      { label: "Fax", value: "+86-579-85569925" },
      { label: "Address", value: "NO.16 DaShi Road, FoTang Town, Yiwu, Zhejiang, China" }
    ],
    rights: "All rights reserved.",
    bottomLinks: [
      { href: "/contact", label: "Contact" },
      { href: "/comparison-hub", label: "Comparison Hub" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/return-policy", label: "Return Policy" }
    ]
  },
  zh: {
    eyebrow: "Diyasi",
    brandDesc: "Diyasi helps startup founders, creators, boutiques, and DTC stores launch underwear brands with Starter Kits, ready-stock testing, packaging direction, and fulfillment support.",
    ctaTitle: "Get a Starter Kit recommendation before you invest in bulk inventory",
    ctaDesc: "Share your audience, channel, style direction, budget, and launch timeline. Diyasi will recommend a practical Starter Kit and validation path.",
    ctaPrimary: "Get Starter Kit Recommendation",
    ctaSecondary: "View Starter Kits",
    quickTitle: "快捷导航",
    quickItems: [
      { href: "/", label: "Home" },
      { href: "/starter-kits", label: "Starter Kits" },
      { href: "/validation-system", label: "Validation System" },
      { href: "/brand-quiz", label: "Brand Quiz" }
    ],
    productTitle: "Platform",
    productItems: [
      { href: "/founder-academy", label: "Founder Academy" },
      { href: "/fulfillment-proof", label: "Fulfillment Proof" },
      { href: "/comparison-hub", label: "Comparison Hub" },
      { href: "/contact", label: "Contact" }
    ],
    supportTitle: "Support",
    supportItems: [
      { href: "/payments", label: "Payments" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/return-policy", label: "Return Policy" }
    ],
    contactTitle: "联系我们",
    contactRows: [
      { label: "邮箱", value: "imbella.vicky@diyasidress.com" },
      { label: "电话", value: "+86-18042579030" },
      { label: "传真", value: "+86-579-85569925" },
      { label: "地址", value: "浙江省义乌市佛堂镇大士路16号" }
    ],
    rights: "保留所有权利。",
    bottomLinks: [
      { href: "/contact", label: "Contact" },
      { href: "/comparison-hub", label: "Comparison Hub" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/return-policy", label: "Return Policy" }
    ]
  },
  es: {
    eyebrow: "Diyasi",
    brandDesc:
      "Diyasi ayuda a founders, creators, boutiques y tiendas DTC a lanzar marcas de ropa interior con Starter Kits, pruebas con ready stock, direccion de packaging y soporte de fulfillment.",
    ctaTitle: "Recibe una recomendacion de Starter Kit antes de invertir en inventario grande",
    ctaDesc:
      "Comparte audiencia, canal, direccion de estilo, presupuesto y calendario. Diyasi recomendara un Starter Kit practico y una ruta de validacion.",
    ctaPrimary: "Recibir recomendacion de Starter Kit",
    ctaSecondary: "Ver Starter Kits",
    quickTitle: "Enlaces Rapidos",
    quickItems: [
      { href: "/", label: "Inicio" },
      { href: "/starter-kits", label: "Starter Kits" },
      { href: "/validation-system", label: "Sistema de Validacion" },
      { href: "/brand-quiz", label: "Brand Quiz" }
    ],
    productTitle: "Platform",
    productItems: [
      { href: "/founder-academy", label: "Founder Academy" },
      { href: "/fulfillment-proof", label: "Fulfillment Proof" },
      { href: "/comparison-hub", label: "Comparison Hub" },
      { href: "/contact", label: "Contacto" }
    ],
    supportTitle: "Soporte",
    supportItems: [
      { href: "/payments", label: "Pagos" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/return-policy", label: "Return Policy" }
    ],
    contactTitle: "Contacto",
    contactRows: [
      { label: "Email", value: "imbella.vicky@diyasidress.com" },
      { label: "Tel", value: "+86-18042579030" },
      { label: "Fax", value: "+86-579-85569925" },
      { label: "Direccion", value: "NO.16 DaShi Road, FoTang Town, Yiwu, Zhejiang, China" }
    ],
    rights: "Todos los derechos reservados.",
    bottomLinks: [
      { href: "/contact", label: "Contacto" },
      { href: "/comparison-hub", label: "Comparison Hub" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/return-policy", label: "Return Policy" }
    ]
  }
};

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
              <h2 className="mt-2 font-[Arial] text-[26px] font-bold leading-[1.2] text-[#5a2f1e]">
                {t.ctaTitle}
              </h2>
              <p className="mt-3 max-w-3xl font-[Arial] text-[14px] leading-[1.8] text-[#7c6357]">
                {t.ctaDesc}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/contact" className="btn btn-primary site-footer-btn-primary">
                {t.ctaPrimary}
              </Link>
              <Link href="/starter-kits" className="btn site-footer-btn-secondary">
                {t.ctaSecondary}
              </Link>
            </div>
          </section>
        </div>
      </div>

      <div className="home-full-bleed-shell py-9">
        <section className="grid gap-8 lg:grid-cols-[1.05fr_1fr_1.1fr] lg:gap-12">
          <div className="pr-4">
            <p className="font-[Arial] text-[24px] font-bold leading-none text-[#5a2f1e]">YiWu DiYaSi</p>
            <p className="mt-3 max-w-md font-[Arial] text-[14px] leading-[1.8] text-[#7c6357]">{t.brandDesc}</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="site-footer-heading">{t.quickTitle}</p>
              <div className="mt-3 grid gap-2.5">
                {t.quickItems.map((item) => (
                  <Link key={item.href} href={item.href} className="site-footer-link">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="site-footer-heading">{t.productTitle}</p>
              <div className="mt-3 grid gap-2.5">
                {t.productItems.map((item) => (
                  <Link key={item.href} href={item.href} className="site-footer-link">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="site-footer-heading">{t.supportTitle}</p>
              <div className="mt-3 grid gap-2.5">
                {t.supportItems.map((item) => (
                  <Link key={item.href} href={item.href} className="site-footer-link">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="site-footer-heading">{t.contactTitle}</p>
            <div className="mt-3 grid gap-2.5">
              {t.contactRows.map((row) => (
                <div key={row.label} className="site-footer-contact-row">
                  <p className="site-footer-label site-footer-contact-key">{row.label}</p>
                  <p className="site-footer-contact-value">{row.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="border-t border-[rgba(154,97,70,0.18)]">
        <div className="home-full-bleed-shell flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
          <p className="font-[Arial] text-[12px] text-[#9d7d6f]">
            (c) {year} YiWu DiYaSi Dress CO., LTD. {t.rights}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {t.bottomLinks.map((item) => (
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
