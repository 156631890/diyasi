"""
One-click free pipeline runner.

Features:
1) Import leads (demo | file | scrape)
2) Analyze lead scores
3) Schedule outreach sequence
4) Dispatch due outreach events

Usage examples:
  python scripts/run_free_pipeline.py
  python scripts/run_free_pipeline.py --mode file --input data/scraped_leads.json
  python scripts/run_free_pipeline.py --mode scrape --query "activewear brand" --limit 20
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
import time
from pathlib import Path
from typing import Any
from urllib import request
from urllib.error import HTTPError, URLError


def post_json(api: str, path: str, payload: Any) -> dict:
    body = json.dumps(payload).encode("utf-8")
    req = request.Request(
        f"{api}{path}",
        data=body,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with request.urlopen(req, timeout=120) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="ignore")
        raise RuntimeError(f"POST {path} failed: {exc.code} {detail}") from exc
    except URLError as exc:
        raise RuntimeError(f"Cannot connect to backend {api}: {exc}") from exc


def import_from_file(api: str, input_path: Path) -> dict:
    if not input_path.exists():
        raise FileNotFoundError(f"Input not found: {input_path}")
    items = json.loads(input_path.read_text(encoding="utf-8"))
    if not isinstance(items, list):
        raise RuntimeError("Input JSON must be an array.")
    return post_json(api, "/leads/import-list", items)


def run_scraper(script_dir: Path, query: str, limit: int, output_path: Path) -> None:
    scraper_path = script_dir / "lead_scraper_playwright.py"
    cmd = [
        sys.executable,
        str(scraper_path),
        "--query",
        query,
        "--limit",
        str(limit),
        "--output",
        str(output_path),
    ]
    completed = subprocess.run(cmd, capture_output=True, text=True)
    if completed.returncode != 0:
        raise RuntimeError(
            "Scraper failed.\n"
            f"stdout:\n{completed.stdout}\n"
            f"stderr:\n{completed.stderr}\n"
            "Tip: install Playwright and browser first."
        )
    print(completed.stdout.strip())


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--api", default="http://127.0.0.1:8000", help="Backend API base URL.")
    parser.add_argument(
        "--mode",
        choices=["demo", "file", "scrape"],
        default="demo",
        help="Lead source mode.",
    )
    parser.add_argument("--input", default="data/scraped_leads.json", help="Input JSON file for file/scrape mode.")
    parser.add_argument("--query", default="activewear brand", help="Search query for scrape mode.")
    parser.add_argument("--limit", type=int, default=20, help="Lead count for scrape mode.")
    parser.add_argument("--dispatch-rounds", type=int, default=1, help="How many dispatch calls to run.")
    parser.add_argument("--dispatch-interval", type=int, default=2, help="Seconds between dispatch rounds.")
    args = parser.parse_args()

    script_dir = Path(__file__).resolve().parent
    repo_root = script_dir.parent
    input_path = Path(args.input)
    if not input_path.is_absolute():
        input_path = repo_root / input_path

    print(f"[1/4] Import leads mode={args.mode}")
    if args.mode == "demo":
        imported = post_json(args.api, "/leads/import-demo", {})
    elif args.mode == "file":
        imported = import_from_file(args.api, input_path)
    else:
        run_scraper(script_dir, args.query, args.limit, input_path)
        imported = import_from_file(args.api, input_path)
    print(f"Imported result: {imported}")

    print("[2/4] Analyze leads")
    analyzed = post_json(args.api, "/leads/analyze", {})
    print(f"Analyze result: {analyzed}")

    print("[3/4] Schedule outreach")
    scheduled = post_json(args.api, "/outreach/run", {})
    print(f"Outreach result: {scheduled}")

    print("[4/4] Dispatch due events")
    for i in range(max(args.dispatch_rounds, 1)):
        dispatched = post_json(args.api, "/outreach/dispatch-due", {})
        print(f"Dispatch #{i + 1}: {dispatched}")
        if i < args.dispatch_rounds - 1:
            time.sleep(max(args.dispatch_interval, 0))

    print("Pipeline done.")


if __name__ == "__main__":
    main()
