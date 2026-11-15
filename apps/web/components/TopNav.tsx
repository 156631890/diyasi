"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { alternatesFor, localeHref, localeSwitchHref } from "@/lib/locale-routes";
import type { SiteLang } from "@/lib/i18n";
import { useSampleList } from "./SampleList";
import manufacturerPages from "@/data/manufacturer-nav.json";
import s from "./TopNav.module.css";

function Icon({ type }: { type: "search" | "bag" | "menu" | "close" }) {
  return <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" aria-hidden="true">{type === "search" ? <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></> : type === "bag" ? <><path d="M5 8h14l1 13H4L5 8Z" /><path d="M8 8V6a4 4 0 0 1 8 0v2" /></> : type === "menu" ? <path d="M3 7h18M3 12h18M3 17h18" /> : <path d="m6 6 12 12M6 18 18 6" />}</svg>;
}
const languageNames: Record<string,string> = {en:"English",es:"Español",ru:"Русский",fr:"Français",de:"Deutsch",it:"Italiano"};
const sourcingNames: Record<string,string> = {
 "private-label-underwear-manufacturer":"Fabricante de ropa interior de marca propia",
 "low-moq-underwear-manufacturer":"Fabricación con pedido mínimo reducido",
 "custom-underwear-manufacturer":"Fabricante de ropa interior personalizada",
 "seamless-underwear-manufacturer":"Fabricante de ropa interior sin costuras"
};
export default function TopNav({ initialLang }: { initialLang: SiteLang | "ru" }) {
  const pathname = usePathname();
  const locale = pathname === "/ru" || pathname.startsWith("/ru/") ? "ru" : pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
  const t = (en:string,es:string,ru:string) => locale === "ru" ? ru : locale === "es" ? es : en;
  const languages: Record<string,string> = {...alternatesFor(pathname)};
  for (const lang of ["en","es","ru"] as const) languages[lang] ??= localeSwitchHref(lang,pathname) ?? (lang === "en" ? "/" : `/${lang}`);
  const currentLanguage = pathname.match(/^\/(es|ru|fr|de|it)(?:\/|$)/)?.[1] ?? (initialLang === "zh" ? "en" : locale);
  const [open, setOpen] = useState(false), [search, setSearch] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null), searchButton = useRef<HTMLButtonElement>(null), menu = useRef<HTMLDetailsElement>(null);
  const { selected, open: openSamples } = useSampleList();
  const local = (path:string) => localeHref(locale,path) ?? path;
  const label = (path:string,text:string) => locale !== "en" && !localeHref(locale,path) ? `${text} (EN)` : text;
  const links = [
    ["/products",t("All styles","Todos los modelos","Все модели")],
    ["/products/womens-panties",t("For her","Para ella","Женское белье")],
    ["/products/cotton-underwear",t("Cotton","Algodón","Хлопок")],
    ["/products/lace-underwear",t("Lace","Encaje","Кружево")],
    ["/products/seamless-underwear",t("Seamless","Sin costuras","Бесшовное")],
    ["/products/thongs",t("Thongs & tangas","Tangas","Стринги")],
    ["/products/high-waist",t("High waist","Cintura alta","Высокая посадка")],
    ["/products/mens-underwear",t("For him","Para él","Мужское белье")]
  ];
  const manufacturers = manufacturerPages.map(p => [`/manufacturers/${p.slug}`,locale === "es" && sourcingNames[p.slug] ? sourcingNames[p.slug] : p.h1]);
  const services = [["/oem-odm",t("Private label","Tu marca","Ваш бренд")],["/factory",t("Factory & quality","Fábrica y calidad","Фабрика и качество")],["/news",t("News & journal","Noticias","Статьи")]];
  function closeMenu() { setOpen(false); if (menu.current) menu.current.open = false; }
  const renderLink = ([href,text]:string[]) => <Link key={href} href={local(href)} onClick={closeMenu} aria-current={pathname === local(href) ? "page" : undefined}>{label(href,text)}</Link>;
  return <header className={"d-header " + s.header} onKeyDown={event => {
    if (event.key !== "Escape") return;
    if (search) { setSearch(false); searchButton.current?.focus(); }
    else if (open) { setOpen(false); toggle.current?.focus(); }
    else if (menu.current?.open) { menu.current.open = false; menu.current.querySelector("summary")?.focus(); }
  }}>
    <a href="#main-content" className="d-skip">{t("Skip to content","Saltar al contenido","Перейти к содержанию")}</a>
    <div className={s.announcement}>{t("Thoughtfully made intimates. Made for your brand.","Ropa interior pensada para tu marca.","Нижнее белье для вашего бренда.")}<Link href={local("/contact")}>{t("Let’s create together","Hablemos","Обсудить проект")} ↗</Link></div>
    <div className={s.masthead}>
      <div><button ref={toggle} className={s.menuToggle} type="button" aria-expanded={open} aria-controls="d-mobile-nav" aria-label={open ? t("Close navigation","Cerrar navegación","Закрыть меню") : t("Open navigation","Abrir navegación","Открыть меню")} onClick={() => setOpen(!open)}><Icon type={open ? "close" : "menu"} /></button>
        <nav className={s.desktop} aria-label={t("Main navigation","Navegación principal","Основная навигация")}>
          <details className={s.dropdown}><summary>{t("Manufacturers","Fabricantes","Производство")} ⌄</summary><div>{[["/manufacturers",t("All sourcing routes","Opciones de fabricación","Варианты производства")],...manufacturers,["/guides",t("Buying guides","Guías de compra","Руководства")],["/resources",t("Sourcing resources","Recursos","Материалы")]].map(renderLink)}</div></details>
          <details ref={menu} className={s.dropdown}><summary>{t("The collection","La colección","Коллекция")} ⌄</summary><div>{links.map(renderLink)}</div></details>
          {services.map(renderLink)}
        </nav>
      </div>
      <Link className={s.logo} href={local("/")} aria-label={`DIYASI — ${t("Home","Inicio","Главная")}`} onClick={closeMenu}>DIYASI<span>INTIMATES, THOUGHTFULLY MADE</span></Link>
      <div className={s.actions}>
        <details className={`${s.dropdown} ${s.languageMenu}`}><summary className={s.language} aria-label={t("Language","Idioma","Язык")}>{currentLanguage.toUpperCase()} ⌄</summary><div>{Object.entries(languages).filter(([l])=>l!=="x-default").map(([l,href])=><a key={l} href={href} hrefLang={l} lang={l}>{languageNames[l]}</a>)}</div></details>
        <button ref={searchButton} type="button" aria-label={t("Search styles","Buscar modelos","Поиск моделей")} aria-expanded={search} aria-controls="d-style-search" onClick={() => setSearch(!search)}><Icon type="search" /></button>
        <button type="button" aria-label={`${t("Sample list","Lista de muestras","Список образцов")}, ${selected.length}`} onClick={openSamples}><Icon type="bag" /><span className={s.sampleLabel}>{t("Sample list","Muestras","Образцы")}</span><span className={s.count}>{selected.length}</span></button>
      </div>
    </div>
    {open && <nav className={s.mobile} id="d-mobile-nav" aria-label={t("Mobile navigation","Navegación móvil","Мобильная навигация")}>{[["/manufacturers",t("Manufacturers","Fabricantes","Производители")],["/guides",t("Buying guides","Guías de compra","Руководства")],["/resources",t("Sourcing resources","Recursos","Материалы")],...links,...services,["/packaging",t("Labels & packaging","Etiquetas y empaque","Этикетки и упаковка")],["/contact",t("Request samples","Solicitar muestras","Запросить образцы")],...manufacturers].map(renderLink)}</nav>}
    {search && <form className={s.search} id="d-style-search" action="/products"><label htmlFor="d-search">{t("Find your next style","Buscar en el catálogo completo (EN)","Поиск по полному каталогу (EN)")}</label><input id="d-search" name="q" placeholder="LS006, DYS201…" autoFocus required /><button type="submit">{t("Search","Buscar","Найти")} ↗</button></form>}
  </header>;
}
