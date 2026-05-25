# Diyasi Founder Platform Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Diyasi Next.js site into a founder-focused underwear brand launch platform with generated visual assets, new platform routes, legacy redirects, and full-site navigation/footer alignment.

**Architecture:** Keep the current Next.js app and backend untouched. Add a small founder-platform content module, shared page components, generated image assets under `public`, new route pages, and isolated platform CSS imported from the root layout. Convert old commercial routes into redirects so the old factory/product/OEM narrative is no longer user-facing.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind, project CSS, Codex built-in `image_gen` for raster assets.

---

## File Structure

Create:

- `apps/web/lib/founder-platform.ts`
  - Owns all platform copy, route labels, Starter Kit data, workflow steps, proof modules, academy article cards, comparison rows, contact form options, image paths, and image prompt inventory.

- `apps/web/components/founder-platform/PlatformSections.tsx`
  - Owns reusable visual primitives used by the new platform pages.

- `apps/web/app/founder-platform.css`
  - Owns only the new platform visual system: layout, cards, grids, buttons, responsive behavior, and generated-image framing.

- `apps/web/app/starter-kits/page.tsx`
- `apps/web/app/validation-system/page.tsx`
- `apps/web/app/brand-quiz/page.tsx`
- `apps/web/app/founder-academy/page.tsx`
- `apps/web/app/fulfillment-proof/page.tsx`
- `apps/web/app/comparison-hub/page.tsx`
  - New platform routes.

- `apps/web/public/media/generated/founder-platform/`
  - Final generated image assets copied from Codex built-in image generation output.

Modify:

- `apps/web/app/layout.tsx`
  - Replace factory-first metadata/JSON-LD language and import `founder-platform.css`.

- `apps/web/lib/seo.ts`
  - Replace site name/description with founder-platform positioning.

- `apps/web/components/TopNav.tsx`
  - Replace old nav with Starter Kits, Validation System, Brand Quiz, Founder Academy, Proof, Contact.

- `apps/web/components/SiteFooter.tsx`
  - Replace old factory/product/footer copy with platform copy and route links.

- `apps/web/app/page.tsx`
  - Replace homepage with platform homepage.

- `apps/web/app/contact/page.tsx`
  - Replace generic inquiry form with Starter Kit recommendation request form while posting to the existing inquiry endpoint.

- `apps/web/app/products/page.tsx`
- `apps/web/app/products/[productId]/page.tsx`
- `apps/web/app/oem-odm/page.tsx`
- `apps/web/app/factory/page.tsx`
- `apps/web/app/blog/page.tsx`
  - Redirect legacy user-facing routes to the new platform routes.

- `apps/web/app/sitemap.ts`
  - Publish new platform routes and remove old commercial routes/product detail URLs from the sitemap.

Do not modify:

- Backend services.
- Payment implementation.
- Admin console behavior.
- Legal policy content beyond incidental site shell styling.

## Task 1: Protect Current Worktree and Confirm Baseline

**Files:**
- Read only: Git status and existing route/component files.

- [ ] **Step 1: Record current status**

Run:

```powershell
git status --short
```

Expected:

- Existing user/workspace edits may be present in `apps/web/...`.
- Do not reset, revert, or discard any existing edits.

- [ ] **Step 2: Confirm the approved spec exists**

Run:

```powershell
Test-Path docs\superpowers\specs\2026-05-25-diyasi-founder-platform-redesign-design.md
```

Expected:

```text
True
```

- [ ] **Step 3: Read the spec before editing**

Run:

```powershell
Get-Content -Raw docs\superpowers\specs\2026-05-25-diyasi-founder-platform-redesign-design.md
```

Expected:

- The spec states the site must fully shift to Founder Launch / Starter Kit / Validation-first positioning.
- The spec states all required new visual assets are generated with Codex built-in `image_gen`.

- [ ] **Step 4: Commit checkpoint**

Do not commit yet. This task is read-only.

## Task 2: Generate Founder Platform Image Assets

**Files:**
- Create directory: `apps/web/public/media/generated/founder-platform/`
- Create final assets listed below.

Use Codex built-in `image_gen` mode, not the CLI fallback. After each image is generated, copy the selected output from Codex's generated image location into `apps/web/public/media/generated/founder-platform/` using the exact filename in this task. Use `.png` unless the generated output is already `.webp` and the implementation references that extension consistently.

Global prompt constraints for every image:

```text
No visible text, no logos, no watermark, no fake UI labels, no distorted hands, no nudity, no lingerie worn by a visible model, no factory brochure style, no warm brown factory-site palette. Use modern DTC startup visual language with white, light gray, black, soft neutral, and subtle premium accent colors. The image must work as a website asset with clean negative space and professional ecommerce polish.
```

- [ ] **Step 1: Create the output directory**

Run:

```powershell
New-Item -ItemType Directory -Force apps\web\public\media\generated\founder-platform | Out-Null
```

Expected:

- Directory exists.

- [ ] **Step 2: Generate homepage assets**

Use these prompts:

```text
Use case: product-mockup
Asset type: homepage hero
Primary request: A premium founder desk flat lay for launching a private-label underwear brand, showing folded underwear samples, minimal packaging boxes, blank brand cards, a laptop, a smartphone, fabric swatches, and launch planning notes.
Style/medium: high-end editorial product photography
Composition/framing: wide landscape, clean negative space, objects arranged with startup workspace clarity
Lighting/mood: soft daylight studio lighting, confident, modern, low-risk launch feeling
Color palette: white, light gray, black, soft neutral, subtle premium accent
Constraints: no visible text, no logos, no watermark, no people, no worn underwear, no factory scene
```

Save as:

```text
apps/web/public/media/generated/founder-platform/home-hero-founder-kit.png
```

```text
Use case: product-mockup
Asset type: homepage starter kit preview
Primary request: A polished starter kit unboxing scene for a new underwear brand, with folded product samples, elegant blank packaging, inserts, tissue paper, color cards, and launch materials.
Style/medium: ecommerce editorial product photography
Composition/framing: medium-wide scene, kit contents arranged clearly on a white studio surface
Lighting/mood: soft premium studio lighting, calm and organized
Color palette: white, light gray, black, soft neutral accents
Constraints: no visible text, no logos, no watermark, no people, no worn underwear
```

Save as:

```text
apps/web/public/media/generated/founder-platform/home-starter-kit-preview.png
```

```text
Use case: ads-marketing
Asset type: homepage fulfillment proof strip
Primary request: A four-panel editorial collage showing ready stock shelves, quality inspection of folded underwear, packaging inserts being prepared, and shipping cartons staged for global delivery.
Style/medium: clean commercial photography collage
Composition/framing: horizontal strip collage, four balanced panels, no text overlays
Lighting/mood: bright operational clarity, trustworthy and modern
Color palette: white, light gray, black, soft neutral accents
Constraints: no visible text, no logos, no watermark, no old factory brochure mood
```

Save as:

```text
apps/web/public/media/generated/founder-platform/home-fulfillment-proof-strip.png
```

- [ ] **Step 3: Generate Starter Kit assets**

Use these prompts and save paths:

```text
Use case: product-mockup
Asset type: starter kits hero
Primary request: A premium comparison scene showing four distinct private-label underwear starter kits on a clean studio table, each kit with folded samples, blank packaging, color cards, and inserts.
Style/medium: high-end ecommerce product photography
Composition/framing: wide landscape, four grouped kit zones, no text
Lighting/mood: bright, organized, founder-friendly
Color palette: white, light gray, black, soft neutral accents
Constraints: no visible text, no logos, no watermark, no people
```

Save as `apps/web/public/media/generated/founder-platform/starter-kits-comparison-hero.png`.

```text
Use case: product-mockup
Asset type: Shopify Comfort Kit card
Primary request: A comfort-focused underwear starter kit for a Shopify DTC brand, with soft neutral underwear samples, premium blank packaging, fabric swatches, and clean ecommerce styling.
Style/medium: editorial product photography
Composition/framing: square card image, product kit centered with generous padding
Lighting/mood: soft, premium, calm
Color palette: white, oatmeal, charcoal, light gray
Constraints: no visible text, no logos, no model, no watermark
```

Save as `apps/web/public/media/generated/founder-platform/kit-shopify-comfort.png`.

```text
Use case: product-mockup
Asset type: TikTok Launch Kit card
Primary request: A social-first underwear starter kit for a creator-led brand, showing trend-forward product samples, colorful but tasteful packaging elements, a smartphone used as a prop, and creator content planning objects.
Style/medium: modern ecommerce product photography
Composition/framing: square card image, energetic arrangement without clutter
Lighting/mood: bright, youthful, launch-ready
Color palette: white, black, light gray, one soft accent color
Constraints: no visible text, no logos, no person, no watermark
```

Save as `apps/web/public/media/generated/founder-platform/kit-tiktok-launch.png`.

```text
Use case: product-mockup
Asset type: Minimal Essentials Kit card
Primary request: A minimalist underwear starter kit with neutral basics, blank matte packaging, fabric cards, and simple premium brand materials.
Style/medium: minimalist product photography
Composition/framing: square card image, restrained arrangement, clean geometry
Lighting/mood: calm, minimal, sophisticated
Color palette: white, stone, black, pale gray
Constraints: no visible text, no logos, no model, no watermark
```

Save as `apps/web/public/media/generated/founder-platform/kit-minimal-essentials.png`.

```text
Use case: product-mockup
Asset type: Boutique Retail Kit card
Primary request: A boutique retail underwear starter kit with shelf-ready packaging, folded samples, hang tags without text, tissue paper, and display-ready presentation.
Style/medium: premium retail product photography
Composition/framing: square card image, polished boutique display arrangement
Lighting/mood: elegant, buyer-ready, organized
Color palette: white, light gray, black, soft blush neutral
Constraints: no visible text, no logos, no model, no watermark
```

Save as `apps/web/public/media/generated/founder-platform/kit-boutique-retail.png`.

- [ ] **Step 4: Generate validation system assets**

Generate and save:

```text
validation-workflow-visual.png
Prompt: A clean visual workflow scene for a founder validation system, showing four physical stations on a studio desk: brand direction moodboard, starter kit box, ready-stock test products, and custom production planning materials. No visible text, no logos, no people.

ready-stock-testing.png
Prompt: A modern ecommerce ready-stock testing scene with small batches of folded underwear samples, organized inventory bins, packing slips without readable text, and a laptop analytics dashboard with no legible UI text. Clean white and gray palette, no people, no logos.

gradual-scale-custom-production.png
Prompt: A premium product development scene showing the transition from small starter kit samples to larger private-label packaging and production planning materials. Clean studio table, fabric swatches, blank packaging, no text, no logos, no people.
```

Save under `apps/web/public/media/generated/founder-platform/`.

- [ ] **Step 5: Generate brand quiz assets**

Generate and save:

```text
brand-quiz-hero.png
Prompt: A founder brand quiz concept scene with a laptop showing abstract non-readable form shapes, underwear sample cards, style moodboard images without text, fabric swatches, and blank packaging. Bright modern DTC startup look, no readable text, no logos, no people.

brand-direction-moodboard.png
Prompt: A premium underwear brand direction moodboard with neutral color chips, fabric swatches, folded product samples, blank brand cards, and packaging inspiration. Editorial overhead photography, no readable text, no logos, no people.

starter-kit-recommendation-output.png
Prompt: A clean recommendation output concept with a laptop showing abstract non-readable card blocks, a starter kit box, folded samples, and planning materials. Website product photography style, no readable text, no logos, no people.
```

Save under `apps/web/public/media/generated/founder-platform/`.

- [ ] **Step 6: Generate Founder Academy assets**

Generate and save:

```text
academy-hero-founder-desk.png
Prompt: A founder learning desk for launching an underwear brand, with notebook, laptop, folded product samples, blank guide sheets, and coffee cup. Clean editorial photo, no readable text, no logos, no people.

academy-low-inventory.png
Prompt: A visual metaphor for low-inventory startup launch, showing a small organized batch of underwear samples beside a minimal planning board with no readable text. Clean white studio, no logos, no people.

academy-starter-kit-vs-samples.png
Prompt: A comparison-style product photo showing a structured starter kit on one side and loose sample pieces on the other, with no readable text labels. Clean modern ecommerce layout, no logos, no people.

academy-sku-planning.png
Prompt: A SKU planning desk scene with grouped underwear samples, color swatches, blank cards, and a laptop showing abstract grid blocks with no readable text. Clean startup brand planning mood, no logos, no people.

academy-tiktok-validation.png
Prompt: A creator validation planning scene with folded underwear samples, smartphone prop, small tripod, packaging, and content planning materials with no readable text. Bright modern social-commerce feel, no logos, no people.
```

Save under `apps/web/public/media/generated/founder-platform/`.

- [ ] **Step 7: Generate fulfillment proof assets**

Generate and save:

```text
proof-ready-stock.png
Prompt: Ready-stock underwear inventory arranged in clean shelves and bins, modern fulfillment environment, folded products, no readable labels, no logos, no people.

proof-qc-inspection.png
Prompt: Quality inspection scene with folded underwear samples, measuring tape, fabric detail inspection, clean white table, no readable text, no logos, no faces.

proof-packaging-inserts.png
Prompt: Packaging and insert preparation scene for private-label underwear starter kits, blank cards, tissue paper, boxes, folded product, no readable text, no logos, no people.

proof-global-shipping.png
Prompt: Global shipping preparation scene with clean cartons, packed starter kits, shipping workflow objects without readable labels, bright modern logistics table, no logos, no people.

proof-reorder-path.png
Prompt: Reorder planning scene showing organized product batches, blank planning sheets, packaging samples, and a laptop with abstract non-readable charts, clean modern DTC operations look, no logos, no people.
```

Save under `apps/web/public/media/generated/founder-platform/`.

- [ ] **Step 8: Generate comparison and contact assets**

Generate and save:

```text
comparison-hero.png
Prompt: A clean visual contrast between an old bulk-inventory factory approach and a modern founder launch system, shown as two abstract product planning setups on a studio table. No readable text, no logos, no people, modern editorial composition.

moq-first-risk.png
Prompt: A tasteful visual metaphor for inventory risk, showing too many plain cartons and unsold product stacks in a clean neutral studio setting, no readable labels, no logos, no people.

validation-first-path.png
Prompt: A positive validation-first launch path scene with small starter kit, organized samples, packaging, and gradual scale planning objects. Clean white and gray DTC startup mood, no readable text, no logos, no people.

contact-recommendation-hero.png
Prompt: A consultation scene for starter kit recommendation, with a founder planning desk, product samples, blank brand cards, laptop, and packaging materials. Clean premium ecommerce service visual, no readable text, no logos, no people.

contact-project-brief.png
Prompt: A project brief planning scene with blank form-like papers, fabric swatches, folded underwear samples, packaging cards, and a laptop with abstract form blocks. No readable text, no logos, no people.
```

Save under `apps/web/public/media/generated/founder-platform/`.

- [ ] **Step 9: Verify asset paths**

Run:

```powershell
Get-ChildItem apps\web\public\media\generated\founder-platform -File | Select-Object -ExpandProperty Name
```

Expected filenames:

```text
academy-hero-founder-desk.png
academy-low-inventory.png
academy-sku-planning.png
academy-starter-kit-vs-samples.png
academy-tiktok-validation.png
brand-direction-moodboard.png
brand-quiz-hero.png
comparison-hero.png
contact-project-brief.png
contact-recommendation-hero.png
gradual-scale-custom-production.png
home-fulfillment-proof-strip.png
home-hero-founder-kit.png
home-starter-kit-preview.png
kit-boutique-retail.png
kit-minimal-essentials.png
kit-shopify-comfort.png
kit-tiktok-launch.png
moq-first-risk.png
proof-global-shipping.png
proof-packaging-inserts.png
proof-qc-inspection.png
proof-ready-stock.png
proof-reorder-path.png
ready-stock-testing.png
starter-kit-recommendation-output.png
starter-kits-comparison-hero.png
validation-first-path.png
validation-workflow-visual.png
```

- [ ] **Step 10: Commit generated assets**

Run:

```powershell
git add apps\web\public\media\generated\founder-platform
git commit -m "feat: add founder platform generated assets"
```

Expected:

- Commit contains only files under `apps/web/public/media/generated/founder-platform/`.

## Task 3: Add Founder Platform Data Module

**Files:**
- Create: `apps/web/lib/founder-platform.ts`

- [ ] **Step 1: Create typed platform data**

Create `apps/web/lib/founder-platform.ts` with this structure:

```ts
export type PlatformRoute = {
  href: string;
  label: string;
};

export type StarterKit = {
  slug: string;
  name: string;
  audience: string;
  description: string;
  image: string;
  includes: string[];
};

export type WorkflowStep = {
  title: string;
  body: string;
};

export type AcademyCard = {
  title: string;
  category: string;
  excerpt: string;
  image: string;
};

export type ProofModule = {
  title: string;
  body: string;
  image: string;
};

export type ComparisonRow = {
  factory: string;
  founderSystem: string;
};

const imageBase = "/media/generated/founder-platform";

export const platformNav: PlatformRoute[] = [
  { href: "/starter-kits", label: "Starter Kits" },
  { href: "/validation-system", label: "Validation System" },
  { href: "/brand-quiz", label: "Brand Quiz" },
  { href: "/founder-academy", label: "Founder Academy" },
  { href: "/fulfillment-proof", label: "Proof" },
  { href: "/contact", label: "Contact" }
];

export const starterKits: StarterKit[] = [
  {
    slug: "shopify-comfort",
    name: "Shopify Comfort Kit",
    audience: "For comfort-focused DTC underwear stores",
    description: "A neutral, polished starter kit for founders building a comfort-first Shopify brand.",
    image: `${imageBase}/kit-shopify-comfort.png`,
    includes: ["Comfort basics", "Fabric direction", "Packaging examples", "Launch recommendations"]
  },
  {
    slug: "tiktok-launch",
    name: "TikTok Launch Kit",
    audience: "For creator-led and social-first brands",
    description: "A faster-moving kit built for content testing, social hooks, and trend-led product validation.",
    image: `${imageBase}/kit-tiktok-launch.png`,
    includes: ["Trend-focused products", "Content-friendly styling", "Social packaging direction", "Validation strategy"]
  },
  {
    slug: "minimal-essentials",
    name: "Minimal Essentials Kit",
    audience: "For minimalist lifestyle underwear brands",
    description: "A clean launch kit for founders who want modern basics, restrained packaging, and focused SKU planning.",
    image: `${imageBase}/kit-minimal-essentials.png`,
    includes: ["Neutral color systems", "Minimal packaging", "Fabric direction", "Focused SKU planning"]
  },
  {
    slug: "boutique-retail",
    name: "Boutique Retail Kit",
    audience: "For boutiques and retail testing",
    description: "A shelf-ready kit for stores that need product, packaging, inserts, and presentation guidance.",
    image: `${imageBase}/kit-boutique-retail.png`,
    includes: ["Retail-ready samples", "Shelf presentation", "Hang tag direction", "Reorder planning"]
  }
];

export const validationSteps: WorkflowStep[] = [
  {
    title: "Choose Brand Direction",
    body: "Define audience, price tier, sales channel, style, and first product direction before spending heavily."
  },
  {
    title: "Get Starter Kit",
    body: "Receive a structured product and packaging kit that helps you see how the brand could launch."
  },
  {
    title: "Test With Ready Stock",
    body: "Use small, practical product batches to test demand before committing to large custom production."
  },
  {
    title: "Scale Into Custom Production",
    body: "Move into private label, packaging, colors, and reorder planning after real market signal."
  }
];

export const founderProblems: WorkflowStep[] = [
  {
    title: "Too Much Inventory",
    body: "Founders often buy bulk quantities before knowing whether customers want the product."
  },
  {
    title: "Wrong Product Direction",
    body: "A product can be technically good and still fail if the audience, price, or channel is wrong."
  },
  {
    title: "No Validation System",
    body: "Traditional samples do not answer packaging, positioning, content, and launch questions."
  }
];

export const academyCards: AcademyCard[] = [
  {
    title: "How to Start an Underwear Brand Without Large Inventory",
    category: "Launch Strategy",
    excerpt: "A practical path for testing product demand before committing to bulk production.",
    image: `${imageBase}/academy-low-inventory.png`
  },
  {
    title: "Starter Kits vs Traditional Samples",
    category: "Validation System",
    excerpt: "Why structured kits answer more founder questions than loose samples.",
    image: `${imageBase}/academy-starter-kit-vs-samples.png`
  },
  {
    title: "How Many SKUs Should a Startup Brand Launch With?",
    category: "SKU Planning",
    excerpt: "Why a narrow launch often beats a large unfocused product catalog.",
    image: `${imageBase}/academy-sku-planning.png`
  },
  {
    title: "How TikTok Brands Can Validate Underwear Products",
    category: "TikTok Validation",
    excerpt: "Content-first testing ideas for creator-led underwear brands.",
    image: `${imageBase}/academy-tiktok-validation.png`
  }
];

export const proofModules: ProofModule[] = [
  {
    title: "Ready Stock",
    body: "Small brands can test faster when the first launch does not depend on a large custom run.",
    image: `${imageBase}/proof-ready-stock.png`
  },
  {
    title: "QC and Inspection",
    body: "Product consistency matters even when the launch starts small.",
    image: `${imageBase}/proof-qc-inspection.png`
  },
  {
    title: "Packaging and Inserts",
    body: "Starter Kits should help founders picture the brand experience, not only the product.",
    image: `${imageBase}/proof-packaging-inserts.png`
  },
  {
    title: "Global Shipping",
    body: "Launch planning includes packing, shipping preparation, and export coordination.",
    image: `${imageBase}/proof-global-shipping.png`
  },
  {
    title: "Reorder Path",
    body: "After validation, Diyasi helps founders move into repeat supply and gradual scaling.",
    image: `${imageBase}/proof-reorder-path.png`
  }
];

export const comparisonRows: ComparisonRow[] = [
  { factory: "MOQ-first", founderSystem: "Validation-first" },
  { factory: "Bulk inventory", founderSystem: "Gradual scaling" },
  { factory: "Samples only", founderSystem: "Structured Starter Kits" },
  { factory: "Production-focused", founderSystem: "Founder-focused" },
  { factory: "Custom production before signal", founderSystem: "Ready-stock testing before custom production" }
];

export const contactOptions = {
  brandStages: ["Idea stage", "Testing products", "Already selling", "Ready to reorder"],
  channels: ["Shopify", "TikTok Shop", "Instagram", "Boutique retail", "Marketplace", "Other"],
  styles: ["Comfort basics", "Sexy launch", "Minimal essentials", "Active lifestyle", "Boutique retail", "Not sure yet"],
  budgets: ["Under $1,000", "$1,000-$3,000", "$3,000-$8,000", "$8,000+"],
  timelines: ["This month", "1-3 months", "3-6 months", "Exploring"]
};

export const platformImages = {
  homeHero: `${imageBase}/home-hero-founder-kit.png`,
  homeStarterKit: `${imageBase}/home-starter-kit-preview.png`,
  homeProofStrip: `${imageBase}/home-fulfillment-proof-strip.png`,
  starterKitsHero: `${imageBase}/starter-kits-comparison-hero.png`,
  validationWorkflow: `${imageBase}/validation-workflow-visual.png`,
  readyStockTesting: `${imageBase}/ready-stock-testing.png`,
  gradualScale: `${imageBase}/gradual-scale-custom-production.png`,
  brandQuizHero: `${imageBase}/brand-quiz-hero.png`,
  brandMoodboard: `${imageBase}/brand-direction-moodboard.png`,
  recommendationOutput: `${imageBase}/starter-kit-recommendation-output.png`,
  academyHero: `${imageBase}/academy-hero-founder-desk.png`,
  comparisonHero: `${imageBase}/comparison-hero.png`,
  moqRisk: `${imageBase}/moq-first-risk.png`,
  validationPath: `${imageBase}/validation-first-path.png`,
  contactHero: `${imageBase}/contact-recommendation-hero.png`,
  contactBrief: `${imageBase}/contact-project-brief.png`
};
```

- [ ] **Step 2: Verify TypeScript imports compile**

Run:

```powershell
cmd /c npm.cmd run build
```

Expected:

- Build may still fail if unrelated pre-existing edits are broken.
- There must be no error pointing to `apps/web/lib/founder-platform.ts`.

- [ ] **Step 3: Commit**

Run:

```powershell
git add apps\web\lib\founder-platform.ts
git commit -m "feat: add founder platform content model"
```

Expected:

- Commit contains only `apps/web/lib/founder-platform.ts`.

## Task 4: Add Shared Platform Components and CSS

**Files:**
- Create: `apps/web/components/founder-platform/PlatformSections.tsx`
- Create: `apps/web/app/founder-platform.css`
- Modify: `apps/web/app/layout.tsx`

- [ ] **Step 1: Create shared components**

Create `apps/web/components/founder-platform/PlatformSections.tsx`:

```tsx
import Link from "next/link";
import type { AcademyCard, ComparisonRow, ProofModule, StarterKit, WorkflowStep } from "@/lib/founder-platform";

type Cta = {
  href: string;
  label: string;
  tone?: "dark" | "light";
};

export function PlatformHero({
  label,
  title,
  body,
  image,
  imageAlt,
  ctas = [],
  reverse = false
}: {
  label?: string;
  title: string;
  body: string;
  image?: string;
  imageAlt?: string;
  ctas?: Cta[];
  reverse?: boolean;
}) {
  return (
    <section className={`platform-hero ${reverse ? "platform-hero-reverse" : ""}`}>
      <div className="platform-hero-copy">
        {label ? <p className="platform-label">{label}</p> : null}
        <h1>{title}</h1>
        <p>{body}</p>
        {ctas.length ? (
          <div className="platform-actions">
            {ctas.map((cta) => (
              <Link key={cta.href} href={cta.href} className={`platform-btn platform-btn-${cta.tone || "dark"}`}>
                {cta.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
      {image ? (
        <div className="platform-hero-media">
          <img src={image} alt={imageAlt || title} />
        </div>
      ) : null}
    </section>
  );
}

export function SectionHeader({ label, title, body }: { label?: string; title: string; body?: string }) {
  return (
    <div className="platform-section-head">
      {label ? <p className="platform-label">{label}</p> : null}
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </div>
  );
}

export function WorkflowGrid({ items }: { items: WorkflowStep[] }) {
  return (
    <div className="platform-grid platform-grid-4">
      {items.map((item, index) => (
        <article key={item.title} className="platform-card">
          <span className="platform-index">{String(index + 1).padStart(2, "0")}</span>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </article>
      ))}
    </div>
  );
}

export function StarterKitGrid({ kits }: { kits: StarterKit[] }) {
  return (
    <div className="platform-grid platform-grid-4">
      {kits.map((kit) => (
        <article key={kit.slug} className="platform-card platform-image-card">
          <img src={kit.image} alt={`${kit.name} starter kit`} />
          <div>
            <p className="platform-card-label">{kit.audience}</p>
            <h3>{kit.name}</h3>
            <p>{kit.description}</p>
            <ul>
              {kit.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}

export function AcademyGrid({ cards }: { cards: AcademyCard[] }) {
  return (
    <div className="platform-grid platform-grid-4">
      {cards.map((card) => (
        <article key={card.title} className="platform-card platform-image-card">
          <img src={card.image} alt={card.title} />
          <div>
            <p className="platform-card-label">{card.category}</p>
            <h3>{card.title}</h3>
            <p>{card.excerpt}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ProofGrid({ items }: { items: ProofModule[] }) {
  return (
    <div className="platform-grid platform-grid-proof">
      {items.map((item) => (
        <article key={item.title} className="platform-card platform-image-card">
          <img src={item.image} alt={item.title} />
          <div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ComparisonTable({ rows }: { rows: ComparisonRow[] }) {
  return (
    <div className="platform-table-wrap">
      <table className="platform-table">
        <thead>
          <tr>
            <th>Traditional Factory</th>
            <th>Diyasi Founder System</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.factory}>
              <td>{row.factory}</td>
              <td>{row.founderSystem}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ImageTextBand({
  label,
  title,
  body,
  image,
  imageAlt,
  reverse = false
}: {
  label?: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
}) {
  return (
    <section className={`platform-band ${reverse ? "platform-band-reverse" : ""}`}>
      <div>
        {label ? <p className="platform-label">{label}</p> : null}
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <img src={image} alt={imageAlt} />
    </section>
  );
}

export function CtaBand({
  title,
  body,
  primaryHref = "/contact",
  primaryLabel = "Get Starter Kit Recommendation",
  secondaryHref,
  secondaryLabel
}: {
  title: string;
  body: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="platform-cta">
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <div className="platform-actions">
        <Link href={primaryHref} className="platform-btn platform-btn-light">
          {primaryLabel}
        </Link>
        {secondaryHref && secondaryLabel ? (
          <Link href={secondaryHref} className="platform-btn platform-btn-outline">
            {secondaryLabel}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add platform CSS**

Create `apps/web/app/founder-platform.css` with classes used by `PlatformSections.tsx`:

```css
.platform-page {
  background: #f6f6f4;
  color: #101010;
}

.platform-page *,
.platform-page *::before,
.platform-page *::after {
  box-sizing: border-box;
}

.platform-shell,
.platform-hero,
.platform-section,
.platform-band,
.platform-cta {
  width: min(calc(100% - 40px), 1320px);
  margin: 0 auto;
}

.platform-hero {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(420px, 1.05fr);
  gap: clamp(2rem, 5vw, 5.5rem);
  align-items: center;
  min-height: 680px;
  padding: clamp(4rem, 8vw, 7rem) 0;
}

.platform-hero-reverse {
  grid-template-columns: minmax(420px, 1.05fr) minmax(0, 0.95fr);
}

.platform-hero-reverse .platform-hero-copy {
  order: 2;
}

.platform-hero h1,
.platform-section h2,
.platform-band h2,
.platform-cta h2 {
  margin: 0;
  font-family: var(--font-body), Arial, sans-serif;
  font-weight: 800;
  letter-spacing: 0;
  color: #101010;
  text-wrap: balance;
}

.platform-hero h1 {
  font-size: clamp(3.2rem, 6vw, 6.6rem);
  line-height: 0.95;
}

.platform-section h2,
.platform-band h2,
.platform-cta h2 {
  font-size: clamp(2.1rem, 4vw, 4rem);
  line-height: 1;
}

.platform-hero p,
.platform-section p,
.platform-band p,
.platform-cta p,
.platform-card p,
.platform-card li,
.platform-table th,
.platform-table td {
  font-family: var(--font-body), Arial, sans-serif;
  letter-spacing: 0;
}

.platform-hero-copy > p:not(.platform-label),
.platform-section-head > p:not(.platform-label),
.platform-band > div > p,
.platform-cta p {
  max-width: 720px;
  margin: 1.2rem 0 0;
  color: #555;
  font-size: 1.08rem;
  line-height: 1.75;
}

.platform-label,
.platform-card-label {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #777;
}

.platform-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 2rem;
}

.platform-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  border: 1px solid transparent;
  border-radius: 999px;
  padding: 0.85rem 1.25rem;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
}

.platform-btn:hover {
  transform: translateY(-2px);
}

.platform-btn-dark {
  background: #101010;
  color: #fff;
}

.platform-btn-light {
  background: #fff;
  color: #101010;
}

.platform-btn-outline {
  border-color: rgba(255, 255, 255, 0.36);
  color: #fff;
}

.platform-hero-media,
.platform-card,
.platform-band img {
  border: 1px solid rgba(16, 16, 16, 0.1);
  border-radius: 24px;
  background: #fff;
  overflow: hidden;
  box-shadow: 0 24px 70px rgba(16, 16, 16, 0.08);
}

.platform-hero-media img,
.platform-image-card img,
.platform-band img {
  display: block;
  width: 100%;
  object-fit: cover;
}

.platform-hero-media img {
  aspect-ratio: 4 / 3;
}

.platform-section {
  padding: clamp(3.5rem, 7vw, 6.5rem) 0;
}

.platform-section-head {
  max-width: 820px;
  margin-bottom: 2.25rem;
}

.platform-grid {
  display: grid;
  gap: 1rem;
}

.platform-grid-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.platform-grid-proof {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.platform-card {
  min-height: 100%;
  padding: 1.15rem;
}

.platform-card h3 {
  margin: 1rem 0 0;
  font-size: 1.08rem;
  line-height: 1.25;
  color: #101010;
}

.platform-card p {
  margin: 0.8rem 0 0;
  color: #5b5b5b;
  font-size: 0.94rem;
  line-height: 1.65;
}

.platform-card ul {
  display: grid;
  gap: 0.55rem;
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
}

.platform-card li {
  border-top: 1px solid rgba(16, 16, 16, 0.08);
  padding-top: 0.55rem;
  color: #444;
  font-size: 0.88rem;
}

.platform-index {
  display: block;
  font-size: 2.8rem;
  font-weight: 800;
  line-height: 1;
  color: #d7d7d2;
}

.platform-image-card {
  padding: 0;
}

.platform-image-card img {
  aspect-ratio: 1 / 1;
}

.platform-image-card > div {
  padding: 1.15rem;
}

.platform-band {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(420px, 1fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
  padding: clamp(3.5rem, 7vw, 6.5rem) 0;
}

.platform-band-reverse {
  grid-template-columns: minmax(420px, 1fr) minmax(0, 0.85fr);
}

.platform-band-reverse > div {
  order: 2;
}

.platform-band img {
  aspect-ratio: 4 / 3;
}

.platform-table-wrap {
  overflow-x: auto;
  border: 1px solid rgba(16, 16, 16, 0.12);
  border-radius: 24px;
  background: #fff;
}

.platform-table {
  width: 100%;
  border-collapse: collapse;
}

.platform-table th,
.platform-table td {
  padding: 1.1rem;
  border-bottom: 1px solid rgba(16, 16, 16, 0.08);
  text-align: left;
}

.platform-table th {
  color: #101010;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.platform-table td {
  color: #444;
  font-size: 1rem;
}

.platform-cta {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 2rem;
  align-items: end;
  margin-bottom: 4rem;
  border-radius: 28px;
  background: #101010;
  padding: clamp(2rem, 5vw, 4rem);
  color: #fff;
}

.platform-cta h2,
.platform-cta p {
  color: #fff;
}

@media (max-width: 1100px) {
  .platform-hero,
  .platform-hero-reverse,
  .platform-band,
  .platform-band-reverse,
  .platform-cta {
    grid-template-columns: 1fr;
  }

  .platform-hero-reverse .platform-hero-copy,
  .platform-band-reverse > div {
    order: initial;
  }

  .platform-grid-4,
  .platform-grid-proof {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .platform-shell,
  .platform-hero,
  .platform-section,
  .platform-band,
  .platform-cta {
    width: calc(100% - 28px);
  }

  .platform-hero {
    min-height: 0;
    padding: 2.5rem 0 3.5rem;
  }

  .platform-hero h1 {
    font-size: clamp(2.6rem, 13vw, 4rem);
  }

  .platform-grid-4,
  .platform-grid-proof {
    grid-template-columns: 1fr;
  }

  .platform-actions,
  .platform-btn {
    width: 100%;
  }
}
```

- [ ] **Step 3: Import platform CSS**

Modify `apps/web/app/layout.tsx` by adding the import after `globals.css`:

```ts
import "./globals.css";
import "./founder-platform.css";
```

- [ ] **Step 4: Build-check CSS/component imports**

Run:

```powershell
cmd /c npm.cmd run build
```

Expected:

- No errors for `PlatformSections.tsx`.
- No missing CSS import error.

- [ ] **Step 5: Commit**

Run:

```powershell
git add apps\web\components\founder-platform\PlatformSections.tsx apps\web\app\founder-platform.css apps\web\app\layout.tsx
git commit -m "feat: add founder platform UI system"
```

Expected:

- Commit includes only the component, CSS, and layout import change unless `layout.tsx` also includes metadata edits from Task 5.

## Task 5: Update Site Metadata, Navigation, and Footer

**Files:**
- Modify: `apps/web/lib/seo.ts`
- Modify: `apps/web/app/layout.tsx`
- Modify: `apps/web/components/TopNav.tsx`
- Modify: `apps/web/components/SiteFooter.tsx`

- [ ] **Step 1: Update SEO constants**

Modify `apps/web/lib/seo.ts`:

```ts
export const SITE_NAME = "Diyasi Founder Launch System";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.yiwudiyasidress.com";
export const SITE_DESCRIPTION =
  "Diyasi helps startup founders, creators, boutiques, and DTC stores validate and launch underwear brands through Starter Kits, ready-stock testing, packaging direction, and gradual scaling.";
```

Keep `absoluteUrl`, `buildMetadata`, and `buildBreadcrumbJsonLd` unchanged.

- [ ] **Step 2: Update root metadata in layout**

In `apps/web/app/layout.tsx`, replace metadata keywords with:

```ts
keywords: [
  "start underwear brand",
  "underwear starter kit",
  "private label underwear starter kit",
  "launch underwear brand",
  "DTC underwear brand",
  "low MOQ underwear launch",
  "ready stock underwear testing"
],
```

Replace `organizationJsonLd.description` with `SITE_DESCRIPTION`.

Replace the `clothingStoreJsonLd.description` value with:

```ts
"Diyasi supports startup underwear founders with Starter Kits, ready-stock validation, packaging direction, fulfillment proof, and gradual scaling into private-label production."
```

Replace `clothingStoreJsonLd.knowsAbout` with:

```ts
[
  "Underwear Brand Starter Kits",
  "DTC Brand Launch",
  "Ready Stock Product Testing",
  "Private Label Underwear",
  "Founder Validation Systems"
]
```

- [ ] **Step 3: Replace top navigation labels**

In `apps/web/components/TopNav.tsx`, import `platformNav`:

```ts
import { platformNav } from "@/lib/founder-platform";
```

Set English labels:

```ts
companyTag: "Founder launch system for startup underwear brands",
cta: "Get Starter Kit Recommendation"
```

Use `platformNav` for the primary links:

```ts
const primaryLinks: LinkItem[] = platformNav;
```

Remove old secondary links from the visible desktop meta nav. Keep language selector. Keep mobile language selector. Do not show `/payments` or `/admin` in the main header.

Set brand text to:

```tsx
DIYASI
```

- [ ] **Step 4: Replace footer route groups**

In `apps/web/components/SiteFooter.tsx`, change English footer copy:

```ts
brandDesc:
  "Diyasi helps startup founders, creators, boutiques, and DTC stores launch underwear brands with Starter Kits, ready-stock testing, packaging direction, and fulfillment support.",
ctaTitle: "Get a Starter Kit recommendation before you invest in bulk inventory",
ctaDesc:
  "Share your audience, channel, style direction, budget, and launch timeline. Diyasi will recommend a practical Starter Kit and validation path.",
ctaPrimary: "Get Starter Kit Recommendation",
ctaSecondary: "View Starter Kits",
quickItems: [
  { href: "/", label: "Home" },
  { href: "/starter-kits", label: "Starter Kits" },
  { href: "/validation-system", label: "Validation System" },
  { href: "/brand-quiz", label: "Brand Quiz" }
],
productTitle: "Platform",
productItems: [
  { href: "/founder-academy", label: "Founder Academy" },
  { href: "/fulfillment-proof", label: "Fulfillment Proof" },
  { href: "/comparison-hub", label: "Comparison Hub" },
  { href: "/contact", label: "Contact" }
],
supportTitle: "Support",
supportItems: [
  { href: "/payments", label: "Payments" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/return-policy", label: "Return Policy" }
]
```

Update footer CTA secondary link target from `/products` to `/starter-kits`.

Keep contact rows unchanged unless email/phone values are already inconsistent in the file.

- [ ] **Step 5: Build-check navigation and footer**

Run:

```powershell
cmd /c npm.cmd run build
```

Expected:

- No TypeScript errors in `TopNav.tsx`, `SiteFooter.tsx`, `layout.tsx`, or `seo.ts`.

- [ ] **Step 6: Commit**

Run:

```powershell
git add apps\web\lib\seo.ts apps\web\app\layout.tsx apps\web\components\TopNav.tsx apps\web\components\SiteFooter.tsx
git commit -m "feat: align shell with founder launch positioning"
```

Expected:

- Commit includes only shell/metadata changes.

## Task 6: Rebuild Homepage

**Files:**
- Modify: `apps/web/app/page.tsx`

- [ ] **Step 1: Replace homepage content**

Use `PlatformHero`, `SectionHeader`, `WorkflowGrid`, `StarterKitGrid`, `AcademyGrid`, `ComparisonTable`, `ImageTextBand`, and `CtaBand`.

Required imports:

```tsx
import type { Metadata } from "next";
import {
  AcademyGrid,
  ComparisonTable,
  CtaBand,
  ImageTextBand,
  PlatformHero,
  SectionHeader,
  StarterKitGrid,
  WorkflowGrid
} from "@/components/founder-platform/PlatformSections";
import {
  academyCards,
  comparisonRows,
  founderProblems,
  platformImages,
  starterKits,
  validationSteps
} from "@/lib/founder-platform";
import { buildMetadata } from "@/lib/seo";
```

Set metadata:

```tsx
export const metadata: Metadata = buildMetadata({
  title: "Launch Your Own Underwear Brand",
  description:
    "Diyasi helps startup founders validate and launch underwear brands with Starter Kits, ready-stock testing, packaging direction, and gradual scaling.",
  path: "/"
});
```

Render these sections in order:

```tsx
export default function HomePage() {
  return (
    <main className="platform-page">
      <PlatformHero
        label="Built for startup founders"
        title="Launch Your Own Underwear Brand"
        body="A low-risk founder platform helping startup brands validate products, test market demand, and scale gradually before investing heavily."
        image={platformImages.homeHero}
        imageAlt="Founder desk with underwear brand starter kit materials"
        ctas={[
          { href: "/starter-kits", label: "Start With A Starter Kit" },
          { href: "/brand-quiz", label: "Take AI Brand Quiz", tone: "light" }
        ]}
      />

      <section className="platform-section">
        <SectionHeader
          label="Founder Validation System"
          title="A practical path from brand idea to first reorder"
          body="Diyasi turns the risky first launch into a sequence of smaller decisions founders can test."
        />
        <WorkflowGrid items={validationSteps} />
      </section>

      <section className="platform-section">
        <SectionHeader
          label="Founder Problems"
          title="Why most startup brands fail"
          body="Most founders do not fail because factories cannot make products. They fail because they invest too much before validation."
        />
        <WorkflowGrid items={founderProblems} />
      </section>

      <section className="platform-section">
        <SectionHeader
          label="Starter Kits"
          title="Validate before you scale"
          body="Structured launch kits help founders preview product, packaging, and positioning before bulk inventory."
        />
        <StarterKitGrid kits={starterKits} />
      </section>

      <ImageTextBand
        label="Validation-first process"
        title="Test with ready stock before custom production"
        body="Start with a focused kit, test customer response, and move into private label only after the product direction is clearer."
        image={platformImages.homeStarterKit}
        imageAlt="Starter kit unboxing for underwear brand launch"
      />

      <section className="platform-section">
        <SectionHeader
          label="Comparison Hub"
          title="Traditional factory vs founder launch system"
          body="Diyasi is designed for founders who need validation, not only production capacity."
        />
        <ComparisonTable rows={comparisonRows.slice(0, 4)} />
      </section>

      <ImageTextBand
        label="Fulfillment proof"
        title="The platform is backed by product, packing, QC, and reorder support"
        body="Founder-friendly does not mean fragile. Behind each Starter Kit is a practical fulfillment path for repeat supply."
        image={platformImages.homeProofStrip}
        imageAlt="Ready stock, QC, packing, and shipping proof strip"
        reverse
      />

      <section className="platform-section">
        <SectionHeader
          label="Founder Academy"
          title="Learn before you launch"
          body="Education content helps founders avoid inventory mistakes, unfocused SKUs, and weak validation."
        />
        <AcademyGrid cards={academyCards} />
      </section>

      <CtaBand
        title="Ready to build your brand?"
        body="Start small, validate first, and scale gradually through a low-risk founder system."
        secondaryHref="/starter-kits"
        secondaryLabel="View Starter Kits"
      />
    </main>
  );
}
```

- [ ] **Step 2: Build-check homepage**

Run:

```powershell
cmd /c npm.cmd run build
```

Expected:

- Homepage compiles.
- No missing imports from `founder-platform`.

- [ ] **Step 3: Commit**

Run:

```powershell
git add apps\web\app\page.tsx
git commit -m "feat: rebuild homepage for founder platform"
```

## Task 7: Add New Platform Route Pages

**Files:**
- Create: `apps/web/app/starter-kits/page.tsx`
- Create: `apps/web/app/validation-system/page.tsx`
- Create: `apps/web/app/brand-quiz/page.tsx`
- Create: `apps/web/app/founder-academy/page.tsx`
- Create: `apps/web/app/fulfillment-proof/page.tsx`
- Create: `apps/web/app/comparison-hub/page.tsx`

- [ ] **Step 1: Create Starter Kits page**

Create `apps/web/app/starter-kits/page.tsx`:

```tsx
import type { Metadata } from "next";
import {
  CtaBand,
  ImageTextBand,
  PlatformHero,
  SectionHeader,
  StarterKitGrid,
  WorkflowGrid
} from "@/components/founder-platform/PlatformSections";
import { platformImages, starterKits } from "@/lib/founder-platform";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Underwear Brand Starter Kits",
  description:
    "Explore Diyasi Starter Kits for Shopify, TikTok, minimalist, and boutique underwear brand launches.",
  path: "/starter-kits"
});

const chooser = [
  { title: "Shopify founders", body: "Choose Shopify Comfort Kit when your brand promise is comfort, repeat basics, and polished ecommerce presentation." },
  { title: "Creator-led sellers", body: "Choose TikTok Launch Kit when content hooks and fast market feedback matter most." },
  { title: "Minimal brands", body: "Choose Minimal Essentials Kit when the first collection should stay narrow, clean, and premium." },
  { title: "Boutiques", body: "Choose Boutique Retail Kit when shelf presentation and reorder planning are part of the launch." }
];

export default function StarterKitsPage() {
  return (
    <main className="platform-page">
      <PlatformHero
        label="Starter Kits"
        title="Validate Before You Scale"
        body="Not just samples. Diyasi Starter Kits are structured launch packages designed to help founders preview products, packaging, content direction, and market fit before large inventory."
        image={platformImages.starterKitsHero}
        imageAlt="Four underwear brand starter kits on a studio table"
        ctas={[{ href: "/contact", label: "Get Starter Kit Recommendation" }]}
      />
      <section className="platform-section">
        <SectionHeader label="Kit Options" title="Choose a launch kit around your channel and brand direction" />
        <StarterKitGrid kits={starterKits} />
      </section>
      <section className="platform-section">
        <SectionHeader label="Decision Guide" title="Which kit fits your launch?" body="Start with the channel and customer you understand best. The kit should support validation, not lock you into bulk inventory." />
        <WorkflowGrid items={chooser} />
      </section>
      <ImageTextBand
        label="What each kit includes"
        title="Products, packaging, content prompts, and launch recommendations"
        body="Each kit is built to help founders see a practical first collection and understand how it could be tested in the market."
        image={platformImages.homeStarterKit}
        imageAlt="Starter kit contents with packaging and product samples"
      />
      <CtaBand title="Need help choosing?" body="Share your audience, channel, style, budget, and timeline. Diyasi will recommend a practical starter path." />
    </main>
  );
}
```

- [ ] **Step 2: Create Validation System page**

Create `apps/web/app/validation-system/page.tsx` with:

```tsx
import type { Metadata } from "next";
import {
  CtaBand,
  ImageTextBand,
  PlatformHero,
  SectionHeader,
  WorkflowGrid
} from "@/components/founder-platform/PlatformSections";
import { founderProblems, platformImages, validationSteps } from "@/lib/founder-platform";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Validation System",
  description:
    "Test your underwear brand direction with Diyasi's validation-first system before custom production.",
  path: "/validation-system"
});

export default function ValidationSystemPage() {
  return (
    <main className="platform-page">
      <PlatformHero
        label="Validation System"
        title="Test Your Market Before Custom Production"
        body="Reduce startup risk by validating products, packaging, and positioning before you invest in large custom inventory."
        image={platformImages.validationWorkflow}
        imageAlt="Underwear brand validation workflow scene"
        ctas={[{ href: "/brand-quiz", label: "Take AI Brand Quiz" }]}
      />
      <section className="platform-section">
        <SectionHeader label="The Risk" title="The first mistake is scaling before signal" />
        <WorkflowGrid items={founderProblems} />
      </section>
      <section className="platform-section">
        <SectionHeader label="The System" title="Four steps from idea to custom production" />
        <WorkflowGrid items={validationSteps} />
      </section>
      <ImageTextBand label="Ready-stock testing" title="Start with a testable product path" body="Ready stock lets founders test products and content without waiting for a full custom production cycle." image={platformImages.readyStockTesting} imageAlt="Ready stock testing scene" />
      <ImageTextBand label="Gradual scale" title="Move into private label after market signal" body="Once the direction works, Diyasi can support packaging, colors, labels, and reorder planning." image={platformImages.gradualScale} imageAlt="Gradual scale into custom production" reverse />
      <CtaBand title="Build the launch around validation" body="Use the brand quiz to turn your audience, channel, and style direction into a practical starter path." primaryHref="/brand-quiz" primaryLabel="Take AI Brand Quiz" />
    </main>
  );
}
```

- [ ] **Step 3: Create Brand Quiz page**

Create `apps/web/app/brand-quiz/page.tsx` as a server-rendered visual page with a non-submitting mock form that links to `/contact` for final submission:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, ImageTextBand, PlatformHero, SectionHeader } from "@/components/founder-platform/PlatformSections";
import { contactOptions, platformImages } from "@/lib/founder-platform";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Brand Quiz",
  description:
    "Use Diyasi's brand quiz to identify the right underwear Starter Kit for your audience, channel, style, budget, and timeline.",
  path: "/brand-quiz"
});

function OptionGroup({ title, options }: { title: string; options: string[] }) {
  return (
    <div className="platform-card">
      <p className="platform-card-label">{title}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((option) => (
          <span key={option} className="chip">{option}</span>
        ))}
      </div>
    </div>
  );
}

export default function BrandQuizPage() {
  return (
    <main className="platform-page">
      <PlatformHero
        label="Brand Quiz"
        title="Find the right starter kit for your brand"
        body="Answer a few launch questions so Diyasi can recommend a Starter Kit, product direction, packaging path, and first validation step."
        image={platformImages.brandQuizHero}
        imageAlt="Brand quiz desk with moodboard and starter kit materials"
        ctas={[{ href: "/contact", label: "Get My Recommendation" }]}
      />
      <section className="platform-section">
        <SectionHeader label="Quiz Inputs" title="The recommendation starts with five practical launch choices" />
        <div className="platform-grid platform-grid-4">
          <OptionGroup title="Brand Stage" options={contactOptions.brandStages} />
          <OptionGroup title="Sales Channel" options={contactOptions.channels} />
          <OptionGroup title="Product Style" options={contactOptions.styles} />
          <OptionGroup title="Budget Range" options={contactOptions.budgets} />
        </div>
      </section>
      <ImageTextBand label="Brand direction" title="Turn taste into a practical first collection" body="The quiz connects audience, channel, price tier, style, and timeline so the launch recommendation is grounded in real constraints." image={platformImages.brandMoodboard} imageAlt="Underwear brand direction moodboard" />
      <ImageTextBand label="Recommendation output" title="Receive a kit path, product direction, packaging direction, and first content angle" body="The final submission happens on the contact page, where your project details can be sent to the Diyasi team." image={platformImages.recommendationOutput} imageAlt="Starter kit recommendation output concept" reverse />
      <CtaBand title="Ready for the recommendation?" body="Send your launch details and get a practical starter path from the Diyasi team." primaryHref="/contact" primaryLabel="Get My Recommendation" />
    </main>
  );
}
```

- [ ] **Step 4: Create Founder Academy page**

Create `apps/web/app/founder-academy/page.tsx` using `academyCards` and `platformImages.academyHero`.

Required page sections:

```tsx
<PlatformHero label="Founder Academy" title="Learn Before You Launch" body="Educational systems for founders who want to avoid bulk-inventory mistakes and validate products before scaling." image={platformImages.academyHero} imageAlt="Founder learning desk for underwear brand launch" ctas={[{ href: "/starter-kits", label: "Start With A Starter Kit" }]} />
<section className="platform-section"> with <AcademyGrid cards={academyCards} />
<CtaBand title="Use education to make the launch smaller and sharper" body="Learn the basics, choose a kit, and validate before committing to custom production." primaryHref="/starter-kits" primaryLabel="View Starter Kits" />
```

Set metadata title `"Founder Academy"` and path `"/founder-academy"`.

- [ ] **Step 5: Create Fulfillment Proof page**

Create `apps/web/app/fulfillment-proof/page.tsx` using `ProofGrid`, `proofModules`, and `platformImages.homeProofStrip`.

Required page sections:

```tsx
<PlatformHero label="Fulfillment Proof" title="Behind every starter kit is a fulfillment system" body="Diyasi keeps production capability in the background and brings it forward only where founders need confidence: ready stock, QC, packaging, shipping, and reorder support." image={platformImages.homeProofStrip} imageAlt="Fulfillment proof collage" ctas={[{ href: "/contact", label: "Plan My Launch" }]} />
<section className="platform-section"> with <ProofGrid items={proofModules} />
<CtaBand title="Validate first, then use the fulfillment path behind it" body="Start with a kit and move toward repeat supply only after the launch direction is clearer." />
```

Set metadata title `"Fulfillment Proof"` and path `"/fulfillment-proof"`.

- [ ] **Step 6: Create Comparison Hub page**

Create `apps/web/app/comparison-hub/page.tsx` using `ComparisonTable`, `comparisonRows`, and comparison images.

Required page sections:

```tsx
<PlatformHero label="Comparison Hub" title="Traditional Factory vs Founder Launch System" body="Beginner founders need validation before volume. Diyasi is built around smaller tests, structured kits, and gradual scaling." image={platformImages.comparisonHero} imageAlt="Traditional factory approach versus founder launch system" ctas={[{ href: "/contact", label: "Get Starter Kit Recommendation" }]} />
<section className="platform-section"> with <ComparisonTable rows={comparisonRows} />
<ImageTextBand label="MOQ-first risk" title="Bulk inventory can turn uncertainty into dead stock" body="Large commitments make sense after signal, not before the founder understands product-market response." image={platformImages.moqRisk} imageAlt="MOQ-first inventory risk visual" />
<ImageTextBand label="Validation-first path" title="Small tests create clearer decisions" body="Starter Kits help founders learn which product, positioning, packaging, and channel deserve more investment." image={platformImages.validationPath} imageAlt="Validation-first launch path visual" reverse />
<CtaBand title="Choose the path built for first launches" body="Start with a recommendation instead of a bulk order." />
```

Set metadata title `"Traditional Factory vs Founder Launch System"` and path `"/comparison-hub"`.

- [ ] **Step 7: Build-check new routes**

Run:

```powershell
cmd /c npm.cmd run build
```

Expected:

- All six new routes compile.
- No missing image imports, because images are referenced as public paths.

- [ ] **Step 8: Commit**

Run:

```powershell
git add apps\web\app\starter-kits apps\web\app\validation-system apps\web\app\brand-quiz apps\web\app\founder-academy apps\web\app\fulfillment-proof apps\web\app\comparison-hub
git commit -m "feat: add founder platform routes"
```

## Task 8: Rebuild Contact Page as Starter Kit Recommendation Request

**Files:**
- Modify: `apps/web/app/contact/page.tsx`

- [ ] **Step 1: Replace form model**

Keep `"use client"` and existing `API_BASE` submission pattern. Replace form state with:

```ts
const [form, setForm] = useState({
  name: "",
  email: "",
  whatsapp: "",
  brandStage: "",
  channel: "",
  productDirection: "",
  budget: "",
  timeline: "",
  notes: "",
  website: ""
});
```

When submitting, map extra fields into the existing inquiry payload:

```ts
const message = [
  `WhatsApp: ${form.whatsapp || "Not provided"}`,
  `Brand stage: ${form.brandStage || "Not selected"}`,
  `Sales channel: ${form.channel || "Not selected"}`,
  `Product direction: ${form.productDirection || "Not selected"}`,
  `Budget range: ${form.budget || "Not selected"}`,
  `Launch timing: ${form.timeline || "Not selected"}`,
  "",
  form.notes
].join("\n");

body: JSON.stringify({
  name: form.name,
  email: form.email,
  company: form.channel || "Founder recommendation request",
  message,
  website: form.website
})
```

- [ ] **Step 2: Replace visible contact layout**

The page should use:

- `PlatformHero`
- `platformImages.contactHero`
- a form card with fields listed in the design spec
- `ImageTextBand` using `platformImages.contactBrief`
- a direct contact block with email, phone/WhatsApp, location

Required copy:

```text
Get Your Starter Kit Recommendation
Tell us your audience, channel, style direction, budget, and launch timeline. Diyasi will recommend a practical Starter Kit and validation path.
```

Required submit button:

```text
Send Recommendation Request
```

- [ ] **Step 3: Verify form labels**

Manually inspect the JSX and confirm every `input`, `select`, and `textarea` is inside a `label` or has an explicit accessible label.

- [ ] **Step 4: Build-check contact**

Run:

```powershell
cmd /c npm.cmd run build
```

Expected:

- Contact page compiles as a client component.
- No TypeScript errors in form state or submit payload.

- [ ] **Step 5: Commit**

Run:

```powershell
git add apps\web\app\contact\page.tsx
git commit -m "feat: turn contact into starter kit recommendation request"
```

## Task 9: Redirect Legacy Routes

**Files:**
- Modify: `apps/web/app/products/page.tsx`
- Modify: `apps/web/app/products/[productId]/page.tsx`
- Modify: `apps/web/app/oem-odm/page.tsx`
- Modify: `apps/web/app/factory/page.tsx`
- Modify: `apps/web/app/blog/page.tsx`

- [ ] **Step 1: Replace products index route**

Replace `apps/web/app/products/page.tsx` with:

```tsx
import { redirect } from "next/navigation";

export default function ProductsRedirectPage() {
  redirect("/starter-kits");
}
```

- [ ] **Step 2: Replace product detail route**

Replace `apps/web/app/products/[productId]/page.tsx` with:

```tsx
import { redirect } from "next/navigation";

export default function ProductDetailRedirectPage() {
  redirect("/starter-kits");
}
```

- [ ] **Step 3: Replace OEM/ODM route**

Replace `apps/web/app/oem-odm/page.tsx` with:

```tsx
import { redirect } from "next/navigation";

export default function OemOdmRedirectPage() {
  redirect("/validation-system");
}
```

- [ ] **Step 4: Replace factory route**

Replace `apps/web/app/factory/page.tsx` with:

```tsx
import { redirect } from "next/navigation";

export default function FactoryRedirectPage() {
  redirect("/fulfillment-proof");
}
```

- [ ] **Step 5: Replace blog route**

Replace `apps/web/app/blog/page.tsx` with:

```tsx
import { redirect } from "next/navigation";

export default function BlogRedirectPage() {
  redirect("/founder-academy");
}
```

- [ ] **Step 6: Build-check redirects**

Run:

```powershell
cmd /c npm.cmd run build
```

Expected:

- Static build accepts redirect pages.
- Dynamic product detail route no longer imports old product data.

- [ ] **Step 7: Commit**

Run:

```powershell
git add apps\web\app\products\page.tsx apps\web\app\products\[productId]\page.tsx apps\web\app\oem-odm\page.tsx apps\web\app\factory\page.tsx apps\web\app\blog\page.tsx
git commit -m "feat: redirect legacy factory routes"
```

## Task 10: Update Sitemap

**Files:**
- Modify: `apps/web/app/sitemap.ts`

- [ ] **Step 1: Replace base paths**

In `apps/web/app/sitemap.ts`, replace:

```ts
const basePaths = ["", "/about", "/products", "/oem-odm", "/sustainability", "/factory", "/blog", "/contact", "/payments"];
```

with:

```ts
const basePaths = [
  "",
  "/starter-kits",
  "/validation-system",
  "/brand-quiz",
  "/founder-academy",
  "/fulfillment-proof",
  "/comparison-hub",
  "/contact",
  "/payments"
];
```

- [ ] **Step 2: Remove product URLs from sitemap output**

Remove the `getCatalogProducts` import and product URL generation. Return only:

```ts
return [...staticUrls, ...blogUrls];
```

Then change `blogUrls` route prefix from `/blog/${slug}` to `/founder-academy` only if article detail pages are not being preserved. For this pass, do not expose old blog detail URLs in sitemap; set:

```ts
const blogUrls: MetadataRoute.Sitemap = [];
```

Return:

```ts
return [...staticUrls, ...blogUrls];
```

- [ ] **Step 3: Build-check sitemap**

Run:

```powershell
cmd /c npm.cmd run build
```

Expected:

- No unused import errors in `sitemap.ts`.
- Sitemap compiles.

- [ ] **Step 4: Commit**

Run:

```powershell
git add apps\web\app\sitemap.ts
git commit -m "feat: update sitemap for founder platform routes"
```

## Task 11: Browser Verification and Visual QA

**Files:**
- Read/render only.

- [ ] **Step 1: Run lint**

Run:

```powershell
cmd /c npm.cmd run lint
```

Expected:

- If Next reports that `next lint` is not supported or requires setup, record that exact blocker.
- Otherwise, lint should pass.

- [ ] **Step 2: Run production build**

Run:

```powershell
cmd /c npm.cmd run build
```

Expected:

- Build completes successfully.

- [ ] **Step 3: Start local dev server**

Run:

```powershell
cmd /c npm.cmd run dev -- --host 127.0.0.1 --port 3000
```

Expected:

- Dev server starts at `http://127.0.0.1:3000`.
- If port 3000 is in use, use port 3001.

- [ ] **Step 4: Verify primary pages**

Open these URLs and confirm each renders with generated images and platform copy:

```text
http://127.0.0.1:3000/
http://127.0.0.1:3000/starter-kits
http://127.0.0.1:3000/validation-system
http://127.0.0.1:3000/brand-quiz
http://127.0.0.1:3000/founder-academy
http://127.0.0.1:3000/fulfillment-proof
http://127.0.0.1:3000/comparison-hub
http://127.0.0.1:3000/contact
```

Expected:

- Header links work.
- Footer links work.
- Generated images load.
- Text does not overlap images.
- Mobile layout does not overflow.
- Buttons are readable.
- Contact form fields render with labels.

- [ ] **Step 5: Verify redirects**

Open:

```text
http://127.0.0.1:3000/products
http://127.0.0.1:3000/oem-odm
http://127.0.0.1:3000/factory
http://127.0.0.1:3000/blog
```

Expected:

- `/products` resolves to `/starter-kits`.
- `/oem-odm` resolves to `/validation-system`.
- `/factory` resolves to `/fulfillment-proof`.
- `/blog` resolves to `/founder-academy`.

- [ ] **Step 6: Capture visual QA notes**

Compare implementation against:

```text
docs/superpowers/specs/2026-05-25-diyasi-founder-platform-redesign-design.md
```

Check at least:

- Route map matches the approved design.
- Above-the-fold copy matches founder launch positioning.
- Old OEM/factory/product catalog framing is gone from the main user journey.
- All new image assets are generated and loaded from project paths.
- Navigation and footer no longer promote old factory routes.
- Contact page is a recommendation request, not a generic factory inquiry.

- [ ] **Step 7: Final commit if QA fixes were needed**

If visual QA requires small fixes, make them, run build again, then commit:

```powershell
git add apps\web
git commit -m "fix: polish founder platform redesign"
```

Expected:

- Final commit contains only QA fixes.

