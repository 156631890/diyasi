export type DisplayProduct = {
  product_id: string;
  product_name: string;
  category: string;
  fabric: string;
  description: string;
  image_url: string;
  color?: string;
  size?: string;
  moq?: string;
  sample_time?: string;
  production_time?: string;
  gallery_images?: string[];
  price_text?: string;
  price_from?: string;
  detail_url?: string;
};

export const fallbackProductImages: Record<string, string> = {
  "SW-001": "/media/generated/products/seamless-women-brief.png",
  "YL-002": "/media/generated/products/high-waist-yoga-leggings.png",
  "AB-003": "/media/generated/products/supportive-sports-bra.png",
  "MB-004": "/media/generated/products/men-seamless-boxer.png"
};

export const categoryImagePairs: Record<string, [string, string]> = {
  "women's panties / general": [
    "/media/generated/products/seamless-women-brief.png",
    "/media/generated/products/supportive-sports-bra.png"
  ],
  "women's panties / thongs": [
    "/media/generated/products/seamless-women-brief.png",
    "/media/generated/products/high-waist-yoga-leggings.png"
  ],
  "women's panties / boyshorts": [
    "/media/generated/products/seamless-women-brief.png",
    "/media/generated/products/high-waist-yoga-leggings.png"
  ],
  "bras / seamless bra set": [
    "/media/generated/products/supportive-sports-bra.png",
    "/media/generated/products/seamless-women-brief.png"
  ],
  "men's underwear": [
    "/media/generated/products/men-seamless-boxer.png",
    "/media/generated/products/high-waist-yoga-leggings.png"
  ],
  "activewear / yoga clothing": [
    "/media/generated/products/high-waist-yoga-leggings.png",
    "/media/generated/products/supportive-sports-bra.png"
  ],
  homewear: [
    "/media/generated/products/high-waist-yoga-leggings.png",
    "/media/generated/products/seamless-women-brief.png"
  ],
  shapewear: [
    "/media/generated/products/supportive-sports-bra.png",
    "/media/generated/products/seamless-women-brief.png"
  ]
};

export const familyOrder = [
  "Women's Panties",
  "Bras",
  "Men's Underwear",
  "Activewear",
  "Shapewear",
  "Homewear",
  "Accessories"
];

const categoryPricing: Record<string, number> = {
  "women's panties / general": 249,
  "women's panties / bikini": 249,
  "women's panties / boyshorts": 249,
  "women's panties / brazilian": 249,
  "women's panties / cotton panties": 249,
  "women's panties / lace panties": 259,
  "women's panties / laser cut seamless panties": 269,
  "women's panties / leak proof period panties": 299,
  "women's panties / lenzing modal panties": 279,
  "women's panties / multipack panties": 319,
  "women's panties / plus size": 269,
  "women's panties / printed panties dona soft series": 259,
  "women's panties / thongs": 229,
  "bras / seamless bra set": 279,
  "bras / seamless knit panty & bra": 289,
  "men's underwear": 259,
  "activewear / athletic sports wear": 329,
  "activewear / leggings": 299,
  "activewear / sauna clothes": 319,
  "activewear / sports shorts": 269,
  "activewear / yoga clothing": 319,
  "activewear / yoga jumpsuit": 339,
  "activewear / yoga sets": 329,
  "activewear / yoga top": 259,
  shapewear: 299,
  homewear: 289,
  "accessories / silicone intimates & accessories": 189
};

export function keyCategory(value: string): string {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}

export function splitCategory(value: string): { family: string; name: string } {
  const parts = value.split("/").map((item) => item.trim()).filter(Boolean);
  if (parts.length === 0) {
    return { family: value, name: value };
  }
  if (parts.length === 1) {
    return { family: parts[0], name: parts[0] };
  }
  return { family: parts[0], name: parts.slice(1).join(" / ") };
}

export function topFamily(value: string): string {
  return value.split("/")[0]?.trim() || value;
}

export function resolvePrice(product: DisplayProduct): number {
  if (product.price_from) {
    const parsed = Number(product.price_from.replace(/[^\d.]/g, ""));
    if (!Number.isNaN(parsed) && parsed > 0) {
      return parsed;
    }
  }
  return categoryPricing[keyCategory(product.category)] || 279;
}

export function resolvePriceText(product: DisplayProduct): string {
  const text = (product.price_text || "").trim();
  if (text) {
    return text.startsWith("$") ? text : `$${text}`;
  }
  const price = resolvePrice(product);
  return `$${Math.max(price - 20, 0)}-${price + 40}`;
}

export function resolvePrimaryImage(product: DisplayProduct): string {
  return (
    product.image_url ||
    fallbackProductImages[product.product_id] ||
    categoryImagePairs[keyCategory(product.category)]?.[0] ||
    ""
  );
}

export function resolveHoverImage(product: DisplayProduct): string {
  return categoryImagePairs[keyCategory(product.category)]?.[1] || resolvePrimaryImage(product);
}

export function buildGalleryImages(product: DisplayProduct): string[] {
  const candidates = [
    ...(product.gallery_images || []),
    resolvePrimaryImage(product),
    resolveHoverImage(product),
    fallbackProductImages[product.product_id]
  ].filter(Boolean);
  return [...new Set(candidates)];
}

export function extractMoqNumber(product: DisplayProduct): number | null {
  const match = (product.moq || "").match(/\d+/);
  return match ? Number(match[0]) : null;
}

export function isLowMoq(product: DisplayProduct): boolean {
  const moq = extractMoqNumber(product);
  return moq !== null && moq <= 50;
}

export function isOemReady(product: DisplayProduct): boolean {
  const text = [product.product_name, product.description].join(" ").toLowerCase();
  return ["oem", "custom", "private label", "logo"].some((term) => text.includes(term));
}

export function isInStock(product: DisplayProduct): boolean {
  const text = [product.product_name, product.description].join(" ").toLowerCase();
  return text.includes("in stock") || text.includes("stock");
}
