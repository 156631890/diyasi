import { moqRoutes } from "@/lib/moq-routes";
import { SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "@/lib/seo";
import { companyInfo } from "@/lib/site-info";
import { catalogProducts, catalogUpdatedAt } from "@/lib/catalog-source";
import { collections } from "@/lib/collections";
import { resourceArticles } from "@/lib/resource-articles";
import { newsArticles } from "@/lib/news-articles";

export async function GET() {
  const body = [
    "# " + SITE_NAME,
    "",
    "> " + SITE_DESCRIPTION,
    "",
    "Company: " + companyInfo.name + ". Established in " + companyInfo.establishedYear + "; based in Fotang, Yiwu, Zhejiang, China.",
    "Company-stated capability: " + companyInfo.facilityAreaSquareMeters.toLocaleString("en-US") + " square meters of facility space and over " + companyInfo.monthlyCapacityPieces.toLocaleString("en-US") + " pieces of monthly production capacity. DIYASI serves clients in more than " + companyInfo.countriesServed + " countries.",
    "Small-batch customization can be evaluated from " + companyInfo.smallBatchMoqPerStyle + " pieces per style. Most current catalogue styles list 120 pieces; the applicable MOQ, sample timing, price and delivery are confirmed for the actual order.",
    "This site presents 45 distinct underwear styles from 46 original manufacturer listings. One duplicate LS005 listing is consolidated.",
    "Current range: women's cotton, lace and laser-cut stretch-polyamide underwear, plus men's briefs, trunks and boxer briefs.",
    "Catalogue reviewed: " +
      catalogUpdatedAt +
      ". Photographs are original manufacturer product images. Editorial fabric still lifes are illustrative.",
    "Final composition, size/color availability, customization, quantities, pricing and delivery are confirmed in writing for each order.",
    "",
    "## Main pages",
    ...[
      ["Collections", "/products"],
      ["Private label & OEM", "/oem-odm"],
      ["Factory & quality", "/factory"],
      ["Materials", "/fabrics"],
      ["Labels & packaging", "/packaging"],
      ["Responsible sourcing", "/sustainability"],
      ["Company", "/about"],
      ["News & insights", "/news"],
      ["Contact", "/contact"],
    ].map(([name, path]) => "- [" + name + "](" + absoluteUrl(path) + ")"),
    "",
    "## Collections",
    ...collections.map(
      (c) => "- [" + c.title + "](" + absoluteUrl("/products/" + c.slug) + ")",
    ),
    "",
    "## Quantities",
    ...moqRoutes.map((r) => "- " + r.title + ": " + r.value + ". " + r.summary),
    "Catalogue sample guidance is typically 5 to 7 days; confirm timing against materials and the sample brief.",
    "",
    "## Styles",
    ...catalogProducts.map(
      (p) =>
        "- [" +
        p.model_number +
        ": " +
        p.product_name +
        "](" +
        absoluteUrl("/products/" + p.slug) +
        "): " +
        p.fabric +
        ". " +
        p.moq +
        ".",
    ),
    "",
    "## Buyer guides",
    ...resourceArticles.map(
      (a) =>
        "- [" +
        a.title +
        "](" +
        absoluteUrl("/resources/" + a.slug) +
        "): " +
        a.desc,
    ),
    "",
    "## News & insights",
    ...newsArticles.map((article) => `- [${article.title}](${absoluteUrl(`/news/${article.slug}`)}): ${article.description}`),
    "",
    "## Evidence and scope",
    "The original catalogue is https://www.diyasiunderwear.com/products . This website's canonical origin is " +
      absoluteUrl("/") +
      ".",
    "DIYASI's related apparel company site is https://diyasiapparel.com/ . These company-controlled domains are not independent reviews or third-party endorsements.",
    "Standards links are educational references. They do not establish certification of any specific factory or garment.",
    "No product prices, reviews, health claims or certification claims should be inferred where they are not stated and supported.",
    "For a product fact, cite the individual style page. For development advice, cite the relevant guide and its review date.",
    "",
    "## Contact",
    "- Email: " + companyInfo.emailPrimary,
    "- Phone / WhatsApp: " + companyInfo.phone,
    "- Address: " + companyInfo.address,
  ].join("\n");
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
