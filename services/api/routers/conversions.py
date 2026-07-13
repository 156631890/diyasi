from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from database import get_db
from models import ConversionEvent
from schemas import ConversionEventCreate, ConversionEventOut

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.post("/events", response_model=ConversionEventOut, status_code=status.HTTP_201_CREATED)
def create_conversion_event(
    payload: ConversionEventCreate, db: Session = Depends(get_db)
) -> ConversionEvent:
    event = ConversionEvent(**payload.model_dump())
    db.add(event)
    db.commit()
    db.refresh(event)
    return event
