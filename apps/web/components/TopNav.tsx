"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { localeHref, localeSwitchHref } from "@/lib/locale-routes";
import type { SiteLang } from "@/lib/i18n";
import { useSampleList } from "./SampleList";
import s from "./TopNav.module.css";

function Icon({ type }: { type: "search" | "bag" | "menu" | "close" }) {
  return <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" aria-hidden="true">{type === "search" ? <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></> : type === "bag" ? <><path d="M5 8h14l1 13H4L5 8Z" /><path d="M8 8V6a4 4 0 0 1 8 0v2" /></> : type === "menu" ? <path d="M3 7h18M3 12h18M3 17h18" /> : <path d="m6 6 12 12M6 18 18 6" />}</svg>;
}

export default function TopNav({ initialLang }: { initialLang: SiteLang }) {
  const pathname = usePathname();
  const spanish = initialLang === "es";
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const searchButton = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDetailsElement>(null);
  const { selected, open: openSamples } = useSampleList();
  const local = (path: string) => spanish ? (localeHref("es", path) ?? path) : path;
  const links = [
    ["/products", spanish ? "Todos los modelos" : "All styles"],
    ["/products/womens-panties", spanish ? "Para ella" : "For her"],
    ["/products/cotton-underwear", spanish ? "Algodón" : "Cotton"],
    ["/products/lace-underwear", spanish ? "Encaje" : "Lace"],
    ["/products/seamless-underwear", spanish ? "Sin costuras" : "Seamless"],
    ["/products/thongs", spanish ? "Tangas" : "Thongs & tangas"],
    ["/products/high-waist", spanish ? "Cintura alta" : "High waist"],
    ["/products/mens-underwear", spanish ? "Para él" : "For him"],
  ];
  function closeMenu() { setOpen(false); if (menu.current) menu.current.open = false; }
  return <header className={"d-header " + s.header} onKeyDown={event => {
    if (event.key !== "Escape") return;
    if (search) { setSearch(false); searchButton.current?.focus(); }
    else if (open) { setOpen(false); toggle.current?.focus(); }
    else if (menu.current?.open) { menu.current.open = false; menu.current.querySelector("summary")?.focus(); }
  }}>
    <a href="#main-content" className="d-skip">{spanish ? "Saltar al contenido" : "Skip to content"}</a>
    <div className={s.announcement}>{spanish ? "Ropa interior pensada para tu marca." : "Thoughtfully made intimates. Made for your brand."}<Link href={local("/contact")}>{spanish ? "Hablemos" : "Let’s create together"} ↗</Link></div>
    <div className={s.masthead}>
      <div><button ref={toggle} className={s.menuToggle} type="button" aria-expanded={open} aria-controls="d-mobile-nav" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}><Icon type={open ? "close" : "menu"} /></button>
        <nav className={s.desktop} aria-label={spanish ? "Navegación principal" : "Main navigation"}>
          <details ref={menu} className={s.dropdown}><summary>{spanish ? "La colección" : "The collection"} <span>⌄</span></summary><div>{links.map(([href, label]) => <Link key={href} href={local(href)} onClick={closeMenu} aria-current={pathname === local(href) ? "page" : undefined}>{label}</Link>)}</div></details>
          <Link href={local("/oem-odm")}>{spanish ? "Tu marca" : "Private label"}</Link><Link href={local("/factory")}>{spanish ? "Fábrica y calidad" : "Factory & quality"}</Link><Link href="/news">{spanish ? "Noticias (EN)" : "News & journal"}</Link>
        </nav>
      </div>
      <Link className={s.logo} href={spanish ? "/es" : "/"} aria-label="DIYASI home" onClick={closeMenu}>DIYASI<span>INTIMATES, THOUGHTFULLY MADE</span></Link>
      <div className={s.actions}><Link className={s.language} href={localeSwitchHref(spanish ? "en" : "es", pathname) ?? (spanish ? "/" : "/es")} hrefLang={spanish ? "en" : "es"}>{spanish ? "EN" : "ES"}</Link><button ref={searchButton} type="button" aria-label={spanish ? "Buscar modelos" : "Search styles"} aria-expanded={search} aria-controls="d-style-search" onClick={() => setSearch(!search)}><Icon type="search" /></button><button type="button" aria-label={spanish ? "Lista de muestras, " + selected.length + " modelos" : "Sample list, " + selected.length + (selected.length === 1 ? " style" : " styles")} onClick={openSamples}><Icon type="bag" /><span className={s.sampleLabel}>{spanish ? "Muestras" : "Sample list"}</span><span className={s.count}>{selected.length}</span></button></div>
    </div>
    {open && <nav className={s.mobile} id="d-mobile-nav" aria-label="Mobile navigation">{[...links, ["/oem-odm", spanish ? "Tu marca" : "Private label"], ["/factory", spanish ? "Fábrica y calidad" : "Factory & quality"], ["/resources", spanish ? "Guías" : "Buying guides"], ["/news", spanish ? "Noticias (EN)" : "News & journal"], ["/contact", spanish ? "Contacto" : "Request samples"]].map(([href,label]) => <Link key={href} href={local(href)} onClick={closeMenu}>{label}</Link>)}</nav>}
    {search && <form className={s.search} id="d-style-search" action="/products"><label htmlFor="d-search">{spanish ? "Encuentra tu próximo modelo" : "Find your next style"}</label><input id="d-search" name="q" placeholder="Cotton, Brazilian, LS006…" autoFocus required /><button type="submit">{spanish ? "Buscar" : "Search"} ↗</button></form>}
  </header>;
}
