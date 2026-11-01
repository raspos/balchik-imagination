import{readFile,writeFile}from'node:fs/promises';
let s=await readFile('src/main.tsx','utf8');
if(s.includes("import QuoteArchive from")){console.log('Refinement already applied');process.exit(0);}
s=s.replace("import'./style.css';","import'./style.css';\nimport indicators from './data/indicators.json';\nimport QuoteArchive from './components/QuoteArchive';");
s=s.replace("type SourceId='imf'", "const wb=(name:string,id:string,year:number)=>indicators.find(x=>x.name===name)?.rows.find(r=>r.countryiso3code===id&&r.date===String(year))?.value;\ntype SourceId='wb'|'imf'");
s=s.replace(" imf:{title:"," wb:{title:'World Bank · 무역·R&D·1인당 GDP·고령화',url:'https://data.worldbank.org',items:{'발표일':'WDI 갱신일 2026-10-08 (API 메타데이터). 개별 원기관 발표일은 미확보.','수집일':'2026-10-31','지표':'NE.EXP.GNFS.CD / NE.IMP.GNFS.CD / GB.XPD.RSDV.GD.ZS / NY.GDP.PCAP.CD / SP.POP.65UP.TO.ZS','단위':'상품·서비스 수출입: 현재 미 달러 / R&D: GDP 대비 % / 1인당 GDP: 현재 미 달러 / 고령인구: 총인구 대비 %','기준연도':'무역·1인당 GDP·고령화 2024, R&D 2023 (2024 결측)','확인 상태':'World Bank 공식 API 원시 JSON 확보. 상품 수출입 통관 통계와 정의가 다름.','가공':'국가별 값 제시. 비율을 더하지 않으며 역내 무역 이중계산을 피하기 위해 수출입을 통합 외부교역으로 합산하지 않음.','주의':'각 지표는 독립 계열. IMF GDP와 WB 1인당 GDP를 다시 조합하지 않음.'}},\n imf:{title:");
const start=s.indexOf('<Section n={7}');const end=s.indexOf('<Section n={8}');
if(start<0||end<0)throw Error('Missing archive section');
s=s.slice(0,start)+'<Section n={7} title="누가, 언제, 어디까지 말했나" kicker="WORDS IN CONTEXT" light><QuoteArchive/></Section>\n'+s.slice(end);
const marker='<tr><th>수출입·R&D·품목별 점유율</th>';
const a=s.indexOf(marker);const b=s.indexOf('</tr>',a)+5;
if(a<0||b<5)throw Error('Missing macro marker');
s=s.slice(0,a)+`{[{name:'상품·서비스 수출 · 2024',id:'exports',year:2024,scale:1e9,unit:'십억 $',note:'국민계정 기준. 통관 상품수출과 다름.'},{name:'상품·서비스 수입 · 2024',id:'imports',year:2024,scale:1e9,unit:'십억 $',note:'양국 간 거래가 포함되므로 합산을 역외교역으로 해석할 수 없음.'},{name:'연구개발비 / GDP · 2023',id:'rd',year:2023,scale:1,unit:'%',note:'2024 양국 결측. 2023으로 맞춰 비교, 비율 합산 안 함.'},{name:'공식 1인당 GDP · 2024',id:'perCapita',year:2024,scale:1,unit:'$',note:'World Bank 국가별 독립 계열. IMF와 혼합해 재계산하지 않음.'}].map(row=><tr key={row.id}><th>{row.name}</th>{['KOR','JPN'].map(id=><td key={id}>{wb(row.id,id,row.year)==null?'미확보':fmt(wb(row.id,id,row.year)!/row.scale,row.id==='perCapita'?0:2)+' '+row.unit}</td>)}<td>{row.note}</td></tr>)}<tr><th>수출입 품목구조·시장점유율</th><td colSpan={2}>검증된 비교 데이터 미확보</td><td>품목 분류·기준연도 대조 후 수록</td></tr>`+s.slice(b);
s=s.replace('<div className="inline-sources"><Source id="imf"','<div className="inline-sources"><Source id="wb" onOpen={setSource} label="World Bank 지표·정의"/><Source id="imf"');
s=s.replace('metadata:sourceMeta}', 'indicators,metadata:sourceMeta}');
s=s.replace('무역·수출입 구조·R&D·기업별 시장점유율, 기업인 직접 발언은 검증된 비교 데이터가 없어 수록하지 않았습니다.', '수출입 품목구조와 기업별 시장점유율은 검증된 비교 데이터가 없어 수록하지 않았습니다.');
await writeFile('src/main.tsx',s);
await writeFile('public/data/quotes.json',await readFile('src/data/quotes.json'));
