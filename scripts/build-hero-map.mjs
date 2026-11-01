import fs from 'node:fs';
// Natural Earth 1:10m via datasets/geo-countries. Keep both countries intact.
const source=process.argv[2];
if(!source)throw Error('Pass the downloaded countries GeoJSON path');
const geo=JSON.parse(fs.readFileSync(source,'utf8'));
const rad=Math.PI/180,phi0=38*rad,lambda0=135*rad;
export function project([lon,lat]){const p=lat*rad,l=lon*rad-lambda0,k=Math.sqrt(2/(1+Math.sin(phi0)*Math.sin(p)+Math.cos(phi0)*Math.cos(p)*Math.cos(l)));return[6371.0088*k*Math.cos(p)*Math.sin(l),-6371.0088*k*(Math.cos(phi0)*Math.sin(p)-Math.sin(phi0)*Math.cos(p)*Math.cos(l))]}
function simplify(p,t=.6){if(p.length<5)return p;const a=p[0],b=p.at(-1);let max=0,index=0;for(let i=1;i<p.length-1;i++){const q=p[i],dx=b[0]-a[0],dy=b[1]-a[1],u=Math.max(0,Math.min(1,((q[0]-a[0])*dx+(q[1]-a[1])*dy)/(dx*dx+dy*dy||1))),d=Math.hypot(q[0]-a[0]-u*dx,q[1]-a[1]-u*dy);if(d>max){max=d;index=i}}return max>t?[...simplify(p.slice(0,index+1),t).slice(0,-1),...simplify(p.slice(index),t)]:[a,b]}
const countries=geo.features.filter(f=>['KOR','JPN'].includes(f.properties['ISO3166-1-Alpha-3'])).map(f=>{const id=f.properties['ISO3166-1-Alpha-3'],polys=(f.geometry.type==='MultiPolygon'?f.geometry.coordinates:[f.geometry.coordinates]).map(r=>r.map(ring=>simplify(ring.map(project)).map(p=>p.map(v=>+v.toFixed(2))))).filter(p=>p[0].length>=4);return{id,polygons:polys}});
fs.writeFileSync('src/data/hero-map.json',JSON.stringify({projection:'Spherical Lambert azimuthal equal-area, 38°N 135°E; kilometres',source:'https://github.com/datasets/geo-countries',countries}));
console.log(countries.map(c=>({id:c.id,islands:c.polygons.length,points:c.polygons.flat(2).length})));
