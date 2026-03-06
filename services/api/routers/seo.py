from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from database import get_db
from models import SEOArticle
from schemas import SEOArticleCreateRequest, SEOArticleOut, SEOArticleUpdateRequest, SEOGenerateRequest
from services.seo_generator import build_article, slugify

router = APIRouter(prefix="/seo", tags=["seo"])

DRAFT_PREFIX = "draft::"


def _is_published(article: SEOArticle) -> bool:
    return not article.category.startswith(DRAFT_PREFIX)


def _public_category(article: SEOArticle) -> str:
    if article.category.startswith(DRAFT_PREFIX):
        return article.category[len(DRAFT_PREFIX) :]
    return article.category


def _to_out(article: SEOArticle) -> SEOArticleOut:
    return SEOArticleOut(
        title=article.title,
        slug=article.slug,
        category=_public_category(article),
        excerpt=article.excerpt,
        body=article.body,
        is_published=_is_published(article),
        created_at=article.created_at,
    )


@router.get("/articles", response_model=list[SEOArticleOut])
def list_articles(
    db: Session = Depends(get_db), include_draft: bool = Query(default=False)
) -> list[SEOArticleOut]:
    rows = db.query(SEOArticle).order_by(SEOArticle.created_at.desc()).all()
    if not include_draft:
        rows = [row for row in rows if _is_published(row)]
    return [_to_out(row) for row in rows]


@router.get("/articles/{slug}", response_model=SEOArticleOut)
def get_article(slug: str, db: Session = Depends(get_db), include_draft: bool = Query(default=False)) -> SEOArticleOut:
    article = db.query(SEOArticle).filter(SEOArticle.slug == slug).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found.")
    if not include_draft and not _is_published(article):
        raise HTTPException(status_code=404, detail="Article not found.")
    return _to_out(article)


@router.post("/generate", response_model=SEOArticleOut)
def generate_article(payload: SEOGenerateRequest, db: Session = Depends(get_db)) -> SEOArticleOut:
    generated = build_article(payload.topic, payload.category)
    category = generated["category"]
    article = SEOArticle(**generated, category=category)
    db.add(article)
    db.commit()
    db.refresh(article)
    return _to_out(article)


@router.post("/articles", response_model=SEOArticleOut)
def create_article(payload: SEOArticleCreateRequest, db: Session = Depends(get_db)) -> SEOArticleOut:
    slug = payload.slug or slugify(payload.title)
    existing = db.query(SEOArticle).filter(SEOArticle.slug == slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="slug already exists.")

    category = payload.category.strip() or "manufacturer"
    category = category if payload.is_published else f"{DRAFT_PREFIX}{category}"

    article = SEOArticle(
        title=payload.title.strip(),
        slug=slug,
        category=category,
        excerpt=payload.excerpt,
        body=payload.body,
    )
    db.add(article)
    db.commit()
    db.refresh(article)
    return _to_out(article)


@router.patch("/articles/{slug}", response_model=SEOArticleOut)
def update_article(slug: str, payload: SEOArticleUpdateRequest, db: Session = Depends(get_db)) -> SEOArticleOut:
    article = db.query(SEOArticle).filter(SEOArticle.slug == slug).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found.")

    data = payload.model_dump(exclude_none=True)
    if "title" in data:
        article.title = data["title"].strip()
    if "excerpt" in data:
        article.excerpt = data["excerpt"]
    if "body" in data:
        article.body = data["body"]
    if "category" in data:
        target_category = data["category"].strip() or "manufacturer"
        article.category = f"{DRAFT_PREFIX}{target_category}" if not _is_published(article) else target_category
    if "is_published" in data:
        current_category = _public_category(article)
        article.category = current_category if data["is_published"] else f"{DRAFT_PREFIX}{current_category}"

    db.commit()
    db.refresh(article)
    return _to_out(article)


@router.post("/articles/{slug}/publish", response_model=SEOArticleOut)
def publish_article(slug: str, db: Session = Depends(get_db)) -> SEOArticleOut:
    article = db.query(SEOArticle).filter(SEOArticle.slug == slug).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found.")
    article.category = _public_category(article)
    db.commit()
    db.refresh(article)
    return _to_out(article)


@router.post("/articles/{slug}/unpublish", response_model=SEOArticleOut)
def unpublish_article(slug: str, db: Session = Depends(get_db)) -> SEOArticleOut:
    article = db.query(SEOArticle).filter(SEOArticle.slug == slug).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found.")
    article.category = f"{DRAFT_PREFIX}{_public_category(article)}"
    db.commit()
    db.refresh(article)
    return _to_out(article)


@router.delete("/articles/{slug}")
def delete_article(slug: str, db: Session = Depends(get_db)) -> dict:
    article = db.query(SEOArticle).filter(SEOArticle.slug == slug).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found.")
    db.delete(article)
    db.commit()
    return {"ok": True, "deleted_slug": slug}
