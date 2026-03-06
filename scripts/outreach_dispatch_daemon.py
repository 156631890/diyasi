"""
Dispatch queued outreach emails periodically.

Usage:
  python scripts/outreach_dispatch_daemon.py --api http://127.0.0.1:8000 --interval 300
"""

from __future__ import annotations

import argparse
import json
import time
from datetime import datetime
from urllib import request


def dispatch(api: str) -> dict:
    req = request.Request(
        f"{api}/outreach/dispatch-due",
        data=b"{}",
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with request.urlopen(req, timeout=120) as resp:
        return json.loads(resp.read().decode("utf-8"))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--api", default="http://127.0.0.1:8000", help="Backend API base URL.")
    parser.add_argument("--interval", type=int, default=300, help="Dispatch interval in seconds.")
    args = parser.parse_args()

    print(f"Dispatch daemon started. api={args.api} interval={args.interval}s")
    while True:
        now = datetime.utcnow().isoformat() + "Z"
        try:
            result = dispatch(args.api)
            print(f"{now} -> {result}")
        except Exception as exc:  # noqa: BLE001
            print(f"{now} -> dispatch error: {exc}")
        time.sleep(args.interval)


if __name__ == "__main__":
    main()
