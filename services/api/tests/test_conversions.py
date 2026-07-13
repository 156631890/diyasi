from collections.abc import Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from database import Base, get_db
from main import app
from routers.inquiries import ip_request_times


@pytest.fixture()
def client(tmp_path) -> Generator[TestClient, None, None]:
    engine = create_engine(
        f"sqlite:///{tmp_path / 'conversions.db'}",
        connect_args={"check_same_thread": False},
    )
    session_local = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base.metadata.create_all(bind=engine)

    def override_get_db() -> Generator[Session, None, None]:
        db = session_local()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    ip_request_times.clear()
    test_client = TestClient(app)
    yield test_client
    test_client.close()
    app.dependency_overrides.clear()
    Base.metadata.drop_all(bind=engine)
    engine.dispose()


def test_accepts_allowlisted_conversion_event_and_returns_actual_counts(client: TestClient) -> None:
    payload = {
        "name": "quote_started",
        "path": "/products/DYS-1601642594802",
        "locale": "en",
        "project_route": "ready-stock",
        "product_id": "DYS-1601642594802",
    }

    response = client.post("/analytics/events", json=payload)

    assert response.status_code == 201
    assert response.json()["name"] == "quote_started"
    assert response.json()["path"] == "/products/DYS-1601642594802"

    overview = client.get("/analytics/overview")
    assert overview.status_code == 200
    assert overview.json()["conversion_events_total"] == 1
    assert overview.json()["events_by_name"] == [{"name": "quote_started", "count": 1}]
    assert "daily_visitors" not in overview.json()
    assert "keyword_ranking_keywords" not in overview.json()
    assert "email_reply_rate" not in overview.json()


@pytest.mark.parametrize(
    "payload",
    [
        {"name": "email_captured", "path": "/contact"},
        {"name": "quote_started", "path": "/contact", "email": "buyer@example.com"},
    ],
)
def test_rejects_unknown_or_personal_event_payloads(client: TestClient, payload: dict[str, str]) -> None:
    response = client.post("/analytics/events", json=payload)

    assert response.status_code == 422


@pytest.mark.parametrize(
    "payload",
    [
        {"name": "quote_started", "path": "/contact?email=buyer@example.com"},
        {"name": "quote_started", "path": "https://example.com/contact"},
        {"name": "quote_started", "path": "/contact#quote"},
        {"name": "quote_started", "path": "/contact/buyer@example.com"},
        {"name": "quote_started", "path": "/contact\nX-Injected: yes"},
        {"name": "quote_started", "path": "/contact", "locale": "fr"},
        {"name": "quote_started", "path": "/contact", "project_route": "private-label<script>"},
        {"name": "quote_started", "path": "/contact", "product_id": "buyer@example.com"},
    ],
)
def test_rejects_unsafe_semantic_event_context_without_persisting_rows(
    client: TestClient, payload: dict[str, str]
) -> None:
    response = client.post("/analytics/events", json=payload)

    assert response.status_code == 422
    assert client.get("/analytics/overview").json()["conversion_events_total"] == 0


@pytest.mark.parametrize(
    "path",
    [
        "/contact/13800138000",
        "/contact/unapproved-segment",
        "/products/DYS-unreviewed",
        "/resources/unapproved-resource",
        "/es/unapproved-page",
    ],
)
def test_rejects_unapproved_public_path_patterns_without_persisting_rows(
    client: TestClient, path: str
) -> None:
    response = client.post("/analytics/events", json={"name": "quote_started", "path": path})

    assert response.status_code == 422
    assert client.get("/analytics/overview").json()["conversion_events_total"] == 0


@pytest.mark.parametrize(
    "payload",
    [
        {"name": "quote_started", "path": "/es/contacto", "locale": "en"},
        {"name": "quote_started", "path": "/contact", "locale": "es"},
        {"name": "quote_started", "path": "/contact", "product_id": "DYS-1601642594802"},
        {
            "name": "quote_started",
            "path": "/products/DYS-1601642594802",
            "product_id": "DYS-1601700253074",
        },
        {
            "name": "quote_started",
            "path": "/products/DYS-1601642594802",
            "project_route": "private-label",
        },
    ],
)
def test_rejects_mismatched_conversion_context_without_persisting_rows(
    client: TestClient, payload: dict[str, str]
) -> None:
    response = client.post("/analytics/events", json=payload)

    assert response.status_code == 422
    assert client.get("/analytics/overview").json()["conversion_events_total"] == 0


@pytest.mark.parametrize(
    "payload",
    [
        {"name": "low_moq_route_selected", "path": "/contact"},
        {"name": "resource_to_quote", "path": "/resources"},
        {"name": "resource_to_quote", "path": "/contact"},
    ],
)
def test_rejects_invalid_event_specific_context_without_persisting_rows(
    client: TestClient, payload: dict[str, str]
) -> None:
    response = client.post("/analytics/events", json=payload)

    assert response.status_code == 422
    assert client.get("/analytics/overview").json()["conversion_events_total"] == 0


def test_persists_typed_non_pii_inquiry_fields_additively(client: TestClient) -> None:
    payload = {
        "name": "Buyer",
        "email": "buyer@example.com",
        "company": "Example Brand",
        "message": "Please prepare a private label quote.",
        "country": "United States",
        "category": "Women's underwear",
        "quantity": "500",
        "project_route": "private-label",
        "private_label": "woven label",
        "packaging": "gift box",
        "launch_date": "2026-10-01",
    }

    response = client.post("/inquiries/", json=payload)

    assert response.status_code == 200
    assert {field: response.json()[field] for field in payload if field not in {"name", "email", "company", "message"}} == {
        field: payload[field]
        for field in payload
        if field not in {"name", "email", "company", "message"}
    }
