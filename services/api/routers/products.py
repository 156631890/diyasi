from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session

from database import get_db
from models import Product
from schemas import (
    CategoryDeleteRequest,
    CategoryRenameRequest,
    ImageRequest,
    ImageResponse,
    ProductCategoryOut,
    ProductCreate,
    ProductImportResponse,
    ProductOut,
    ProductUpdate,
)
from services.gemini_image import GeminiImageError, generate_image

router = APIRouter(prefix="/products", tags=["products"])


def legacy_alibaba_to_dys(product_id: str) -> str:
    if not product_id.startswith("ALI-"):
        return product_id
    normalized = "".join(ch for ch in product_id[4:] if ch.isalnum())
    return f"DYS-{normalized}" if normalized else "DYS"


def lookup_product_by_any_id(db: Session, product_id: str) -> Product | None:
    product = db.query(Product).filter(Product.product_id == product_id).first()
    if product:
        return product

    if product_id.startswith("ALI-"):
        return db.query(Product).filter(Product.product_id == legacy_alibaba_to_dys(product_id)).first()

    if product_id.startswith("DYS-"):
        legacy_id = f"ALI-{product_id[4:]}"
        return db.query(Product).filter(Product.product_id == legacy_id).first()

    return None


@router.get("/", response_model=list[ProductOut])
def list_products(db: Session = Depends(get_db)) -> list[Product]:
    return db.query(Product).order_by(Product.created_at.desc()).all()


@router.get("/categories", response_model=list[ProductCategoryOut])
def list_categories(db: Session = Depends(get_db)) -> list[dict]:
    rows = (
        db.query(Product.category, func.count(Product.id))
        .group_by(Product.category)
        .order_by(func.count(Product.id).desc())
        .all()
    )
    return [{"category": row[0], "count": row[1]} for row in rows]


@router.post("/", response_model=ProductOut)
def create_product(payload: ProductCreate, db: Session = Depends(get_db)) -> Product:
    existing = db.query(Product).filter(Product.product_id == payload.product_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="product_id already exists.")

    product = Product(**payload.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


@router.post("/import-list", response_model=ProductImportResponse)
def import_products(payload: list[ProductCreate], db: Session = Depends(get_db)) -> dict:
    created = 0
    duplicates = 0
    for item in payload:
        data = item.model_dump()
        exists = db.query(Product).filter(Product.product_id == data["product_id"]).first()
        if exists:
            duplicates += 1
            continue
        db.add(Product(**data))
        created += 1
    db.commit()
    return {"created": created, "duplicates": duplicates}


@router.patch("/{product_id}", response_model=ProductOut)
def update_product(product_id: str, payload: ProductUpdate, db: Session = Depends(get_db)) -> Product:
    product = lookup_product_by_any_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found.")

    for key, value in payload.model_dump(exclude_none=True).items():
        setattr(product, key, value)
    db.commit()
    db.refresh(product)
    return product


@router.delete("/{product_id}")
def delete_product(product_id: str, db: Session = Depends(get_db)) -> dict:
    product = lookup_product_by_any_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found.")
    db.delete(product)
    db.commit()
    return {"ok": True, "deleted_product_id": product_id}


@router.post("/categories/rename")
def rename_category(payload: CategoryRenameRequest, db: Session = Depends(get_db)) -> dict:
    old_category = payload.old_category.strip()
    new_category = payload.new_category.strip()
    if not old_category or not new_category:
        raise HTTPException(status_code=400, detail="Both old_category and new_category are required.")

    rows = db.query(Product).filter(Product.category == old_category).all()
    for row in rows:
        row.category = new_category
    db.commit()
    return {"ok": True, "updated": len(rows), "old_category": old_category, "new_category": new_category}


@router.post("/categories/delete")
def delete_category(payload: CategoryDeleteRequest, db: Session = Depends(get_db)) -> dict:
    category = payload.category.strip()
    fallback = payload.fallback_category.strip() or "uncategorized"
    if not category:
        raise HTTPException(status_code=400, detail="category is required.")
    if category == fallback:
        raise HTTPException(status_code=400, detail="fallback_category must be different from category.")

    rows = db.query(Product).filter(Product.category == category).all()
    for row in rows:
        row.category = fallback
    db.commit()
    return {"ok": True, "moved_products": len(rows), "deleted_category": category, "fallback_category": fallback}


@router.post("/{product_id}/generate-image", response_model=ImageResponse)
async def generate_product_image(
    product_id: str,
    payload: ImageRequest,
    db: Session = Depends(get_db),
) -> ImageResponse:
    product = lookup_product_by_any_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found.")

    prompt = payload.prompt or (
        f"Create a clean e-commerce studio photo for {product.product_name}, "
        f"{product.category}, fabric {product.fabric}, color {product.color}, white background."
    )

    try:
        image = await generate_image(prompt, aspect_ratio="1:1")
    except GeminiImageError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc

    image_data_url = f"data:{image.mime_type};base64,{image.base64_data}"
    product.image_url = image_data_url
    db.commit()

    return ImageResponse(product_id=product.product_id, prompt=prompt, image_data_url=image_data_url)


@router.get("/{product_id}", response_model=ProductOut)
def get_product(product_id: str, db: Session = Depends(get_db)) -> Product:
    product = lookup_product_by_any_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found.")
    return product
