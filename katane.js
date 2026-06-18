/* ═══════════════════════════════════════════
   KATANÉ PIZZA — JS COMPARTIDO
   Usar en todas las páginas:
   <script src="katane.js"></script>
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV SCROLL ──────────────────────────── */
  const nav = document.getElementById('nav');
  const topbar = document.getElementById('topbar');
  if (nav) {
    const esHero = nav.classList.contains('nav-hero');
    window.addEventListener('scroll', () => {
      const paso = scrollY > 60;
      if (topbar) topbar.classList.toggle('oculta', paso);
      nav.classList.toggle('sin-topbar', paso);
      if (esHero) nav.classList.toggle('scrolled', paso);
    }, { passive: true });
  }

  /* ── HAMBURGUESA ─────────────────────────── */
  const hb = document.getElementById('hambBtn');
  const mv = document.getElementById('mm');
  if (hb && mv) {
    hb.addEventListener('click', () => {
      const o = mv.classList.toggle('open');
      hb.classList.toggle('open', o);
      hb.setAttribute('aria-expanded', String(o));
      document.body.style.overflow = o ? 'hidden' : '';
    });
    document.querySelectorAll('.lm').forEach(a => a.addEventListener('click', () => {
      mv.classList.remove('open');
      hb.classList.remove('open');
      hb.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }));
  }

  /* ── SCROLL REVEAL ───────────────────────── */
  const obs = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); }
  }), { threshold: .08, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('.rv,.rl,.rr').forEach(el => obs.observe(el));

  /* ── TABS MENÚ ───────────────────────────── */
  document.querySelectorAll('.mtab').forEach(t => t.addEventListener('click', () => {
    document.querySelectorAll('.mtab').forEach(x => { x.classList.remove('on'); x.setAttribute('aria-selected', 'false'); });
    document.querySelectorAll('.mpanel').forEach(p => p.classList.remove('on'));
    t.classList.add('on'); t.setAttribute('aria-selected', 'true');
    const p = document.getElementById('tab-' + t.dataset.tab);
    if (p) p.classList.add('on');
  }));

  /* ── SCROLL SUAVE ────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return; e.preventDefault();
    window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 68, behavior: 'smooth' });
  }));

  /* ── MARCAR ENLACE ACTIVO EN NAV ─────────── */
  const pagina = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === pagina || (pagina === '' && href === 'index.html')) {
      a.classList.add('activo');
    }
  });

});
