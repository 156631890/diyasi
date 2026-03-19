from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class ProductBase(BaseModel):
    model_number: str = ""
    product_name: str
    category: str
    fabric: str = ""
    color: str = ""
    size: str = ""
    moq: str = ""
    sample_time: str = ""
    production_time: str = ""
    description: str = ""


class ProductCreate(ProductBase):
    product_id: str = Field(min_length=2, max_length=80)


class ProductUpdate(BaseModel):
    model_number: Optional[str] = None
    product_name: Optional[str] = None
    category: Optional[str] = None
    fabric: Optional[str] = None
    color: Optional[str] = None
    size: Optional[str] = None
    moq: Optional[str] = None
    sample_time: Optional[str] = None
    production_time: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None


class ProductOut(ProductBase):
    product_id: str
    image_url: str = ""
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ProductCategoryOut(BaseModel):
    category: str
    count: int


class ProductImportResponse(BaseModel):
    created: int
    duplicates: int


class CategoryRenameRequest(BaseModel):
    old_category: str
    new_category: str


class CategoryDeleteRequest(BaseModel):
    category: str
    fallback_category: str = "uncategorized"


class ImageRequest(BaseModel):
    prompt: Optional[str] = None


class ImageResponse(BaseModel):
    product_id: str
    prompt: str
    image_data_url: str


class LeadCreate(BaseModel):
    brand_name: str
    website: str = ""
    email: str
    country: str = ""
    instagram: str = ""
    linkedin: str = ""
    product_category: str = ""


class LeadOut(LeadCreate):
    id: int
    score: float
    status: str
    notes: str
    created_at: datetime

    class Config:
        from_attributes = True


class LeadStatusUpdate(BaseModel):
    status: str
    notes: str = ""


class SEOGenerateRequest(BaseModel):
    topic: str
    category: str = "manufacturer"


class SEOArticleOut(BaseModel):
    title: str
    slug: str
    category: str
    excerpt: str
    body: str
    is_published: bool = True
    created_at: datetime

    class Config:
        from_attributes = True


class SEOArticleCreateRequest(BaseModel):
    title: str
    slug: Optional[str] = None
    category: str = "manufacturer"
    excerpt: str = ""
    body: str
    is_published: bool = True


class SEOArticleUpdateRequest(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    excerpt: Optional[str] = None
    body: Optional[str] = None
    is_published: Optional[bool] = None


class ChatRequest(BaseModel):
    question: str
    language: str = "English"


class ChatResponse(BaseModel):
    answer: str
    language: str


class InquiryCreate(BaseModel):
    name: str
    email: str
    company: str = ""
    message: str
    website: str = ""


class InquiryOut(InquiryCreate):
    id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class MediaGenerateRequest(BaseModel):
    asset_type: str = "poster"
    title: str = ""
    prompt: Optional[str] = None
    aspect_ratio: str = "16:9"


class MediaAssetOut(BaseModel):
    id: int
    asset_type: str
    title: str
    prompt: str
    aspect_ratio: str
    image_url: str
    model: str
    is_featured: bool = False
    is_active: bool = True
    sort_order: int = 0
    created_at: datetime

    class Config:
        from_attributes = True


class MediaAssetUpdateRequest(BaseModel):
    asset_type: Optional[str] = None
    title: Optional[str] = None
    prompt: Optional[str] = None
    aspect_ratio: Optional[str] = None
    is_featured: Optional[bool] = None
    is_active: Optional[bool] = None
    sort_order: Optional[int] = None


class BrandPackRequest(BaseModel):
    brand_name: str = "YiWu DiYaSi Dress CO., LTD"
    brand_story: str = (
        "Sustainable premium underwear manufacturing partner with over 23 years "
        "of product development and delivery excellence."
    )


class BrandPackResponse(BaseModel):
    generated: int
    assets: list[MediaAssetOut]


class OrderCreateRequest(BaseModel):
    order_ref: str
    title: str
    unit_amount_usd: float
    quantity: int = 1
    total_amount_usd: float
    status: str = "pending"
    customer_name: str = ""
    customer_email: str = ""
    source: str = "mock_checkout"
    currency: str = "USD"
    paypal_order_id: str = ""
    paypal_capture_id: str = ""
    notes: str = ""


class OrderStatusUpdateRequest(BaseModel):
    status: str
    notes: str = ""
    customer_name: Optional[str] = None
    customer_email: Optional[str] = None
    source: Optional[str] = None
    currency: Optional[str] = None
    paypal_order_id: Optional[str] = None
    paypal_capture_id: Optional[str] = None
    total_amount_usd: Optional[float] = None


class OrderOut(BaseModel):
    order_ref: str
    title: str
    unit_amount_usd: float
    quantity: int
    total_amount_usd: float
    status: str
    customer_name: str
    customer_email: str
    source: str
    currency: str
    paypal_order_id: str
    paypal_capture_id: str
    notes: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
