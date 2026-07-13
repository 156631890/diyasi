"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import ProjectRouteSelector, { type ProjectRouteId } from "@/components/ProjectRouteSelector";
import WhatsAppLink from "@/components/WhatsAppLink";
import { API_BASE } from "@/lib/api";
import { trackConversionEvent } from "@/lib/conversion-events";

type QuoteFlowProps = {
  page: string;
  source?: "home" | "contact" | "product";
  product?: string;
  category?: string;
  initialRoute?: ProjectRouteId;
};

type FormState = {
  role: string;
  category: string;
  projectRoute?: ProjectRouteId;
  quantity: string;
  market: string;
  material: string;
  color: string;
  label: string;
  packaging: string;
  timeline: string;
  name: string;
  email: string;
  company: string;
  notes: string;
  website: string;
};

const roles = ["Startup brand", "Established brand", "Retailer", "Wholesale buyer", "Sourcing team"];
const categories = ["Women's underwear", "Men's underwear", "Bras", "Shapewear", "Activewear", "Period underwear", "Loungewear"];

export default function QuoteFlow({ page, source = "contact", product, category = "", initialRoute }: QuoteFlowProps) {
  const [stage, setStage] = useState<1 | 2>(1);
  const [status, setStatus] = useState<"ready" | "submitting" | "submitted" | "failed">("ready");
  const [routeMissing, setRouteMissing] = useState(false);
  const [form, setForm] = useState<FormState>({
    role: "", category, projectRoute: initialRoute, quantity: "", market: "", material: "", color: "", label: "", packaging: "", timeline: "", name: "", email: "", company: "", notes: "", website: ""
  });
  const started = useRef(false);

  useEffect(() => {
    function selectRoute(event: Event) {
      const route = (event as CustomEvent<ProjectRouteId>).detail;
      setForm((current) => ({ ...current, projectRoute: route }));
    }

    window.addEventListener("diyasi-project-route", selectRoute);
    return () => window.removeEventListener("diyasi-project-route", selectRoute);
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function startQuote() {
    if (started.current) return;
    started.current = true;
    if (source === "product") trackConversionEvent("product_inquiry_started");
    trackConversionEvent("quote_started");
  }

  function detailMessage() {
    return [
      `Project page: ${page}`,
      product ? `Product: ${product}` : "",
      `Buyer role: ${form.role}`,
      `Product category: ${form.category}`,
      `Project route: ${form.projectRoute}`,
      `Estimated quantity: ${form.quantity}`,
      `Target market: ${form.market}`,
      `Material direction: ${form.material}`,
      `Color direction: ${form.color}`,
      `Label requirements: ${form.label}`,
      `Packaging requirements: ${form.packaging}`,
      `Timeline: ${form.timeline}`,
      "",
      `Notes: ${form.notes}`
    ].filter(Boolean).join("\n");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startQuote();
    if (stage === 1) {
      if (!form.projectRoute) {
        setRouteMissing(true);
        return;
      }
      setStage(2);
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(`${API_BASE}/inquiries/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          message: detailMessage(),
          website: form.website,
          country: form.market,
          category: form.category,
          quantity: form.quantity,
          project_route: form.projectRoute,
          private_label: form.label,
          packaging: form.packaging,
          launch_date: form.timeline
        })
      });
      if (response.ok) {
        trackConversionEvent("quote_submitted");
        setStatus("submitted");
        return;
      }
    } catch {
      // Preserve the failure state when the inquiry API is unavailable.
    }
    setStatus("failed");
  }

  return (
    <form className="card grid gap-6 p-6 md:p-8" onSubmit={onSubmit} onFocus={startQuote}>
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#d9e2dc] pb-5">
        <div>
          <p className="kicker">Project quotation</p>
          <h2 className="card-title-standard mt-2 text-[#1d2521]">Tell us what you need</h2>
          {product ? <p className="mt-2 text-sm leading-6 text-[#5f6b66]">Product context: {product}</p> : null}
        </div>
        <p className="text-sm font-semibold text-[#0f5f55]">Step {stage} of 2</p>
      </div>

      {stage === 1 ? (
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">Your role<select className="input" required value={form.role} onChange={(event) => update("role", event.target.value)}><option value="">Select role</option>{roles.map((role) => <option key={role} value={role}>{role}</option>)}</select></label>
          <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">Product category<select className="input" required value={form.category} onChange={(event) => update("category", event.target.value)}><option value="">Select category</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
          <div className="md:col-span-2"><p className="mb-2 text-sm font-semibold text-[#1d2521]">Project route</p><ProjectRouteSelector value={form.projectRoute} onChange={(route) => { setRouteMissing(false); update("projectRoute", route); }} />{routeMissing ? <p className="mt-2 text-sm text-[#b15d39]">Select a project route to continue.</p> : null}</div>
          <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">Estimated quantity<input className="input" required placeholder="e.g. 500 pcs per style" value={form.quantity} onChange={(event) => update("quantity", event.target.value)} /></label>
          <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">Target market<input className="input" required placeholder="e.g. United States" value={form.market} onChange={(event) => update("market", event.target.value)} /></label>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">Material direction<input className="input" placeholder="e.g. cotton modal blend" value={form.material} onChange={(event) => update("material", event.target.value)} /></label>
          <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">Color direction<input className="input" placeholder="Stock or custom color" value={form.color} onChange={(event) => update("color", event.target.value)} /></label>
          <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">Label requirements<input className="input" placeholder="Care label, waistband, heat transfer" value={form.label} onChange={(event) => update("label", event.target.value)} /></label>
          <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">Packaging requirements<input className="input" placeholder="Polybag, hangtag, gift box" value={form.packaging} onChange={(event) => update("packaging", event.target.value)} /></label>
          <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">Target timeline<input className="input" placeholder="Sampling or delivery date" value={form.timeline} onChange={(event) => update("timeline", event.target.value)} /></label>
          <div className="hidden md:block" aria-hidden="true" />
          <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">Name<input className="input" required autoComplete="name" value={form.name} onChange={(event) => update("name", event.target.value)} /></label>
          <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">Email<input className="input" required type="email" autoComplete="email" value={form.email} onChange={(event) => update("email", event.target.value)} /></label>
          <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">Company / brand<input className="input" autoComplete="organization" value={form.company} onChange={(event) => update("company", event.target.value)} /></label>
          <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">Additional notes<textarea className="input min-h-28" value={form.notes} onChange={(event) => update("notes", event.target.value)} /></label>
        </div>
      )}

      <input type="text" className="hidden" tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => update("website", event.target.value)} />
      <div className="flex flex-wrap items-center gap-3">
        {stage === 2 ? <button type="button" className="btn btn-soft" onClick={() => setStage(1)}>Back</button> : null}
        <button className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={status === "submitting" || status === "submitted"}>{stage === 1 ? "Continue" : status === "submitting" ? "Submitting..." : status === "submitted" ? "Submitted" : "Request quotation"}</button>
        <WhatsAppLink className="btn btn-soft" page={page} projectRoute={form.projectRoute} product={product}>Discuss on WhatsApp</WhatsAppLink>
        {status === "failed" ? <p className="text-sm text-[#b15d39]">Submission failed. Please try WhatsApp.</p> : null}
      </div>
    </form>
  );
}
