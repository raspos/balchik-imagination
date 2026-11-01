export function combinedRanking(rows,ids=['KOR','JPN']){
 const members=ids.map(id=>rows.find(r=>r.id===id));
 if(members.some(x=>!x||!Number.isFinite(x.value)))return null;
 const total=members.reduce((s,r)=>s+r.value,0);
 const peers=rows.filter(r=>!ids.includes(r.id));
 return {total,rank:1+peers.filter(r=>r.value>total).length,rows:[...peers,{id:'UNION',name:'한국 + 일본',value:total}].sort((a,b)=>b.value-a.value)};
}
export function vote(rule,korea,japan,share,protectedArea=false){
 const yes=(korea?share:0)+(japan?1-share:0);
 const passed=rule==='population'?yes>0.5:rule==='veto'&&!protectedArea?yes>0.5:korea&&japan;
 return {passed,yes};
}
export function splitSegments(rows,key){const out=[];let segment=[];for(const r of rows){if(r[key]==null){if(segment.length)out.push(segment);segment=[];}else segment.push(r);}if(segment.length)out.push(segment);return out;}
