"""
Import scraped leads JSON file into API.

Usage:
  python scripts/import_leads_json.py --input data/scraped_leads.json --api http://127.0.0.1:8000
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from urllib import request


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True, help="Path to leads JSON array.")
    parser.add_argument("--api", default="http://127.0.0.1:8000", help="Backend API base URL.")
    args = parser.parse_args()

    input_path = Path(args.input)
    if not input_path.exists():
        raise FileNotFoundError(f"Input not found: {input_path}")

    items = json.loads(input_path.read_text(encoding="utf-8"))
    data = json.dumps(items).encode("utf-8")
    req = request.Request(
        f"{args.api}/leads/import-list",
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with request.urlopen(req, timeout=60) as resp:
        body = resp.read().decode("utf-8")
    print(body)


if __name__ == "__main__":
    main()
