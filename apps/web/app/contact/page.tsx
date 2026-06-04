"use client";

import { FormEvent, useState } from "react";

import { API_BASE } from "@/lib/api";
import { companyInfo } from "@/lib/site-info";

const mapEmbedUrl =
  "https://www.google.com/maps?hl=en&gl=US&q=No.%2016%20Dashi%20Road%2C%20Fotang%20Town%2C%20Yiwu%2C%20Zhejiang%2C%20China&z=15&output=embed";

const productCategories = [
  "Women's underwear",
  "Men's underwear",
  "Bras",
  "Shapewear",
  "Activewear",
  "Period underwear",
  "Loungewear"
];

const quantityOptions = ["Under 100 pcs", "100 to 500 pcs", "500 to 2,000 pcs", "2,000+ pcs"];
const privateLabelOptions = ["Yes", "No", "Not sure yet"];
const packagingOptions = ["Label", "Hangtag", "Polybag", "Gift box", "Barcode / SKU sticker"];

type FormState = {
  name: string;
  email: string;
  company: string;
  country: string;
  category: string;
  quantity: string;
  privateLabel: string;
  packaging: string[];
  launchDate: string;
  referenceFile: string;
  message: string;
  website: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  company: "",
  country: "",
  category: "",
  quantity: "",
  privateLabel: "",
  packaging: [],
  launchDate: "",
  referenceFile: "",
  message: "",
  website: ""
};

export default function ContactPage() {
  const [status, setStatus] = useState<"ready" | "submitting" | "submitted" | "failed">("ready");
  const [form, setForm] = useState<FormState>(initialForm);

  function togglePackaging(value: string) {
    setForm((current) => ({
      ...current,
      packaging: current.packaging.includes(value)
        ? current.packaging.filter((item) => item !== value)
        : [...current.packaging, value]
    }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    const enrichedMessage = [
      `Country / Target Market: ${form.country || "-"}`,
      `Product Category: ${form.category || "-"}`,
      `Estimated Quantity: ${form.quantity || "-"}`,
      `Private Label: ${form.privateLabel || "-"}`,
      `Custom Packaging: ${form.packaging.join(", ") || "-"}`,
      `Target Launch Date: ${form.launchDate || "-"}`,
      `Reference Image: ${form.referenceFile || "-"}`,
      "",
      form.message
    ].join("\n");

    try {
      const response = await fetch(`${API_BASE}/inquiries/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          message: enrichedMessage,
          website: form.website
        })
      });
      if (response.ok) {
        setStatus("submitted");
        setForm(initialForm);
        return;
      }
    } catch {
      // Keep the user-facing status below.
    }
    setStatus("failed");
  }

  const statusText =
    status === "ready"
      ? "Ready"
      : status === "submitting"
        ? "Submitting..."
        : status === "submitted"
          ? "Submitted"
          : "Submission failed";

  return (
    <main className="container-shell page-shell page-stack">
      <section className="hero-panel page-hero md:p-10 lg:p-12">
        <p className="kicker page-reference-subtitle">Start Your Private Label Project</p>
        <h1 className="section-title mt-2 text-[#1d2521]">
          Start your private label underwear project with a factory team that understands sampling, fit, and production
        </h1>
        <p className="page-reference-body page-copy-wide mt-4 text-[#5f6b66]">
          Share your product category, target market, quantity, private label needs, packaging direction, and launch
          date. We will respond with a practical MOQ, sampling, and production route.
        </p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-8">
          <div className="rounded-[30px] border border-[rgba(191,144,118,0.24)] bg-[linear-gradient(180deg,rgba(255,252,248,0.99),rgba(250,240,231,0.98))] p-6 shadow-[0_24px_56px_rgba(132,86,58,0.12)] md:p-8">
            <div className="border-b border-[rgba(191,144,118,0.2)] pb-5">
              <p className="text-xs font-semibold uppercase tracking-normal text-[#0f5f55]">Company</p>
              <h2 className="mt-2 text-[1.9rem] font-bold leading-tight text-[#1d2521]">{companyInfo.name}</h2>
            </div>
            <div className="mt-6 space-y-4 text-sm leading-7 text-[#5f6b66]">
              <div>
                <p className="font-semibold text-[#0f5f55]">Company Address / Manufacturing Location</p>
                <p>{companyInfo.address}</p>
              </div>
              <div>
                <p className="font-semibold text-[#0f5f55]">Email</p>
                <p>
                  <a href={`mailto:${companyInfo.emailPrimary}`} className="underline decoration-[#d08b67] underline-offset-4 transition hover:text-[#b15d39]">
                    {companyInfo.emailPrimary}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${companyInfo.emailSecondary}`} className="underline decoration-[#d08b67] underline-offset-4 transition hover:text-[#b15d39]">
                    {companyInfo.emailSecondary}
                  </a>
                </p>
              </div>
              <div>
                <p className="font-semibold text-[#0f5f55]">Mobile / WhatsApp</p>
                <p className="flex flex-wrap gap-4">
                  <a href={companyInfo.phoneHref} className="hover:text-[#b15d39]">
                    {companyInfo.phone}
                  </a>
                  <a href={companyInfo.whatsapp} target="_blank" rel="noreferrer" className="underline decoration-[#d08b67] underline-offset-4 transition hover:text-[#b15d39]">
                    Open WhatsApp
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[30px] border border-[rgba(191,144,118,0.24)] bg-white shadow-[0_24px_56px_rgba(132,86,58,0.12)]">
            <div className="h-[320px] md:h-[420px]">
              <iframe
                title="YiWu DiYaSi map"
                src={mapEmbedUrl}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <form
          className="rounded-[30px] border border-[rgba(191,144,118,0.24)] bg-[linear-gradient(180deg,rgba(255,252,248,0.99),rgba(250,240,231,0.98))] p-6 shadow-[0_24px_56px_rgba(132,86,58,0.12)] md:p-8"
          onSubmit={onSubmit}
        >
          <div className="border-b border-[rgba(191,144,118,0.2)] pb-5">
            <p className="text-xs font-semibold uppercase tracking-normal text-[#0f5f55]">Project Inquiry</p>
            <h2 className="mt-2 text-[1.9rem] font-bold leading-tight text-[#1d2521]">Send Your Project Brief</h2>
            <p className="mt-3 text-sm leading-7 text-[#5f6b66]">
              Complete the details below so the first reply can include useful MOQ, sample timing, packaging, and
              production guidance.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-normal text-[#7d8a85]">Name</span>
              <input className="input" required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-normal text-[#7d8a85]">Email</span>
              <input className="input" type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-normal text-[#7d8a85]">Company / Brand Name</span>
              <input className="input" value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-normal text-[#7d8a85]">Country / Target Market</span>
              <input className="input" value={form.country} onChange={(event) => setForm({ ...form, country: event.target.value })} />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-normal text-[#7d8a85]">Product Category</span>
              <select className="input" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>
                <option value="">Select category</option>
                {productCategories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-normal text-[#7d8a85]">Estimated Quantity</span>
              <select className="input" value={form.quantity} onChange={(event) => setForm({ ...form, quantity: event.target.value })}>
                <option value="">Select quantity</option>
                {quantityOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-normal text-[#7d8a85]">Do you need private label?</span>
              <select className="input" value={form.privateLabel} onChange={(event) => setForm({ ...form, privateLabel: event.target.value })}>
                <option value="">Select option</option>
                {privateLabelOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-normal text-[#7d8a85]">Target Launch Date</span>
              <input className="input" type="date" value={form.launchDate} onChange={(event) => setForm({ ...form, launchDate: event.target.value })} />
            </label>

            <fieldset className="grid gap-3 md:col-span-2">
              <legend className="text-xs font-semibold uppercase tracking-normal text-[#7d8a85]">Do you need custom packaging?</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {packagingOptions.map((item) => (
                  <label key={item} className="flex items-center gap-2 rounded border border-[#d9e2dc] bg-white px-3 py-2 text-sm text-[#1d2521]">
                    <input type="checkbox" checked={form.packaging.includes(item)} onChange={() => togglePackaging(item)} />
                    {item}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="grid gap-2 md:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-normal text-[#7d8a85]">Upload Reference Image</span>
              <input
                className="input pt-2"
                type="file"
                accept="image/*,.pdf"
                onChange={(event) => setForm({ ...form, referenceFile: event.target.files?.[0]?.name || "" })}
              />
              <span className="text-xs leading-5 text-[#7d8a85]">
                The form sends the file name with your inquiry. Attachments can be shared by email or WhatsApp after the first reply.
              </span>
            </label>

            <label className="grid gap-2 md:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-normal text-[#7d8a85]">Message</span>
              <textarea
                className="input min-h-44"
                required
                placeholder="Tell us the fabric direction, fit expectation, packaging idea, sample deadline, or reference product."
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
              />
            </label>
          </div>

          <input
            type="text"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(event) => setForm({ ...form, website: event.target.value })}
          />

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <button className="btn btn-primary min-w-[180px]" type="submit">
              Submit Project Brief
            </button>
            <p className="text-sm text-[#7d8a85]">Status: {statusText}</p>
          </div>
        </form>
      </section>
    </main>
  );
}
