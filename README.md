# 탭샵바 행사 안내 페이지 (tsb.wine/event/…)

대관·단체 손님에게 보내는 1장짜리 안내 페이지. 코스(음식 사진), 테이블 구성, 참석 등록(음료·알레르기·신청곡·원하시는 것), 오시는 길, 등록 마감 D-day가 들어간다.

## 구조
- `assets/event.css`, `assets/event.js` : 모든 행사가 같이 쓰는 디자인과 화면 엔진 (TSB 3 dots, 크림 + 와인 톤)
- `assets/img/` : 메뉴·매장 사진 (d_*.jpg = 메뉴, venue*/entrance/table = 매장)
- `지점/MMDD.html` : 행사 하나 = 파일 하나 (주소 tsb.wine/event/지점/MMDD). 안의 `window.EVENT = {…}` 블록만 바꾸면 된다.
- `1128.html` (루트) : 옛 주소 tsb.wine/event/1128 → event/cheonggye/1128 로 넘겨 주는 페이지 (11/18 주소 규칙 변경 전 링크용, 지우지 않는다).
- `_template.html` : 새 행사 시작용 복사본 (밑줄로 시작해 공개 안 됨)
- 폴더(MMDD/index.html)로 만들면 tsb.wine 주소가 github.io로 넘어가 버린다. 꼭 파일 하나로.

## 주소 규칙 (11/18 코치님 확정)
- `tsb.wine/event/지점/MMDD` . 예: `tsb.wine/event/cheonggye/1128`
- 지점은 영어 소문자: cheonggye, sangam, magok, dongdaemun, seoyeouido (후기 도우미 ?s= 코드와 같음). 한글은 카톡에서 %EC… 로 깨져 쓰지 않는다.
- 같은 날 같은 지점에 두 번이면 `MMDD-lunch` / `MMDD-dinner` (am/pm 안 씀: 낮 12시는 영어로 pm이라 헷갈림). 하루 한 번이면 붙이지 않는다.
- 내년 같은 날짜와 겹치면 그때만 `YYMMDD` (예: 271128).
- 손님 이름이 들어가는 행사는 끝에 짧은 글자를 붙여 주소를 짐작 못 하게 한다 (예: `1128-k7`).
- 지점 폴더 안 파일은 경로가 한 칸 깊어서 `../assets/` 로 불러야 한다 (`_template.html` 은 루트 기준이라 복사 뒤 `assets/` → `../assets/` 세 군데: favicon, event.css, event.js). 이미지 경로는 event.js가 알아서 맞춘다.

## 새 행사 만들기 (5분)
1. `_template.html`을 복사해 `지점/MMDD.html`(예: `sangam/1212.html`)로 저장하고 `assets/` 를 `../assets/` 로 바꾼다.
2. `window.EVENT` 안에서 바꿀 것: `code`(응답 시트에서 행사 구분), 제목·날짜·시간, `deadlineISO`/`deadlineText`(등록 마감), `notice`(없으면 빈 문자열), `facts`, `course`(시간·메뉴·사진 파일), `table`, `venue`(지점·역·지도 링크·전화), `notes`.
3. 지점별 오시는 길 링크는 `https://tsb.wine/way/` 의 지점 페이지를 쓴다 (청계·동대문·상암·마곡·서여의도).
4. `og:title`, `og:description`, `og:image` (카톡 미리보기) 도 맞춘다.
5. 저장소 tapshopbar/event 의 지점 폴더에 올리면 1~5분 뒤 `https://tsb.wine/event/지점/파일명` (.html 없이) 으로 열린다. GitHub 웹 업로드는 `github.com/tapshopbar/event/upload/main/지점` 으로 들어가면 폴더가 없어도 만들어진다.

## 응답 받는 곳
- 시트: 탭샵바_행사안내페이지_손님응답 (Drive 02_Projects), 탭 '응답'. 행사코드 열로 걸러 본다.
- Apps Script: "탭샵바 행사 안내 페이지 응답 (tsb.wine/event)" 웹 앱. 페이지에서 POST 하면 한 줄 추가.
- 개인정보: 페이지 안내대로 행사 끝나고 30일 안에 해당 행사 줄을 지운다.

## 지켜야 할 것
- 페이지 맨 아래 음주 경고문구 3종은 지우지 않는다.
- 슬로건은 항상 소문자 `wine is second americano`, BI 표기(Pretendard ExtraBold, tsb.wine 홈과 같음). 로고는 assets/img/wordmark.png (BI 워드마크).
- 글씨는 BI대로 Pretendard만 (제목 ExtraBold). 세리프(Noto Serif 등) 쓰지 않는다 (코치님 11/18).
- 손님용 글은 짧게: 한 줄 안내, 설명 문단 빼기. `showWhen: false`면 첫 화면 DATE/TIME/PLACE 줄을 숨긴다(아래 카드와 중복).
- 영상은 `video: { youtube: '영상ID', title }` (또는 `src` mp4)를 넣으면 갤러리 아래에 나온다(선택). 유튜브는 @TSBKorea 일부공개로 올린다. 1128 = LM7cmQnYHME (브랜드필름 A The Quiet Hour).
- 손님에게 링크를 보내기 전 메뉴·시간·회비를 매장과 확정한다 (링크 발송은 승인 후).
- 검색에 안 잡히게 `noindex` 유지 (초대받은 손님 전용).

## 등록 알림 (11/18~)
- 등록될 때마다 hello@로 메일 1통: 제목 `[행사응답] 행사코드 · 성함 N명 (누적 N건 N명)`, 보내는 이름 '탭샵바 행사 페이지'.
- 메일은 Gmail 라벨 `임시_행사응답`에만 모이고 받은편지함에서는 빠진다(스크립트가 라벨 달고 보관처리).
- 행사 끝나고 30일 안에 Apps Script 편집기에서 `purgeEvent_('행사코드')`(1128은 `purge1128`) 실행 → 시트 줄 + 라벨 메일 같이 삭제. 1128은 12/28 루틴이 처리.
- 스크립트 사본: `apps-script_Code.gs` (웹 앱 배포 v3, URL 그대로).

## 구글 후기 도우미 (review.html → tsb.wine/event/review?s=지점코드, 11/18~)
- 지점코드: cheonggye, sangam, magok, dongdaemun. 대관 끝나고 총무님께 카톡 링크 1번 (발송은 승인 후).
- 손님이 "복사하고 구글에 올리기" 또는 "탭샵바에만 남길게요"를 누르면 같은 웹 앱(type=review)으로 시트 '후기' 탭에 한 줄. 이름·연락처 없음. 같은 손님이 다시 누르면 글ID(rid)로 그 줄을 고친다.
- 주의: 파라미터 이름 `sid`는 구글이 400으로 막는다(그래서 rid). 저장은 fetch no-cors + credentials:'omit' (sendBeacon은 쿠키가 붙어 여러 계정 로그인 상태에서 실패).
- '인용 동의' 열이 "동의"인 글만 홈페이지·SNS에 이름 없이 인용한다.

## 오늘의 대관 후기 (하루 1개 웹사이트 게시, 11/18~)
- 매일 09시 트리거 `pickDailyReview`: '후기' 탭에서 인용 동의 + 미게시 + 제외 아님 + 40~700자 + 연락처·링크·나쁜 말 없음 + 60일 이내 중 점수 1등 1개에 '게시일'을 찍는다. 오늘 이미 1개면 건너뛴다. 후보가 없으면 그날은 그대로.
- 점수: 길이, 손님이 직접 쓴 한마디(+6), 문장을 손님이 고침(+6), 아쉬운 점 없음(+3), 고른 단어 수, 5만·가성비 언급(+2), 최근일수록 우대.
- 게시되면 hello@로 '[오늘의 후기]' 메일 1통(라벨 후기_게시, 받은편지함 안 거침). 내리려면 '제외(X)' 칸에 X → 사이트에서 바로 빠짐.
- 공개 목록: 웹 앱 `?type=reviews&n=3` (게시된 것만, 최신순, 이름·연락처 없음).
- 위젯: `assets/today-review.js` + `<div id="tsb-today-review"></div>`. 후기가 0개면 아무것도 안 보임. 미리보기 tsb.wine/event/reviews-preview.
- (11/18 v2) 매달 바뀌는 홈 대응: 공통 레이아웃에 `<script src="https://tsb.wine/event/assets/today-review.js" data-place="auto" defer>` 한 줄. 자리 div가 없으면 footer 바로 위 자동. 색은 CSS 변수 --tsr-bg/card/ink/sub/accent/line/soft/font. 영어는 data-lang="en".
- tsb.wine/party: '실제 대관 사례'(#case) 바로 아래에 자리 div + script 반영(11/18). 홈은 이창훈 이사 요청 메일 11/18 발송, 기한 11/25(수).

## 후기 초안 = Gemini 무료 등급 (11/18~)
- 페이지 "후기 써 줘" → 웹 앱 type=write → Gemini(gemini-flash-lite-latest, thinkingLevel low). 8초 안에 못 받거나 실패·한도 초과면 페이지 안 문장 조합으로 자동 대체.
- 키: Google AI Studio(hello@) 'TSB 후기 도우미 (Apps Script)', 프로젝트 Default Gemini Project, 결제 등급 '무료 등급'(결제 연결 없음). Apps Script 스크립트 속성 GEMINI_KEY에만 저장. 키 값은 어디에도 적지 않는다.
- 상한: 하루 300회, 분당 15회 (CacheService). 무료 등급은 입력이 Google 학습에 쓰일 수 있어 이름·연락처는 받지 않는다.
- 결제(유료 등급)로 올리거나 Claude로 바꾸는 건 회생 기간 새 지출 → 법원 허가 후.

## 다국어 후기 (11/18~)
- 폰 언어(navigator.languages[0])를 읽는다. 한국어 폰 = 한국어(기본). 그 외 = 그 언어로 후기 + 아래에 한국어 번역 칸, 복사·저장 때 "원문 + (한국어 번역) + 번역문"이 함께 들어간다.
- 화면 글자: ko / en / ja / zh, 그 밖의 언어는 화면만 영어(후기는 폰 언어). 맨 위 오른쪽 토글 = 반대 언어(한국어 폰이면 English, 외국어 폰이면 한국어).
- 외국어 초안은 영어 지시 + 영어로 바꾼 사실을 보내고, 결과에 한글이 섞이면 한 번 더 쓴다. 실패하면 영어 자체 문장 + 한국어 자체 문장.
- 손님이 외국어 글을 고치면 1.5초 뒤 type=translate로 한국어 번역을 다시 만든다.
- 시트 '후기' 탭 14열 '언어'(BCP47, 예 fr-FR). 시험: 주소 끝에 &lang=fr-FR.
