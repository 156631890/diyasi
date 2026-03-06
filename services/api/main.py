from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from database import Base, SessionLocal, engine
from migrations import run_migrations
from routers import analytics, chatbot, crm, health, inquiries, leads, media, orders, outreach, products, seo
from seed import seed_if_empty

app = FastAPI(
    title="AI Factory Global Lead Engine API",
    version="0.1.0",
    description="Factory lead generation MVP backend.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    Base.metadata.create_all(bind=engine)
    run_migrations(engine)
    db = SessionLocal()
    try:
        seed_if_empty(db)
    finally:
        db.close()


app.include_router(health.router)
app.include_router(products.router)
app.include_router(leads.router)
app.include_router(crm.router)
app.include_router(seo.router)
app.include_router(outreach.router)
app.include_router(analytics.router)
app.include_router(chatbot.router)
app.include_router(inquiries.router)
app.include_router(media.router)
app.include_router(orders.router)
