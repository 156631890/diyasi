"use client";
import { useState } from "react";
import { downloadCsv, makeCsv } from "@/lib/buyer-export";

export type Worksheet = {id:string;title:string;intro:string;columns:[string,string,string];fields:[string,string][];download:string;privacy:string;placeholder:string};
export default function ProcurementWorksheet({sheet}:{sheet:Worksheet}){
  const [values,setValues]=useState<Record<string,string>>({});
  return <section className="d-procurement-tool" id={sheet.id}>
    <h2>{sheet.title}</h2><p>{sheet.intro}</p>
    <div className="d-table-scroll" role="region" tabIndex={0} aria-label={sheet.title}>
      <table><thead><tr>{sheet.columns.map(s=><th key={s} scope="col">{s}</th>)}</tr></thead>
        <tbody>{sheet.fields.map(([label,hint],index)=><tr key={label}><th scope="row"><label htmlFor={sheet.id+"-"+index}>{label}</label></th><td>{hint}</td><td><input id={sheet.id+"-"+index} value={values[label]??""} placeholder={sheet.placeholder} onChange={e=>setValues(v=>({...v,[label]:e.target.value}))}/></td></tr>)}</tbody>
      </table>
    </div>
    <button className="d-button" type="button" onClick={()=>downloadCsv(makeCsv([sheet.columns,...sheet.fields.map(([label,hint])=>[label,hint,values[label]??""])]),sheet.id+".csv")}>{sheet.download}</button>
    <p className="d-fineprint">{sheet.privacy}</p>
  </section>;
}
