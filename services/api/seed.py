from sqlalchemy.orm import Session

from models import Lead, Product
from services.lead_scoring import calculate_lead_score


DEFAULT_PRODUCTS = [
    {
        "product_id": "SW-001",
        "product_name": "Seamless Women Brief",
        "category": "seamless underwear",
        "fabric": "Nylon 92% / Spandex 8%",
        "color": "Black",
        "size": "S-XL",
        "moq": "500 pcs",
        "sample_time": "5-7 days",
        "production_time": "20-25 days",
        "description": "Breathable seamless brief suitable for private label.",
    },
    {
        "product_id": "YL-002",
        "product_name": "High Waist Yoga Leggings",
        "category": "yoga leggings",
        "fabric": "Polyamide 75% / Elastane 25%",
        "color": "Graphite",
        "size": "XS-XL",
        "moq": "300 pcs",
        "sample_time": "5 days",
        "production_time": "18-22 days",
        "description": "Compression fit leggings with four-way stretch.",
    },
    {
        "product_id": "AB-003",
        "product_name": "Supportive Sports Bra",
        "category": "sports bras",
        "fabric": "Recycled Nylon Blend",
        "color": "Ivory",
        "size": "S-XL",
        "moq": "400 pcs",
        "sample_time": "6 days",
        "production_time": "20-28 days",
        "description": "Medium-impact sports bra with clean bonded seams.",
    },
    {
        "product_id": "MB-004",
        "product_name": "Men Seamless Boxer",
        "category": "mens underwear",
        "fabric": "Nylon 88% / Elastane 12%",
        "color": "Navy",
        "size": "M-XXL",
        "moq": "600 pcs",
        "sample_time": "6 days",
        "production_time": "22-30 days",
        "description": "Soft-touch, supportive boxer designed for all-day comfort.",
    },
    {
        "product_id": "LW-005",
        "product_name": "Soft Lounge Set",
        "category": "loungewear",
        "fabric": "Modal Cotton Blend",
        "color": "Sand",
        "size": "S-XL",
        "moq": "350 pcs",
        "sample_time": "7 days",
        "production_time": "24-30 days",
        "description": "Premium lounge set for modern comfort-focused collections.",
    },
]

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


def seed_if_empty(db: Session) -> None:
    existing_ids = {row[0] for row in db.query(Product.product_id).all()}
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

    db.commit()
