/* Interacciones del prototipo (menú desktop, drawer móvil). Sin dependencias. */
(function () {
  // ---------- Desktop: menús desplegables ----------
  var current = null; // { openEl, closedEl }
  function closeMenu() {
    if (!current) return;
    current.openEl.replaceWith(current.closedEl);
    current = null;
  }
  function openMenu(item) {
    var t = document.getElementById('mz-open-' + item.getAttribute('data-mz-item'));
    if (!t) return;
    closeMenu();
    var el = t.content.firstElementChild.cloneNode(true);
    item.replaceWith(el);
    current = { openEl: el, closedEl: item };
  }
  function zone(target, item) {
    for (var e = target; e && e !== item; e = e.parentElement) {
      if (e.id === 'menu-backdrop') return 'backdrop';
      if (getComputedStyle(e).position === 'fixed') return 'panel';
    }
    return 'label';
  }

  // ---------- Móvil: drawer ----------
  function drawer() {
    var left = document.querySelector('.drawer-container .left');
    return left && left.closest('.drawer-container');
  }
  function setDrawer(open) {
    var d = drawer();
    if (!d) return;
    d.classList.toggle('open', open);
    d.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  document.addEventListener('click', function (ev) {
    var t = ev.target;

    // Drawer móvil
    var ham = document.querySelector('.navbar-content button');
    if (ham && ham.offsetWidth && ham.contains(t)) { ev.preventDefault(); setDrawer(true); return; }
    var d = drawer();
    if (d && d.classList.contains('open')) {
      if (t.closest('.backdrop') || t.closest('.builder-259d949047cf4a8697391342c987118c')) { ev.preventDefault(); setDrawer(false); return; }
      var head = t.closest('.dropDownMenu > :first-child');
      if (head && !t.closest('a')) { ev.preventDefault(); head.parentElement.classList.toggle('mz-collapsed'); return; }
    }

    // Menús desktop
    var item = t.closest('[data-mz-item]');
    if (item) {
      var z = zone(t, item);
      if (z === 'panel') return; // los links del panel navegan normal
      ev.preventDefault();
      if (z === 'backdrop') { closeMenu(); return; }
      if (current && current.openEl === item) closeMenu(); else openMenu(item);
      return;
    }
    if (current && !t.closest('a')) closeMenu();

    var a = t.closest('a');
    if (a && a.getAttribute('href') === '#') ev.preventDefault();
    if (!a) { var l = t.closest('[data-mz-link][href]'); if (l) location.href = l.getAttribute('href'); }
  }, true);

  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') { closeMenu(); setDrawer(false); }
  });
  document.addEventListener('submit', function (ev) { ev.preventDefault(); }, true);
})();
