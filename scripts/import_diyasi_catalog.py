"""Import the complete, publicly listed DIYASI catalogue with source evidence.

Run from any directory: python -X utf8 scripts/import_diyasi_catalog.py
Reads public source pages only. Does not submit forms or modify a remote store.
"""
from __future__ import annotations

import concurrent.futures
import hashlib
import json
import re
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://www.diyasiunderwear.com"
CACHE = ROOT / ".tmp" / "diyasi-source"
MEDIA = ROOT / "apps" / "web" / "public" / "media" / "catalog"
RAW = ROOT / "data" / "diyasi-source-products.json"


def get(url: str) -> bytes:
    cache = CACHE / hashlib.sha256(url.encode()).hexdigest()
    if cache.exists():
        return cache.read_bytes()
    for attempt in range(3):
        try:
            response = requests.get(url, timeout=(15, 50), headers={"User-Agent": "DIYASI-Catalog-Migration/1.0"})
            response.raise_for_status()
            cache.write_bytes(response.content)
            return response.content
        except requests.RequestException:
            if attempt == 2:
                raise
            time.sleep(attempt + 1)
    raise RuntimeError(url)


def clean(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def scrape_product(url: str) -> dict:
    soup = BeautifulSoup(get(url).decode("utf-8"), "html.parser")
    h1 = soup.find("h1")
    content = soup.select_one(".pro-content")
    if not h1 or not content:
        raise ValueError(f"Missing product detail content: {url}")
    specs = {}
    for table in content.select("table"):
        for row in table.select("tr"):
            cells = row.find_all(["td", "th"], recursive=False)
            if len(cells) >= 2:
                key = clean(cells[0].get_text(" ", strip=True)).rstrip(":：")
                value = clean(" / ".join(x.get_text(" ", strip=True) for x in cells[1:]))
                if key and value and len(key) < 70:
                    specs[key] = value
    gallery = list(dict.fromkeys(urljoin(url, i.get("rel") or i.get("src", "")) for i in soup.select("img.jqzoom")))
    details = list(dict.fromkeys(urljoin(url, i.get("src", "")) for i in content.select("img[src]")))
    description = soup.find("meta", attrs={"name": "description"})
    paragraphs = [clean(x.get_text(" ", strip=True)) for x in content.select("p, h2, h3, li") if not x.find_parent("table")]
    return {
        "source_url": url,
        "source_title": clean(h1.get_text(" ", strip=True)),
        "source_description": clean(description.get("content", "")) if description else "",
        "summary": clean(h1.parent.get_text(" ", strip=True)),
        "specifications": specs,
        "paragraphs": list(dict.fromkeys(p for p in paragraphs if p)),
        "gallery_source_urls": gallery,
        "detail_source_urls": details,
    }


def download_image(url: str) -> tuple[str, dict]:
    data = get(url)
    digest = hashlib.sha256(data).hexdigest()
    # Preserve the source image bytes; Next Image generates responsive variants.
    if data[:3] == b"\xff\xd8\xff":
        suffix = ".jpg"
    elif data[:8] == b"\x89PNG\r\n\x1a\n":
        suffix = ".png"
    elif data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        suffix = ".webp"
    elif data[:3] == b"GIF":
        suffix = ".gif"
    else:
        raise ValueError(f"Unrecognized image bytes: {url}")
    filename = digest[:20] + suffix
    target = MEDIA / filename
    if not target.exists():
        target.write_bytes(data)
    return url, {"path": f"/media/catalog/{filename}", "sha256": digest, "bytes": len(data)}


def main() -> None:
    CACHE.mkdir(parents=True, exist_ok=True)
    MEDIA.mkdir(parents=True, exist_ok=True)
    sitemap = BeautifulSoup(get(BASE + "/sitemap/Product_Sitemap_EN.xml"), "xml")
    sitemap_urls = list(dict.fromkeys(x.get_text(strip=True) for x in sitemap.find_all("loc")))
    pending = [BASE + "/products"]
    listing_pages, listed_urls = [], []
    while pending:
        url = pending.pop(0)
        if url in listing_pages:
            continue
        soup = BeautifulSoup(get(url).decode("utf-8"), "html.parser")
        listing_pages.append(url)
        for a in soup.select("a.pic[href]"):
            candidate = urljoin(url, a["href"])
            if candidate in sitemap_urls and candidate not in listed_urls:
                listed_urls.append(candidate)
        for a in soup.select("a[href]"):
            candidate = urljoin(url, a["href"])
            if re.fullmatch(r"/products_\d+", urlparse(candidate).path) and candidate not in listing_pages and candidate not in pending:
                pending.append(candidate)
    urls = listed_urls + [u for u in sitemap_urls if u not in listed_urls]
    print(f"Source: {len(listing_pages)} listing pages; {len(listed_urls)} listed; {len(sitemap_urls)} sitemap products", flush=True)
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        products = list(pool.map(scrape_product, urls))
    image_urls = list(dict.fromkeys(u for p in products for u in p["gallery_source_urls"] + p["detail_source_urls"]))
    print(f"Read {len(products)} product details; downloading {len(image_urls)} source image URLs", flush=True)
    images = {}
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        for count, (url, record) in enumerate(pool.map(download_image, image_urls), 1):
            images[url] = record
            if count % 50 == 0:
                print(f"Images {count}/{len(image_urls)}", flush=True)
    for p in products:
        p["gallery_images"] = list(dict.fromkeys(images[u]["path"] for u in p["gallery_source_urls"]))
        p["detail_images"] = list(dict.fromkeys(images[u]["path"] for u in p["detail_source_urls"] if images[u]["path"] not in p["gallery_images"]))
    result = {
        "fetched_at": datetime.now(timezone.utc).isoformat(),
        "source": BASE + "/products", "listing_pages": listing_pages,
        "listed_count": len(listed_urls), "sitemap_count": len(sitemap_urls),
        "sitemap_only_urls": [u for u in sitemap_urls if u not in listed_urls],
        "products": products, "images": images,
    }
    RAW.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"products": len(products), "image_urls": len(images), "unique_files": len(set(x["path"] for x in images.values())), "raw": str(RAW)}, ensure_ascii=False), flush=True)


if __name__ == "__main__":
    main()
