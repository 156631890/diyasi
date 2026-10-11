import {describe, expect, it} from 'vitest';
import {csvCell, makeCsv, validQuantity} from '../lib/buyer-export';

describe('buyer CSV handoff',()=>{
  it('keeps non-ASCII text, quotes, line breaks and all planned models',()=>{
    const csv=makeCsv([['Model','Requested mix'], ...Array.from({length:20},(_,i)=>[`DYS${i}`,'S: 20, M: 40\n颜色 "黑"'])]);
    expect(csv.startsWith('\uFEFF')).toBe(true);
    expect(csv).toContain('"DYS19"');
    expect(csv).toContain('"S: 20, M: 40\n颜色 ""黑"""');
  });
  it('prevents formula-prefixed buyer inputs from becoming spreadsheet instructions',()=>{
    for(const input of ['=1+1','+SUM(A1)','-1+1','@SUM(A1)',' \t=HYPERLINK("x")'])expect(csvCell(input)).toMatch(/^"'/);
    expect(csvCell('DYS-201')).toBe('"DYS-201"');
  });
  it('permits undecided quantities but rejects invalid or excessive planning totals',()=>{
    for(const q of ['', '1', '120', '100000000'])expect(validQuantity(q)).toBe(true);
    for(const q of ['0','-1','1.5','1e3','abc','100000001'])expect(validQuantity(q)).toBe(false);
  });
});
