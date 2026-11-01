import {writeFile,mkdir} from 'node:fs/promises';
await mkdir('docs/raw',{recursive:true});
const html=await(await fetch('https://www.eai.or.kr/press/press_01_view.php?no=13601')).text();
const urls=[...new Set(html.match(/https:\/\/admin\.eai\.or\.kr\/attach\/plupload\/[^"'<>\s]+/g))];
await writeFile('docs/raw/eai-index.json',JSON.stringify(urls,null,2));
await Promise.all(urls.map(async(url,i)=>{try{let r=await fetch(url);await writeFile(`docs/raw/eai-${i+1}.png`,Buffer.from(await r.arrayBuffer()));}catch(e){console.log(i,e.message);}}));
console.log('EAI images',urls.length);
