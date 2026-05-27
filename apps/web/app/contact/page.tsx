"use client";

import { FormEvent, useState } from "react";

import { ImageTextBand, PlatformHero } from "@/components/founder-platform/PlatformSections";
import { API_BASE } from "@/lib/api";
import { contactOptions, platformImages } from "@/lib/founder-platform";

const directContact = {
  emails: ["imbella.annie@diyasidress.com", "imbella.vicky@diyasidress.com"],
  phone: "+86 18042579030",
  whatsapp: "https://wa.me/8618042579030",
  location: "No. 16 Dashi Road, Fotang Town, Yiwu, Zhejiang, China"
};

const initialForm = {
  name: "",
  email: "",
  whatsapp: "",
  brandStage: "",
  channel: "",
  productDirection: "",
  budget: "",
  timeline: "",
  notes: "",
  website: ""
};

export default function ContactPage() {
  const [status, setStatus] = useState<"ready" | "submitting" | "submitted" | "failed">("ready");
  const [form, setForm] = useState(initialForm);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const message = [
      `WhatsApp: ${form.whatsapp || "Not provided"}`,
      `Brand stage: ${form.brandStage || "Not selected"}`,
      `Sales channel: ${form.channel || "Not selected"}`,
      `Product direction: ${form.productDirection || "Not selected"}`,
      `Budget range: ${form.budget || "Not selected"}`,
      `Launch timing: ${form.timeline || "Not selected"}`,
      "",
      form.notes
    ].join("\n");

    try {
      const response = await fetch(`${API_BASE}/inquiries/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.channel || "Founder recommendation request",
          message,
          website: form.website
        })
      });
      if (response.ok) {
        setStatus("submitted");
        setForm(initialForm);
        return;
      }
    } catch {
      // Preserve the existing failure-state behavior.
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
    <main className="platform-page">
      <PlatformHero
        label="Contact Diyasi"
        title="Get Your Starter Kit Recommendation"
        body="Tell us your audience, channel, style direction, budget, and launch timeline. Diyasi will recommend a practical Starter Kit and validation path."
        image={platformImages.contactHero}
        imageAlt="Starter kit recommendation request materials on a founder desk"
      />

      <section className="platform-section">
        <div className="platform-grid lg:grid-cols-[1.1fr_0.9fr]">
          <form className="platform-card" onSubmit={onSubmit}>
            <p className="platform-card-label">Recommendation Request</p>
            <h2>Share your launch details</h2>
            <p>
              Send the basics first. Diyasi can follow up with the kit direction, validation path, and practical next
              steps.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f6b5b]">Name</span>
                <input
                  className="input"
                  required
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f6b5b]">Email</span>
                <input
                  className="input"
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f6b5b]">
                  WhatsApp / Phone
                </span>
                <input
                  className="input"
                  value={form.whatsapp}
                  onChange={(event) => setForm({ ...form, whatsapp: event.target.value })}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f6b5b]">Brand Stage</span>
                <select
                  className="input"
                  required
                  value={form.brandStage}
                  onChange={(event) => setForm({ ...form, brandStage: event.target.value })}
                >
                  <option value="">Select brand stage</option>
                  {contactOptions.brandStages.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f6b5b]">Sales Channel</span>
                <select
                  className="input"
                  required
                  value={form.channel}
                  onChange={(event) => setForm({ ...form, channel: event.target.value })}
                >
                  <option value="">Select sales channel</option>
                  {contactOptions.channels.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f6b5b]">
                  Product Direction
                </span>
                <select
                  className="input"
                  required
                  value={form.productDirection}
                  onChange={(event) => setForm({ ...form, productDirection: event.target.value })}
                >
                  <option value="">Select product direction</option>
                  {contactOptions.styles.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f6b5b]">Budget Range</span>
                <select
                  className="input"
                  required
                  value={form.budget}
                  onChange={(event) => setForm({ ...form, budget: event.target.value })}
                >
                  <option value="">Select budget range</option>
                  {contactOptions.budgets.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f6b5b]">Launch Timing</span>
                <select
                  className="input"
                  required
                  value={form.timeline}
                  onChange={(event) => setForm({ ...form, timeline: event.target.value })}
                >
                  <option value="">Select launch timing</option>
                  {contactOptions.timelines.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 md:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f6b5b]">Notes</span>
                <textarea
                  className="input min-h-40"
                  value={form.notes}
                  onChange={(event) => setForm({ ...form, notes: event.target.value })}
                />
              </label>
            </div>

            <label className="hidden">
              Website
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(event) => setForm({ ...form, website: event.target.value })}
              />
            </label>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <button className="platform-btn platform-btn-dark" type="submit">
                Send Recommendation Request
              </button>
              <p className="text-sm text-[#8f6b5b]" role="status">
                Status: {statusText}
              </p>
            </div>
          </form>

          <aside className="platform-card">
            <p className="platform-card-label">Direct Contact</p>
            <h2>Talk with the Diyasi team</h2>
            <div className="mt-6 space-y-5 text-sm leading-7 text-[#5f4639]">
              <div>
                <p className="font-semibold text-[#4a2d22]">Email</p>
                {directContact.emails.map((email) => (
                  <p key={email}>
                    <a className="underline decoration-[#c58f73] underline-offset-4" href={`mailto:${email}`}>
                      {email}
                    </a>
                  </p>
                ))}
              </div>
              <div>
                <p className="font-semibold text-[#4a2d22]">Phone / WhatsApp</p>
                <p>
                  <a className="underline decoration-[#c58f73] underline-offset-4" href="tel:+8618042579030">
                    {directContact.phone}
                  </a>
                </p>
                <p>
                  <a
                    className="underline decoration-[#c58f73] underline-offset-4"
                    href={directContact.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open WhatsApp
                  </a>
                </p>
              </div>
              <div>
                <p className="font-semibold text-[#4a2d22]">Location</p>
                <p>{directContact.location}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <ImageTextBand
        label="Project Brief"
        title="A focused brief leads to a better starter path"
        body="Audience, channel, product style, budget, and launch timing tell Diyasi which Starter Kit is practical now and which validation step should come next."
        image={platformImages.contactBrief}
        imageAlt="Founder project brief with underwear starter kit recommendation notes"
        reverse
      />
    </main>
  );
}
