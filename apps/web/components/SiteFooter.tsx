import Link from "next/link";

import BrandLogo from "@/components/BrandLogo";
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
      "Underwear factory supporting wholesalers, retailers, and DTC brands with private-label development and stable delivery.",
    ctaTitle: "Wholesale, retail, and DTC underwear production with clear MOQ and delivery timing",
    ctaDesc:
      "Browse product categories, send your requirements, and start sampling or OEM / ODM production with the factory team.",
    ctaPrimary: "Start a Conversation",
    ctaSecondary: "View Categories",
    quickTitle: "Quick Links",
    quickItems: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About Us" },
      { href: "/factory", label: "Factory" },
      { href: "/contact", label: "Contact" }
    ],
    productTitle: "Products",
    productItems: [
      { href: "/products?category=Women's%20Panties", label: "Women's Panties" },
      { href: "/products?category=Bras", label: "Bras" },
      { href: "/products?category=Men%20Underwear", label: "Men Underwear" },
      { href: "/products?category=Gym%20%26%20Sports%20Wear", label: "Activewear" }
    ],
    supportTitle: "Support",
    supportItems: [
      { href: "/oem-odm", label: "OEM / ODM" },
      { href: "/payments", label: "Payments" },
      { href: "/blog", label: "Journal" },
      { href: "/sustainability", label: "Sustainability" }
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
      { href: "/about", label: "About US" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/return-policy", label: "Return Policy" }
    ]
  },
  zh: {
    eyebrow: "义乌谛雅思",
    brandDesc: "服务批发商、零售商与 DTC 品牌的内衣工厂，支持贴牌开发与稳定交付。",
    ctaTitle: "提供清晰 MOQ、打样节奏与交期安排的内衣制造合作",
    ctaDesc: "查看产品分类、提交项目需求，或直接发起询盘，推进打样与 OEM / ODM 合作。",
    ctaPrimary: "开始洽谈",
    ctaSecondary: "查看分类",
    quickTitle: "快捷导航",
    quickItems: [
      { href: "/", label: "首页" },
      { href: "/about", label: "关于我们" },
      { href: "/factory", label: "工厂" },
      { href: "/contact", label: "联系" }
    ],
    productTitle: "产品分类",
    productItems: [
      { href: "/products?category=Women's%20Panties", label: "女士内裤" },
      { href: "/products?category=Bras", label: "文胸" },
      { href: "/products?category=Men%20Underwear", label: "男士内裤" },
      { href: "/products?category=Gym%20%26%20Sports%20Wear", label: "运动系列" }
    ],
    supportTitle: "支持",
    supportItems: [
      { href: "/oem-odm", label: "OEM / ODM" },
      { href: "/payments", label: "支付" },
      { href: "/blog", label: "文章" },
      { href: "/sustainability", label: "可持续" }
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
      { href: "/about", label: "关于我们" },
      { href: "/contact", label: "联系" },
      { href: "/privacy-policy", label: "隐私政策" },
      { href: "/return-policy", label: "退换政策" }
    ]
  },
  es: {
    eyebrow: "YiWu DiYaSi",
    brandDesc:
      "Fabrica de ropa interior para mayoristas, retailers y marcas DTC con desarrollo private-label y entrega estable.",
    ctaTitle: "Produccion de ropa interior para mayoristas, retail y marcas DTC con MOQ y entrega claros",
    ctaDesc:
      "Revisa categorias, envia tu brief de proyecto o avanza a una consulta directa para muestreo y OEM / ODM.",
    ctaPrimary: "Iniciar Conversacion",
    ctaSecondary: "Ver Categorias",
    quickTitle: "Enlaces Rapidos",
    quickItems: [
      { href: "/", label: "Inicio" },
      { href: "/about", label: "Nosotros" },
      { href: "/factory", label: "Fabrica" },
      { href: "/contact", label: "Contacto" }
    ],
    productTitle: "Productos",
    productItems: [
      { href: "/products?category=Women's%20Panties", label: "Panties Mujer" },
      { href: "/products?category=Bras", label: "Bras" },
      { href: "/products?category=Men%20Underwear", label: "Underwear Hombre" },
      { href: "/products?category=Gym%20%26%20Sports%20Wear", label: "Activewear" }
    ],
    supportTitle: "Soporte",
    supportItems: [
      { href: "/oem-odm", label: "OEM / ODM" },
      { href: "/payments", label: "Pagos" },
      { href: "/blog", label: "Journal" },
      { href: "/sustainability", label: "Sostenibilidad" }
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
      { href: "/about", label: "About US" },
      { href: "/contact", label: "Contact" },
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
              <Link href="/products" className="btn site-footer-btn-secondary">
                {t.ctaSecondary}
              </Link>
            </div>
          </section>
        </div>
      </div>

      <div className="home-full-bleed-shell py-9">
        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.72fr_0.72fr_1.15fr]">
          <div className="pr-4">
            <BrandLogo href="/" className="site-footer-logo" />
            <p className="mt-3 max-w-md font-[Arial] text-[14px] leading-[1.8] text-[#7c6357]">{t.brandDesc}</p>
          </div>

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

          <div className="grid gap-6">
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
