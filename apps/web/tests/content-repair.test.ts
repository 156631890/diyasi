import { describe, expect, test } from "vitest";
import { calculateLandedCost } from "@/lib/landed-cost";
import { resourceWorksheets, localizedWorksheets } from "@/lib/procurement-worksheets";
import { makeCsv } from "@/lib/buyer-export";
import { indexableContent } from "@/lib/indexable-content";
import { newsArticles } from "@/lib/news-articles";
import { activeResourceArticles } from "@/lib/resource-articles";

const input={purchased:120,sellable:114,garment:3,packaging:0.5,development:60,freight:90,importCosts:30};
describe("landed cost uses the paid quantity and the sellable denominator",()=>{
 test("includes setup once and charges packing on purchased units",()=>{
  const result=calculateLandedCost(input);
  expect(result).toEqual({production:360,packing:60,total:600,perPurchased:5,perSellable:600/114});
 });
 test("zero additional charges do not create a second packing charge",()=>{
  expect(calculateLandedCost({...input,sellable:120,packaging:0,development:0,freight:0,importCosts:0}).perSellable).toBe(3);
 });
 test.each([{sellable:0},{sellable:121},{purchased:1.5},{garment:-1},{freight:NaN},{development:Infinity},{purchased:Number.MAX_SAFE_INTEGER,garment:Number.MAX_SAFE_INTEGER}])("rejects invalid input %j",changes=>{
  expect(()=>calculateLandedCost({...input,...changes})).toThrow();
 });
});
test("all editable worksheets export distinct, complete records without spreadsheet formula execution",()=>{
 for(const sheet of [...Object.values(resourceWorksheets),...Object.values(localizedWorksheets)]){
  expect(new Set(sheet.fields.map(r=>r[0])).size).toBe(sheet.fields.length);
  const csv=makeCsv([sheet.columns,...sheet.fields.map(([name,hint])=>[name,hint,"=1+1"])]);
  expect(csv.startsWith("\uFEFF")).toBe(true);
  expect(csv).toContain('"\'=1+1"');
  expect(csv.split("\r\n")).toHaveLength(sheet.fields.length+2);
 }
});
test("consolidated guide replaces the retired news URL without losing its models",()=>{
 expect(indexableContent.paths).not.toContain("/news/bikini-vs-brazilian-underwear-buying-notes");
 expect(indexableContent.paths).toContain("/resources/bikini-vs-brazilian-underwear");
 expect(newsArticles.some(a=>a.slug==="bikini-vs-brazilian-underwear-buying-notes")).toBe(false);
 expect(activeResourceArticles.find(a=>a.slug==="bikini-vs-brazilian-underwear")?.models).toEqual(expect.arrayContaining(["DYS201","LS006","DYS323"]));
});
