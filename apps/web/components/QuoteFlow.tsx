"use client";
import Link from "next/link";

import { FormEvent, useEffect, useRef, useState } from "react";

import ProjectRouteSelector, {
  type ProjectRouteId,
} from "@/components/ProjectRouteSelector";
import WhatsAppLink from "@/components/WhatsAppLink";
import { companyInfo } from "@/lib/site-info";
import { trackConversionEvent } from "@/lib/conversion-events";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { inquiryPageContext, inquirySubmissionKey } from "@/lib/inquiry-context";
import { postInquiry } from "@/lib/inquiry-client";
import { useSampleList } from "@/components/SampleList";

type QuoteFlowProps = {
  page: string;
  source?: "home" | "contact" | "product";
  product?: string;
  category?: string;
  initialRoute?: ProjectRouteId;
  includeSamples?: boolean;
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

const roles = [
  "Startup brand",
  "Established brand",
  "Retailer",
  "Wholesale buyer",
  "Sourcing team",
];
const categories = [
  "Women's underwear",
  "Men's underwear",
  "Other custom development",
];

export default function QuoteFlow({
  page,
  source = "contact",
  product,
  category = "",
  initialRoute,
  includeSamples = false,
}: QuoteFlowProps) {
  const samples = useSampleList();
  const chosen = includeSamples ? samples.chosen : [];
  const [stage, setStage] = useState<1 | 2>(1);
  const [status, setStatus] = useState<
    "ready" | "submitting" | "submitted" | "failed" | "uncertain"
  >("ready");
  const [teamNotification, setTeamNotification] = useState<"accepted" | "failed" | "pending_setup" | "unknown">("unknown");
  const [sampleQuantities, setSampleQuantities] = useState<Record<string, string>>({});
  const [routeMissing, setRouteMissing] = useState(false);
  const [form, setForm] = useState<FormState>({
    role: "",
    category,
    projectRoute: initialRoute,
    quantity: "",
    market: "",
    material: "",
    color: "",
    label: "",
    packaging: "",
    timeline: "",
    name: "",
    email: "",
    company: "",
    notes: "",
    website: "",
  });
  const started = useRef(false);
  const submission = useRef<{ body: string; id: string } | null>(null);
  const [reference, setReference] = useState("");
  const [failureMessage, setFailureMessage] = useState("");

  useEffect(() => {
    function selectRoute(event: Event) {
      const route = (event as CustomEvent<ProjectRouteId>).detail;
      setForm((current) => ({ ...current, projectRoute: route }));
    }

    window.addEventListener("diyasi-project-route", selectRoute);
    return () =>
      window.removeEventListener("diyasi-project-route", selectRoute);
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
      chosen.length ? `Sample shortlist: ${chosen.map(p => `${p.model_number} — ${p.product_name}${sampleQuantities[p.slug] ? ` (${sampleQuantities[p.slug]} pieces)` : ""}`).join("; ")}` : "",
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
      `Notes: ${form.notes}`,
    ]
      .filter(Boolean)
      .join("\n");
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
    setFailureMessage("");
    trackAnalyticsEvent("quote_submit_attempt", form.projectRoute);
    try {
      const payload = {
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
          launch_date: form.timeline,
          ...inquiryPageContext(),
          ...(includeSamples ? { product_ids: chosen.map(p => p.slug) } : {}),
          ...(includeSamples ? { sample_quantities: Object.fromEntries(chosen.filter(p => sampleQuantities[p.slug]).map(p => [p.slug, sampleQuantities[p.slug]])) } : {}),
      };
      submission.current = inquirySubmissionKey(submission.current, JSON.stringify(payload));
      const result = await postInquiry(payload, submission.current.id);
      if (result.kind === "saved") {
        trackConversionEvent("quote_submitted");
        setReference(result.id);
        setTeamNotification(result.teamNotification);
        setStatus("submitted");
        return;
      }
      if (result.kind === "unknown") { setStatus("uncertain"); return; }
      if (result.status === 429) setFailureMessage("Too many requests. Please wait a few minutes before trying again.");
      else if (result.status === 400) setFailureMessage("Please check your email and form fields before trying again.");
      else if (result.status >= 500) setFailureMessage("The service could not save this request. Please try again or contact us directly.");
    } catch {
      // A timed-out response could follow a successful write. Keep the same
      // submission ID so the retry can confirm the stored record safely.
      setStatus("uncertain");
      return;
    }
    setStatus("failed");
    trackAnalyticsEvent("quote_submit_failed", form.projectRoute);
  }

  return (
    <form
      id="quote-form"
      className="card d-quote-form grid gap-6 p-6 md:p-8"
      onSubmit={onSubmit}
      onFocus={startQuote}
    >
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#d9e2dc] pb-5">
        <div>
          <p className="kicker">Project quotation</p>
          <h2 className="card-title-standard mt-2 text-[#1d2521]">
            Tell us what you need
          </h2>
          {product ? (
            <p className="mt-2 text-sm leading-6 text-[#5f6b66]">
              Product context: {product}
            </p>
          ) : null}
        </div>
        <p className="text-sm font-semibold text-[#0f5f55]">
          Step {stage} of 2
        </p>
      </div>

      {includeSamples && <aside className="d-inquiry-samples" aria-label="Selected samples"><strong>Selected samples</strong>{chosen.length ? <ul>{chosen.map(p => <li key={p.slug}><span>{p.model_number} · {p.product_name}</span><label>Estimated pieces for {p.model_number}<input className="input" type="number" min="1" max="9999999" inputMode="numeric" value={sampleQuantities[p.slug] ?? ""} onChange={event => setSampleQuantities(current => ({ ...current, [p.slug]: event.target.value }))} placeholder="Optional" /></label><button type="button" aria-label={`Remove ${p.model_number} from inquiry`} onClick={() => samples.toggle(p.slug)}>Remove</button></li>)}</ul> : <p>No styles selected. You can still send a general inquiry or <Link href="/products">browse the collection</Link>.</p>}<p className="d-fineprint">These styles and any per-style quantities will be included in your request. This is a sample inquiry, not a purchase.</p></aside>}
      {stage === 1 ? (
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">
            Your role
            <select
              className="input"
              required
              value={form.role}
              onChange={(event) => update("role", event.target.value)}
            >
              <option value="">Select role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">
            Product category
            <select
              className="input"
              required
              value={form.category}
              onChange={(event) => update("category", event.target.value)}
            >
              <option value="">Select category</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <div className="md:col-span-2">
            <p className="mb-2 text-sm font-semibold text-[#1d2521]">
              Project route
            </p>
            <ProjectRouteSelector
              value={form.projectRoute}
              onChange={(route) => {
                setRouteMissing(false);
                update("projectRoute", route);
              }}
            />
            {routeMissing ? (
              <p className="mt-2 text-sm text-[#b15d39]">
                Select a project route to continue.
              </p>
            ) : null}
          </div>
          <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">
            Estimated quantity
            <input
              className="input"
              required
              placeholder="e.g. 120 pieces for one listed style"
              value={form.quantity}
              onChange={(event) => update("quantity", event.target.value)}
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">
            Target market
            <input
              className="input"
              required
              placeholder="e.g. United States"
              value={form.market}
              onChange={(event) => update("market", event.target.value)}
            />
          </label>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">
            Material direction
            <input
              className="input"
              placeholder="e.g. cotton modal blend"
              value={form.material}
              onChange={(event) => update("material", event.target.value)}
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">
            Color direction
            <input
              className="input"
              placeholder="Stock or custom color"
              value={form.color}
              onChange={(event) => update("color", event.target.value)}
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">
            Label requirements
            <input
              className="input"
              placeholder="Care label, waistband, heat transfer"
              value={form.label}
              onChange={(event) => update("label", event.target.value)}
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">
            Packaging requirements
            <input
              className="input"
              placeholder="Polybag, hangtag, gift box"
              value={form.packaging}
              onChange={(event) => update("packaging", event.target.value)}
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">
            Target timeline
            <input
              className="input"
              placeholder="Sampling or delivery date"
              value={form.timeline}
              onChange={(event) => update("timeline", event.target.value)}
            />
          </label>
          <div className="hidden md:block" aria-hidden="true" />
          <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">
            Name
            <input
              className="input"
              required
              autoComplete="name"
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">
            Email
            <input
              className="input"
              required
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(event) => update("email", event.target.value)}
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">
            Company / brand
            <input
              className="input"
              autoComplete="organization"
              value={form.company}
              onChange={(event) => update("company", event.target.value)}
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">
            Additional notes
            <textarea
              className="input min-h-28"
              value={form.notes}
              onChange={(event) => update("notes", event.target.value)}
            />
          </label>
        </div>
      )}

      <input
        type="text"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        value={form.website}
        onChange={(event) => update("website", event.target.value)}
      />
      <div className="flex flex-wrap items-center gap-3">
        {stage === 2 ? (
          <button
            type="button"
            className="btn btn-soft"
            onClick={() => setStage(1)}
          >
            Back
          </button>
        ) : null}
        <button
          className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={status === "submitting" || status === "submitted"}
        >
          {stage === 1
            ? "Continue"
            : status === "submitting"
              ? "Submitting..."
              : status === "submitted"
                ? "Submitted"
                : status === "uncertain"
                  ? "Check submission"
                : "Request quotation"}
        </button>
        <WhatsAppLink
          className="btn btn-soft"
          page={page}
          projectRoute={form.projectRoute}
          product={chosen.length ? chosen.map(p => `${p.model_number}: ${p.product_name}`).join("; ") : product}
        >
          Discuss on WhatsApp
        </WhatsAppLink>
        {status === "failed" ? (
          <p role="alert">
            {failureMessage ? `${failureMessage} ` : ""}
            Your request was not saved. Please try again, use WhatsApp or{" "}
            <a
              className="d-text-link"
              href={`mailto:${companyInfo.emailPrimary}`}
            >
              email us
            </a>
            .
          </p>
        ) : null}
        {status === "submitted" ? (
          <p role="status">
            Thank you. Your inquiry has been saved for the DIYASI team to
            review. Reference: {reference}. {teamNotification === "accepted"
              ? "Our email provider accepted the team notification; this does not prove inbox delivery."
              : teamNotification === "failed"
                ? "The team email notification failed. Please keep this reference and use WhatsApp if your request is urgent."
                : "Automatic team email notification is not confirmed. Please keep this reference and use WhatsApp if your request is urgent."} No email copy has been sent to you.
          </p>
        ) : null}
        {status === "uncertain" ? (
          <p role="alert">We could not confirm whether your inquiry was saved. Select “Check submission” to retry safely with the same request, or contact us by WhatsApp.</p>
        ) : null}
      </div>
      <p className="d-fineprint">
        By sending this request, you agree that we may use these details to
        respond to your project.{" "}
        <a className="d-text-link" href="/privacy-policy">
          Privacy policy
        </a>
      </p>
    </form>
  );
}
