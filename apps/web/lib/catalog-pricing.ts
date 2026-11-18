import type { CatalogProduct } from "./catalog-source";

export type PricingLocale = "en" | "es" | "ru";
export type CataloguePricing = Pick<CatalogProduct, "price_from" | "price_currency" | "moq_pieces" | "price_checked_at" | "source_urls">;

export const pricingCopy = {
  en: {
    label: "Reference price", unit: "/ piece", moq: "MOQ", perStyle: "pieces / style",
    terms: "Reference catalogue prices. Confirm the final unit price, size/color mix, custom labels and packaging, sample charges, shipping and taxes in your written quotation.",
    source: "Manufacturer price checked", quote: "Final quotation required.",
  },
  es: {
    label: "Precio de referencia", unit: "/ unidad", moq: "Pedido mínimo", perStyle: "unidades / modelo",
    terms: "Precios de referencia del catálogo. Confirme en la cotización escrita el precio final por unidad, la combinación de tallas y colores, las etiquetas y el empaque personalizados, las muestras, el envío y los impuestos.",
    source: "Precio del fabricante verificado", quote: "Sujeto a cotización final.",
  },
  ru: {
    label: "Ориентировочная цена", unit: "/ шт.", moq: "Мин. заказ", perStyle: "шт. / модель",
    terms: "Ориентировочные цены каталога. Подтвердите в письменном коммерческом предложении окончательную цену за единицу, сочетание размеров и цветов, индивидуальные этикетки и упаковку, стоимость образцов, доставки и налоги.",
    source: "Цена производителя проверена", quote: "Требуется окончательный расчёт.",
  },
} as const;

export function formatCataloguePrice(product: Pick<CataloguePricing, "price_from" | "price_currency">, locale: PricingLocale = "en") {
  const amount = Number(product.price_from);
  if (!product.price_from || !Number.isFinite(amount) || amount <= 0 || product.price_currency !== "USD") return null;
  return `US$${amount.toLocaleString(locale === "en" ? "en-US" : locale === "es" ? "es-ES" : "ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
