"use client";

import { buildWhatsAppUrl, trackConversionEvent, type WhatsAppContext } from "@/lib/conversion-events";

type WhatsAppLinkProps = WhatsAppContext & {
  children: React.ReactNode;
  className?: string;
};

export default function WhatsAppLink({ children, className, ...context }: WhatsAppLinkProps) {
  return (
    <a
      href={buildWhatsAppUrl(context)}
      target="_blank"
      rel="noreferrer"
      className={className}
      onClick={() => trackConversionEvent("whatsapp_started")}
    >
      {children}
    </a>
  );
}
