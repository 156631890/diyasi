import source from "@/data/manufacturer-pages.json";
import { catalogProducts } from "./catalog-source";
import { resourceArticles } from "./resource-articles";
import { sampleAndLeadTimes } from "./site-info";

export type ManufacturerPage = {slug:string;keyword:string;title:string;h1:string;description:string;intro:string;models:string[];resources:string[];relatedManufacturers:string[];migratedFrom?:string;assessmentOnly?:boolean;focus:{title:string;text:string}[];specificFaq:string[]};
export const manufacturerPages: ManufacturerPage[] = source;
export const manufacturerPath = (slug: string) => `/manufacturers/${slug}`;
export const sourcingUpdatedAt = "2026-10-31";
export const resourceMigrations: Record<string, string> = {
  "private-label-underwear-manufacturer": "private-label-underwear-manufacturer",
  "mens-underwear-manufacturer-private-label": "mens-underwear-manufacturer",
  "120-pcs-moq-underwear-manufacturer": "low-moq-underwear-manufacturer",
};
export function manufacturerModels(page: ManufacturerPage) {
  return catalogProducts.filter(p => page.models.includes(p.model_number));
}
export function manufacturerFaq(page: ManufacturerPage): string[][] {
  return [page.specificFaq,
    ["How is the sample schedule confirmed?", page.assessmentOnly
      ? "This category needs a feasibility review before a schedule can be confirmed. The underwear catalogue's 5–7 day sample guidance is not a promise for this proposed development. Confirm sample charges, revisions and courier time separately."
      : "Catalogue sample guidance is 5–7 days after the team reviews the brief and material availability. Confirm the start point, charges, revision rounds and courier delivery separately. A new pattern or component can require a different plan."],
    ["Are published unit prices or automatic quantity discounts available?", "No verified unit-price ladder is published here. Request a written quotation identifying the style, composition, quantity, size and colour allocation, branding, packing and delivery terms. Ask for development, component and freight charges separately so offers can be compared on the same basis."],
    ["What payment and approval terms apply?", "Request the current payment terms in your written quotation; no universal deposit percentage is stated here. Approve the physical sample, final specification, artwork, packing instruction and agreed schedule before authorising production. Use the existing contact form to submit the project brief."],
  ];
}
export function manufacturerSpecifications(page: ManufacturerPage): string[][] {
  const models = manufacturerModels(page);
  return [
    ["Specification", "Published reference / confirmation needed"],
    ["Category", page.assessmentOnly ? "Development assessment only; manufacturing capability must be confirmed" : page.h1],
    ...models.map(p => [`${p.model_number}: composition`, p.fabric]),
    ...models.map(p => [`${p.model_number}: source size range`, p.size]),
    ["Fabric weight (gsm)", "No verified model-specific weight published; request a measured specification"],
    ["Colour and process", "Confirm model-specific availability, dye/print method and approved colour reference; do not infer a stock colour count"],
    ["Minimum quantity", page.assessmentOnly ? "Category-specific MOQ not established; written assessment required" : "Catalogue reference: 120 pieces per style; custom fabric and components reviewed separately"],
    ["Sampling", page.assessmentOnly ? "Category-specific schedule to be agreed after feasibility review" : "5–7 day catalogue guidance, subject to brief and material review; courier time separate"],
    ["Bulk production", page.assessmentOnly ? "Category-specific production schedule not published" : `${sampleAndLeadTimes.bulkLeadTime}; order-specific confirmation required`],
  ];
}
export const componentRows = [
  ["Component", "Available review route", "Approval boundary"],
  ["Waistband", "Custom artwork on a suitable selected style", "Method, stretch, placement and component MOQ must be confirmed"],
  ["Woven / care label", "Submit artwork and destination requirements", "No automatic certification, composition or legal claim"],
  ["Heat-transfer logo", "Review with the actual fabric and construction", "Do not assume every material accepts the same process"],
  ["Hangtag", "Approve text, dimensions and attachment", "Brand artwork rights and final information remain explicit"],
  ["Bag / box / stickers", "Review the requested packing format", "Printed components may have a separate minimum and charge"],
];
export const productionSteps = [
  {title:"1. Define the project and its boundaries", timing:"Timing confirmed after brief review", text:"Send the destination market, intended garment, model references and quantity by style. Separate confirmed requirements from questions that need the factory's response. Include the proposed size and colour allocation rather than only a total quantity. This gives the team a basis for identifying missing information, checking category feasibility and explaining which development or component decisions are still open. Keep the enquiry and its revisions together so a later quotation can be traced to the brief it actually answers."},
  {title:"2. Review materials and branded components", timing:"Availability and component schedule confirmed in the quotation", text:"Compare the proposed composition, construction, colours and trims with the source model or technical specification. Review artwork, label information and packaging as separate inputs. Ask the team to identify any material substitution, component minimum or development charge before treating the proposal as accepted. A digital proof can settle artwork details but does not prove the feel or behaviour of a finished garment. Record the agreed material references and request a physical sample appropriate to the project."},
  {title:"3. Request and assess the sample", timing:"Catalogue reference 5–7 days; not a promise for unconfirmed categories or new development", text:"Confirm when sampling begins and what the sample will represent. Review fit, finished measurements, construction, component composition and branding against the agreed brief. Note which details are final and which still need a revised sample or proof. Courier delivery and review rounds are separate from sample-making guidance. Use a dated comments record and retain the physical reference so the production decision is based on a specific version rather than a general impression from a photograph."},
  {title:"4. Approve the specification and commercial terms", timing:"Buyer and factory approval milestone; no fixed duration published", text:"Reconcile the garment quantity with the size-by-colour grid, then confirm unit pricing and all separately charged items in writing. Identify the approved sample, artwork files, labels, packing method and delivery terms. Ask how changes or unavailable components will be handled after approval. Do not allow a missing measurement, unclear material description or unresolved category question to become an assumed manufacturing instruction. Both sides should be able to identify exactly which version has been released for production."},
  {title:"5. Produce and inspect against the approved record", timing:"Underwear reference 20–35 days, subject to quantity and customization; other categories require confirmation", text:"Agree the production milestones and inspection scope for the actual order. Incoming material checks, inline checks and final inspection serve different purposes and should reference the same specification. If a defect, shade difference or packing issue is found, document the affected lot and the agreed action. A general process description is not proof that a particular batch passed. Request the records required by your purchasing procedure and keep them associated with the correct product and order version."},
  {title:"6. Confirm packing, dispatch and reorder information", timing:"Dispatch and transit quoted separately for the chosen route", text:"Check final quantities, labels, carton markings and packing documents before dispatch. Confirm the delivery arrangement and which party is responsible for each transport step. Retain the approved sample and the final specification after shipment because they are useful references for any question about the received goods. A reorder still needs current availability, price and schedule confirmation. Use feedback by style and size to prepare that request instead of assuming that every earlier commercial or material condition remains unchanged."},
];
export const manufacturingNotes = {
  quantities:"A quantity reference describes the garment order, not an all-inclusive service package. Keep the sample fee, development work, labels, custom elastic, packing and freight visible as separate quotation questions. No verified price ladder is available for this page, so it does not publish invented unit costs or volume discounts. Ask for like-for-like quotations using the same specification and destination assumptions. For an assessment-only category, even the garment minimum remains open until the team confirms feasibility.",
  custom:"DIYASI's existing private-label information lists waistband artwork, care labels, heat-transfer logos, hangtags and packaging as options for review. Each option must work with the selected construction and materials. Ask what can be retained from the source model and what changes require another sample or component purchase. The list is not a promise that every combination is available at the catalogue minimum. Approve placement, content and physical application; a brand file alone is not a complete manufacturing instruction.",
  quality:"The published factory process describes incoming-material, inline-production and final checks. Use the approved measurements, construction, labels and packing instruction to define what those checks need to cover for your order. An AQL guide explains how a buyer can prepare an inspection plan; it is not a factory certificate or a universal acceptance threshold. No current certificate number or product-specific test report is asserted here. Request the relevant document, its validity and its product or facility scope before using a certification or performance claim.",
};
export function migratedArticle(page: ManufacturerPage) {
  return page.migratedFrom ? resourceArticles.find(a => a.slug === page.migratedFrom) : undefined;
}
