/* AMBER'S ESSENTIAL TOUCH — shared shell behavior
   (mobile drawer, header scroll state, email capture, nav highlight)
   Legacy version preserved at js/legacy-main.js.bak */

(function () {
  // header background deepens on scroll
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // mobile drawer
  var burger = document.querySelector('.nav__burger');
  var drawer = document.querySelector('.nav-drawer');
  if (burger && drawer) {
    burger.addEventListener('click', function () {
      var open = drawer.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.textContent = open ? '✕' : '☰';
    });
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        drawer.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.textContent = '☰';
      });
    });
  }

  // mark current page in nav
  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav-drawer a').forEach(function (a) {
    if (a.getAttribute('href') === page && !a.classList.contains('btn')) {
      a.classList.add('is-active');
    }
  });

  // Skin Notes email capture — stores locally until a mail provider is wired
  document.querySelectorAll('form[data-capture]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = form.querySelector('input[type="email"]');
      if (!email || !email.value) return;
      try {
        var list = JSON.parse(localStorage.getItem('aet-skin-notes') || '[]');
        list.push({ email: email.value, at: new Date().toISOString() });
        localStorage.setItem('aet-skin-notes', JSON.stringify(list));
      } catch (err) { /* storage unavailable — the thank-you still shows */ }
      var msg = document.createElement('p');
      msg.className = 'joined-msg';
      msg.setAttribute('role', 'status');
      msg.textContent = 'Welcome. Take your time — your skin will.';
      form.replaceWith(msg);
    });
  });
})();
