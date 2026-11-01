(function () {
  const app = document.getElementById('app');
  const topbar = document.getElementById('topbar');
  const drawer = document.getElementById('drawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const drawerNav = document.getElementById('drawerNav');
  const pages = window.GuideData.pages;

  const BOTTOM = {
    home: 'home', cover: 'home', toc: 'home', today: 'home',
    plan: 'plan', days: 'plan', overview: 'plan', cruise: 'plan',
    day23: 'plan', day24: 'plan', day25: 'plan', day26: 'plan', day27: 'plan',
    day28: 'plan', day29: 'plan',
    places: 'places', food: 'places', cafes: 'places',
    more: 'more', practical: 'more', booking: 'more', transport: 'more',
    tips: 'more', budget: 'more', packing: 'more', shopping: 'more', backup: 'more', tours: 'more', must: 'more',
    events: 'more', baths: 'more'
  };

  const BACK = {
    overview: { href: '#plan', label: 'План' },
    cruise: { href: '#plan', label: 'План' },
    day23: { href: '#plan', label: 'План' },
    day24: { href: '#plan', label: 'План' },
    day25: { href: '#plan', label: 'План' },
    day26: { href: '#plan', label: 'План' },
    day27: { href: '#plan', label: 'План' },
    day28: { href: '#plan', label: 'План' },
    day29: { href: '#plan', label: 'План' },
    booking: { href: '#more', label: 'Ещё' },
    packing: { href: '#more', label: 'Ещё' },
    transport: { href: '#more', label: 'Ещё' },
    tips: { href: '#more', label: 'Ещё' },
    budget: { href: '#more', label: 'Ещё' },
    backup: { href: '#more', label: 'Ещё' },
    tours: { href: '#more', label: 'Ещё' },
    must: { href: '#more', label: 'Ещё' },
    shopping: { href: '#more', label: 'Ещё' },
    events: { href: '#more', label: 'Ещё' },
    baths: { href: '#more', label: 'Ещё' },
    food: { href: '#places', label: 'Места' },
    cafes: { href: '#places', label: 'Места' },
    today: { href: '#home', label: 'Главная' }
  };

  let placesFilter = 'all';

  function backBar(id) {
    const b = BACK[id];
    if (!b) return '';
    return `<a class="back-link" href="${b.href}">← ${b.label}</a>`;
  }

  drawerNav.innerHTML = window.GuideData.nav.map((group) => `
    <p class="drawer-group">${group.group}</p>
    ${group.items.map((n) =>
      `<a href="${n.href}">${n.label}<span>${n.sub}</span></a>`
    ).join('')}
  `).join('');

  function openDrawer(open) {
    drawer.classList.toggle('open', open);
    backdrop.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  document.getElementById('menuBtn').addEventListener('click', () => openDrawer(true));
  document.getElementById('drawerClose').addEventListener('click', () => openDrawer(false));
  backdrop.addEventListener('click', () => openDrawer(false));
  drawerNav.addEventListener('click', (e) => {
    if (e.target.closest('a')) openDrawer(false);
  });

  window.addEventListener('scroll', () => {
    topbar.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });

  function bindInteractions() {
    document.querySelectorAll('.tabs').forEach((tabs) => {
      tabs.querySelectorAll('.tab').forEach((tab) => {
        tab.addEventListener('click', () => {
          const id = tab.dataset.tab;
          tabs.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
          tab.classList.add('active');
          const section = tabs.parentElement;
          section.querySelectorAll('.tab-panel').forEach((p) => {
            p.classList.toggle('active', p.id === id);
          });
        });
      });
    });

    document.querySelectorAll('.check-item').forEach((item) => {
      const key = 'pq-check-' + item.dataset.check;
      const input = item.querySelector('input');
      input.checked = localStorage.getItem(key) === '1';
      item.classList.toggle('done', input.checked);
      input.addEventListener('change', () => {
        localStorage.setItem(key, input.checked ? '1' : '0');
        item.classList.toggle('done', input.checked);
      });
    });

    document.querySelectorAll('[data-embed-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.embedToggle;
        const box = document.getElementById('embed-' + id);
        if (!box) return;
        const open = box.hasAttribute('hidden');
        box.toggleAttribute('hidden', !open);
        btn.textContent = open ? '✕ Скрыть карту' : '🗺 На карте';
        btn.classList.toggle('active', open);
      });
    });

    document.querySelectorAll('[data-place-filter]').forEach((chip) => {
      chip.addEventListener('click', () => {
        placesFilter = chip.dataset.placeFilter;
        render('places', { keepScroll: false });
      });
    });

    document.querySelectorAll('[data-scroll-to]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const el = document.getElementById(btn.dataset.scrollTo);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function render(route, opts = {}) {
    let id = pages[route] ? route : 'home';
    if (route === 'cover' || route === 'toc') id = 'home';
    if (route === 'days' || route === 'practical') id = route === 'days' ? 'plan' : 'more';

    let html;
    if (id === 'places') html = pages.places(placesFilter);
    else html = pages[id]();

    if (/^day\d{2}$/.test(id)) {
      // Bar must be a direct child of .day-page (not inside .day-head),
      // otherwise sticky dies when the short header scrolls away.
      const dayNum = Number(id.slice(3));
      const nextHref = dayNum < 29 ? `#day${dayNum + 1}` : '';
      html = html.replace(
        /(<section class="section wrap day-page">)\s*<header class="day-head">\s*<h1>([\s\S]*?)<\/h1>/,
        (_, section, title) => `${section}
    <div class="day-head-bar">
      <a class="day-back" href="#plan" aria-label="К плану">←</a>
      <h1>${title.trim()}</h1>
      ${nextHref ? `<a class="day-next" href="${nextHref}" aria-label="Следующий день">→</a>` : ''}
    </div>
    <header class="day-head">`
      );
    } else {
      const back = backBar(id);
      if (back) {
        html = html.replace(
          /(<section class="section wrap(?: day-page)?">)/,
          `$1\n    <div class="page-back-bar">${back}</div>`
        );
      }
    }

    app.innerHTML = html + `<p class="footer-note">Prague, одна, 23 по 29 ноября</p>`;
    document.body.classList.toggle('cover-mode', false);
    document.body.classList.toggle('home-page', id === 'home');
    document.querySelectorAll('.bottom-nav a').forEach((a) => {
      a.classList.toggle('active', a.dataset.nav === (BOTTOM[id] || 'home'));
    });
    if (!opts.keepScroll) window.scrollTo(0, 0);
    topbar.classList.toggle('scrolled', window.scrollY > 8);
    bindInteractions();
  }

  function currentRoute() {
    return (location.hash || '#home').replace(/^#/, '') || 'home';
  }

  window.addEventListener('hashchange', () => {
    const r = currentRoute();
    if (r !== 'places') placesFilter = 'all';
    render(r);
  });
  render(currentRoute());
})();
