from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session

from database import get_db
from models import Lead
from schemas import LeadStatusUpdate

router = APIRouter(prefix="/crm", tags=["crm"])


@router.get("/pipeline")
def pipeline(db: Session = Depends(get_db)) -> dict:
    rows = db.query(Lead.status, func.count(Lead.id)).group_by(Lead.status).all()
    return {"by_status": [{"status": status, "count": count} for status, count in rows]}


@router.patch("/leads/{lead_id}/status")
def update_lead_status(lead_id: int, payload: LeadStatusUpdate, db: Session = Depends(get_db)) -> dict:
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found.")

    lead.status = payload.status
    lead.notes = payload.notes
    db.commit()
    return {"ok": True, "lead_id": lead_id, "status": payload.status}
