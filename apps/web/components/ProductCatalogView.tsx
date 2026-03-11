"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";

import BuyNowButton from "@/components/BuyNowButton";
import {
  DisplayProduct,
  familyOrder,
  resolveHoverImage,
  resolvePrice,
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
  const [visibleCount, setVisibleCount] = useState(INITIAL_PAGE_SIZE);

  const deferredFamily = useDeferredValue(selectedFamily);
  const deferredCategory = useDeferredValue(selectedCategory);

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
      return byFamily && byCategory;
    });
  }, [deferredCategory, deferredFamily, sortedProducts]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

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
            <p className="catalog-sidebar-label">{copy.subcategoryLabel}</p>
            <p className="catalog-toolbar-text">
              {copy.categoryLabel}: {selectedCategory === "all" ? copy.all : selectedCategory} /{" "}
              {filteredProducts.length} {copy.items}
            </p>
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
                const price = resolvePrice(product);
                const primaryImage = resolvePrimaryImage(product);
                const hoverImage = resolveHoverImage(product);
                const href = `/products/${encodeURIComponent(product.product_id)}`;

                return (
                  <article key={product.product_id} className="catalog-card-clean">
                    <Link href={href} className="catalog-card-clean-media">
                      {primaryImage ? (
                        <div className="catalog-card-clean-media-stack">
                          <img
                            src={primaryImage}
                            alt={product.product_name}
                            className="catalog-card-clean-image catalog-card-clean-image-primary"
                          />
                          <img
                            src={hoverImage}
                            alt={`${product.product_name} alternate view`}
                            className="catalog-card-clean-image catalog-card-clean-image-secondary"
                          />
                        </div>
                      ) : (
                        <div className="catalog-card-clean-fallback">{copy.noImage}</div>
                      )}
                    </Link>

                    <div className="catalog-card-clean-copy">
                      <p className="catalog-card-clean-category">{product.category}</p>
                      <Link href={href}>
                        <h2 className="catalog-card-clean-title">{product.product_name}</h2>
                      </Link>
                      <p className="catalog-card-clean-fabric">{product.fabric || product.description}</p>
                      <div className="catalog-card-clean-bottom">
                        <p className="catalog-card-clean-price">${price}</p>
                        <Link href={href} className="catalog-card-clean-link">
                          {copy.viewDetails}
                        </Link>
                      </div>
                      <div className="catalog-card-clean-actions">
                        <BuyNowButton
                          title={`${product.product_name} - ${copy.paidSample}`}
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
  );
}
