"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LANG_LABELS, SiteLang } from "@/lib/i18n";
import { useState } from "react";

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
    companyTag: "Private Label Underwear Manufacturing"
  },
  zh: {
    home: "\u9996\u9875",
    about: "\u5173\u4e8e\u6211\u4eec",
    products: "\u4ea7\u54c1",
    oem: "OEM / ODM",
    sustainability: "\u53ef\u6301\u7eed",
    factory: "\u5de5\u5382",
    blog: "\u6587\u7ae0",
    contact: "\u8054\u7cfb",
    payments: "\u652f\u4ed8",
    admin: "\u540e\u53f0",
    cta: "\u5f00\u59cb\u6c9f\u901a",
    companyTag: "\u9ad8\u7aef\u5185\u8863\u5236\u9020"
  },
  es: {
    home: "Inicio",
    about: "Nosotros",
    products: "Productos",
    oem: "OEM / ODM",
    sustainability: "Sostenibilidad",
    factory: "Fábrica",
    blog: "Journal",
    contact: "Contacto",
    payments: "Pagos",
    admin: "Admin",
    cta: "Iniciar Conversación",
    companyTag: "Manufactura private label de ropa interior"
  }
};

type TopNavProps = {
  initialLang: SiteLang;
};

function linkClass(pathname: string, href: string): string {
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return active
      ? "nav-link nav-link-active"
      : "nav-link";
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
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="hidden border-b border-slate-200/80 lg:block">
        <div className="container-shell flex items-center justify-between py-2 text-xs">
          <p className="font-semibold tracking-wide text-[#6a7891]">{t.companyTag}</p>
          <div className="flex items-center gap-1">
            {secondaryLinks.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass(pathname, item.href)}>
                {item.label}
              </Link>
            ))}
            <select
              className="ml-2 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700"
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
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#102949] text-xs font-bold text-white">
            DYS
          </span>
          <span className="heading-font text-xl font-semibold tracking-wide text-[#102949]">YiWu DiYaSi</span>
        </Link>

        <nav className="hidden items-center gap-1 text-sm lg:flex">
          {primaryLinks.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(pathname, item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="btn btn-primary hidden text-sm lg:inline-flex">
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
            className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700"
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
