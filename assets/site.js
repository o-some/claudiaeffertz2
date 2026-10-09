const base = new URL('../', document.currentScript.src);
const link = path => new URL(path, base).pathname;
const nav = [
  ['leistungen/', 'Beratung'],
  ['weiterbildung/', 'Weiterbildung'],
  ['beraterverbund/qualitaetsgesicherte-partner/', 'Netzwerk'],
  ['leistungen/referenzen-praxisbeispiele/', 'Projekte'],
  ['impulse/', 'Impulse & Buch'],
  ['ueber-uns/', 'Über uns']
];
const page = document.body.dataset.page || '';
document.querySelector('#site-header').innerHTML = `<div class="header-inner"><a class="brand" href="${link('')}" aria-label="GesundeUnternehmen Startseite"><span class="brand-mark">G</span><span class="brand-text">GesundeUnternehmen<span>Beratung · Netzwerk · Umsetzung</span></span></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav">Menü</button><nav class="nav" id="main-nav" aria-label="Hauptnavigation">${nav.map(([href,label]) => `<a href="${link(href)}" ${page === href ? 'aria-current="page"' : ''}>${label}</a>`).join('')}<a class="nav-cta" href="${link('kontakt/')}">Projekt besprechen <svg class="arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 19 19 5M9 5h10v10"/></svg></a></nav></div>`;
document.querySelector('#site-footer').innerHTML = `<div class="container"><div class="footer-grid"><div><a class="brand" href="${link('')}" style="color:#fff"><span class="brand-mark">G</span><span class="brand-text">GesundeUnternehmen<span>Beratung · Netzwerk · Umsetzung</span></span></a><p>Veränderung gesund gestalten.<br>Gemeinsam ins Handeln kommen.</p></div><div><span class="eyebrow">Entdecken</span><a href="${link('leistungen/')}">Leistungen</a><a href="${link('beraterverbund/qualitaetsgesicherte-partner/')}">Partnernetzwerk</a><a href="${link('leistungen/referenzen-praxisbeispiele/')}">Projekte & Referenzen</a><a href="${link('weiterbildung/')}">Weiterbildung</a><a href="${link('impulse/')}">Buch & Impulse</a></div><div><span class="eyebrow">Kontakt</span><a href="${link('kontakt/')}">Projektanfrage</a><a href="mailto:office@gesundeunternehmen.com">office@gesundeunternehmen.com</a><a href="tel:+4962518691179">+49 6251 8691179</a><a href="${link('impressum/')}">Impressum</a><a href="${link('datenschutz/')}">Datenschutz</a></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} GesundeUnternehmen · Claudia Effertz</span><span>Beratung mit Klarheit. Umsetzung mit Menschen.</span></div></div>`;
const menuButton = document.querySelector('.menu-toggle');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  document.querySelector('#main-nav').classList.toggle('open', open);
});
document.querySelectorAll('#main-nav a').forEach(a => a.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  document.querySelector('#main-nav').classList.remove('open');
}));
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  document.querySelectorAll('main .section .line-heading, main .section .feature-grid > *, main .section .cards > *, main .section .image-cards > *, main .section .steps > *, main .section .people > *, main .section .cta-band > *').forEach(el => {
    el.classList.add('reveal');
    if (el.matches('.card, .image-card, .person, .step')) {
      const index = Array.prototype.indexOf.call(el.parentElement.children, el);
      el.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 110}ms`);
    }
  });
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add(entry.target.classList.contains('section--ornate') ? 'ornament-visible' : 'visible'); observer.unobserve(entry.target); }
  }), {threshold: .08, rootMargin: '0px 0px -5% 0px'});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  document.querySelectorAll('main .section--ornate').forEach(el => observer.observe(el));

  const scenes = [...document.querySelectorAll('.hero > img, .page-hero-image[data-parallax] > img, .feature-grid > .media:not(.claudia-media):not(.keynote-frame):not(.face-safe) > img, .split > .media > img')].map(img => ({element: img.parentElement, shift: 0}));
  const line = document.createElement('span');
  line.className = 'reading-line';
  line.setAttribute('aria-hidden', 'true');
  document.querySelector('#site-header').append(line);
  let scheduled = false;
  const paintScroll = () => {
    const height = innerHeight;
    let moving = false;
    scenes.forEach(scene => {
      const mobile = innerWidth <= 700;
      const eligible = mobile || !scene.element.classList.contains('media');
      scene.element.classList.toggle('scroll-media', eligible);
      if (!eligible) return;
      const box = scene.element.getBoundingClientRect();
      if (box.bottom < 0 || box.top > height) return;
      const range = scene.element.classList.contains('hero') ? (mobile ? 56 : 80) : scene.element.classList.contains('page-hero-image') ? (mobile ? 42 : 70) : (mobile ? 40 : 60);
      const scale = parseFloat(getComputedStyle(scene.element).getPropertyValue('--parallax-scale'));
      const limit = Math.min(range, Math.max(0, box.height * (scale - 1) / 2 - 3));
      const target = Math.max(-limit, Math.min(limit, (height / 2 - box.top - box.height / 2) * .16));
      scene.shift += (target - scene.shift) * .12;
      if (Math.abs(target - scene.shift) < .1) scene.shift = target;
      else moving = true;
      scene.element.style.setProperty('--scroll-shift', `${scene.shift.toFixed(1)}px`);
    });
    const travel = document.documentElement.scrollHeight - height;
    line.style.transform = `scaleX(${travel > 0 ? Math.max(0, Math.min(1, scrollY / travel)) : 0})`;
    scheduled = false;
    if (moving) requestPaint();
  };
  const requestPaint = () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(paintScroll); }
  };
  addEventListener('scroll', requestPaint, {passive: true});
  addEventListener('resize', requestPaint);
  requestPaint();
} else document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
const topics = document.querySelectorAll('[data-topic]');
const topicResult = document.querySelector('#topic-result');
if (topics.length && topicResult) {
  const answers = {
    fuehrung: 'Führung und Zusammenarbeit brauchen Orientierung, klare Rollen und Raum für echte Gespräche.',
    team: 'Wir klären Spannungen, verbinden Perspektiven und machen Teams wieder handlungsfähig.',
    gesundheit: 'Gesundheit im Unternehmen gelingt, wenn Bedingungen und Verhalten gemeinsam betrachtet werden.',
    projekt: 'Aus einer Idee wird ein tragfähiges Vorhaben, wenn Menschen, Fachwissen und Umsetzung zusammenfinden.'
  };
  topics.forEach(button => button.addEventListener('click', () => {
    topics.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    topicResult.textContent = answers[button.dataset.topic];
  }));
}
