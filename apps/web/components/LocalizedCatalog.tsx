import Image from "next/image";
import ProductPricing, { PricingNote } from "./ProductPricing";
import CategoryModelComparison from "./CategoryModelComparison";
import Link from "next/link";
import { catalogProducts } from "@/lib/catalog-source";
import { productsForCollection } from "@/lib/collections";
import { categoryCopy, localizedFabric, localizedProductName, type CatalogLocale } from "@/lib/catalog-locales";
import { localeHref } from "@/lib/locale-routes";
import { SampleButton } from "./SampleList";

export default function LocalizedCatalog({locale, englishPath}: {locale:CatalogLocale;englishPath:string}) {
  const ru = locale === "ru";
  const showProducts = englishPath === "/products" || englishPath.startsWith("/products/");
  const products = englishPath === "/products" ? catalogProducts : productsForCollection(englishPath.slice("/products/".length));
  return <>
    {englishPath.startsWith("/products/") && <CategoryModelComparison slug={englishPath.slice("/products/".length)} locale={locale}/>}
    {showProducts && <section className="page-section" id="models">
      <h2 className="card-title-standard">{ru ? "Модели каталога" : "Modelos del catálogo"} · {products.length}</h2>
      <p className="page-reference-body mt-3">{ru ? "Добавьте модели в список образцов. Полные технические карточки доступны на английском; номер модели и состав сохранены из исходного каталога." : "Añada modelos a su lista de muestras. Las fichas técnicas completas están en inglés; se conservan los números de modelo y la composición del catálogo original."}</p>
      <PricingNote locale={locale} />
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map(p => <article key={p.slug} className="card overflow-hidden">
          <Link href={`/products/${p.slug}`}><Image className="aspect-[4/3] w-full object-contain bg-white" src={p.image_url} alt={localizedProductName(p,locale)} width={480} height={360} /></Link>
          <div className="grid gap-3 p-5"><h3 className="font-semibold">{localizedProductName(p,locale)}</h3><p className="text-sm leading-6">{localizedFabric(p.fabric,locale)}</p>
            <ProductPricing product={p} locale={locale} />
            <Link className="text-sm underline" href={`/products/${p.slug}`}>{ru ? "Полная карточка (EN)" : "Ficha completa (EN)"} ↗</Link>
            <SampleButton productId={p.slug} />
          </div>
        </article>)}
      </div>
    </section>}
    <nav className="page-section card p-6" aria-label={ru ? "Категории и услуги" : "Categorías y servicios"}>
      <h2 className="card-title-standard">{ru ? "Выберите направление" : "Elija su categoría"}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(categoryCopy).map(([slug, copy]) => <Link key={slug} className="text-sm underline" href={localeHref(locale, `/products/${slug}`)!}>{copy[locale][0]}</Link>)}
      </div>
      <div className="mt-5 flex flex-wrap gap-4 text-sm underline">
        <Link href={localeHref(locale,"/oem-odm")!}>{ru ? "Производство под вашим брендом" : "Fabricación de marca propia"}</Link>
        <Link href={localeHref(locale,"/packaging")!}>{ru ? "Этикетки и упаковка" : "Etiquetas y empaque"}</Link>
        <Link href={localeHref(locale,"/factory")!}>{ru ? "Фабрика и качество" : "Fábrica y calidad"}</Link>
        <Link href={localeHref(locale,"/low-moq")!}>{ru ? "Минимальный заказ" : "Pedido mínimo"}</Link>
      </div>
    </nav>
  </>;
}
