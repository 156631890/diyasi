import json
from pathlib import Path

from sqlalchemy.orm import Session

from models import Lead, Product, SEOArticle
from services.lead_scoring import calculate_lead_score


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


def _load_seed_products() -> list[dict]:
    from catalog import product_seed_rows
    return product_seed_rows()


def seed_if_empty(db: Session) -> None:
    existing_ids = {row[0] for row in db.query(Product.product_id).all()}
    products_to_seed = _load_seed_products()
    for item in products_to_seed:
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
