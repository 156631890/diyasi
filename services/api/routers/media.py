from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from config import settings
from database import get_db
from models import MediaAsset
from schemas import BrandPackRequest, BrandPackResponse, MediaAssetOut, MediaAssetUpdateRequest, MediaGenerateRequest
from services.gemini_image import GeminiImageError, generate_image

router = APIRouter(prefix="/media", tags=["media"])


def build_media_prompt(asset_type: str, title: str, brand_story: str | None = None) -> str:
    story = brand_story or (
        "YiWu DiYaSi Dress CO., LTD is a premium and sustainable underwear manufacturer with 23+ years of "
        "product development and high-quality production support for global brands."
    )
    common = (
        "luxury commercial photography, premium fashion manufacturing brand aesthetic, cinematic lighting, "
        "clean composition, realistic texture, ultra high detail, no watermark, no logo artifacts"
    )
    t = title.strip() or "Brand Visual"
    kind = asset_type.strip().lower()

    templates = {
        "poster": f"{t}. Vertical campaign poster for sustainable premium underwear manufacturing. {story}. {common}.",
        "hero_banner": f"{t}. Website hero banner visual showing fabric quality and modern production confidence. {story}. {common}.",
        "factory": f"{t}. Wide-angle factory interior scene with advanced seamless production line and quality inspection. {story}. {common}.",
        "product": f"{t}. E-commerce product scene for high-end seamless underwear collection on minimal studio background. {story}. {common}.",
        "social": f"{t}. Square social media campaign visual for new underwear line launch. {story}. {common}.",
    }
    return templates.get(
        kind,
        f"{t}. High-end brand image for underwear manufacturing website. {story}. {common}.",
    )


def create_asset(
    db: Session,
    asset_type: str,
    title: str,
    prompt: str,
    aspect_ratio: str,
    image_data_url: str,
    model: str,
) -> MediaAsset:
    asset = MediaAsset(
        asset_type=asset_type,
        title=title,
        prompt=prompt,
        aspect_ratio=aspect_ratio,
        image_url=image_data_url,
        model=model,
    )
    db.add(asset)
    db.commit()
    db.refresh(asset)
    return asset


@router.get("/assets", response_model=list[MediaAssetOut])
def list_assets(
    db: Session = Depends(get_db),
    asset_type: str | None = Query(default=None),
    only_active: bool = Query(default=False),
    only_featured: bool = Query(default=False),
    limit: int = Query(default=40, ge=1, le=200),
) -> list[MediaAsset]:
    query = db.query(MediaAsset)
    if asset_type:
        query = query.filter(MediaAsset.asset_type == asset_type)
    if only_active:
        query = query.filter(MediaAsset.is_active.is_(True))
    if only_featured:
        query = query.filter(MediaAsset.is_featured.is_(True))
    return query.order_by(MediaAsset.sort_order.desc(), MediaAsset.created_at.desc()).limit(limit).all()


@router.patch("/assets/{asset_id}", response_model=MediaAssetOut)
def update_asset(asset_id: int, payload: MediaAssetUpdateRequest, db: Session = Depends(get_db)) -> MediaAsset:
    asset = db.query(MediaAsset).filter(MediaAsset.id == asset_id).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found.")

    for key, value in payload.model_dump(exclude_none=True).items():
        setattr(asset, key, value)
    db.commit()
    db.refresh(asset)
    return asset


@router.delete("/assets/{asset_id}")
def delete_asset(asset_id: int, db: Session = Depends(get_db)) -> dict:
    asset = db.query(MediaAsset).filter(MediaAsset.id == asset_id).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found.")
    db.delete(asset)
    db.commit()
    return {"ok": True, "deleted_asset_id": asset_id}


@router.post("/generate", response_model=MediaAssetOut)
async def generate_asset(payload: MediaGenerateRequest, db: Session = Depends(get_db)) -> MediaAsset:
    prompt = payload.prompt or build_media_prompt(payload.asset_type, payload.title)

    try:
        image = await generate_image(prompt, aspect_ratio=payload.aspect_ratio)
    except GeminiImageError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc

    image_data_url = f"data:{image.mime_type};base64,{image.base64_data}"
    return create_asset(
        db=db,
        asset_type=payload.asset_type,
        title=payload.title or payload.asset_type,
        prompt=prompt,
        aspect_ratio=payload.aspect_ratio,
        image_data_url=image_data_url,
        model=image.model,
    )


@router.post("/generate-brand-pack", response_model=BrandPackResponse)
async def generate_brand_pack(payload: BrandPackRequest, db: Session = Depends(get_db)) -> BrandPackResponse:
    templates = [
        ("hero_banner", "Homepage Hero", "16:9"),
        ("poster", "Sustainability Campaign Poster", "3:4"),
        ("factory", "Factory Capability Panorama", "21:9"),
        ("product", "Product Collection Banner", "4:3"),
        ("social", "Instagram Launch Creative", "1:1"),
    ]

    created_assets: list[MediaAssetOut] = []
    for asset_type, title, ratio in templates:
        prompt = build_media_prompt(asset_type, f"{payload.brand_name} - {title}", payload.brand_story)
        try:
            image = await generate_image(prompt, aspect_ratio=ratio)
        except GeminiImageError as exc:
            raise HTTPException(
                status_code=502,
                detail=f"Failed to generate brand pack ({asset_type}) with model {settings.gemini_model}: {exc}",
            ) from exc

        image_data_url = f"data:{image.mime_type};base64,{image.base64_data}"
        asset = create_asset(
            db=db,
            asset_type=asset_type,
            title=title,
            prompt=prompt,
            aspect_ratio=ratio,
            image_data_url=image_data_url,
            model=image.model,
        )
        created_assets.append(MediaAssetOut.model_validate(asset))

    return BrandPackResponse(generated=len(created_assets), assets=created_assets)
