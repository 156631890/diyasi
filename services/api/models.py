from datetime import datetime

from sqlalchemy import Boolean, DateTime, Float, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from database import Base


class Product(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    product_id: Mapped[str] = mapped_column(String(80), unique=True, index=True)
    model_number: Mapped[str] = mapped_column(String(120), default="")
    product_name: Mapped[str] = mapped_column(String(255), index=True)
    category: Mapped[str] = mapped_column(String(120), index=True)
    fabric: Mapped[str] = mapped_column(String(120), default="")
    color: Mapped[str] = mapped_column(String(120), default="")
    size: Mapped[str] = mapped_column(String(120), default="")
    moq: Mapped[str] = mapped_column(String(120), default="")
    sample_time: Mapped[str] = mapped_column(String(120), default="")
    production_time: Mapped[str] = mapped_column(String(120), default="")
    description: Mapped[str] = mapped_column(Text, default="")
    image_url: Mapped[str] = mapped_column(Text, default="")
    gallery_images: Mapped[str] = mapped_column(Text, default="[]")
    price_text: Mapped[str] = mapped_column(String(120), default="")
    price_from: Mapped[str] = mapped_column(String(40), default="")
    detail_url: Mapped[str] = mapped_column(Text, default="")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )


class Lead(Base):
    __tablename__ = "leads"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    brand_name: Mapped[str] = mapped_column(String(255), index=True)
    website: Mapped[str] = mapped_column(String(255), default="")
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    country: Mapped[str] = mapped_column(String(80), default="")
    instagram: Mapped[str] = mapped_column(String(255), default="")
    linkedin: Mapped[str] = mapped_column(String(255), default="")
    product_category: Mapped[str] = mapped_column(String(120), default="")
    score: Mapped[float] = mapped_column(Float, default=0)
    status: Mapped[str] = mapped_column(String(40), default="new", index=True)
    notes: Mapped[str] = mapped_column(Text, default="")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )


class OutreachEvent(Base):
    __tablename__ = "outreach_events"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    lead_email: Mapped[str] = mapped_column(String(255), index=True)
    stage: Mapped[str] = mapped_column(String(80), index=True)
    scheduled_day: Mapped[int] = mapped_column(Integer, default=0)
    subject: Mapped[str] = mapped_column(String(255), default="")
    body: Mapped[str] = mapped_column(Text, default="")
    status: Mapped[str] = mapped_column(String(40), default="queued")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class SEOArticle(Base):
    __tablename__ = "seo_articles"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(255), index=True)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    category: Mapped[str] = mapped_column(String(120), default="manufacturer")
    excerpt: Mapped[str] = mapped_column(Text, default="")
    body: Mapped[str] = mapped_column(Text, default="")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class Inquiry(Base):
    __tablename__ = "inquiries"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), index=True)
    email: Mapped[str] = mapped_column(String(255), index=True)
    company: Mapped[str] = mapped_column(String(255), default="")
    message: Mapped[str] = mapped_column(Text, default="")
    status: Mapped[str] = mapped_column(String(40), default="new")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class MediaAsset(Base):
    __tablename__ = "media_assets"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    asset_type: Mapped[str] = mapped_column(String(80), index=True)
    title: Mapped[str] = mapped_column(String(255), default="")
    prompt: Mapped[str] = mapped_column(Text, default="")
    aspect_ratio: Mapped[str] = mapped_column(String(20), default="16:9")
    image_url: Mapped[str] = mapped_column(Text, default="")
    model: Mapped[str] = mapped_column(String(120), default="")
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    order_ref: Mapped[str] = mapped_column(String(120), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(255), default="")
    unit_amount_usd: Mapped[float] = mapped_column(Float, default=0)
    quantity: Mapped[int] = mapped_column(Integer, default=1)
    total_amount_usd: Mapped[float] = mapped_column(Float, default=0)
    status: Mapped[str] = mapped_column(String(40), default="pending", index=True)
    customer_name: Mapped[str] = mapped_column(String(255), default="")
    customer_email: Mapped[str] = mapped_column(String(255), default="")
    source: Mapped[str] = mapped_column(String(120), default="mock_checkout")
    currency: Mapped[str] = mapped_column(String(12), default="USD")
    paypal_order_id: Mapped[str] = mapped_column(String(120), default="")
    paypal_capture_id: Mapped[str] = mapped_column(String(120), default="")
    notes: Mapped[str] = mapped_column(Text, default="")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )
