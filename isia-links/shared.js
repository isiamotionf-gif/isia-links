/* Código compartilhado entre a página pública (index.html) e o painel (admin.html). */
(function () {
  var ICONS = {
    whatsapp: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M9 9.5c.3 2.2 2.3 4.4 5.5 5.3l1.3-1.3-2-1-.9.7c-.9-.4-1.6-1.1-2-2l.7-.9-1-2Z"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z"/><path d="M17.5 6.5h.01"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>'
  };
  var ICON_LABEL = { whatsapp: 'WhatsApp', pin: 'Localização', bag: 'Loja', instagram: 'Instagram', clock: 'Horário', phone: 'Telefone', link: 'Link' };
  var STYLES = [['cobre', 'Cobre'], ['creme', 'Creme'], ['cafe', 'Café'], ['ouro', 'Ouro']];
  var DROP = '<svg class="drop" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="5" aria-hidden="true"><path d="M50 4C50 4 12 46 12 68a38 38 0 0 0 76 0C88 46 50 4 50 4Z"/></svg>';
  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>';

  function uid() { return Math.random().toString(36).slice(2, 8); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function safeUrl(u) {
    u = String(u || '').trim();
    if (!u) return '';
    if (/^(https?:|tel:|mailto:)/i.test(u)) return u;
    if (/^[a-z][a-z0-9+.-]*:/i.test(u)) return '';
    return 'https://' + u;
  }
  function svg(name) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || ICONS.link) + '</svg>';
  }

  /* Conteúdo inicial. Vale até o primeiro "Salvar e publicar" no painel. */
  function defaults() {
    return {
      name: 'ISIA MOTION',
      tagline: 'Calçados com movimento',
      bg: 'bg2',
      custom: null,
      links: [
        { id: uid(), title: 'WhatsApp', sub: 'Fale com a gente e tire dúvidas', url: '', icon: 'whatsapp', style: 'cobre', visible: true },
        { id: uid(), title: 'Localização', sub: 'Venha conhecer a loja · Como chegar', url: '', icon: 'pin', style: 'creme', visible: true },
        { id: uid(), title: 'Loja online', sub: 'Compre pelo site', url: '', icon: 'bag', style: 'cafe', visible: true },
        { id: uid(), title: '@isiamotionf', sub: 'Lançamentos e bastidores', url: 'https://instagram.com/isiamotionf', icon: 'instagram', style: 'ouro', visible: true },
        { id: uid(), title: 'Horário de atendimento', sub: 'Seg a Sáb · 9h às 19h', url: '', icon: 'clock', style: 'cafe', visible: true }
      ]
    };
  }

  /* Garante que dados vindos do banco têm todos os campos. */
  function normalize(d) {
    var base = defaults();
    if (!d || typeof d !== 'object') return base;
    var out = {
      name: typeof d.name === 'string' ? d.name : base.name,
      tagline: typeof d.tagline === 'string' ? d.tagline : base.tagline,
      bg: d.bg === 'bg1' || d.bg === 'custom' ? d.bg : 'bg2',
      custom: typeof d.custom === 'string' && d.custom.indexOf('data:image/') === 0 ? d.custom : null,
      links: []
    };
    if (out.bg === 'custom' && !out.custom) out.bg = 'bg2';
    (Array.isArray(d.links) ? d.links : base.links).forEach(function (l) {
      if (!l || typeof l !== 'object') return;
      out.links.push({
        id: typeof l.id === 'string' && l.id ? l.id : uid(),
        title: String(l.title == null ? '' : l.title),
        sub: String(l.sub == null ? '' : l.sub),
        url: String(l.url == null ? '' : l.url),
        icon: ICONS[l.icon] ? l.icon : 'link',
        style: STYLES.some(function (s) { return s[0] === l.style; }) ? l.style : 'cafe',
        visible: l.visible !== false
      });
    });
    return out;
  }

  function bgSrc(s) {
    if (s.bg === 'custom' && s.custom) return s.custom;
    return s.bg === 'bg1' ? 'assets/bg1.jpg' : 'assets/bg2.jpg';
  }

  function cardHtml(l) {
    var url = safeUrl(l.url);
    var inner = DROP + '<span class="tile">' + svg(l.icon) + '</span><span class="txt"><h2>' + esc(l.title) + '</h2>' +
      (l.sub ? '<p>' + esc(l.sub) + '</p>' : '') + '</span>' + (url ? '<span class="go">' + ARROW + '</span>' : '');
    return url
      ? '<a class="card s-' + esc(l.style) + '" href="' + esc(url) + '" target="_blank" rel="noopener">' + inner + '</a>'
      : '<div class="card s-' + esc(l.style) + '">' + inner + '</div>';
  }

  /* Desenha a página pública dentro do documento atual. */
  function renderPage(s) {
    document.getElementById('heroImg').src = bgSrc(s);
    document.getElementById('name').textContent = s.name || '';
    var tag = document.getElementById('tag');
    tag.textContent = s.tagline || '';
    tag.hidden = !s.tagline;
    document.getElementById('foot').textContent = s.name || '';
    document.title = (s.name || 'ISIA MOTION') + ' | Links';
    var vis = s.links.filter(function (l) { return l.visible; });
    document.getElementById('cards').innerHTML = vis.length
      ? vis.map(cardHtml).join('')
      : '<p class="empty">Em breve.</p>';
  }

  var cfg = window.ISIA_CONFIG || {};
  function configured() {
    return !!(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && cfg.SUPABASE_URL.indexOf('COLE_') !== 0 && cfg.SUPABASE_ANON_KEY.indexOf('COLE_') !== 0);
  }
  function client() {
    if (!configured() || !window.supabase) return null;
    return window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
  }

  window.ISIA = {
    ICONS: ICONS, ICON_LABEL: ICON_LABEL, STYLES: STYLES, ARROW: ARROW,
    uid: uid, esc: esc, safeUrl: safeUrl, svg: svg,
    defaults: defaults, normalize: normalize, bgSrc: bgSrc,
    renderPage: renderPage, configured: configured, client: client
  };
})();
