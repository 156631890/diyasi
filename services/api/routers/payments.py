from __future__ import annotations

import base64
from datetime import datetime
from math import floor
from typing import Any
from urllib.parse import urljoin

import httpx
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from config import settings
from database import get_db
from models import Order
from schemas import (
    PayPalCaptureOrderRequest,
    PayPalConfigOut,
    PayPalCreateOrderRequest,
)

PAYPAL_SANDBOX_API = "https://api-m.sandbox.paypal.com"
PAYPAL_LIVE_API = "https://api-m.paypal.com"

router = APIRouter(prefix="/api/payments/paypal", tags=["payments"])


def _get_paypal_api_base() -> str:
    return PAYPAL_LIVE_API if settings.paypal_env == "live" else PAYPAL_SANDBOX_API


async def _get_paypal_access_token() -> str:
    client_id = settings.paypal_client_id.strip()
    client_secret = settings.paypal_client_secret.strip()

    if not client_id or not client_secret:
        raise HTTPException(
            status_code=503,
            detail="PayPal production credentials are not configured on the payment backend.",
        )

    auth = base64.b64encode(f"{client_id}:{client_secret}".encode("utf-8")).decode("ascii")
    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(
            f"{_get_paypal_api_base()}/v1/oauth2/token",
            headers={
                "Authorization": f"Basic {auth}",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            content="grant_type=client_credentials",
        )

    if response.status_code >= 400:
        raise HTTPException(
            status_code=502,
            detail=f"Failed to get PayPal access token: {response.text}",
        )

    payload = response.json()
    token = payload.get("access_token", "")
    if not token:
        raise HTTPException(
            status_code=502,
            detail="PayPal access token missing from response.",
        )

    return token


async def _paypal_request(path: str, method: str, body: dict[str, Any] | None = None) -> httpx.Response:
    token = await _get_paypal_access_token()
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }
    async with httpx.AsyncClient(timeout=30.0) as client:
        return await client.request(
            method,
            f"{_get_paypal_api_base()}{path}",
            headers=headers,
            json=body,
        )


def _site_url() -> str:
    return settings.frontend_site_url.rstrip("/")


def _upsert_order_from_create(
    db: Session,
    *,
    order_ref: str,
    title: str,
    unit_amount_usd: float,
    quantity: int,
    total_amount_usd: float,
    source: str,
    paypal_order_id: str,
) -> Order:
    existing = db.query(Order).filter(Order.order_ref == order_ref).first()
    if existing:
        existing.title = title
        existing.unit_amount_usd = unit_amount_usd
        existing.quantity = quantity
        existing.total_amount_usd = total_amount_usd
        existing.status = "pending"
        existing.source = source
        existing.currency = "USD"
        existing.paypal_order_id = paypal_order_id
        existing.notes = f"PayPal order {paypal_order_id}"
        db.commit()
        db.refresh(existing)
        return existing

    order = Order(
        order_ref=order_ref,
        title=title,
        unit_amount_usd=unit_amount_usd,
        quantity=quantity,
        total_amount_usd=total_amount_usd,
        status="pending",
        customer_name="",
        customer_email="",
        source=source,
        currency="USD",
        paypal_order_id=paypal_order_id,
        paypal_capture_id="",
        notes=f"PayPal order {paypal_order_id}",
    )
    db.add(order)
    db.commit()
    db.refresh(order)
    return order


def _upsert_order_from_capture(
    db: Session,
    *,
    order_ref: str,
    title: str,
    unit_amount_usd: float,
    total_amount_usd: float,
    source: str,
    currency: str,
    paypal_order_id: str,
    paypal_capture_id: str,
    customer_name: str,
    customer_email: str,
    notes: str,
) -> Order:
    existing = db.query(Order).filter(Order.order_ref == order_ref).first()
    if existing:
        existing.title = title
        existing.unit_amount_usd = unit_amount_usd
        existing.quantity = 1
        existing.total_amount_usd = total_amount_usd
        existing.status = "paid"
        existing.customer_name = customer_name
        existing.customer_email = customer_email
        existing.source = source
        existing.currency = currency
        existing.paypal_order_id = paypal_order_id
        existing.paypal_capture_id = paypal_capture_id
        existing.notes = notes
        db.commit()
        db.refresh(existing)
        return existing

    order = Order(
        order_ref=order_ref,
        title=title,
        unit_amount_usd=unit_amount_usd,
        quantity=1,
        total_amount_usd=total_amount_usd,
        status="paid",
        customer_name=customer_name,
        customer_email=customer_email,
        source=source,
        currency=currency,
        paypal_order_id=paypal_order_id,
        paypal_capture_id=paypal_capture_id,
        notes=notes,
    )
    db.add(order)
    db.commit()
    db.refresh(order)
    return order


@router.get("/config", response_model=PayPalConfigOut)
def get_paypal_config() -> PayPalConfigOut:
    return PayPalConfigOut(
        clientId=settings.paypal_client_id.strip(),
        env=settings.paypal_env,
        productionReady=bool(
            settings.paypal_client_id.strip()
            and settings.paypal_client_secret.strip()
            and settings.paypal_env == "live"
        ),
    )


@router.post("/create-order")
async def create_order(payload: PayPalCreateOrderRequest, db: Session = Depends(get_db)) -> dict[str, Any]:
    if not payload.title.strip():
        raise HTTPException(status_code=400, detail="title is required.")

    quantity = max(1, floor(payload.quantity or 1))
    amount = max(1, float(payload.unitAmountUsd or 0))
    total = float(f"{amount * quantity:.2f}")
    order_ref = f"PP-{int(datetime.utcnow().timestamp() * 1000)}"
    site_url = (payload.siteUrl or _site_url()).rstrip("/")
    return_url = f"{site_url}/checkout/paypal?ref={order_ref}"
    cancel_url = f"{site_url}/checkout/cancel?ref={order_ref}&source=paypal"

    paypal_response = await _paypal_request(
        "/v2/checkout/orders",
        "POST",
        {
            "intent": "CAPTURE",
            "application_context": {
                "return_url": return_url,
                "cancel_url": cancel_url,
            },
            "purchase_units": [
                {
                    "reference_id": order_ref,
                    "custom_id": order_ref,
                    "invoice_id": order_ref,
                    "description": payload.title[:127],
                    "amount": {
                        "currency_code": "USD",
                        "value": f"{total:.2f}",
                        "breakdown": {
                            "item_total": {
                                "currency_code": "USD",
                                "value": f"{total:.2f}",
                            }
                        },
                    },
                    "items": [
                        {
                            "name": payload.title[:127],
                            "quantity": str(quantity),
                            "unit_amount": {
                                "currency_code": "USD",
                                "value": f"{amount:.2f}",
                            },
                        }
                    ],
                }
            ],
        },
    )

    if paypal_response.status_code >= 400:
        raise HTTPException(status_code=502, detail=paypal_response.text)

    paypal_order = paypal_response.json()
    approval_url = ""
    for link in paypal_order.get("links", []) or []:
        if link.get("rel") == "approve":
            approval_url = link.get("href", "") or ""
            break

    _upsert_order_from_create(
        db,
        order_ref=order_ref,
        title=payload.title,
        unit_amount_usd=amount,
        quantity=quantity,
        total_amount_usd=total,
        source="paypal_checkout",
        paypal_order_id=paypal_order.get("id", ""),
    )

    return {
        "orderId": paypal_order.get("id", ""),
        "orderRef": order_ref,
        "currency": "USD",
        "total": total,
        "approvalUrl": approval_url,
    }


@router.post("/capture-order")
async def capture_order(
    payload: PayPalCaptureOrderRequest, db: Session = Depends(get_db)
) -> dict[str, Any]:
    if not payload.orderId.strip():
        raise HTTPException(status_code=400, detail="orderId is required.")

    paypal_response = await _paypal_request(
        f"/v2/checkout/orders/{payload.orderId}/capture",
        "POST",
        {},
    )

    if paypal_response.status_code >= 400:
        raise HTTPException(status_code=502, detail=paypal_response.text)

    capture_payload = paypal_response.json()
    purchase_unit = (capture_payload.get("purchase_units") or [{}])[0]
    capture = ((purchase_unit.get("payments") or {}).get("captures") or [{}])[0]
    order_ref = (
        purchase_unit.get("custom_id")
        or purchase_unit.get("reference_id")
        or payload.orderRef
        or f"PP-{int(datetime.utcnow().timestamp() * 1000)}"
    )
    payer = capture_payload.get("payer") or {}
    payer_name = payer.get("name") or {}
    customer_name = " ".join(
        part for part in [payer_name.get("given_name"), payer_name.get("surname")] if part
    ).strip()
    customer_email = payer.get("email_address", "") or ""
    total_amount = float(purchase_unit.get("amount", {}).get("value", 0) or 0)
    currency = purchase_unit.get("amount", {}).get("currency_code", "USD") or "USD"
    capture_id = capture.get("id", "") or ""
    notes = f"PayPal capture {capture_id or 'unknown'} ({capture.get('status') or capture_payload.get('status') or 'completed'})"

    _upsert_order_from_capture(
        db,
        order_ref=order_ref,
        title=purchase_unit.get("description") or "PayPal Checkout Payment",
        unit_amount_usd=total_amount,
        total_amount_usd=total_amount,
        source="paypal_checkout",
        currency=currency,
        paypal_order_id=payload.orderId,
        paypal_capture_id=capture_id,
        customer_name=customer_name,
        customer_email=customer_email,
        notes=notes,
    )

    return {
        "status": capture_payload.get("status") or capture.get("status") or "COMPLETED",
        "orderRef": order_ref,
        "captureId": capture_id,
        "payerEmail": customer_email,
        "amount": total_amount,
        "currency": currency,
    }
