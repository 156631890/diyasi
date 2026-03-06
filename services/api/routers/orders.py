from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Order
from schemas import OrderCreateRequest, OrderOut, OrderStatusUpdateRequest

router = APIRouter(prefix="/orders", tags=["orders"])


@router.get("/", response_model=list[OrderOut])
def list_orders(db: Session = Depends(get_db)) -> list[Order]:
    return db.query(Order).order_by(Order.created_at.desc()).all()


@router.get("/{order_ref}", response_model=OrderOut)
def get_order(order_ref: str, db: Session = Depends(get_db)) -> Order:
    order = db.query(Order).filter(Order.order_ref == order_ref).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found.")
    return order


@router.post("/", response_model=OrderOut)
def create_order(payload: OrderCreateRequest, db: Session = Depends(get_db)) -> Order:
    existing = db.query(Order).filter(Order.order_ref == payload.order_ref).first()
    if existing:
        return existing

    order = Order(**payload.model_dump())
    db.add(order)
    db.commit()
    db.refresh(order)
    return order


@router.patch("/{order_ref}/status", response_model=OrderOut)
def update_order_status(order_ref: str, payload: OrderStatusUpdateRequest, db: Session = Depends(get_db)) -> Order:
    order = db.query(Order).filter(Order.order_ref == order_ref).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found.")
    order.status = payload.status
    if payload.notes:
        order.notes = payload.notes
    db.commit()
    db.refresh(order)
    return order
