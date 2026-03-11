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
      "Private-label underwear manufacturing shaped by disciplined execution, commercial clarity, and stable delivery confidence.",
    ctaTitle: "Build with a factory that reads clearly before the first call",
    ctaDesc:
      "Use the footer like a final decision point: review categories, reach the factory team, or move directly into inquiry.",
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
      { label: "Email", value: "sales@diyasidress.com" },
      { label: "Address", value: "Yiwu, Zhejiang, China" },
      { label: "Lead Time", value: "Sampling 5-7 days / Bulk 20-30 days" }
    ],
    rights: "All rights reserved.",
    bottomLinks: [
      { href: "/products", label: "Products" },
      { href: "/contact", label: "Inquiry" },
      { href: "/payments", label: "Payments" }
    ]
  },
  zh: {
    eyebrow: "义乌迪雅斯",
    brandDesc:
      "以更稳定的执行、更清晰的商业表达和更可靠的交付节奏，支持 private-label 内衣制造合作。",
    ctaTitle: "让买家在页脚也能快速完成判断与联系",
    ctaDesc:
      "页脚不只是收尾，而是最后一个转化节点：继续看分类、直接联系工厂，或进入正式询盘。",
    ctaPrimary: "开始沟通",
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
      { href: "/products?category=Gym%20%26%20Sports%20Wear", label: "运动服" }
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
      { label: "邮箱", value: "sales@diyasidress.com" },
      { label: "地址", value: "中国浙江义乌" },
      { label: "周期", value: "打样 5-7 天 / 大货 20-30 天" }
    ],
    rights: "保留所有权利。",
    bottomLinks: [
      { href: "/products", label: "产品" },
      { href: "/contact", label: "询盘" },
      { href: "/payments", label: "支付" }
    ]
  },
  es: {
    eyebrow: "YiWu DiYaSi",
    brandDesc:
      "Manufactura private-label de ropa interior guiada por ejecucion disciplinada, claridad comercial y confianza real de entrega.",
    ctaTitle: "Un footer que todavia ayuda a decidir y contactar",
    ctaDesc:
      "El cierre de pagina tambien debe convertir: revisar categorias, contactar la fabrica o avanzar hacia una consulta concreta.",
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
      { label: "Email", value: "sales@diyasidress.com" },
      { label: "Direccion", value: "Yiwu, Zhejiang, China" },
      { label: "Lead Time", value: "Muestra 5-7 dias / Produccion 20-30 dias" }
    ],
    rights: "Todos los derechos reservados.",
    bottomLinks: [
      { href: "/products", label: "Productos" },
      { href: "/contact", label: "Consulta" },
      { href: "/payments", label: "Pagos" }
    ]
  }
};

export default function SiteFooter({ initialLang }: SiteFooterProps) {
  const t = copy[initialLang];
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-[#18263b] bg-[#0b1523] text-slate-200">
      <div className="border-b border-white/10">
        <div className="home-full-bleed-shell py-9">
          <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="kicker text-[#f3d7a1]">{t.eyebrow}</p>
              <h2 className="mt-2 font-[Arial] text-[26px] font-bold leading-[1.2] text-white">
                {t.ctaTitle}
              </h2>
              <p className="mt-3 max-w-3xl font-[Arial] text-[14px] leading-[1.8] text-slate-300">
                {t.ctaDesc}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/contact" className="btn btn-primary">
                {t.ctaPrimary}
              </Link>
              <Link href="/products" className="btn bg-white text-[#102949]">
                {t.ctaSecondary}
              </Link>
            </div>
          </section>
        </div>
      </div>

      <div className="home-full-bleed-shell py-9">
        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.75fr_0.75fr_0.95fr]">
          <div className="pr-4">
            <p className="font-[Arial] text-[24px] font-bold leading-none text-white">YiWu DiYaSi</p>
            <p className="mt-3 max-w-md font-[Arial] text-[14px] leading-[1.8] text-slate-300">
              {t.brandDesc}
            </p>
          </div>

          <div>
            <p className="font-[Arial] text-[13px] font-bold uppercase tracking-[0.18em] text-[#f3d7a1]">
              {t.quickTitle}
            </p>
            <div className="mt-3 grid gap-2.5">
              {t.quickItems.map((item) => (
                <Link key={item.href} href={item.href} className="font-[Arial] text-[14px] text-slate-300 transition hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="font-[Arial] text-[13px] font-bold uppercase tracking-[0.18em] text-[#f3d7a1]">
              {t.productTitle}
            </p>
            <div className="mt-3 grid gap-2.5">
              {t.productItems.map((item) => (
                <Link key={item.href} href={item.href} className="font-[Arial] text-[14px] text-slate-300 transition hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div>
              <p className="font-[Arial] text-[13px] font-bold uppercase tracking-[0.18em] text-[#f3d7a1]">
                {t.supportTitle}
              </p>
              <div className="mt-3 grid gap-2.5">
                {t.supportItems.map((item) => (
                  <Link key={item.href} href={item.href} className="font-[Arial] text-[14px] text-slate-300 transition hover:text-white">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="font-[Arial] text-[13px] font-bold uppercase tracking-[0.18em] text-[#f3d7a1]">
                {t.contactTitle}
              </p>
              <div className="mt-3 grid gap-3">
                {t.contactRows.map((row) => (
                  <div key={row.label}>
                    <p className="font-[Arial] text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      {row.label}
                    </p>
                    <p className="mt-1 font-[Arial] text-[14px] leading-[1.7] text-slate-300">
                      {row.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="border-t border-white/10">
        <div className="home-full-bleed-shell flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
          <p className="font-[Arial] text-[12px] text-slate-400">
            (c) {year} YiWu DiYaSi Dress CO., LTD. {t.rights}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {t.bottomLinks.map((item) => (
              <Link key={item.href} href={item.href} className="font-[Arial] text-[12px] uppercase tracking-[0.12em] text-slate-400 transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
