/* Personal Prague guide, 24 to 29 November 2026. Solo. Russian only. */
(function () {
  const gmaps = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  const link = (href, label) => `<a href="${href}" target="_blank" rel="noopener">${label}</a>`;
  const U = {
    blue: 'https://www.tours15-15.com/prague/excursions/praga-v-1515-sinij-marshrut/',
    red: 'https://www.tours15-15.com/prague/excursions/praga-v-1515-krasnyj-marshrut/',
    t1515: 'https://www.tours15-15.com/prague/',
    guide1: 'https://www.guide-prague.org/ru/one-day-in-prague',
    guide2: 'https://www.guide-prague.org/ru/two-days-prague',
    guide: 'https://www.guide-prague.org/ru',
    litacka: 'https://pidlitacka.cz/',
    pidAir: 'https://pid.cz/en/travel-information/airport-and-stations/',
    hrad: 'https://www.hrad.cz/en/prague-castle-for-visitors/tickets',
    jewish: 'https://www.jewishmuseum.cz/en/info/visit/discover-prague-s-jewish-town/',
    klemen: 'https://prague.eu/en/objevujte/the-clementinum-astronomical-tower-and-baroque-library/',
    mucha: 'https://www.mucha.cz/en/admissions',
    muchaNew: 'https://mucha.eu/en',
    nm: 'https://www.nm.cz/en/visit-us/buildings/museum-complex-of-the-national-museum',
    vytopna: 'https://www.vytopna.com/en/branch/prague-wenceslas-square',
    jelen: 'https://www.cervenyjelen.cz/?lang=en',
    antonin: 'https://www.antoninovopekarstvi.cz/kudy-k-nam/',
    markets: 'https://www.pragueexperience.com/events/christmas-markets.asp',
    palace: 'https://www.ngprague.cz/en/about/buildings/trade-fair-palace',
    upm: 'https://www.upm.cz/en/visiting/addmission/',
    kunsthalle: 'https://www.kunsthallepraha.org/vstupenky',
    idiom: 'https://microsite.mlp.cz/en/idiom',
    planet: 'https://www.planetum.cz/en/eshop/product/1127-to-mars',
    planetAll: 'https://www.planetum.cz/program',
    savoy: 'https://www.cafesavoy.ambi.cz/en/',
    signal: 'https://www.signalspace.com/visit-us',
    khrom: 'https://khromberry.com/en',
    brabant: 'https://www.krcmabrabant.cz/en/krcma/krcma/',
    izi: 'https://izi.travel/',
    lokal: 'https://lokal-dlouha.ambi.cz/en/',
    kuzelka: 'https://lokal-ubilekuzelky.ambi.cz/en/',
    rychta: 'https://baracnickarychta.cz/en/index.html',
    funicular: 'https://pid.cz/en/funicular/',
    bounce: 'https://bounce.com/',
    station: 'https://www.cd.cz/en/stanice/praha-hlavni-nadrazi/5457076',
    zemaiciai: 'https://zemaiciuasotis.lt/',
    ltglink: 'https://www.ltglink.lt/en',
    vnoTrain: 'https://vilnius-airport.lt/susisiekimas/viesasis-transportas/traukiniai/',
    vnoWalk: 'https://visitvilnius.lt/en/articles/vilnius-old-town-what-to-see',
    mail: 'mailto:booking@tours15-15.com',
    wa: 'https://wa.me/31653409309'
  };

  function todayTarget() {
    const map = {
      '2026-11-23': 'day23',
      '2026-11-24': 'day24',
      '2026-11-25': 'day25',
      '2026-11-26': 'day26',
      '2026-11-27': 'day27',
      '2026-11-28': 'day28',
      '2026-11-29': 'day29'
    };
    const d = new Date();
    const key = [
      d.getFullYear(),
      String(d.getMonth() + 1).padStart(2, '0'),
      String(d.getDate()).padStart(2, '0')
    ].join('-');
    return { key, id: map[key] || null };
  }

  function place(p) {
    const pid = (p.title || 'place').toLowerCase().replace(/[^a-zа-я0-9]+/gi, '-').slice(0, 40);
    const embedQ = p.query || `${p.title} Prague`;
    const mapsUi = p.maps
      ? (window.GuideNavUI
          ? window.GuideNavUI.mapsToggle(
              pid,
              p.maps,
              `https://maps.google.com/maps?q=${encodeURIComponent(embedQ)}&z=16&output=embed`
            )
          : `<a class="maps-btn" href="${p.maps}" target="_blank" rel="noopener">📍 Google Maps</a>`)
      : '';
    const alts = Array.isArray(p.alts) && p.alts.length
      ? `<details class="alts">
          <summary>Альтернативы</summary>
          <ul class="alts-list">
            ${p.alts.map((a) => `
              <li>
                <div class="alts-head">
                  <strong>${a.name}</strong>
                  ${a.tag ? `<span class="pill pill-muted">${a.tag}</span>` : ''}
                </div>
                <p>${a.why}</p>
                ${a.maps ? `<a class="maps-link" href="${a.maps}" target="_blank" rel="noopener">Google Maps</a>` : ''}
              </li>`).join('')}
          </ul>
        </details>`
      : '';
    const lead = p.lead || '';
    const facts = (p.best || p.ticket || p.booking)
      ? `<p class="place-facts">${[
          p.best ? `Когда: ${p.best}` : '',
          p.ticket ? `Билет: ${p.ticket}` : '',
          p.booking ? `Бронь: ${p.booking}` : ''
        ].filter(Boolean).join(' · ')}</p>`
      : '';
    const shot = p.placeId && window.GuidePlaces ? window.GuidePlaces.photoOf(p.placeId, true) : '';
    const descHtml = !p.desc
      ? ''
      : /<(ul|ol|p)\b/.test(p.desc) ? p.desc : `<p>${p.desc}</p>`;
    const bodyBits = [
      shot,
      descHtml,
      p.why ? `<p class="place-why">${p.why}</p>` : '',
      facts,
      mapsUi,
      alts
    ].filter(Boolean).join('');
    return `
    <details class="place-fold">
      <summary>
        <span class="place-fold-ico">${p.icon || '•'}</span>
        <span class="place-fold-main">
          ${p.when ? `<span class="place-fold-when">${p.when}</span>` : ''}
          <strong>${p.title}</strong>
          ${lead ? `<span class="place-fold-lead">${lead}</span>` : ''}
        </span>
        <span class="place-fold-time">${p.time || ''}</span>
      </summary>
      ${bodyBits ? `<div class="place-fold-body">${bodyBits}</div>` : ''}
    </details>`;
  }

  function route(items) {
    return `<ol class="day-route">${items.map((item) => `<li>${item}</li>`).join('')}</ol>`;
  }

  function step(s) {
    return place({
      icon: s.icon || '•',
      title: s.title,
      when: s.when,
      lead: s.lead,
      time: s.time || '',
      desc: s.detail || '',
      why: s.why || '',
      maps: s.maps || '',
      ticket: s.ticket || '',
      booking: s.booking || '',
      alts: s.alts || null,
      placeId: s.placeId || ''
    });
  }

  window.GuideData = {
    nav: [
      { group: 'Поездка', items: [
        { href: '#plan', label: 'План по дням', sub: '24 по 29 ноября' },
        { href: '#overview', label: 'Как легли дни', sub: 'Свет, суббота, выезд' },
        { href: '#transport', label: 'Дорога', sub: 'Вильнюс, автобус 59, Lítačka' }
      ]},
      { group: 'Город', items: [
        { href: '#places', label: 'Места', sub: 'Карты' },
        { href: '#must', label: 'Мастхэв', sub: 'Еда, сувениры, глаза' },
        { href: '#food', label: 'Еда', sub: 'Одной, не на площади' },
        { href: '#cafes', label: 'Кафе', sub: 'Когда стемнело' }
      ]},
      { group: 'С собой', items: [
        { href: '#booking', label: 'До вылета', sub: 'Что закрыть заранее' },
        { href: '#packing', label: 'Что взять', sub: 'Ботинки и капюшон' },
        { href: '#tours', label: 'Экскурсии', sub: 'Синяя во вторник, красная в среду' },
        { href: '#tips', label: 'На месте', sub: 'Деньги, вечер, толпа' }
      ]}
    ],
    pages: {}
  };

  const D = window.GuideData.pages;

  D.home = () => {
    const t = todayTarget();
    return `
  <section class="cover home-cover">
    <div class="cover-media" aria-hidden="true">
      <div class="cover-photo"></div>
      <div class="cover-veil"></div>
    </div>
    <div class="cover-content">
      <p class="cover-kicker">23 по 29 ноября</p>
      <h1>Prague</h1>
      <p class="lede">23-го вечером ты уже в Вильнюсе и высыпаешься. 24-го чемодан на вокзал, город до половины шестого, к ребятам к шести или семи. Из Праги в воскресенье около 20:00.</p>
      <div class="btn-row">
        <a class="btn btn-primary" href="#${t.id || 'plan'}">${t.id ? 'Открыть сегодня' : 'Открыть план'}</a>
        <a class="btn btn-ghost" href="#plan">Все дни</a>
      </div>
      <button type="button" class="cover-scroll" data-scroll-to="hub" aria-label="Дальше">↓</button>
    </div>
  </section>
  <section class="section wrap home-hub" id="hub">
    <div class="hub-grid">
      <a class="hub-tile" href="#plan"><span class="hub-ico">🗓</span><strong>План</strong><span>С Минска 23-го, Прага со вторника</span></a>
      <a class="hub-tile" href="#places"><span class="hub-ico">📍</span><strong>Места</strong><span>Только то, что влезло в даты</span></a>
      <a class="hub-tile" href="#must"><span class="hub-ico">✦</span><strong>Мастхэв</strong><span>Еда, сувениры, что увидеть</span></a>
      <a class="hub-tile" href="#food"><span class="hub-ico">🍽</span><strong>Еда</strong><span>Куда садиться одной</span></a>
      <a class="hub-tile" href="#transport"><span class="hub-ico">🚇</span><strong>Дорога</strong><span>Аэропорт и проездной</span></a>
      <a class="hub-tile" href="#packing"><span class="hub-ico">🧥</span><strong>Сумка</strong><span>Сыро и скользко</span></a>
      <a class="hub-tile" href="#markets"><span class="hub-ico">🎄</span><strong>Ярмарки</strong><span>Ёлка, толпа, первый раз</span></a>
    </div>

    <div class="card card-soft">
      <p style="margin:0"><strong>Где жить.</strong> Квартира знакомых, точного адреса пока нет. Они улетают 25-го, с этого вечера коты на тебе. 24-го вечером ключи, корм и ужин с ними. Когда будет улица, впишем метро и дорогу от аэропорта.</p>
    </div>

    <div class="callout callout-gold" style="margin-top:14px">
      <strong>Свет</strong>
      24 ноября солнце садится в 16:08, 29-го в 16:04. Рассвет около 7:30. Улица работает с девяти до трёх. После четырёх ты уже в кафе или в пивной.
    </div>

    <div class="callout callout-paprika" style="margin-top:10px">
      <strong>Выезд в воскресенье</strong>
      Автобус с главного вокзала около 20:00. Из квартиры выходи в 18:30. До Praha hlavní nádraží закладывай час, ветка станет ясна с адресом. К платформе лучше к 19:30, с чемоданом у выхода не стой. Котам оставь еду до отъезда, как скажут хозяева.
    </div>

    <div class="chip-row" style="margin-top:8px">
      <a class="pill pill-muted" href="#day23" style="text-decoration:none">23 · Вильнюс</a>
      <a class="pill pill-danube" href="#day24" style="text-decoration:none">24 · прилёт</a>
      <a class="pill pill-danube" href="#day25" style="text-decoration:none">25 · Град</a>
      <a class="pill pill-danube" href="#day26" style="text-decoration:none">26 · музей</a>
      <a class="pill pill-gold" href="#day27" style="text-decoration:none">27 · Вышеград</a>
      <a class="pill pill-paprika" href="#day28" style="text-decoration:none">28 · рынки</a>
      <a class="pill pill-muted" href="#day29" style="text-decoration:none">29 · выезд</a>
    </div>
  </section>`;
  };

  D.cover = () => D.home();
  D.toc = () => D.home();

  D.overview = () => `
  <section class="section wrap">
    <p class="section-label">Шесть дней</p>
    <h1>Как это легло</h1>
    <p class="lede">23-го ты ночуешь в Вильнюсе и утром на самолёт выходишь выспавшаяся. Во вторник днём есть силы на город, вечером ты у знакомых. Они улетают в среду, и со среды квартира и коты уже твои. Воскресенье короткое из-за дороги.</p>
    <div class="callout callout-danube">
      <strong>По дням</strong>
      <ul style="margin:8px 0 0;padding-left:1.1rem">
        <li><strong>Пн 23.</strong> Минск, Вильнюс к шести или семи. Ужин, короткая дуга, сон.</li>
        <li><strong>Вт 24.</strong> Чемодан в ячейку. Синий на 15:15 бронируешь после посадки, если успеваешь к 15:00. К ребятам ближе к семи.</li>
        <li><strong>Ср 25.</strong> С 10:00 Град. Красный в 15:15 уже куплен. Вечером первая ярмарка, площадь Республики.</li>
        <li><strong>Чт 26.</strong> Залы: функционализм и чешский модерн, потом кубизм и модерн на улице.</li>
        <li><strong>Пт 27.</strong> Вышеград утром. После трёх Клементинум или Муха.</li>
        <li><strong>Сб 28.</strong> Рынки с 10:00, Национальный музей, в 16:30 первое зажигание ёлки и вечер в толпе.</li>
        <li><strong>Вс 29.</strong> Ярмарки без часа. Из дома в 18:30, автобус около 20:00.</li>
      </ul>
    </div>
    <div class="callout callout-paprika">
      <strong>Погода</strong>
      Это дальний ориентир на 1 ноября, не прогноз на ближайшие дни. Прага по AccuWeather: 24-го около +7 днём и -2 ночью, дальше холоднее, к 29-му около +2 днём и -4 ночью. Вильнюс 23-го обычно около +2 днём и -4 ночью, сыро. За неделю до выезда открой прогноз ещё раз.
    </div>
    <div class="callout callout-gold">
      <strong>Проездной</strong>
      Во вторник один билет на 90 минут, 46 Kč (€2) в ${link(U.litacka, 'Lítačka')}. В среду утром суточный за 140 Kč (€6). В четверг утром на 72 часа за 340 Kč (€14): они закрывают четверг, пятницу и субботу, до воскресенья около 10:00. В воскресенье сутки за 140 Kč (€6): ярмарки и дорога на вокзал. ${link(U.funicular, 'Лановка на Петршин')} входит в сутки и в 72 часа.
    </div>
  </section>`;

  D.day23 = () => `
  <section class="section wrap day-page">
    <header class="day-head">
      <h1>23 ноября, понедельник</h1>
      <p class="lede">Минск, к вечеру Вильнюс, ночуешь у вокзала. Ужин рядом и короткая дуга по освещённому старому городу, если ещё стоишь на ногах. В 10:00 самолёт. Погода на 23 ноября, ориентир на 1 ноября: днём около +2, ночью около -4, часто мокро, снег в эти даты бывает.</p>
    </header>
    ${route([
      'Дорога так, чтобы в Вильнюсе быть к шести или семи',
      'Ужин в Žemaičių ąsotis у вокзала',
      'Ворота, одна улица до собора, назад',
      'Сон. Утром поезд в аэропорт, семь минут'
    ])}
    ${window.GuideMaps.day23()}
    <div class="day-steps">
${step({
  icon: '🚌',
  when: 'день',
  title: 'Минск, потом Вильнюс',
  lead: 'Как добираешься, так и едь',
  detail: 'Закладывай дорогу так, чтобы в шесть или семь уже быть на месте. Чемодан на завтрашний самолёт собери ещё в Минске.'
})}
${step({
  icon: '🍽',
  when: '19:00',
  title: 'Ужин у вокзала',
  lead: 'Жемайтская таверна, понедельник до 23:00',
  detail: `Ужин в ${link(U.zemaiciai, 'Žemaičių ąsotis')}, Naugarduko g. 32-1, минут пятнадцать пешком от вокзала. Литовская еда по деревенским рецептам: цепелины, мясо, домашнее пиво, зал с камином и глиняными кувшинами. Одной в понедельник тут спокойно. Если приехала к шести и хочешь сначала часовню, поешь после ворот. Если к семи и уже голодная, садись сразу: часовня до 19:00, после этого ворота с улицы.`,
  maps: gmaps('Žemaičių ąsotis Naugarduko Vilnius')
})}
${step({
  icon: '🚶',
  when: 'после ужина',
  title: 'Вечерняя дуга и назад',
  lead: 'Ворота, одна улица, собор, спать',
  detail: `От вокзала минут десять до ${link(U.vnoWalk, 'Остробрамских ворот')}. Это единственные уцелевшие ворота стены. Часовня с иконой бесплатная, лестница слева, если смотреть из старого города, до 19:00. Дальше одна улица меняет имя: Aušros Vartų, потом Didžioji, потом Pilies, и ты на Кафедральной площади. У собора плитка stebuklas: встать, загадать, повернуться. Холм Гедимина смотри снизу. Назад той же улицей до вокзала. Вся дуга около сорока минут ходьбы. Если устала, только ворота и обратно, минут двадцать.`,
  maps: gmaps('Aušros vartai Vilnius')
})}
${step({
  icon: '😴',
  when: 'ночь',
  title: 'Сон',
  lead: 'Утром поезд в аэропорт, семь минут',
  detail: `Вылет в 10:00, вторник. От вокзала до Vilnius Airport поезд LTG Link, около семи минут, билет €0,90. В будни составы к аэропорту идут примерно с 08:00, для шенгенского рейса этого хватает. Расписание на ${link(U.ltglink, 'ltglink.lt')} и у ${link(U.vnoTrain, 'аэропорта')}: электрификация его двигает, вечером сверь утро. Будильник на платформу. Телефон на зарядке.`
})}
    </div>
  </section>`;

  D.day24 = () => `
  <section class="section wrap day-page">
    <header class="day-head">
      <h1>24 ноября, вторник</h1>
      <p class="lede">Ты выспалась, так что день рабочий. Чемодан в ячейку на вокзале. Обед рядом со стартом экскурсии, в 15:15 синий маршрут. Потом сумка и к ребятам. Реалистично к семи: экскурсия кончается около 17:30, и ты ещё на Граде. Ужин по умолчанию с ними. Если есть в городе, к ним ближе к восьми. Погода, ориентир на 1 ноября: днём около +7, ночью около -2. Может моросить, камни скользкие.</p>
    </header>
    ${route([
      'Самолёт в 10:00, в Праге около полудня',
      'Автобус 59, метро, ячейка на главном вокзале',
      'Обед у старта: Lokál U Bílé kuželky или булка, если уже 14:30',
      'После посадки, если к 15:00 успеваешь: бронь синего и экскурсия в 15:15',
      'Чемодан и к ребятам около семи'
    ])}
    ${window.GuideMaps.day24()}
    <div class="day-steps">
${step({
  icon: '✈️',
  when: '10:00',
  title: 'Вылет из Вильнюса',
  lead: 'В Праге около полудня, если рейс прямой',
  detail: 'Václav Havel. Если посадка сдвинется сильно, вторник остаётся мостом и площадью, синий переезжает на четверг. К ребятам вечером.'
})}
${step({
  icon: '🚌',
  when: 'после посадки',
  title: 'Автобус 59 и метро до главного вокзала',
  lead: 'Сразу на вокзал, в ячейку',
  placeId: 'bus59',
  ticket: '90 минут, 46 Kč (€2) в Lítačka',
  detail: `Билет в ${link(U.litacka, 'PID Lítačka')}, активируй до автобуса. Расписание аэропорта на ${link(U.pidAir, 'pid.cz')}. 59 до Nádraží Veleslavín, метро A до Muzeum, там пересадка на C, одна остановка до Hlavní nádraží. Около часа.`,
  maps: gmaps('Praha hlavní nádraží')
})}
${step({
  icon: '🧳',
  when: 'около 13:15',
  title: 'Ячейка на вокзале',
  lead: 'Самообслуживание',
  detail: `Ячейки на ${link(U.station, 'главном вокзале')}, обычно в нижнем уровне. Плати картой, цену смотри на шкафчике. Паспорт и карты с собой. Обслуживаемая камера с конца июля 2026 могла встать на ремонт. Если ячеек нет, ${link(U.bounce, 'Bounce')} рядом, около 5 евро за день.`,
  maps: gmaps('Praha hlavní nádraží luggage lockers')
})}
${step({
  icon: '🍽',
  when: 'около 14:00',
  title: 'Обед до экскурсии',
  lead: 'Четыре минуты от площади сбора',
  detail: `<ul class="step-points">
    <li>${link(U.kuzelka, 'Lokál U Bílé kuželky')}, Míšeňská 12, четыре минуты от Starbucks. Свичкова, пиво, скамья. Сесть сразу, в 14:45 выйти.</li>
    <li>${link(U.rychta, 'Baráčnická rychta')}, Tržiště 23, если обед переносится на ужин в городе. Тогда к ребятам ближе к восьми.</li>
    <li>Если на Малой Стране уже после 14:30: булка по пути и сразу к Starbucks.</li>
  </ul>`,
  maps: gmaps('Lokál U Bílé kuželky Prague')
})}
${step({
  icon: '🚶',
  when: '15:15',
  title: 'Синий маршрут 15:15',
  lead: 'Страгов, Новый Свет, Град, Злата улочка',
  placeId: 'castle',
  ticket: '€30',
  booking: 'после посадки',
  detail: `<ul class="step-points">
    <li>Бронируешь после посадки, когда видно, что к 15:00 ты на Malostranská. Форма на ${link(U.t1515, 'tours15-15.com/prague')}, страница ${link(U.blue, 'синего')}.</li>
    <li>Встреча у Starbucks, Malostranské náměstí 5, жёлтая табличка.</li>
    <li>Страгов и площадка Panna Marie z Exilu, Новый Свет, Град снаружи, Злата улочка. Свет кончается в 16:08, финал уже в темноте. Интерьеры в среду утром.</li>
    <li>Если рейс сел поздно, этот же синий переносишь на четверг.</li>
  </ul>`,
  maps: gmaps('Starbucks Malostranské náměstí Prague'),
  alts: [
    { name: 'Сама по guide-prague', tag: '0 Kč', why: `Пешком сверху вниз, ${link(U.guide1, 'guide-prague.org')}. Тогда к ребятам ближе к шести.`, maps: gmaps('Prague Castle') }
  ]
})}
${step({
  icon: '🗝',
  when: 'после 17:30',
  title: 'Чемодан и ребята к семи',
  lead: 'К ним около семи',
  detail: 'Синий кончается на Граде около 17:30. Трамвай 22 вниз, метро до вокзала, ячейка, и к ним около семи. Дома: ключи, корм, лоток, ветеринар, вайфай. Ужин с ними.',
  maps: gmaps('Praha hlavní nádraží'),
  alts: [
    { name: 'Ужин в городе', tag: 'к ним около 20:00', why: `Если есть хочешь в городе: с Града вниз в ${link(U.rychta, 'Baráčnická rychta')}, Tržiště 23, две минуты от площади сбора. Чешское, пиво, можно одной, каждый день до 22:30. Потом чемодан. Напиши им, что будешь ближе к восьми.`, maps: gmaps('Baráčnická rychta Prague') }
  ]
})}
    </div>
  </section>`;

  D.day25 = () => `
  <section class="section wrap day-page">
    <header class="day-head">
      <h1>25 ноября, среда</h1>
      <p class="lede">Они улетают рано утром, так что день твой целиком. Выход в 10:00. Утром Град, внутрь если хочешь: вчера синий показал его уже в темноте. В 15:15 красный. Домой к котам после экскурсии, около шести. Погода, ориентир на 1 ноября: днём около +6, ночью около 0.</p>
    </header>
    ${route([
      '10:00, трамвай 22 на Град',
      'Дворы или круг внутрь, вниз к 13:30',
      'Обед на спуске',
      '15:15 красный, билет уже есть',
      'Коты, потом ярмарка на площади Республики'
    ])}
    ${window.GuideMaps.day25()}
    <div class="day-steps">
${step({
  icon: '🚇',
  when: '10:00',
  title: 'Наверх трамваем 22',
  lead: 'Выход из дома в десять',
  placeId: 'tram22',
  detail: `Суточный билет включи перед выходом, 140 Kč (€6) в ${link(U.litacka, 'Lítačka')}. До Malostranská, трамвай 22, остановка Pražský hrad. Котов покорми до выхода. Сумку на трамвае держи спереди.`,
  maps: gmaps('Pražský hrad tram stop')
})}
${step({
  icon: '🏰',
  when: '10:30 до 13:30',
  title: 'Пражский Град',
  lead: 'Спокойно, они уже улетели',
  placeId: 'castle',
  ticket: 'круг 450 Kč (€19)',
  detail: `Вчера ты видела Град в темноте. Сегодня заходишь внутрь, если хочешь: круг 450 Kč (€19) на ${link(U.hrad, 'hrad.cz')}, льготный 300 Kč (€12). Дворы бесплатные и тоже держат день. Аудиогид на стойке по-русски около 350 Kč (€14), вместе с кругом. В 13:30 вниз: в 15:00 ты на Малостранской.`,
  maps: gmaps('Prague Castle'),
  alts: [
    { name: 'Только дворы', tag: '0 Kč', why: 'Если внутри храмы тебя не держат, фасад св. Вита и вид уже делают день.', maps: gmaps('Prague Castle') }
  ]
})}
${step({
  icon: '🍽',
  when: 'обед',
  title: 'Поесть на спуске',
  lead: 'Polední menu или кужелка',
  detail: `<ul class="step-points">
    <li>Старые замковые ступени: на середине смотровая Na Opyši, Град сбоку и река.</li>
    <li>Обед, если во вторник кужелки не было: ${link(U.kuzelka, 'Lokál U Bílé kuželky')}, Míšeňská 12.</li>
    <li>Если кужелка уже была: polední menu по Нерудовой, ужин потом на Dlouhá.</li>
    <li>У моста узкий проход со светофором, U Lužického semináře 24. Кампа десять минут, стена Леннона рядом.</li>
  </ul>`,
  maps: gmaps('Lokál U Bílé kuželky Prague')
})}
${step({
  icon: '🚶',
  when: '15:15',
  title: 'Красный маршрут 15:15',
  lead: 'Мост, Старый город, куранты, Вацлавская',
  placeId: 'charles',
  ticket: '€30',
  booking: 'за сутки',
  detail: `<ul class="step-points">
    <li>Билет уже куплен. ${link(U.red, 'Красный маршрут')}, 15:15, та же точка: Starbucks, Malostranské náměstí 5.</li>
    <li>Мост с фонарями, Старый город, куранты, Вацлавская.</li>
    <li>Конец около 17:30. Домой, корм по их схеме.</li>
  </ul>`,
  maps: gmaps('Starbucks Malostranské náměstí Prague')
})}
${step({
  icon: '🌙',
  when: 'после корма',
  title: 'Если ещё есть силы',
  lead: 'Рынок на площади Республики',
  placeId: 'republic',
  detail: `<ul class="step-points">
    <li>Первая европейская ярмарка в этой поездке, и она маленькая: площадь перед Общественным домом, с 25 ноября до 24 декабря.</li>
    <li>Один svařák. Кружку берёшь с залогом, залог отдают, когда сдаёшь её на ту же точку.</li>
    <li>Сорок минут и домой. Большая ёлка и толпа ждут субботу.</li>
  </ul>`,
  maps: gmaps('náměstí Republiky Prague')
})}
    </div>
  </section>`;

  D.day26 = () => `
  <section class="section wrap day-page">
    <header class="day-head">
      <h1>26 ноября, четверг</h1>
      <p class="lede">Выход в 10:00. Утро в Велетржном дворце: это дом и коллекция сразу. Днём кубизм, конь Черны и кофе в модерне. Погода, ориентир на 1 ноября: днём около +6, ночью около -1. Зонт в сумке.</p>
    </header>
    ${route([
      '10:00 Велетржный дворец',
      'Обед: Dlouhá, Červený jelen или пекарня на Строссмайере',
      'Куранты, башня из книг, Целетна, мадонна, Луцерна',
      'Кофе в Общественном доме',
      'После корма мост и Стрелецкий остров'
    ])}
    ${window.GuideMaps.day26()}
    <div class="day-steps">
${step({
  icon: '🖼',
  when: '10:00',
  title: 'Велетржный дворец',
  lead: 'Функционализм снаружи, модерн внутри',
  ticket: '250 Kč (€10)',
  detail: `Дом Иосефа Фукса и Олдржиха Тыла, 1928, бывший выставочный дворец. Тебе он нужен и как здание, и как зал: чешское искусство с XIX века до нынешнего, кубизм, Купка, холсты Мухи. Билет на все постоянные залы внутри, ${link(U.palace, 'ngprague.cz')}, 250 Kč (€10). Открыт со вторника по воскресенье, 10:00 до 18:00. Идём в четверг. Метро C, Vltavská, или трамвай до Veletržní palác. С 10:30 до часу. Синий уже был во вторник. Если тот вторник сорвался, четверг запасной синий, ${link(U.blue, 'та же страница')}, и дворец тогда сдвигается.`,
  maps: gmaps('Veletržní palác Prague'),
  alts: [
    { name: 'Kunsthalle вместо дворца', tag: '320 Kč (€13)', why: `Живые выставки в бывшей подстанции на Кларове, ${link(U.kunsthalle, 'kunsthallepraha.org')}. Четверг 11:00 до 19:00. Утро тогда на Малой Стране, к обеду ты ближе к центру.`, maps: gmaps('Kunsthalle Praha Klárov') }
  ]
})}
${step({
  icon: '🕰',
  when: 'после музея',
  title: 'Площадь и один бой часов',
  lead: 'Подошла за три минуты до часа',
  placeId: 'clock',
  detail: `После дворца ты в центре. Куранты крутятся около минуты, подходи за три минуты до часа. Тын снаружи, площадь с края. Если хочешь башню из книг, это в сторону реки, на Марианскую площадь: ${link(U.idiom, 'Idiom')}, бесплатно, четверг до 19:30, очередь около получаса. Посмотрела в отверстие и назад. Дальше Целетна до Пороховых ворот. Дом У чёрной мадонны на углу: кубизм Гочара, фасад бесплатно. Зал чешского кубизма внутри, если ещё хочешь билет, 150 Kč (€6) у ${link(U.upm, 'Музея декоративного искусства')}. Потом пассаж Lucerna: конь Черны вверх ногами, бесплатно, кадр снизу. В соседнем пассаже U Nováků, Vodičkova 28, аналоговая полоска. Signal Space на Rytířská 10 по дороге к Мустку, 399 Kč (€16) в будни, ${link(U.signal, 'signalspace.com')}, если хочешь ещё одну комнату. Это кусок со ${link(U.guide2, 'страницы на два дня')}.`,
  maps: gmaps('Old Town Square Prague')
})}
${step({
  icon: '🍽',
  when: 'обед',
  title: 'Lokál Dlouhááá',
  lead: 'Пять минут от площади, если ещё не была в среду',
  placeId: 'lokal',
  detail: `<ul class="step-points">
    <li>${link(U.lokal, 'Lokál Dlouhá')}, Dlouhá 33. Свичкова, пиво из танка, длинная скамья. Если этот ужин ещё впереди.</li>
    <li>${link(U.jelen, 'Červený jelen')}, Hybernská 5, у Пороховых ворот. Гриль и пивная башня, будни с 11:30.</li>
    <li>${link(U.antonin, 'Antonínovo pekařství')}, Strossmayerovo náměstí 11. Булка и кофе до дворца или после, каждый день с 7:00 до 19:30.</li>
  </ul>`,
  maps: gmaps('Lokál Dlouhááá Prague')
})}
${step({
  icon: '☕',
  when: 'после трёх',
  title: 'Общественный дом',
  lead: 'Уже темнеет, и это как раз зал',
  placeId: 'municipal',
  detail: `Кофе в зале. Общественный дом это модерн 1912 года, мозаика на фасаде, чашка и есть вход. Если хочешь ещё один зал: официальный музей Мухи в дворце Саварин, Na Příkopě 10, пространство Евы Йиржичной, плакаты, рисунки, холсты семьи. Каждый день 10:00 до 18:00, билет на ${link(U.muchaNew, 'mucha.eu')}, около 300 Kč (€12).`,
  maps: gmaps('Municipal House Prague'),
  alts: [
    { name: 'Музей Мухи в Саварине', tag: 'около 300 Kč (€12)', why: 'Линии, плакат и зал Йиржичной. Успеть до 18:00.', maps: gmaps('Mucha Foundation Savarin Palace Prague') }
  ]
})}
${step({
  icon: '🌙',
  when: 'после корма',
  title: 'Если ещё есть силы',
  lead: 'Мост и Стрелецкий остров',
  placeId: 'charles',
  detail: 'Сначала коты. Потом, если ещё хочется улицы: Карлов мост на десять минут и Стрелецкий остров с моста Легий. Оттуда мост виден целиком. Четверг тише субботы.',
  maps: gmaps('Charles Bridge Prague')
})}
    </div>
    <p class="day-tip"><strong>Утро четверга:</strong> включи билет на 72 часа. Он живёт до воскресенья около 10:00 и закрывает субботу.</p>
  </section>`;

  D.day27 = () => `
  <section class="section wrap day-page">
    <header class="day-head">
      <h1>27 ноября, пятница</h1>
      <p class="lede">Обычный выход в 10:00, утро на Вышеграде. Если хочешь пустой город: из дома около 7:00, мост без людей, завтрак в Savoy, и к десяти ты на Вышеграде. Красный, если он не прошёл в среду, переносится сюда. Погода, ориентир на 1 ноября: днём около +4, ночью около -1, скорее пасмурно.</p>
    </header>
    ${route([
      'Обычный выход в 10:00. Или в 7:00 на пустой мост и кадр у Пьеты',
      'Завтрак в Savoy с 8:00, если встала рано',
      'Вышеград',
      'Обед',
      'Клементинум или Муха',
      'После корма ярмарка на площади Мира'
    ])}
    ${window.GuideMaps.day27()}
    <div class="day-steps">
${step({
  icon: '🌅',
  when: 'или в 7:00',
  title: 'Пустой мост, если встанешь',
  lead: 'Альтернатива. Обычный план ниже всё равно с 10:00',
  placeId: 'charles',
  detail: `<ul class="step-points">
    <li>Выход около 7:00. Рассвет около 7:20, мост ещё пустой.</li>
    <li>Телефон в чёрно-белом. Статуя Оплакивания Христа, Пьета: в 1988 здесь стояли Гаан и Гор для Антона Корбейна. Встаёшь рядом, один дубль.</li>
    <li>${link(U.savoy, 'Café Savoy')}, Vítězná 5, с 8:00. Завтрак. В 9:15 на Вышеград, дорога около получаса.</li>
  </ul>`,
  maps: gmaps('Charles Bridge Prague')
})}
${step({
  icon: '⛰',
  when: '10:00',
  title: 'Вышеград',
  lead: 'Метро A до Muzeum, потом C до Vyšehrad',
  placeId: 'vysehrad',
  detail: 'Крепость бесплатная. Кладбище: Дворжак, Муха, Сметана. Час или полтора, на ветру стены короче. По Vyšehradská, дом 128, аналоговый автомат CAMP по дороге в центр.',
  maps: gmaps('Vyšehrad Prague')
})}
${step({
  icon: '🍽',
  when: 'обед',
  title: 'Горячее',
  lead: 'Дневное меню в будни обычно до трёх',
  detail: 'Polední menu по пути, обычно до трёх. После него ужин может быть супом.'
})}
${step({
  icon: '📚',
  when: 'после 15:00',
  title: 'Клементинум или Муха',
  lead: 'То, на что есть билет',
  placeId: 'klementinum',
  ticket: 'Клементинум 380 Kč (€16), Муха 300 Kč (€12)',
  detail: 'Клементинум со слотом, тур около 45 минут, библиотеку смотрят с порога. Билеты у Prague City Tourism. Если слота нет, Муха на Panská. Петршин в пятницу, если сухо: лановка входит в проездной.',
  maps: gmaps('Klementinum Prague'),
  alts: [
    { name: 'Музей Мухи', tag: 'если нет слота', why: 'Тёплый зал до шести: плакаты, эскизы, фотографии.', maps: gmaps('Mucha Museum Prague') }
  ]
})}
${step({
  icon: '🍺',
  when: 'вечер',
  title: 'Домой к котам',
  lead: 'Вечер от их схемы кормления',
  detail: 'Ужин по дороге домой или дома. Если их район у Ригровых садов и сухо, пять минут на газоне и в тепло.',
  maps: gmaps('Riegrovy sady Prague')
})}
${step({
  icon: '🌙',
  when: 'после корма',
  title: 'Если ещё есть силы',
  lead: 'Площадь Мира, если ещё хочется огней',
  placeId: 'miru',
  detail: `<ul class="step-points">
    <li>Сначала коты. Потом náměstí Míru: церковь св. Людмилы и районные палатки, с 20 ноября, примерно 10:00 до 20:00. Метро A.</li>
    <li>Рядом пекарня ${link(U.antonin, 'Antonínovo')}, Náměstí Míru 11, если хочешь хлеб, а не только глинтвейн.</li>
    <li>Полчаса, один svařák, кружку сдать. Главная ёлка и толпа в субботу.</li>
  </ul>`,
  maps: gmaps('náměstí Míru Prague Christmas market')
})}
    </div>
  </section>`;

  D.day28 = () => `
  <section class="section wrap day-page">
    <header class="day-head">
      <h1>28 ноября, суббота</h1>
      <p class="lede">Первый день больших рынков: Староместская и Вацлавская, 10:00 до 22:00, до 6 января. Днём музей и обед, в 16:30 первое зажигание ёлки, потом вечер в толпе. Погода, ориентир на 1 ноября: днём около +3, ночью около -4. Шапка нужна. Даты и часы: ${link(U.markets, 'pragueexperience.com')}.</p>
    </header>
    ${route([
      'Проездной с четверга ещё действует',
      'Утро: мост, потом Староместская к открытию в 10:00',
      'Национальный музей на голове Вацлавской',
      'Обед: Výtopna, Louvre или Khromberry',
      '16:30 первое зажигание ёлки и вечер на рынке'
    ])}
    ${window.GuideMaps.day28()}
    <div class="day-steps">
${step({
  icon: '🎟',
  when: '10:00',
  title: 'Проездной ещё жив',
  lead: '72 часа с четверга до воскресенья около 10:00',
  detail: 'Четверговый билет на 72 часа покрывает субботу целиком. В воскресенье, когда выходишь на ярмарки, берёшь сутки за 140 Kč (€6): они закроют день и дорогу на вокзал вечером.'
})}
${step({
  icon: '🎄',
  when: 'с 10:00',
  title: 'Первый заход на большую ярмарку',
  lead: 'Днём, пока светло',
  placeId: 'oldtown',
  detail: `<ul class="step-points">
    <li>Мост утром, потом Староместская к открытию в 10:00. Ёлка уже стоит, огни включат вечером.</li>
    <li>Один svařák. Кружка с залогом, залог отдают, когда сдаёшь кружку на ту же точку.</li>
    <li>Одна горячая еда с прилавка, если проголодалась. Телефон во внутренний карман, сумка спереди.</li>
  </ul>`,
  maps: gmaps('Old Town Square Prague Christmas market')
})}
${step({
  icon: '🏛',
  when: 'день',
  title: 'Национальный музей',
  lead: 'Голова Вацлавской, ты уже рядом',
  placeId: 'museum',
  ticket: '360 Kč (€15)',
  detail: `Историческое здание и новое, подземный переход между ними. Билет на комплекс ${link(U.nm, 'nm.cz')}, 360 Kč (€15), 10:00 до 18:00. Купол и залы. Электронный билет живёт 30 дней, один вход, QR на турникет. В субботу к полудню людей больше, с билетом пускают первыми. Час или полтора.`,
  maps: gmaps('National Museum Prague')
})}
${step({
  icon: '🍽',
  when: 'обед',
  title: 'Три места у площади',
  lead: 'Выбираешь одно',
  detail: `<ul class="step-points">
    <li>${link(U.vytopna, 'Výtopna')}, Václavské náměstí 56, первый этаж. Поезда привозят напиток к столу. 11:00 до 24:00.</li>
    <li><a href="https://www.cafelouvre.cz/" target="_blank" rel="noopener">Café Louvre</a> на Národní, торт и час в зале. Голова Кафки у метро Národní třída.</li>
    <li>${link(U.khrom, 'Khromberry')}, V Jirchářích 6, торт «Эдвард», до 18:00.</li>
  </ul>`,
  maps: gmaps('Výtopna Prague Wenceslas Square')
})}
${step({
  icon: '✨',
  when: '16:30',
  title: 'Зажигание ёлки и вечер в толпе',
  lead: 'Первый вечер сезона',
  placeId: 'oldtown',
  detail: `<ul class="step-points">
    <li>Главная ёлка на Староместской, около 23 метров. Огни включают в 16:30, потом в 17:30, 18:30, 19:30, 20:30 и 21:30. Под песню Ewy Farny.</li>
    <li>Остаёшься на площади: палатки, сцена, вторая ёлка на Вацлавской в пяти минутах, около 21 метра.</li>
    <li>Потом домой к котам. Мост по дороге, если он по пути, десять минут.</li>
  </ul>`,
  maps: gmaps('Old Town Square Prague')
})}
    </div>
  </section>`;

  D.day29 = () => `
  <section class="section wrap day-page">
    <header class="day-head">
      <h1>29 ноября, воскресенье</h1>
      <p class="lede">Автобус с главного вокзала около 20:00. День без часа: ярмарки, ещё одно зажигание, если успеваешь, потом сборы. Из квартиры в 18:30. Погода, ориентир на 1 ноября: днём около +2, ночью около -4. На вокзал в капюшоне.</p>
    </header>
    ${route([
      'Когда выходишь, суточный билет',
      'Ярмарки без часа: Староместская и Вацлавская',
      'Если ещё в центре к 16:30, ещё одно зажигание ёлки',
      'Домой, коты, в 18:30 на вокзал, автобус около 20:00'
    ])}
    ${window.GuideMaps.day29()}
    <div class="day-steps">
${step({
  icon: '🎄',
  when: 'день',
  title: 'Ярмарки без часа',
  lead: 'Староместская и Вацлавская',
  detail: `<ul class="step-points">
    <li>Проездной с четверга к утру кончается. Когда выходишь, сутки 140 Kč (€6) в Lítačka. Они закроют ярмарки и метро на вокзал.</li>
    <li>Староместская и Вацлавская, в том порядке, в каком захочешь. Час не назначай.</li>
    <li>Если в 16:30 ещё в центре, остаёшься на одно зажигание. Потом домой, коты, выход в 18:30.</li>
  </ul>`,
  maps: gmaps('Old Town Square Prague')
})}
${step({
  icon: '🚌',
  when: '18:30',
  title: 'Автобус с главного вокзала',
  lead: 'Отправление около 20:00',
  ticket: 'суточные с утра, 140 Kč (€6)',
  detail: `Выход из квартиры в 18:30. Метро до ${link(U.station, 'Praha hlavní nádraží')}, около часа, точную ветку посчитаем от их улицы. На стоянке автобусов в 19:30. Утренние сутки закрывают и эту поездку. Котам еда и лоток до отъезда.`,
  maps: gmaps('Praha hlavní nádraží')
})}
    </div>
  </section>`;

  D.plan = () => `
  <section class="section wrap">
    <h1>План</h1>
    <p class="lede">С понедельника в Вильнюсе. Вечер вторника пустой специально. Со среды ты одна с котами, и вечера считаются от кормления, не от последнего бара.</p>
    <div class="toc-list" style="margin-top:8px">
      ${[
        ['day23', '23', '23 ноября, пн', 'Минск, Вильнюс к вечеру, сон'],
        ['day24', '24', '24 ноября, вт', 'Ячейка, синий 15:15, к ним ближе к семи'],
        ['day25', '25', '25 ноября, ср', 'С 10:00 Град, в 15:15 красный, вечером коты'],
        ['day26', '26', '26 ноября, чт', 'Велетржный дворец, кубизм, модерн'],
        ['day27', '27', '27 ноября, пт', 'Вышеград в 10:00, или мост с семи'],
        ['day28', '28', '28 ноября, сб', 'Рынки с десяти, музей закрыт'],
        ['day29', '29', '29 ноября, вс', 'Ярмарки без часа, автобус около 20:00']
      ].map(([id, num, title, sub]) => `
        <a class="toc-item" href="#${id}">
          <div class="toc-num">${num}</div>
          <div><h3>${title}</h3><p>${sub}</p></div>
        </a>`).join('')}
    </div>
    <div class="two-col" style="margin:20px 0 8px">
      <a class="card card-link" href="#overview"><h3 style="margin:0">Почему так</h3><p class="muted small" style="margin:6px 0 0">Свет, суббота, собор</p></a>
      <a class="card card-link" href="#transport"><h3 style="margin:0">Дорога</h3><p class="muted small" style="margin:6px 0 0">59, метро A, билеты</p></a>
    </div>
  </section>`;

  D.days = () => D.plan();
  D.places = (filter) => window.GuideNavUI.renderPlacesPage(filter || 'all');

  D.food = () => `
  <section class="section wrap">
    <p class="section-label">Еда</p>
    <h1>Куда садиться одной</h1>
    <p class="lede">Стол на одного бронируют без объяснений. В центре можно по-английски. Идёшь в Lokál, кужелку или по дневному меню.</p>
    <div class="card">
      <h3>Lokál Dlouhááá</h3>
      <p>Dlouhá 33, пять минут от Староместской. Длинные скамьи, свичкова, пиво из танка. Одной здесь нормально, сидишь в ряду. Вечером напиши: dlouha@ambi.cz. Один раз, среда или четверг.</p>
      ${window.GuidePlaces.photoOf('lokal')}
      <a class="maps-btn" href="${gmaps('Lokál Dlouhááá Prague')}" target="_blank" rel="noopener">📍 Google Maps</a>
    </div>
    <div class="card">
      <h3>Výtopna</h3>
      <p>Václavské náměstí 56. Поезд привозит напиток к столу. Суббота, рядом с рынком. 11:00 до 24:00. ${link(U.vytopna, 'Сайт')}.</p>
      <a class="maps-btn" href="${gmaps('Výtopna Prague Wenceslas Square')}" target="_blank" rel="noopener">📍 Google Maps</a>
    </div>
    <div class="card">
      <h3>Виноградский парламент</h3>
      <p>Пивная в Виноградах, своё пиво. Пятница, если квартира окажется в этом районе.</p>
      <a class="maps-btn" href="${gmaps('Vinohradský parlament Prague')}" target="_blank" rel="noopener">📍 Google Maps</a>
    </div>
    <div class="card">
      <h3>Днём</h3>
      <p>В будни обед это polední menu, обычно до трёх и сытное. После него ужин может быть супом. Свичкова это говядина в сливках с кнедликом. Гуляш здесь густой.</p>
    </div>
    <div class="callout callout-paprika">
      <strong>Площадь</strong>
      На Староместской смотришь площадь и берёшь один глинтвейн. Еда в Lokál, в кужелке или по дневному меню.
    </div>
  </section>`;

  D.cafes = () => `
  <section class="section wrap">
    <p class="section-label">После четырёх</p>
    <h1>Кафе</h1>
    <p class="lede">Когда стемнело, город для тебя вот эти залы. Одной сидеть с тортом тут обычное дело.</p>
    <div class="two-col">
      <div class="card"><h3>Café Louvre</h3><p>Národní, этаж над улицей. Суббота после рынка. Торт, можно не спешить.</p>${window.GuidePlaces.photoOf('louvre')}<a href="${gmaps('Café Louvre Prague')}" target="_blank" rel="noopener">Maps</a></div>
      <div class="card"><h3>Общественный дом</h3><p>Кофе в зале в среду или четверг. Рядом рынок с 25 ноября.</p>${window.GuidePlaces.photoOf('municipal')}<a href="${gmaps('Municipal House Prague')}" target="_blank" rel="noopener">Maps</a></div>
      <div class="card"><h3>Café Savoy</h3><p>Завтрак в пятницу с 8:00, сразу после пустого моста.</p>${window.GuidePlaces.photoOf('savoy')}<a href="${gmaps('Café Savoy Prague')}" target="_blank" rel="noopener">Maps</a></div>
    </div>
  </section>`;

  D.transport = () => `
  <section class="section wrap">
    <p class="section-label">Дорога</p>
    <h1>Вильнюс и Прага</h1>
    <div class="card">
      <h3>23 ноября, Минск и Вильнюс</h3>
      <p>Выезд так, чтобы в Вильнюсе быть к шести или семи. Ужин, сон. Утром в аэропорт с запасом под вылет в 10:00.</p>
    </div>
    <div class="card">
      <h3>24 ноября, в Прагу</h3>
      <p>Вылет в 10:00. Если рейс прямой, в Праге около полудня. Автобус 59 до Nádraží Veleslavín, дальше метро до ячейки на главном вокзале. Билет на 90 минут в PID Lítačka, в приложении 46 Kč (€2). Активируй до посадки.</p>
    </div>
    <div class="card">
      <h3>Обратно, 29 ноября</h3>
      <p>Автобус с главного вокзала около 20:00. Из квартиры в 18:30. До Praha hlavní nádraží около часа, ветка от их адреса. К стоянке автобусов к 19:30. Новый билет на 90 минут, активируй до метро. Котам еда до отъезда, как скажут.</p>
    </div>
    <div class="card">
      <h3>По городу</h3>
      <p>Среда: сутки за 140 Kč (€6). Четверг утром: 72 часа за 340 Kč (€14), они закрывают четверг, пятницу и субботу, до воскресенья около 10:00. Воскресенье: сутки за 140 Kč (€6), ярмарки и метро на вокзал. Бумажный суточный компостируй один раз.</p>
    </div>
    <div class="callout callout-gold">
      <strong>Вечером</strong>
      Устала, темно, чемодан или скользкая Нерудова: Bolt до двери. От аэропорта и от вокзала едешь на 59, метро или поезде.
    </div>
  </section>`;

  D.booking = () => `
  <section class="section wrap">
    <p class="section-label">До Вильнюса</p>
    <h1>Что закрыть</h1>
    <div class="check-group">
      ${[
        'Адрес квартиры, ключи, вайфай. Корм, сколько раз в день, лоток, ветеринар, что котам нельзя, кому писать',
        'Приложение PID Lítačka, чтобы во вторник не искать кассу',
        `Клементинум в пятницу, если хочешь зал. Слот на ${link(U.klemen, 'prague.eu')}. Нет слота, значит ${link(U.mucha, 'Муха')}`,
        'Lokál на один ужин, среда или четверг: dlouha@ambi.cz',
        'Град в среду можно купить на месте. В ноябре очередь короче, чем летом',
        'Банковская карта, которая нормально живёт за границей. Кроны сними уже в Праге, не в обменнике аэропорта'
      ].map((line, i) => `
        <label class="check-item" data-check="pre-${i}">
          <input type="checkbox" />
          <span class="check-text">${line}</span>
        </label>`).join('')}
    </div>
  </section>`;

  D.packing = () => `
  <section class="section wrap">
    <p class="section-label">Сумка</p>
    <h1>Что взять</h1>
    <p class="lede">Около нуля, сыро, камни скользкие. Красивые новые ботинки оставь дома.</p>
    <div class="check-group">
      ${[
        'Ботинки с протектором, которые уже носила',
        'Шапка, перчатки, шарф, капюшон. Зонт на мосту выворачивает',
        'Слой под куртку, который снимается в пивной',
        'Пауэрбанк',
        'Немного крон на туалет. Остальное карта',
        'Европейская вилка'
      ].map((line, i) => `
        <label class="check-item" data-check="pack-${i}">
          <input type="checkbox" />
          <span class="check-text">${line}</span>
        </label>`).join('')}
    </div>
  </section>`;

  D.tips = () => `
  <section class="section wrap">
    <p class="section-label">На месте</p>
    <h1>Коротко</h1>
    <div class="card"><h3>Деньги</h3><p>Плати в кронах. На терминале жми кроны. Банкомат Česká spořitelna, ČSOB или Komerční banka.</p></div>
    <div class="card"><h3>Вечер одной</h3><p>Город спокойный. Телефон во внутренний карман, на мосту и на 22-м сумка спереди. Пьяную компанию в переулке обходишь соседней улицей. С главного вокзала сразу к метро или к поезду.</p></div>
    <div class="card"><h3>Суббота</h3><p>Рынок с десяти. Утро на Староместской, к двум Louvre.</p></div>
    <div class="card"><h3>Чаевые</h3><p>Если сервис не включён, около десяти процентов. Назови сумму, которую хочешь заплатить, когда отдаёшь карту.</p></div>
  </section>`;

  D.budget = () => `
  <section class="section wrap">
    <h1>Деньги на город</h1>
    <ul>
      <li>Дорога туда и обратно: два билета по 46 Kč (€2), плюс сутки 140 Kč (€6) и 72 часа 340 Kč (€14). Вместе около 570 Kč (€23), если едешь по плану.</li>
      <li>Град внутрь 450 Kč (€19). Дворы бесплатно, и день всё равно складывается.</li>
      <li>Велетржный дворец 250 Kč (€10). Музей Мухи в Саварине около 300 Kč (€12), если после дворца ещё хочется зал.</li>
      <li>Клементинум 380 Kč (€16), только если взяла слот. Муха 300 Kč (€12).</li>
      <li>Две мини-группы 15:15, синяя и красная, по €30. Вместе €60. Страницы: ${link(U.blue, 'синий')} и ${link(U.red, 'красный')}.</li>
      <li>Городской сбор 50 Kč (€2) с тебя за ночь, день заезда не считается. На сайте его часто нет, попросят в отеле.</li>
    </ul>
  </section>`;

  D.backup = () => `
  <section class="section wrap">
    <h1>Если день поехал</h1>
    <div class="card"><h3>Дождь</h3><p>Музей, Муха, Louvre, Общественный дом. Град в среду это дворы и залы.</p></div>
    <div class="card"><h3>Рейс сел вечером</h3><p>Вторник тогда сумка и ужин. Град остаётся в среду.</p></div>
    <div class="card"><h3>Нет слота в Клементинум</h3><p>Пятница становится музеем Мухи. День от этого не пустеет.</p></div>
  </section>`;

  D.tours = () => `
  <section class="section wrap">
    <p class="section-label">Вторник и среда</p>
    <h1>Обе 15:15</h1>
    <p class="lede">Красный на среду 15:15 уже куплен. Синий на вторник 15:15 бронируешь после посадки, когда ясно, что к 15:00 ты на Malostranská. Четверг остаётся музею.</p>
    <div class="callout callout-gold">
      <strong>Что первым, что вторым</strong>
      <p style="margin:8px 0 0">Сначала холм, потом город. Синий 15:15 идёт первым: Страгов, Лорета, Новый Свет, Град снаружи. Он кончается наверху уже в темноте, и на следующее утро ты заходишь в те же дворы внутрь. Красный второй: мост, Староместская, куранты, Вацлавская. Этого на холме не было.</p>
      <p style="margin:8px 0 0">Если красный поставить первым, среда схлопывается. Утром Град сама, в 15:15 синий снова ведёт на тот же холм.</p>
      <p style="margin:8px 0 0">Дальше так же. Четверг музей, когда центр уже узнаваем. Пятница Вышеград, потом Клементинум или Муха. Суббота рынки. Воскресенье дорога.</p>
      <p style="margin:8px 0 0">На ${link(U.guide2, 'странице «Прага за 2 дня»')} сначала правый берег, потом Страгов. У тебя наоборот, и это специально: во вторник есть только вечер, а внутрь Града ты успеваешь утром среды.</p>
    </div>
    <div class="card">
      <h3>Вторник 24-го, синий</h3>
      <p>Страгов, Лорета, Новый Свет, Градчаны, Град снаружи, Злата улочка. Старт 15:15, около 2 часов 15 минут. Встреча у Starbucks, Malostranské náměstí 5, жёлтая табличка. Метро A, Malostranská.</p>
      <p>${link(U.blue, 'Страница синего маршрута')}. Бронь в день прилёта, после посадки. Финал уже в темноте, к ребятам ближе к семи.</p>
    </div>
    <div class="card">
      <h3>Среда 25-го, красный</h3>
      <p>Мала Страна, Мальтийский квартал, Карлов мост, Старый город, куранты, театр Моцарта, Вацлавская, Новый город. Та же точка сбора.</p>
      <p>${link(U.red, 'Страница красного маршрута')}. Билет уже есть. Утро с 10:00 свободно под Град. Домой около 18:00, котов покорми до выхода или сразу после.</p>
    </div>
    <div class="card">
      <h3>Четверг 26-го</h3>
      <p>Утро в ${link(U.palace, 'Велетржном дворце')}. Если вторник сорвался, четверг запасной синий, та же ${link(U.blue, 'ссылка')}, дворец тогда сдвигается.</p>
    </div>
    <div class="card">
      <h3>Бронь</h3>
      <p>Красный оплачен. Синий в день прилёта: ${link(U.t1515, 'tours15-15.com/prague')}. Письмо ${link(U.mail, 'booking@tours15-15.com')}, WhatsApp ${link(U.wa, '+31 6 53409309')}.</p>
    </div>
    <div class="card">
      <h3>Пешком и аудио</h3>
      <p>Бесплатный спуск от Града: ${link(U.guide1, 'Прага за 1 день')}</p>
      <p>Правый берег и Страгов отдельно: ${link(U.guide2, 'Прага за 2 дня')}</p>
      <p>Оглавление: ${link(U.guide, 'guide-prague.org')}</p>
      <p>Билеты Града и русский аудиогид на стойке, около 350 Kč (€14): ${link(U.hrad, 'hrad.cz')}</p>
      <p>Бесплатные аудио, скачай в Вильнюсе: ${link(U.izi, 'izi.travel')}</p>
    </div>
  </section>`;

  D.must = () => `
  <section class="section wrap">
    <p class="section-label">Список поездки</p>
    <h1>Мастхэв</h1>
    <p class="lede">Что сделать в эти даты. Подробности и порядок лежат в днях.</p>
    <div class="must-grid">
      <article class="card must-card" id="markets">
        <img src="assets/places/oldtown.jpg" alt="Староместская площадь и Тынский храм">
        <div class="must-body">
          <h3>Ярмарки, первый раз</h3>
          <ul>
            <li>Среда вечером, площадь Республики. Маленькая, с 25 ноября. Первый заход: один svařák и кружка.</li>
            <li>Кружку дают с залогом. Залог возвращают, когда сдаёшь кружку на ту же точку.</li>
            <li>Пятница после корма, náměstí Míru. Церковь св. Людмилы, районные палатки, с 20 ноября, примерно до 20:00. Рядом пекарня Antonínovo.</li>
            <li>Суббота с 10:00, Староместская и Вацлавская, до 22:00 и до 6 января. Днём смотришь ёлку при свете. В 16:30 первое зажигание сезона, потом каждый час до 21:30, песня Ewy Farny. Вечер проводишь в толпе.</li>
            <li>Главная ёлка около 23 метров, вторая на Вацлавской около 21 метра, пять минут пешком.</li>
            <li>Воскресенье без часа: те же две площади, ещё одно зажигание, если в 16:30 ещё в центре. В 18:30 уже из дома.</li>
            <li>На площади: один глинтвейн и одна горячая еда с прилавка. Телефон во внутренний карман.</li>
          </ul>
        </div>
      </article>
      <article class="card must-card">
        <img src="assets/places/lokal.jpg" alt="Зал Lokál, пивные танки">
        <div class="must-body">
          <h3>Свичкова и пиво</h3>
          <ul>
            <li>Свичкова один раз: говядина в сливках, кнедлик, клюква, взбитые сливки. Вторник в Lokál U Bílé kuželky на Míšeňská 12 или четверг в Lokál Dlouhá, Dlouhá 33.</li>
            <li>Гуляш, если свичкова уже была. Здесь он густой, с кнедликом.</li>
            <li>Pilsner из танка в том же зале. Тёмный тоже есть, если светлый уже пила.</li>
            <li>В будни обед это polední menu, обычно до трёх. После него ужин может быть супом.</li>
            <li>В Вильнюсе в понедельник цепелины в Žemaičių ąsotis, Naugarduko 32.</li>
          </ul>
        </div>
      </article>
      <article class="card must-card">
        <img src="assets/places/municipal.jpg" alt="Общественный дом на площади Республики">
        <div class="must-body">
          <h3>Výtopna, поезд к столу</h3>
          <ul>
            <li>${link(U.vytopna, 'Výtopna')}, Václavské náměstí 56, первый этаж. 900 метров рельсов, поезд привозит напиток и тарелку.</li>
            <li>Каждый день 11:00 до 24:00. Своё пиво и Krušovice, стейк или бургер.</li>
            <li>Суббота: рынок и музей на этой площади, обед здесь же. Рядом ещё Louvre на Národní и Khromberry на V Jirchářích 6.</li>
          </ul>
        </div>
      </article>
      <article class="card must-card">
        <img src="assets/places/mucha.jpg" alt="Дверь музея Мухи">
        <div class="must-body">
          <h3>Сувениры</h3>
          <ul>
            <li>Лист или открытка Мухи в магазине музея: Саварин, Na Příkopě 10, или маленький музей на Panská 7. Берёшь там, где видела оригинал.</li>
            <li>Карандаши Koh-i-noor в обычном papírnictví. Чешские, для руки, без сувенирной наценки.</li>
            <li>Каталог или открытка Велетржного дворца с кассы, если лежат. Это память про дом 1928 года.</li>
            <li>Чёрно-белая полоска из автомата: четверг, Pasáž U Nováků, Vodičkova 28, рядом с конём. Или пятница, Vyšehradská 128, по дороге с Вышеграда.</li>
            <li>Пиво домой из Albert или Billa, в чемодан на автобус.</li>
          </ul>
        </div>
      </article>
      <article class="card must-card">
        <img src="assets/places/castle.jpg" alt="Пражский Град над мостом">
        <div class="must-body">
          <h3>Град</h3>
          <ul>
            <li>Вторник вечером синий показывает холм в темноте: Страгов, Новый Свет, дворы, Злата улочка.</li>
            <li>Среда с 10:00, если хочешь внутрь: круг 450 Kč (€19), собор, дворец, Георгий. Дворы бесплатные и тоже считаются.</li>
            <li>Вниз по Старым замковым ступеням, смотровая Na Opyši на середине.</li>
          </ul>
        </div>
      </article>
      <article class="card must-card">
        <img src="assets/places/charles.jpg" alt="Башня Карлова моста">
        <div class="must-body">
          <h3>Мост и кадр Depeche Mode</h3>
          <ul>
            <li>Среда, красный маршрут: мост уже с фонарями.</li>
            <li>Пятница около 7:00, если встанешь. Чёрно-белое фото у Пьеты. В 1988 здесь стояли Дэйв Гаан и Мартин Гор, снимал Антон Корбейн.</li>
            <li>После кадра завтрак в Café Savoy, Vítězná 5, с 8:00. В 9:15 на Вышеград.</li>
          </ul>
        </div>
      </article>
      <article class="card must-card">
        <img src="assets/places/clock.jpg" alt="Циферблат пражских курантов">
        <div class="must-body">
          <h3>Площадь и куранты</h3>
          <ul>
            <li>Четверг после дворца. Подходишь за три минуты до часа, бой около минуты, Тын снаружи, смотришь с края.</li>
            <li>Башня из книг на Марианской площади, бесплатно, четверг до 19:30.</li>
            <li>Целетна, Пороховые ворота, дом У чёрной мадонны, конь в Луцерне. Всё по одной линии.</li>
          </ul>
        </div>
      </article>
      <article class="card must-card">
        <img src="assets/places/vysehrad.jpg" alt="Базилика на Вышеграде">
        <div class="must-body">
          <h3>Вышеград, Клементинум, музей</h3>
          <ul>
            <li>Пятница утром Вышеград. Кладбище: Дворжак, Муха, Сметана. Метро C, станция Vyšehrad. Бесплатно.</li>
            <li>После трёх Клементинум, 380 Kč (€16), слот, зал с порога. Если слота нет, музей Мухи на Panská, 300 Kč (€12).</li>
            <li>Суббота, Национальный музей на голове Вацлавской. 360 Kč (€15), 10:00 до 18:00, купол и залы. Билет на ${link(U.nm, 'nm.cz')}.</li>
            <li>Четверг утро, Велетржный дворец, 250 Kč (€10). Это главный зал поездки: дом 1928 года и чешский модерн.</li>
          </ul>
        </div>
      </article>
    </div>
  </section>`;

  D.more = () => `
  <section class="section wrap">
    <h1>Ещё</h1>
    <p class="lede">Это не дневной план. Открывай, когда надо.</p>
    <div class="toc-list">
      ${[
        ['must', '1', 'Мастхэв', 'Еда, сувениры, что увидеть'],
        ['booking', '2', 'До вылета', 'Жильё, слот, Lokál'],
        ['packing', '3', 'Что взять', 'Ботинки и капюшон'],
        ['transport', '4', 'Дорога', '10:00 туда, около 20:00 обратно'],
        ['tours', '5', 'Экскурсии', 'Синяя 24-го, красная 25-го'],
        ['tips', '6', 'На месте', 'Деньги, вечер, суббота'],
        ['budget', '7', 'Сколько на билеты', 'Проезд, входы, одна экскурсия'],
        ['backup', '8', 'Если поехало', 'Дождь и поздний рейс'],
        ['food', '9', 'Еда', 'Одной'],
        ['cafes', '10', 'Кафе', 'После четырёх']
      ].map(([id, num, title, sub]) => `
        <a class="toc-item" href="#${id}">
          <div class="toc-num">${num}</div>
          <div><h3>${title}</h3><p>${sub}</p></div>
        </a>`).join('')}
    </div>
  </section>`;

  D.practical = () => D.more();

  D.today = () => {
    const t = todayTarget();
    return `
    <section class="section wrap">
      <p class="section-label">Сегодня</p>
      <h1>${t.id ? 'День поездки' : 'Сейчас не эти даты'}</h1>
      <p class="lede">${t.id ? 'Календарь совпал с поездкой.' : 'Гид откроется на плане. С 23 по 29 ноября кнопка сама ведёт в нужный день.'}</p>
      <a class="btn btn-solid" href="#${t.id || 'plan'}">${t.id ? 'Открыть день' : 'К плану'}</a>
    </section>`;
  };
})();
