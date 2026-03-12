from __future__ import annotations

from sqlalchemy import text
from sqlalchemy.engine import Engine


def _sqlite_columns(engine: Engine, table_name: str) -> set[str]:
    with engine.connect() as conn:
        rows = conn.execute(text(f"PRAGMA table_info({table_name})")).fetchall()
    return {row[1] for row in rows}


def _add_column_if_missing(engine: Engine, table_name: str, column_sql: str, column_name: str) -> None:
    cols = _sqlite_columns(engine, table_name)
    if column_name in cols:
        return
    with engine.begin() as conn:
        conn.execute(text(f"ALTER TABLE {table_name} ADD COLUMN {column_sql}"))


def run_migrations(engine: Engine) -> None:
    # Lightweight sqlite-safe migrations for evolving MVP schema.
    _add_column_if_missing(engine, "media_assets", "is_featured BOOLEAN NOT NULL DEFAULT 0", "is_featured")
    _add_column_if_missing(engine, "media_assets", "is_active BOOLEAN NOT NULL DEFAULT 1", "is_active")
    _add_column_if_missing(engine, "media_assets", "sort_order INTEGER NOT NULL DEFAULT 0", "sort_order")
    _add_column_if_missing(engine, "products", "gallery_images TEXT NOT NULL DEFAULT '[]'", "gallery_images")
    _add_column_if_missing(engine, "products", "price_text VARCHAR(120) NOT NULL DEFAULT ''", "price_text")
    _add_column_if_missing(engine, "products", "price_from VARCHAR(40) NOT NULL DEFAULT ''", "price_from")
    _add_column_if_missing(engine, "products", "detail_url TEXT NOT NULL DEFAULT ''", "detail_url")
