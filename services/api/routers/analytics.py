from sqlalchemy import func
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import ConversionEvent, Inquiry, Lead, OutreachEvent, SEOArticle

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("/overview")
def overview(db: Session = Depends(get_db)) -> dict:
    lead_total = db.query(func.count(Lead.id)).scalar() or 0
    qualified = db.query(func.count(Lead.id)).filter(Lead.score >= 70).scalar() or 0
    inquiries = db.query(func.count(Inquiry.id)).scalar() or 0
    outreach_total = db.query(func.count(OutreachEvent.id)).scalar() or 0
    articles = db.query(func.count(SEOArticle.id)).scalar() or 0
    conversion_events_total = db.query(func.count(ConversionEvent.id)).scalar() or 0

    country_rows = (
        db.query(Lead.country, func.count(Lead.id))
        .group_by(Lead.country)
        .order_by(func.count(Lead.id).desc())
        .limit(5)
        .all()
    )
    status_rows = db.query(Lead.status, func.count(Lead.id)).group_by(Lead.status).all()
    event_rows = (
        db.query(ConversionEvent.name, func.count(ConversionEvent.id))
        .group_by(ConversionEvent.name)
        .order_by(ConversionEvent.name)
        .all()
    )

    return {
        "inquiries": inquiries,
        "lead_conversion": round((qualified / lead_total * 100) if lead_total else 0, 1),
        "lead_total": lead_total,
        "qualified_leads": qualified,
        "outreach_events": outreach_total,
        "articles": articles,
        "conversion_events_total": conversion_events_total,
        "events_by_name": [{"name": row[0], "count": row[1]} for row in event_rows],
        "top_countries": [{"country": row[0] or "Unknown", "count": row[1]} for row in country_rows],
        "pipeline": [{"status": row[0], "count": row[1]} for row in status_rows],
    }
