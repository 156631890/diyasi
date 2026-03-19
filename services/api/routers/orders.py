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
    if payload.customer_name is not None:
        order.customer_name = payload.customer_name
    if payload.customer_email is not None:
        order.customer_email = payload.customer_email
    if payload.source is not None:
        order.source = payload.source
    if payload.currency is not None:
        order.currency = payload.currency
    if payload.paypal_order_id is not None:
        order.paypal_order_id = payload.paypal_order_id
    if payload.paypal_capture_id is not None:
        order.paypal_capture_id = payload.paypal_capture_id
    if payload.total_amount_usd is not None:
        order.total_amount_usd = payload.total_amount_usd
    db.commit()
    db.refresh(order)
    return order
