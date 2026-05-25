# Diyasi Founder Platform Redesign Design

Date: 2026-05-25
Status: Approved direction, awaiting implementation plan

## Goal

Rebuild the Diyasi website from a traditional underwear factory / OEM site into a founder-focused platform for launching underwear brands with lower risk.

The new positioning is:

> Diyasi helps startup founders, creators, boutiques, and small DTC teams validate and launch underwear brands through Starter Kits, ready-stock testing, brand direction, and gradual scaling into custom production.

The redesign should not preserve the old OEM-first or factory-first narrative. Factory and production capability can appear only as fulfillment proof behind the platform.

## Primary Audience

- First-time underwear brand founders
- TikTok and creator-led sellers
- Shopify / DTC store operators
- Boutique owners testing private-label products
- Small teams that want to validate demand before investing in large inventory

## Core Message

Launch your own underwear brand with less risk.

The site should repeatedly reinforce:

- Start small
- Validate before scaling
- Use Starter Kits instead of blind bulk inventory
- Test ready stock before custom production
- Move into private label only after market signal
- Diyasi provides the product, packaging, content, fulfillment, and reorder path

## Information Architecture

### New Primary Routes

- `/`
  - Homepage.
  - First-viewport job: explain the platform and drive users to Starter Kits or Brand Quiz.

- `/starter-kits`
  - Core commercial page.
  - Replaces a traditional product catalog with launch-ready kit options.

- `/validation-system`
  - Methodology page.
  - Explains the validation-first path from brand direction to custom production.

- `/brand-quiz`
  - Conversion page.
  - Collects audience, channel, style, budget, and timeline so Diyasi can recommend a Starter Kit.

- `/founder-academy`
  - Education hub.
  - Replaces the old blog/news framing with founder education.

- `/fulfillment-proof`
  - Trust page.
  - Shows ready stock, QC, packing, shipping, and reorder support without making the factory the hero.

- `/comparison-hub`
  - Persuasion and SEO page.
  - Compares traditional MOQ-first factories with Diyasi's founder launch system.

- `/contact`
  - Lead capture page.
  - Becomes "Get Your Starter Kit Recommendation" rather than generic contact.

### Legacy Route Handling

- `/products` redirects to `/starter-kits`
- `/oem-odm` redirects to `/validation-system`
- `/factory` redirects to `/fulfillment-proof`
- `/blog` redirects to `/founder-academy`

Legal and operational pages remain available:

- `/privacy-policy`
- `/return-policy`
- `/payments`
- `/admin`

`/payments` and `/admin` should not be primary navigation items.

## Navigation

Primary navigation:

- Starter Kits
- Validation System
- Brand Quiz
- Founder Academy
- Proof
- Contact

Primary CTA:

- Get Starter Kit Recommendation

Brand label:

- DIYASI

Avoid:

- OEM / ODM as a primary nav label
- Factory as a primary nav label
- Product catalog framing in the top navigation

## Visual Direction

The site should feel like a modern DTC startup launch platform, not a factory brochure.

Use:

- White and light gray page backgrounds
- Black primary buttons
- Light gray secondary buttons
- Clean Inter-style sans-serif typography
- Large direct headlines
- Editorial sections with strong spacing
- Rounded cards only where they serve comparison, kit, or form grouping
- Modern founder desk, product kit, packaging, and planning imagery

Avoid:

- Warm brown factory-site palette
- Heavy gradients
- Decorative blobs or orbs
- Generic stock photography
- Old factory-first hero imagery
- In-image UI text that should be code-rendered
- Fake claims or unsupported metrics

## Image Generation Policy

All new visual assets required by the redesign must be generated with Codex's built-in `image_gen` tool unless a specific asset is better handled as code-native UI.

Rules:

- Do not use placeholder boxes in final pages.
- Do not rely on random stock images.
- Do not put critical page copy in generated images.
- UI text, headings, CTAs, tables, labels, and form text must be rendered in code.
- Generated images should provide product atmosphere, Starter Kit visuals, packaging, founder desk scenes, fulfillment proof, and education thumbnails.
- Final selected assets must be copied into the project, under:
  - `apps/web/public/media/generated/founder-platform/`
- Do not overwrite existing generated assets unless explicitly replacing them.
- Use descriptive filenames matching the asset inventory below.

## Page Designs

### Homepage `/`

Purpose:

Introduce Diyasi as the founder launch platform and move users toward Starter Kits or Brand Quiz.

Sections:

1. Hero
   - Headline: "Launch Your Own Underwear Brand"
   - Supporting copy: low-risk founder platform, validate products, test demand, scale gradually.
   - CTA 1: Start With A Starter Kit
   - CTA 2: Take AI Brand Quiz
   - Trust row: Beginner-friendly, Low MOQ, Ready-stock testing, Global shipping

2. Founder Validation System
   - Four steps:
     - Choose Brand Direction
     - Get Starter Kit
     - Test With Ready Stock
     - Scale Into Custom Production

3. Why Most Startup Brands Fail
   - Too Much Inventory
   - Wrong Product Direction
   - No Validation System

4. Starter Kits Preview
   - Preview the four kit types and link to `/starter-kits`.

5. Validation-First Process
   - Explain why Starter Kits reduce launch risk before custom production.

6. Traditional Factory vs Founder System
   - Short comparison table linking to `/comparison-hub`.

7. Founder Academy Preview
   - 3-4 education cards linking to `/founder-academy`.

8. Final CTA
   - "Ready To Build Your Brand?"
   - CTA: Get Starter Kit Recommendation

Generated image assets:

- `home-hero-founder-kit`
  - Founder desk flat lay with underwear samples, packaging box, brand cards, laptop, phone, and planning notes.
- `home-starter-kit-preview`
  - Starter Kit unboxing scene with product, packaging, inserts, and launch materials.
- `home-fulfillment-proof-strip`
  - Editorial collage showing QC, packing, ready stock, and shipping preparation.

### Starter Kits `/starter-kits`

Purpose:

Make Starter Kits the core product offer.

Sections:

1. Hero
   - Headline: "Validate Before You Scale"
   - Explain Starter Kits as structured launch packages, not ordinary samples.

2. Four Starter Kit Cards
   - Shopify Comfort Kit
   - TikTok Launch Kit
   - Minimal Essentials Kit
   - Boutique Retail Kit

3. Who Each Kit Is For
   - Founder profiles, sales channels, price tier, and product direction.

4. What Each Kit Includes
   - Product combinations
   - Packaging examples
   - Brand inserts
   - Content prompts
   - Launch recommendations

5. How to Choose a Kit
   - Simple decision guide.

6. CTA
   - Get Starter Kit Recommendation

Generated image assets:

- `starter-kits-comparison-hero`
- `kit-shopify-comfort`
- `kit-tiktok-launch`
- `kit-minimal-essentials`
- `kit-boutique-retail`

### Validation System `/validation-system`

Purpose:

Explain the methodology and replace the old OEM / ODM route with a founder-first process.

Sections:

1. Hero
   - Headline: "Test Your Market Before Custom Production"

2. Founder Risk Explanation
   - Inventory risk, wrong product direction, and premature customization.

3. Four-Step Validation Workflow
   - Brand Direction
   - Starter Kit
   - Ready Stock Test
   - Custom Production

4. Ready-Stock Testing
   - Low-risk market test before committing to custom production.

5. Scale Into Private Label
   - Packaging, labeling, colorways, and reorder support after validation.

6. CTA
   - Take AI Brand Quiz

Generated image assets:

- `validation-workflow-visual`
- `ready-stock-testing`
- `gradual-scale-custom-production`

### Brand Quiz `/brand-quiz`

Purpose:

Create the strongest lead-capture experience.

Sections:

1. Hero
   - Headline: "Find the right starter kit for your brand"

2. Quiz Form
   - Audience
   - Sales channel
   - Product style
   - Budget range
   - Launch timeline
   - Brand notes

3. What You Receive
   - Starter Kit recommendation
   - Suggested product direction
   - Packaging direction
   - First content angle
   - Next step from Diyasi team

4. Example Recommendation Output
   - Code-rendered recommendation panel.

5. Submit CTA
   - Get My Recommendation

Generated image assets:

- `brand-quiz-hero`
- `brand-direction-moodboard`
- `starter-kit-recommendation-output`

### Founder Academy `/founder-academy`

Purpose:

Replace factory news with founder education and SEO content.

Sections:

1. Hero
   - Headline: "Learn Before You Launch"

2. Featured Education Cards
   - Low-inventory launch strategy
   - Starter Kits vs traditional samples
   - SKU planning
   - TikTok validation

3. Launch Strategy Articles

4. Inventory Risk Articles

5. TikTok Validation Articles

6. CTA
   - Start With a Starter Kit

Generated image assets:

- `academy-hero-founder-desk`
- `academy-low-inventory`
- `academy-starter-kit-vs-samples`
- `academy-sku-planning`
- `academy-tiktok-validation`

### Fulfillment Proof `/fulfillment-proof`

Purpose:

Show that Diyasi can execute after validation without letting the site become a factory brochure.

Sections:

1. Hero
   - Headline: "Behind every starter kit is a fulfillment system"

2. Ready Stock
   - The ability to test quickly.

3. QC and Inspection
   - Confidence in product consistency.

4. Packaging and Inserts
   - Brand-ready presentation.

5. Global Shipping
   - Shipping preparation and export coordination.

6. Reorder Path
   - Gradual scaling after validation.

7. CTA
   - Plan My Launch

Generated image assets:

- `proof-ready-stock`
- `proof-qc-inspection`
- `proof-packaging-inserts`
- `proof-global-shipping`
- `proof-reorder-path`

### Comparison Hub `/comparison-hub`

Purpose:

Explain why beginner founders should not start with a MOQ-first factory process.

Sections:

1. Hero
   - Headline: "Traditional Factory vs Founder Launch System"

2. Comparison Table
   - Traditional Factory:
     - MOQ-first
     - Bulk inventory
     - Samples only
     - Production-focused
   - Diyasi Founder System:
     - Validation-first
     - Gradual scaling
     - Structured Starter Kits
     - Founder-focused

3. Why MOQ-First Fails Beginners

4. Why Validation-First Works

5. Decision Guide

6. CTA
   - Get Starter Kit Recommendation

Generated image assets:

- `comparison-hero`
- `moq-first-risk`
- `validation-first-path`

### Contact `/contact`

Purpose:

Turn contact into a structured recommendation request.

Sections:

1. Hero
   - Headline: "Get Your Starter Kit Recommendation"

2. Project Brief Form
   - Name
   - Email
   - WhatsApp
   - Brand stage
   - Sales channel
   - Product direction
   - Budget range
   - Launch timing
   - Notes

3. What Happens After Submitting
   - Diyasi reviews your direction
   - Recommends a Starter Kit
   - Shares product and packaging path
   - Plans the next validation step

4. Direct Contact Block
   - Email
   - Phone / WhatsApp
   - Location

5. Trust Note
   - Low-risk launch support, no bulk-first pressure.

Generated image assets:

- `contact-recommendation-hero`
- `contact-project-brief`

## Components and Data

Shared components should be created or refactored around the new platform model:

- Platform page shell
- Platform hero
- Section header
- CTA block
- Starter Kit card
- Workflow step card
- Comparison table
- Education card
- Proof card
- Quiz form

Data should be organized in typed arrays where practical:

- Starter Kits
- Validation steps
- Academy articles
- Proof modules
- Comparison rows

Avoid one-off repeated markup when a shared component clearly reduces duplication.

## Existing Content to Retire or Hide

Do not keep the following as primary narrative:

- OEM / ODM workflow as the main offer
- Factory scale as the main hero proof
- Bulk production language above the fold
- Old product catalog as the main commercial page
- Factory news as blog positioning
- Sustainability as a primary nav item

Factory facts can appear on `/fulfillment-proof` only as supporting proof.

## SEO and Metadata

Each new route should have metadata aligned with the new positioning:

- Founder-focused title
- Starter Kit / validation-first description
- Schema should match the page role when already present in the project pattern

Redirected legacy routes should not keep old metadata as visible user-facing pages.

## Accessibility and Responsiveness

Requirements:

- All images need meaningful `alt` text.
- CTA links need clear destination labels.
- Forms need labels.
- Mobile navigation must not overflow.
- Cards and tables must collapse cleanly on mobile.
- Text must not overlap images or controls.
- Generated images must not contain critical text required for comprehension.

## Verification Plan

Before completion:

- Run `npm run build`.
- Run `npm run lint` if the current project supports it.
- Start the local Next.js app.
- Verify desktop and mobile layouts.
- Verify primary navigation links.
- Verify legacy redirects.
- Verify contact / quiz form rendering.
- Verify generated images load from project paths.
- Compare the implementation against this design spec and the ChatGPT reference direction.

## Out of Scope for This Pass

- Real AI recommendation backend for the quiz.
- Real payment flow changes.
- Admin console redesign.
- Backend data model changes unless needed to keep pages rendering.
- Rewriting legal policy content beyond navigation/footer consistency.

