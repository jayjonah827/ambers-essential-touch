/* Amber's Essential Touch — minimal UI JS */

// Mobile drawer
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.drawer');
  const close  = document.querySelector('.drawer-close');
  if (burger && drawer) {
    burger.addEventListener('click', () => drawer.classList.add('open'));
  }
  if (close && drawer) {
    close.addEventListener('click', () => drawer.classList.remove('open'));
  }
  drawer?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => drawer.classList.remove('open'));
  });

  // Floating CTA rail — dim on scroll-down, restore on scroll-up
  let lastY = window.scrollY;
  const rail = document.querySelector('.rail');
  if (rail) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      rail.style.opacity = (y > lastY && y > 120) ? '0.4' : '1';
      lastY = y;
    }, { passive: true });
  }

  // Booking stepper (book page only)
  const steps = document.querySelectorAll('[data-step]');
  const panels = document.querySelectorAll('[data-panel]');
  steps.forEach(step => {
    step.addEventListener('click', () => {
      const n = step.dataset.step;
      steps.forEach(s => s.classList.toggle('active', s.dataset.step === n));
      panels.forEach(p => p.hidden = p.dataset.panel !== n);
    });
  });

  // Intercept form submit (no backend yet) — show consistent confirmation
  document.querySelectorAll('form[data-intercept]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const kind = form.dataset.intercept;
      const msg = form.querySelector('[data-confirm]');
      if (msg) { msg.hidden = false; form.querySelector('.fields').hidden = true; }
      else { alert(`Thank you. Your ${kind} was received. I will respond within 24 hours. — Amber`); }
    });
  });
});
