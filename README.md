# AI Factory Global Lead Engine

MVP implementation from PRD:

- B2B factory website (Next.js)
- Multilingual mode (EN / ZH / ES) with top navigation language switch
- Product CMS
- Gemini image generation for products
- Gemini 3 API creative generation (poster/banner/social/factory visuals)
- Independent-site payment framework (mock checkout flow)
- AI SEO article generator
- Lead collection and scoring
- Outreach sequence
- CRM pipeline
- Analytics dashboard
- Chatbot Q&A
- Admin management modules:
  - Product edit/delete
  - Blog create/edit/publish/delete
  - Media asset edit/delete
  - Product category rename/delete

## Project Structure

```text
ai-factory-global-lead-engine/
  apps/web/         # Next.js frontend
  services/api/     # FastAPI backend
  scripts/          # scraper and automation scripts
  docs/             # architecture notes
```

## 1) Environment

Copy `.env.example` to `.env`.

Important values:

- `GEMINI_API_KEY`: Gemini key for image generation
- `GEMINI_MODEL`: default `gemini-3.1-flash-image-preview` (Gemini 3 image model)
- `NEXT_PUBLIC_BACKEND_URL`: frontend -> backend base URL

Free-first outreach values:

- `SMTP_MOCK_MODE=true` (default): no paid mail service needed, writes to `OUTREACH_LOG_FILE`
- Optional real SMTP: set `SMTP_HOST`, `SMTP_USERNAME`, `SMTP_PASSWORD`

## 2) Run Backend

```bash
cd services/api
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## 3) Run Frontend

```bash
cd apps/web
npm install --cache .npm-cache
npm run dev
```

URLs:

- Site/Admin: `http://localhost:3000`
- API Docs: `http://127.0.0.1:8000/docs`

If `8000` is unavailable on your machine, run backend on `8010` and set:

- `NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8010`

## 4) Free Automation Flow

1. Import demo leads
2. Analyze leads
3. Schedule outreach sequence
4. Dispatch due emails in mock mode (logged locally)

### API

- `POST /leads/import-demo`
- `POST /leads/analyze`
- `POST /outreach/run`
- `POST /outreach/dispatch-due`
- `POST /leads/import-list` (bulk import scraped JSON)
- `POST /media/generate` (single poster/banner/social image)
- `POST /media/generate-brand-pack` (batch brand image pack)
- `GET /media/assets`
- `PATCH /media/assets/{asset_id}` and `DELETE /media/assets/{asset_id}`
- `DELETE /products/{product_id}`
- `POST /products/categories/rename`
- `POST /products/categories/delete`
- `POST /seo/articles`
- `PATCH /seo/articles/{slug}`
- `POST /seo/articles/{slug}/publish`
- `POST /seo/articles/{slug}/unpublish`
- `DELETE /seo/articles/{slug}`
- `POST /api/payments/checkout` (framework mock checkout session from frontend)

### Scripts

```bash
python scripts/lead_scraper_playwright.py --query "activewear brand" --limit 20
python scripts/import_leads_json.py --input data/scraped_leads.json
python scripts/outreach_dispatch_daemon.py --api http://127.0.0.1:8000 --interval 300
python scripts/run_free_pipeline.py --mode demo
```

One-click variants:

```bash
python scripts/run_free_pipeline.py --mode demo
python scripts/run_free_pipeline.py --mode file --input data/scraped_leads.json
python scripts/run_free_pipeline.py --mode scrape --query "seamless underwear brand" --limit 20
```

## 5) Notes

- Default DB is SQLite for local dev (free). You can switch to PostgreSQL/Supabase by `DATABASE_URL`.
- In mock mail mode, no real email is sent and all outreach content is stored to log file.

## 6) Deploy Backend

Recommended production setup for the current stack:

- Frontend: Vercel
- Backend: Railway
- Database: SQLite on a Railway Volume

This is the practical fit for the current codebase because the API already uses SQLite. Deploying the API onto an ephemeral filesystem risks losing product data between deploys or restarts.

### Railway API Service

1. Create a new Railway project from this GitHub repo.
2. Create a service from the repo and set its `Root Directory` to `services/api`.
3. Railway will pick up `services/api/railway.json`.
4. Add a mounted volume and use mount path `/data`.
5. Set these environment variables on the Railway service:

```bash
DATABASE_URL=sqlite:////data/lead_engine.db
BACKEND_CORS_ORIGINS=https://www.chuangrongapparel.com,https://chuangrongapparel.com,https://<your-vercel-domain>
SMTP_MOCK_MODE=true
GEMINI_API_KEY=<your-key-if-needed>
GEMINI_MODEL=gemini-3.1-flash-image-preview
```

6. Deploy the service.
7. Verify these URLs:

```text
https://<your-railway-domain>/health
https://<your-railway-domain>/products/
https://<your-railway-domain>/products/categories
```

If the database starts empty, the API startup hook will seed the product table automatically.

### Vercel Frontend

On the Vercel project, set:

```bash
NEXT_PUBLIC_BACKEND_URL=https://<your-railway-domain>
```

Then redeploy the frontend.

### Current product import behavior

- The backend now seeds the Alibaba-derived product catalog into the `products` table.
- If the database still contains the original 5 demo products, startup will replace that legacy seed with the newer catalog automatically.
- If the database already contains newer products you entered later, it will not wipe them.
