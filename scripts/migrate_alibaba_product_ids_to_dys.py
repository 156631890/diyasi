from __future__ import annotations

import json
import re
import sqlite3
from pathlib import Path


def alibaba_to_dys_product_id(raw_id: str) -> str:
    normalized = re.sub(r"[^A-Za-z0-9]+", "", raw_id.strip())
    return f"DYS-{normalized}" if normalized else "DYS"


def migrate_json_file(json_path: Path) -> int:
    products = json.loads(json_path.read_text(encoding="utf-8"))
    updated = 0

    for product in products:
        product_id = str(product.get("product_id", "")).strip()
        if product_id.startswith("ALI-"):
            product["product_id"] = alibaba_to_dys_product_id(product_id[4:])
            updated += 1

    json_path.write_text(json.dumps(products, ensure_ascii=False, indent=2), encoding="utf-8")
    return updated


def migrate_database(db_path: Path) -> int:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    rows = cursor.execute(
        """
        SELECT id, product_id
        FROM products
        WHERE product_id LIKE 'ALI-%'
        """
    ).fetchall()

    updated = 0
    try:
        for row_id, product_id in rows:
            new_product_id = alibaba_to_dys_product_id(product_id[4:])
            cursor.execute(
                "UPDATE products SET product_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
                [new_product_id, row_id],
            )
            updated += 1
        conn.commit()
    finally:
        conn.close()

    return updated


def main() -> None:
    repo_root = Path(__file__).resolve().parents[1]
    json_path = repo_root / "data" / "alibaba-products.json"
    db_path = repo_root / "services" / "api" / "lead_engine.db"

    json_updated = migrate_json_file(json_path) if json_path.exists() else 0
    db_updated = migrate_database(db_path) if db_path.exists() else 0

    print(f"Updated JSON products: {json_updated}")
    print(f"Updated DB products: {db_updated}")


if __name__ == "__main__":
    main()
