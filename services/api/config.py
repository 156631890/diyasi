import os
from dataclasses import dataclass


@dataclass
class Settings:
    database_url: str = os.getenv("DATABASE_URL", "sqlite:///./lead_engine.db")
    gemini_api_key: str = os.getenv("GEMINI_API_KEY", "")
    gemini_model: str = os.getenv("GEMINI_MODEL", "gemini-3.1-flash-image-preview")
    cors_origins_raw: str = os.getenv(
        "BACKEND_CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000"
    )
    smtp_host: str = os.getenv("SMTP_HOST", "")
    smtp_port: int = int(os.getenv("SMTP_PORT", "587"))
    smtp_username: str = os.getenv("SMTP_USERNAME", "")
    smtp_password: str = os.getenv("SMTP_PASSWORD", "")
    smtp_from_email: str = os.getenv("SMTP_FROM_EMAIL", "factory@example.com")
    smtp_use_tls: bool = os.getenv("SMTP_USE_TLS", "true").lower() == "true"
    smtp_mock_mode: bool = os.getenv("SMTP_MOCK_MODE", "true").lower() == "true"
    outreach_dispatch_interval_sec: int = int(os.getenv("OUTREACH_DISPATCH_INTERVAL_SEC", "300"))
    outreach_log_file: str = os.getenv("OUTREACH_LOG_FILE", "./outreach_emails.log")

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins_raw.split(",") if origin.strip()]


settings = Settings()
