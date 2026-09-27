"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import {
  getAnalyticsConsent,
  setAnalyticsConsent,
  safeAnalyticsContext,
  trackAnalyticsEvent,
  stopAnalytics,
} from "@/lib/analytics";

function subscribe(callback: () => void) {
  window.addEventListener("diyasi-consent-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("diyasi-consent-change", callback);
    window.removeEventListener("storage", callback);
  };
}
const serverConsent = () => null;

export default function AnalyticsConsent() {
  const pathname = usePathname();
  const consent = useSyncExternalStore(
    subscribe,
    getAnalyticsConsent,
    serverConsent,
  );
  const [settingsOpen, setSettingsOpen] = useState(false);
  const lastPath = useRef("");
  const spanish = pathname === "/es" || pathname.startsWith("/es/");
  useEffect(() => {
    if (consent !== "granted") {
      stopAnalytics();
      lastPath.current = "";
      return;
    }
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    trackAnalyticsEvent("page_view");
    const context = safeAnalyticsContext(pathname);
    if (context?.product_id) trackAnalyticsEvent("product_view");
  }, [pathname, consent]);

  if (!safeAnalyticsContext(pathname)) return null;
  function choose(value: "granted" | "denied") {
    setAnalyticsConsent(value);
    setSettingsOpen(false);
  }
  return (
    <>
      <button
        className="d-cookie-settings"
        type="button"
        onClick={() => setSettingsOpen(true)}
      >
        {spanish ? "Preferencias de cookies" : "Cookie preferences"}
      </button>
      {(consent === null || settingsOpen) && (
        <section
          className="d-cookie-banner"
          aria-label={
            spanish ? "Preferencias de privacidad" : "Privacy preferences"
          }
        >
          <div>
            <strong>
              {spanish
                ? "Ayúdanos a mejorar tu visita"
                : "Help us make your visit better"}
            </strong>
            <p>
              {spanish
                ? "Con tu permiso, Google Analytics mide visitas y clics para mejorar nuestro catálogo. No enviamos tus datos de contacto ni el texto del formulario. Puedes rechazarlo o cambiar tu elección."
                : "With your permission, Google Analytics measures visits and clicks to help us improve our catalogue. We do not send your contact details or form messages. You can decline or change your choice."}{" "}
              <a href="/privacy-policy">
                {spanish ? "Privacidad" : "Privacy policy"}
              </a>
            </p>
          </div>
          <div className="d-cookie-actions">
            <button
              type="button"
              className="d-button d-button-outline"
              onClick={() => choose("denied")}
            >
              {spanish ? "Rechazar" : "Decline"}
            </button>
            <button
              type="button"
              className="d-button"
              onClick={() => choose("granted")}
            >
              {spanish ? "Permitir estadísticas" : "Allow analytics"}
            </button>
          </div>
        </section>
      )}
    </>
  );
}
