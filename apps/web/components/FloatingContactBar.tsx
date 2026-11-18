"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { isPublicPath, pageLocale } from "@/lib/public-routing";
import { trackAnalyticsEvent } from "@/lib/analytics";
import s from "./FloatingContactBar.module.css";

type Contacts = { whatsapp: string; email: string; phone: string; phoneHref: string; linkedin: string; facebook: string };
const labels = {
  en: { contact: "Contact DIYASI", close: "Close contact options", email: "Email", phone: "Call us" },
  es: { contact: "Contactar con DIYASI", close: "Cerrar opciones de contacto", email: "Correo electrónico", phone: "Llámenos" },
  ru: { contact: "Связаться с DIYASI", close: "Закрыть контакты", email: "Электронная почта", phone: "Позвонить" },
  fr: { contact: "Contacter DIYASI", close: "Fermer les contacts", email: "E-mail", phone: "Nous appeler" },
  de: { contact: "DIYASI kontaktieren", close: "Kontaktoptionen schließen", email: "E-Mail", phone: "Anrufen" },
  it: { contact: "Contatta DIYASI", close: "Chiudi i contatti", email: "E-mail", phone: "Chiamaci" },
  zh: { contact: "联系 DIYASI", close: "收起联系方式", email: "邮箱", phone: "电话" },
};
type IconName = "whatsapp" | "email" | "phone" | "linkedin" | "facebook" | "chat" | "close";
function ContactIcon({ name }: { name: IconName }) {
  if (name === "facebook" || name === "linkedin") return <span className={s.socialIcon} aria-hidden="true">{name === "facebook" ? "f" : "in"}</span>;
  return <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === "email" ? <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>
      : name === "close" ? <path d="m6 6 12 12M6 18 18 6" />
      : name === "chat" ? <><path d="M21 11.5a9 9 0 0 1-13 8L3 21l1.5-5A9 9 0 1 1 21 11.5Z" /><path d="M8 11h8M8 14h5" /></>
      : name === "phone" ? <path d="m6 3 3 4-2 3c1.4 3 4 5.6 7 7l3-2 4 3-1 3C10 22 2 14 3 4Z" />
      : <><path d="M21 11.5a9 9 0 0 1-13 8L3 21l1.5-5A9 9 0 1 1 21 11.5Z" /><path d="m8 7 2 3-1 1a9 9 0 0 0 4 4l1-1 3 2c-1 3-5 1-7-1s-4-6-2-8Z" /></>}
  </svg>;
}

function ContactRail({ contacts, locale }: { contacts: Contacts; locale: keyof typeof labels }) {
  const [open, setOpen] = useState(false);
  const rail = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const copy = labels[locale];
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !rail.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);
  const links: Array<{ icon: IconName; title: string; detail?: string; href: string; external?: boolean }> = [
    { icon: "whatsapp", title: "WhatsApp", detail: contacts.phone, href: contacts.whatsapp, external: true },
    { icon: "email", title: copy.email, detail: contacts.email, href: `mailto:${contacts.email}` },
    { icon: "phone", title: copy.phone, detail: contacts.phone, href: contacts.phoneHref },
    { icon: "linkedin", title: "LinkedIn", href: contacts.linkedin, external: true },
    { icon: "facebook", title: "Facebook", href: contacts.facebook, external: true },
  ];
  return <aside className={s.rail} ref={rail} aria-label={copy.contact} data-open={open} onKeyDown={event => {
    if (event.key === "Escape" && open) { setOpen(false); toggle.current?.focus(); }
  }}>
    <nav className={s.links} id="floating-contact-links" aria-label={copy.contact}>
      {links.map(link => <a key={link.icon} className={`${s.link} ${link.icon === "whatsapp" ? s.whatsapp : ""}`} href={link.href}
        aria-label={`${link.title}${link.detail ? `: ${link.detail}` : ""}`}
        target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined}
        onClick={() => { if (link.icon === "whatsapp") trackAnalyticsEvent("whatsapp_started"); setOpen(false); }}>
        <ContactIcon name={link.icon} />
        <span className={s.label}><strong>{link.title}</strong>{link.detail && <span>{link.detail}</span>}</span>
      </a>)}
    </nav>
    <button className={s.toggle} type="button" ref={toggle} aria-expanded={open} aria-controls="floating-contact-links" aria-label={open ? copy.close : copy.contact} onClick={() => setOpen(!open)}>
      <ContactIcon name={open ? "close" : "chat"} />
    </button>
  </aside>;
}

export default function FloatingContactBar({ contacts }: { contacts: Contacts }) {
  const pathname = usePathname();
  if (!isPublicPath(pathname)) return null;
  return <ContactRail key={pathname} contacts={contacts} locale={pageLocale(pathname)} />;
}
