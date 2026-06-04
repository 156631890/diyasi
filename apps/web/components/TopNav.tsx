"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { LANG_LABELS, SiteLang } from "@/lib/i18n";

type LinkItem = { href: string; label: string };

const labels: Record<
  SiteLang,
  {
    home: string;
    about: string;
    products: string;
    privateLabel: string;
    sustainability: string;
    factory: string;
    fabrics: string;
    resources: string;
    contact: string;
    cta: string;
    companyTag: string;
  }
> = {
  en: {
    home: "Home",
    about: "About",
    products: "Products",
    privateLabel: "Private Label",
    sustainability: "Sustainability",
    factory: "Factory & Quality",
    fabrics: "Fabrics",
    resources: "Resources",
    contact: "Contact",
    cta: "Start a Project",
    companyTag: "Private label underwear manufacturer for brands, retailers, and wholesale buyers"
  },
  zh: {
    home: "\u9996\u9875",
    about: "\u5173\u4e8e\u6211\u4eec",
    products: "\u4ea7\u54c1",
    privateLabel: "\u8d34\u724c\u5b9a\u5236",
    sustainability: "\u53ef\u6301\u7eed",
    factory: "\u5de5\u5382\u4e0e\u8d28\u91cf",
    fabrics: "\u9762\u6599",
    resources: "\u8d44\u6e90",
    contact: "\u8054\u7cfb",
    cta: "\u53d1\u8d77\u9879\u76ee",
    companyTag: "\u9762\u5411 DTC\u3001\u96f6\u552e\u548c\u6279\u53d1\u54c1\u724c\u7684\u5185\u8863\u8d34\u724c\u5de5\u5382"
  },
  es: {
    home: "Inicio",
    about: "Nosotros",
    products: "Productos",
    privateLabel: "Marca Propia",
    sustainability: "Sostenibilidad",
    factory: "F\u00e1brica y Calidad",
    fabrics: "Tejidos",
    resources: "Recursos",
    contact: "Contacto",
    cta: "Iniciar Proyecto",
    companyTag: "Fabricante de ropa interior para marca propia, retail y mayoristas"
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
  const [isCompact, setIsCompact] = useState(false);
  const t = labels[lang];

  const primaryLinks: LinkItem[] = [
    { href: "/", label: t.home },
    { href: "/products", label: t.products },
    { href: "/oem-odm", label: t.privateLabel },
    { href: "/factory", label: t.factory },
    { href: "/fabrics", label: t.fabrics },
    { href: "/resources", label: t.resources },
    { href: "/about", label: t.about },
    { href: "/contact", label: t.contact }
  ];

  const secondaryLinks: LinkItem[] = [
    { href: "/sustainability", label: t.sustainability },
    { href: "/contact", label: t.cta }
  ];

  function onLanguageChange(nextLang: SiteLang) {
    setLang(nextLang);
    document.cookie = `site_lang=${nextLang}; Path=/; Max-Age=31536000; SameSite=Lax`;
    document.documentElement.lang = nextLang;
    router.refresh();
  }

  useEffect(() => {
    const updateCompactState = () => {
      setIsCompact(window.scrollY > 40);
    };

    updateCompactState();
    window.addEventListener("scroll", updateCompactState, { passive: true });
    return () => window.removeEventListener("scroll", updateCompactState);
  }, []);

  return (
    <header className={`top-nav-shell sticky top-0 z-30 backdrop-blur-xl ${isCompact ? "top-nav-shell-compact" : ""}`}>
      <div className="top-nav-meta-shell hidden lg:block">
        <div className="container-shell top-nav-wide-shell flex items-center justify-between py-2 text-xs">
          <p className="top-nav-meta-copy font-semibold tracking-normal">{t.companyTag}</p>
          <div className="flex items-center gap-1">
            {secondaryLinks.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass(pathname, item.href)}>
                {item.label}
              </Link>
            ))}
            <select
              className="top-nav-select ml-2 rounded-full px-3 py-1 text-xs"
              value={lang}
              aria-label="Select language"
              onChange={(event) => onLanguageChange(event.target.value as SiteLang)}
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

      <div className="container-shell top-nav-wide-shell flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3">
          <span
            className={`top-nav-brand-badge grid place-items-center rounded-full text-xs font-bold text-white ${
              isCompact ? "top-nav-brand-badge-compact" : ""
            }`}
          >
            DYS
          </span>
          <span className={`top-nav-brand-name heading-font font-semibold tracking-normal ${isCompact ? "text-lg" : "text-xl"}`}>
            YiWu DiYaSi
          </span>
        </Link>

        <nav className="hidden items-center gap-3 text-sm lg:flex xl:gap-4">
          {primaryLinks.map((item) => (
            <Link key={item.href} href={item.href} className={`${linkClass(pathname, item.href)} nav-link-primary`}>
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
            aria-label="Select language"
            onChange={(event) => onLanguageChange(event.target.value as SiteLang)}
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
