const base = new URL('../', document.currentScript.src);
const link = path => new URL(path, base).pathname;
const nav = [
  ['leistungen/', 'Beratung & Begleitung'],
  ['weiterbildung/', 'Keynotes & Weiterbildung'],
  ['beraterverbund/qualitaetsgesicherte-partner/', 'Umsetzungsnetzwerk'],
  ['impulse/', 'Impulse & Buch'],
  ['ueber-uns/', 'Über uns']
];
const page = document.body.dataset.page || '';
document.querySelector('#site-header').innerHTML = `<div class="header-inner"><a class="brand" href="${link('')}" aria-label="GesundeUnternehmen Startseite"><span class="brand-mark">G</span><span class="brand-text">GesundeUnternehmen<span>Beratung · Netzwerk · Umsetzung</span></span></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav">Menü</button><nav class="nav" id="main-nav" aria-label="Hauptnavigation">${nav.map(([href,label]) => `<a href="${link(href)}" ${page === href ? 'aria-current="page"' : ''}>${label}</a>`).join('')}<a class="nav-cta" href="${link('kontakt/')}">Projekt besprechen ↗</a></nav></div>`;
document.querySelector('#site-footer').innerHTML = `<div class="container"><div class="footer-grid"><div><a class="brand" href="${link('')}" style="color:#fff"><span class="brand-mark">G</span><span class="brand-text">GesundeUnternehmen<span>Beratung · Netzwerk · Umsetzung</span></span></a><p>Veränderung gesund gestalten.<br>Gemeinsam ins Handeln kommen.</p></div><div><span class="eyebrow">Entdecken</span><a href="${link('leistungen/')}">Leistungen</a><a href="${link('beraterverbund/qualitaetsgesicherte-partner/')}">Partnernetzwerk</a><a href="${link('weiterbildung/')}">Weiterbildung</a><a href="${link('impulse/')}">Buch & Impulse</a></div><div><span class="eyebrow">Kontakt</span><a href="${link('kontakt/')}">Projektanfrage</a><a href="mailto:office@gesundeunternehmen.com">office@gesundeunternehmen.com</a><a href="tel:+4962518691179">+49 6251 8691179</a><a href="${link('impressum/')}">Impressum</a><a href="${link('datenschutz/')}">Datenschutz</a></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} GesundeUnternehmen · Claudia Effertz</span><span>Beratung mit Klarheit. Umsetzung mit Menschen.</span></div></div>`;
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
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), {threshold: .08});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
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
