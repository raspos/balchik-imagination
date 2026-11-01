import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const d=JSON.parse(fs.readFileSync(new URL('../src/data/hero-map.json',import.meta.url)));
const area=r=>Math.abs(r.reduce((a,p,i)=>{const q=r[(i+1)%r.length];return a+p[0]*q[1]-q[0]*p[1]},0))/2;
test('shared equal-area projection preserves the geographical area ratio',()=>{const areas=d.countries.map(c=>[c.id,c.polygons.reduce((a,r)=>a+area(r[0])-r.slice(1).reduce((b,h)=>b+area(h),0),0)]);const m=Object.fromEntries(areas);assert.ok(m.KOR>95000&&m.KOR<105000);assert.ok(m.JPN>360000&&m.JPN<390000);assert.ok(m.JPN/m.KOR>3.65&&m.JPN/m.KOR<3.9);});
