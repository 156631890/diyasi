import { readFile } from "fs/promises";
import path from "path";

import { safeFetchJson } from "@/lib/api";
import { fallbackCatalogCategories, fallbackCatalogProducts } from "@/lib/catalog";

export type CatalogProduct = {
  product_id: string;
  product_name: string;
  category: string;
  fabric: string;
  color?: string;
  size?: string;
  moq?: string;
  sample_time?: string;
  production_time?: string;
  description: string;
  image_url: string;
};

export type CatalogCategory = {
  category: string;
  count: number;
};

const categoryDisplayMap: Record<string, string> = {
  Thongs: "Women's Panties / Thongs",
  Brazilian: "Women's Panties / Brazilian",
  Bikini: "Women's Panties / Bikini",
  Boyshorts: "Women's Panties / Boyshorts",
  "Plus size": "Women's Panties / Plus Size",
  "Cotton Panties": "Women's Panties / Cotton Panties",
  "Laser Cut Seamless Panties": "Women's Panties / Laser Cut Seamless Panties",
  "Printed Panties Dona soft Series": "Women's Panties / Printed Panties Dona Soft Series",
  "Lace Panties": "Women's Panties / Lace Panties",
  "Lenzing Modal Panties": "Women's Panties / Lenzing Modal Panties",
  "Multipack Panties": "Women's Panties / Multipack Panties",
  "Leak Proof Period Panties": "Women's Panties / Leak Proof Period Panties",
  "Women's Underwear": "Women's Panties / General",
  "Seamless Knit Panty & Bra": "Bras / Seamless Knit Panty & Bra",
  "Seamless Bra Set": "Bras / Seamless Bra Set",
  "Men's Underwear": "Men's Underwear",
  "Sauna Clothes": "Activewear / Sauna Clothes",
  Shapewear: "Shapewear",
  "Athletic Sports Wear": "Activewear / Athletic Sports Wear",
  "Silicone Intimates & Accessories": "Accessories / Silicone Intimates & Accessories",
  "Yoga Sets": "Activewear / Yoga Sets",
  "Yoga Jumpsuit": "Activewear / Yoga Jumpsuit",
  "Yoga Top": "Activewear / Yoga Top",
  Leggings: "Activewear / Leggings",
  "Sports Shorts": "Activewear / Sports Shorts",
  "Yoga Clothing": "Activewear / Yoga Clothing",
  Homewear: "Homewear"
};

function dataFilePath(): string {
  return path.resolve(process.cwd(), "..", "..", "data", "alibaba-products.json");
}

function normalizeProducts(products: CatalogProduct[]): CatalogProduct[] {
  return products.map((product) => ({
    ...product,
    category: categoryDisplayMap[product.category] || product.category
  }));
}

async function readImportedProducts(): Promise<CatalogProduct[] | null> {
  try {
    const raw = await readFile(dataFilePath(), "utf-8");
    const parsed = JSON.parse(raw) as CatalogProduct[];
    return Array.isArray(parsed) && parsed.length > 0 ? normalizeProducts(parsed) : null;
  } catch {
    return null;
  }
}

function categoriesFromProducts(products: CatalogProduct[]): CatalogCategory[] {
  const counts = new Map<string, number>();
  for (const product of products) {
    counts.set(product.category, (counts.get(product.category) || 0) + 1);
  }
  return [...counts.entries()].map(([category, count]) => ({ category, count }));
}

export async function getCatalogProducts(): Promise<CatalogProduct[]> {
  const apiProducts = await safeFetchJson<CatalogProduct[]>("/products/", []);
  if (apiProducts.length > 0) {
    return apiProducts;
  }
  const importedProducts = await readImportedProducts();
  if (importedProducts) {
    return importedProducts;
  }
  return fallbackCatalogProducts;
}

export async function getCatalogCategories(): Promise<CatalogCategory[]> {
  const apiCategories = await safeFetchJson<CatalogCategory[]>("/products/categories", []);
  if (apiCategories.length > 0) {
    return apiCategories;
  }
  const importedProducts = await readImportedProducts();
  if (importedProducts) {
    return categoriesFromProducts(importedProducts);
  }
  return fallbackCatalogCategories;
}

export async function getCatalogProductById(productId: string): Promise<CatalogProduct | null> {
  const apiProduct = await safeFetchJson<CatalogProduct | null>(
    `/products/${encodeURIComponent(productId)}`,
    null
  );
  if (apiProduct) {
    return apiProduct;
  }
  const importedProducts = await readImportedProducts();
  if (importedProducts) {
    return importedProducts.find((item) => item.product_id === productId) || null;
  }
  return fallbackCatalogProducts.find((item) => item.product_id === productId) || null;
}
