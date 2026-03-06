"""
Playwright lead scraper template.

Usage:
    python scripts/lead_scraper_playwright.py --query "seamless underwear brand" --limit 10
"""

from __future__ import annotations

import argparse
import asyncio
import json
import re
from dataclasses import asdict, dataclass
from pathlib import Path

from playwright.async_api import async_playwright


EMAIL_PATTERN = re.compile(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+")


@dataclass
class Lead:
    brand_name: str
    website: str
    email: str
    country: str
    instagram: str
    linkedin: str
    product_category: str


async def scrape(query: str, limit: int) -> list[Lead]:
    results: list[Lead] = []
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto(f"https://www.bing.com/search?q={query}")
        links = await page.eval_on_selector_all(
            "li.b_algo h2 a",
            "nodes => nodes.map(n => ({title:n.textContent, href:n.href}))",
        )
        for item in links[:limit]:
            url = item.get("href", "")
            if not url:
                continue
            detail = await browser.new_page()
            try:
                await detail.goto(url, timeout=15000)
                content = await detail.content()
                emails = EMAIL_PATTERN.findall(content)
                email = emails[0] if emails else ""
                results.append(
                    Lead(
                        brand_name=(item.get("title") or "Unknown Brand").strip(),
                        website=url,
                        email=email,
                        country="Unknown",
                        instagram="",
                        linkedin="",
                        product_category="activewear",
                    )
                )
            except Exception:
                continue
            finally:
                await detail.close()
        await browser.close()
    return results


async def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--query", required=True, help="Search query")
    parser.add_argument("--limit", type=int, default=10, help="Max brands to collect")
    parser.add_argument(
        "--output",
        default="data/scraped_leads.json",
        help="Output JSON path",
    )
    args = parser.parse_args()

    leads = await scrape(args.query, args.limit)
    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps([asdict(lead) for lead in leads], indent=2), encoding="utf-8")
    print(f"Saved {len(leads)} leads -> {output_path}")


if __name__ == "__main__":
    asyncio.run(main())
