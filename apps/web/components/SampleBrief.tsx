"use client";

import {useState} from "react";
import type {SampleProduct} from "./SampleList";
import {downloadCsv, makeCsv, validQuantity} from "@/lib/buyer-export";
import {SITE_ORIGIN} from "@/lib/site-config";
import s from "./SampleBrief.module.css";

type Plan = {quantity: string; sizes: string; colors: string};
export default function SampleBrief({products, spanish}: {products: SampleProduct[]; spanish: boolean}) {
  const [plans, setPlans] = useState<Record<string, Plan>>({});
  const [notice, setNotice] = useState("");
  const plan = (slug: string): Plan => plans[slug] ?? {quantity: "", sizes: "", colors: ""};
  const valid = products.every(p => validQuantity(plan(p.slug).quantity));
  const total = products.reduce((n, p) => n + (validQuantity(plan(p.slug).quantity) ? Number(plan(p.slug).quantity) : 0), 0);
  function edit(slug: string, key: keyof Plan, value: string) {
    setPlans(current => ({...current, [slug]: {...(current[slug] ?? {quantity: "", sizes: "", colors: ""}), [key]: value}}));
    setNotice("");
  }
  function download() {
    if (!valid) return;
    downloadCsv(makeCsv([
      ["Model", "Product", "Requested pieces", "Size allocation requested", "Color allocation requested", "Product URL", "Status"],
      ...products.map(p => [p.model_number, p.product_name, plan(p.slug).quantity || "To confirm", plan(p.slug).sizes || "To confirm", plan(p.slug).colors || "To confirm", `${SITE_ORIGIN}/products/${p.slug}`, "Planning draft only; confirm size/color mix, sample costs and MOQ separately; no enquiry submitted"]),
    ]), "diyasi-sample-brief.csv");
    setNotice(spanish ? "CSV preparado. No se ha enviado una consulta." : "CSV prepared. No enquiry has been sent.");
  }
  return <section className={s.brief} aria-labelledby="sample-brief-title">
    <h3 id="sample-brief-title">{spanish ? "Plan de tallas y colores" : "Plan your size & color mix"}</h3>
    <p>{spanish ? "Anota las cantidades y el reparto que deseas revisar. Descarga el borrador para tu equipo y adjúntalo al contactar. Estas notas no se transfieren al formulario." : "Record the quantities and allocation you want reviewed. Download the brief for your team and attach it when contacting us. These planning notes are not transferred to the enquiry form."}</p>
    {products.map(p => <fieldset key={p.slug}><legend>{p.model_number}</legend><label>{spanish ? "Piezas previstas" : "Planned pieces"}<input type="number" min="1" max="100000000" step="1" value={plan(p.slug).quantity} aria-invalid={!validQuantity(plan(p.slug).quantity)} onChange={e => edit(p.slug, "quantity", e.target.value)}/></label><label>{spanish ? "Reparto por talla" : "Size allocation"}<input maxLength={200} placeholder="S: 20, M: 40, L: 40, XL: 20" value={plan(p.slug).sizes} onChange={e => edit(p.slug, "sizes", e.target.value)}/></label><label>{spanish ? "Reparto por color" : "Color allocation"}<input maxLength={200} placeholder={spanish ? "Indica colores y cantidades" : "List colors and quantities"} value={plan(p.slug).colors} onChange={e => edit(p.slug, "colors", e.target.value)}/></label></fieldset>)}
    <p>{spanish ? "Total previsto" : "Planned total"}: <strong>{total.toLocaleString()}</strong> {spanish ? "piezas" : "pieces"}. {spanish ? "Las cantidades vacías quedan por confirmar. No confirma el MOQ." : "Blank quantities remain to confirm. This does not confirm MOQ eligibility."}</p>
    {!valid && <p role="alert">{spanish ? "Usa un número entero de 1 a 100.000.000 o deja la cantidad vacía." : "Use a whole number from 1 to 100,000,000, or leave the quantity blank."}</p>}
    <button type="button" className="d-button d-button-wide" disabled={!valid || !products.length} onClick={download}>{spanish ? "Descargar plan de muestras (CSV)" : "Download sample brief (CSV)"} ↓</button>
    <p className={s.note}>{spanish ? "Borrador temporal en esta página. Comprueba medidas, reparto y mínimos de componentes con el equipo." : "A temporary draft on this page. Confirm garment measurements, size/color allocation and custom-component minimums with the team."}</p>
    <p role="status">{notice}</p>
  </section>;
}
