# 탭샵바 행사 안내 페이지 (tsb.wine/event/…)

대관·단체 손님에게 보내는 1장짜리 안내 페이지. 코스(음식 사진), 테이블 구성, 참석 등록(음료·알레르기·신청곡·원하시는 것), 오시는 길, 등록 마감 D-day가 들어간다.

## 구조
- `assets/event.css`, `assets/event.js` : 모든 행사가 같이 쓰는 디자인과 화면 엔진 (TSB 3 dots, 크림 + 와인 톤)
- `assets/img/` : 메뉴·매장 사진 (d_*.jpg = 메뉴, venue*/entrance/table = 매장)
- `MMDD.html` : 행사 하나 = 파일 하나 (주소 tsb.wine/event/MMDD). 안의 `window.EVENT = {…}` 블록만 바꾸면 된다.
- `_template.html` : 새 행사 시작용 복사본 (밑줄로 시작해 공개 안 됨)
- 폴더(MMDD/index.html)로 만들면 tsb.wine 주소가 github.io로 넘어가 버린다. 꼭 파일 하나로.

## 새 행사 만들기 (5분)
1. `_template.html`을 복사해 `MMDD.html`(예: `1212.html`) 또는 `MMDD-이름.html`로 저장한다.
2. `window.EVENT` 안에서 바꿀 것: `code`(응답 시트에서 행사 구분), 제목·날짜·시간, `deadlineISO`/`deadlineText`(등록 마감), `notice`(없으면 빈 문자열), `facts`, `course`(시간·메뉴·사진 파일), `table`, `venue`(지점·역·지도 링크·전화), `notes`.
3. 지점별 오시는 길 링크는 `https://tsb.wine/way/` 의 지점 페이지를 쓴다 (청계·동대문·상암·마곡·서여의도).
4. `og:title`, `og:description`, `og:image` (카톡 미리보기) 도 맞춘다.
5. 저장소 tapshopbar/event 에 올리면 1~5분 뒤 `https://tsb.wine/event/파일명` (.html 없이) 으로 열린다.

## 응답 받는 곳
- 시트: 탭샵바_행사안내페이지_손님응답 (Drive 02_Projects), 탭 '응답'. 행사코드 열로 걸러 본다.
- Apps Script: "탭샵바 행사 안내 페이지 응답 (tsb.wine/event)" 웹 앱. 페이지에서 POST 하면 한 줄 추가.
- 개인정보: 페이지 안내대로 행사 끝나고 30일 안에 해당 행사 줄을 지운다.

## 지켜야 할 것
- 페이지 맨 아래 음주 경고문구 3종은 지우지 않는다.
- 슬로건은 항상 소문자 `wine is second americano`.
- 손님에게 링크를 보내기 전 메뉴·시간·회비를 매장과 확정한다 (링크 발송은 승인 후).
- 검색에 안 잡히게 `noindex` 유지 (초대받은 손님 전용).
