from datetime import datetime
from typing import Literal, Optional

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator


_REVIEWED_PRODUCT_IDS = frozenset(
    {
        "DYS-1601642594802",
        "DYS-1601700253074",
        "DYS-1601668037716",
        "DYS-1601700082173",
        "DYS-1601560752382",
        "DYS-1601421046806",
        "DYS-1601603600505",
        "DYS-1601663234376",
        "DYS-1601682971804",
        "DYS-1600455122336",
        "DYS-1600285556699",
        "DYS-1601707021411",
    }
)
_REVIEWED_PRODUCT_ROUTES = {
    "DYS-1601642594802": "ready-stock",
    "DYS-1601700253074": "ready-stock",
    "DYS-1601668037716": "private-label",
    "DYS-1601700082173": "private-label",
    "DYS-1601560752382": "private-label",
    "DYS-1601421046806": "ready-stock",
    "DYS-1601603600505": "ready-stock",
    "DYS-1601663234376": "private-label",
    "DYS-1601682971804": "private-label",
    "DYS-1600455122336": "private-label",
    "DYS-1600285556699": "private-label",
    "DYS-1601707021411": "ready-stock",
}
_STATIC_PUBLIC_PATHS = frozenset(
    {
        "/",
        "/products",
        "/products/womens-panties",
        "/products/seamless-underwear",
        "/products/bras",
        "/products/shapewear",
        "/products/mens-underwear",
        "/products/period-underwear",
        "/products/activewear",
        "/products/homewear",
        "/oem-odm",
        "/factory",
        "/contact",
        "/about",
        "/fabrics",
        "/packaging",
        "/sustainability",
        "/resources",
        "/privacy-policy",
        "/return-policy",
    }
)
_APPROVED_ES_PATHS = frozenset(
    {
        "/es",
        "/es/productos/ropa-interior-marca-privada",
        "/es/minimo-pedido-ropa-interior",
        "/es/ropa-interior-sin-costuras",
        "/es/fabricante-ropa-interior-china",
        "/es/empaque-personalizado",
        "/es/fabrica-y-control-de-calidad",
        "/es/contacto",
    }
)
_RESOURCE_SLUGS = frozenset(
    {
        "accurate-underwear-yoga-wear-manufacturing-quote",
        "unit-cost-custom-underwear-manufacturing",
        "traceless-vs-seamless-underwear-yoga-brands",
        "lace-underwear-oem-guide-boutique-lingerie-brands",
        "cotton-underwear-oem-guide-daily-basics-startups",
        "waistband-customization-mens-boxer-briefs-private-label",
        "gusset-construction-womens-underwear-comfort-qc",
        "sports-bra-support-levels-small-yoga-brands",
        "reorder-planning-after-low-moq-first-run",
        "us-eu-underwear-size-labeling-preparation-startup-brands",
    }
)


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
    country: str = Field(default="", max_length=80)
    category: str = Field(default="", max_length=120)
    quantity: str = Field(default="", max_length=80)
    project_route: str = Field(default="", max_length=40)
    private_label: str = Field(default="", max_length=255)
    packaging: str = Field(default="", max_length=255)
    launch_date: str = Field(default="", max_length=40)


class InquiryOut(InquiryCreate):
    id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class ConversionEventCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: Literal[
        "low_moq_route_selected",
        "quote_started",
        "quote_submitted",
        "whatsapp_started",
        "product_inquiry_started",
        "resource_to_quote",
    ]
    path: str = Field(max_length=255)
    locale: Literal["en", "es", "zh"] = "en"
    project_route: Literal["", "ready-stock", "private-label", "custom-color", "full-oem"] = ""
    product_id: str = Field(default="", max_length=80)

    @classmethod
    def _is_approved_public_path(cls, value: str) -> bool:
        if value in _STATIC_PUBLIC_PATHS or value in _APPROVED_ES_PATHS:
            return True
        if value.startswith("/products/"):
            return value.removeprefix("/products/") in _REVIEWED_PRODUCT_IDS
        if value.startswith("/resources/"):
            return value.removeprefix("/resources/") in _RESOURCE_SLUGS
        return False

    @field_validator("path")
    @classmethod
    def validate_path(cls, value: str) -> str:
        if not cls._is_approved_public_path(value):
            raise ValueError("path must be an approved public pathname")
        return value

    @field_validator("product_id")
    @classmethod
    def validate_product_id(cls, value: str) -> str:
        if value not in _REVIEWED_PRODUCT_IDS and value != "":
            raise ValueError("product_id must be a reviewed product ID or empty")
        return value

    @model_validator(mode="after")
    def validate_context_relationships(self) -> "ConversionEventCreate":
        expected_locale = "es" if self.path in _APPROVED_ES_PATHS else "en"
        if self.locale != expected_locale:
            raise ValueError("locale must match the public path")

        path_product_id = self.path.removeprefix("/products/") if self.path.startswith("/products/") else ""
        if self.product_id and self.product_id != path_product_id:
            raise ValueError("product_id must match the product path")

        expected_route = _REVIEWED_PRODUCT_ROUTES.get(path_product_id)
        if expected_route and self.project_route and self.project_route != expected_route:
            raise ValueError("project_route must match the reviewed product route")

        if self.name == "low_moq_route_selected" and not self.project_route:
            raise ValueError("low_moq_route_selected requires a project_route")
        if self.name == "resource_to_quote" and (
            not self.path.startswith("/resources/")
            or self.path.removeprefix("/resources/") not in _RESOURCE_SLUGS
        ):
            raise ValueError("resource_to_quote requires a reviewed resource path")
        return self


class ConversionEventOut(ConversionEventCreate):
    id: int
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


class PayPalCreateOrderRequest(BaseModel):
    title: str
    unitAmountUsd: float
    quantity: int = 1
    customerName: str = ""
    customerEmail: str = ""
    siteUrl: str = ""


class PayPalCaptureOrderRequest(BaseModel):
    orderId: str
    orderRef: str = ""


class PayPalConfigOut(BaseModel):
    clientId: str
    env: str
    productionReady: bool
