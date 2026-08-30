/* ===============================================================
   Diseño Guaro — interacción
   =============================================================== */
(function () {
  'use strict';

  var WA = 'https://wa.me/18293768157?text=';
  function waLink(msg) { return WA + encodeURIComponent(msg); }

  /* ---------- Año en el footer ---------- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Menú móvil ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Productos ---------- */
  var I = {
    taza: '<path d="M4 4h11v9a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M15 7h3a3 3 0 0 1 0 6h-3"/><path d="M4 21h11"/>',
    botella: '<path d="M9 2h6M10 2v3.5L8 8v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V8l-2-2.5V2"/><path d="M8 13h8"/>',
    camisa: '<path d="M8 3l-5 4 3 3 2-1.5V21h6V8.5L19 10l3-3-5-4a5 5 0 0 1-9 0z"/>',
    gorra: '<path d="M3 15a9 9 0 0 1 18 0M12 6a6 6 0 0 0-6 6h12M21 15c0 1-1 2-3 2H3"/>',
    cojin: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M7 7c2 1 2 3 0 4M17 7c-2 1-2 3 0 4"/>',
    mouse: '<rect x="6" y="3" width="12" height="18" rx="6"/><path d="M12 7v4"/>',
    cuadro: '<rect x="3" y="4" width="18" height="14" rx="1.5"/><path d="M3 14l5-4 4 3 3-2 6 4M12 21h0"/>',
    llavero: '<circle cx="8" cy="8" r="4"/><path d="M11 11l8 8M17 15l2 2-2 2"/>',
    boton: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.2"/>',
    regalo: '<rect x="3" y="8" width="18" height="13" rx="1"/><path d="M3 12h18M12 8v13M12 8C10 4 6 5 7 8M12 8c2-4 6-3 5 0"/>',
    sticker: '<path d="M20 4v10l-6 6H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1zM14 20v-5a1 1 0 0 1 1-1h5"/>',
    tarjeta: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h5"/>'
  };
  function svg(p){return '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>';}

  var PRODUCTS = [
    { ico: I.taza,    name: 'Tazas y termos', desc: 'Cerámica, mágicas, metálicas y térmicas con tu logo o foto.' },
    { ico: I.botella, name: 'Botellas y tumblers', desc: 'Botellas deportivas, vasos Starbucks y car cups personalizados.' },
    { ico: I.camisa,  name: 'Camisetas y textiles', desc: 'Sublimación y DTF en camisetas, polos y ropa de equipo.' },
    { ico: I.gorra,   name: 'Gorras', desc: 'Bordado o transfer para uniformes, eventos y promociones.' },
    { ico: I.cojin,   name: 'Cojines y almohadas', desc: 'Cojines con relleno para regalos, recuerdos y decoración.' },
    { ico: I.mouse,   name: 'Mousepads', desc: 'Redondos o cuadrados, ideales para regalos corporativos.' },
    { ico: I.cuadro,  name: 'Cuadros y piedras foto', desc: 'Piedras de sublimación y cuadros con tus fotos favoritas.' },
    { ico: I.llavero, name: 'Llaveros y destapadores', desc: 'Llaveros metálicos con caja, perfectos para souvenirs.' },
    { ico: I.boton,   name: 'Botones / pins', desc: 'Botones de 2.5" para campañas, eventos y merchandising.' },
    { ico: I.regalo,  name: 'Combos y kits de regalo', desc: 'Sets listos para obsequiar: taza + termo, wine set y más.' },
    { ico: I.sticker, name: 'Stickers y etiquetas', desc: 'Vinil o papel, troquelados y con corte a la medida.' },
    { ico: I.tarjeta, name: 'Tarjetas y papelería', desc: 'Tarjetas de presentación, volantes, menús y brochures.' }
  ];

  var pg = document.getElementById('productsGrid');
  if (pg) {
    PRODUCTS.forEach(function (p) {
      var a = document.createElement('article');
      a.className = 'card product';
      a.innerHTML =
        '<span class="p-ico" aria-hidden="true">' + svg(p.ico) + '</span>' +
        '<h3>' + p.name + '</h3>' +
        '<p>' + p.desc + '</p>' +
        '<a class="p-link" target="_blank" rel="noopener" href="' +
        waLink('Hola Diseño Guaro, quiero cotizar: ' + p.name + '.') +
        '">Cotizar</a>';
      pg.appendChild(a);
    });
  }

  /* ---------- Galería ---------- */
  var BASE = 'assets/portfolio/';
  function pimg(f) {
    return (window.__PORTFOLIO_IMG && window.__PORTFOLIO_IMG[f]) || BASE + f;
  }
  /* Trabajos publicados en el Instagram @disenoguaro */
  var GALLERY = [
    { f: 'medallas-deportivas.jpg',      t: 'Medallas deportivas personalizadas', c: 'Producto' },
    { f: 'gorras-brandeadas.jpg',        t: 'Gorras brandeadas',                  c: 'Producto' },
    { f: 'sombrero-visa.jpg',            t: 'Sombrero brandeado — Visa',          c: 'Producto' },
    { f: 'carnet-pvc.jpg',               t: 'Carnets PVC con impresión full color', c: 'Producto' },
    { f: 'llaveros-credicefi.jpg',       t: 'Llaveros brandeados — CrediCefi',    c: 'Producto' },
    { f: 'botellas-brandeadas.jpg',      t: 'Botellas térmicas brandeadas',       c: 'Producto' },
    { f: 'etiqueta-tequila-padrote.jpg', t: 'Etiqueta — Tequila Padrote',         c: 'Diseño' },
    { f: 'montaje-evento.jpg',           t: 'Montaje e impresión para evento',    c: 'Evento' },
    { f: 'taller-gran-formato.jpg',      t: 'Impresión en gran formato en el taller', c: 'Taller' }
  ];

  var gallery = document.getElementById('gallery');
  var items = [];
  if (gallery) {
    GALLERY.forEach(function (g, i) {
      var fig = document.createElement('figure');
      fig.className = 'gallery-item';
      fig.dataset.cat = g.c;
      fig.dataset.index = i;
      fig.setAttribute('tabindex', '0');
      fig.setAttribute('role', 'button');
      fig.setAttribute('aria-label', 'Ver: ' + g.t);
      fig.innerHTML =
        '<span class="tag">' + g.c + '</span>' +
        '<img src="' + pimg(g.f) + '" alt="' + g.t + '" loading="lazy" />' +
        '<figcaption>' + g.t + '</figcaption>';
      gallery.appendChild(fig);
      items.push(fig);
    });
  }

  /* ---------- Calculadora de precios ----------
     Tarifas de Diseño Guaro en pesos dominicanos (RD$) por pie cuadrado.
     'min' = monto mínimo por trabajo para ese material (0 = sin mínimo). */
  var RATES = {
    banner:    { label: 'Banner (lona)',      rate: 70,  min: 0 },
    vinil:     { label: 'Vinil adhesivo',     rate: 70,  min: 0 },
    sticker:   { label: 'Sticker troquelado', rate: 90,  min: 500 },
    onevision: { label: 'Onevision',          rate: 130, min: 0 }
  };
  var MIN_FT2 = 0; // área mínima a cobrar en pie² (0 = sin mínimo)

  var cMat = document.getElementById('calcMat');
  var cW = document.getElementById('calcW');
  var cH = document.getElementById('calcH');
  if (cMat && cW && cH) {
    var cArea = document.getElementById('calcArea');
    var cRate = document.getElementById('calcRate');
    var cTotal = document.getElementById('calcTotal');
    var cWa = document.getElementById('calcWa');

    var money = function (n) {
      return 'RD$ ' + n.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };
    var num = function (n) {
      return n.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    var cNote = document.querySelector('.calc-note');
    var baseNote = cNote ? cNote.textContent : '';

    function calc() {
      var m = RATES[cMat.value] || RATES.vinil;
      var w = parseFloat(cW.value) || 0;
      var h = parseFloat(cH.value) || 0;
      var ft2 = (w * h) / 144;
      var billed = Math.max(ft2, MIN_FT2);
      var raw = billed * m.rate;
      var total = Math.max(raw, m.min || 0);
      var hitMin = (m.min && raw < m.min && w > 0 && h > 0);

      cRate.textContent = money(m.rate) + ' / pie²';
      if (w <= 0 || h <= 0) {
        cArea.textContent = '—';
        cTotal.textContent = money(0);
      } else {
        cArea.textContent = num(ft2) + ' pie²';
        cTotal.textContent = money(total);
      }

      if (cNote) {
        cNote.textContent = hitMin
          ? 'Aplica el monto mínimo de ' + money(m.min) + ' para ' + m.label.toLowerCase() + '. ' + baseNote
          : baseNote;
      }

      var msg = 'Hola Diseño Guaro, quiero cotizar: ' + m.label +
        ' de ' + (w || '?') + ' x ' + (h || '?') + ' pulgadas' +
        (w > 0 && h > 0 ? ' (~' + num(ft2) + ' pie², estimado web ' + money(total) + ')' : '') + '.';
      cWa.href = WA + encodeURIComponent(msg);
    }

    cMat.addEventListener('change', calc);
    cW.addEventListener('input', calc);
    cH.addEventListener('input', calc);
    calc();
  }

  /* ---------- Lightbox ---------- */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var current = 0;

  function visibleItems() {
    return items.filter(function (it) { return !it.classList.contains('hide'); });
  }
  function openLb(fig) {
    var vis = visibleItems();
    current = vis.indexOf(fig);
    render(vis);
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    document.getElementById('lbClose').focus();
  }
  function render(vis) {
    var g = GALLERY[+vis[current].dataset.index];
    lbImg.src = pimg(g.f);
    lbImg.alt = g.t;
    lbCap.textContent = g.t;
  }
  function step(d) {
    var vis = visibleItems();
    current = (current + d + vis.length) % vis.length;
    render(vis);
  }
  function closeLb() {
    lb.hidden = true;
    document.body.style.overflow = '';
  }

  if (gallery && lb) {
    gallery.addEventListener('click', function (e) {
      var fig = e.target.closest('.gallery-item');
      if (fig) openLb(fig);
    });
    gallery.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('gallery-item')) {
        e.preventDefault();
        openLb(e.target);
      }
    });
    document.getElementById('lbClose').addEventListener('click', closeLb);
    document.getElementById('lbPrev').addEventListener('click', function () { step(-1); });
    document.getElementById('lbNext').addEventListener('click', function () { step(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') closeLb();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
    });
  }
})();
