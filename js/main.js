const state = {
  lang: 'pt',
  activeChapter: 0,
  scrollP: 0,
  targetRot: 0,
  currentRot: 0
};

const mouse = { x: -9999, y: -9999, ax: -9999, ay: -9999 };

let revealObserver = null;
let carouselFaces = null;
let animationId = null;

const $ = (id) => document.getElementById(id);
const t = () => CONTENT[state.lang];
const d = () => DATA[state.lang];

function renderAll() {
  const c = t();
  const set = d();

  $('navStack').textContent = c.nav.stack;
  $('navProjects').textContent = c.nav.projects;
  $('navJourney').textContent = c.nav.journey;
  $('navContact').textContent = c.nav.contact;

  $('ptBtn').classList.toggle('is-active', state.lang === 'pt');
  $('enBtn').classList.toggle('is-active', state.lang === 'en');

  $('faceLive').textContent = c.face.live;
  $('faceRole').textContent = c.face.role;
  $('hintText').textContent = c.hint;

  $('releaseKicker').textContent = c.release.kicker;
  $('releaseTitle').innerHTML = `${c.release.title1} <span class="text-gradient">${c.release.title2}</span>`;
  $('releaseBody').textContent = c.release.body;
  $('releaseCta1').textContent = c.release.cta1;
  $('releaseCta2').textContent = c.release.cta2;

  $('stackKicker').textContent = c.stackS.kicker;
  $('stackTitle').textContent = c.stackS.title;
  $('stackSub').textContent = c.stackS.sub;

  $('techGrid').innerHTML = set.techs.map((tech) => `
    <article class="tech-card" data-reveal data-tilt>
      <span class="tech-card__cat">${tech.cat}</span>
      <span class="tech-card__name">${tech.name}</span>
      <span class="tech-card__glyph">${tech.glyph}</span>
    </article>
  `).join('');

  $('projectsKicker').textContent = c.projects.kicker;
  $('projectsTitle').textContent = c.projects.title;
  $('projectsSub').textContent = c.projects.sub;

  $('projectsGrid').innerHTML = set.projects.map((p) => `
    <article class="project-card" data-reveal data-tilt>
      <div class="project-card__shot">
        <span class="project-card__shot-label">${p.shot}</span>
        <span class="project-card__num">${p.n}</span>
      </div>
      <div class="project-card__body">
        <h3 class="project-card__title">${p.title}</h3>
        <p class="project-card__desc">${p.desc}</p>
        <div class="project-card__tags">
          ${p.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="project-card__links">
          <span class="c-acc">${c.projects.demo} ↗</span>
          <span class="c-muted">${c.projects.code} ↗</span>
        </div>
      </div>
    </article>
  `).join('');

  $('journeyKicker').textContent = c.journey.kicker;
  $('journeyTitle').textContent = c.journey.title;

  $('journeyList').innerHTML = set.journey.map((j) => `
    <div class="timeline__item" data-reveal>
      <span class="timeline__dot"></span>
      <div class="timeline__when">${j.when}</div>
      <h3 class="timeline__role">${j.role} <span class="timeline__place">· ${j.place}</span></h3>
      <p class="timeline__desc">${j.desc}</p>
    </div>
  `).join('');

  $('contactKicker').textContent = c.contact.kicker;
  $('contactTitle').textContent = c.contact.title;
  $('contactText').textContent = c.contact.text;
  $('builtWith').textContent = c.contact.built;

  $('faceTechGrid').innerHTML = set.faceTechs.map((tech) => `
    <div class="face-tech"><span class="face-tech__dot" style="--dot:${tech.color}"></span>${tech.name}</div>
  `).join('');

  renderChapters();
  initTilt();

  if (revealObserver) {
    document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => revealObserver.observe(el));
  }
}

function renderChapters() {
  const chapters = t().chapters;

  $('chaptersContainer').innerHTML = chapters.map((c, i) => `
    <div class="chapter${i === state.activeChapter ? ' is-active' : ''}">
      <span class="pill chapter__kicker">
        <span>0${c.num}</span>
        <span class="pill__dot pill__dot--sm"></span>
        <span>${c.kicker}</span>
      </span>
      <h2 class="chapter__title">${c.title}</h2>
      <p class="chapter__body">${c.body}</p>
    </div>
  `).join('');

  $('chapterPips').innerHTML = chapters.map((c, i) => `
    <div class="pip${i === state.activeChapter ? ' is-active' : ''}">
      <span class="pip__bar"></span>
      <span>0${c.num} / ${c.label}</span>
    </div>
  `).join('');
}

function updateActiveChapter() {
  const chapters = $('chaptersContainer').children;
  const pips = $('chapterPips').children;
  for (let i = 0; i < chapters.length; i++) {
    chapters[i].classList.toggle('is-active', i === state.activeChapter);
  }
  for (let i = 0; i < pips.length; i++) {
    pips[i].classList.toggle('is-active', i === state.activeChapter);
  }
}

function toggleLang() {
  state.lang = state.lang === 'pt' ? 'en' : 'pt';
  renderAll();
}

function tickScroll() {
  const stage = $('top');
  const overlay = $('stageOverlay');
  if (!stage || !overlay) return;

  const rect = stage.getBoundingClientRect();
  const vh = window.innerHeight;
  const range = stage.offsetHeight - vh;
  const past = -rect.top;

  let ty = 0;
  if (past < 0) ty = -past;
  else if (past > range) ty = range - past;
  overlay.style.transform = `translateY(${ty}px)`;
  overlay.style.pointerEvents = (past > range + vh || past < -vh) ? 'none' : 'auto';

  const p = range > 0 ? Math.min(1, Math.max(0, past / range)) : 0;
  state.scrollP = p;
  state.targetRot = p * 270;

  const sc = document.scrollingElement || document.documentElement;
  const max = (sc.scrollHeight - sc.clientHeight) || 1;
  const pageP = Math.min(1, Math.max(0, sc.scrollTop / max));
  $('progressBar').style.width = (pageP * 100) + '%';

  const newActive = Math.min(3, Math.max(0, Math.round(p * 3)));
  if (newActive !== state.activeChapter) {
    state.activeChapter = newActive;
    updateActiveChapter();
  }

  const hint = $('scrollHint');
  if (hint) hint.style.opacity = p > 0.05 ? '0' : '1';
}

function animateCarousel() {
  tickScroll();
  state.currentRot += (state.targetRot - state.currentRot) * 0.4;

  const car = $('carousel');
  if (car) {
    car.style.transform = `rotateX(-6deg) rotateY(${-state.currentRot}deg)`;
    if (!carouselFaces) carouselFaces = car.querySelectorAll('[data-face]');

    const r = ((state.currentRot % 360) + 360) % 360;
    carouselFaces.forEach((el, i) => {
      let diff = Math.abs(((r - i * 90 + 540) % 360) - 180);
      diff = 180 - diff;
      const visible = Math.max(0, Math.min(1, diff / 110));
      el.style.opacity = visible.toFixed(3);
      el.style.pointerEvents = visible > 0.5 ? 'auto' : 'none';
    });
  }

  animationId = requestAnimationFrame(animateCarousel);
}

function initReveal() {
  const all = () => document.querySelectorAll('[data-reveal]');

  if (!('IntersectionObserver' in window)) {
    all().forEach((el) => el.classList.add('is-visible'));
    return;
  }

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const sibs = Array.from(el.parentElement ? el.parentElement.querySelectorAll(':scope > [data-reveal]') : [el]);
      el.style.transitionDelay = (Math.max(0, sibs.indexOf(el)) * 70) + 'ms';
      el.classList.add('is-visible');
      revealObserver.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  all().forEach((el) => revealObserver.observe(el));
}

function initTilt() {
  document.querySelectorAll('[data-tilt]').forEach((card) => {
    card.onmousemove = (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transition = 'transform .12s ease, border-color .3s, box-shadow .3s';
      card.style.transform = `perspective(800px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateY(-4px)`;
    };
    card.onmouseleave = () => {
      card.style.transition = 'transform .4s ease, border-color .3s, box-shadow .3s';
      card.style.transform = 'perspective(800px) rotateY(0) rotateX(0)';
    };
  });
}

function applyResponsive() {
  const grid = $('stageGrid');
  const car = $('carousel');
  const navLinks = $('navLinks');
  const nav = $('mainNav');
  if (!grid || !car) return;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const mobile = vw <= 760;
  const narrow = vw <= 1024;

  if (navLinks) navLinks.style.display = mobile ? 'none' : 'flex';
  if (nav) nav.style.padding = mobile ? '9px clamp(16px,4vw,56px)' : '18px clamp(20px,5vw,56px)';
  const navH = nav ? nav.offsetHeight : (mobile ? 54 : 70);

  const textCol = grid.children[0];
  const boxCol = grid.children[1];
  const pipsCol = grid.children[2];

  if (mobile) {
    grid.style.gridTemplateColumns = '1fr';
    grid.style.padding = (navH + 44) + 'px 22px 50px';
    grid.style.gap = '54px';
    grid.style.justifyItems = 'stretch';
    grid.style.alignContent = 'center';
    grid.style.alignItems = 'center';
    if (boxCol) boxCol.style.order = '1';
    if (textCol) {
      textCol.style.order = '2';
      textCol.style.textAlign = 'center';
      const inner = textCol.firstElementChild;
      if (inner) inner.style.minHeight = '210px';
    }
    if (pipsCol) pipsCol.style.display = 'none';
  } else {
    grid.style.gridTemplateColumns = narrow ? '1fr 1fr' : '1fr 1.1fr 1fr';
    grid.style.padding = '120px clamp(24px,6vw,80px) 80px';
    grid.style.gap = '0';
    grid.style.justifyItems = 'stretch';
    grid.style.alignContent = 'center';
    grid.style.alignItems = 'center';
    if (boxCol) boxCol.style.order = '0';
    if (textCol) {
      textCol.style.order = '0';
      textCol.style.textAlign = 'left';
      const inner = textCol.firstElementChild;
      if (inner) inner.style.minHeight = '280px';
    }
    if (pipsCol) pipsCol.style.display = narrow ? 'none' : 'block';
  }

  let w, h;
  if (mobile) { w = Math.min(300, vw * 0.78); h = Math.round(w * 1.18); }
  else { w = Math.min(360, vw * 0.38); h = Math.min(440, vh * 0.56); }
  const depth = Math.round(w * 0.72);
  car.style.width = Math.round(w) + 'px';
  car.style.height = Math.round(h) + 'px';
  car.style.setProperty('--depth', depth + 'px');
}

function initCanvas() {
  const canvas = $('bgCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const C1 = [52, 227, 212];
  const C2 = [143, 123, 255];
  const lerp = (a, b, k) => Math.round(a + (b - a) * k);
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia && window.matchMedia('(max-width: 760px)').matches;

  let w = 0, h = 0, pts = [];

  const resize = () => {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const baseDensity = isMobile ? 28000 : 17000;
    const count = Math.min(isMobile ? 40 : 80, Math.floor((w * h) / baseDensity));
    pts = [];
    for (let i = 0; i < count; i++) {
      pts.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3 });
    }
  };
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  if (reduceMotion) {
    const [R, G, B] = C1;
    for (const p of pts) {
      ctx.fillStyle = `rgba(${R},${G},${B},0.6)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
    return;
  }

  const frame = () => {
    mouse.ax += (mouse.x - mouse.ax) * 0.12;
    mouse.ay += (mouse.y - mouse.ay) * 0.12;
    const k = state.scrollP;
    const R = lerp(C1[0], C2[0], k), G = lerp(C1[1], C2[1], k), B = lerp(C1[2], C2[2], k);
    const mx = mouse.ax, my = mouse.ay;

    ctx.clearRect(0, 0, w, h);

    for (const p of pts) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      const dx = p.x - mx, dy = p.y - my;
      const d2 = dx * dx + dy * dy;
      if (d2 < 17000 && d2 > 0.01) {
        const f = (17000 - d2) / 17000 * 0.8;
        const dist = Math.sqrt(d2);
        p.x += (dx / dist) * f;
        p.y += (dy / dist) * f;
      }
    }

    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.strokeStyle = `rgba(${R},${G},${B},${(1 - dist / 130) * 0.16})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
      const dmx = pts[i].x - mx, dmy = pts[i].y - my;
      const dm = Math.sqrt(dmx * dmx + dmy * dmy);
      if (dm < 180) {
        ctx.strokeStyle = `rgba(${R},${G},${B},${(1 - dm / 180) * 0.4})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(mx, my);
        ctx.stroke();
      }
      ctx.fillStyle = `rgba(${R},${G},${B},0.75)`;
      ctx.beginPath();
      ctx.arc(pts[i].x, pts[i].y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

document.addEventListener('DOMContentLoaded', () => {
  renderAll();
  initReveal();
  initCanvas();
  applyResponsive();
  animationId = requestAnimationFrame(animateCarousel);

  window.addEventListener('scroll', tickScroll, { passive: true });
  window.addEventListener('resize', applyResponsive, { passive: true });

  tickScroll();
});
