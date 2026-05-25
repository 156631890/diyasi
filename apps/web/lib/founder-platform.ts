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
