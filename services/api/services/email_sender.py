from __future__ import annotations

import smtplib
from datetime import datetime
from email.message import EmailMessage
from pathlib import Path

from config import settings


def _write_mock_log(to_email: str, subject: str, body: str) -> None:
    line = (
        f"[{datetime.utcnow().isoformat()}Z] TO={to_email} SUBJECT={subject}\n"
        f"{body}\n{'-' * 60}\n"
    )
    log_path = Path(settings.outreach_log_file)
    log_path.parent.mkdir(parents=True, exist_ok=True)
    with log_path.open("a", encoding="utf-8") as fp:
        fp.write(line)


def send_email(to_email: str, subject: str, body: str) -> tuple[bool, str]:
    if settings.smtp_mock_mode:
        _write_mock_log(to_email, subject, body)
        return True, "mock_logged"

    if not settings.smtp_host:
        return False, "smtp_host_missing"

    msg = EmailMessage()
    msg["From"] = settings.smtp_from_email
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.set_content(body)

    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=30) as server:
            if settings.smtp_use_tls:
                server.starttls()
            if settings.smtp_username:
                server.login(settings.smtp_username, settings.smtp_password)
            server.send_message(msg)
    except Exception as exc:  # noqa: BLE001
        return False, str(exc)

    return True, "sent"
