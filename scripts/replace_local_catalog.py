"""Back up and replace only the products in the named local SQLite database.

Run after build_diyasi_catalog.py. Never resolves a remote DATABASE_URL.
"""
import json
import sqlite3
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
db_path = (ROOT / "services/api/lead_engine.db").resolve()
assert db_path.parent == (ROOT / "services/api").resolve()
products = json.loads((ROOT / "services/api/data/diyasi-catalog.json").read_text(encoding="utf-8"))
assert len(products) == 45
stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
backup = ROOT / "data/generated" / f"products-before-redesign-{stamp}.json"
backup.parent.mkdir(parents=True, exist_ok=True)
with sqlite3.connect(db_path) as connection:
    connection.row_factory = sqlite3.Row
    rows = [dict(row) for row in connection.execute("SELECT * FROM products")]
    backup.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")
    others = [row[0] for row in connection.execute("SELECT name FROM sqlite_master WHERE type='table'") if row[0] != "products"]
    counts = {name: connection.execute('SELECT count(*) FROM "' + name.replace('"', '""') + '"').fetchone()[0] for name in others}
    connection.execute("DELETE FROM products")
    for product in products:
        product["gallery_images"] = json.dumps(product["gallery_images"])
        product["created_at"] = product["updated_at"] = datetime.now(timezone.utc).isoformat()
        columns = list(product)
        connection.execute(f"INSERT INTO products ({','.join(columns)}) VALUES ({','.join('?' for _ in columns)})", [product[key] for key in columns])
    for name, count in counts.items():
        assert connection.execute('SELECT count(*) FROM "' + name.replace('"', '""') + '"').fetchone()[0] == count
    connection.commit()
print(json.dumps({"backup": str(backup), "old_products": len(rows), "new_products": len(products), "other_tables_unchanged": len(counts)}))
