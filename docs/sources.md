# 출처 카탈로그·검증 기록

수집·열람: 2026-10-31. ‘확인’은 아래에 적은 범위만 뜻하며, 모든 원문·실측 원시자료를 확보했다는 뜻이 아니다. 원본 캡처는 연구 검증용으로 `docs/raw/`에 보관하고 EAI 원본 이미지는 웹 `dist/`로 복사하지 않는다.

## 통계

| 기관·자료 | 원자료/접근 경로 | 기준·단위 | 확인 상태 |
|---|---|---|---|
| IMF DataMapper | [API 설명](https://www.imf.org/external/datamapper/api/), [NGDPD](https://www.imf.org/external/datamapper/api/v1/NGDPD), [국가 코드](https://www.imf.org/external/datamapper/api/v1/countries) | 2024/25/26, 십억 현재 USD | JSON 다운로드. API가 요청 periods를 무시하고 전체 시계열을 반환해 파생 스크립트에서 연도를 선택. 판본·발표일·실적추정 구분 미확보 |
| IMF PPP·부채 | [PPPGDP](https://www.imf.org/external/datamapper/api/v1/PPPGDP), [GGXWDG_NGDP](https://www.imf.org/external/datamapper/api/v1/GGXWDG_NGDP) | 2024, 십억 국제$ / GDP 대비 % | 공식 API JSON 확보 |
| UN DESA WPP 2024 | [UN](https://population.un.org/wpp/), [OWID 배포본](https://ourworldindata.org/grapher/population-with-un-projections), [CSV](https://ourworldindata.org/grapher/population-with-un-projections.csv), [메타데이터](https://ourworldindata.org/grapher/population-with-un-projections.metadata.json) | 2024-07-01 중위 전망, 명 | UN 원자료의 OWID 가공본 CSV·메타데이터 확보. UN 직접 다운로드는 미확보. WPP 발표 2024-07-11, OWID 갱신 07-12 |
| SIPRI | [2025 공식 인포그래픽](https://www.sipri.org/sites/default/files/Military%20Expenditure%202025.pdf), [데이터베이스](https://www.sipri.org/databases/milex) | 2025 현재 USD, 십억 | 공식 PDF의 상위국 금액을 대조·전사. DB 발표 2026년 4월·수정 04-27. 라이선스 조건은 공개 전 확인 |
| World Bank WDI | [상품·서비스 수출](https://data.worldbank.org/indicator/NE.EXP.GNFS.CD), [수입](https://data.worldbank.org/indicator/NE.IMP.GNFS.CD), [R&D](https://data.worldbank.org/indicator/GB.XPD.RSDV.GD.ZS), [1인당 GDP](https://data.worldbank.org/indicator/NY.GDP.PCAP.CD), [고령인구](https://data.worldbank.org/indicator/SP.POP.65UP.TO.ZS) | 무역·1인당·고령화 2024 / R&D 2023 | 공식 API 원본 확보. lastupdated 2026-10-08. 개별 원기관 발표일 미확보 |
| Natural Earth / datasets | [공개 GeoJSON](https://github.com/datasets/geo-countries) | 동북아 해안선·국경 참고 | 파일 다운로드 후 클리핑·점 축약. 영유권 판정 아님 |

WB 원 API 예: `https://api.worldbank.org/v2/country/KOR;JPN/indicator/NE.EXP.GNFS.CD?date=2023:2024&format=json&per_page=100`. `docs/raw/wb-*.json`에 메타데이터와 응답을 함께 보관한다. `public/data/raw/population.json`은 초기 대조용 WB 인구 응답이며 **순위·표결에는 사용하지 않는다**.

## 여론

1. [EAI 2026 여론브리핑](https://www.eai.or.kr/press/press_01_view.php?no=13601): 손열·이상준·이아림, EAI·IHJ 제13회 조사. 이미지 슬라이드 2 표본·방법, 7 상대국 인상, 9 비호감 이유, 11 신뢰, 12 관계 평가 대조. 결과 발표 보도는 [EAI 언론보도](https://www.eai.or.kr/notice/notice_view.php?no=19459), 2026-08-03 발표. 2026 호감 한국 54.3%, 일본 35.3% 확인.
2. [EAI 최은미 2025 이슈브리핑](https://www.eai.or.kr/press/press_01_view.php?no=13373), 2025-09-02: 그림 1·2에서 2013~2025 인상 시계열 전사. 원본 이미지 `docs/raw/trend-korea.png`, `trend-japan.png`. 기관 변경과 2024 일본 미실시를 명시. 연도별 전체 조사 개요는 미확보.
3. [EAI 2026 인상 분석](https://www.eai.or.kr/press/press_01_view.php?no=13603): 손열·이아림, 조사 해석 비교용. 인과 효과를 독자적으로 산출하지 않음.
4. [대한상의·한국리서치 조사 보도](https://www.yna.co.kr/view/AKR20260707027400003), 2026-07-07: 경제공동체, 조속/중장기, 관광, 신분증 여행, 최근 5년 방한 경험별 수치 대조. 양국 각 500명. **원 설문지·표집틀·현장일·가중치·하위집단 n 미확보**. 관련 수치는 보도 확인 상태이며 원자료 확보로 표시하지 않음.

원문 질문·분모·산식·표본·전사 주석은 `src/data/surveys.json` 및 화면 출처 패널 참고. `docs/raw/eai-report-access-denied.html`은 PDF URL에서 받은 확인 대기 HTML이다. PDF로 오인해 분석하지 않았다.

## 발언

| 인물·당시 직위 | 날짜·맥락 | 확인 URL | 상태 |
|---|---|---|---|
| 이시바 시게루 전 일본 총리 | 2026-10-29 국제 한반도 포럼 일본 세미나 축사 | [한국일보](https://www.hankookilbo.com/news/article/A2026102914210003063) | 보도 확인. 일본어 원문 미확보. GDP·인구·방위력 발언과 실제 지표 검증은 분리 |
| 최태원 SK그룹·대한상의 회장 | 2025-05-30 닛케이 인터뷰, LNG 공동 구매·산업협력 | [뉴스토마토](https://www.newstomato.com/ReadNews.aspx?no=1263802) | 보도된 한국어 인용. 일본어 원문 미확보. 경제적 효과가 확정됐다는 뜻 아님 |
| 이재명 대통령·이시바 총리 | 2025-08-23 정상회담 | [일본 외무성](https://www.mofa.go.jp/a_o/na/kr/pageite_000001_01221.html) | 영어 공식 결과 발표의 한국어 요약. 개인 직접 인용으로 처리하지 않음 |

`src/data/quotes.json`: 원문·한국어·날짜의 의미·범주·출처·해석 경계. 원어 직접 발언 원문은 미확보이므로 null로 남겼다.

## 유럽의 제도·해외 사례

- [EU 이사회 조약사](https://www.consilium.europa.eu/en/policies/how-eu-treaties-shaped-the-council-of-the-eu-and-the-european-council/): 서명·발효·권한의 변화. 파리조약은 1951 서명·1952 발효, 로마조약 1957 서명·1958 발효.
- EU 공식 연대기: [1945~59](https://european-union.europa.eu/principles-countries-history/history-eu/1945-59_en), [1960~69](https://european-union.europa.eu/principles-countries-history/history-eu/1960-69_en), [1970~79](https://european-union.europa.eu/principles-countries-history/history-eu/1970-79_en), [1980~89](https://european-union.europa.eu/principles-countries-history/history-eu/1980-89_en), [1990~99](https://european-union.europa.eu/principles-countries-history/history-eu/1990-99_en), [2000~09](https://european-union.europa.eu/principles-countries-history/history-eu/2000-09_en), [2010~19](https://european-union.europa.eu/principles-countries-history/history-eu/2010-19_en), [2020~현재](https://european-union.europa.eu/principles-countries-history/history-eu/2020-today_en).
- [FGYO 공식 역사](https://www.fgyo.org/the-institution/history-franco-german-youth-office): 1963 엘리제조약과 청소년교류기구. 정상 간 화해 외 교류의 제도화.
- [EU QMV](https://www.consilium.europa.eu/en/council-eu/how-does-the-council-vote/qualified-majority/): 통상 55% 국가·65% 인구, 저지 소수 4개국. 한일 가상 규칙과 구별.
- [베네룩스 조약](https://www.benelux.int/en/information-for-citizens/benelux-union/about-us/benelux-treaty/), [북유럽 협력 역사](https://www.norden.org/en/information/history-nordic-council), [ASEAN 경제공동체](https://asean.org/our-communities/economic-community-2/), [ECB 유로 소개](https://www.ecb.europa.eu/euro/intro/html/index.en.html).
- [일본 외교청서 경제 관계·RCEP](https://www.mofa.go.jp/policy/other/bluebook/2025/en_html/chapter2/c020203.html): 기존 협력 출발점. 정치적 입장은 해당 정부 입장임에 유의.

## 연구 서지

화면에 8개 연구(학술 연구 6개와 정책 브리핑 2개)를 수록. DOI는 확인된 것만 표시.

- Krotz (2007), *Parapublic Underpinnings of International Relations*. [출판사](https://journals.sagepub.com/doi/10.1177/1354066107080129). 초록 확인.
- Hooghe & Marks (2009), *A Postfunctionalist Theory of European Integration*. [DOI](https://doi.org/10.1017/S0007123408000409). 출판사 서지·초록 확인.
- Mundell (1961), *A Theory of Optimum Currency Areas*. AER 51(4), 657–665. [공개 원문](https://www.sfu.ca/~kkasa/mundell_61.pdf). DOI 미확인.
- He (2009), *The Search for Reconciliation*. [결론 장](https://doi.org/10.1017/CBO9780511770463.009). 중일·독폴 비교 연구이므로 한일·불독에 동일한 결과를 단정하지 않음.
- Rozman 편 (2011), *U.S. Leadership, History, and Bilateral Relations in Northeast Asia*. [출판사](https://doi.org/10.1017/CBO9780511760945). 서지·소개 확인.
- Ravenhill (2010), *The “new East Asian regionalism”: A political domino effect*. [출판사](https://doi.org/10.1080/09692290903070887). 초록 확인. 경제적 상호의존=정치통합이라는 결론으로 확대하지 않음.
- 최은미 (2025), EAI 세대별 한일 인식 브리핑. 위 2025 EAI URL. 정책 브리핑·DOI 미확인.
- 손열 (2022), 제10회 한일 상호인식조사 분석. [원문 링크](https://admin.eai.or.kr/process/file_download.php?no=9459). 정책 브리핑·DOI 미확인. 검색 도구의 공개 초록 확인, 원문 다운로드는 확인 대기 페이지를 반환할 수 있음.

## URL 점검 범위

`scripts/check-links.mjs`는 코드에 직접 수록한 URL의 HTTP 상태·리다이렉트와 일부 WAF 문구를 기록한다. **HTTP 200은 내용의 정확성이나 영구 접근성을 보증하지 않는다.** `docs/link-check.json` 참고.

2026-10-31 최초 점검: 코드 URL 28개 중 21개는 자동 클라이언트 접근 가능, 7개는 403/307/WAF로 수동 검토 상태. 해당 7개(EU 이사회 두 페이지, 북유럽, ASEAN, 베네룩스, Krotz·Ravenhill DOI)는 이 작업의 웹 검색·열람 도구로 본문·초록을 확인했다. 원문 다운로드 차단은 링크 없음이나 내용 미존재로 단정하지 않는다. 이후 추가된 도메인·연대기 URL은 갱신된 점검 JSON을 기준으로 본다.

## 2차 개편 추가 검증

ECB·최저임금·자동차·주택·사회·교육·반도체 및 환산 실험의 출처·시점·정의는 [comparisons.md](comparisons.md)와 src/data/comparisons.json에 별도 기록했습니다. 대한상의 원 보도자료의 상공회의소 게시본을 추가로 확보했으므로 위의 초기 미확보 상태와 구분합니다. 원 설문지 상세는 여전히 별도 검증 대상입니다.
