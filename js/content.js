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
    palace: 'https://www.ngprague.cz/en/about/buildings/trade-fair-palace',
    upm: 'https://www.upm.cz/en/visiting/addmission/',
    kunsthalle: 'https://www.kunsthallepraha.org/vstupenky',
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
    const bodyBits = [
      shot,
      p.desc ? `<p>${p.desc}</p>` : '',
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
      <a class="hub-tile" href="#tours"><span class="hub-ico">🚶</span><strong>15:15</strong><span>Синяя во вторник, красная в среду</span></a>
    </div>

    <div class="card card-soft">
      <p style="margin:0"><strong>Где жить.</strong> Квартира знакомых, точного адреса пока нет. Они улетают 25-го, с этого вечера коты на тебе. 24-го вечером ничего не ставим: инструкции, ключи, корм. Когда будет улица, впишем метро и дорогу от аэропорта.</p>
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
        <li><strong>Пн 23.</strong> Минск, Вильнюс к шести или семи. Ужин, сон. Город не осматриваем.</li>
        <li><strong>Вт 24.</strong> Чемодан в ячейку. В 15:15 синий маршрут, Град с гидом. К ребятам ближе к семи, с чемоданом.</li>
        <li><strong>Ср 25.</strong> Они улетают рано, день спокойный и с 10:00. Утром Град, если хочешь внутрь. В 15:15 красный. Вечером коты.</li>
        <li><strong>Чт 26.</strong> Залы для тебя: функционализм и чешский модерн, потом кубизм и модерн на улице. Еврейский музей не ставим.</li>
        <li><strong>Пт 27.</strong> Вышеград утром. После трёх Клементинум или Муха.</li>
        <li><strong>Сб 28.</strong> Большие рынки открываются сегодня в 10:00. Иди утром. Вечером на Староместской будет тесно.</li>
        <li><strong>Вс 29.</strong> Кофе, сумка, автобус с главного вокзала около 20:00. Кутну Гору в эту поездку не ставим.</li>
      </ul>
    </div>
    <div class="callout callout-paprika">
      <strong>Погода</strong>
      Это дальний ориентир на 1 ноября, не прогноз на ближайшие дни. Прага по AccuWeather: 24-го около +7 днём и -2 ночью, дальше холоднее, к 29-му около +2 днём и -4 ночью. Вильнюс 23-го обычно около +2 днём и -4 ночью, сыро. За неделю до выезда открой прогноз ещё раз.
    </div>
    <div class="callout callout-gold">
      <strong>Проездной</strong>
      Во вторник один билет на 90 минут, 46 Kč (€2) в ${link(U.litacka, 'Lítačka')}. В среду утром суточный за 140 Kč (€6). В четверг утром на 72 часа за 340 Kč (€14): он закроет четверг, пятницу и субботу до утра. В воскресенье снова 90 минут до вокзала. ${link(U.funicular, 'Лановка на Петршин')} входит в сутки и в 72 часа. В обычные 90 минут не входит.
    </div>
  </section>`;

  D.day23 = () => `
  <section class="section wrap day-page">
    <header class="day-head">
      <h1>23 ноября, понедельник</h1>
      <p class="lede">Минск, к вечеру Вильнюс, ночуешь у вокзала. Ужин рядом и короткая дуга по освещённому старому городу, если ещё стоишь на ногах. Город днём не осматриваем: в 10:00 самолёт. Погода на 23 ноября, ориентир на 1 ноября: днём около +2, ночью около -4, часто мокро, снег в эти даты бывает.</p>
    </header>
    ${window.GuideMaps.day23()}
    <div class="day-steps">
${step({
  icon: '🚌',
  when: 'день',
  title: 'Минск, потом Вильнюс',
  lead: 'Как добираешься, так и едь',
  detail: 'Закладывай свою дорогу так, чтобы в шесть или семь уже быть на месте, не в восемь с опозданием. Чемодан на завтрашний самолёт собери ещё в Минске.'
})}
${step({
  icon: '🍽',
  when: '19:00',
  title: 'Ужин у вокзала',
  lead: 'Жемайтская таверна, понедельник до 23:00',
  detail: `Рынок Halės в понедельник закрыт, туда не иди. Ужин в ${link(U.zemaiciai, 'Žemaičių ąsotis')}, Naugarduko g. 32-1, минут пятнадцать пешком от вокзала. Литовская еда по деревенским рецептам: цепелины, мясо, домашнее пиво, зал с камином и глиняными кувшинами. Одной в понедельник тут спокойно, бронь не нужна. Если приехала к шести и хочешь сначала часовню, поешь после ворот. Если к семи и уже голодная, садись сразу, а ворота посмотри с улицы: часовня закрывается в 19:00.`,
  maps: gmaps('Žemaičių ąsotis Naugarduko Vilnius')
})}
${step({
  icon: '🚶',
  when: 'после ужина',
  title: 'Вечерняя дуга и назад',
  lead: 'Ворота, одна улица, собор, спать',
  detail: `От вокзала минут десять до ${link(U.vnoWalk, 'Остробрамских ворот')}. Это единственные уцелевшие ворота стены. Часовня с иконой бесплатная, лестница слева, если смотреть из старого города, и только до 19:00. Дальше одна улица меняет имя: Aušros Vartų, потом Didžioji, потом Pilies, и ты на Кафедральной площади. У собора плитка stebuklas: встать, загадать, повернуться. Холм Гедимина смотри снизу, на башню не поднимайся. Назад той же улицей до вокзала. Вся дуга около сорока минут ходьбы. Если ноги уже не твои, только ворота и обратно, минут двадцать. Это единственный вильнюсский вечер, днём город не добавляем.`,
  maps: gmaps('Aušros vartai Vilnius')
})}
${step({
  icon: '😴',
  when: 'ночь',
  title: 'Сон',
  lead: 'Утром поезд в аэропорт, семь минут',
  detail: `Вылет в 10:00, вторник. От вокзала до Vilnius Airport поезд LTG Link, около семи минут, билет €0,90. В будни составы к аэропорту идут примерно с 08:00, для шенгенского рейса этого хватает. Расписание на ${link(U.ltglink, 'ltglink.lt')} и у ${link(U.vnoTrain, 'аэропорта')}: электрификация его двигает, вечером сверь утро. Будильник с запасом на платформу, не на час дороги. Телефон на зарядке.`
})}
    </div>
  </section>`;

  D.day24 = () => `
  <section class="section wrap day-page">
    <header class="day-head">
      <h1>24 ноября, вторник</h1>
      <p class="lede">Ты выспалась, так что день рабочий. Чемодан в ячейку на вокзале. Обед рядом со стартом экскурсии, в 15:15 синий маршрут. Потом сумка и к ребятам. Реалистично к семи: экскурсия кончается около 17:30, и ты ещё на Граде. Ужин по умолчанию с ними. Если есть в городе, к ним ближе к восьми. Погода, ориентир на 1 ноября: днём около +7, ночью около -2. Может моросить, камни скользкие.</p>
    </header>
    ${window.GuideMaps.day24()}
    <div class="day-steps">
${step({
  icon: '✈️',
  when: '10:00',
  title: 'Вылет из Вильнюса',
  lead: 'В Праге около полудня, если рейс прямой',
  detail: 'Václav Havel. Если посадка сдвинется сильно, режь Град и оставляй мост с площадью. К ребятам в шесть или семь всё равно надо успеть.'
})}
${step({
  icon: '🚌',
  when: 'после посадки',
  title: 'Автобус 59 и метро до главного вокзала',
  lead: 'Не в квартиру',
  placeId: 'bus59',
  ticket: '90 минут, 46 Kč (€2) в Lítačka',
  detail: `Билет в ${link(U.litacka, 'PID Lítačka')}, активируй до автобуса. Расписание аэропорта на ${link(U.pidAir, 'pid.cz')}. 59 до Nádraží Veleslavín, метро A до Muzeum, там пересадка на C, одна остановка до Hlavní nádraží. Около часа. Airport Express не нужен.`,
  maps: gmaps('Praha hlavní nádraží')
})}
${step({
  icon: '🧳',
  when: 'около 13:15',
  title: 'Ячейка на вокзале',
  lead: 'Самообслуживание, не стойка',
  detail: `Ячейки на ${link(U.station, 'главном вокзале')}, обычно в нижнем уровне. Плати картой, цену смотри на шкафчике. Паспорт и карты с собой. Обслуживаемая камера с конца июля 2026 могла встать на ремонт. Если ячеек нет, ${link(U.bounce, 'Bounce')} рядом, около 5 евро за день.`,
  maps: gmaps('Praha hlavní nádraží luggage lockers')
})}
${step({
  icon: '🍽',
  when: 'около 14:00',
  title: 'Обед до экскурсии',
  lead: 'Рядом со стартом, не у вокзала',
  detail: `Ячейка, потом метро A до Malostranská. ${link(U.kuzelka, 'Lokál U Bílé kuželky')}, Míšeňská 12, четыре минуты от площади сбора. Во вторник открыт до полуночи. Свичкова, пиво, скамья, одной нормально. Сядь сразу и в 14:45 выходи: в Starbucks надо быть к 15:00. Если рейс сел поздно и ты на Малой Стране после 14:30, не садись. Возьми булку по пути.`,
  maps: gmaps('Lokál U Bílé kuželky Prague')
})}
${step({
  icon: '🚶',
  when: '15:15',
  title: 'Синий маршрут 15:15',
  lead: 'Страгов, Новый Свет, Град, Злата улочка',
  placeId: 'castle',
  ticket: '€30',
  booking: 'за сутки',
  detail: `Встреча у Starbucks, Malostranské náměstí 5, жёлтая табличка. С вокзала метро A до Malostranská, будь там к 15:00. ${link(U.blue, 'Синий маршрут')}, общий календарь на ${link(U.t1515, 'tours15-15.com/prague')}. На 2 ноября 2026 на сайте синий, поэтому 24-е тоже должно быть синим. Перед оплатой сверь календарь. Свет кончается в 16:08, финал на Граде уже в темноте. Это нормально: днём ты всё равно не успела бы и Град, и чемодан, и ребят. Если рейс сел поздно и на 15:15 не успеваешь, синий переноси на четверг. Красный в этот день не ставь, он в среду.`,
  maps: gmaps('Starbucks Malostranské náměstí Prague'),
  alts: [
    { name: 'Сама по guide-prague', tag: '0 Kč', why: `Если €30 во вторник жалко. Маршрут сверху вниз на ${link(U.guide1, 'guide-prague.org')}. Тогда к ребятам успеваешь ближе к шести, не к семи.`, maps: gmaps('Prague Castle') }
  ]
})}
${step({
  icon: '🗝',
  when: 'после 17:30',
  title: 'Чемодан и ребята к семи',
  lead: 'К шести после экскурсии не успеть',
  detail: 'Синий кончается на Граде около 17:30. Трамвай 22 вниз, метро до вокзала, ячейка, и к ним. Закладывай семь. Дома: ключи, корм, лоток, ветеринар, вайфай. Ужин по умолчанию с ними, бронь не нужна.',
  maps: gmaps('Praha hlavní nádraží'),
  alts: [
    { name: 'Ужин в городе', tag: 'к ним около 20:00', why: `Если с ними только чай, а есть хочешь сама: с Града вниз в ${link(U.rychta, 'Baráčnická rychta')}, Tržiště 23, две минуты от площади сбора. Чешское, пиво, можно одной, каждый день до 22:30. Потом чемодан. Напиши им, что будешь ближе к восьми. В кужелку второй раз за день не ходи.`, maps: gmaps('Baráčnická rychta Prague') }
  ]
})}
    </div>
  </section>`;

  D.day25 = () => `
  <section class="section wrap day-page">
    <header class="day-head">
      <h1>25 ноября, среда</h1>
      <p class="lede">Они улетают рано утром, так что день твой целиком. Выход в 10:00, не раньше. Утром Град, внутрь если хочешь: вчера синий показал его уже в темноте. В 15:15 красный. Домой к котам после экскурсии, около шести. Погода, ориентир на 1 ноября: днём около +6, ночью около 0.</p>
    </header>
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
  detail: `Вчера ты видела Град в темноте. Сегодня как раз время зайти внутрь, если хочешь: круг 450 Kč (€19) на ${link(U.hrad, 'hrad.cz')}, льготный 300 Kč (€12). Дворов тоже хватает, если бюджет жмёт. Южные сады с ноября по март закрыты. Аудиогид на стойке по-русски около 350 Kč (€14), только если идёшь внутрь. В 13:30 уже вниз: в 15:00 ты должна быть на Малостранской.`,
  maps: gmaps('Prague Castle'),
  alts: [
    { name: 'Только дворы', tag: '0 Kč', why: 'Если внутри храмы тебя не держат, фасад св. Вита и вид уже делают день.', maps: gmaps('Prague Castle') }
  ]
})}
${step({
  icon: '🍽',
  when: 'обед',
  title: 'Поесть на спуске',
  lead: 'На бюджете не Savoy',
  detail: 'С холма вниз по Нерудовой, мимо св. Николая, на Кампу на десять минут. Если во вторник уже ела в Lokál U Bílé kuželky, сюда не возвращайся: дневное меню по пути вниз, нормальный ужин оставь на Dlouhá. Если вторничного обеда не было, кужелка на Míšeňská как раз по пути. Savoy красивый и для этой поездки дорогой. Нерудова в ноябре скользкая, не спеши.',
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
  detail: `Та же точка сбора, Starbucks на Малостранской. ${link(U.red, 'Красный маршрут')}. Если чередование не собьётся, 25-е красное. Проверь в календаре на ${link(U.t1515, 'сайте')} до оплаты. Кончается около 17:30 в Новом городе. Домой к котам сразу после, корм по их схеме.`,
  maps: gmaps('Starbucks Malostranské náměstí Prague')
})}
${step({
  icon: '🌙',
  when: 'после корма',
  title: 'Если ещё есть силы',
  lead: 'Короткий выход, не второй день',
  placeId: 'republic',
  detail: 'Сегодня открылся рынок на площади Республики, он меньше Староместской. Сорок минут, один глинтвейн, и домой. На Староместскую в этот вечер не ходи: ты её уже прошла с красным маршрутом. Если сил нет, оставайся с котами. Это нормальный вечер.',
  maps: gmaps('náměstí Republiky Prague')
})}
    </div>
  </section>`;

  D.day26 = () => `
  <section class="section wrap day-page">
    <header class="day-head">
      <h1>26 ноября, четверг</h1>
      <p class="lede">Выход в 10:00. Утро в Велетржном дворце: это дом и коллекция сразу. Днём кубизм, конь Черны и кофе в модерне. Еврейский музей в эту поездку не берём. Погода, ориентир на 1 ноября: днём около +6, ночью около -1. Зонт в сумке.</p>
    </header>
    ${window.GuideMaps.day26()}
    <div class="day-steps">
${step({
  icon: '🖼',
  when: '10:00',
  title: 'Велетржный дворец',
  lead: 'Функционализм снаружи, модерн внутри',
  ticket: '250 Kč (€10)',
  detail: `Дом Иосефа Фукса и Олдржиха Тыла, 1928, бывший выставочный дворец. Тебе он нужен и как здание, и как зал: чешское искусство с XIX века до нынешнего, кубизм, Купка, холсты Мухи. Билет на все постоянные залы внутри, ${link(U.palace, 'ngprague.cz')}, 250 Kč (€10). Вторник по воскресенье 10:00 до 18:00, понедельник закрыт, поэтому это четверг, не суббота с рынком. Метро C, Vltavská, или трамвай до Veletržní palác. С 10:30 до часу. Синий 15:15 сегодня не бери, если уже была во вторник. Если вторник сорвался, четверг запасной синий, ${link(U.blue, 'та же страница')}, и дворец тогда сдвигается.`,
  maps: gmaps('Veletržní palác Prague'),
  alts: [
    { name: 'Kunsthalle вместо дворца', tag: '320 Kč (€13)', why: `Если хочешь живые выставки, а не историю чешского модерна. Бывшая подстанция на Кларове, ${link(U.kunsthalle, 'kunsthallepraha.org')}. Вторник закрыта, четверг 11:00 до 19:00. Тогда утро не в Голешовице, а на Малой Стране, и к обеду ты уже ближе к центру.`, maps: gmaps('Kunsthalle Praha Klárov') }
  ]
})}
${step({
  icon: '🕰',
  when: 'после музея',
  title: 'Площадь и один бой часов',
  lead: 'Подошла за три минуты до часа',
  placeId: 'clock',
  detail: `После дворца ты в центре. Куранты крутятся около минуты, подходи за три минуты до часа и уходи. Тын снаружи. Есть на площади не садись. Дальше Целетна до Пороховых ворот. Дом У чёрной мадонны на углу: кубизм Гочара, фасад бесплатно. Зал чешского кубизма внутри, если ещё хочешь билет, 150 Kč (€6) у ${link(U.upm, 'Музея декоративного искусства')}. Потом пассаж Lucerna: конь Черны вверх ногами, бесплатно, кадр снизу. Это кусок со ${link(U.guide2, 'страницы на два дня')}.`,
  maps: gmaps('Old Town Square Prague')
})}
${step({
  icon: '🍽',
  when: 'обед',
  title: 'Lokál Dlouhááá',
  lead: 'Пять минут от площади, если ещё не была в среду',
  placeId: 'lokal',
  detail: `Dlouhá 33, ${link(U.lokal, 'сайт Lokál')}. Свичкова, пиво, длинная скамья. Одной тут проще, чем за белой скатертью на двоих. Если красный в 15:15, обед раньше двух, иначе не успеешь на Малостранскую.`,
  maps: gmaps('Lokál Dlouhááá Prague')
})}
${step({
  icon: '☕',
  when: 'после трёх',
  title: 'Общественный дом',
  lead: 'Уже темнеет, и это как раз зал',
  placeId: 'municipal',
  detail: `Кофе в зале, не обед. Общественный дом это модерн 1912 года, мозаика на фасаде, и чашка здесь заменяет экскурсию по интерьерам. Если вместо кофе хочется ещё один зал и ты вышла из дворца не выжатая: официальный музей Мухи в дворце Саварин, Na Příkopě 10, пространство Евы Йиржичной, плакаты, рисунки, холсты семьи. Каждый день 10:00 до 18:00, билет на ${link(U.muchaNew, 'mucha.eu')}, около 300 Kč (€12). Маленький музей на Panská 7, ${link(U.mucha, 'mucha.cz')}, это другая витрина, его не дублируй. Сил нет, метро домой.`,
  maps: gmaps('Municipal House Prague'),
  alts: [
    { name: 'Музей Мухи в Саварине', tag: 'около 300 Kč (€12)', why: 'Если кофе в Общественном доме уже не нужен и хочется линии, плаката и зала Йиржичной. Успеть до 18:00.', maps: gmaps('Mucha Foundation Savarin Palace Prague') }
  ]
})}
${step({
  icon: '🌙',
  when: 'после корма',
  title: 'Если ещё есть силы',
  lead: 'Мост, не второй музей',
  placeId: 'charles',
  detail: 'Сначала коты. Потом, если ещё хочется улицы: Карлов мост на десять минут, в четверг он тише, чем будет в субботу. Общественный дом второй раз не открывай, если уже была днём. Сил нет, оставайся дома.',
  maps: gmaps('Charles Bridge Prague')
})}
    </div>
    <p class="day-tip"><strong>Утро четверга:</strong> включи билет на 72 часа. Он покроет ещё пятницу и субботу до утра.</p>
  </section>`;

  D.day27 = () => `
  <section class="section wrap day-page">
    <header class="day-head">
      <h1>27 ноября, пятница</h1>
      <p class="lede">Медленный день, выход в 10:00. Утро на Вышеграде. Красный, если не успела его в среду, можно перенести сюда: 27-е тоже должно быть красным. Если среда прошла, пятница без второй экскурсии. Вечер на площади шумный. Погода, ориентир на 1 ноября: днём около +4, ночью около -1, скорее пасмурно.</p>
    </header>
    ${window.GuideMaps.day27()}
    <div class="day-steps">
${step({
  icon: '⛰',
  when: '10:00',
  title: 'Вышеград',
  lead: 'Метро A до Muzeum, потом C до Vyšehrad',
  placeId: 'vysehrad',
  detail: 'Крепость бесплатная. Кладбище зайди, если любишь имена: Дворжак, Муха, Сметана. На стенах не зависай, если ветер. Час или полтора, и вниз.',
  maps: gmaps('Vyšehrad Prague')
})}
${step({
  icon: '🍽',
  when: 'обед',
  title: 'Горячее',
  lead: 'Дневное меню в будни обычно до трёх',
  detail: 'Polední menu сытнее, чем кажется. После него ужин может быть супом. Не ищи «особенное место» через весь город.'
})}
${step({
  icon: '📚',
  when: 'после 15:00',
  title: 'Клементинум или Муха',
  lead: 'То, на что есть билет',
  placeId: 'klementinum',
  ticket: 'Клементинум 380 Kč (€16), Муха 300 Kč (€12)',
  detail: 'Клементинум только со слотом, тур около 45 минут, библиотеку смотрят с порога. Билеты у Prague City Tourism. Если слота нет, Муха на Panská спокойнее, чем охота за кассой. Петршин в пятницу бери, только если сухо и очень хочется: лановка входит в твой проездной, холм после дождя скользкий.',
  maps: gmaps('Klementinum Prague'),
  alts: [
    { name: 'Музей Мухи', tag: 'если нет слота', why: 'Тёплый зал до шести. Эпопея Мухи в Праге не висит, она в Моравском Крумлове.', maps: gmaps('Mucha Museum Prague') }
  ]
})}
${step({
  icon: '🍺',
  when: 'вечер',
  title: 'Домой к котам',
  lead: 'Вечер от их схемы кормления',
  detail: 'Ужин где получится по дороге домой или дома. Пятничная Староместская тебе ничего не должна. Если их район окажется у Ригровых садов и не льёт, пять минут на газоне и в тепло.',
  maps: gmaps('Riegrovy sady Prague')
})}
${step({
  icon: '🌙',
  when: 'после корма',
  title: 'Если ещё есть силы',
  lead: 'Площадь Мира, если ещё хочется огней',
  placeId: 'miru',
  detail: 'Сначала коты. Если силы есть, рынок на náměstí Míru: церковь св. Людмилы и районные палатки, он уже работает с 20 ноября, примерно с 10 до 20. Метро A, станция Náměstí Míru. Полчаса, один глинтвейн, и домой. Это тише Староместской, большие ёлки всё равно в субботу утром. Если мокро и не хочется площади, торт в Café Louvre вместо рынка. Сил нет, вечер дома.',
  maps: gmaps('náměstí Míru Prague Christmas market')
})}
    </div>
  </section>`;

  D.day28 = () => `
  <section class="section wrap day-page">
    <header class="day-head">
      <h1>28 ноября, суббота</h1>
      <p class="lede">Сегодня включают большие рынки на Староместской и на Вацлавской, с 10:00 до 22:00, до 6 января. Выход в 10:00. Иди утром, не вечером. Погода, ориентир на 1 ноября: днём около +3, ночью около -4. Самый холодный кусок поездки, шапка нужна.</p>
    </header>
    ${window.GuideMaps.day28()}
    <div class="day-steps">
${step({
  icon: '🎟',
  when: '10:00',
  title: 'Новый суточный билет',
  lead: 'Вчерашний проездной к утру кончается',
  ticket: '140 Kč (€6) на 24 часа',
  detail: 'Включи в приложении перед первой поездкой. До вечера и до ночи его хватит.'
})}
${step({
  icon: '🌉',
  when: 'до рынка',
  title: 'Мост, пока площадь ещё не наполнилась',
  lead: 'Короткий круг и назад',
  placeId: 'charles',
  detail: 'Если выйдешь к девяти, на мосту тише, чем в полдень. Потом сразу на Староместскую к открытию в десять. Ёлка, огни, глинтвейн. Трдельник тёплый, ужином его не считай. Сосиска на площади тоже.',
  maps: gmaps('Old Town Square Prague')
})}
${step({
  icon: '☕',
  when: 'день',
  title: 'Уйти с площади',
  lead: 'К двум там уже тесно',
  placeId: 'louvre',
  detail: 'Café Louvre на Národní: торт, можно сидеть одной сколько хочешь. Или домой к котам и полежать. Вацлавскую пройди один раз, если интересна вторая ёлка, и не задерживайся у обменников.',
  maps: gmaps('Café Louvre Prague')
})}
${step({
  icon: '🌙',
  when: 'вечер',
  title: 'Домой до ночной толпы',
  lead: 'Суббота на Староместской громкая',
  detail: 'Если очень захочется огней второй раз, зайди на час рано вечером и уезжай. Одной в этой давке просто неудобно. Телефон во внутренний карман.',
  maps: gmaps('Old Town Square Prague')
})}
${step({
  icon: '🌙',
  when: 'после корма',
  title: 'Если ещё есть силы',
  lead: 'Только мост, площадь уже не твоя',
  placeId: 'charles',
  detail: 'Самый холодный вечер поездки. После корма имеет смысл только Карлов мост: десять минут у перил, шапка, и домой. Староместская в субботу вечером тесная. Если дует, не выходи. Коты и одеяло честнее.',
  maps: gmaps('Charles Bridge Prague')
})}
    </div>
  </section>`;

  D.day29 = () => `
  <section class="section wrap day-page">
    <header class="day-head">
      <h1>29 ноября, воскресенье</h1>
      <p class="lede">Автобус с главного вокзала около 20:00. День пустой специально, выход в 10:00. Новый замок сюда не ставим. Из квартиры в 18:30. Погода, ориентир на 1 ноября: днём около +2, ночью около -4. Самый холодный день, на вокзал в капюшоне.</p>
    </header>
    ${window.GuideMaps.day29()}
    <div class="day-steps">
${step({
  icon: '☕',
  when: '10:00',
  title: 'Кофе и сбор сумки',
  lead: 'Без программы',
  detail: 'Если хочется последний кадр, мост или náměstí Míru утром, пока светло, и сразу назад паковать сумку. Собор в Граде сегодня для туристов с 12:00. Туда не идём: в 18:30 ты уже с чемоданом на метро. Он и так был в среду.'
})}
${step({
  icon: '🚌',
  when: '18:30',
  title: 'Автобус с главного вокзала',
  lead: 'Отправление около 20:00',
  ticket: '90 минут, 46 Kč (€2)',
  detail: `Выход из квартиры в 18:30. Метро до ${link(U.station, 'Praha hlavní nádraží')}, около часа, точную ветку посчитаем от их улицы. На месте лучше в 19:30: найди стоянку автобусов у вокзала по билету, не беги с чемоданом за пять минут. Билет на 90 минут в ${link(U.litacka, 'Lítačka')} активируй до метро. Котам еда и лоток до отъезда.`,
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
        ['day27', '27', '27 ноября, пт', 'Вышеград утром, потом зал'],
        ['day28', '28', '28 ноября, сб', 'Рынки с десяти, музей закрыт'],
        ['day29', '29', '29 ноября, вс', 'Автобус с вокзала около 20:00']
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
    <p class="lede">Стол на одного бронируют без объяснений. В центре можно по-английски. Если у двери человек с меню и улыбкой, не замедляй шаг.</p>
    <div class="card">
      <h3>Lokál Dlouhááá</h3>
      <p>Dlouhá 33, пять минут от Староместской. Длинные скамьи, свичкова, пиво из танка. Одной здесь нормально, ты не сидишь над пустым стулом. Вечером лучше написать: dlouha@ambi.cz. В среду или в четверг, не оба раза обязательно.</p>
      ${window.GuidePlaces.photoOf('lokal')}
      <a class="maps-btn" href="${gmaps('Lokál Dlouhááá Prague')}" target="_blank" rel="noopener">📍 Google Maps</a>
    </div>
    <div class="card">
      <h3>Виноградский парламент</h3>
      <p>Не на вечер прилёта: 24-го ты ужинаешь дома. Это запас, если их район окажется рядом и в пятницу не захочется в центр.</p>
      <a class="maps-btn" href="${gmaps('Vinohradský parlament Prague')}" target="_blank" rel="noopener">📍 Google Maps</a>
    </div>
    <div class="card">
      <h3>Днём</h3>
      <p>В будни ищи polední menu, оно обычно до трёх и сытное. После него ужин может быть супом. Свичкова это говядина в сливках с кнедликом. Гуляш здесь густой, не суп.</p>
    </div>
    <div class="callout callout-paprika">
      <strong>Площадь</strong>
      На Староместской не ешь. Ни во вторник, ни в субботу у ёлки. Трдельник тёплый. Это венгерско-словацкий рожок, не ужин.
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
      <div class="card"><h3>Café Savoy</h3><p>Обед в среду после Града. На дорогой ужин не оставайся.</p>${window.GuidePlaces.photoOf('savoy')}<a href="${gmaps('Café Savoy Prague')}" target="_blank" rel="noopener">Maps</a></div>
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
      <p>Вылет в 10:00. Если рейс прямой, в Праге около полудня. Автобус 59 до Nádraží Veleslavín, дальше метро до их дома. Какая ветка, станет ясно с адресом. Билет на 90 минут в PID Lítačka, в приложении 46 Kč (€2). Активируй до посадки. Airport Express за 200 Kč (€8) не нужен.</p>
    </div>
    <div class="card">
      <h3>Обратно, 29 ноября</h3>
      <p>Автобус с главного вокзала около 20:00. Из квартиры в 18:30. До Praha hlavní nádraží около часа, ветка от их адреса. К стоянке автобусов к 19:30. Новый билет на 90 минут, активируй до метро. Котам еда до отъезда, как скажут.</p>
    </div>
    <div class="card">
      <h3>По городу</h3>
      <p>Среда: сутки за 140 Kč (€6). Четверг утром: 72 часа за 340 Kč (€14), хватает до субботнего утра. Суббота: снова сутки. Воскресенье: 90 минут до вокзала. Каждый билет свой, группового нет. Бумажный суточный компостируй один раз.</p>
    </div>
    <div class="callout callout-gold">
      <strong>Вечером</strong>
      Устала, темно, чемодан или скользкая Нерудова: Bolt до двери. С руки у аэропорта и у вокзала не садись.
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
    <div class="card"><h3>Деньги</h3><p>Плати в кронах. Если терминал предлагает евро, жми кроны. Банкоматы Euronet, синие, просто с надписью ATM, обходи. Иди в Česká spořitelna, ČSOB или Komerční banka. Обменники с нулевой комиссией на Вацлавской пропускай.</p></div>
    <div class="card"><h3>Вечер одной</h3><p>Город спокойный. Телефон во внутренний карман, на мосту и на 22-м сумка спереди. Пьяную компанию в переулке обходишь соседней улицей. С главного вокзала сразу к метро или к поезду.</p></div>
    <div class="card"><h3>Суббота</h3><p>Музей закрыт. Рынок с десяти. К двум на Староместской уже трудно идти. Ты это видела утром, вечером можно не возвращаться.</p></div>
    <div class="card"><h3>Чаевые</h3><p>Если сервис не включён, около десяти процентов. Назови сумму, которую хочешь заплатить, когда отдаёшь карту.</p></div>
  </section>`;

  D.budget = () => `
  <section class="section wrap">
    <h1>Деньги на город</h1>
    <ul>
      <li>Дорога туда и обратно: два билета по 46 Kč (€2), плюс сутки 140 Kč (€6) и 72 часа 340 Kč (€14). Вместе около 570 Kč (€23), если едешь по плану.</li>
      <li>Град внутрь 450 Kč (€19). Дворы бесплатно, и день всё равно складывается.</li>
      <li>Велетржный дворец 250 Kč (€10). Музей Мухи в Саварине около 300 Kč (€12), только если после дворца ещё хочется зал. Еврейский музей не берём.</li>
      <li>Клементинум 380 Kč (€16), только если взяла слот. Муха 300 Kč (€12).</li>
      <li>Две мини-группы 15:15, синяя и красная, по €30. Вместе €60. Персональная от €150 не нужна. Страницы: ${link(U.blue, 'синий')} и ${link(U.red, 'красный')}.</li>
      <li>Городской сбор 50 Kč (€2) с тебя за ночь, день заезда не считается. На сайте его часто нет, попросят в отеле.</li>
    </ul>
  </section>`;

  D.backup = () => `
  <section class="section wrap">
    <h1>Если день поехал</h1>
    <div class="card"><h3>Дождь</h3><p>Музей, Муха, Louvre, Общественный дом. Вышеград и Петршин не геройствуй. Град в среду всё равно стоит дворов, просто меньше сиди на террасах.</p></div>
    <div class="card"><h3>Рейс сел вечером</h3><p>Вторник тогда только сумка и ужин. Град остаётся в среду, ничего не переноси на воскресенье.</p></div>
    <div class="card"><h3>Нет слота в Клементинум</h3><p>Пятница становится музеем Мухи. День от этого не пустеет.</p></div>
  </section>`;

  D.tours = () => `
  <section class="section wrap">
    <p class="section-label">Вторник и среда</p>
    <h1>Обе 15:15</h1>
    <p class="lede">Две мини-группы, по €30. Персональную от €150 не берём. Цвета чередуются, поэтому вторник и среда закрывают оба маршрута. Четверг это повтор синего, его оставляем музею.</p>
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
      <p>${link(U.blue, 'Страница синего маршрута')}. На 2 ноября 2026 на сайте синий, значит 24-е тоже синее, если календарь не сбился. Финал уже в темноте, к ребятам ближе к семи.</p>
    </div>
    <div class="card">
      <h3>Среда 25-го, красный</h3>
      <p>Мала Страна, Мальтийский квартал, Карлов мост, Старый город, куранты, театр Моцарта, Вацлавская, Новый город. Та же точка сбора.</p>
      <p>${link(U.red, 'Страница красного маршрута')}. 25-е должно быть красным. Они улетают рано, утро с 10:00 свободно под Град, 15:15 ни с кем не стыкуется. Домой около 18:00, котов покорми до выхода или сразу после.</p>
    </div>
    <div class="card">
      <h3>Четверг 26-го</h3>
      <p>Синий повторяется. Вторую синюю не покупай, утро в ${link(U.palace, 'Велетржном дворце')}. Если вторник сорвался, четверг запасной синий, та же ${link(U.blue, 'ссылка')}, дворец тогда сдвигается.</p>
    </div>
    <div class="card">
      <h3>Бронь</h3>
      <p>Календарь и обе экскурсии: ${link(U.t1515, 'tours15-15.com/prague')}. Письмо ${link(U.mail, 'booking@tours15-15.com')}, WhatsApp ${link(U.wa, '+31 6 53409309')}. Бронируй за сутки и сверь цвет в форме, не по моему счёту дней.</p>
    </div>
    <div class="card">
      <h3>Пешком и аудио, если одну выкинешь</h3>
      <p>Бесплатный спуск от Града: ${link(U.guide1, 'Прага за 1 день')}</p>
      <p>Правый берег и Страгов отдельно: ${link(U.guide2, 'Прага за 2 дня')}</p>
      <p>Оглавление: ${link(U.guide, 'guide-prague.org')}</p>
      <p>Билеты Града и русский аудиогид на стойке, около 350 Kč (€14): ${link(U.hrad, 'hrad.cz')}</p>
      <p>Бесплатные аудио, скачай в Вильнюсе: ${link(U.izi, 'izi.travel')}</p>
    </div>
  </section>`;

  D.must = () => `
  <section class="section wrap">
    <p class="section-label">Короткий список</p>
    <h1>Мастхэв</h1>
    <p class="lede">Не весь город. Только то, без чего поездка для тебя будет дырявой. Остальное уже разложено по дням.</p>
    <div class="card">
      <h3>Еда</h3>
      <ul>
        <li>Свичкова один раз. Говядина в сливках с кнедликом. Во вторник в Lokál U Bílé kuželky или в четверг на Dlouhá, не оба раза обязательно.</li>
        <li>Гуляш, если свичкова уже была. Здесь он густой, не суп.</li>
        <li>Пиво Pilsner из танка в том же Lokál. Это и есть чешский стакан, не крафт ради крафта.</li>
        <li>В Вильнюсе в понедельник цепелины в Žemaičių ąsotis. Второй такой тарелки в Праге не ищи.</li>
        <li>В будни обед бери как polední menu, обычно до трёх. После него ужин может быть супом.</li>
        <li>Глинтвейн один, на рынке в пятницу или в субботу утром. Ужином его не считай.</li>
        <li>Трдельник тёплый рожок, не чешский ужин. На Староместской не ешь ни в какой день.</li>
      </ul>
    </div>
    <div class="card">
      <h3>Сувениры</h3>
      <ul>
        <li>Лист или открытка Мухи только в магазине музея, Саварин или Panská. С лотка на мосту это полиграфия для чужих.</li>
        <li>Карандаши Koh-i-noor в обычном papírnictví. Чешские, дешёвые, тебе по руке. Не в сувенирной лавке с наценкой за слово Prague.</li>
        <li>Каталог или открытка из Велетржного дворца, если на кассе будет. Это память про дом, не про магнит.</li>
        <li>Пиво домой из Albert или Billa, в чемодан на автобус. В аэропортовом ларьке и на площади оно дороже и то же самое.</li>
        <li>Гранат, янтарь и «богемский хрусталь» с руки на мосту не бери. Янтарь вообще не чешский. Если очень хочется камень, только магазин с чеком, не поднос.</li>
        <li>Марионетку, магнит и футболку Prague drinking team пропусти.</li>
      </ul>
    </div>
    <div class="card">
      <h3>Что увидеть</h3>
      <ul>
        <li>Дворы Града. Внутрь в среду, если хочешь собор и дворцы. Во вторник синий показывает холм уже в темноте, этого мало для интерьеров.</li>
        <li>Карлов мост один раз при фонарях, в среду с красным. В субботу к полудню он уже не твой.</li>
        <li>Староместская и один бой курантов. Подошла за три минуты до часа. Есть здесь не надо.</li>
        <li>Велетржный дворец в четверг. Для тебя это главный зал поездки.</li>
        <li>Дом У чёрной мадонны и конь в Луцерне. Оба бесплатно, оба в четверг по пути.</li>
        <li>Вышеград в пятницу утром, пока светло и не дует в лицо.</li>
        <li>В Вильнюсе в понедельник ворота, если успеешь до 19:00 в часовню, и плитка у собора. Башню Гедимина не добавляй.</li>
      </ul>
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
