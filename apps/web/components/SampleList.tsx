"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { parseSampleIds, SAMPLE_LIMIT, SAMPLE_STORAGE_KEY } from "@/lib/sample-list";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { SITE_ORIGIN } from "@/lib/site-config";
import s from "./SampleList.module.css";

export type SampleProduct = { slug: string; product_name: string; model_number: string; image_url: string };
const changeEvent = "diyasi-samples-changed";
let fallback = "[]";
function subscribe(listener: () => void) {
  window.addEventListener(changeEvent, listener);
  window.addEventListener("storage", listener);
  return () => { window.removeEventListener(changeEvent, listener); window.removeEventListener("storage", listener); };
}
function snapshot() {
  try { return localStorage.getItem(SAMPLE_STORAGE_KEY) ?? "[]"; }
  catch { return fallback; }
}
function save(ids: string[]) {
  fallback = JSON.stringify(ids);
  try { localStorage.setItem(SAMPLE_STORAGE_KEY, fallback); }
  catch { /* The selection remains available in this tab if storage is blocked. */ }
  window.dispatchEvent(new Event(changeEvent));
}
const SampleContext = createContext<{ selected: string[]; chosen: SampleProduct[]; toggle: (slug: string) => void; open: () => void }>({ selected: [], chosen: [], toggle: () => {}, open: () => {} });
export const useSampleList = () => useContext(SampleContext);

export function SampleButton({ productId, className }: { productId: string; className?: string }) {
  const { selected, toggle } = useSampleList();
  const added = selected.includes(productId);
  return <button type="button" className={className ?? s.addButton} aria-pressed={added} onClick={() => toggle(productId)}>{added ? "✓ Saved — remove from samples" : "+ Add to sample list"}</button>;
}

export default function SampleList({ products, children }: { products: SampleProduct[]; children: React.ReactNode }) {
  const pathname = usePathname();
  const spanish = pathname === "/es" || pathname.startsWith("/es/");
  const raw = useSyncExternalStore(subscribe, snapshot, () => "[]");
  const selected = useMemo(() => parseSampleIds(raw, products.map(p => p.slug)), [raw, products]);
  const chosen = selected.map(slug => products.find(p => p.slug === slug)!);
  const [notice, setNotice] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  function toggle(slug: string) {
    if (!products.some(p => p.slug === slug)) return;
    if (selected.includes(slug)) {
      save(selected.filter(id => id !== slug));
      trackAnalyticsEvent("sample_removed", undefined, slug);
    } else {
      if (selected.length >= SAMPLE_LIMIT) { setNotice(`Your list holds up to ${SAMPLE_LIMIT} styles. Remove one to add another.`); dialog.current?.showModal(); return; }
      save([...selected, slug]);
      trackAnalyticsEvent("sample_added", undefined, slug);
    }
    setNotice("");
  }
  function open() { dialog.current?.showModal(); trackAnalyticsEvent("sample_list_opened"); }
  const whatsapp = "https://wa.me/8618042579030?text=" + encodeURIComponent("Hello DIYASI, I would like to discuss samples for these styles:\n" + chosen.map(p => `${p.model_number}: ${SITE_ORIGIN}/products/${p.slug}`).join("\n") + "\nPlease confirm colors, sizes, sample costs and minimum quantities.");
  const showMobileBar = pathname === "/" || pathname === "/products" || pathname.startsWith("/products/");
  return <SampleContext.Provider value={{ selected, chosen, toggle, open }}>
    {children}
    {showMobileBar && <div className={s.mobileBar}><Link href="/products">Browse styles</Link><button onClick={open}>Sample list <span>{selected.length}</span> ↗</button></div>}
    <dialog ref={dialog} className={s.dialog} aria-labelledby="sample-list-title">
      <button className={s.close} type="button" aria-label={spanish ? "Cerrar lista" : "Close sample list"} onClick={() => dialog.current?.close()}>×</button>
      <p className="d-eyebrow">{spanish ? "TU PRÓXIMA COLECCIÓN" : "YOUR NEXT COLLECTION"}</p><h2 id="sample-list-title">{spanish ? "Tu lista de muestras." : "Your sample shortlist."}</h2>
      {notice && <p role="status" className={s.notice}>{notice}</p>}
      {chosen.length ? <>
        <p>{spanish ? `${chosen.length} modelos seleccionados.` : `${chosen.length} selected ${chosen.length === 1 ? "style" : "styles"}. A starting point for our conversation.`}</p>
        <ul className={s.items}>{chosen.map(p => <li key={p.slug}><Image src={p.image_url} alt={p.product_name} width={82} height={100} /><div><span>{p.model_number}</span><h3><Link href={`/products/${p.slug}`} onClick={() => dialog.current?.close()}>{p.product_name}</Link></h3><button type="button" aria-label={`Remove ${p.model_number} from sample list`} onClick={() => toggle(p.slug)}>{spanish ? "Eliminar" : "Remove"}</button></div></li>)}</ul>
        <Link className="d-button d-button-wide" href={`${spanish ? "/es/contacto" : "/contact"}?samples=1&from=${encodeURIComponent(pathname)}#quote-form`} onClick={() => { dialog.current?.close(); trackAnalyticsEvent("sample_inquiry_started"); }}>{spanish ? "Solicitar estas muestras" : "Request these samples"} <span>↗</span></Link>
        <a className={s.whatsapp} href={whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => trackAnalyticsEvent("whatsapp_started")}>{spanish ? "Hablar por WhatsApp" : "Discuss on WhatsApp"} ↗</a>
        <button className={s.clear} type="button" onClick={() => { save([]); setNotice(""); }}>{spanish ? "Vaciar lista" : "Clear sample list"}</button>
        <p className={s.note}>{spanish ? "Guardado en este navegador cuando el almacenamiento está disponible. Confirma costes y cantidades con nuestro equipo." : "Saved in this browser when storage is available. Confirm sample costs, colors and quantities with our team."}</p>
      </> : <div className={s.empty}><p>{spanish ? "Empieza seleccionando un modelo." : "A considered collection starts with one style."}</p><Link className="d-button" href="/products" onClick={() => dialog.current?.close()}>{spanish ? "Explorar modelos" : "Explore the collection"} ↗</Link></div>}
    </dialog>
  </SampleContext.Provider>;
}
