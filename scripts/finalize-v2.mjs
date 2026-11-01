import{readFile,writeFile}from'node:fs/promises';
let s=await readFile('src/main.tsx','utf8');
s=s.replace("r.k==null?'조사 수치 없음':'관련 문항 있음'","r.k==null?'제도 설계':'관련 조사'");
s=s.replace("<Badge tone={ladder[step].k==null?'coral':'teal'}>{ladder[step].match}</Badge>","{ladder[step].k!=null&&<Badge tone=\"teal\">{ladder[step].match}</Badge>}");
s=s.replace("<div className=\"empty-number\">—<p>직접 조사된 수치 없음</p></div>","<div className=\"policy-question\"><p>이 단계에서 무엇을 함께 결정할지 살펴보세요.</p></div>");
s=s.replace('단계는 권한 공유를 탐색하기 위한 편집상 배열이며 필수적인 순서가 아닙니다. ‘조사 수치 없음’은 이번 수집 범위에서 직접 대응 문항을 확보하지 못했다는 뜻입니다.','단계는 권한 공유를 탐색하기 위한 편집상 배열입니다. 경제협력에 대한 응답을 더 높은 단계의 통합 지지율로 대체하지 않습니다.');
s=s.replace('className="limitations" open','className="limitations"');
s=s.replace("import indicators from './data/indicators.json';","import indicators from './data/indicators.json';\nimport comparisons from './data/comparisons.json';");
s=s.replace('economy,surveys,indicators,metadata:sourceMeta','economy,surveys,indicators,comparisons,metadata:sourceMeta');
// Original release found on the Chamber's own network. Keep the uncollected questionnaire separate.
s=s.replace("'확인 상태':'연합뉴스 본문 대조. 대한상의 원 설문지와 보도자료 원본 미확보.'","'확인 상태':'연합뉴스 수치와 평택상공회의소에 게시된 대한상의 보도자료 본문 대조. 원 설문지 상세는 별도 미확보.'");
await writeFile('src/main.tsx',s);
let b=await readFile('scripts/build-comparisons.mjs','utf8');b=b.replace('tokyoN:1699,','');await writeFile('scripts/build-comparisons.mjs',b);
const d=JSON.parse(await readFile('src/data/comparisons.json','utf8'));delete d.housing.tokyoN;await writeFile('src/data/comparisons.json',JSON.stringify(d,null,2));await writeFile('public/data/comparisons.json',JSON.stringify(d,null,2));
let c=await readFile('src/data/content.ts','utf8');c=c.replace("chamber:'https://www.yna.co.kr/view/AKR20260707027400003'","chamber:'https://pyeongtaekcci.korcham.net/front/boardlink/boardlinkContentsView.do?boardId=13&contId=20120945275&menuId=3227'");await writeFile('src/data/content.ts',c);
console.log('Progressive disclosure and comparison downloads finalized');
