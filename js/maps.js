/* Day cards for 24-29 Nov. No typographic dashes in the copy. */
(function () {
  const gmaps = (q) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

  const routes = {
    day23: {
      title: 'Вильнюс, только ночь',
      idea: 'Ночь у вокзала. Ужин рядом и короткая дуга до собора.',
      image: 'https://images.unsplash.com/photo-1592906209472-a36b1f3782ef?auto=format&fit=crop&w=1400&q=80',
      imageAlt: 'Река вечером',
      pills: ['вокзал', 'ужин', 'ворота'],
      flow: 'Таверна, Остробрамские ворота, собор, назад спать',
      mapsAll: gmaps('Aušros vartai Vilnius')
    },
    day24: {
      title: 'Город без чемодана',
      idea: 'Ячейка на вокзале. Гуляешь до половины шестого. К ребятам к шести или семи.',
      image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1400&q=80',
      imageAlt: 'Прага с моста',
      pills: ['вылет 10:00', 'у них в 18 или 19'],
      flow: 'Аэропорт, ячейка на главном вокзале, Град вниз к мосту, чемодан, к ребятам',
      mapsAll: gmaps('Praha hlavní nádraží luggage lockers')
    },
    day25: {
      title: 'Град, пока светло',
      idea: 'Один берег. Внутрь, если захочешь. Мост ещё при свете.',
      image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1400&q=80',
      imageAlt: 'Башни над крышами',
      pills: ['трамвай 22', 'левый берег'],
      flow: 'С 10:00 трамвай 22 на Град, обед на спуске, в 15:15 красный, домой к котам',
      mapsAll: gmaps('Prague Castle')
    },
    day26: {
      title: 'Четверг для глаз',
      idea: 'Функционализм утром. Кубизм и модерн днём. Еврейский музей не берём.',
      image: 'https://images.unsplash.com/photo-1592906209472-a36b1f3782ef?auto=format&fit=crop&w=1400&q=80',
      imageAlt: 'Карлов мост и башни',
      pills: ['дворец с 10:00', 'Муха до 18:00'],
      flow: 'Велетржный дворец, обед на Dlouhá, Чёрная мадонна, конь, кофе',
      mapsAll: gmaps('Veletržní palác Prague')
    },
    day27: {
      title: 'Вышеград и тепло',
      idea: 'Утро на крепости. После трёх уже в помещении.',
      image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1400&q=80',
      imageAlt: 'Крыши Праги',
      pills: ['метро C', 'пятница'],
      flow: 'Вышеград утром, обед, Клементинум или музей Мухи, домой к котам',
      mapsAll: gmaps('Vyšehrad Prague')
    },
    day28: {
      title: 'Рынки, без музея',
      idea: 'Суббота. Большие ёлки включают сегодня. Иди утром.',
      image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1400&q=80',
      imageAlt: 'Мост и Град',
      pills: ['рынок с 10:00', 'утро, не вечер'],
      flow: 'Мост рано, Староместская утром, кофе, домой до ночной толпы',
      mapsAll: gmaps('Old Town Square Prague')
    },
    day29: {
      title: 'Воскресенье, выезд',
      idea: 'Лёгкое утро и дорога. Город отпускаешь задолго до восьми.',
      image: 'https://images.unsplash.com/photo-1592906209472-a36b1f3782ef?auto=format&fit=crop&w=1400&q=80',
      imageAlt: 'Влтава',
      pills: ['автобус около 20:00', 'из дома в 18:30'],
      flow: 'Кофе, сумка, метро до главного вокзала',
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
        <img src="${r.image}" alt="${r.imageAlt || r.title}" loading="lazy" width="1400" height="900" />
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
