(function () {
  'use strict';

  var toggle = document.querySelector('#nav-toggle');
  var panel = document.querySelector('.nav-links');

  function setMenu(open) {
    if (!panel) return;
    panel.classList.toggle('open', open);
    if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  if (toggle && panel) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      setMenu(!panel.classList.contains('open'));
    });
  }

  document.addEventListener('click', function (e) {
    if (panel && toggle && !panel.contains(e.target) && !toggle.contains(e.target)) {
      setMenu(false);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  var links = document.querySelectorAll('.nav-links a');
  if (!links.length) return;
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      links.forEach(function (l) { l.classList.remove('active'); });
      link.classList.add('active');
      setMenu(false);
    });
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) setMenu(false);
  });
})();
