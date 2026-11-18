import { formatCataloguePrice, pricingCopy, type CataloguePricing, type PricingLocale } from "@/lib/catalog-pricing";
import s from "./ProductPricing.module.css";

export function PricingNote({ locale = "en" }: { locale?: PricingLocale }) {
  return <p className={s.note}>{pricingCopy[locale].terms}</p>;
}

export default function ProductPricing({ product, locale = "en", detailed = false }: { product: CataloguePricing; locale?: PricingLocale; detailed?: boolean }) {
  const copy = pricingCopy[locale];
  const price = formatCataloguePrice(product, locale);
  return <div className={`${s.pricing} ${detailed ? s.detailed : ""}`} data-product-pricing>
    <span className={s.label}>{copy.label}</span>
    <div className={s.amount}>{price ? <><strong>{price}</strong> <span>{copy.unit}</span></> : copy.quote}</div>
    <div className={s.moq}>{copy.moq}: <strong>{product.moq_pieces}</strong> {copy.perStyle}</div>
    {detailed && <>
      <PricingNote locale={locale} />
      <p className={s.source}><a href={product.source_urls[0]} target="_blank" rel="noopener noreferrer">{copy.source}</a>: <time dateTime={product.price_checked_at}>{product.price_checked_at}</time>.</p>
    </>}
  </div>;
}
