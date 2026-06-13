"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";

import {
  familyOrder,
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
  compare: string;
  compareTray: string;
  compareOpen: string;
  compareClear: string;
  compareRemove: string;
  compareLimit: string;
  compareEmpty: string;
  compareMOQ: string;
  comparePrice: string;
  compareCategory: string;
  compareOEM: string;
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

export type ProductCatalogItem = {
  product_id: string;
  displayId: string;
  title: string;
  category: string;
  searchText: string;
  primaryImage: string;
  hoverImage: string;
  inStock: boolean;
  oemReady: boolean;
  lowMoq: boolean;
  moq?: string;
  fabric?: string;
  priceText?: string;
};

type ProductCatalogViewProps = {
  products: ProductCatalogItem[];
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

function sortProducts(products: ProductCatalogItem[]): ProductCatalogItem[] {
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
    return left.title.localeCompare(right.title);
  });
}

export default function ProductCatalogView({ products, categories, copy }: ProductCatalogViewProps) {
  const sortedProducts = useMemo(() => sortProducts(products), [products]);
  const sortedCategories = useMemo(() => sortCategories(categories), [categories]);
  const families = useMemo(
    () =>
      [...new Set(sortedCategories.map((item) => splitCategory(item.category).family))].sort((left, right) => {
        const leftIndex = familyOrder.indexOf(left);
        const rightIndex = familyOrder.indexOf(right);
        const leftRank = leftIndex === -1 ? familyOrder.length : leftIndex;
        const rightRank = rightIndex === -1 ? familyOrder.length : rightIndex;
        return leftRank - rightRank || left.localeCompare(right);
      }),
    [sortedCategories]
  );

  const [selectedFamily, setSelectedFamily] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [quickFilter, setQuickFilter] = useState<"all" | "in_stock" | "oem" | "low_moq">("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_PAGE_SIZE);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);

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
      const byQuery = !deferredQuery || product.searchText.includes(deferredQuery);
      const byQuickFilter =
        deferredQuickFilter === "all" ||
        (deferredQuickFilter === "in_stock" && product.inStock) ||
        (deferredQuickFilter === "oem" && product.oemReady) ||
        (deferredQuickFilter === "low_moq" && product.lowMoq);
      return byFamily && byCategory && byQuery && byQuickFilter;
    });
  }, [deferredCategory, deferredFamily, deferredQuery, deferredQuickFilter, sortedProducts]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const compareProducts = useMemo(() => sortedProducts.filter((product) => compareIds.includes(product.product_id)), [compareIds, sortedProducts]);

  function handleFamilyClick(family: string) {
    setSelectedFamily(family);
    setSelectedCategory("all");
    setVisibleCount(INITIAL_PAGE_SIZE);
  }

  function handleCategoryClick(category: string) {
    setSelectedCategory(category);
    setVisibleCount(INITIAL_PAGE_SIZE);
  }

  function toggleCompare(productId: string) {
    setCompareIds((current) => {
      if (current.includes(productId)) {
        return current.filter((item) => item !== productId);
      }
      if (current.length >= 4) {
        return current;
      }
      return [...current, productId];
    });
  }

  return (
    <section className="catalog-layout page-section">
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
                {copy.categoryLabel}: {selectedCategory === "all" ? copy.all : selectedCategory} / {filteredProducts.length}{" "}
                {copy.items}
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
            <div className="card p-5 text-[#5f6b66]">{copy.noProducts}</div>
          </section>
        ) : (
          <>
            <section className="catalog-grid-clean mt-6">
              {visibleProducts.map((product, index) => {
                const primaryLoading: "eager" | "lazy" = index < 4 ? "eager" : "lazy";
                const primaryFetchPriority: "high" | "auto" = index < 4 ? "high" : "auto";
                const href = `/products/${encodeURIComponent(product.product_id)}`;

                return (
                  <article key={product.product_id} className="catalog-card-clean">
                    <div className="relative overflow-hidden rounded-[calc(var(--panel-radius)-2px)]">
                      <Link href={href} className="catalog-card-clean-media">
                        {product.primaryImage ? (
                          <div className="catalog-card-clean-media-stack">
                            <img
                              src={product.primaryImage}
                              alt={`${product.title} - Custom Private Label Underwear Manufacturer`}
                              loading={primaryLoading}
                              decoding="async"
                              fetchPriority={primaryFetchPriority}
                              className="catalog-card-clean-image catalog-card-clean-image-primary"
                            />
                            {product.hoverImage ? (
                              <img
                                src={product.hoverImage}
                                alt={`${product.title} - OEM/ODM Underwear Production alternate view`}
                                loading="lazy"
                                decoding="async"
                                fetchPriority="low"
                                className="catalog-card-clean-image catalog-card-clean-image-secondary"
                              />
                            ) : null}
                          </div>
                        ) : (
                          <div className="catalog-card-clean-fallback">{copy.noImage}</div>
                        )}
                      </Link>

                      {/* Comparison Checkbox */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleCompare(product.product_id);
                        }}
                        className={`absolute top-2.5 right-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full border bg-white/95 shadow-sm backdrop-blur-[2px] transition-all hover:scale-105 active:scale-95 ${
                          compareIds.includes(product.product_id)
                            ? "border-[#0e5b51] text-[#0e5b51] bg-[#eef6f4]"
                            : "border-gray-200 text-gray-400 hover:text-[#0e5b51] hover:border-[#0e5b51]"
                        }`}
                        title={copy.compare}
                      >
                        {compareIds.includes(product.product_id) ? (
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                        )}
                      </button>
                    </div>

                    <div className="catalog-card-clean-copy">
                      <p className="catalog-card-clean-category">{product.category}</p>
                      <Link href={href}>
                        <h2 className="catalog-card-clean-title">{product.title}</h2>
                      </Link>
                      
                      {product.fabric ? (
                        <p className="catalog-card-clean-fabric mt-1.5 text-[12px] text-[#5f6b66] truncate">
                          {product.fabric}
                        </p>
                      ) : null}

                      <div className="catalog-card-clean-tags mt-2">
                        {product.inStock && (
                          <span className="catalog-card-tag">{copy.inStock}</span>
                        )}
                        {product.oemReady && (
                          <span className="catalog-card-tag">{copy.oemReady}</span>
                        )}
                        {product.lowMoq && (
                          <span className="catalog-card-tag">{copy.lowMoq}</span>
                        )}
                      </div>

                      <div className="catalog-card-clean-bottom mt-3 border-t border-[#d9e2dc]/40 pt-2.5">
                        <div className="flex flex-col">
                          {product.priceText && (
                            <span className="catalog-card-clean-price font-bold text-[#0e5b51]">
                              {product.priceText}
                            </span>
                          )}
                          {product.moq && (
                            <span className="text-[10px] text-[#7d8a85] mt-0.5">
                              MOQ: {product.moq}
                            </span>
                          )}
                        </div>
                        <span className="inline-block rounded bg-[#f3f7f4] px-2 py-0.5 text-[10px] font-mono text-[#57635e]">
                          {product.displayId}
                        </span>
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

      {/* Product Comparison Tray */}
      {compareIds.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#d9e2dc] bg-white/95 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300">
          <div className="container mx-auto px-4 py-4 md:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-bold text-[#1d2521] uppercase tracking-wider">{copy.compareTray}</h3>
                <span className="rounded-full bg-[#0e5b51] px-2.5 py-0.5 text-xs font-bold text-white">
                  {compareIds.length} / 4
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                {compareProducts.map((item) => (
                  <div key={item.product_id} className="relative flex items-center gap-2 rounded-lg border border-[#d9e2dc] bg-white p-1.5 pr-8">
                    {item.primaryImage ? (
                      <img src={item.primaryImage} alt={`${item.title} - Sourcing Compare`} className="h-10 w-10 rounded object-cover" />
                    ) : (
                      <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center text-[8px] text-gray-400">No Img</div>
                    )}
                    <div className="flex flex-col max-w-[120px] md:max-w-[150px]">
                      <span className="truncate text-xs font-bold text-[#1d2521]">{item.title}</span>
                      <span className="text-[10px] text-[#7d8a85] font-mono">{item.displayId}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleCompare(item.product_id)}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}

                {compareIds.length < 4 && (
                  <div className="hidden lg:flex h-12 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-[#fffdf8] px-4 text-xs text-gray-400">
                    {copy.compareLimit}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 border-t border-gray-100 pt-3 md:border-0 md:pt-0">
                <button
                  type="button"
                  onClick={() => setCompareOpen(true)}
                  className="btn btn-primary text-xs"
                >
                  {copy.compareOpen}
                </button>
                <button
                  type="button"
                  onClick={() => setCompareIds([])}
                  className="btn btn-soft text-xs"
                >
                  {copy.compareClear}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Modal Modal */}
      {compareOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#d9e2dc] bg-[#fffdf8] px-6 py-4">
              <h3 className="text-lg font-bold text-[#1d2521]">{copy.compareTray}</h3>
              <button
                type="button"
                onClick={() => setCompareOpen(false)}
                className="rounded-full p-1.5 hover:bg-gray-100 text-gray-500 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Table content */}
            <div className="overflow-auto p-6 flex-1">
              <table className="w-full table-fixed border-collapse text-left text-sm text-[#1d2521]">
                <thead>
                  <tr className="border-b border-[#d9e2dc]">
                    <th className="w-1/5 py-4 font-bold text-[#7d8a85] uppercase tracking-wider text-xs">Features</th>
                    {compareProducts.map((item) => (
                      <th key={item.product_id} className="py-4 px-3 font-bold text-center">
                        <div className="flex flex-col items-center gap-2">
                          {item.primaryImage ? (
                            <img src={item.primaryImage} alt={`${item.title} - Sourcing Specification Compare`} className="h-24 w-20 rounded object-cover shadow-sm mx-auto" />
                          ) : (
                            <div className="h-24 w-20 rounded bg-gray-100 flex items-center justify-center text-xs text-gray-400 mx-auto">No Image</div>
                          )}
                          <span className="block text-xs font-bold line-clamp-2 mt-1">{item.title}</span>
                          <span className="block text-[10px] text-gray-400 font-mono">{item.displayId}</span>
                        </div>
                      </th>
                    ))}
                    {/* Empty slots */}
                    {Array.from({ length: 4 - compareProducts.length }).map((_, idx) => (
                      <th key={`empty-th-${idx}`} className="py-4 px-3 text-center text-gray-300 text-xs font-normal border-l border-gray-100">
                        Empty Slot
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 hover:bg-[#fffdf8]">
                    <td className="py-3 font-bold text-gray-500 text-xs">{copy.compareCategory}</td>
                    {compareProducts.map((item) => (
                      <td key={`cat-${item.product_id}`} className="py-3 px-3 text-center text-xs text-[#5f6b66]">{item.category}</td>
                    ))}
                    {Array.from({ length: 4 - compareProducts.length }).map((_, idx) => (
                      <td key={`empty-cat-${idx}`} className="py-3 px-3 border-l border-gray-100"></td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-[#fffdf8]">
                    <td className="py-3 font-bold text-gray-500 text-xs">{copy.comparePrice}</td>
                    {compareProducts.map((item) => (
                      <td key={`price-${item.product_id}`} className="py-3 px-3 text-center text-xs font-bold text-[#0e5b51]">{item.priceText || "-"}</td>
                    ))}
                    {Array.from({ length: 4 - compareProducts.length }).map((_, idx) => (
                      <td key={`empty-price-${idx}`} className="py-3 px-3 border-l border-gray-100"></td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-[#fffdf8]">
                    <td className="py-3 font-bold text-gray-500 text-xs">{copy.compareMOQ}</td>
                    {compareProducts.map((item) => (
                      <td key={`moq-${item.product_id}`} className="py-3 px-3 text-center text-xs font-medium text-gray-700">{item.moq || "-"}</td>
                    ))}
                    {Array.from({ length: 4 - compareProducts.length }).map((_, idx) => (
                      <td key={`empty-moq-${idx}`} className="py-3 px-3 border-l border-gray-100"></td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-[#fffdf8]">
                    <td className="py-3 font-bold text-gray-500 text-xs">Fabric</td>
                    {compareProducts.map((item) => (
                      <td key={`fab-${item.product_id}`} className="py-3 px-3 text-center text-xs text-[#5f6b66]">{item.fabric || "-"}</td>
                    ))}
                    {Array.from({ length: 4 - compareProducts.length }).map((_, idx) => (
                      <td key={`empty-fab-${idx}`} className="py-3 px-3 border-l border-gray-100"></td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-[#fffdf8]">
                    <td className="py-3 font-bold text-gray-500 text-xs">{copy.compareOEM}</td>
                    {compareProducts.map((item) => (
                      <td key={`oem-${item.product_id}`} className="py-3 px-3 text-center text-xs">
                        {item.oemReady ? (
                          <span className="inline-block rounded bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-700">Supported</span>
                        ) : (
                          <span className="inline-block rounded bg-gray-50 px-2 py-0.5 text-[10px] text-gray-400">No</span>
                        )}
                      </td>
                    ))}
                    {Array.from({ length: 4 - compareProducts.length }).map((_, idx) => (
                      <td key={`empty-oem-${idx}`} className="py-3 px-3 border-l border-gray-100"></td>
                    ))}
                  </tr>
                  <tr className="hover:bg-[#fffdf8]">
                    <td className="py-4 font-bold text-gray-500 text-xs">Action</td>
                    {compareProducts.map((item) => (
                      <td key={`act-${item.product_id}`} className="py-4 px-3 text-center">
                        <div className="flex flex-col gap-2 items-center">
                          <Link href={`/products/${encodeURIComponent(item.product_id)}`} className="btn btn-soft text-[10px] py-1 px-3">
                            {copy.viewDetails}
                          </Link>
                          <button
                            type="button"
                            onClick={() => toggleCompare(item.product_id)}
                            className="text-[10px] text-red-500 hover:underline"
                          >
                            {copy.compareRemove}
                          </button>
                        </div>
                      </td>
                    ))}
                    {Array.from({ length: 4 - compareProducts.length }).map((_, idx) => (
                      <td key={`empty-act-${idx}`} className="py-4 px-3 border-l border-gray-100"></td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
