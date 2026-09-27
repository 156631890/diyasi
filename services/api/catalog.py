"""Reviewed catalogue shipped with the API deployment."""
import json
from pathlib import Path

CATALOG_PATH = Path(__file__).resolve().parent / "data" / "diyasi-catalog.json"
CATALOG_PRODUCTS = json.loads(CATALOG_PATH.read_text(encoding="utf-8"))


def product_seed_rows() -> list[dict]:
    return [{**item, "gallery_images": json.dumps(item["gallery_images"])} for item in CATALOG_PRODUCTS]
