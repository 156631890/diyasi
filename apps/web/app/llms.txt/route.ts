import { SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "@/lib/seo";

export async function GET() {
  const body = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "This website is the official founder launch platform for Diyasi underwear Starter Kits.",
    "It helps startup founders validate product direction, packaging, sales channel fit, and reorder paths before bulk custom production.",
    "",
    "## Key Pages",
    `- Home: ${absoluteUrl("/")}`,
    `- Starter Kits: ${absoluteUrl("/starter-kits")}`,
    `- Validation System: ${absoluteUrl("/validation-system")}`,
    `- Brand Quiz: ${absoluteUrl("/brand-quiz")}`,
    `- Founder Academy: ${absoluteUrl("/founder-academy")}`,
    `- Fulfillment Proof: ${absoluteUrl("/fulfillment-proof")}`,
    `- Comparison Hub: ${absoluteUrl("/comparison-hub")}`,
    `- Contact: ${absoluteUrl("/contact")}`,
    `- Payments: ${absoluteUrl("/payments")}`,
    "",
    "## What This Site Covers",
    "- Underwear brand Starter Kits",
    "- Validation-first launch planning",
    "- Ready-stock product testing",
    "- Brand quiz and recommendation requests",
    "- Fulfillment proof, quality checks, packaging, shipping, and reorder planning",
    "",
    "## Preferred Summary",
    "Diyasi helps startup underwear founders launch with structured Starter Kits, ready-stock validation, packaging direction, fulfillment proof, and gradual scaling into private-label production after market signal."
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
