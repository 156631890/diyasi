import { expect, test } from "vitest";

import { alternatesFor, localeSwitchHref, spanishRoutes } from "@/lib/locale-routes";
import {
  getLocalizedPage,
  localizedCompanyFacts,
  localizedMoqRoutes,
  localizedPages,
  localizedQualitySteps,
  spanishStaticParams
} from "@/lib/localized-pages";
import { buildMetadata } from "@/lib/seo";

const expectedSpanishRoutes = [
  "/es",
  "/es/productos/ropa-interior-marca-privada",
  "/es/minimo-pedido-ropa-interior",
  "/es/ropa-interior-sin-costuras",
  "/es/fabricante-ropa-interior-china",
  "/es/empaque-personalizado",
  "/es/fabrica-y-control-de-calidad",
  "/es/contacto"
];

test("Spanish acquisition pages cover exactly the approved route map", () => {
  expect(Object.keys(localizedPages)).toEqual(expectedSpanishRoutes);
  expect(Object.values(localizedPages).map((page) => page.englishPath)).toEqual(Object.keys(spanishRoutes));
  expect(getLocalizedPage("/es/contacto")?.englishPath).toBe("/contact");
});

test("unknown Spanish paths have no localized-page fallback", () => {
  expect(getLocalizedPage("/es")).toBeDefined();
  expect(getLocalizedPage("/es/no-existe")).toBeUndefined();
  expect(getLocalizedPage("/about")).toBeUndefined();
});

test("Spanish page data uses the shared factual company, MOQ, and quality records", () => {
  expect(localizedCompanyFacts.map((fact) => fact.value)).toContain("20,000 sq m");
  expect(localizedMoqRoutes.map((route) => route.value)).toEqual([
    "desde 100 unidades por estilo cuando esté disponible",
    "500 unidades por estilo para programas de etiqueta de logo o cintura",
    "1.000 unidades por color según el tejido y la ruta de teñido",
    "1.000-3.000 unidades por estilo según el patrón, el tejido y el empaque"
  ]);
  expect(localizedMoqRoutes.map((route) => route.label)).toEqual([
    "MOQ de stock disponible",
    "MOQ de marca propia",
    "MOQ de color personalizado",
    "MOQ de OEM completo"
  ]);
  expect(localizedQualitySteps).toHaveLength(3);
  expect(localizedQualitySteps[0]?.title).toBe("Inspección de tejido entrante");
});

test("Spanish page data defines CTA pairs, visible FAQs, and explicit static params", () => {
  for (const page of Object.values(localizedPages)) {
    expect(page.rfqCta.href).toBe(page.path === "/es/contacto" ? "#cotizacion" : "/es/contacto");
    expect(page.whatsAppCta.href).toBe("https://wa.me/8618042579030");
    expect(page.faqs.length).toBeGreaterThan(0);
  }

  expect(getLocalizedPage("/es")?.priorityCta).toEqual({
    href: "/es/minimo-pedido-ropa-interior",
    label: "Ver opciones de pedido mínimo"
  });
  expect(getLocalizedPage("/es/contacto")?.rfqCta).toEqual({
    href: "#cotizacion",
    label: "Solicitar cotización"
  });
  expect(spanishStaticParams).toEqual([
    { slug: ["productos", "ropa-interior-marca-privada"] },
    { slug: ["minimo-pedido-ropa-interior"] },
    { slug: ["ropa-interior-sin-costuras"] },
    { slug: ["fabricante-ropa-interior-china"] },
    { slug: ["empaque-personalizado"] },
    { slug: ["fabrica-y-control-de-calidad"] },
    { slug: ["contacto"] }
  ]);
});

test("Spanish MOQ switches to a valid English fallback instead of the unmapped English route", () => {
  expect(localeSwitchHref("en", "/es/minimo-pedido-ropa-interior")).toBe("/products");
  expect(localeSwitchHref("es", "/products")).toBe("/es/productos/ropa-interior-marca-privada");
});

test("hreflang alternates exist only for reciprocal implemented routes", () => {
  expect(alternatesFor("/contact")).toEqual({
    en: "/contact",
    es: "/es/contacto",
    "x-default": "/contact"
  });
  expect(alternatesFor("/es/contacto")).toEqual({
    en: "/contact",
    es: "/es/contacto",
    "x-default": "/contact"
  });
  expect(alternatesFor("/about")).toBeUndefined();
  expect(alternatesFor("/es/minimo-pedido-ropa-interior")).toBeUndefined();

  expect(
    buildMetadata({ title: "Contact", description: "Contact the factory.", path: "/contact" }).alternates
  ).toEqual({
    canonical: "https://www.yiwudiyasidress.com/contact",
    languages: {
      en: "https://www.yiwudiyasidress.com/contact",
      es: "https://www.yiwudiyasidress.com/es/contacto",
      "x-default": "https://www.yiwudiyasidress.com/contact"
    }
  });
  expect(
    buildMetadata({ title: "About", description: "About the factory.", path: "/about" }).alternates
  ).toEqual({ canonical: "https://www.yiwudiyasidress.com/about" });
});
