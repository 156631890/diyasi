import json
from pathlib import Path

from sqlalchemy.orm import Session

from models import Lead, Product, SEOArticle
from services.lead_scoring import calculate_lead_score


DEFAULT_PRODUCTS = [
    {
        "product_id": "DYS-WP-001",
        "product_name": "Seamless Yoga Wear Ladies Boxer Shorts Briefs",
        "category": "Women's Panties",
        "fabric": "Nylon 92% / Spandex 8%",
        "color": "Black, Nude, Pink",
        "size": "S-XL",
        "moq": "300 pcs",
        "sample_time": "5-7 days",
        "production_time": "20-25 days",
        "description": "Seamless women's briefs developed for private label underwear collections with smooth edges and everyday comfort.",
    },
    {
        "product_id": "DYS-WP-002",
        "product_name": "Seamless Sports Yoga Women's Boxer Shorts Panties",
        "category": "Women's Panties",
        "fabric": "Nylon 90% / Spandex 10%",
        "color": "White, Coffee, Rose",
        "size": "S-XL",
        "moq": "300 pcs",
        "sample_time": "5-7 days",
        "production_time": "20-25 days",
        "description": "A sporty seamless panty silhouette suited to active underwear capsules and OEM color customization.",
    },
    {
        "product_id": "DYS-WP-003",
        "product_name": "Seamless Women's One-Piece Leggings Panty",
        "category": "Women's Panties",
        "fabric": "Polyamide 85% / Elastane 15%",
        "color": "Stone, Cocoa, Black",
        "size": "S-XL",
        "moq": "300 pcs",
        "sample_time": "6-8 days",
        "production_time": "22-28 days",
        "description": "A seamless body-hugging women's bottom with sculpted stretch and a clean surface for branded packaging programs.",
    },
    {
        "product_id": "DYS-BR-001",
        "product_name": "Seamless Ladies Silk Feel Bra",
        "category": "Bras",
        "fabric": "Nylon 88% / Spandex 12%",
        "color": "Ivory, Black, Skin",
        "size": "S-XL",
        "moq": "300 pcs",
        "sample_time": "5-7 days",
        "production_time": "20-25 days",
        "description": "Soft seamless bra with a silk-touch hand feel designed for lingerie brands needing clean-label comfort styles.",
    },
    {
        "product_id": "DYS-BR-002",
        "product_name": "Soft Underwear Bra Set",
        "category": "Bras",
        "fabric": "Nylon 90% / Spandex 10%",
        "color": "Light Taupe, Dusty Pink",
        "size": "S-XL",
        "moq": "300 pcs",
        "sample_time": "5-7 days",
        "production_time": "20-25 days",
        "description": "A soft lingerie bra program developed for light support and private label matching underwear sets.",
    },
    {
        "product_id": "DYS-TH-001",
        "product_name": "Seamless Ladies Thong Underwear",
        "category": "Thongs",
        "fabric": "Nylon 85% / Spandex 15%",
        "color": "Black, Nude, Blush",
        "size": "S-L",
        "moq": "300 pcs",
        "sample_time": "5-7 days",
        "production_time": "20-25 days",
        "description": "Minimal-line thong underwear made for seamless collections and invisible-under-clothing wear.",
    },
    {
        "product_id": "DYS-MU-001",
        "product_name": "Seamless Men's Sports Boxer Briefs",
        "category": "Men Underwear",
        "fabric": "Nylon 88% / Elastane 12%",
        "color": "Black, Navy, Grey",
        "size": "M-XXL",
        "moq": "500 pcs",
        "sample_time": "6-8 days",
        "production_time": "22-30 days",
        "description": "Performance-led men's boxer brief developed for sports use and all-day comfort with OEM waistband branding.",
    },
    {
        "product_id": "DYS-MU-002",
        "product_name": "Men's Thin Breathable Boxer Shorts",
        "category": "Men Underwear",
        "fabric": "Nylon 86% / Spandex 14%",
        "color": "Black, Olive, Steel",
        "size": "M-XXL",
        "moq": "500 pcs",
        "sample_time": "6-8 days",
        "production_time": "22-30 days",
        "description": "Lightweight men's boxer shorts with breathable stretch construction for value-driven underwear programs.",
    },
    {
        "product_id": "DYS-MU-003",
        "product_name": "Soft Touch Men's Underwear Boxer Brief",
        "category": "Men Underwear",
        "fabric": "Viscose Blend / Spandex",
        "color": "Navy, Charcoal, Wine",
        "size": "M-XXL",
        "moq": "500 pcs",
        "sample_time": "6-8 days",
        "production_time": "22-30 days",
        "description": "Soft-touch boxer brief silhouette designed for premium basics lines with stable repeat production.",
    },
    {
        "product_id": "DYS-GS-001",
        "product_name": "Seamless Women Yoga Jumpsuit Set",
        "category": "Gym & Sports Wear",
        "fabric": "Polyamide 75% / Elastane 25%",
        "color": "Graphite, Cocoa, Olive",
        "size": "S-XL",
        "moq": "300 pcs",
        "sample_time": "7 days",
        "production_time": "20-28 days",
        "description": "One-piece seamless workout set built for yoga and studio collections, combining sculpting stretch with clean branding surfaces.",
    },
    {
        "product_id": "DYS-GS-002",
        "product_name": "Seamless Women's Training Shorts",
        "category": "Gym & Sports Wear",
        "fabric": "Polyamide 78% / Elastane 22%",
        "color": "Graphite, Black, Sand",
        "size": "S-XL",
        "moq": "300 pcs",
        "sample_time": "6-8 days",
        "production_time": "20-28 days",
        "description": "Seamless active shorts for gym and studio use with a supportive fit and OEM-ready waistband details.",
    },
    {
        "product_id": "DYS-HW-001",
        "product_name": "Women's Casual Home Wear Two-Piece Set",
        "category": "Home Wear",
        "fabric": "Modal Cotton Blend",
        "color": "Cream, Sand, Mocha",
        "size": "S-XL",
        "moq": "300 sets",
        "sample_time": "7-10 days",
        "production_time": "25-30 days",
        "description": "Relaxed home wear set tailored for lounge-focused brands needing soft hand feel and coordinated private label packaging.",
    },
    {
        "product_id": "DYS-SK-001",
        "product_name": "Custom Gym Socks",
        "category": "Socks & Hosiery",
        "fabric": "Cotton 78% / Polyester 20% / Spandex 2%",
        "color": "White, Black, Custom",
        "size": "One Size / Custom",
        "moq": "1000 pairs",
        "sample_time": "5-7 days",
        "production_time": "18-25 days",
        "description": "Breathable gym socks developed for coordinated activewear drops and logo customization programs.",
    },
    {
        "product_id": "DYS-BL-001",
        "product_name": "Seamless Women's Base Layer Leggings",
        "category": "Base Layers",
        "fabric": "Polyamide 82% / Elastane 18%",
        "color": "Black, Clay, Sage",
        "size": "S-XL",
        "moq": "300 pcs",
        "sample_time": "6-8 days",
        "production_time": "20-28 days",
        "description": "Technical base layer leggings with a seamless structure for layering, studio training, and private label activewear edits.",
    },
    {
        "product_id": "DYS-SH-001",
        "product_name": "Women's Seamless Boxer Shorts",
        "category": "Shorts",
        "fabric": "Nylon 88% / Spandex 12%",
        "color": "Black, Nude, Coffee",
        "size": "S-XL",
        "moq": "300 pcs",
        "sample_time": "5-7 days",
        "production_time": "20-25 days",
        "description": "A seamless short-bottom silhouette for underwear and lounge-focused collections with flexible color development.",
    },
]

LEGACY_PRODUCT_IDS = {"SW-001", "YL-002", "AB-003", "MB-004", "LW-005"}

DEFAULT_LEADS = [
    {
        "brand_name": "EverMove Apparel",
        "website": "https://evermoveapparel.com",
        "email": "contact@evermoveapparel.com",
        "country": "United States",
        "instagram": "https://instagram.com/evermove",
        "linkedin": "https://linkedin.com/company/evermove",
        "product_category": "activewear",
        "status": "new",
    },
    {
        "brand_name": "Moonline Underwear",
        "website": "https://moonlinewear.com",
        "email": "hello@moonlinewear.com",
        "country": "France",
        "instagram": "https://instagram.com/moonlinewear",
        "linkedin": "",
        "product_category": "seamless underwear",
        "status": "new",
    },
]


DATA_DIR = Path(__file__).resolve().parents[2] / "data"
SEO_ARTICLES_PATH = DATA_DIR / "seo-articles.json"
DRAFT_PREFIX = "draft::"


def _load_seed_articles() -> list[dict]:
    if not SEO_ARTICLES_PATH.exists():
        return []
    return json.loads(SEO_ARTICLES_PATH.read_text(encoding="utf-8"))


def seed_if_empty(db: Session) -> None:
    existing_ids = {row[0] for row in db.query(Product.product_id).all()}
    if existing_ids and existing_ids.issubset(LEGACY_PRODUCT_IDS):
        db.query(Product).delete()
        db.commit()
        existing_ids = set()

    for item in DEFAULT_PRODUCTS:
        if item["product_id"] in existing_ids:
            continue
        db.add(Product(**item))

    existing_lead_emails = {row[0] for row in db.query(Lead.email).all()}
    for item in DEFAULT_LEADS:
        if item["email"] in existing_lead_emails:
            continue
        lead = Lead(**item)
        lead.score = calculate_lead_score(lead)
        db.add(lead)

    existing_article_slugs = {row[0] for row in db.query(SEOArticle.slug).all()}
    for item in _load_seed_articles():
        slug = item["slug"]
        if slug in existing_article_slugs:
            continue
        category = item.get("category", "manufacturer").strip() or "manufacturer"
        if not item.get("is_published", True):
            category = f"{DRAFT_PREFIX}{category}"
        db.add(
            SEOArticle(
                title=item["title"].strip(),
                slug=slug,
                category=category,
                excerpt=item.get("excerpt", ""),
                body=item["body"],
            )
        )

    db.commit()
