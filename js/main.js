/* =====================================================================
   Bran Peterson portfolio: site behaviour
   Builds every section from js/content.js, runs the signature intro,
   the doodle bits, the eraser page wipe, the lightbox and draw mode.
   You normally never need to edit this file.
   ===================================================================== */
(() => {
const S = window.SITE;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const touch = matchMedia('(hover: none)').matches;
const store = { get(k) { try { return sessionStorage.getItem(k); } catch { return null; } }, set(k, v) { try { sessionStorage.setItem(k, v); } catch {} } };

const SECTIONS = [
  { key: 'about',         label: 'About Me',      color: '#2F5BD3' },
  { key: 'illustrations', label: 'Illustrations', color: '#1E1F24' },
  { key: 'animations',    label: 'Animations',    color: '#2A9148' },
  { key: 'teaching',      label: 'Art Teaching',  color: '#C23B78' },
  { key: 'contact',       label: 'Contact',       color: '#E04A3B' },
];
const PINS = ['#E04A3B', '#2F5BD3', '#2A9148', '#F7DF78', '#C23B78'];
const CHIP_COLORS = ['#F7DF78', '#F3B8C8', '#BFE3F2', '#C9EBB5'];
const tilt = (i, amt = .55) => (((i * 37) % 7) - 3) * amt;
const PENCIL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/></svg>';
const CAMERA = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13.5" r="3.5"/><path d="M9 7l1.5-3h3L15 7"/></svg>';

/* ---------- small renderers ---------- */
function placeholder(shape, label = 'art goes here', icon = PENCIL) {
  return `<div class="ph-art ${shape ? 'ar-' + shape : ''}">${icon}<span>${esc(label)}</span></div>`;
}
// art(): the board version uses the small "thumb" when there is one; full=true uses the big image (lightbox)
function art(item, shape, label, icon, full) {
  if (!item || !item.image) return placeholder(shape || (item && item.shape), label, icon);
  const src = full ? item.image : (item.thumb || item.image);
  return `<img src="${esc(src)}" alt="${esc(item.alt || item.title || item.caption || '')}" loading="lazy" decoding="async">`;
}
const hasProcess = p => Array.isArray(p.process) && p.process.some(x => x && x.image);
function markerSVG(color) {
  return `<svg viewBox="0 0 150 30" aria-hidden="true"><rect x="3" y="27" width="140" height="5" rx="2" fill="#000" opacity=".18"/><rect x="0" y="2" width="112" height="26" rx="6" fill="#F4F5F6"/><rect x="0" y="18" width="112" height="10" rx="4" fill="#000" opacity=".06"/><rect x="10" y="6" width="34" height="18" rx="3" fill="${color}"/><text x="27" y="19.5" font-size="11" fill="#fff" text-anchor="middle" font-family="Patrick Hand, sans-serif">BP</text><rect x="104" y="2" width="9" height="26" fill="${color}"/><polygon points="112,8 132,12 132,18 112,22" fill="#DADDE0"/><polygon points="132,12 144,14.5 144,15.5 132,18" fill="${color}"/><g class="mcap"><rect x="112" y="0" width="36" height="30" rx="7" fill="${color}"/><rect x="116" y="3" width="26" height="5" rx="2" fill="#fff" opacity=".35"/></g></svg>`;
}
function toast(msg, ms = 2600) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('on');
  clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('on'), ms);
}
function fillTexts() {
  $$('[data-text]').forEach(el => {
    const v = el.dataset.text.split('.').reduce((o, k) => o && o[k], S);
    if (v) el.textContent = v;
  });
}

/* =====================================================================
   BUILD
   ===================================================================== */
function buildChrome() {
  $('#tray').innerHTML = SECTIONS.map(s =>
    `<a class="mk" href="#${s.key}" data-go="${s.key}" data-color="${s.color}"><span class="ml" style="color:${s.color}">${s.label}</span>${markerSVG(s.color)}<span class="visually-hidden">${s.label}</span></a>`).join('')
    + `<a class="mk er" href="#" data-go="home" data-color="#1E1F24"><span class="ml" style="color:var(--grey)">home</span><span class="eraser"></span><span class="visually-hidden">Home</span></a>`;
  $$('.shead').forEach(h => h.innerHTML =
    `<a class="mini" href="#" data-go="home" aria-label="Back to the board"><img src="images/doodles/signature.png" alt=""></a><a class="back" href="#" data-go="home">&larr; back to the board</a>`);
  $('#tag').innerHTML = S.tagline.map(esc).join('<b>&bull;</b>');
}

function buildPreviews() {
  const ill = S.illustrations.items.slice(0, 3).map((p, i) =>
    `<a class="pv" href="#illustrations" data-go="illustrations"><span class="sheet" style="transform:rotate(${tilt(i)}deg)"><span class="mag" style="--c:${PINS[i]}"></span>${art(p)}</span><span class="cap">${esc(p.short || p.title)}</span></a>`);
  const reels = [S.animations.showreel, S.animations.animatic, ...S.animations.clips].filter(c => c && (c.video || c.poster));
  const animList = reels.length ? reels : S.animations.clips;
  const anim = animList.slice(0, 3).map((c, i) =>
    `<a class="pv" href="#animations" data-go="animations"><span class="sheet" style="transform:rotate(${tilt(i + 2)}deg)"><span class="mag" style="--c:${PINS[i + 1]}"></span>${c.poster ? `<img src="${esc(c.poster)}" alt="" loading="lazy">` : placeholder('wide', 'clip goes here')}</span><span class="cap">${esc(c.title)}</span></a>`);
  const teach = S.teaching.classroom.slice(0, 3).map((c, i) =>
    `<a class="pv" href="#teaching" data-go="teaching"><span class="sheet" style="transform:rotate(${tilt(i + 4)}deg)"><span class="mag" style="--c:${PINS[(i + 2) % 5]}"></span>${art(c, 'square', 'classroom photo', CAMERA)}</span><span class="cap">${esc(c.caption)}</span></a>`);
  const block = (k, label, cls, sub, items) =>
    `<div class="preview"><div class="${cls}"><h2 class="mh">${label}</h2><span class="squig" style="--sw:300px"></span><p class="sub">${esc(sub)}</p>
     <a class="see" href="#${k}" data-go="${k}">see all &rarr;</a></div><div class="pv-pieces">${items.join('')}</div></div>`;
  $('#previews').innerHTML =
    block('illustrations', 'Illustrations', 'c-ink', S.illustrations.intro, ill) +
    block('animations', 'Animations', 'c-green', S.animations.intro, anim) +
    block('teaching', 'Art Teaching', 'c-magenta', S.teaching.intro, teach);
}

/* ---------- illustrations ---------- */
let galleryList = [];
function buildIllustrations() {
  const items = S.illustrations.items;
  const tags = ['All', ...(S.illustrations.categories || []), ...new Set(items.flatMap(p => p.tags || []))].filter((t, i, a) => a.indexOf(t) === i);
  $('#chips').innerHTML = tags.map((t, i) =>
    `<button class="chip" type="button" data-tag="${esc(t)}" aria-pressed="${i === 0}" style="background:${CHIP_COLORS[i % 4]};transform:rotate(${[-3, 2, -1, 3, -2][i % 5]}deg)">${esc(t)}</button>`).join('');
  $('#gallery').innerHTML = items.map((p, i) =>
    `<div class="item" data-tags="${esc((p.tags || []).join('|'))}"><button class="sheet" type="button" data-lb="ill" data-i="${i}" style="transform:rotate(${tilt(i)}deg)" aria-label="Open ${esc(p.title)}"><span class="mag" style="--c:${PINS[i % 5]}"></span>${art(p)}${hasProcess(p) ? `<span class="has-process">&#9664;&#9664; process</span>` : ''}</button>
     <span class="cap">${esc(p.short || p.title)}${p.year ? `<small>${esc(p.year)}</small>` : ''}</span></div>`).join('');
  $('#chips').addEventListener('click', e => {
    const c = e.target.closest('.chip'); if (!c) return;
    $$('.chip').forEach(x => x.setAttribute('aria-pressed', x === c));
    $$('#gallery .item').forEach(it => it.hidden = c.dataset.tag !== 'All' && !it.dataset.tags.split('|').includes(c.dataset.tag));
    const none = !$$('#gallery .item').some(it => !it.hidden);
    let note = $('#gallery-empty');
    if (!note) { $('#gallery').insertAdjacentHTML('afterend', '<p class="gallery-empty hs" id="gallery-empty" hidden></p>'); note = $('#gallery-empty'); }
    note.hidden = !none;
    if (none) note.textContent = `${c.dataset.tag} are going up on the board soon. Check back!`;
  });
}

/* ---------- animations ---------- */
function videoEmbed(url, autoplay) {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{6,})/);
  if (yt) return `<iframe src="https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0${autoplay ? '&autoplay=1' : ''}" title="Video" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return `<iframe src="https://player.vimeo.com/video/${vm[1]}${autoplay ? '?autoplay=1' : ''}" title="Video" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  return `<video src="${esc(url)}" controls playsinline ${autoplay ? 'autoplay' : ''} preload="metadata"></video>`;
}
function setScreen(v, autoplay, scr = $('#reel'), cap = $('#reelcap')) {
  const isTrailer = v === S.animations.showreel;
  if (v && v.video) scr.innerHTML = videoEmbed(v.video, autoplay);
  else scr.innerHTML = `<div class="empty"><img src="images/doodles/camera.png" alt="">${isTrailer ? 'the trailer plays here soon' : esc(v.title) + ' plays here'}</div>`;
  if (v && v.poster && !autoplay && v.video && !/youtu|vimeo/.test(v.video)) $('video', scr).poster = v.poster;
  cap.innerHTML = `<span class="mh">${esc(v.title)}</span><span class="hs">${esc(v.length || (isTrailer && !v.video ? 'coming soon' : ''))}</span>`;
}
function buildAnimations() {
  const A = S.animations;
  setScreen(A.showreel, false);
  $('#animnote').insertAdjacentHTML('beforeend', A.note.map(esc).join('<br>'));
  if (A.award) { $('#award').hidden = false; $('#award').innerHTML = `<span class="ribbon" aria-hidden="true"></span><b>${esc(A.award[0])}</b>${esc(A.award[1] || '')}`; }
  $('#animaticblock').hidden = !(A.animatic && (A.animatic.video || A.animatic.poster));
  if (A.animatic) { setScreen(A.animatic, false, $('#reel2'), $('#reelcap2')); $('#animnote2').textContent = A.animatic.note || ''; }
  if (A.sidenote) $('#sidehand').innerHTML = A.sidenote.link
    ? `<a href="#${esc(A.sidenote.link)}" data-go="${esc(A.sidenote.link)}">${A.sidenote.lines.map(esc).join('<br>')} &rarr;</a>`
    : A.sidenote.lines.map(esc).join('<br>');
  // sections with nothing in them yet stay hidden so the live site never looks unfinished
  $('#clipsblock').hidden = !A.clips.some(c => c.video || c.poster);
  $('#processblock').hidden = !A.process.some(p => p.image);
  $('#strip').innerHTML = A.clips.map((c, i) =>
    `<button class="clip" type="button" data-clip="${i}" aria-label="Play ${esc(c.title)}">${c.poster ? `<img src="${esc(c.poster)}" alt="" loading="lazy">` : ''}<span class="len">${esc(c.length)}</span></button>`).join('');
  $('#strip').insertAdjacentHTML('afterend', `<div class="stripwrap"><div class="stripcaps">${A.clips.map(c => `<span class="clipcap">${esc(c.title)}</span>`).join('')}</div></div>`);
  $('#strip').addEventListener('click', e => {
    const b = e.target.closest('.clip'); if (!b) return;
    const c = A.clips[+b.dataset.clip];
    if (!c.video) { toast('This clip is coming soon'); return; }
    setScreen(c, true); $('#reel').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  });
  const arrow = '<svg class="arr" viewBox="0 0 60 40" aria-hidden="true"><path d="M6 24 Q30 8 52 20 M42 12 L53 20 L42 28"/></svg>';
  $('#process').innerHTML = A.process.map((p, i) =>
    `<div><span class="sheet" style="transform:rotate(${[-1.5, 1, -.5][i % 3]}deg)"><span class="mag" style="--c:${PINS[i + 1]}"></span>${art(p, '', p.label)}</span><span class="cap">${i + 1}&nbsp; ${esc(p.label)}</span></div>`).join(arrow);
}

/* ---------- teaching ---------- */
function buildTeaching() {
  const T = S.teaching;
  $('#checks').innerHTML = T.subjects.map((t, i) =>
    `<li><svg viewBox="0 0 34 34" aria-hidden="true"><path class="box" d="M3 4 L31 3 L32 31 L2 32 Z"/><path class="tick" d="M6 18 L14 27 L33 1" style="animation-delay:${.3 + i * .15}s"/></svg>${esc(t)}</li>`).join('');
  $('#tip').insertAdjacentHTML('beforeend', T.tip.map(esc).join('<br>'));
  if (T.studentsTaught) $('#taught').innerHTML = `${esc(T.studentsTaught)}<small>students taught</small>`;
  else { $('#taught').remove(); $('.teachtop').style.gridTemplateColumns = '1.2fr 1fr'; }
  // philosophy bubble (hand drawn ellipse + tail)
  $('#quote').innerHTML =
    `<svg viewBox="0 0 600 300" preserveAspectRatio="none" aria-hidden="true"><path vector-effect="non-scaling-stroke" d="M300 12 C 470 8 590 70 588 146 C 586 214 480 268 330 270 C 300 270 260 268 230 264 L 150 300 L 178 256 C 70 236 10 196 12 140 C 14 70 120 14 320 18"/></svg>
     <blockquote>&ldquo;${[].concat(T.philosophy.quote).map(esc).join(' ')}&rdquo;</blockquote><figcaption>Bran</figcaption>`;
  $('#principles').innerHTML = T.philosophy.principles.map(p => `<li><b>${esc(p.title)}</b><span>${esc(p.text)}</span></li>`).join('');
  if (T.philosophy.pdf) $('#fullpdf').innerHTML = `<a href="${esc(T.philosophy.pdf)}" target="_blank" rel="noopener">read my full teaching philosophy (PDF)</a>`;
  // classroom clothesline
  $('#classroom').innerHTML = T.classroom.map((c, i) =>
    `<div class="photo"><span class="pin"></span><button type="button" data-lb="class" data-i="${i}" aria-label="Open photo: ${esc(c.caption)}">${art(c, 'square', 'classroom photo', CAMERA)}<span class="cap">${esc(c.caption)}</span></button></div>`).join('');
  const line = $('#classroom'); const sizeLine = () => line.style.setProperty('--lw', line.scrollWidth + 'px');
  addEventListener('resize', sizeLine); setTimeout(sizeLine, 50);
  $('#projects').innerHTML = (T.projects || []).map((p, i) => {
    const cover = p.images.find(x => x.image === p.cover) || p.images[0];
    return `<article class="project"><button class="sheet" type="button" data-lb="proj" data-p="${i}" data-i="0" style="transform:rotate(${tilt(i, .6)}deg)" aria-label="Open ${esc(p.title)}"><span class="mag" style="--c:${PINS[(i + 4) % 5]}"></span>${art(cover, '', 'project photo', CAMERA)}</button>
      <h4>${esc(p.title)}</h4><span class="postit pink grade">${esc(p.grade)}</span><p>${esc(p.about)}</p>
      <button class="more" type="button" data-lb="proj" data-p="${i}" data-i="0">see all ${p.images.length} &rarr;</button></article>`;
  }).join('');
  $('#wall').innerHTML = T.studentWork.map((w, i) =>
    `<div><button class="sheet" type="button" data-lb="student" data-i="${i}" style="transform:rotate(${tilt(i, .8)}deg)" aria-label="Open student work: ${esc(w.caption)}"><span class="mag" style="--c:${PINS[i % 4]}"></span>${art(w, '', 'student work')}</button><span class="cap">${esc(w.caption)}</span></div>`).join('');
}

/* ---------- about ---------- */
function buildAbout() {
  const A = S.about;
  $('#aboutphoto').innerHTML = A.photo ? `<img class="photo-real" src="${esc(A.photo)}" alt="Bran Peterson">` : `<img src="images/doodles/head.png" alt="Bran's self portrait doodle">`;
  $('#bio').innerHTML = A.bio.map(p => `<p>${esc(p).replace(/\[([^\]]+)\]\(#([\w-]+)\)/g, '<a href="#$2" data-go="$2">$1</a>')}</p>`).join('');
  $('#toolsblock').hidden = !A.tools.length;
  $('#tools').innerHTML = A.tools.map((t, i) => `<span class="postit" style="background:${CHIP_COLORS[i % 4]};transform:rotate(${[-3, 2, -2, 3][i % 4]}deg)">${esc(t)}</span>`).join('');
  $('#timeline').innerHTML = A.timeline.map(t => `<div><b>${esc(t.year)}</b><p>${esc(t.text)}</p></div>`).join('');
}

/* ---------- contact ---------- */
function buildContact() {
  const C = S.contact;
  $('#menu').innerHTML = C.menu.map(r => `<div class="row"><span>${esc(r.item)}</span><span>${esc(r.price)}</span></div>`).join('');
  $('#reach').innerHTML = `or just reach out:<br><span class="ic">&#9993;</span><a href="mailto:${esc(S.email)}">${esc(S.email)}</a><br>
    <span class="ic">&#9711;</span><a href="https://instagram.com/${esc(S.instagram)}" target="_blank" rel="noopener">@${esc(S.instagram)}</a>`;
  $('#opts').innerHTML = C.projectTypes.map((t, i) => `<label><input type="checkbox" name="type" value="${esc(t)}" id="opt${i}">${esc(t)}</label>`).join('');

  const form = $('#form'), msg = $('#formmsg'), row = $('#sendrow'), btn = $('#send');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const name = $('#fn'), email = $('#fe'), text = $('#fm');
    let bad = null;
    [name, email, text].forEach(f => f.classList.remove('bad'));
    if (!name.value.trim()) bad = bad || name;
    if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) bad = bad || email;
    if (!text.value.trim()) bad = bad || text;
    if (bad) { bad.classList.add('bad'); bad.focus(); msg.className = 'formmsg'; msg.textContent = bad === email ? 'That email looks off, can you check it?' : 'Fill in your name, email and a short message.'; return; }
    if (form._gotcha.value) return; // bot
    const types = $$('#opts input:checked').map(i => i.value).join(', ') || 'Not sure yet';
    row.classList.remove('sent'); void row.offsetWidth;
    if (S.formEndpoint) {
      btn.disabled = true; msg.className = 'formmsg'; msg.textContent = 'sending...';
      try {
        const fd = new FormData(form); fd.set('type', types);
        const r = await fetch(S.formEndpoint, { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
        if (!r.ok) throw new Error(r.status);
        row.classList.add('sent'); msg.className = 'formmsg ok'; msg.textContent = 'got it! talk soon';
        form.reset();
      } catch {
        msg.className = 'formmsg'; msg.innerHTML = `That didn't go through. Email me directly at <a href="mailto:${esc(S.email)}">${esc(S.email)}</a>.`;
      } finally { btn.disabled = false; }
    } else {
      const body = `${text.value.trim()}\n\nProject type: ${types}\nFrom: ${name.value.trim()} (${email.value.trim()})`;
      row.classList.add('sent');
      msg.className = 'formmsg';
      msg.innerHTML = `Your email app should open with this message ready to send. If it doesn't, email <a href="mailto:${esc(S.email)}">${esc(S.email)}</a>.`;
      location.href = `mailto:${S.email}?subject=${encodeURIComponent('Project inquiry from ' + name.value.trim())}&body=${encodeURIComponent(body)}`;
    }
  });
}

/* =====================================================================
   SIGNATURE: writes itself, stroke by stroke (no marker)
   ===================================================================== */
const sigSvg = $('#sigsvg');
let introDone = false;
function buildSignature() {
  const G = window.SIGNATURE;
  sigSvg.setAttribute('viewBox', `0 0 ${G.w} ${G.h}`);
  sigSvg.innerHTML =
    `<defs><mask id="sigmask" maskUnits="userSpaceOnUse" x="0" y="0" width="${G.w}" height="${G.h}">
       <rect width="${G.w}" height="${G.h}" fill="black"/>
       <g fill="none" stroke="white" stroke-width="${G.stroke}" stroke-linecap="round" stroke-linejoin="round">${G.strokes.map(s => `<path d="${s.d}"/>`).join('')}</g>
     </mask></defs>
     <image href="images/doodles/signature.png" width="${G.w}" height="${G.h}" mask="url(#sigmask)"/>`;
}
function finishIntro() {
  if (introDone) return; introDone = true;
  $$('#sigmask path').forEach(p => { p.getAnimations().forEach(a => a.cancel()); p.style.strokeDasharray = 'none'; p.style.strokeDashoffset = 0; });
  $('#tag').style.opacity = 1; $('#scrollhint').style.opacity = 1;
  $$('.cluster').forEach((c, i) => setTimeout(() => c.classList.add('in'), reduce ? 0 : i * 80));
  store.set('bp-intro', '1');
}
function playIntro() {
  const paths = $$('#sigmask path');
  if (reduce || store.get('bp-intro')) { finishIntro(); return; }
  const SPEED = 3.6; // pen speed: bigger = faster signature
  let t = 250;
  paths.forEach(p => {
    const L = p.getTotalLength();
    p.style.strokeDasharray = L; p.style.strokeDashoffset = L;
    const d = Math.max(60, L / SPEED);
    p.animate([{ strokeDashoffset: L }, { strokeDashoffset: 0 }], { duration: d, delay: t, fill: 'forwards', easing: 'cubic-bezier(.35,.1,.45,1)' });
    t += d + 20; // tiny pen lift between strokes
  });
  setTimeout(finishIntro, t + 150);
}
$('#hero').addEventListener('click', () => { if (!introDone) finishIntro(); }, true);
addEventListener('keydown', e => { if (!introDone && (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter')) finishIntro(); });

/* =====================================================================
   NAVIGATION + ERASER WIPE
   ===================================================================== */
let current = null;
const validKey = k => k === 'home' || SECTIONS.some(s => s.key === k);
function keyFromHash() { const k = location.hash.replace(/^#\/?/, ''); return validKey(k) ? k : 'home'; }

function wipe(then) {
  if (reduce) { then(); return; }
  const w = $('#wipe'), cov = $('.cover', w), er = $('.eraser', w);
  const W = w.clientWidth, H = w.clientHeight, D = 560, t0 = performance.now();
  w.style.visibility = 'visible';
  let done = false;
  (function step(now) {
    const k = Math.min(1, (now - t0) / D), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    cov.style.clipPath = `inset(0 ${100 - e * 100}% 0 0)`;
    er.style.left = (e * W - 60) + 'px';
    er.style.top = (H * .5 + Math.sin(k * Math.PI * 6) * H * .32 - 31) + 'px';
    if (k < 1) return requestAnimationFrame(step);
    if (done) return; done = true; then();
    cov.style.transition = 'opacity .35s'; cov.style.opacity = 0; er.style.left = (W + 40) + 'px';
    setTimeout(() => { w.style.visibility = 'hidden'; cov.style.transition = ''; cov.style.opacity = 1; cov.style.clipPath = 'inset(0 100% 0 0)'; er.style.left = '-160px'; }, 380);
  })(t0);
}
function render(key) {
  $$('.view').forEach(v => { const on = v.id === 'v-' + key; v.hidden = !on; v.classList.toggle('shown', on); });
  $$('#tray .mk').forEach(m => m.dataset.go === key ? m.setAttribute('aria-current', 'page') : m.removeAttribute('aria-current'));
  $$('.cluster').forEach(c => c.classList.remove('play'));
  $('#board').scrollTop = 0;
  const sec = SECTIONS.find(s => s.key === key);
  document.title = sec ? `${sec.label} | Bran Peterson` : 'Bran Peterson | Illustrator, Animator, Art Teacher';
  current = key;
  if (key !== 'home') $('#board').focus({ preventScroll: true });
}
function go(key) {
  if (key === current) { $('#board').scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); return; }
  wipe(() => render(key));
}
addEventListener('hashchange', () => go(keyFromHash()));
$('#board').addEventListener('scroll', () => document.body.classList.toggle('scrolled', $('#board').scrollTop > 60), { passive: true });

const BIT = { about: 700, illustrations: 650, animations: 600, teaching: 650, contact: 550 };
document.addEventListener('click', e => {
  const a = e.target.closest('[data-go]'); if (!a) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey) return;
  const key = a.dataset.go;
  // draw mode: markers pick a pen color, eraser clears
  if (document.body.classList.contains('drawing') && a.classList.contains('mk')) {
    e.preventDefault();
    if (a.classList.contains('er')) { clearInk(); toast('board wiped clean'); }
    else { pen = a.dataset.color; $$('#tray .mk').forEach(m => m.classList.toggle('on', m === a)); }
    return;
  }
  e.preventDefault();
  const target = key === 'home' ? '#' : '#' + key;
  const navigate = () => { if (location.hash === target || (key === 'home' && !location.hash)) go(key); else location.hash = target; };
  if (a.classList.contains('cluster') && !reduce) {
    if (touch && !a.classList.contains('play')) { $$('.cluster').forEach(c => c.classList.remove('play')); a.classList.add('play'); return; }
    a.classList.add('play'); setTimeout(navigate, BIT[key] || 500); return;
  }
  navigate();
});

/* =====================================================================
   LIGHTBOX (illustrations, classroom photos, student work)
   ===================================================================== */
const LB = {
  ill: () => S.illustrations.items.map((p, i) => ({ html: art(p, 'square', '', PENCIL, true), title: p.title, meta: [p.medium, p.year].filter(Boolean), note: p.note,
    process: hasProcess(p) ? p.process.filter(x => x.image) : [], final: p.image, hidden: $(`#gallery .item:nth-child(${i + 1})`)?.hidden })),
  class: () => S.teaching.classroom.map(c => ({ html: art(c, 'square', 'classroom photo', CAMERA, true), title: c.caption, meta: ['In the classroom'] })),
  student: () => S.teaching.studentWork.map(w => ({ html: art(w, 'square', 'student work', PENCIL, true), title: w.caption, meta: ['Student work'] })),
  proj: p => S.teaching.projects[p].images.map(x => ({ html: art(x, 'square', 'project photo', CAMERA, true), title: x.caption || S.teaching.projects[p].title,
    meta: [S.teaching.projects[p].title, S.teaching.projects[p].grade].filter(Boolean) })),
};
let lbList = [], lbIdx = 0, lbReturn = null;

/* ---- process rewind ----
   process: [] in content.js lists steps in the order Bran made them (first sketch first).
   The lightbox shows them newest to oldest, so you "rewind" from the finished piece. */
let rwTimer = null, rwState = 'final';
function stopRewind(resetImage) {
  clearTimeout(rwTimer); rwTimer = null;
  const sh = $('#lbsheet'); sh.classList.remove('rewinding', 'rewound'); sh.style.removeProperty('--jx');
  $('#rwplaytxt').innerHTML = '&#9664;&#9664; watch it rewind'; rwState = 'final';
  const it = lbList[lbIdx];
  if (resetImage && it && it.final) { const img = $('#lbart img'); if (img) img.src = it.final; }
}
function playRewind(forward) {
  const it = lbList[lbIdx]; if (!it || !it.process.length) return;
  const steps = [{ image: it.final, label: 'finished' }, ...it.process.slice().reverse()];
  if (forward) steps.reverse();
  const sh = $('#lbsheet'), img = $('#lbart img'), vhs = $('#vhs');
  clearTimeout(rwTimer); sh.classList.remove('rewound'); sh.classList.add('rewinding');
  steps.forEach(s => { const pre = new Image(); pre.src = s.image; });
  let k = 0;
  const tick = () => {
    const st = steps[k];
    vhs.innerHTML = (forward ? '&#9654;&#9654; ' : '&#9664;&#9664; ') + esc(st.label || '');
    if (reduce) img.src = st.image;
    else { img.style.opacity = 0; setTimeout(() => { img.src = st.image; img.style.opacity = 1; sh.style.setProperty('--jx', (Math.random() * 6 - 3) + 'px'); }, 140); }
    k++;
    if (k < steps.length) rwTimer = setTimeout(tick, reduce ? 1200 : 900);
    else rwTimer = setTimeout(() => {
      sh.classList.remove('rewinding'); sh.style.removeProperty('--jx');
      if (forward) { sh.classList.remove('rewound'); rwState = 'final'; $('#rwplaytxt').innerHTML = '&#9664;&#9664; watch it rewind'; }
      else { sh.classList.add('rewound'); vhs.textContent = 'where it started'; rwState = 'start'; $('#rwplaytxt').innerHTML = '&#9654; play it forward'; }
    }, 700);
  };
  tick();
}
function buildRewind(it) {
  const box = $('#rewind');
  if (!it.process.length) { box.hidden = true; box.innerHTML = ''; return; }
  const back = it.process.slice().reverse(), n = back.length;
  box.innerHTML = `<header class="rwhead"><h3 class="mh">Rewinding ${esc(it.title.length > 48 ? 'this piece' : it.title)}</h3><p>From the finished piece back to where it started.</p></header>`
    + back.map((p, i) => `<figure class="rstep" style="--c:${PINS[i % 5]}"><span class="rcount">&#9664;&#9664; ${i + 1} of ${n} back</span>
        <span class="rlabel">${esc(p.label || 'step ' + (n - i))}</span>${p.note ? `<span class="rnote">${esc(p.note)}</span>` : ''}
        <div class="sheet" style="transform:rotate(${tilt(i, .5)}deg)"><span class="mag" style="--c:${PINS[(i + 2) % 5]}"></span><img src="${esc(p.image)}" alt="${esc((p.label || 'Process step') + ', ' + it.title)}" loading="lazy" decoding="async"></div></figure>`).join('')
    + `<div class="rend"><p class="mh">where it all started</p><button type="button" id="rwtop">&uarr; back to the finished piece</button></div>`;
  box.hidden = false;
  $('#rwtop').onclick = () => $('#lbscroll').scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
}
function lbShow(i) {
  stopRewind(false);
  const n = lbList.length; lbIdx = (i + n) % n;
  const it = lbList[lbIdx];
  $('#lbart').innerHTML = it.html;
  $('#lbinfo').innerHTML = `<span class="mag" style="--c:var(--ink)"></span>${esc(it.title)}${it.meta.length ? '<br><br>' + it.meta.map(esc).join('<br>') : ''}${it.note ? `<span class="note">${esc(it.note)}</span>` : ''}<small>${lbIdx + 1} / ${n}</small>`;
  const proc = it.process || [];
  $('#rwbar').hidden = !proc.length;
  if (proc.length) $('#rwdowntxt').innerHTML = `rewind the process<br><small>${proc.length} step${proc.length > 1 ? 's' : ''} back to the first sketch</small>`;
  buildRewind({ ...it, process: proc });
  $('#lbscroll').scrollTop = 0;
}
function lbOpen(group, i, p) {
  const all = group === 'proj' ? LB.proj(p) : LB[group]();
  lbList = all.filter(x => !x.hidden); const pos = lbList.indexOf(all[i]);
  lbReturn = document.activeElement; $('#lb').hidden = false; lbShow(pos < 0 ? 0 : pos); $('#lbx').focus();
}
function lbClose() { stopRewind(false); $('#lb').hidden = true; lbReturn && lbReturn.focus(); }
$('#board').addEventListener('click', e => { const b = e.target.closest('[data-lb]'); if (b) lbOpen(b.dataset.lb, +b.dataset.i, +b.dataset.p); });
$('#lbprev').onclick = () => lbShow(lbIdx - 1);
$('#lbnext').onclick = () => lbShow(lbIdx + 1);
$('#lbx').onclick = lbClose;
$('#rwdown').onclick = () => {
  const sc = $('#lbscroll'), head = $('#rewind .rwhead'); if (!head) return;
  const top = head.getBoundingClientRect().top - sc.getBoundingClientRect().top + sc.scrollTop - 40;
  sc.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
};
$('#rwplay').onclick = () => { if (rwTimer) { stopRewind(true); return; } playRewind(rwState === 'start'); };
$('#lb').addEventListener('click', e => { if (e.target.id === 'lb' || e.target.classList.contains('lbmain')) lbClose(); });
addEventListener('keydown', e => {
  if ($('#lb').hidden) return;
  if (e.key === 'Escape') lbClose();
  if (e.key === 'ArrowLeft') lbShow(lbIdx - 1);
  if (e.key === 'ArrowRight') lbShow(lbIdx + 1);
});

/* =====================================================================
   DRAW MORE! (visitors doodle on the board)
   ===================================================================== */
const cv = $('#ink'), ctx = cv.getContext('2d');
let pen = '#2F5BD3', drawing = false, last = null;
function sizeInk() {
  const r = cv.getBoundingClientRect(), d = devicePixelRatio || 1;
  const keep = cv.width ? ctx.getImageData(0, 0, cv.width, cv.height) : null;
  cv.width = Math.round(r.width * d); cv.height = Math.round(r.height * d); ctx.setTransform(d, 0, 0, d, 0, 0);
  if (keep) ctx.putImageData(keep, 0, 0);
}
function clearInk() { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height); ctx.restore(); }
addEventListener('resize', sizeInk);
$('#drawmore').addEventListener('click', () => {
  const on = document.body.classList.toggle('drawing');
  $('#drawmore').setAttribute('aria-pressed', on);
  $('#dmtxt').innerHTML = on ? 'done<br>drawing' : 'Draw<br>more!';
  if (on) { sizeInk(); toast('pick a marker below and draw! the eraser wipes it'); }
  $$('#tray .mk').forEach(m => m.classList.toggle('on', on && m.dataset.color === pen && !m.classList.contains('er')));
});
const pos = e => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
cv.addEventListener('pointerdown', e => { drawing = true; last = pos(e); cv.setPointerCapture(e.pointerId); });
cv.addEventListener('pointermove', e => {
  if (!drawing) return; const p = pos(e);
  ctx.strokeStyle = pen; ctx.lineWidth = 5 + (e.pressure || .5) * 3; ctx.lineCap = ctx.lineJoin = 'round'; ctx.globalAlpha = .92;
  ctx.beginPath(); ctx.moveTo(...last); ctx.lineTo(...p); ctx.stroke(); last = p;
});
addEventListener('pointerup', () => drawing = false);

/* =====================================================================
   MARKER CURSOR in each section's color
   ===================================================================== */
function cursorFor(color) {
  const c = encodeURIComponent(color);
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Cpolygon points='2,30 6,22 26,2 30,6 10,26' fill='%23F4F5F6' stroke='%239AA0A6'/%3E%3Cpolygon points='2,30 6,22 10,26' fill='${c}'/%3E%3C/svg%3E") 2 30, pointer`;
}
function applyCursors() {
  if (touch) return;
  $$('[data-go]').forEach(el => { const s = SECTIONS.find(s => s.key === el.dataset.go); el.style.cursor = cursorFor(s ? s.color : '#1E1F24'); });
}

/* =====================================================================
   BOOT
   ===================================================================== */
fillTexts();
buildChrome();
buildSignature();
buildPreviews();
buildIllustrations();
buildAnimations();
buildTeaching();
buildAbout();
buildContact();
applyCursors();
render(keyFromHash());
if (current === 'home') playIntro(); else finishIntro();
})();
