# 生活 속 한일 차이: 추가 데이터와 계산

수집·검증 기준일 2026-10-31. 모든 자료를 최신 연도로 억지 통일하지 않는다. 항목별 기준시점은 카드 위에 표시하고, 비교 조건은 접을 수 있다. `src/data/comparisons.json` 및 원본 `docs/raw/v2-*` 참조.

| 항목 | 확인값·정의 | 출처·확인 범위 |
|---|---|---|
| 환율 | 2026-10-30 ECB: EUR 1 = USD 1.1172, KRW 1491.76, JPY 175.68 | [ECB XML](https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml), 원본 확보. 1USD=1335.266738KRW, 157.250269JPY, 1JPY=8.491347905KRW. 같은 날짜·같은 EUR 기준에서 나눔 |
| 최저임금 | 2026 한국 시간당 10,320원, 일본 개정 전국 가중평균 1,177엔, 도쿄 1,280엔 | [한국 최저임금위원회](https://www.minimumwage.go.kr/minWage/policy/decisionMain.do), [후생노동성 추이표](https://www.mhlw.go.jp/content/11200000/001756428.pdf), [도쿄 적용액](https://saiteichingin.mhlw.go.jp/check/). 일본은 지역별 시행일이 다르며 도쿄는 2026-10-01 시행. 일본 전국을 단일 법정액이라고 표현하지 않음 |
| 자동차 | Model 3 Performance AWD 차량 표시가 한국 69,990,000원 / 일본 7,259,000엔 | [Tesla 한국](https://www.tesla.com/ko_kr/model3/design), [Tesla 일본](https://www.tesla.com/ja_jp/model3/design). 제조사 주문페이지의 공개 검색 색인과 국내 가격변경 보도 대조. 검색엔진은 추천인 파라미터가 붙은 버전을 읽었지만 차량가만 전사해 추천인 할인·등록대행료를 제외. VAT/소비세 포함, 보조금·배송·등록비 제외. 좌우핸들·인증·국가별 사양이 달라 완전히 동일한 차량 구성 견적이 아님. 직접 페이지는 동적이라 일부 도구에 빈 응답을 반환 |
| 서울 84㎡대 집 | 2026-09 구별 중위 거래가의 거래건수 가중값 121,701.065만원 ≈12.17억원. 25개구·845건 | [DAS Lab 공개 집계](https://seoul-heatmap.daslab.co.kr/open-data/), [JSON](https://seoul-heatmap.daslab.co.kr/open-data/gu-monthly.json). 국토부 원자료의 2차 집계, CC BY 4.0. 월=2026-09, apt, area_key=84 필터. Σ(구별 중위가×거래수)/Σ거래수. 서울 전체 개별거래의 평균·중위가라고 부르지 않음. 원자료 직접 CSV 경로도 조사했으나 동일한 전체 거래 파일까지 확보하지 못함 |
| 도쿄 84㎡ 환산 | 2026-09 도쿄23구 기존 중고 맨션 평균㎡단가 130.39만엔×84=10,952.76만엔 | [REINS 분석 보도](https://katohpm.com/blog/tokyo23ku-mansion-seiyaku-202609/), [다른 보도 대조](https://ittou-lab.jp/articles/reins-report-2026-09). [REINS 원본 URL](https://www.reins.or.jp/pdf/trend/mw/mw_202609_summary.pdf)은 접근 시도에서 timeout/502로 직접 확보 실패. 84㎡대의 실제 거래평균이 아니라 전체면적 평균 단가를 84㎡로 선형 환산한 값. 도쿄도 전체 n=1699를 23구84㎡ n으로 사용하지 않음 |
| 지하철 | 서울 1550원 / 도쿄메트로 IC 178엔 | [서울시](https://news.seoul.go.kr/traffic/archives/345), [도쿄메트로](https://www.tokyometro.jp/ticket/types/regular/index.html). 성인 IC 기본구간: 서울 10km, 메트로 1~6km. 일본 종이표 180엔과 IC 178엔을 혼동하지 않음. 역 배리어프리 가산 포함. 같은 거리·노선은 아님 |
| 고령화 | 2024 65세 이상 한국 19.2735% / 일본 29.7808% | [WB SP.POP.65UP.TO.ZS](https://data.worldbank.org/indicator/SP.POP.65UP.TO.ZS). 국가별 비율. UN 총인구와 혼합해 통합 고령화율을 정밀 산출하지 않음 |
| 합계출산율 | 2024 한국 0.748 / 일본 1.15 | [WB SP.DYN.TFRT.IN](https://data.worldbank.org/indicator/SP.DYN.TFRT.IN), JSON 확보. 같은 연도로 맞춘 계열. 최신 2025 한국 확정치와 다른 연도 일본값을 섞지 않음 |
| 기대수명 | 2024 한국 83.629268 / 일본 84.036341세 | [WB SP.DYN.LE00.IN](https://data.worldbank.org/indicator/SP.DYN.LE00.IN), JSON 확보. 남녀 전체·출생 시 기간 기대수명 |
| 반도체 | 2026 Q2 삼성 DRAM 매출점유 39.4%, SK하이닉스 24.9%, 합계64.3% / 일본 제조장비 약30% 세계2위(2025 정부답변) | [TrendForce](https://www.trendforce.com/presscenter/news/20260907-13219.html), [2025-04-24 일본 국회 정부 참고인 답변](https://kokkai.ndl.go.jp/simple/detail?minId=121714080X00620250424). 서로 다른 시장·시점이라 하나의 국가별 반도체 순위로 읽지 않음. 한국 반도체 전체 1위라는 표현은 쓰지 않음. METI 2026 PDF도 시도했으나403으로 인용하지 않음 |
| 대학 | QS2027 서울대38위(85.4점), 도쿄대39위(84.8점); 연세42위·교토64위 서지 보관 | [QS 공식 동일판본](https://www.topuniversities.com/qs-top-uni-wur). 기관·판본 통일. 개인·학과·교육제도 전체의 우열이 아님. 순위 합산 금지 |
| PPP 물가 참고 | OECD2024 PPP/연평균환율×100. 한국815.2/1361.9=59.86, 일본94.9/151.8=62.52, 미국100 | [OECD Taxing Wages2025 표 A A.7](https://www.oecd.org/en/publications/taxing-wages-2025_b3a95829-en/full-report/methodology-and-limitations_49306c2c.html). 해당 PPP 바스켓의 가격수준 참고값. CPI 상승률이나 서울·도쿄 소비자물가가 아님. 2026 ECB 환율을 여기에는 대입하지 않음 |
| R&D·정부부채·1인당GDP | 이전 확보한 WB2023 R&D4.94352/3.44125%, IMF2024 부채49.6/213.6%, WB2024 1인당36238.64/33797.10USD | 기존 원본과 동일. 정의·기준시점을 유지해 생활비·소득·채무 위험을 혼동하지 않음 |

## 집값은 ‘동일 주택’ 비교가 아니다

면적을 84㎡로 맞추더라도 입지·연식·면적 측정과 집계 방식이 다르다. 이 차이를 카드에 상시 표시하며 ‘서울이 도쿄보다 몇% 비싸다’라는 결론이나 구매 추천을 만들지 않는다. 일본값은 중고·기존 주택이므로 신축 분양가와 섞지 않는다. 두 지표 모두 도시별 표본 구성의 영향을 받는다. 공개 전에 더 정교한 비교를 한다면 거래단위 면적·연식·지역·거래일의 조건을 통제해야 한다.

## 한 시간의 최저임금으로 지하철 몇 번?

서울 10,320/1,550=6.6581회, 도쿄 1,280/178=7.1910회. 세전 최저임금과 서로 다른 기본운임 구간을 비교한 제한된 구매력 예시다. 세금·복지·환승·생활비 전체는 포함하지 않는다. 실제 승차는 정수 횟수이지만 여기서는 비율 비교로 소수 둘째 자리까지 표시한다.

## 새 통화 바스켓 실험

기준 금액 W=1000×원비중×단위배율, Y=100×엔비중×단위배율.

`1새단위의 USD 가치 = W/(KRW/USD) × (1+원화가치변화) + Y/(JPY/USD) × (1+엔화가치변화)`

`USD당 새단위 = 1 / 위 USD 가치`

이것은 기존 통화량에 상환되는 가상 바스켓의 환산 실험이다. 원/달러·엔/달러를 단순 평균하지 않는다. 단위배율10배는 새 돈의 달러표시가격을10배로 바꾸지만 구매력을 늘리지 않는다. 원·엔의 강세/약세는 고정구성 바스켓의 달러가치만 바꾼다. 실제 단일통화는 발행량·전환비율·중앙은행 정책·시장 수요·위험 프리미엄의 영향을 받으므로 이 모델은 발행 이후 시장환율을 예측하지 않는다.

## 추가로 찾은 원 보도자료

[평택상공회의소 대한상의 보도자료 게시본](https://pyeongtaekcci.korcham.net/front/boardlink/boardlinkContentsView.do?boardId=13&contId=20120945275&menuId=3227), 2026-07-08 게시·7일 결과 발표. 제목·기관·한국/일본 각500명 및 본문이 확인된다. 상세 설문지와 전체표집 메타데이터는 원 보도자료 본문 확인과 별개 상태로 유지한다.

## 재현

원본 `docs/raw/v2-ecb.txt`, `v2-seoul-housing.txt`, `v2-fertility.json`, `v2-life.json`에서 `node scripts/build-comparisons.mjs`를 실행하면 추가 비교 JSON을 재생성한다. 나머지 공개 숫자는 위 출처에서 수동 전사한 고정 스냅샷이며 방문 시 자동 갱신하지 않는다. 원어 원문·단위·연도를 검토한 뒤 갱신한다.
