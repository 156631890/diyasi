export type SourcingSelection = {
  heading: string;
  intro: string;
  models: Array<{ model: string; check: string }>;
  note: string;
};

// Selection notes use the reviewed catalogue, not assumed manufacturing capabilities.
export const sourcingSelections: Record<string, SourcingSelection> = {
  all: {
    heading: "Wholesale underwear: choose a sample for each product family",
    intro: "Compare wholesale underwear manufacturers using the same garment brief. These DIYASI references show how fabric, coverage and component checks differ across a first collection.",
    models: [
      { model: "DYS201", check: "Cotton-spandex bikini: review finished measurements, shrinkage and waist elastic." },
      { model: "LS006", check: "Cotton and lace Brazilian brief: approve the lace pattern and body/trim shades together." },
      { model: "DYS323", check: "Laser-cut Brazilian brief: inspect the bonded cotton gusset after the agreed wash and stretch review." },
      { model: "M005", check: "Men's boxer brief: confirm finished inseam, pouch components and waistband artwork." },
    ],
    note: "Most listed styles start at 120 pieces per style. Size/color allocations, available stock and custom-component minimums need written confirmation. This catalogue supports bulk and private-label enquiries; it is not a single-piece gift-printing service.",
  },
  "seamless-underwear": {
    heading: "Compare laser-cut seamless underwear by gusset and coverage",
    intro: "Laser cutting describes the edge, bonding describes a join, and knitted seamless describes a different construction route. The catalogue examples below are laser-cut styles; they do not establish a knitted-seamless production specification. Ask the team to review a separate brief if that is your requirement.",
    models: [
      { model: "DYS323", check: "Bonded cotton gusset; compare the Brazilian back and bond edge after washing and stretching." },
      { model: "DYS314", check: "Sewn cotton gusset; compare full back coverage, high rise and stitch bulk under the intended clothing." },
      { model: "DYS322", check: "Bonded cotton gusset; compare thong back width, low rise and gusset positioning in movement." },
    ],
    note: "No-show is a wearing outcome, not a fabric or a guarantee that every seam is absent. Keep the sample size, outer garment and viewing conditions consistent when comparing these models.",
  },
  "lace-underwear": {
    heading: "Private label lingerie: start with the listed lace underwear styles",
    intro: "For a private label lingerie collection, this range provides lace-trim briefs and thongs with cotton-rich bodies. It does not establish a matching bra or a shapewear set. Compare the actual coverage and lace placement before developing labels or packaging.",
    models: [
      { model: "LS006", check: "Brazilian back with lace trim: approve back coverage and scallop placement on the selected size." },
      { model: "LS005-142", check: "Low-rise V-waist brief: compare waist shape, back coverage and lace tension." },
      { model: "LS005", check: "Low-rise V-waist thong: review the narrow back, gusset placement and lace recovery." },
    ],
    note: "Body and lace are different components. Confirm their separate compositions, color matching, label artwork and packaging minimums on the approved sample and written quotation.",
  },
  "mens-underwear": {
    heading: "Compare men's underwear for a wholesale or private-label order",
    intro: "Choose the silhouette before deciding on a logo or printed fabric. These real catalogue references let your team compare rise and leg coverage while keeping the body and pouch specifications separate.",
    models: [
      { model: "M001", check: "Low-rise, no-fly brief: review pouch depth, front/back coverage and label placement." },
      { model: "M004", check: "Mid-rise, no-fly trunk: measure inseam and leg opening in the same intended size." },
      { model: "M005", check: "Mid-rise boxer brief: confirm actual inseam, waistband tension and branding feasibility." },
    ],
    note: "These models list polyester/spandex bodies and modal pouch components. Request exact component percentages before preparing the final fiber label; do not describe the whole garment as modal.",
  },
};
