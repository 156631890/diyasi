from fastapi import APIRouter, Body, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Lead
from schemas import LeadCreate, LeadOut
from services.lead_scoring import calculate_lead_score

router = APIRouter(prefix="/leads", tags=["leads"])


@router.get("/", response_model=list[LeadOut])
def list_leads(db: Session = Depends(get_db)) -> list[Lead]:
    return db.query(Lead).order_by(Lead.created_at.desc()).all()


@router.post("/", response_model=LeadOut)
def create_lead(payload: LeadCreate, db: Session = Depends(get_db)) -> Lead:
    existing = db.query(Lead).filter(Lead.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Lead email already exists.")

    lead = Lead(**payload.model_dump(), status="new")
    lead.score = calculate_lead_score(lead)
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return lead


@router.post("/analyze")
def analyze_leads(db: Session = Depends(get_db)) -> dict:
    leads = db.query(Lead).all()
    for lead in leads:
        lead.score = calculate_lead_score(lead)
    db.commit()
    qualified = sum(1 for lead in leads if lead.score >= 70)
    return {"total": len(leads), "qualified": qualified}


@router.post("/import-demo")
def import_demo_leads(db: Session = Depends(get_db)) -> dict:
    demo_data = [
        {
            "brand_name": "North Peak Active",
            "website": "https://northpeakactive.com",
            "email": "hello@northpeakactive.com",
            "country": "United States",
            "instagram": "https://instagram.com/northpeakactive",
            "linkedin": "https://linkedin.com/company/northpeakactive",
            "product_category": "activewear",
        },
        {
            "brand_name": "Urban Seamless Studio",
            "website": "https://urbanseamless.co",
            "email": "contact@urbanseamless.co",
            "country": "United Kingdom",
            "instagram": "https://instagram.com/urbanseamless",
            "linkedin": "",
            "product_category": "seamless underwear",
        },
        {
            "brand_name": "Astra Yoga Label",
            "website": "https://astrayoga.com",
            "email": "team@astrayoga.com",
            "country": "Germany",
            "instagram": "",
            "linkedin": "https://linkedin.com/company/astrayoga",
            "product_category": "yoga leggings",
        },
    ]

    created = 0
    for item in demo_data:
        if db.query(Lead).filter(Lead.email == item["email"]).first():
            continue
        lead = Lead(**item, status="new")
        lead.score = calculate_lead_score(lead)
        db.add(lead)
        created += 1

    db.commit()
    return {"created": created}


@router.post("/import-list")
def import_lead_list(payload: list[LeadCreate] = Body(default=[]), db: Session = Depends(get_db)) -> dict:
    created = 0
    duplicates = 0
    for item in payload:
        data = item.model_dump()
        if not data.get("email"):
            continue
        if db.query(Lead).filter(Lead.email == data["email"]).first():
            duplicates += 1
            continue
        lead = Lead(**data, status="new")
        lead.score = calculate_lead_score(lead)
        db.add(lead)
        created += 1

    db.commit()
    return {"created": created, "duplicates": duplicates}
