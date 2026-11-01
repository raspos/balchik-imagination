import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const read=p=>JSON.parse(fs.readFileSync(new URL('../'+p,import.meta.url)));
function facts(o,p='',out=[]){if(typeof o==='number'||o===null)out.push([p,o]);else if(Array.isArray(o))o.forEach((v,i)=>facts(v,p+'/'+i,out));else if(o&&typeof o==='object')for(const[k,v]of Object.entries(o))facts(v,p+'/'+k,out);return out}
test('Japanese data retains every numerical value and missing observation',()=>{for(const name of ['economy','comparisons','surveys','indicators','manufacturing'])assert.deepEqual(facts(read('src/ja/data/'+name+'.json')),facts(read('src/data/'+name+'.json')),name)});
test('Japanese editorial overrides distinguish won and yen and label translated quotations',()=>{const d=read('i18n/ja-overrides.json');assert.equal(d['원'],'ウォン');assert.equal(d['위'],'位');assert.equal(d['합계출산율'],'合計特殊出生率');assert.equal(d['이시바 시게루'],'石破茂');assert.match(d['원문 미확보 인용과 공식 발표 요약을 구분합니다.'],/日本語に訳/)});
