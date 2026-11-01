import{readFile,writeFile}from'node:fs/promises';
const file='src/main.tsx';let s=await readFile(file,'utf8');
s=s.replace("labels={['호감도','공동체']} label=","labels={['호감도','공동체']} colors={['k','k']} label=");
s=s.replace('위 막대의 색은 두 지표 구분용. 첫째=한국의 대일 호감, 둘째=한국의 경제공동체 긍정.','두 지표 모두 한국 응답자 비율입니다. 표본과 문항이 다른 독립 조사입니다.');
await writeFile(file,s);
