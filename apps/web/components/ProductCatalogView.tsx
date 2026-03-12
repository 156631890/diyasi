"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";

import BuyNowButton from "@/components/BuyNowButton";
import {
  buildGalleryImages,
  DisplayProduct,
  extractMoqNumber,
  familyOrder,
  isInStock,
  isLowMoq,
  isOemReady,
  resolveDisplayDescription,
  resolveDisplayTitle,
  resolveHoverImage,
  resolvePrice,
  resolvePriceText,
  resolvePrimaryImage,
  splitCategory,
  topFamily
} from "@/lib/product-display";

type ProductCategory = {
  category: string;
  count: number;
};

type ProductCatalogCopy = {
  all: string;
  noProducts: string;
  noImage: string;
  quote: string;
  paidSample: string;
  items: string;
  viewDetails: string;
  browseAll: string;
  categoryLabel: string;
  groupedLead: string;
  topLevelLabel: string;
  subcategoryLabel: string;
  loadMore: string;
  searchLabel: string;
  searchPlaceholder: string;
  moqLabel: string;
  priceLabel: string;
  quickView: string;
  inStock: string;
  oemReady: string;
  lowMoq: string;
  close: string;
};

type ProductCatalogViewProps = {
  products: DisplayProduct[];
  categories: ProductCategory[];
  copy: ProductCatalogCopy;
};

const INITIAL_PAGE_SIZE = 12;
const PAGE_SIZE = 12;

function sortCategories(categories: ProductCategory[]): ProductCategory[] {
  return [...categories].sort((left, right) => {
    const leftParts = splitCategory(left.category);
    const rightParts = splitCategory(right.category);
    const leftIndex = familyOrder.indexOf(leftParts.family);
    const rightIndex = familyOrder.indexOf(rightParts.family);
    const leftRank = leftIndex === -1 ? familyOrder.length : leftIndex;
    const rightRank = rightIndex === -1 ? familyOrder.length : rightIndex;

    if (leftRank !== rightRank) {
      return leftRank - rightRank;
    }
    if (leftParts.family !== rightParts.family) {
      return leftParts.family.localeCompare(rightParts.family);
    }
    return leftParts.name.localeCompare(rightParts.name);
  });
}

function sortProducts(products: DisplayProduct[]): DisplayProduct[] {
  return [...products].sort((left, right) => {
    const leftParts = splitCategory(left.category);
    const rightParts = splitCategory(right.category);
    const leftIndex = familyOrder.indexOf(leftParts.family);
    const rightIndex = familyOrder.indexOf(rightParts.family);
    const leftRank = leftIndex === -1 ? familyOrder.length : leftIndex;
    const rightRank = rightIndex === -1 ? familyOrder.length : rightIndex;

    if (leftRank !== rightRank) {
      return leftRank - rightRank;
    }
    if (left.category !== right.category) {
      return left.category.localeCompare(right.category);
    }
    return left.product_name.localeCompare(right.product_name);
  });
}

export default function ProductCatalogView({
  products,
  categories,
  copy
}: ProductCatalogViewProps) {
  const sortedProducts = useMemo(() => sortProducts(products), [products]);
  const sortedCategories = useMemo(() => sortCategories(categories), [categories]);
  const families = useMemo(
    () =>
      [...new Set(sortedCategories.map((item) => splitCategory(item.category).family))].sort(
        (left, right) => {
          const leftIndex = familyOrder.indexOf(left);
          const rightIndex = familyOrder.indexOf(right);
          const leftRank = leftIndex === -1 ? familyOrder.length : leftIndex;
          const rightRank = rightIndex === -1 ? familyOrder.length : rightIndex;
          return leftRank - rightRank || left.localeCompare(right);
        }
      ),
    [sortedCategories]
  );

  const [selectedFamily, setSelectedFamily] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [quickFilter, setQuickFilter] = useState<"all" | "in_stock" | "oem" | "low_moq">("all");
  const [quickViewProduct, setQuickViewProduct] = useState<DisplayProduct | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_PAGE_SIZE);

  const deferredFamily = useDeferredValue(selectedFamily);
  const deferredCategory = useDeferredValue(selectedCategory);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const deferredQuickFilter = useDeferredValue(quickFilter);

  const familyCategories = useMemo(() => {
    if (deferredFamily === "all") {
      return sortedCategories;
    }
    return sortedCategories.filter((item) => splitCategory(item.category).family === deferredFamily);
  }, [deferredFamily, sortedCategories]);

  const filteredProducts = useMemo(() => {
    return sortedProducts.filter((product) => {
      const byFamily = deferredFamily === "all" || topFamily(product.category) === deferredFamily;
      const byCategory = deferredCategory === "all" || product.category === deferredCategory;
      const searchable = [
        product.product_name,
        product.category,
        product.fabric,
        product.description,
        product.moq || ""
      ]
        .join(" ")
        .toLowerCase();
      const byQuery = !deferredQuery || searchable.includes(deferredQuery);
      const byQuickFilter =
        deferredQuickFilter === "all" ||
        (deferredQuickFilter === "in_stock" && isInStock(product)) ||
        (deferredQuickFilter === "oem" && isOemReady(product)) ||
        (deferredQuickFilter === "low_moq" && isLowMoq(product));
      return byFamily && byCategory && byQuery && byQuickFilter;
    });
  }, [deferredCategory, deferredFamily, deferredQuery, deferredQuickFilter, sortedProducts]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const quickViewImages = quickViewProduct ? buildGalleryImages(quickViewProduct) : [];

  function handleFamilyClick(family: string) {
    setSelectedFamily(family);
    setSelectedCategory("all");
    setVisibleCount(INITIAL_PAGE_SIZE);
  }

  function handleCategoryClick(category: string) {
    setSelectedCategory(category);
    setVisibleCount(INITIAL_PAGE_SIZE);
  }

  return (
    <>
      <section className="catalog-layout mt-8">
        <aside className="catalog-sidebar">
          <div className="catalog-sidebar-panel">
            <p className="catalog-sidebar-label">{copy.topLevelLabel}</p>
            <button
              type="button"
              className={`catalog-sidebar-link ${selectedFamily === "all" ? "catalog-sidebar-link-active" : ""}`}
              onClick={() => handleFamilyClick("all")}
            >
              <span>{copy.browseAll}</span>
              <span>{products.length}</span>
            </button>
            {families.map((family) => {
              const count = sortedProducts.filter((product) => topFamily(product.category) === family).length;
              return (
                <button
                  key={family}
                  type="button"
                  className={`catalog-sidebar-link ${selectedFamily === family ? "catalog-sidebar-link-active" : ""}`}
                  onClick={() => handleFamilyClick(family)}
                >
                  <span>{family}</span>
                  <span>{count}</span>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="catalog-main">
          <section className="catalog-filter-bar">
            <div className="catalog-subcategory-head">
              <div className="catalog-subcategory-copy">
                <p className="catalog-sidebar-label">{copy.subcategoryLabel}</p>
                <p className="catalog-toolbar-text">
                  {copy.categoryLabel}: {selectedCategory === "all" ? copy.all : selectedCategory} /{" "}
                  {filteredProducts.length} {copy.items}
                </p>
              </div>
              <label className="catalog-search">
                <span className="catalog-search-label">{copy.searchLabel}</span>
                <input
                  className="input catalog-search-input"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setVisibleCount(INITIAL_PAGE_SIZE);
                  }}
                  placeholder={copy.searchPlaceholder}
                />
              </label>
            </div>

            <div className="catalog-quick-filters">
              {[
                ["all", copy.all],
                ["in_stock", copy.inStock],
                ["oem", copy.oemReady],
                ["low_moq", copy.lowMoq]
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className={`catalog-quick-pill ${quickFilter === value ? "catalog-quick-pill-active" : ""}`}
                  onClick={() => {
                    setQuickFilter(value as "all" | "in_stock" | "oem" | "low_moq");
                    setVisibleCount(INITIAL_PAGE_SIZE);
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="catalog-filter-scroll">
              <button
                type="button"
                className={`catalog-filter-pill ${selectedCategory === "all" ? "catalog-filter-pill-active" : ""}`}
                onClick={() => handleCategoryClick("all")}
              >
                {selectedFamily === "all" ? copy.all : copy.groupedLead}
              </button>
              {familyCategories.map((item) => (
                <button
                  key={item.category}
                  type="button"
                  className={`catalog-filter-pill ${selectedCategory === item.category ? "catalog-filter-pill-active" : ""}`}
                  onClick={() => handleCategoryClick(item.category)}
                >
                  {item.category} ({item.count})
                </button>
              ))}
            </div>
          </section>

          {filteredProducts.length === 0 ? (
            <section className="catalog-grid-clean mt-6">
              <div className="card p-5 text-[#7d4f3e]">{copy.noProducts}</div>
            </section>
          ) : (
            <>
              <section className="catalog-grid-clean mt-6">
                {visibleProducts.map((product) => {
                  const displayTitle = resolveDisplayTitle(product);
                  const price = resolvePrice(product);
                  const primaryImage = resolvePrimaryImage(product);
                  const hoverImage = resolveHoverImage(product);
                  const href = `/products/${encodeURIComponent(product.product_id)}`;
                  const moqNumber = extractMoqNumber(product);

                  return (
                    <article key={product.product_id} className="catalog-card-clean">
                      <div className="catalog-card-media-shell">
                        <Link href={href} className="catalog-card-clean-media">
                          {primaryImage ? (
                            <div className="catalog-card-clean-media-stack">
                              <img
                                src={primaryImage}
                                alt={displayTitle}
                                className="catalog-card-clean-image catalog-card-clean-image-primary"
                              />
                              <img
                                src={hoverImage}
                                alt={`${displayTitle} alternate view`}
                                className="catalog-card-clean-image catalog-card-clean-image-secondary"
                              />
                            </div>
                          ) : (
                            <div className="catalog-card-clean-fallback">{copy.noImage}</div>
                          )}
                        </Link>
                        <button
                          type="button"
                          className="catalog-quick-view-btn"
                          onClick={() => setQuickViewProduct(product)}
                        >
                          {copy.quickView}
                        </button>
                      </div>

                      <div className="catalog-card-clean-copy">
                        <p className="catalog-card-clean-category">{product.category}</p>
                        <Link href={href}>
                          <h2 className="catalog-card-clean-title">{displayTitle}</h2>
                        </Link>
                        <p className="catalog-card-clean-fabric">
                          {resolveDisplayDescription(product)}
                        </p>
                        <div className="catalog-card-clean-tags">
                          {product.moq ? (
                            <span className="catalog-card-tag">
                              {copy.moqLabel}: {product.moq}
                            </span>
                          ) : null}
                          <span className="catalog-card-tag">
                            {copy.priceLabel}: {resolvePriceText(product)}
                          </span>
                          {moqNumber !== null && moqNumber <= 50 ? (
                            <span className="catalog-card-tag">{copy.lowMoq}</span>
                          ) : null}
                        </div>
                        <div className="catalog-card-clean-bottom">
                          <p className="catalog-card-clean-price">${price}</p>
                          <Link href={href} className="catalog-card-clean-link">
                            {copy.viewDetails}
                          </Link>
                        </div>
                        <div className="catalog-card-clean-actions">
                          <BuyNowButton
                            title={`${displayTitle} - ${copy.paidSample}`}
                            unitAmountUsd={price}
                          />
                          <Link href="/contact" className="btn btn-soft">
                            {copy.quote}
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </section>

              {visibleCount < filteredProducts.length ? (
                <div className="catalog-load-more">
                  <button
                    type="button"
                    className="btn btn-soft"
                    onClick={() => setVisibleCount((current) => current + PAGE_SIZE)}
                  >
                    {copy.loadMore} ({filteredProducts.length - visibleCount})
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>

      {quickViewProduct ? (
        <div className="catalog-quick-view-overlay" onClick={() => setQuickViewProduct(null)}>
          <div className="catalog-quick-view-dialog" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="catalog-quick-view-close"
              onClick={() => setQuickViewProduct(null)}
            >
              {copy.close}
            </button>
            <div className="catalog-quick-view-grid">
              <div className="catalog-quick-view-media">
                {quickViewImages[0] ? (
                  <img
                    src={quickViewImages[0]}
                    alt={resolveDisplayTitle(quickViewProduct)}
                    className="catalog-related-image"
                  />
                ) : (
                  <div className="catalog-card-clean-fallback">{copy.noImage}</div>
                )}
              </div>
              <div className="catalog-quick-view-copy">
                <p className="catalog-card-clean-category">{quickViewProduct.category}</p>
                <h3 className="catalog-group-title">{resolveDisplayTitle(quickViewProduct)}</h3>
                <p className="catalog-card-clean-fabric">
                  {resolveDisplayDescription(quickViewProduct)}
                </p>
                <div className="catalog-card-clean-tags">
                  {quickViewProduct.moq ? (
                    <span className="catalog-card-tag">
                      {copy.moqLabel}: {quickViewProduct.moq}
                    </span>
                  ) : null}
                  <span className="catalog-card-tag">
                    {copy.priceLabel}: {resolvePriceText(quickViewProduct)}
                  </span>
                </div>
                <div className="catalog-card-clean-actions">
                  <Link
                    href={`/products/${encodeURIComponent(quickViewProduct.product_id)}`}
                    className="btn btn-soft"
                  >
                    {copy.viewDetails}
                  </Link>
                  <Link href="/contact" className="btn btn-primary">
                    {copy.quote}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
