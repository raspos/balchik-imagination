import fs from 'node:fs';
const p='src/components/DailyCompare.tsx';
let s=fs.readFileSync(p,'utf8');
s=s.replace('[common,setCommon]=useState(false),','');
for(const [a,b] of [
['common?jWage*rate:jWage','jWage*rate'],
["common?'원 환산':'엔'","'원 환산'"],
['common?data.car.japan*rate/1e4:data.car.japan/1e4','data.car.japan*rate/1e4'],
["common?'만원 환산 · 차량 표시가':'만 엔 · 차량 표시가'","'만원 환산 · 차량 표시가'"],
['common?data.housing.tokyoManYenPerM2*84*1e4*rate/1e8:data.housing.tokyoManYenPerM2*84/1e4','data.housing.tokyoManYenPerM2*84*1e4*rate/1e8'],
["common?'억 원 환산 · 23구 중고㎡단가 × 84':'억 엔 · 23구 중고㎡단가 × 84'","'억 원 환산 · 23구 중고㎡단가 × 84'"],
['common?data.transit.tokyo*rate:data.transit.tokyo','data.transit.tokyo*rate'],
['<label className="common-currency"><input type="checkbox" checked={common} onChange={e=>setCommon(e.target.checked)}/>원화로 환산</label>','<span className="common-currency">가격은 모두 원화 기준 · 현지 통화 병기</span>'],
['const selected=cards.filter',"const localPrice:Record<string,string>={wage:f(jWage,0)+'엔 / 시간',car:f(data.car.japan/1e4,1)+'만 엔',housing:f(data.housing.tokyoManYenPerM2*84/1e4,2)+'억 엔',transit:f(data.transit.tokyo,0)+'엔'};const selected=cards.filter"],
['<small>{c.ju}</small>','<small>{c.ju}</small>{localPrice[c.id]&&<span className="local-price">현지 가격 {localPrice[c.id]}</span>}']
])s=s.replaceAll(a,b);
fs.writeFileSync(p,s);
fs.appendFileSync('src/story.css','\n.local-price{display:block;margin-top:8px;font-size:clamp(1rem,1.5vw,1.25rem);font-weight:700;color:#575a5d}.daily-pair small{display:block}\n');
const t='tests/ui/narrative.spec.ts';
fs.writeFileSync(t,fs.readFileSync(t,'utf8').replace("await page.getByLabel('원화로 환산').check();","await expect(page.locator('.daily-car .local-price')).toContainText('엔');"));
