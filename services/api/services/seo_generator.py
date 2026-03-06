from datetime import datetime
from re import sub


def slugify(value: str) -> str:
    slug = sub(r"[^a-zA-Z0-9\\s-]", "", value).strip().lower()
    slug = sub(r"\\s+", "-", slug)
    return slug


def build_article(topic: str, category: str) -> dict[str, str]:
    current_year = datetime.utcnow().year
    title = topic.strip()
    slug = slugify(title)
    excerpt = (
        f"Complete {current_year} guide to {title}: supplier selection, MOQ strategy, "
        "quality control, and private label growth tactics."
    )
    body = f"""
# {title}

## Why this topic matters
Global brands now prioritize stable supply, fast sampling, and flexible MOQ. This guide explains how to source with lower risk.

## Factory capability checklist
1. Seamless machine capacity and daily output
2. Fabric options: nylon, polyamide, elastane blends
3. Quality control process and defect handling
4. Delivery reliability and communication rhythm

## MOQ and sampling strategy
- Start with low-risk pilot styles.
- Lock color cards and size grading before bulk.
- Use sample feedback loop in 3-5 days.

## Private label readiness
- Label, hangtag, and packaging compliance
- Country-specific product claims
- Production lead time commitments

## Conclusion
Choose partners by consistency, not quote alone. A scalable factory setup should reduce timeline risk and improve reorder rate.
""".strip()

    return {
        "title": title,
        "slug": slug,
        "category": category,
        "excerpt": excerpt,
        "body": body,
    }
