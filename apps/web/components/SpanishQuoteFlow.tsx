"use client";

import { FormEvent, Suspense, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSampleList } from "./SampleList";

import { companyInfo } from "@/lib/site-info";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { inquiryPageContext, inquirySubmissionKey } from "@/lib/inquiry-context";
import { postInquiry } from "@/lib/inquiry-client";

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
  website: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  company: "",
  message: "",
  website: "",
};

function SpanishForm() {
  const search = useSearchParams();
  const samples = useSampleList();
  const includeSamples = search.get("samples") === "1";
  const chosen = includeSamples ? samples.chosen : [];
  const started = useRef(false);
  const submission = useRef<{ body: string; id: string } | null>(null);
  const [reference, setReference] = useState("");
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<
    "ready" | "submitting" | "submitted" | "failed" | "uncertain"
  >("ready");
  const [teamNotification, setTeamNotification] = useState<"accepted" | "failed" | "pending_setup" | "unknown">("unknown");
  const [sampleQuantities, setSampleQuantities] = useState<Record<string, string>>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    trackAnalyticsEvent("quote_submit_attempt");

    try {
      const payload = {
          name: form.name,
          email: form.email,
          company: form.company,
          message: [form.message, chosen.length ? "Selected samples: " + chosen.map(p => p.model_number + " — " + p.product_name + (sampleQuantities[p.slug] ? ` (${sampleQuantities[p.slug]} pieces)` : "")).join("; ") : ""].filter(Boolean).join("\n"),
          website: form.website,
          ...inquiryPageContext(),
          ...(includeSamples ? { product_ids: chosen.map(p => p.slug) } : {}),
          ...(includeSamples ? { sample_quantities: Object.fromEntries(chosen.filter(p => sampleQuantities[p.slug]).map(p => [p.slug, sampleQuantities[p.slug]])) } : {}),
      };
      submission.current = inquirySubmissionKey(submission.current, JSON.stringify(payload));
      const result = await postInquiry(payload, submission.current.id);
      if (result.kind === "saved") {
        trackAnalyticsEvent("quote_submitted");
        setReference(result.id);
        setTeamNotification(result.teamNotification);
        setStatus("submitted");
        setForm(initialForm);
        return;
      }
      if (result.kind === "unknown") { setStatus("uncertain"); return; }
    } catch {
      // A timed-out response may follow a successful write. Keep the same ID.
      setStatus("uncertain");
      return;
    }

    setStatus("failed");
    trackAnalyticsEvent("quote_submit_failed");
  }

  const statusText = {
    ready: "",
    submitting: "Enviando solicitud...",
    submitted: `Solicitud guardada. Referencia: ${reference}. ${teamNotification === "accepted" ? "El proveedor aceptó el aviso al equipo; esto no confirma la entrega en su buzón." : teamNotification === "failed" ? "Falló el aviso por correo al equipo. Guarde la referencia y use WhatsApp si es urgente." : "No se ha confirmado el aviso automático al equipo. Guarde la referencia y use WhatsApp si es urgente."} No se le ha enviado una copia por correo.`,
    uncertain: "No pudimos confirmar si se guardó. Reintente con la misma solicitud para comprobarlo o use WhatsApp.",
    failed:
      "No se pudo enviar la solicitud. Inténtelo de nuevo o use WhatsApp.",
  }[status];

  return (
    <form
      id="quote-form"
      className="card grid gap-4 p-6"
      onSubmit={onSubmit}
      onFocus={() => {
        if (!started.current) {
          started.current = true;
          trackAnalyticsEvent("quote_started");
        }
      }}
    >
      <div>
        <p className="kicker">Solicitud de cotización</p>
        <h2 className="card-title-standard mt-2 text-[#1d2521]">
          Cuéntenos sobre su proyecto
        </h2>
      </div>
      {includeSamples && <aside className="d-inquiry-samples" aria-label="Muestras seleccionadas"><strong>Muestras seleccionadas</strong>{chosen.length ? <ul>{chosen.map(p => <li key={p.slug}><span>{p.model_number} · {p.product_name}</span><label>Unidades estimadas para {p.model_number}<input className="input" type="number" min="1" max="9999999" inputMode="numeric" value={sampleQuantities[p.slug] ?? ""} onChange={event => setSampleQuantities(current => ({ ...current, [p.slug]: event.target.value }))} placeholder="Opcional" /></label><button type="button" onClick={() => samples.toggle(p.slug)}>Eliminar</button></li>)}</ul> : <p>No hay modelos seleccionados. Puedes enviar una consulta general.</p>}</aside>}
      <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">
        Nombre
        <input
          className="input"
          required
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">
        Correo electrónico
        <input
          className="input"
          required
          type="email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">
        Empresa o marca
        <input
          className="input"
          value={form.company}
          onChange={(event) =>
            setForm({ ...form, company: event.target.value })
          }
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-[#1d2521]">
        Proyecto
        <textarea
          className="input min-h-36"
          required
          placeholder="Indique categoría, cantidad prevista, tejido, color, marca y empaque."
          value={form.message}
          onChange={(event) =>
            setForm({ ...form, message: event.target.value })
          }
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
        <button
          className="btn btn-primary"
          type="submit"
          disabled={status === "submitting" || status === "submitted"}
        >
          {status === "uncertain" ? "Comprobar solicitud" : "Enviar solicitud"}
        </button>
        {statusText ? (
          <p role={status === "failed" || status === "uncertain" ? "alert" : "status"} className="page-reference-body">
            {statusText}
          </p>
        ) : null}
        {(status === "failed" || status === "uncertain") && (
          <a
            href={companyInfo.whatsapp}
            className="d-text-link"
            onClick={() => trackAnalyticsEvent("whatsapp_started")}
          >
            WhatsApp
          </a>
        )}
      </div>
    </form>
  );
}

export default function SpanishQuoteFlow() {
  return <Suspense fallback={<p>Cargando formulario…</p>}><SpanishForm /></Suspense>;
}
