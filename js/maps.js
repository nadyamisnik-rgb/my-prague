/* Day cards for 24-29 Nov. No typographic dashes in the copy. */
(function () {
  const gmaps = (q) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

  const routes = {
    day23: {
      title: 'Вильнюс, только ночь',
      idea: 'Ночь у вокзала. Ужин рядом и короткая дуга до собора.',
      image: '',
      imageAlt: '',
      pills: ['вокзал', 'ужин', 'ворота'],
      flow: 'Таверна, Остробрамские ворота, собор, назад спать',
      mapsAll: gmaps('Aušros vartai Vilnius')
    },
    day24: {
      title: 'Город без чемодана',
      idea: 'Ячейка на вокзале. Гуляешь до половины шестого. К ребятам к шести или семи.',
      image: 'assets/places/bus.jpg',
      imageAlt: 'Остановка линии 59 у терминала',
      pills: ['вылет 10:00', 'у них в 18 или 19'],
      flow: 'Троллейбус 59, ячейка, синий в 15:15 если успеваешь, к ребятам',
      mapsAll: gmaps('Praha hlavní nádraží luggage lockers')
    },
    day25: {
      title: 'Град, пока светло',
      idea: 'Один берег. Внутрь, если захочешь. Мост ещё при свете.',
      image: 'assets/places/castle.jpg',
      imageAlt: 'Пражский Град над мостом',
      pills: ['трамвай 22', 'левый берег'],
      flow: 'С 10:00 трамвай 22 на Град, обед на спуске, в 15:15 красный, домой к котам',
      mapsAll: gmaps('Prague Castle')
    },
    day26: {
      title: 'Четверг для глаз',
      idea: 'Функционализм утром. Кубизм и модерн днём.',
      image: 'assets/places/clock.jpg',
      imageAlt: 'Куранты на Староместской',
      pills: ['дворец с 10:00', 'один зал'],
      flow: 'Велетржный дворец, площадь, Целетна, Луцерна',
      mapsAll: gmaps('Veletržní palác Prague')
    },
    day27: {
      title: 'Вышеград и тепло',
      idea: 'Утро на крепости. После трёх уже в помещении.',
      image: 'assets/places/vysehrad.jpg',
      imageAlt: 'Базилика на Вышеграде',
      pills: ['метро C', 'пятница'],
      flow: 'Вышеград утром, обед, Клементинум или музей Мухи, домой к котам',
      mapsAll: gmaps('Vyšehrad Prague')
    },
    day28: {
      title: 'Рынки и ёлка',
      idea: 'Суббота. Ёлку зажигают в 16:30. Вечер на площади.',
      image: 'assets/places/oldtown.jpg',
      imageAlt: 'Староместская площадь',
      pills: ['рынок с 10:00', 'ёлка в 16:30'],
      flow: 'Рынок, LEGO, Výtopna, зажигание ёлки',
      mapsAll: gmaps('Old Town Square Prague')
    },
    day29: {
      title: 'Воскресенье, выезд',
      idea: 'Утром музей. Потом ярмарки. На вокзал в 18:30.',
      image: 'assets/places/municipal.jpg',
      imageAlt: 'Общественный дом',
      pills: ['музей с 10:00', 'автобус около 20:00'],
      flow: 'Национальный музей, потом Староместская и Вацлавская, метро на вокзал',
      mapsAll: gmaps('Praha hlavní nádraží')
    }
  };

  function render(id) {
    const r = routes[id];
    if (!r) return '';
    const pills = (r.pills || []).map((p) => `<span class="pill pill-muted">${p}</span>`).join('');
    const mapsBtn = r.mapsAll
      ? `<a class="route-maps-link" href="${r.mapsAll}" target="_blank" rel="noopener">📍 Maps района</a>`
      : '';
    return `
    <aside class="route-brief">
      <div class="route-hero">
        ${r.image ? `<img src="${r.image}" alt="${r.imageAlt || r.title}" loading="lazy" width="1400" height="900" />` : ''}
        <div class="route-hero-veil"></div>
        <div class="route-hero-text">
          <h3>${r.title}</h3>
          <p>${r.idea}</p>
          <div class="chip-row">${pills}${mapsBtn}</div>
        </div>
      </div>
      <p class="route-flow"><span class="route-flow-label">Как идём</span>${r.flow}</p>
    </aside>`;
  }

  window.GuideMaps = {
    route: render,
    day23: () => render('day23'),
    day24: () => render('day24'),
    day25: () => render('day25'),
    day26: () => render('day26'),
    day27: () => render('day27'),
    day28: () => render('day28'),
    day29: () => render('day29')
  };
})();
