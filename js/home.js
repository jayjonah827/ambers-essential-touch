/* Amber's Essential Touch — home page behaviour.
   Ports the three pieces of state from the Claude Design component:
   header scroll tint, mobile menu, and newsletter confirmation.
   The sticky mobile book bar is handled by a CSS media query instead of a JS
   matchMedia listener, so it is correct before first paint. */
(function () {
  'use strict';

  // Header tint once the page has scrolled past the hero edge.
  var hdr = document.getElementById('hdr');
  if (hdr) {
    var onScroll = function () {
      hdr.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu.
  var toggle = document.getElementById('navToggle');
  var panel = document.getElementById('navPanel');
  if (toggle && panel) {
    var setMenu = function (open) {
      panel.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      toggle.textContent = open ? '✕' : '☰';
    };

    toggle.addEventListener('click', function () {
      setMenu(panel.hidden);
    });

    // Any link in the panel closes it, matching closeMenu in the design.
    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.hidden) {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  // Newsletter: swap the form for the confirmation line.
  // No provider is wired yet, so this only acknowledges locally — it does not
  // transmit the address anywhere.
  var form = document.getElementById('signupForm');
  var done = document.getElementById('signupDone');
  if (form && done) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.hidden = true;
      done.hidden = false;
      done.focus && done.focus();
    });
  }
})();
