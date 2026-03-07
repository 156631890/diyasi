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
    brandDesc: "YiWu DiYaSi Dress CO., LTD. Private-label underwear manufacturing shaped by disciplined execution, material sensitivity, and long-term delivery confidence.",
    ctaTitle: "A quieter, stronger manufacturing partner for your next collection",
    ctaDesc: "From first sample direction to stable bulk delivery, we help brands build collections with more clarity and less friction.",
    ctaPrimary: "Start a Conversation",
    ctaSecondary: "View Categories",
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
      { href: "/blog", label: "Journal" },
      { href: "/payments", label: "Payments" },
      { href: "/admin", label: "Admin" }
    ],
    contactTitle: "Contact",
    rights: "All rights reserved."
  },
  zh: {
    brandDesc: "义乌迪雅斯服饰有限公司。以更稳定的执行、更成熟的面料判断和更长期的交付信心，服务高端 private-label 内衣制造。",
    ctaTitle: "为下一季系列，选择更克制也更可靠的制造合作方",
    ctaDesc: "从样品方向到稳定量产，我们帮助品牌以更清晰的节奏推进产品，而不是被流程拖拽。",
    ctaPrimary: "开始沟通",
    ctaSecondary: "查看分类",
    navTitle: "网站导航",
    navItems: [
      { href: "/", label: "首页" },
      { href: "/about", label: "关于我们" },
      { href: "/products", label: "产品" },
      { href: "/contact", label: "联系" }
    ],
    capabilityTitle: "能力模块",
    capabilityItems: [
      { href: "/oem-odm", label: "OEM / ODM" },
      { href: "/sustainability", label: "可持续" },
      { href: "/factory", label: "工厂" }
    ],
    resourceTitle: "资源",
    resourceItems: [
      { href: "/blog", label: "文章" },
      { href: "/payments", label: "支付" },
      { href: "/admin", label: "后台" }
    ],
    contactTitle: "联系方式",
    rights: "保留所有权利。"
  },
  es: {
    brandDesc: "YiWu DiYaSi Dress CO., LTD. Manufactura private-label de ropa interior guiada por ejecucion disciplinada, criterio textil y confianza real de entrega.",
    ctaTitle: "Un socio de manufactura mas sereno y mas solido para tu siguiente coleccion",
    ctaDesc: "Desde la direccion de muestra hasta la entrega masiva estable, ayudamos a las marcas a avanzar con mas claridad y menos friccion.",
    ctaPrimary: "Iniciar Conversacion",
    ctaSecondary: "Ver Categorias",
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
      { href: "/blog", label: "Journal" },
      { href: "/payments", label: "Pagos" },
      { href: "/admin", label: "Admin" }
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
        <section className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#152845] via-[#11213b] to-[#1a3153] p-6 md:p-8 lg:p-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="kicker text-[#f3d7a1]">YiWu DiYaSi</p>
              <h2 className="heading-font mt-2 text-3xl font-semibold text-white md:text-4xl">{t.ctaTitle}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">{t.ctaDesc}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary text-sm">{t.ctaPrimary}</Link>
              <Link href="/products" className="btn bg-white text-sm text-[#102949]">{t.ctaSecondary}</Link>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <p className="heading-font text-2xl font-semibold text-white">YiWu DiYaSi</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">{t.brandDesc}</p>
            <div className="mt-5 grid gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
              <p>Sampling 5-7 days</p>
              <p>Production 20-30 days</p>
              <p>MOQ 300-500 pcs</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#f3d7a1]">{t.navTitle}</p>
            <div className="mt-3 grid gap-2 text-sm">
              {t.navItems.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-lg px-2 py-1 hover:bg-white/10 hover:text-white">{item.label}</Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#f3d7a1]">{t.capabilityTitle}</p>
            <div className="mt-3 grid gap-2 text-sm">
              {t.capabilityItems.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-lg px-2 py-1 hover:bg-white/10 hover:text-white">{item.label}</Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#f3d7a1]">{t.resourceTitle}</p>
            <div className="mt-3 grid gap-2 text-sm">
              {t.resourceItems.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-lg px-2 py-1 hover:bg-white/10 hover:text-white">{item.label}</Link>
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
            <Link href="/sustainability" className="hover:text-white">Sustainability</Link>
            <Link href="/factory" className="hover:text-white">Factory</Link>
            <Link href="/admin" className="hover:text-white">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
