import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductCard from "./ProductCard";
import JsonLd from "./JsonLd";
import BuyerGuidance from "./BuyerGuidance";
import { collectionBuyingGuides, moqGuide, sampleGuide } from "@/lib/buyer-guidance";
import { catalogProducts } from "@/lib/catalog-source";
import {
  collections,
  collectionImage,
  matchesCollection,
  type Collection,
} from "@/lib/collections";
import { absoluteUrl, buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export type CatalogSearch = {
  q?: string | string[];
  page?: string | string[];
  sort?: string | string[];
};
const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
const PAGE_SIZE = 12;
const modelGroups = [
  { slug: "cotton-underwear", label: "Cotton styles" },
  { slug: "lace-underwear", label: "Lace styles" },
  { slug: "seamless-underwear", label: "Seamless styles" },
  { slug: "mens-underwear", label: "Men's styles" },
] as const;
export function selectCatalog(search: CatalogSearch, collection?: Collection) {
  const q = first(search.q).trim().slice(0, 100);
  const sort = first(search.sort);
  let products = [...catalogProducts].sort(
    (a, b) => a.gender.localeCompare(b.gender) * -1,
  );
  if (collection)
    products = products.filter((p) => matchesCollection(p, collection.slug));
  if (q)
    products = products.filter((p) =>
      [p.product_name, p.model_number, p.fabric, p.fit, p.rise]
        .join(" ")
        .toLowerCase()
        .includes(q.toLowerCase()),
    );
  if (sort === "name")
    products.sort((a, b) => a.product_name.localeCompare(b.product_name));
  if (sort === "model")
    products.sort((a, b) => a.model_number.localeCompare(b.model_number));
  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const page = /^\d+$/.test(first(search.page))
    ? Number(first(search.page))
    : 1;
  return {
    products,
    q,
    page,
    totalPages,
    visible: products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
  };
}
export function catalogMetadata(
  search: CatalogSearch,
  collection?: Collection,
): Metadata {
  const path = collection ? `/products/${collection.slug}` : "/products";
  const page = /^\d+$/.test(first(search.page))
    ? Number(first(search.page))
    : 1;
  const meta = buildMetadata({
    title: `${collection ? collection.seoTitle : "Wholesale Underwear & Private Label Catalogue"}${page > 1 ? ` · Page ${page}` : ""}`,
    description:
      collection?.description ??
      "Source women's and men's underwear from DIYASI in Yiwu, China. Compare 45 cotton, lace and seamless styles, specifications and private-label sample options.",
    path: path + (page > 1 ? `?page=${page}` : ""),
  });
  return {
    ...meta,
    ...(search.q || search.sort
      ? { robots: { index: false, follow: true } }
      : {}),
  };
}
export default function CatalogPage({
  search = {},
  collection,
}: {
  search?: CatalogSearch;
  collection?: Collection;
}) {
  const { products, q, page, totalPages, visible } = selectCatalog(
    search,
    collection,
  );
  if (page < 1 || page > totalPages) notFound();
  const path = collection ? `/products/${collection.slug}` : "/products";
  const hrefForPage = (n: number) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (search.sort) params.set("sort", first(search.sort));
    if (n > 1) params.set("page", String(n));
    return path + (params.size ? "?" + params.toString() : "");
  };
  const title = collection?.title ?? "Wholesale underwear for your brand";
  return (
    <main id="main-content" className="d-catalog">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Collections", path: "/products" },
          ...(collection ? [{ name: collection.title, path }] : []),
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: title,
          url: absoluteUrl(hrefForPage(page)),
          description: collection?.description,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: visible.length,
            itemListElement: visible.map((p, i) => ({
              "@type": "ListItem",
              position: (page - 1) * PAGE_SIZE + i + 1,
              url: absoluteUrl("/products/" + p.slug),
              name: p.product_name,
            })),
          },
        }}
      />
      <section className={`d-catalog-intro ${collection ? "with-image" : ""}`}>
        <div>
          <nav className="d-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/products">Collections</Link>
            {collection && (
              <>
                <span>/</span>
                <span>{collection.short}</span>
              </>
            )}
          </nav>
          <p className="d-eyebrow">
            {collection?.eyebrow ?? "The DIYASI wardrobe"}
          </p>
          <h1>{title}</h1>
          <p>
            {collection?.description ??
              "Compare 45 women's and men's underwear styles for wholesale and private-label orders. Select by fabric, fit and construction, then request samples, a size/color mix and a quotation from our team in Yiwu, China."}
          </p>
        </div>
        {collection && (
          <div className="d-collection-preview">
            <Image
              src={collectionImage(collection)}
              alt={collection.title}
              fill
              sizes="(max-width: 700px) 32vw, 260px"
              priority
            />
          </div>
        )}
      </section>
      <div className="d-collection-nav" aria-label="Underwear collections">
        <Link href="/products" aria-current={!collection ? "page" : undefined}>
          All styles
        </Link>
        {collections.map((c) => (
          <Link
            key={c.slug}
            href={`/products/${c.slug}`}
            aria-current={collection?.slug === c.slug ? "page" : undefined}
          >
            {c.short}
          </Link>
        ))}
      </div>
      <section className="d-catalog-body">
        <form action={path} method="get" className="d-catalog-toolbar">
          <p aria-live="polite">
            {products.length} styles {q && <>matching “{q}”</>}
          </p>
          <div className="d-search">
            <label htmlFor="catalog-search" className="sr-only">
              Search styles, fabrics or model numbers
            </label>
            <input
              id="catalog-search"
              name="q"
              type="search"
              defaultValue={q}
              placeholder="Find your perfect starting point…"
            />
            <button type="submit" aria-label="Search the collection">
              Search <span aria-hidden="true">↗</span>
            </button>
          </div>
          <label className="d-sort">
            Sort by{" "}
            <select name="sort" defaultValue={first(search.sort)}>
              <option value="">Our edit</option>
              <option value="name">Name, A–Z</option>
              <option value="model">Style number</option>
            </select>
          </label>
          <button className="d-sort-apply" type="submit">
            Apply
          </button>
        </form>
        {visible.length ? (
          <div className="d-product-grid">
            <h2 className="sr-only">Available underwear styles</h2>
            {visible.map((p, i) => (
              <ProductCard key={p.slug} product={p} priority={i < 4} />
            ))}
          </div>
        ) : (
          <div className="d-empty">
            <h2>Let’s try another detail.</h2>
            <p>
              No styles match this search. Try “cotton”, “lace” or a model
              number.
            </p>
            <Link className="d-button" href={path}>
              See the full collection
            </Link>
          </div>
        )}
        {totalPages > 1 && (
          <nav className="d-pagination" aria-label="Product catalogue pages">
            {page > 1 && (
              <Link href={hrefForPage(page - 1)} rel="prev">
                ← Previous
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => (
              <Link
                key={i}
                href={hrefForPage(i + 1)}
                aria-current={page === i + 1 ? "page" : undefined}
                aria-label={`Page ${i + 1}`}
              >
                {i + 1}
              </Link>
            ))}
            {page < totalPages && (
              <Link href={hrefForPage(page + 1)} rel="next">
                Next ↗
              </Link>
            )}
          </nav>
        )}
        {!collection && page === 1 && !q && !search.sort && (
          <nav className="d-model-index" aria-label="All underwear models">
            <div className="d-model-index-heading">
              <p className="d-eyebrow">Every current style</p>
              <h2>Find a model directly.</h2>
              <p>Browse all {catalogProducts.length} catalogue models by material group. Each page has its own images, fit and specification details for your sample shortlist.</p>
            </div>
            <div className="d-model-index-grid">
              {modelGroups.map((group) => (
                <div key={group.slug}>
                  <h3>{group.label}</h3>
                  <ul>
                    {catalogProducts.filter((p) => p.collection === group.slug).map((p) => (
                      <li key={p.slug}>
                        <Link href={`/products/${p.slug}`}>
                          <strong>{p.model_number}</strong><span>{p.product_name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        )}
        {page === 1 && !q && <BuyerGuidance guide={collection ? collectionBuyingGuides[collection.slug] : {
          heading: "From wholesale catalogue to approved sample",
          intro: "Use the catalogue to compare actual styles before committing to a production run. Most listed specifications start at 120 pieces per style, with mixed sizes and colors subject to confirmation; custom fabrics and branding can have separate minimums.",
          checks: ["Shortlist model numbers, sizes and colors against your target customer.", "Request sample fees, artwork charges, packaging costs and freight as separate quotation items.", "Approve measurements, fabric, labels and a delivery schedule in writing before bulk production."],
          links: [moqGuide, sampleGuide, { label: "Factory and quality control", href: "/factory" }],
        }} />}
        <section className="d-catalog-note">
          <h2>A style is only the beginning.</h2>
          <p>
            Choose the fit and fabric that feel right for your collection. We’ll
            help you confirm samples, branding, quantity and packaging before
            production.
          </p>
          <Link href="/oem-odm" className="d-text-link">
            Explore private label ↗
          </Link>
        </section>
      </section>
    </main>
  );
}
