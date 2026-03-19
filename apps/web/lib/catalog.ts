export type CatalogProduct = {
  product_id: string;
  model_number?: string;
  product_name: string;
  category: string;
  fabric: string;
  description: string;
  image_url: string;
};

export type CatalogCategory = {
  category: string;
  count: number;
};

export const fallbackCatalogProducts: CatalogProduct[] = [
  {
    product_id: "DYS-WP-001",
    product_name: "Seamless Yoga Wear Ladies Boxer Shorts Briefs",
    category: "Women's Panties / General",
    fabric: "Nylon 92% / Spandex 8%",
    description:
      "Seamless women's briefs developed for private label underwear collections with smooth edges and everyday comfort.",
    image_url: ""
  },
  {
    product_id: "DYS-WP-002",
    product_name: "Seamless Sports Yoga Women's Boxer Shorts Panties",
    category: "Women's Panties / Boyshorts",
    fabric: "Nylon 90% / Spandex 10%",
    description:
      "A sporty seamless panty silhouette suited to active underwear capsules and OEM color customization.",
    image_url: ""
  },
  {
    product_id: "DYS-WP-003",
    product_name: "Seamless Women's One-Piece Leggings Panty",
    category: "Women's Panties / General",
    fabric: "Polyamide 85% / Elastane 15%",
    description:
      "A seamless body-hugging women's bottom with sculpted stretch and a clean surface for branded packaging programs.",
    image_url: ""
  },
  {
    product_id: "DYS-BR-001",
    product_name: "Seamless Ladies Silk Feel Bra",
    category: "Bras / Seamless Bra Set",
    fabric: "Nylon 88% / Spandex 12%",
    description:
      "Soft seamless bra with a silk-touch hand feel designed for lingerie brands needing clean-label comfort styles.",
    image_url: ""
  },
  {
    product_id: "DYS-BR-002",
    product_name: "Soft Underwear Bra Set",
    category: "Bras / Seamless Bra Set",
    fabric: "Nylon 90% / Spandex 10%",
    description:
      "A soft lingerie bra program developed for light support and private label matching underwear sets.",
    image_url: ""
  },
  {
    product_id: "DYS-TH-001",
    product_name: "Seamless Ladies Thong Underwear",
    category: "Women's Panties / Thongs",
    fabric: "Nylon 85% / Spandex 15%",
    description:
      "Minimal-line thong underwear made for seamless collections and invisible-under-clothing wear.",
    image_url: ""
  },
  {
    product_id: "DYS-MU-001",
    product_name: "Seamless Men's Sports Boxer Briefs",
    category: "Men's Underwear",
    fabric: "Nylon 88% / Elastane 12%",
    description:
      "Performance-led men's boxer brief developed for sports use and all-day comfort with OEM waistband branding.",
    image_url: ""
  },
  {
    product_id: "DYS-MU-002",
    product_name: "Men's Thin Breathable Boxer Shorts",
    category: "Men's Underwear",
    fabric: "Nylon 86% / Spandex 14%",
    description:
      "Lightweight men's boxer shorts with breathable stretch construction for value-driven underwear programs.",
    image_url: ""
  },
  {
    product_id: "DYS-MU-003",
    product_name: "Soft Touch Men's Underwear Boxer Brief",
    category: "Men's Underwear",
    fabric: "Viscose Blend / Spandex",
    description:
      "Soft-touch boxer brief silhouette designed for premium basics lines with stable repeat production.",
    image_url: ""
  },
  {
    product_id: "DYS-GS-001",
    product_name: "Seamless Women Yoga Jumpsuit Set",
    category: "Activewear / Yoga Jumpsuit",
    fabric: "Polyamide 75% / Elastane 25%",
    description:
      "One-piece seamless workout set built for yoga and studio collections, combining sculpting stretch with clean branding surfaces.",
    image_url: ""
  },
  {
    product_id: "DYS-GS-002",
    product_name: "Seamless Women's Training Shorts",
    category: "Activewear / Sports Shorts",
    fabric: "Polyamide 78% / Elastane 22%",
    description:
      "Seamless active shorts for gym and studio use with a supportive fit and OEM-ready waistband details.",
    image_url: ""
  },
  {
    product_id: "DYS-HW-001",
    product_name: "Women's Casual Home Wear Two-Piece Set",
    category: "Homewear",
    fabric: "Modal Cotton Blend",
    description:
      "Relaxed home wear set tailored for lounge-focused brands needing soft hand feel and coordinated private label packaging.",
    image_url: ""
  },
  {
    product_id: "DYS-SK-001",
    product_name: "Custom Gym Socks",
    category: "Accessories / Silicone Intimates & Accessories",
    fabric: "Cotton 78% / Polyester 20% / Spandex 2%",
    description:
      "Breathable gym socks developed for coordinated activewear drops and logo customization programs.",
    image_url: ""
  },
  {
    product_id: "DYS-BL-001",
    product_name: "Seamless Women's Base Layer Leggings",
    category: "Activewear / Leggings",
    fabric: "Polyamide 82% / Elastane 18%",
    description:
      "Technical base layer leggings with a seamless structure for layering, studio training, and private label activewear edits.",
    image_url: ""
  },
  {
    product_id: "DYS-SH-001",
    product_name: "Women's Seamless Boxer Shorts",
    category: "Women's Panties / Boyshorts",
    fabric: "Nylon 88% / Spandex 12%",
    description:
      "A seamless short-bottom silhouette for underwear and lounge-focused collections with flexible color development.",
    image_url: ""
  }
];

export const fallbackCatalogCategories: CatalogCategory[] = [
  { category: "Women's Panties / General", count: 2 },
  { category: "Women's Panties / Boyshorts", count: 2 },
  { category: "Men's Underwear", count: 3 },
  { category: "Bras / Seamless Bra Set", count: 2 },
  { category: "Activewear / Sports Shorts", count: 1 },
  { category: "Activewear / Yoga Jumpsuit", count: 1 },
  { category: "Activewear / Leggings", count: 1 },
  { category: "Homewear", count: 1 },
  { category: "Accessories / Silicone Intimates & Accessories", count: 1 },
  { category: "Women's Panties / Thongs", count: 1 }
];
