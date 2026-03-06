# Architecture Summary

## Tech Stack

- Frontend: Next.js + React + TailwindCSS
- Backend: FastAPI + SQLAlchemy
- Database: SQLite (dev), PostgreSQL/Supabase (prod-ready by env switch)
- AI Image: Gemini API (`generateContent`)
- Scraping: Python + Playwright (script template)

## Module Mapping

- Website pages: `apps/web/app/*`
- Admin dashboard: `apps/web/components/AdminConsole.tsx`
- Product CMS APIs: `services/api/routers/products.py`
- SEO engine APIs: `services/api/routers/seo.py`
- Lead + CRM APIs: `services/api/routers/leads.py`, `services/api/routers/crm.py`
- Outreach automation: `services/api/routers/outreach.py`
  - Free mode: SMTP mock logging via `services/api/services/email_sender.py`
- Analytics: `services/api/routers/analytics.py`
- Chatbot: `services/api/routers/chatbot.py`
- Media generation: `services/api/routers/media.py` (Gemini 3 posters and brand creatives)
- Payments: `apps/web/app/api/payments/checkout/route.ts` (mock checkout framework, provider-ready)

## Data Entities

- `products`
- `leads`
- `outreach_events`
- `seo_articles`
- `inquiries`

## Production Upgrade Notes

- Replace `DATABASE_URL` with PostgreSQL/Supabase connection string.
- Move email sending in `outreach.py` to Resend/SendGrid SDK.
- Add task queue (Celery/RQ) for scheduled follow-ups and scraping jobs.
