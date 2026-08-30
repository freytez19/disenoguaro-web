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
  var PRODUCTS = [
    { ico: '☕', name: 'Tazas y termos', desc: 'Cerámica, mágicas, metálicas y térmicas con tu logo o foto.' },
    { ico: '🍶', name: 'Botellas y tumblers', desc: 'Botellas deportivas, vasos Starbucks y car cups personalizados.' },
    { ico: '👕', name: 'Camisetas y textiles', desc: 'Sublimación y DTF en camisetas, polos y ropa de equipo.' },
    { ico: '🧢', name: 'Gorras', desc: 'Bordado o transfer para uniformes, eventos y promociones.' },
    { ico: '🛏️', name: 'Cojines y almohadas', desc: 'Cojines con relleno para regalos, recuerdos y decoración.' },
    { ico: '🖱️', name: 'Mousepads', desc: 'Redondos o cuadrados, ideales para regalos corporativos.' },
    { ico: '🖼️', name: 'Cuadros y piedras foto', desc: 'Piedras de sublimación y cuadros con tus fotos favoritas.' },
    { ico: '🔑', name: 'Llaveros y destapadores', desc: 'Llaveros metálicos con caja, perfectos para souvenirs.' },
    { ico: '📛', name: 'Botones / pins', desc: 'Botones de 2.5" para campañas, eventos y merchandising.' },
    { ico: '🎁', name: 'Combos y kits de regalo', desc: 'Sets listos para obsequiar: taza + termo, wine set y más.' },
    { ico: '🏷️', name: 'Stickers y etiquetas', desc: 'Vinil o papel, troquelados y con corte a la medida.' },
    { ico: '📇', name: 'Tarjetas y papelería', desc: 'Tarjetas de presentación, volantes, menús y brochures.' }
  ];

  var pg = document.getElementById('productsGrid');
  if (pg) {
    PRODUCTS.forEach(function (p) {
      var a = document.createElement('article');
      a.className = 'card product';
      a.innerHTML =
        '<span class="p-ico" aria-hidden="true">' + p.ico + '</span>' +
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
  var GALLERY = [
    { f: 'logo-agro-avila.jpg',            t: 'Logotipo — Agro Ávila',            c: 'marca' },
    { f: 'logo-autos-andrea.jpg',          t: 'Logotipo — Autos Andrea',          c: 'marca' },
    { f: 'logo-seguridad.jpg',             t: 'Logotipo — Seguridad & Automatización', c: 'marca' },
    { f: 'logo-miracle-dental.jpg',        t: 'Logotipo — Miracle Dental Center',  c: 'marca' },
    { f: 'identidad-nh-arquitectos.jpg',   t: 'Identidad — NH Arquitectos',        c: 'marca' },
    { f: 'tarjetas-budda-ink.jpg',         t: 'Tarjeta de presentación — Budda Ink', c: 'impresos' },
    { f: 'menu-rincon-venezolano.jpg',     t: 'Menú — Rincón Venezolano',          c: 'impresos' },
    { f: 'flyer-beauty-studio.jpg',        t: 'Lista de precios — Beauty Studio',  c: 'impresos' },
    { f: 'flyer-roll-race.jpg',            t: 'Flyer de evento — Roll Race',       c: 'eventos' },
    { f: 'backpanel-messi.jpg',            t: 'Back panel — cumpleaños temático',  c: 'eventos' },
    { f: 'backpanel-navidad.jpg',          t: 'Back panel — evento navideño',      c: 'eventos' },
    { f: 'vinil-juan-valdez.jpg',          t: 'Vinil y stickers — Juan Valdez',    c: 'vinil' },
    { f: 'post-san-valentin.jpg',          t: 'Post para redes — promoción',       c: 'redes' }
  ];
  var CAT_LABEL = { marca: 'Identidad', impresos: 'Impresos', eventos: 'Eventos', vinil: 'Vinil', redes: 'Redes' };

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
        '<span class="tag">' + (CAT_LABEL[g.c] || '') + '</span>' +
        '<img src="' + BASE + g.f + '" alt="' + g.t + '" loading="lazy" />' +
        '<figcaption>' + g.t + '</figcaption>';
      gallery.appendChild(fig);
      items.push(fig);
    });
  }

  /* ---------- Filtros ---------- */
  var filters = document.getElementById('filters');
  if (filters) {
    filters.addEventListener('click', function (e) {
      var b = e.target.closest('.filter');
      if (!b) return;
      filters.querySelectorAll('.filter').forEach(function (x) { x.classList.remove('is-active'); });
      b.classList.add('is-active');
      var f = b.dataset.filter;
      items.forEach(function (it) {
        var show = f === 'all' || it.dataset.cat === f;
        it.classList.toggle('hide', !show);
      });
    });
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
    lbImg.src = BASE + g.f;
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
