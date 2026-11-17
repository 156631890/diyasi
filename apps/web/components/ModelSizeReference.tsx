import Link from "next/link";
import { catalogProducts } from "@/lib/catalog-source";
import { productSourceEvidence } from "@/lib/product-source-evidence";
export default function ModelSizeReference(){
  return <section id="model-size-reference"><h2>Actual model references: DYS201 and DYS323</h2>
    <p>Both manufacturer charts list the wearer waist and hip ranges below. These are body references in centimetres, not finished-garment dimensions, tolerances or a universal US/EU conversion. Matching numbers do not prove that the two constructions fit identically.</p>
    <div className="d-table-scroll" tabIndex={0} role="region" aria-label="DYS201 and DYS323 body measurement references"><table>
      <thead><tr><th scope="col">Source size</th><th scope="col">Wearer waist (cm)</th><th scope="col">Wearer hip (cm)</th></tr></thead>
      <tbody>{productSourceEvidence.DYS201.sizeRows.map(r=><tr key={r.size}><th scope="row">{r.size}</th><td>{r.waistCm}</td><td>{r.secondaryCm}</td></tr>)}</tbody>
    </table></div>
    <p>Use these ranges to request the relevant sample size. On that sample, record finished waist, hip, front/back rise and leg opening using agreed measuring points. Agree the permitted variation separately before grading or printing retail labels.</p>
    {["DYS201","DYS323"].map(model=>{const p=catalogProducts.find(p=>p.model_number===model)!;return <p key={model}><Link href={"/products/"+p.slug}>{model}: original chart, garment photographs and source limitations ↗</Link></p>;})}
  </section>;
}
