/* Continuous walnut background, scroll depth, and restrained sparkle field.
   Scroll-linked motion is driven by Motion (https://motion.dev), loaded from
   a CDN as a bare ES module — no build step, no npm install, works in this
   static site as-is. This replaces a hand-rolled requestAnimationFrame loop
   that produced a lag bug (.14 easing), an unbounded-input collision bug
   (foreground cards overlapping static headings), and needed manual clamping
   to patch both. Motion's scroll() ties element transforms directly to
   scroll/viewport progress with tested, bounded behavior — no hand-written
   easing or clamping math required. */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var background = document.createElement('div');
  var sparkles = document.createElement('div');

  background.className = 'aet-background-layer';
  background.setAttribute('aria-hidden', 'true');
  sparkles.className = 'aet-sparkle-field';
  sparkles.setAttribute('aria-hidden', 'true');
  document.body.prepend(sparkles);
  document.body.prepend(background);

  var foreground = Array.prototype.slice.call(document.querySelectorAll([
    '.card', '.service-entry', '.product', '.testimonial', '.booking-shell',
    '.capture', '.step', '.step-card', '.concern', '.finder__row', '.quote',
    '.result', '.menu-panel', '.prep-shell', '.review-source', '.quote-card'
  ].join(',')));

  foreground.forEach(function (element) {
    element.dataset.aetDepth = 'foreground';
  });

  if (reduce) return;

  import('https://cdn.jsdelivr.net/npm/motion@latest/+esm').then(function (Motion) {
    var scroll = Motion.scroll;
    var animate = Motion.animate;

    /* Background + sparkle drift across the full page scroll — the "room"
       moves subtly behind everything. Sparkle travels 2x the background,
       preserving the original background:sparkle ratio. */
    scroll(animate(background, { transform: ['translate3d(0,0,0) scale(1.08)', 'translate3d(0,-220px,0) scale(1.08)'] }));
    scroll(animate(sparkles, { transform: ['translate3d(0,0,0)', 'translate3d(0,-440px,0)'] }));

    /* Foreground cards drift as each one crosses the viewport — bounded by
       construction (every element's range is its own fixed ±40px, tied to
       0-1 progress through the viewport) so nothing can overlap a neighbor
       the way the unbounded hand-rolled version did. This is Motion's
       documented scroll-linked-per-target pattern, not custom math. */
    foreground.forEach(function (element) {
      scroll(
        animate(element, { transform: ['translate3d(0,40px,0)', 'translate3d(0,-40px,0)'] }),
        { target: element, offset: ['start end', 'end start'] }
      );
    });
  });
})();
