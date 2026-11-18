/* 탭샵바 "오늘의 대관 후기" 위젯 (tsb.wine/event/assets/today-review.js, 11/18~)
 * 쓰는 법: 페이지에 <div id="tsb-today-review"></div> + <script src="https://tsb.wine/event/assets/today-review.js" defer></script>
 * 데이터: Apps Script doGet?type=reviews (손님이 '소개 동의'한 후기 중 매일 09시에 1개씩 게시된 것, 최신순)
 * 후기가 하나도 없으면 아무것도 안 보인다. 내리기 = 시트 '후기' 탭 '제외(X)' 칸에 X. */
(function () {
  var API = 'https://script.google.com/macros/s/AKfycbxOZFtdBChQh5_eq9HWDV_SpgMqKOGTnOe4uoVSLc8VNM8wJd93jWZ-sGM5VPAZpAta/exec?type=reviews&n=3';
  var BR = { '청계': '청계 삼일빌딩점', '상암': '상암 MBC점', '마곡': '마곡점', '동대문': '동대문 두타점' };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function md(d) { var p = String(d).split('-'); return p.length === 3 ? (+p[1]) + '월 ' + (+p[2]) + '일' : ''; }
  function meta(it) { return [BR[it.branch] || it.branch, it.occ].filter(Boolean).map(esc).join(' · '); }
  var css = '' +
    '.tsr{padding:96px 0;background:#FFFDFC;font-family:"Pretendard Variable",Pretendard,-apple-system,"Apple SD Gothic Neo","Noto Sans KR",sans-serif;color:#0E0E0E}' +
    '.tsr .w{max-width:1180px;margin:0 auto;padding:0 24px}' +
    '.tsr .eb{display:flex;align-items:center;gap:10px;font-size:12.5px;letter-spacing:.18em;text-transform:uppercase;font-weight:600;color:#4A0B18}' +
    '.tsr .dots{display:inline-flex;gap:5px}.tsr .dots i{width:9px;height:9px;border-radius:50%;display:block}' +
    '.tsr .q{position:relative;margin:22px 0 0;padding:40px 36px 32px;background:#fff;border:1px solid #E7E3E1;border-radius:22px;max-width:860px}' +
    '.tsr .q:before{content:"\\201C";position:absolute;top:-6px;left:26px;font-size:84px;line-height:1;color:#4A0B18;font-family:Georgia,serif}' +
    '.tsr .q p{margin:0;font-size:clamp(18px,2.2vw,23px);line-height:1.75;font-weight:500;white-space:pre-line;letter-spacing:-.01em}' +
    '.tsr .m{margin-top:18px;font-size:14px;color:#6b6b6b}.tsr .m b{color:#4A0B18;font-weight:600}' +
    '.tsr .prev{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px;margin-top:14px;max-width:860px}' +
    '.tsr .prev div{background:#F5F2F0;border-radius:16px;padding:18px 20px;font-size:14.5px;line-height:1.65;color:#333}' +
    '.tsr .prev small{display:block;margin-top:8px;color:#8d8782;font-size:12.5px}' +
    '.tsr .note{margin-top:16px;font-size:12.5px;color:#8d8782}' +
    '@media(max-width:640px){.tsr{padding:72px 0}.tsr .q{padding:34px 22px 24px}}';
  function clip(t, n) { t = String(t); return t.length > n ? t.slice(0, n).replace(/\s+\S*$/, '') + '…' : t; }
  function render(el, items) {
    if (!items || !items.length) return;
    var a = items[0], rest = items.slice(1, 3);
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    el.innerHTML = '<section class="tsr" id="today-review"><div class="w">' +
      '<div class="eb"><span class="dots"><i style="background:#F43131"></i><i style="background:#156DFF"></i><i style="background:#FFC100"></i></span>Today\'s Review · 오늘의 대관 후기</div>' +
      '<div class="q"><p>' + esc(a.text) + '</p><div class="m"><b>' + meta(a) + '</b> · ' + md(a.date) + ' 소개</div></div>' +
      (rest.length ? '<div class="prev">' + rest.map(function (r) { return '<div>' + esc(clip(r.text, 110)) + '<small>' + meta(r) + ' · ' + md(r.date) + '</small></div>'; }).join('') + '</div>' : '') +
      '<p class="note">대관 손님이 직접 남기고 소개에 동의해 주신 후기예요. 하루에 하나씩 바뀌어요.</p>' +
      '</div></section>';
  }
  function go() {
    var el = document.getElementById('tsb-today-review');
    if (!el) return;
    fetch(API, { credentials: 'omit' }).then(function (r) { return r.json(); })
      .then(function (j) { render(el, j && j.items); }).catch(function () {});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();
