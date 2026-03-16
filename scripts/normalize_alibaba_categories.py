from __future__ import annotations

import sqlite3
from pathlib import Path

from import_alibaba_products import CATEGORY_DISPLAY_MAP


def main() -> None:
    repo_root = Path(__file__).resolve().parents[1]
    db_path = repo_root / "services" / "api" / "lead_engine.db"
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    updated = 0
    for source, target in CATEGORY_DISPLAY_MAP.items():
        result = cursor.execute(
            "UPDATE products SET category = ?, updated_at = CURRENT_TIMESTAMP WHERE category = ? AND (product_id LIKE 'ALI-%' OR detail_url LIKE '%alibaba.%')",
            [target, source],
        )
        updated += result.rowcount

    conn.commit()
    conn.close()
    print(f"Updated {updated} imported products.")


if __name__ == "__main__":
    main()
