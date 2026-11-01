import {mkdir,writeFile} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
await mkdir(new URL('public/data/raw/',root),{recursive:true});
await mkdir(new URL('docs/raw/',root),{recursive:true});
const jobs={
 countries:'https://www.imf.org/external/datamapper/api/v1/countries',
 gdp:'https://www.imf.org/external/datamapper/api/v1/NGDPD?periods=2024,2025,2026',
 ppp:'https://www.imf.org/external/datamapper/api/v1/PPPGDP?periods=2024',
 debt:'https://www.imf.org/external/datamapper/api/v1/GGXWDG_NGDP?periods=2024',
 population:'https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?date=2024&format=json&per_page=400',
 indicators:'https://api.worldbank.org/v2/country/KOR;JPN/indicator/SP.POP.65UP.TO.ZS?date=2024&format=json',
 eai2:'https://admin.eai.or.kr/attach/plupload/o_1jurea3pudhquuj2d2arfoqd1s.PNG',
 eai3:'https://admin.eai.or.kr/attach/plupload/o_1jurea3pu39ee3dcp9n8ss9j1t.PNG',
 eai1:'https://admin.eai.or.kr/attach/plupload/o_1jvn5kbs31tvv1q0k1bsn1a741ojia.jpg',
 geo:'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson',
 'un-projections':'https://ourworldindata.org/grapher/population-with-un-projections.csv',
 'un-metadata':'https://ourworldindata.org/grapher/population-with-un-projections.metadata.json',
 'trend-korea':'https://admin.eai.or.kr/attach/plupload/o_1j44lhqshgn9q321bgu5631nu2a.png',
 'trend-japan':'https://admin.eai.or.kr/attach/plupload/o_1j44lia191pnf1j2v14et1706mn9a.png'
};
const log=await Promise.all(Object.entries(jobs).map(async([id,url])=>{try{const r=await fetch(url,{signal:AbortSignal.timeout(60000)});if(!r.ok)throw Error(r.status);const buf=Buffer.from(await r.arrayBuffer());const doc=id.startsWith('eai')||id.startsWith('un-')||id.startsWith('trend-')||id==='geo';const ext=id.startsWith('eai')||id.startsWith('trend-')?'png':id==='un-projections'?'csv':'json';const path=`${doc?'docs/raw':'public/data/raw'}/${id}.${ext}`;await writeFile(new URL(path,root),buf);return{id,url,path,bytes:buf.length,status:'downloaded',retrievedAt:new Date().toISOString()};}catch(e){return{id,url,status:'failed',error:e.message};}}));
await writeFile(new URL('public/data/raw/collection-log.json',root),JSON.stringify(log,null,2));
console.log(JSON.stringify(log,null,2));
