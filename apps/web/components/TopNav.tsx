"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { platformNav } from "@/lib/founder-platform";
import { LANG_LABELS, SiteLang } from "@/lib/i18n";

type LinkItem = { href: string; label: string };

const labels: Record<
  SiteLang,
  {
    cta: string;
    companyTag: string;
  }
> = {
  en: {
    cta: "Get Starter Kit Recommendation",
    companyTag: "Founder launch system for startup underwear brands"
  },
  zh: {
    cta: "获取 Starter Kit 推荐",
    companyTag: "面向初创内衣品牌的创始人启动系统"
  },
  es: {
    cta: "Recibir recomendacion de Starter Kit",
    companyTag: "Sistema de lanzamiento para marcas startup de ropa interior"
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

  const primaryLinks: LinkItem[] = platformNav;

  function onLanguageChange(nextLang: SiteLang) {
    setLang(nextLang);
    document.cookie = `site_lang=${nextLang}; Path=/; Max-Age=31536000; SameSite=Lax`;
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
          <p className="top-nav-meta-copy font-semibold tracking-wide">{t.companyTag}</p>
          <div className="flex items-center gap-1">
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

      <div className="container-shell top-nav-wide-shell flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3">
          <span
            className={`top-nav-brand-badge grid place-items-center rounded-full text-xs font-bold text-white ${
              isCompact ? "top-nav-brand-badge-compact" : ""
            }`}
          >
            DYS
          </span>
          <span className={`top-nav-brand-name heading-font font-semibold tracking-wide ${isCompact ? "text-lg" : "text-xl"}`}>
            DIYASI
          </span>
        </Link>

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
