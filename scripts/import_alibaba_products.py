from __future__ import annotations

import argparse
import json
import re
import sqlite3
import sys
import urllib.parse
import urllib.request
from collections import OrderedDict
from datetime import datetime
from pathlib import Path
from typing import Any


SHOP_PRODUCTS_URL = "https://diyasiapparel.en.alibaba.com/search/product?scene=all"
USER_AGENT = "facebookexternalhit/1.1"
DEFAULT_API_BASE = "http://127.0.0.1:8010"

# Clean up a few shop category names that are awkward when copied directly.
CATEGORY_LABEL_OVERRIDES = {
    "Sanua Clothes": "Sauna Clothes",
    "Women s Underwear": "Women's Underwear",
    "Men s Underwear": "Men's Underwear",
    "Printed Panties Dona soft Series ": "Printed Panties Dona Soft Series",
    "Silicone Intimates Accessories": "Silicone Intimates & Accessories",
    "Seamless Knit Panty Bra": "Seamless Knit Panty & Bra"
}

CATEGORY_DISPLAY_MAP = {
    "Thongs": "Women's Panties / Thongs",
    "Brazilian": "Women's Panties / Brazilian",
    "Bikini": "Women's Panties / Bikini",
    "Boyshorts": "Women's Panties / Boyshorts",
    "Plus size": "Women's Panties / Plus Size",
    "Cotton Panties": "Women's Panties / Cotton Panties",
    "Laser Cut Seamless Panties": "Women's Panties / Laser Cut Seamless Panties",
    "Printed Panties Dona soft Series": "Women's Panties / Printed Panties Dona Soft Series",
    "Lace Panties": "Women's Panties / Lace Panties",
    "Lenzing Modal Panties": "Women's Panties / Lenzing Modal Panties",
    "Multipack Panties": "Women's Panties / Multipack Panties",
    "Leak Proof Period Panties": "Women's Panties / Leak Proof Period Panties",
    "Women's Underwear": "Women's Panties / General",
    "Seamless Knit Panty & Bra": "Bras / Seamless Knit Panty & Bra",
    "Seamless Bra Set": "Bras / Seamless Bra Set",
    "Men's Underwear": "Men's Underwear",
    "Sauna Clothes": "Activewear / Sauna Clothes",
    "Shapewear": "Shapewear",
    "Athletic Sports Wear": "Activewear / Athletic Sports Wear",
    "Silicone Intimates & Accessories": "Accessories / Silicone Intimates & Accessories",
    "Yoga Sets": "Activewear / Yoga Sets",
    "Yoga Jumpsuit": "Activewear / Yoga Jumpsuit",
    "Yoga Top": "Activewear / Yoga Top",
    "Leggings": "Activewear / Leggings",
    "Sports Shorts": "Activewear / Sports Shorts",
    "Yoga Clothing": "Activewear / Yoga Clothing",
    "Homewear": "Homewear"
}

FABRIC_KEYWORDS = [
    "cotton",
    "lace",
    "modal",
    "satin",
    "silk",
    "polyamide",
    "spandex",
    "nylon",
    "knit",
    "silicone"
]


def fetch_text(url: str) -> str:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=60) as response:
        return response.read().decode("utf-8", errors="ignore")


def extract_array(source: str, key: str) -> list[dict[str, Any]]:
    marker = f'"{key}":['
    start = source.find(marker)
    if start == -1:
        return []

    i = start + len(marker) - 1
    depth = 0
    in_string = False
    escaped = False
    for j in range(i, len(source)):
        char = source[j]
        if in_string:
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == '"':
                in_string = False
        else:
            if char == '"':
                in_string = True
            elif char == "[":
                depth += 1
            elif char == "]":
                depth -= 1
                if depth == 0:
                    return json.loads(source[i : j + 1])
    return []


def normalize_category_slug(slug: str) -> str:
    text = slug.replace("_", " ").strip()
    text = text.replace(" s ", "'s ")
    text = re.sub(r"\s+", " ", text)
    return CATEGORY_LABEL_OVERRIDES.get(text, text)


def display_category(category: str) -> str:
    return CATEGORY_DISPLAY_MAP.get(category, category)


def parse_group_pages(html: str) -> OrderedDict[str, tuple[str, str]]:
    decoded = urllib.parse.unquote(html)
    pairs = OrderedDict()
    for match in re.finditer(r"productgrouplist-(\d+)\\/(.*?)\.html", decoded):
        group_id = match.group(1)
        raw_slug = match.group(2)
        label = normalize_category_slug(raw_slug)
        if group_id == "0":
            continue
        pairs[group_id] = (
            label,
            f"https://diyasiapparel.en.alibaba.com/productgrouplist-{group_id}/{raw_slug}.html",
        )
    return pairs


def extract_fabric(subject: str) -> str:
    lowered = subject.lower()
    hits = [word.title() for word in FABRIC_KEYWORDS if word in lowered]
    return ", ".join(OrderedDict.fromkeys(hits))


def normalize_image_url(url: str) -> str:
    if not url:
        return ""
    if url.startswith("//"):
        return f"https:{url}"
    return url


def build_product_payload(category: str, item: dict[str, Any]) -> dict[str, str]:
    product_id = f"ALI-{item['id']}"
    subject = str(item.get("subject", "")).strip()
    price = str(item.get("fobPrice", "")).strip()
    moq = str(item.get("moq", "")).strip()
    image_url = normalize_image_url(item.get("imageUrls", {}).get("original", ""))
    detail_url = normalize_image_url(str(item.get("url", "")))
    color = ", ".join(item.get("skuColorRGB", [])[:6])
    description_parts = [
        subject,
        f"Alibaba category: {category}.",
    ]
    if price:
        description_parts.append(f"FOB: {price}.")
    if moq:
        description_parts.append(f"MOQ: {moq}.")
    if detail_url:
        description_parts.append(f"Source: {detail_url}.")

    return {
        "product_id": product_id,
        "product_name": subject,
        "category": display_category(category),
        "fabric": extract_fabric(subject),
        "color": color,
        "size": "",
        "moq": moq,
        "sample_time": "",
        "production_time": "",
        "description": " ".join(part for part in description_parts if part).strip(),
        "image_url": image_url,
    }


def collect_products() -> tuple[list[dict[str, str]], dict[str, int]]:
    root_html = fetch_text(SHOP_PRODUCTS_URL)
    group_pages = parse_group_pages(root_html)
    products_by_id: OrderedDict[str, dict[str, str]] = OrderedDict()
    counts: dict[str, int] = {}

    for _group_id, (category, group_url) in group_pages.items():
        html = fetch_text(group_url)
        decoded = urllib.parse.unquote(html)
        items = extract_array(decoded, "productList")
        counts[category] = len(items)
        for item in items:
            payload = build_product_payload(category, item)
            products_by_id[payload["product_id"]] = payload

    return list(products_by_id.values()), counts


def save_json(products: list[dict[str, str]], destination: Path) -> None:
    destination.write_text(json.dumps(products, ensure_ascii=False, indent=2), encoding="utf-8")


def import_to_api(products: list[dict[str, str]], api_base: str) -> dict[str, Any]:
    body = json.dumps(products).encode("utf-8")
    request = urllib.request.Request(
        f"{api_base.rstrip('/')}/products/import-list",
        data=body,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=120) as response:
        return json.loads(response.read().decode("utf-8"))


def import_direct_db(products: list[dict[str, str]]) -> dict[str, int]:
    repo_root = Path(__file__).resolve().parents[1]
    db_path = repo_root / "services" / "api" / "lead_engine.db"
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    created = 0
    duplicates = 0
    now = datetime.utcnow().isoformat(sep=" ", timespec="seconds")
    try:
        existing_ids = {
            row[0]
            for row in cursor.execute(
                "SELECT product_id FROM products WHERE product_id IN ({})".format(
                    ",".join("?" for _ in products)
                ),
                [p["product_id"] for p in products],
            )
        }
        for item in products:
            if item["product_id"] in existing_ids:
                duplicates += 1
                continue
            cursor.execute(
                """
                INSERT INTO products (
                    product_id, product_name, category, fabric, color, size, moq,
                    sample_time, production_time, description, image_url, created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                [
                    item["product_id"],
                    item["product_name"],
                    item["category"],
                    item["fabric"],
                    item["color"],
                    item["size"],
                    item["moq"],
                    item["sample_time"],
                    item["production_time"],
                    item["description"],
                    item["image_url"],
                    now,
                    now,
                ],
            )
            created += 1
        conn.commit()
    finally:
        conn.close()
    return {"created": created, "duplicates": duplicates}


def main() -> int:
    parser = argparse.ArgumentParser(description="Import Alibaba shop products into the local API.")
    parser.add_argument(
        "--output",
        default="data/alibaba-products.json",
        help="Where to write the intermediate JSON payload.",
    )
    parser.add_argument(
        "--api-base",
        default=DEFAULT_API_BASE,
        help="Local API base URL used for /products/import-list.",
    )
    parser.add_argument(
        "--no-import",
        action="store_true",
        help="Only write the JSON payload; do not POST it to the API.",
    )
    args = parser.parse_args()

    products, counts = collect_products()
    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    save_json(products, output_path)

    print(f"Saved {len(products)} unique Alibaba products to {output_path}")
    for category, count in counts.items():
        print(f"  {category}: {count}")

    if args.no_import:
        return 0

    try:
        result = import_to_api(products, args.api_base)
        print("Import result:", json.dumps(result, ensure_ascii=False))
    except Exception as exc:
        print(f"API import failed ({exc}). Falling back to direct database import.")
        result = import_direct_db(products)
        print("Direct DB import result:", json.dumps(result, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main())
