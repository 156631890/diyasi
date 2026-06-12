export type DisplayProduct = {
  product_id: string;
  model_number?: string;
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
    "/media/home/banner-1.jpg",
    "/media/home/banner-2.png"
  ],
  "women's panties / thongs": [
    "/media/home/banner-2-2-3.jpg",
    "/media/home/banner-1.jpg"
  ],
  "women's panties / boyshorts": [
    "/media/home/banner-2.png",
    "/media/home/banner-3.jpg"
  ],
  "bras / seamless bra set": [
    "/media/home/banner-2-3-4-1.jpg",
    "/media/home/banner-2.png"
  ],
  "men's underwear": [
    "/media/home/banner-3.jpg",
    "/media/home/banner-1.jpg"
  ],
  "activewear / yoga clothing": [
    "/media/home/banner-2-2-3.jpg",
    "/media/home/factory-2.jpg"
  ],
  homewear: [
    "/media/home/banner-3.jpg",
    "/media/home/banner-2.png"
  ],
  shapewear: [
    "/media/home/banner-2.png",
    "/media/home/banner-1.jpg"
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

export function resolveDisplayProductId(product: Pick<DisplayProduct, "product_id" | "model_number">): string {
  const modelNumber = (product.model_number || "").trim();
  if (modelNumber) {
    return modelNumber;
  }
  const rawId = product.product_id.trim();
  if (!rawId) {
    return "";
  }
  if (rawId.startsWith("DYS-")) {
    return rawId;
  }
  if (rawId.startsWith("ALI-")) {
    const normalizedSuffix = rawId.slice(4).replace(/[^A-Za-z0-9]+/g, "");
    return normalizedSuffix ? `DYS-${normalizedSuffix}` : "DYS";
  }
  return rawId;
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
  const galleryImage = product.gallery_images?.find((image) => !isThirdPartyProductImage(image));
  if (galleryImage) {
    return galleryImage;
  }
  if (product.image_url && !isThirdPartyProductImage(product.image_url)) {
    return product.image_url;
  }
  return categoryImagePairs[keyCategory(product.category)]?.[0] || fallbackProductImages[product.product_id] || "";
}

export function resolveHoverImage(product: DisplayProduct): string {
  const galleryImage = product.gallery_images?.filter((image) => !isThirdPartyProductImage(image))[1];
  if (galleryImage) {
    return galleryImage;
  }
  return categoryImagePairs[keyCategory(product.category)]?.[1] || resolvePrimaryImage(product);
}

export function buildGalleryImages(product: DisplayProduct): string[] {
  const candidates = [
    ...(product.gallery_images || []).filter((image) => !isThirdPartyProductImage(image)),
    resolvePrimaryImage(product),
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

const TITLE_BANNED_PATTERNS = [
  /\bbig\s+ass\b/gi,
  /\bsexy\b/gi,
  /\bhot\b/gi,
  /\bgirl(?:s)?\b/gi,
  /\bcute\b/gi,
  /\bfashion\b/gi,
  /\bready[\s-]*to[\s-]*ship\b/gi,
  /\bin stock\b/gi,
  /\bstock\b/gi,
  /\blow price\b/gi,
  /\bhot sale\b/gi,
  /\bbest selling\b/gi,
  /\bwholesale\b/gi,
  /\bcross-border\b/gi
];

const DESCRIPTION_BANNED_PATTERNS = [
  /\bbig\s+ass\b/gi,
  /\bsexy\b/gi,
  /\bhot\b/gi,
  /\bgirl(?:s)?\b/gi,
  /\bcute\b/gi,
  /\bready[\s-]*to[\s-]*ship\b/gi,
  /\bin stock\b/gi,
  /\bstock\b/gi,
  /\blow price\b/gi,
  /\bhot sale\b/gi,
  /\bbest selling\b/gi,
  /\bwholesale\b/gi,
  /\bcross-border\b/gi,
  /\balibaba source link\b/gi,
  /\bvisible alibaba fob range\b/gi,
  /\bthis listing is grouped under\b/gi,
  /\breference fob\b/gi,
  /\bmoq\b/gi,
  /https?:\/\/[^\s]+/gi,
  /www\.[^\s]+/gi
];

const TITLE_FILLER_WORDS = new Set([
  "ready",
  "ship",
  "stock",
  "cheap",
  "low-price",
  "low",
  "price"
]);

function isThirdPartyProductImage(value: string): boolean {
  // Allow all images to render normally, including alicdn and alibaba source images.
  return false;
}

function detectFabric(value: string): string {
  const text = value.toLowerCase();
  if (text.includes("modal")) return "Modal";
  if (text.includes("bamboo")) return "Bamboo";
  if (text.includes("cotton")) return "Cotton";
  if (text.includes("microfiber") || text.includes("micro fibre")) return "Microfiber";
  if (text.includes("nylon") || text.includes("polyamide")) return "Nylon Blend";
  if (text.includes("satin")) return "Satin";
  if (text.includes("lace")) return "Lace";
  if (text.includes("ribbed")) return "Ribbed Knit";
  return "Soft Stretch";
}

function detectStyle(product: DisplayProduct): string {
  const text = [product.product_name, product.category, product.description].join(" ").toLowerCase();
  if (text.includes("period") || text.includes("leak")) return "Period Underwear with Leakproof Lining";
  if (text.includes("boxer brief")) return "Boxer Briefs";
  if (text.includes("boxer")) return "Boxer Shorts";
  if (text.includes("thong") || text.includes("g-string") || text.includes("g string")) return "Thong Underwear";
  if (text.includes("bikini")) return "Bikini Briefs";
  if (text.includes("hipster")) return "Hipster Panties";
  if (text.includes("boyshort")) return "Boyshort Briefs";
  if (text.includes("brief")) return "Briefs";
  if (text.includes("bralette")) return "Bralette";
  if (text.includes("sports bra")) return "Sports Bra";
  if (text.includes("bra")) return "Bra";
  if (text.includes("legging")) return "Leggings";
  if (text.includes("shorts")) return "Shorts";
  if (text.includes("jumpsuit")) return "Yoga Jumpsuit";
  if (text.includes("shapewear") || text.includes("shaping")) return "Shaping Briefs";
  if (text.includes("pajama") || text.includes("sleepwear")) return "Loungewear Set";
  if (text.includes("nightdress")) return "Sleep Dress";
  return "Underwear";
}

function buildProfessionalTitle(product: DisplayProduct): string {
  const family = topFamily(product.category);
  const fabric = detectFabric([product.fabric, product.product_name].join(" "));
  const style = detectStyle(product);
  const text = [product.product_name, product.category, product.description].join(" ").toLowerCase();
  const seamless = text.includes("seamless") ? "Seamless " : "";
  const noShow = text.includes("no show") || text.includes("invisible") || text.includes("laser")
    ? " with No-Show Fit"
    : "";

  if (family === "Men's Underwear") {
    return `Men's ${fabric} ${seamless}${style} for Private Label Basics`;
  }
  if (family === "Bras") {
    return `Women's ${fabric} ${seamless}${style} for Private Label Intimates Brands`;
  }
  if (family === "Activewear") {
    return `Women's ${fabric} ${seamless}${style} for Activewear Brands`;
  }
  if (family === "Shapewear") {
    return `Women's ${fabric} ${seamless}${style} for Shapewear Collections`;
  }
  if (family === "Homewear") {
    return `Women's ${fabric} ${style} for Private Label Loungewear Brands`;
  }
  return `Women's ${fabric} ${seamless}${style}${noShow} for Private Label Underwear Brands`;
}

function normalizeTitleSeparators(value: string): string {
  return value
    .replace(/[|/]+/g, " ")
    .replace(/[_-]+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function dedupeTitleWords(value: string): string {
  const words = value.split(/\s+/);
  const seen = new Set<string>();
  const cleaned: string[] = [];

  for (const word of words) {
    const normalized = word.toLowerCase().replace(/[^a-z0-9]+/g, "");
    if (!normalized) {
      continue;
    }
    if (TITLE_FILLER_WORDS.has(normalized)) {
      continue;
    }
    if (seen.has(normalized) && normalized.length > 3) {
      continue;
    }
    seen.add(normalized);
    cleaned.push(word);
  }

  return cleaned.join(" ");
}

export function resolveDisplayTitle(product: DisplayProduct): string {
  const professionalTitle = buildProfessionalTitle(product);
  if (professionalTitle) {
    return professionalTitle.replace(/\s{2,}/g, " ").trim();
  }

  let title = product.product_name || "";
  for (const pattern of TITLE_BANNED_PATTERNS) {
    title = title.replace(pattern, " ");
  }
  title = normalizeTitleSeparators(title);
  title = dedupeTitleWords(title);
  title = title.replace(/\s{2,}/g, " ").replace(/\b(?:for|with|and)\s*$/i, "").trim();
  return title || product.product_name;
}

function normalizeSentence(value: string): string {
  return value
    .replace(/\s+/g, " ")
    .replace(/\s*,\s*/g, ", ")
    .replace(/\s*\.\s*/g, ". ")
    .trim()
    .replace(/^[,.;:\s]+|[,.;:\s]+$/g, "");
}

function cleanDescriptionText(value: string): string {
  let cleaned = value || "";
  for (const pattern of DESCRIPTION_BANNED_PATTERNS) {
    cleaned = cleaned.replace(pattern, " ");
  }
  cleaned = cleaned
    .replace(/\$\s*\d+(?:\.\d+)?\s*-\s*\d+(?:\.\d+)?/g, " ")
    .replace(/\b\d+\s*(?:pieces|piece|pcs)\b/gi, " ")
    .replace(/\b(?:factory direct|direct factory)\b/gi, "factory production")
    .replace(/\bsexy\b/gi, "")
    .replace(/\bladies girls\b/gi, "women")
    .replace(/\bnew arrival\b/gi, "")
    .replace(/\brelief body\b/gi, "bodywear")
    .replace(/\s{2,}/g, " ");
  return normalizeSentence(cleaned);
}

export function resolveDisplayDescription(product: DisplayProduct): string {
  const description = cleanDescriptionText(product.description || "");
  const fabric = normalizeSentence(product.fabric || "");
  const title = resolveDisplayTitle(product);
  const family = topFamily(product.category).toLowerCase();
  const parts: string[] = [];

  if (description) {
    parts.push(description);
  } else if (fabric) {
    parts.push(`${fabric} construction for brand and private label programs.`);
  } else {
    parts.push(
      `Professional ${topFamily(product.category).toLowerCase()} manufacturing for retail, DTC, and private label programs.`
    );
  }
  parts.push(
    `${title} is suitable for ${family} buyers who need clear sampling, custom labeling, packaging coordination, and stable bulk production.`
  );

  const summary = normalizeSentence(parts.join(" "));
  return summary || `${resolveDisplayTitle(product)} for brand, retail, and private label programs.`;
}

export function resolveMoqText(product: DisplayProduct): string {
  const source = product.moq || "";
  const number = extractMoqNumber(product);
  if (number && number >= 100) {
    return source;
  }
  const family = topFamily(product.category);
  if (family === "Men's Underwear" || family === "Women's Panties" || family === "Bras") {
    return "Ready stock from 100 pcs when available; private label from 500 pcs; full OEM quoted by project.";
  }
  return "Private label MOQ depends on fabric, color, size range, and packaging route.";
}

export function resolveSampleTimeText(product: DisplayProduct): string {
  return product.sample_time || "5-7 days for stock fabric sample; 10-20 days for custom color or new pattern sample.";
}

export function resolveProductionTimeText(product: DisplayProduct): string {
  return product.production_time || "20-35 days after sample approval and deposit, depending on quantity and customization.";
}

export function resolveCustomizationText(): string[] {
  return [
    "Custom color",
    "Custom waistband",
    "Custom care label",
    "Heat transfer logo",
    "Hangtag",
    "Polybag",
    "Gift box",
    "Barcode / SKU sticker"
  ];
}

export function resolveSuitableFor(product: DisplayProduct): string[] {
  const family = topFamily(product.category);
  if (family === "Activewear") {
    return ["DTC activewear brands", "Studio and yoga labels", "Retail buyers", "Wholesale sportswear programs"];
  }
  if (family === "Men's Underwear") {
    return ["Men's basics brands", "Amazon private label sellers", "Retail multipack programs", "Wholesale buyers"];
  }
  if (family === "Bras") {
    return ["DTC intimates brands", "Boutique lingerie retailers", "Matching set programs", "Private label buyers"];
  }
  return [
    "Shopify underwear brands",
    "TikTok Shop sellers",
    "Amazon private label sellers",
    "Boutique retailers",
    "Subscription box brands",
    "Wholesale buyers"
  ];
}
