"use client";
import { useState, type FormEvent } from "react";
import { calculateLandedCost, type LandedCostInput } from "@/lib/landed-cost";
import { downloadCsv, makeCsv } from "@/lib/buyer-export";

const fields: {key:keyof LandedCostInput; label:string; unit:string}[] = [
  {key:"purchased",label:"Purchased quantity",unit:"whole units"},
  {key:"sellable",label:"Expected sellable quantity",unit:"whole units, no more than purchased"},
  {key:"garment",label:"Garment price per purchased unit",unit:"currency / unit"},
  {key:"packaging",label:"Additional packaging per purchased unit",unit:"currency / unit; enter 0 if already included"},
  {key:"development",label:"One-time development and sample costs",unit:"total currency"},
  {key:"freight",label:"Freight, insurance and clearance",unit:"total currency; exclude items entered elsewhere"},
  {key:"importCosts",label:"Non-recoverable import duties and taxes",unit:"total currency; confirm with your adviser"}
];
type Calculation = {input:LandedCostInput;currency:string;result:ReturnType<typeof calculateLandedCost>};
export default function LandedCostCalculator() {
  const [calculation,setCalculation]=useState<Calculation|null>(null);
  const [error,setError]=useState("");
  function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    const data=new FormData(event.currentTarget);
    try {
      const input=Object.fromEntries(fields.map(({key})=>[key,String(data.get(key)??"").trim()===""?NaN:Number(data.get(key))])) as LandedCostInput;
      const currency=String(data.get("currency")??"").trim().toUpperCase();
      if(!/^[A-Z]{3}$/.test(currency))throw new Error("Enter a three-letter currency code and use that currency for every cost.");
      setCalculation({input,currency,result:calculateLandedCost(input)});setError("");
    } catch(cause){setCalculation(null);setError(cause instanceof Error?cause.message:"Check the entered values.");}
  }
  return <section className="d-procurement-tool" id="cost-calculator">
    <h2>Landed cost calculator</h2>
    <p>Use your own quotation. Enter all amounts in one currency and enter 0 for a cost that does not apply. Convert foreign-currency quotes before using this tool. Included costs must not be added twice. Values stay in this page and are not sent as an enquiry.</p>
    <form onSubmit={submit} onChange={()=>{setCalculation(null);setError("");}}>
      <div className="d-tool-fields">
        <label>Currency code <input name="currency" required pattern="[A-Za-z]{3}" maxLength={3} placeholder="e.g. USD" autoComplete="off"/></label>
        {fields.map(({key,label,unit})=><label key={key} htmlFor={"cost-"+key}>{label}<span>{unit}</span><input id={"cost-"+key} name={key} type="number" required min={key==="purchased"||key==="sellable"?1:0} step={key==="purchased"||key==="sellable"?1:"any"} inputMode={key==="purchased"||key==="sellable"?"numeric":"decimal"}/></label>)}
      </div>
      <button className="d-button" type="submit">Calculate my unit cost</button>
      <button className="d-text-link" type="reset" onClick={()=>{setCalculation(null);setError("");}}>Clear values</button>
    </form>
    <div aria-live="polite">
      {error&&<p role="alert">{error}</p>}
      {calculation&&<div className="d-tool-result">
        <h3>{calculation.currency} {calculation.result.perSellable.toFixed(2)} per expected sellable unit</h3>
        <p>Total cost: {calculation.currency} {calculation.result.total.toFixed(2)} · Per purchased unit: {calculation.currency} {calculation.result.perPurchased.toFixed(2)}</p>
        <p>Planning estimate from your inputs, not a DIYASI quotation. No retail margin, financing, returns or storage costs are included unless you included them in the relevant inputs.</p>
        <button type="button" className="d-text-link" onClick={()=>downloadCsv(makeCsv([["Input / result","Value","Currency"],...fields.map(f=>[f.label,calculation.input[f.key],f.key==="purchased"||f.key==="sellable"?"units":calculation.currency]),["Total",calculation.result.total,calculation.currency],["Per sellable unit",calculation.result.perSellable,calculation.currency]]),"underwear-landed-cost.csv")}>Download this calculation (CSV)</button>
      </div>}
    </div>
    <p><strong>Formula:</strong> (purchased units × (garment unit price + additional packing unit price) + development + freight + non-recoverable import costs) ÷ expected sellable units.</p>
    <p>Recoverable tax is excluded here; assess cash-flow requirements separately. Quantity losses change the denominator and do not automatically reduce the amount paid.</p>
  </section>;
}
