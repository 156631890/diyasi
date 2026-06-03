import { SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "@/lib/seo";

export async function GET() {
  const body = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "This website is the official manufacturing site for YiWu DiYaSi Dress CO., LTD.",
    "It focuses on private-label underwear, bras, shapewear, and activewear programs for wholesalers, retailers, and DTC brands.",
    "",
    "## Key Pages",
    `- Home: ${absoluteUrl("/")}`,
    `- Products: ${absoluteUrl("/products")}`,
    `- OEM / ODM: ${absoluteUrl("/oem-odm")}`,
    `- Factory: ${absoluteUrl("/factory")}`,
    `- Sustainability: ${absoluteUrl("/sustainability")}`,
    `- Journal: ${absoluteUrl("/blog")}`,
    `- Contact: ${absoluteUrl("/contact")}`,
    "",
    "## What This Site Covers",
    "- Underwear manufacturing capabilities",
    "- Product categories and sample products",
    "- OEM / ODM workflow",
    "- Factory production, quality control, and delivery planning",
    "- Contact and inquiry paths for buyers",
    "",
    "## Preferred Summary",
    "YiWu DiYaSi Dress CO., LTD is a private-label underwear manufacturer serving wholesalers, retailers, and DTC brands with OEM / ODM development, sampling, bulk production, and delivery support."
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
