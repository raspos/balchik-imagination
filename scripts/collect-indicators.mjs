import{writeFile,mkdir}from'node:fs/promises';
await mkdir('docs/raw',{recursive:true});
const ids={exports:'NE.EXP.GNFS.CD',imports:'NE.IMP.GNFS.CD',rd:'GB.XPD.RSDV.GD.ZS',perCapita:'NY.GDP.PCAP.CD'};
const out=await Promise.all(Object.entries(ids).map(async([name,id])=>{const url=`https://api.worldbank.org/v2/country/KOR;JPN/indicator/${id}?date=2023:2024&format=json&per_page=100`;try{const r=await fetch(url,{signal:AbortSignal.timeout(40000)});const raw=await r.json();await writeFile(`docs/raw/wb-${name}.json`,JSON.stringify(raw,null,2));return{name,id,url,source:'World Bank WDI',retrieved:'2026-10-31',lastUpdated:raw[0]?.lastupdated,rows:raw[1]??[]};}catch(e){return{name,id,url,error:e.message,rows:[]};}}));
await writeFile('src/data/indicators.json',JSON.stringify(out,null,2));await writeFile('public/data/indicators.json',JSON.stringify(out,null,2));console.log(out.map(x=>({name:x.name,rows:x.rows.map(r=>[r.countryiso3code,r.date,r.value])})));
