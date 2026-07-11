"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { LANG_LABELS, SiteLang } from "@/lib/i18n";
import { localeHref, localeSwitchHref } from "@/lib/locale-routes";

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
    journal: string;
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
    journal: "Journal",
    contact: "Contact",
    cta: "Start a Project",
    companyTag: "Private label underwear manufacturer for brands, retailers, and wholesale buyers"
  },
  zh: {
    home: "首页",
    about: "关于我们",
    products: "产品",
    privateLabel: "贴牌定制",
    sustainability: "可持续",
    factory: "工厂与质量",
    fabrics: "面料",
    resources: "资源",
    journal: "博客",
    contact: "联系",
    cta: "发起项目",
    companyTag: "面向 DTC、零售和批发品牌的内衣贴牌工厂"
  },
  es: {
    home: "Inicio",
    about: "Nosotros",
    products: "Productos",
    privateLabel: "Marca Propia",
    sustainability: "Sostenibilidad",
    factory: "Fábrica y Calidad",
    fabrics: "Tejidos",
    resources: "Recursos",
    journal: "Blog",
    contact: "Contacto",
    cta: "Iniciar Proyecto",
    companyTag: "Fabricante de ropa interior for marca propia, retail y mayoristas"
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = labels[lang];
  const localizedHref = (englishPath: string) => (lang === "es" ? localeHref("es", englishPath) : englishPath);
  const homeHref = localizedHref("/") ?? "/";
  const contactHref = localizedHref("/contact") ?? "/contact";

  const primaryLinks = [
    { href: "/", label: t.home },
    { href: "/products", label: t.products },
    { href: "/oem-odm", label: t.privateLabel },
    { href: "/factory", label: t.factory },
    { href: "/fabrics", label: t.fabrics },
    { href: "/resources", label: t.resources },
    { href: "/blog", label: t.journal },
    { href: "/about", label: t.about },
    { href: "/contact", label: t.contact }
  ]
    .map((item) => ({ ...item, href: localizedHref(item.href) }))
    .filter((item): item is LinkItem => Boolean(item.href));

  const secondaryLinks = [
    { href: "/sustainability", label: t.sustainability },
    { href: "/contact", label: t.cta }
  ]
    .map((item) => ({ ...item, href: localizedHref(item.href) }))
    .filter((item): item is LinkItem => Boolean(item.href));

  function onLanguageChange(nextLang: SiteLang) {
    setLang(nextLang);
    document.cookie = `site_lang=${nextLang}; Path=/; Max-Age=31536000; SameSite=Lax`;
    document.documentElement.lang = nextLang;
    setIsMenuOpen(false);
    const targetPath = localeSwitchHref(nextLang === "es" ? "es" : "en", pathname);

    if (targetPath && targetPath !== pathname) {
      router.push(targetPath);
      return;
    }

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

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className={`top-nav-shell sticky top-0 z-30 backdrop-blur-xl ${isCompact ? "top-nav-shell-compact" : ""}`}>
      {/* Desktop Top Meta Bar */}
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

      {/* Main Nav Bar */}
      <div className="container-shell top-nav-wide-shell flex items-center justify-between py-3">
        <Link href={homeHref} className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
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

        {/* Desktop Primary Links */}
        <nav aria-label="Main navigation" className="hidden items-center gap-3 text-sm lg:flex xl:gap-4">
          {primaryLinks.map((item) => (
            <Link key={item.href} href={item.href} className={`${linkClass(pathname, item.href)} nav-link-primary`}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link href={contactHref} className="btn btn-primary top-nav-cta hidden text-sm lg:inline-flex">
          {t.cta}
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d9e2dc] bg-[#fffdf8] text-[#1d2521] shadow-sm transition hover:bg-[#eef3ee] lg:hidden"
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? (
            // Close SVG Icon
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            // Menu SVG Icon
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-x-0 bottom-0 top-[60px] z-50 glass-panel flex flex-col p-6 overflow-y-auto lg:hidden">
          {/* Mobile Primary Links */}
          <nav className="flex flex-col gap-4 text-lg font-bold text-[#1d2521]" aria-label="Mobile navigation">
            {primaryLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`pb-2 border-b border-[#d9e2dc]/40 ${linkClass(pathname, item.href)}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Secondary & CTA */}
          <div className="mt-8 flex flex-col gap-5">
            {lang !== "es" ? (
              <Link
                href="/sustainability"
                className="text-sm font-semibold text-[#5f6b66] hover:text-[#0e5b51]"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.sustainability}
              </Link>
            ) : null}
            <Link
              href={contactHref}
              className="btn btn-primary w-full text-center py-3.5 text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.cta}
            </Link>

            {/* Mobile Language Switcher */}
            <div className="mt-6 flex items-center justify-between border-t border-[#d9e2dc]/60 pt-6">
              <span className="text-sm font-semibold text-[#5f6b66]">Language / 语言 / Idioma</span>
              <select
                className="top-nav-select rounded-full px-4 py-2 text-sm bg-white border border-[#d9e2dc]"
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
      )}
    </header>
  );
}
