import{readFile,writeFile}from'node:fs/promises';
let s=await readFile('src/main.tsx','utf8');
if(s.includes('<StoryHero next='))throw Error('v2 restructure already applied');
const old=new Map([...s.matchAll(/<Section n=\{(\d+)\}[\s\S]*?<\/Section>/g)].map(m=>[Number(m[1]),m[0]]));
const inner=n=>{let x=old.get(n);if(!x)throw Error(`Missing section ${n}`);return x.slice(x.indexOf('>')+1,x.lastIndexOf('</Section>'));};
const start=s.indexOf('<section id="chapter-0"');const end=s.indexOf('</main>',start);
const hero=s.slice(start,s.indexOf('</section>',start)+10);
const rank=hero.slice(hero.indexOf('<div className="ranking-panel">'),hero.lastIndexOf('</section>'));
let poll=inner(2);let split=poll.indexOf('<div className="two-grid">');
poll=poll.slice(0,split)+'<details className="story-fold"><summary>신뢰·관계 평가와 비호감 이유 더 보기</summary>'+poll.slice(split)+'</details>';
poll=poll.replace('상대국에 좋은 인상을 갖는 비율은 어떻게 달라졌을까?<br/>호감과 신뢰, 관계 평가는 서로 다른 질문입니다.','호감도의 변화를 연도별로 살펴보세요.');
let europe=inner(1);europe=europe.slice(europe.indexOf('<div className="history-layout">'));
const conflict=europe.indexOf('<div className="history-block"><span>02');const controls=europe.indexOf('<div className="history-controls">');
europe=europe.slice(0,conflict)+'<details className="history-more"><summary>당시의 갈등과 한일에 주는 시사점</summary>'+europe.slice(conflict,controls)+'</details>'+europe.slice(controls);
const editor=europe.indexOf('<div className="editor-note">');europe=europe.slice(0,editor)+'<details className="story-fold"><summary>프랑스·독일과 한일, 무엇이 같고 다를까?</summary>'+europe.slice(editor)+'</details>';
const community='<div className="community-hook"><p>경제공동체 추진에 긍정적인 응답</p><div><span className="k-text">한국 <strong>69.8<small>%</small></strong></span><span className="j-text">일본 <strong>59.8<small>%</small></strong></span></div><p>좋아하는 것과 협력하는 것은 다른 질문이다.</p><Source id="chamber" onOpen={setSource}/></div>';
const sections=[
'<StoryHero next={()=>go(1)}/>',
'<Section n={1} title="왜 지금, 한일 공동체일까?" kicker="THE IDEA / TWO VOICES"><WhyNow/></Section>',
'<Section n={2} title="둘을 더하면, 세계의 어디쯤일까?" kicker="THE SCALE / ADDING TWO COUNTRIES"><ScaleOverview gdp={gdpRank.total} year={year} onSource={setSource}/><details className="story-fold ranking-fold"><summary>국가별 순위와 기준연도 직접 비교하기</summary>'+rank+'</details></Section>',
'<Section n={3} title="국가는 달라도, 하루의 질문은 비슷하다" kicker="THE EVERYDAY / KOREA vs JAPAN" light><DailyCompare/><CurrencyBasket/></Section>',
'<Section n={4} title="하나가 되기 전에, 넘어야 할 것들" kicker="THE REALITY / SENTIMENT & SOVEREIGNTY"><RealityIntro/><details className="story-fold trend-fold" open><summary>국민정서의 13년, 그래프로 보기</summary>'+poll+'</details>'+community+'<details className="story-fold"><summary>경제공동체 조사·여행 경험을 더 살펴보기</summary>'+inner(3)+'</details><details className="story-fold"><summary>교류에서 연방까지, 동의의 범위 살펴보기</summary>'+inner(4)+'</details></Section>',
'<Section n={5} title="EU는 어떻게, 어디까지 하나가 됐을까?" kicker="THE EUROPEAN EXPERIMENT" light><EuropeanBalance/>'+europe+'</Section>',
'<Section n={6} title="한일 통합, 현실이 될 수 있을까?" kicker="THE PROSPECT / POSSIBILITIES & CONDITIONS"><Outlook/></Section>',
old.get(5).replace('n={5}','n={7}'),
'<Section n={8} title="경제·산업·안보, 더 깊이 보기" kicker="THE STRUCTURE / DATA EXPLORER"><p className="section-lead">비교할수록 드러나는 강점과 조정의 과제.</p><details className="story-fold"><summary>경제지표·산업 8개 분야·군사비 비교 펼치기</summary>'+inner(6)+'</details></Section>',
'<Section n={9} title="다른 나라의 실험, 연구의 근거" kicker="THE READING ROOM"><details className="story-fold"><summary>해외 사례와 학술연구 탐색하기</summary>'+inner(8)+'</details><details className="story-fold"><summary>정치인·기업인 발언 전체 아카이브</summary><QuoteArchive/></details></Section>',
old.get(9).replace('n={9}','n={10}').replace('className="limitations" open','className="limitations"')
];
s=s.slice(0,start)+sections.join('\n')+'\n'+s.slice(end);
s=s.replace("import QuoteArchive from './components/QuoteArchive';","import QuoteArchive from './components/QuoteArchive';\nimport{StoryHero,WhyNow,ScaleOverview,RealityIntro,EuropeanBalance,Outlook}from'./components/Story';\nimport DailyCompare from'./components/DailyCompare';\nimport CurrencyBasket from'./components/CurrencyBasket';\nimport'./story.css';");
s=s.replace('<button onClick={()=>go(1)}>통합의 역사</button><button onClick={()=>go(2)}>국민의 생각</button>','<button onClick={()=>go(3)}>생활 속 차이</button><button onClick={()=>go(5)}>EU의 경험</button>');
s=s.replace('className="nav-lab" onClick={()=>go(5)}','className="nav-lab" onClick={()=>go(7)}');
s=s.replace('onClick={()=>go(9)}>방법론','onClick={()=>go(10)}>방법론');
s=s.replace("useEffect(()=>{const o=new IntersectionObserver", "useEffect(()=>{const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-revealed');reveal.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.chapter .section-heading,.speaker,.power-card,.obstacle-grid,.europe-balance,.outlook-result').forEach(el=>{el.classList.add('reveal');reveal.observe(el)});return()=>reveal.disconnect()},[]);\nuseEffect(()=>{const o=new IntersectionObserver");
s=s.replace('<tr><th>수출입 품목구조·시장점유율</th><td colSpan={2}>검증된 비교 데이터 미확보</td><td>품목 분류·기준연도 대조 후 수록</td></tr>','');
await writeFile('src/main.tsx',s);
let content=await readFile('src/data/content.ts','utf8');content=content.replace(/export const chapters=\[[^;]+;/,"export const chapters=['한국과 일본, 하나가 된다면','왜 지금 한일 공동체인가','합친 규모, 세계 순위','생활 속 한일 차이','현실의 벽과 국민정서','EU의 통합 과정과 명암','한일 통합의 현실적 전망','공동체 설계실','경제·산업·안보 더 보기','사례·연구·발언 아카이브','데이터·방법론'];");
await writeFile('src/data/content.ts',content);console.log('Rebuilt narrative: 11 chapters');
