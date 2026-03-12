"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import BrandLogo from "@/components/BrandLogo";
import { LANG_LABELS, SiteLang } from "@/lib/i18n";

type LinkItem = { href: string; label: string };

const labels: Record<
  SiteLang,
  {
    home: string;
    about: string;
    products: string;
    oem: string;
    sustainability: string;
    factory: string;
    blog: string;
    contact: string;
    payments: string;
    admin: string;
    cta: string;
    companyTag: string;
  }
> = {
  en: {
    home: "Home",
    about: "About",
    products: "Products",
    oem: "OEM / ODM",
    sustainability: "Sustainability",
    factory: "Factory",
    blog: "Journal",
    contact: "Contact",
    payments: "Payments",
    admin: "Admin",
    cta: "Start a Conversation",
    companyTag: "Underwear Factory for Wholesalers, Retailers, and DTC Brands"
  },
  zh: {
    home: "首页",
    about: "关于我们",
    products: "产品",
    oem: "OEM / ODM",
    sustainability: "可持续",
    factory: "工厂",
    blog: "文章",
    contact: "联系",
    payments: "支付",
    admin: "后台",
    cta: "开始沟通",
    companyTag: "服务批发商、零售商与 DTC 品牌的内衣工厂"
  },
  es: {
    home: "Inicio",
    about: "Nosotros",
    products: "Productos",
    oem: "OEM / ODM",
    sustainability: "Sostenibilidad",
    factory: "Fabrica",
    blog: "Journal",
    contact: "Contacto",
    payments: "Pagos",
    admin: "Admin",
    cta: "Iniciar Conversacion",
    companyTag: "Fabrica de ropa interior para mayoristas, retailers y marcas DTC"
  }
};

type TopNavProps = {
  initialLang: SiteLang;
};

function linkClass(pathname: string, href: string): string {
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return active ? "nav-link nav-link-active" : "nav-link";
}

export default function TopNav({ initialLang }: TopNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [lang, setLang] = useState<SiteLang>(initialLang);
  const t = labels[lang];

  const primaryLinks: LinkItem[] = [
    { href: "/", label: t.home },
    { href: "/products", label: t.products },
    { href: "/oem-odm", label: t.oem },
    { href: "/blog", label: t.blog },
    { href: "/about", label: t.about },
    { href: "/contact", label: t.contact }
  ];

  const secondaryLinks: LinkItem[] = [
    { href: "/sustainability", label: t.sustainability },
    { href: "/factory", label: t.factory },
    { href: "/payments", label: t.payments },
    { href: "/admin", label: t.admin }
  ];

  function onLanguageChange(nextLang: SiteLang) {
    setLang(nextLang);
    document.cookie = `site_lang=${nextLang}; Path=/; Max-Age=31536000; SameSite=Lax`;
    router.refresh();
  }

  return (
    <header className="top-nav-shell sticky top-0 z-30 backdrop-blur-xl">
      <div className="top-nav-meta-shell hidden lg:block">
        <div className="container-shell flex items-center justify-between py-2 text-xs">
          <p className="top-nav-meta-copy font-semibold tracking-wide">{t.companyTag}</p>
          <div className="flex items-center gap-1">
            {secondaryLinks.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass(pathname, item.href)}>
                {item.label}
              </Link>
            ))}
            <select
              className="top-nav-select ml-2 rounded-full px-3 py-1 text-xs"
              value={lang}
              onChange={(e) => onLanguageChange(e.target.value as SiteLang)}
            >
              {(Object.keys(LANG_LABELS) as SiteLang[]).map((value) => (
                <option key={value} value={value}>
                  {LANG_LABELS[value]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="container-shell flex items-center justify-between py-3">
        <BrandLogo compact />

        <nav className="hidden items-center gap-4 text-sm lg:flex xl:gap-6">
          {primaryLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${linkClass(pathname, item.href)} nav-link-primary`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="btn btn-primary top-nav-cta hidden text-sm lg:inline-flex">
          {t.cta}
        </Link>
      </div>

      <div className="container-shell pb-3 lg:hidden">
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2">
            {secondaryLinks.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass(pathname, item.href)}>
                {item.label}
              </Link>
            ))}
          </div>
          <select
            className="top-nav-select rounded-full px-3 py-1 text-xs"
            value={lang}
            onChange={(e) => onLanguageChange(e.target.value as SiteLang)}
          >
            {(Object.keys(LANG_LABELS) as SiteLang[]).map((value) => (
              <option key={value} value={value}>
                {LANG_LABELS[value]}
              </option>
            ))}
          </select>
        </div>
        <nav className="mt-2 flex gap-2 overflow-x-auto whitespace-nowrap text-xs">
          {primaryLinks.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(pathname, item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
