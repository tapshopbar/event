/* TAP SHOP BAR · 행사 안내 페이지 엔진. 각 행사 폴더의 index.html 안 window.EVENT 값을 읽어 화면을 그린다. */
(function () {
  var E = window.EVENT, IMG = (document.currentScript && document.currentScript.src || '').replace(/[^\/]*$/, '') + 'img/';
  var API = 'https://script.google.com/macros/s/AKfycbxOZFtdBChQh5_eq9HWDV_SpgMqKOGTnOe4uoVSLc8VNM8wJd93jWZ-sGM5VPAZpAta/exec';
  var LINE = { '1': '#0052A4', '2': '#00A84D', '3': '#EF7C1C', '4': '#00A5DE', '5': '#996CAC', '6': '#CD7C2F', '7': '#747F00', '8': '#E6186C', '9': '#BDB092', '공항': '#0090D2' };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var img = function (f) { return /^(https?:)?\//.test(f) ? f : IMG + f; };
  var dots = '<span class="dots"><i></i><i></i><i></i></span>';
  var wm = '<img class="wm" src="' + IMG + 'wordmark.png" alt="TAP SHOP BAR">'; // BI 워드마크

  var now = new Date(), deadline = new Date(E.deadlineISO), closed = now > deadline;
  var kst = function (d) { return Math.floor((d.getTime() + 9 * 36e5) / 864e5); };
  var dd = kst(deadline) - kst(now);
  var ddText = closed ? '마감' : (dd <= 0 ? 'D-DAY' : 'D-' + dd);
  var tel = E.venue.phone.replace(/[^0-9]/g, '');

  var html = '';
  // top bar
  html += '<header class="top" id="top"><div class="wrap"><a class="brand" href="#">' + dots + wm + '<span>' + esc(E.venue.short) + '</span></a>' +
    (closed ? '' : '<a class="btn wine sm" href="#rsvp">참석 등록</a>') + '</div></header>';

  // hero
  html += '<section class="hero"><div class="wrap hg"><div class="rv">' +
    '<div class="kicker">' + dots + '<span class="lbl">' + esc(E.kicker) + '</span></div>' +
    '<h1>' + E.titleHtml + '</h1>' +
    '<p class="lead">' + E.lead + '</p>' +
    (E.place ? '<a class="place" href="#way"><b>' + esc(E.place.name) + '</b>' + (E.place.sub ? '<span>' + esc(E.place.sub) + '</span>' : '') + '</a>' : '') +
    (E.showWhen === false ? '' : '<div class="when"><div><small>DATE</small><b>' + esc(E.dateText) + '</b></div><div><small>TIME</small><b>' + esc(E.timeText) + '</b></div><div><small>PLACE</small><b>' + esc(E.venue.name) + '</b></div></div>') +
    (E.notice ? '<div class="notice"><span class="tag">안내</span><div>' + E.notice + '</div></div>' : '') +
    '<div class="cta">' + (closed ? '' : '<a class="btn wine" href="#rsvp">참석 등록하기</a>') + '<a class="btn ghost" href="#course">코스 보기</a>' +
    '<span class="dday"><b>' + ddText + '</b>' + esc(E.deadlineText) + '까지 등록</span></div>' +
    '</div><div class="ph rv"><img src="' + img(E.heroImg) + '" alt="' + esc(E.heroAlt || '') + '" fetchpriority="high"><div class="stamp"><b>' + esc(E.stampTop || 'PRIVATE') + '</b>' + esc(E.stampSub || '') + '</div></div></div>' +
    '<div class="wrap"><div class="facts rv">' + E.facts.map(function (f) {
      return '<div class="fact"><small>' + esc(f.k) + '</small><b>' + esc(f.v) + '</b>' + (f.s ? '<span>' + esc(f.s) + '</span>' : '') + '</div>';
    }).join('') + '</div></div></section>';

  // gallery (선택)
  if (E.gallery) html += '<section class="s gal-s"><div class="wrap"><div class="s-head rv"><span class="lbl">' + esc(E.gallery.label) + '</span><h2>' + E.gallery.title + '</h2>' + (E.gallery.lead ? '<p>' + E.gallery.lead + '</p>' : '') + '</div><div class="gal">' +
    E.gallery.items.map(function (g) { return '<figure class="rv' + (g.wide ? ' wide' : '') + '"><img loading="lazy" src="' + img(g.img) + '" alt="' + esc(g.cap || '모임 사진') + '"' + (g.pos ? ' style="object-position:' + esc(g.pos) + '"' : '') + '>' + (g.cap ? '<figcaption>' + esc(g.cap) + '</figcaption>' : '') + '</figure>'; }).join('') + '</div></div></section>';

  // video (선택) : E.video = { youtube: 영상ID 또는 src: mp4, poster, label, title, lead, wide }
  if (E.video && (E.video.src || E.video.youtube)) html += '<section class="s" id="film"><div class="wrap"><div class="s-head rv"><span class="lbl">' + esc(E.video.label || 'TAP SHOP BAR FILM') + '</span><h2>' + (E.video.title || '탭샵바를 소개합니다') + '</h2>' + (E.video.lead ? '<p>' + E.video.lead + '</p>' : '') + '</div>' +
    '<div class="vid rv' + (E.video.wide ? ' wide' : '') + '">' + (E.video.youtube
      ? '<iframe src="https://www.youtube-nocookie.com/embed/' + esc(E.video.youtube) + '?rel=0&amp;playsinline=1" title="' + esc(E.video.alt || 'TAP SHOP BAR 영상') + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>'
      : '<video src="' + esc(E.video.src) + '"' + (E.video.poster ? ' poster="' + esc(img(E.video.poster)) + '"' : '') + ' controls playsinline preload="metadata"></video>') + '</div></div></section>';

  // course
  html += '<section class="s paper" id="course"><div class="wrap"><div class="s-head rv"><span class="lbl">' + esc(E.courseLabel || 'THE COURSE') + '</span><h2>' + E.courseTitle + '</h2><p>' + E.courseLead + '</p></div><div class="course">' +
    E.course.map(function (c) {
      return '<div class="step rv"><div class="t">' + esc(c.time) + '<small>' + esc(c.en) + '</small></div><div><h3>' + esc(c.ko) + '</h3>' + (c.desc ? '<p class="d">' + c.desc + '</p>' : '') +
        (c.items && c.items.length ? '<div class="dishes">' + c.items.map(function (d) {
          return '<div class="dish"><figure><img loading="lazy" src="' + img(d.img) + '" alt="' + esc(d.name) + '"></figure><b>' + esc(d.name) + '</b><span>' + esc(d.en || '') + '</span>' + (d.tag ? '<em>' + esc(d.tag) + '</em>' : '') + '</div>';
        }).join('') + '</div>' : '') + '</div></div>';
    }).join('') + '</div><p class="fine rv">' + E.courseFine + '</p></div></section>';

  // table of four
  if (E.table) html += '<section class="s"><div class="wrap"><div class="four rv"><div class="tx"><span class="lbl">' + esc(E.table.label) + '</span><h2>' + E.table.title + '</h2><p>' + E.table.lead + '</p><ul>' +
    E.table.rows.map(function (r) { return '<li><b>' + esc(r.n) + '</b><span>' + esc(r.t) + (r.s ? '<small>' + esc(r.s) + '</small>' : '') + '</span></li>'; }).join('') +
    '</ul></div><div class="ph"><img loading="lazy" src="' + img(E.table.img) + '" alt=""></div></div></div></section>';

  // rsvp
  var F = E.form;
  html += '<section class="s paper" id="rsvp"><div class="wrap"><div class="formcard rv"><div class="formside"><span class="lbl">RSVP · 미리 여쭤볼게요</span><h2>' + F.title + '</h2><p>' + F.lead + '</p>' +
    (F.bandNote ? '<div class="bandnote">' + F.bandNote + '</div>' : '') +
    '<div class="deadline"><span class="dday"><b>' + ddText + '</b></span><span>등록 마감 <b>' + esc(E.deadlineText) + '</b></span></div></div><div>';
  if (closed) {
    html += '<div class="closed"><b>등록이 마감됐어요.</b><br>바뀐 내용이 있으면 매장으로 연락 주세요. <a href="tel:' + tel + '">' + esc(E.venue.phone) + '</a></div>';
  } else {
    html += '<form id="f" novalidate>' +
      '<div class="row2"><div class="f"><label for="name">성함 <i>이름표에 들어가요</i></label><input type="text" id="name" name="name" autocomplete="name" maxlength="20" required></div>' +
      '<div class="f"><label for="party">오시는 인원 <i>본인 포함</i></label><select id="party" name="party">' + [1, 2, 3, 4, 5, 6].map(function (n) { return '<option value="' + n + '">' + n + '명</option>'; }).join('') + '</select></div></div>' +
      '<div class="f" id="compWrap" hidden><label for="comp">함께 오시는 분 성함 <i>이름표용, 선택</i></label><input type="text" id="comp" name="comp" maxlength="60" placeholder="예: 김OO, 이OO"></div>' +
      '<div class="f"><label for="phone">휴대폰 <i>선택 · 당일 안내가 필요할 때만 연락드려요</i></label><input type="tel" id="phone" name="phone" autocomplete="tel" maxlength="20" placeholder="010-0000-0000"></div>' +
      '<div class="f"><span class="q">' + esc(F.drinkQ) + ' <i>여러 개 골라도 돼요</i></span><div class="chips" data-name="drink">' + F.drinks.map(function (d) { return '<button type="button" class="chip" aria-pressed="false">' + esc(d) + '</button>'; }).join('') + '</div></div>' +
      '<div class="f"><span class="q">못 드시는 음식 · 알레르기</span><div class="chips" data-name="diet">' + F.diets.map(function (d) { return '<button type="button" class="chip" aria-pressed="false">' + esc(d) + '</button>'; }).join('') + '</div>' +
      '<input type="text" id="dietx" style="margin-top:10px" maxlength="100" placeholder="그 밖에 피해야 할 재료가 있으면 적어 주세요"></div>' +
      '<div class="f"><label for="song">신청곡 <i>선택 · ' + esc(F.songHint) + '</i></label><input type="text" id="song" name="song" maxlength="120" placeholder="예: 아이유 - 밤편지 / Earth, Wind &amp; Fire - September"></div>' +
      '<div class="f"><label for="wish">원하시는 것 <i>선택</i></label><textarea id="wish" name="wish" maxlength="400" placeholder="' + esc(F.wishHint) + '"></textarea></div>' +
      '<input class="hp" type="text" id="hp" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<label class="agree"><input type="checkbox" id="agree"><span>' + esc(F.privacy) + '</span></label>' +
      '<div class="err" id="err" role="alert"></div>' +
      '<button class="btn wine" type="submit" id="sub" style="width:100%;height:54px;font-size:16px">등록하기</button></form>' +
      '<div class="done" id="done"><div class="ok">✓</div><h3>등록됐어요. 고맙습니다!</h3><p id="doneMsg"></p><div class="sum" id="sum"></div><button class="btn ghost sm" style="margin-top:18px" id="again" type="button">내용 고쳐서 다시 보내기</button></div>';
  }
  html += '</div></div></div></section>';

  // directions
  var V = E.venue;
  html += '<section class="s" id="way"><div class="wrap"><div class="s-head rv"><span class="lbl">DIRECTIONS · 오시는 길</span><h2>' + V.title + '</h2><p>' + V.lead + '</p></div>' +
    '<div class="way"><div class="card rv"><div class="addr"><b>' + esc(V.name) + '</b><span>' + esc(V.addr) + '</span></div><ul class="routes">' +
    V.routes.map(function (r) {
      return '<li><a href="' + esc(r.url) + '"><span class="ln">' + r.lines.map(function (l) { return '<i style="background:' + (LINE[l] || '#555') + '">' + esc(l) + '</i>'; }).join('') + '</span><span class="st">' + esc(r.station) + '<small>' + esc(r.walk) + '</small></span><span class="go">›</span></a></li>';
    }).join('') + '</ul><div class="mapbtns"><a class="btn wine sm" href="' + esc(V.wayUrl) + '">사진으로 길 따라오기</a><a class="btn ghost sm" target="_blank" rel="noopener" href="' + esc(V.naver) + '">네이버 지도</a><a class="btn ghost sm" target="_blank" rel="noopener" href="' + esc(V.kakao) + '">카카오맵</a></div></div>' +
    '<div class="ph rv"><img loading="lazy" src="' + img(V.img) + '" alt="' + esc(V.name) + '"></div></div>' +
    '<div class="tips">' + V.tips.map(function (t) { return '<div class="tip rv"><b>' + esc(t.t) + '</b>' + t.d + '</div>'; }).join('') + '</div></div></section>';

  // notes
  html += '<section class="s paper"><div class="wrap"><div class="s-head rv"><span class="lbl">GOOD TO KNOW</span><h2>미리 알아 두시면 좋아요</h2></div><div class="notes">' +
    E.notes.map(function (n, i) { return '<div class="note rv"><span class="n">' + (i + 1) + '</span><div><b>' + esc(n.t) + '</b><span>' + n.d + '</span></div></div>'; }).join('') + '</div></div></section>';

  // footer
  html += '<footer><div class="wrap"><div class="f-top"><div><a class="brand" href="https://tsb.wine/">' + dots + wm + '</a><div class="slogan">wine is second americano</div></div>' +
    '<div class="call"><a class="btn light sm" href="tel:' + tel + '">' + esc(V.short) + ' ' + esc(V.phone) + '</a></div></div>' +
    (E.more ? '<p class="more">' + E.more + '</p>' : '') +
    '<div class="warn"><small>경고: 지나친 음주는 뇌졸중, 기억력 손상이나 치매를 유발합니다. 임신 중 음주는 기형아 출생 위험을 높입니다. 음주운전은 자신과 다른 사람의 생명을 위태롭게 할 수 있습니다.</small>' +
    '<small>주식회사 탭샵바 · ' + esc(V.addr) + ' · 이 페이지는 초대받은 분들께만 보내 드리는 행사 안내예요.</small></div></div></footer>';

  if (!closed) html += '<div class="mcta" id="mcta"><a class="btn wine" href="#rsvp">참석 등록하기 · ' + ddText + '</a></div>';

  $('#app').innerHTML = html;
  document.title = E.title + ' · 탭샵바 ' + V.short;

  // scroll effects
  var top = $('#top'), mcta = $('#mcta'), rsvp = $('#rsvp');
  var onScroll = function () {
    top.classList.toggle('scrolled', scrollY > 8);
    if (mcta) { var r = rsvp.getBoundingClientRect(); mcta.classList.toggle('on', scrollY > 500 && (r.top > innerHeight || r.bottom < 0)); }
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });
  } else document.querySelectorAll('.rv').forEach(function (el) { el.classList.add('in'); });

  if (closed) return;

  // form
  var f = $('#f'), started = Date.now(), KEY = 'tsb-event-' + E.code;
  document.querySelectorAll('.chips').forEach(function (g) {
    g.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      var on = b.getAttribute('aria-pressed') !== 'true';
      var none = /^(없어요|상관없어요)$/.test(b.textContent);
      if (on && none) g.querySelectorAll('.chip').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
      if (on && !none) g.querySelectorAll('.chip').forEach(function (x) { if (/^(없어요|상관없어요)$/.test(x.textContent)) x.setAttribute('aria-pressed', 'false'); });
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  });
  var picked = function (n) { return [].map.call(document.querySelectorAll('.chips[data-name="' + n + '"] .chip[aria-pressed=true]'), function (b) { return b.textContent; }); };
  $('#party').addEventListener('change', function () { $('#compWrap').hidden = this.value === '1'; });

  var showDone = function (d) {
    f.style.display = 'none'; $('#done').classList.add('on');
    $('#doneMsg').innerHTML = esc(d.name) + '님 포함 ' + esc(d.party) + '명, 이름표와 자리를 준비해 둘게요.' + (F.doneExtra ? '<br>' + F.doneExtra : '');
    $('#sum').innerHTML = [['인원', d.party + '명' + (d.comp ? ' (' + d.comp + ')' : '')], ['음료', d.drink || '-'], ['못 드시는 것', d.diet || '-'], ['신청곡', d.song || '-'], ['원하시는 것', d.wish || '-']]
      .map(function (r) { return '<div><b>' + r[0] + '</b> · ' + esc(r[1]) + '</div>'; }).join('');
  };
  try { var saved = JSON.parse(localStorage.getItem(KEY) || 'null'); if (saved) showDone(saved); } catch (e) {}
  $('#again').addEventListener('click', function () { $('#done').classList.remove('on'); f.style.display = ''; $('#name').focus(); });

  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var err = $('#err'); err.textContent = '';
    var d = {
      name: $('#name').value.trim(), party: $('#party').value, comp: $('#party').value === '1' ? '' : $('#comp').value.trim(),
      phone: $('#phone').value.trim(), drink: picked('drink').join(', '),
      diet: picked('diet').concat($('#dietx').value.trim() ? [$('#dietx').value.trim()] : []).join(', '),
      song: $('#song').value.trim(), wish: $('#wish').value.trim()
    };
    if (!d.name) { err.textContent = '성함을 적어 주세요.'; $('#name').focus(); return; }
    if (!$('#agree').checked) { err.textContent = '정보 사용 안내에 동의해 주세요.'; return; }
    var btn = $('#sub'); btn.disabled = true; btn.textContent = '보내는 중…';
    var body = new URLSearchParams({
      event: E.code, name: d.name, party: d.party + (d.comp ? ' (' + d.comp + ')' : ''), phone: d.phone, drink: d.drink, diet: d.diet, song: d.song, wish: d.wish,
      hp: $('#hp').value, meta: (Date.now() - started < 4000 ? 'fast ' : '') + (navigator.userAgent.match(/iPhone|Android|Mac|Windows/) || [''])[0]
    });
    fetch(API, { method: 'POST', body: body }).then(function (r) { return r.json(); }).then(function (j) {
      if (!j.ok) throw new Error(j.error || 'fail');
      try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (x) {}
      showDone(d); $('#rsvp').scrollIntoView({ behavior: 'smooth' });
    }).catch(function () {
      err.innerHTML = '전송이 안 됐어요. 잠시 뒤 다시 눌러 주시거나 매장으로 알려 주세요. <a href="tel:' + tel + '">' + esc(E.venue.phone) + '</a>';
    }).then(function () { btn.disabled = false; btn.textContent = '등록하기'; });
  });
})();
