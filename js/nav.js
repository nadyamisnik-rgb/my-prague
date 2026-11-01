/* Shared nav helpers + places catalog renderer */
(function () {
  const dayHref = (day) => {
    if (!day) return null;
    const m = String(day).match(/(\d{2})\.11/);
    return m ? `#day${m[1]}` : null;
  };

  function mapsToggle(id, mapsUrl, embedUrl) {
    if (!mapsUrl) return '';
    const isMaps = /google\.(com|ru).*maps|maps\.app\.goo\.gl|maps\.google/i.test(mapsUrl);
    const label = isMaps ? '📍 Google Maps' : '🔗 Открыть';
    const embed = embedUrl
      ? `<div class="map-embed" id="embed-${id}" hidden>
          <iframe title="Карта" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
            src="${embedUrl}" allowfullscreen></iframe>
        </div>`
      : '';
    return `
      <div class="maps-actions">
        <a class="maps-btn" href="${mapsUrl}" target="_blank" rel="noopener">${label}</a>
        ${embedUrl ? `<button type="button" class="maps-btn maps-btn-ghost" data-embed-toggle="${id}">🗺 На карте</button>` : ''}
      </div>
      ${embed}`;
  }

  function placeCard(p, opts = {}) {
    const compact = opts.compact;
    return `
    <article class="card place-card" data-type="${p.type}" data-place="${p.id}">
      <div class="place-header">
        <div class="place-ico">${p.icon || '⭐'}</div>
        <div style="flex:1;min-width:0">
          <h3 style="margin:0">${p.name}</h3>
          <p class="muted small" style="margin:4px 0 0">${p.area || ''}${p.day ? ` · ${p.day}` : ''}${p.ig ? ' · инстаграм' : ''}</p>
        </div>
        ${p.score ? `<div class="place-score">${p.score}<span>/10</span></div>` : ''}
      </div>
      ${p.about && !compact ? `<p class="place-about">${p.about}</p>` : ''}
      ${p.note && !compact ? `<p class="muted small">${p.note}</p>` : ''}
      ${!compact && p.photo ? window.GuidePlaces.photoOf(p.id) : ''}
      ${p.day && dayHref(p.day) ? `<a class="pill pill-danube" href="${dayHref(p.day)}" style="margin:8px 8px 8px 0;text-decoration:none">В дне ${p.day}</a>` : ''}
      ${p.igPost && !compact ? `<a class="pill" href="${p.igPost}" target="_blank" rel="noopener" style="margin:8px 0;text-decoration:none">Пост</a>` : ''}
      ${mapsToggle(p.id, p.maps, p.embed)}
    </article>`;
  }

  function renderPlacesPage(filter) {
    const { items, types } = window.GuidePlaces;
    const active = filter || 'all';
    const matches = (p, id) => p.type === id;
    const list = active === 'all' ? items : items.filter((p) => matches(p, active));

    const chips = types.map((t) => {
      const count = t.id === 'all' ? items.length : items.filter((p) => matches(p, t.id)).length;
      if (t.id !== 'all' && count === 0) return '';
      return `<button type="button" class="filter-chip${t.id === active ? ' active' : ''}" data-place-filter="${t.id}">${t.icon} ${t.label}<span>${count}</span></button>`;
    }).join('');

    const igNote = `<p class="muted small" style="margin:-4px 0 12px">Только то, чего нет в городе и остальных рубриках. Град, мост, площадь и остальные помечены словом «инстаграм» на своей карточке.</p>`;
    const grouped = active === 'all'
      ? types.filter((t) => t.id !== 'all').map((t) => {
          const group = items.filter((p) => matches(p, t.id));
          if (!group.length) return '';
          return `
            <div class="divider" id="type-${t.id}">${t.icon} ${t.label}</div>
            ${t.id === 'ig' ? igNote : ''}
            <div class="place-grid">${group.map((p) => placeCard(p)).join('')}</div>`;
        }).join('')
      : `${active === 'ig' ? igNote : ''}
        <div class="place-grid">${list.map((p) => placeCard(p)).join('')}</div>`;

    return `
    <section class="section wrap">
      <h1>Места</h1>
      <p class="lede">Оценка из 10 это насколько место стоит твоего времени в эти даты. Квартира без цифры: это дом, не точка маршрута. Фото по кнопке.</p>
      <div class="filter-row" role="toolbar" aria-label="Типы мест">${chips}</div>
      ${grouped}
      <div class="callout callout-danube" style="margin-top:20px">
        <strong>Карта кафе Inturistkaa</strong>
        Отдельная подборка: <a href="#cafes">список в гиде</a> ·
        <a href="https://maps.app.goo.gl/B9oE3tizamsa2hbZ9" target="_blank" rel="noopener">Google Maps</a>
      </div>
    </section>`;
  }

  window.GuideNavUI = { mapsToggle, placeCard, renderPlacesPage, dayHref };
})();
