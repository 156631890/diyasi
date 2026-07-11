"use client";

import { FormEvent, useState } from "react";

import { API_BASE } from "@/lib/api";

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
  website: string;
};

const initialForm: FormState = { name: "", email: "", company: "", message: "", website: "" };

export default function SpanishQuoteFlow() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"ready" | "submitting" | "submitted" | "failed">("ready");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch(`${API_BASE}/inquiries/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          message: form.message,
          website: form.website
        })
      });
      if (response.ok) {
        setStatus("submitted");
        setForm(initialForm);
        return;
      }
    } catch {
      // Preserve the failure state below when the inquiry API is unavailable.
    }

    setStatus("failed");
  }

  const statusText = {
    ready: "",
    submitting: "Enviando solicitud...",
    submitted: "Solicitud enviada.",
    failed: "No se pudo enviar la solicitud. Inténtelo de nuevo o use WhatsApp."
  }[status];

  return (
    <form className="card grid gap-4 p-6" onSubmit={onSubmit}>
      <div>
        <p className="kicker">Solicitud de cotización</p>
        <h2 className="card-title-standard mt-2 text-[#1d2521]">Cuéntenos sobre su proyecto</h2>
      </div>
      <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">
        Nombre
        <input className="input" required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">
        Correo electrónico
        <input className="input" required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">
        Empresa o marca
        <input className="input" value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">
        Proyecto
        <textarea
          className="input min-h-36"
          required
          placeholder="Indique categoría, cantidad prevista, tejido, color, marca y empaque."
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
        />
      </label>
      <input
        type="text"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        value={form.website}
        onChange={(event) => setForm({ ...form, website: event.target.value })}
      />
      <div className="flex flex-wrap items-center gap-4">
        <button className="btn btn-primary" type="submit" disabled={status === "submitting"}>
          Enviar solicitud
        </button>
        {statusText ? <p className="page-reference-body">{statusText}</p> : null}
      </div>
    </form>
  );
}
