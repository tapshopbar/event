/* 탭샵바 "오늘의 대관 후기" 위젯 (tsb.wine/event/assets/today-review.js, 11/18~)
 * 쓰는 법 (한 번만 심으면 매달 디자인이 바뀌어도 그대로 동작):
 *   1) 공통 레이아웃(모든 달이 같이 쓰는 head 또는 body 끝)에 한 줄:
 *      <script src="https://tsb.wine/event/assets/today-review.js" data-place="auto" defer></script>
 *   2) 그달 디자인에서 위치를 정하고 싶으면 그 자리에 <div id="tsb-today-review"></div> (또는 data-tsb-review 속성).
 *      자리가 없으면 data-place="auto" 일 때 <footer> 바로 위에 자동으로 들어감. data-place="none"이면 자리 있을 때만.
 *   3) 그달 색에 맞추기: 페이지 CSS에서 아래 변수만 덮어쓰면 됨 (안 쓰면 기본 크림+와인)
 *      --tsr-bg  --tsr-card  --tsr-ink  --tsr-sub  --tsr-accent  --tsr-line  --tsr-soft  --tsr-font
 *   4) 영어 페이지: script 태그에 data-lang="en" (머리글·안내 문구만 영어, 후기 본문은 원문 그대로)
 * 데이터: Apps Script doGet?type=reviews (손님이 '소개 동의'한 후기 중 매일 09시에 1개씩 게시된 것, 최신순)
 * 후기가 하나도 없으면 아무것도 안 보인다. 내리기 = 시트 '후기' 탭 '제외(X)' 칸에 X. */
(function () {
  var API = 'https://script.google.com/macros/s/AKfycbxOZFtdBChQh5_eq9HWDV_SpgMqKOGTnOe4uoVSLc8VNM8wJd93jWZ-sGM5VPAZpAta/exec?type=reviews&n=3';
  var BR = { '청계': '청계 삼일빌딩점', '상암': '상암 MBC점', '마곡': '마곡점', '동대문': '동대문 두타점' };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  function md(d) { var p = String(d).split('-'); if (p.length !== 3) return ''; return LANG === 'en' ? MON[+p[1] - 1] + ' ' + (+p[2]) : (+p[1]) + '월 ' + (+p[2]) + '일'; }
  function meta(it) { return [BR[it.branch] || it.branch, it.occ].filter(Boolean).map(esc).join(' · '); }
  var me = document.currentScript || document.querySelector('script[src*="today-review.js"]');
  var PLACE = (me && me.getAttribute('data-place')) || 'none';
  var LANG = (me && me.getAttribute('data-lang')) || (document.documentElement.lang || 'ko').slice(0, 2);
  var T = LANG === 'en'
    ? { eb: "Today's Review · from our private-event guests", on: 'shared on ', note: 'Written by our private-event guests, shared with their consent. A new one every day.' }
    : { eb: "Today's Review · 오늘의 대관 후기", on: '', note: '대관 손님이 직접 남기고 소개에 동의해 주신 후기예요. 하루에 하나씩 바뀌어요.' };
  var css = '' +
    '.tsr{--a:var(--tsr-accent,#4A0B18);padding:96px 0;background:var(--tsr-bg,#FFFDFC);font-family:var(--tsr-font,"Pretendard Variable",Pretendard,-apple-system,"Apple SD Gothic Neo","Noto Sans KR",sans-serif);color:var(--tsr-ink,#0E0E0E)}' +
    '.tsr .w{max-width:1180px;margin:0 auto;padding:0 24px}' +
    '.tsr .eb{display:flex;align-items:center;gap:10px;font-size:12.5px;letter-spacing:.18em;text-transform:uppercase;font-weight:600;color:var(--a)}' +
    '.tsr .dots{display:inline-flex;gap:5px}.tsr .dots i{width:9px;height:9px;border-radius:50%;display:block}' +
    '.tsr .q{position:relative;margin:22px 0 0;padding:40px 36px 32px;background:var(--tsr-card,#fff);border:1px solid var(--tsr-line,#E7E3E1);border-radius:22px;max-width:860px}' +
    '.tsr .q:before{content:"\\201C";position:absolute;top:-6px;left:26px;font-size:84px;line-height:1;color:var(--a);font-family:Georgia,serif}' +
    '.tsr .q p{margin:0;font-size:clamp(18px,2.2vw,23px);line-height:1.75;font-weight:500;white-space:pre-line;letter-spacing:-.01em}' +
    '.tsr .m{margin-top:18px;font-size:14px;color:var(--tsr-sub,#6b6b6b)}.tsr .m b{color:var(--a);font-weight:600}' +
    '.tsr .prev{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px;margin-top:14px;max-width:860px}' +
    '.tsr .prev div{background:var(--tsr-soft,#F5F2F0);border-radius:16px;padding:18px 20px;font-size:14.5px;line-height:1.65;color:inherit;opacity:.92}' +
    '.tsr .prev small{display:block;margin-top:8px;color:var(--tsr-sub,#8d8782);font-size:12.5px}' +
    '.tsr .note{margin-top:16px;font-size:12.5px;color:var(--tsr-sub,#8d8782)}' +
    '@media(max-width:640px){.tsr{padding:72px 0}.tsr .q{padding:34px 22px 24px}}';
  function clip(t, n) { t = String(t); return t.length > n ? t.slice(0, n).replace(/\s+\S*$/, '') + '…' : t; }
  function render(el, items) {
    if (!items || !items.length) return;
    var a = items[0], rest = items.slice(1, 3);
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    el.innerHTML = '<section class="tsr" id="today-review"><div class="w">' +
      '<div class="eb"><span class="dots"><i style="background:#F43131"></i><i style="background:#156DFF"></i><i style="background:#FFC100"></i></span>' + esc(T.eb) + '</div>' +
      '<div class="q"><p>' + esc(a.text) + '</p><div class="m"><b>' + meta(a) + '</b> · ' + T.on + md(a.date) + (LANG === 'en' ? '' : ' 소개') + '</div></div>' +
      (rest.length ? '<div class="prev">' + rest.map(function (r) { return '<div>' + esc(clip(r.text, 110)) + '<small>' + meta(r) + ' · ' + md(r.date) + '</small></div>'; }).join('') + '</div>' : '') +
      '<p class="note">' + esc(T.note) + '</p>' +
      '</div></section>';
  }
  function go() {
    var el = document.getElementById('tsb-today-review') || document.querySelector('[data-tsb-review]');
    if (!el && PLACE === 'auto') {                       // 그달 디자인에 자리가 없으면 footer 바로 위
      el = document.createElement('div'); el.id = 'tsb-today-review';
      var f = document.querySelector('footer');
      if (f && f.parentNode) f.parentNode.insertBefore(el, f); else document.body.appendChild(el);
    }
    if (!el || el.getAttribute('data-done')) return;
    el.setAttribute('data-done', '1');
    fetch(API, { credentials: 'omit' }).then(function (r) { return r.json(); })
      .then(function (j) { render(el, j && j.items); }).catch(function () {});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();
