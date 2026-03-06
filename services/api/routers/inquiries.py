from __future__ import annotations

from collections import defaultdict, deque
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from database import get_db
from models import Inquiry
from schemas import InquiryCreate, InquiryOut

router = APIRouter(prefix="/inquiries", tags=["inquiries"])

# Simple in-memory rate limiter: 5 requests per 10 minutes per IP.
RATE_WINDOW = timedelta(minutes=10)
RATE_LIMIT = 5
ip_request_times: dict[str, deque[datetime]] = defaultdict(deque)


def _assert_rate_limit(ip: str) -> None:
    now = datetime.utcnow()
    history = ip_request_times[ip]
    while history and now - history[0] > RATE_WINDOW:
        history.popleft()
    if len(history) >= RATE_LIMIT:
        raise HTTPException(status_code=429, detail="Too many inquiries from this IP. Try later.")
    history.append(now)


@router.get("/", response_model=list[InquiryOut])
def list_inquiries(db: Session = Depends(get_db)) -> list[Inquiry]:
    return db.query(Inquiry).order_by(Inquiry.created_at.desc()).all()


@router.post("/", response_model=InquiryOut)
def create_inquiry(payload: InquiryCreate, request: Request, db: Session = Depends(get_db)) -> Inquiry:
    ip = request.client.host if request.client else "unknown"
    _assert_rate_limit(ip)

    # Honeypot: bots often fill hidden "website" field.
    if payload.website.strip():
        raise HTTPException(status_code=400, detail="Spam detected.")

    message = payload.message.strip()
    if len(message) < 8:
        raise HTTPException(status_code=400, detail="Message too short.")
    if len(message) > 5000:
        raise HTTPException(status_code=400, detail="Message too long.")

    inquiry = Inquiry(
        name=payload.name.strip(),
        email=payload.email.strip(),
        company=payload.company.strip(),
        message=message,
    )
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)
    return inquiry
