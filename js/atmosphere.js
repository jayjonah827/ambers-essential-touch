/* Continuous walnut background, scroll depth, and restrained sparkle field. */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
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

  var targetY = window.scrollY;
  var renderedY = targetY;
  var ticking = false;
  var motionScale = .18;
  var metrics = [];
  /* Per-element local input is unbounded distance-from-viewport-center, so an
     element far off-screen can already carry a large offset the instant it
     scrolls into view — that's what was driving foreground cards up into the
     static heading above them. Clamping the input (not the 2x/.5x relationship
     itself) keeps every element reachable and never overlapping its neighbors.
     30 (±60px) still collided with book.html's 40px policies margin — the
     site's tightest observed gap is ~32-40px, so the clamp has to fit under
     that everywhere, not just on the homepage instance that got checked first. */
  var localInputClamp = 16;

  function measure() {
    foreground.forEach(function (element) {
      element.style.setProperty('--aet-foreground-y', '0px');
    });
    metrics = foreground.map(function (element) {
      var rect = element.getBoundingClientRect();
      return {
        element: element,
        center: rect.top + window.scrollY + rect.height / 2
      };
    });
  }

  measure();

  function render() {
    /* .14 read as sloppy/rubber-banded — every element visibly lagged behind
       the actual scroll instead of tracking it. .32 stays smoothed enough to
       kill raw scroll jank without feeling detached from the input. */
    renderedY += (targetY - renderedY) * .32;

    /* Exact unclamped output relationship from the supplied motion reference:
       foregroundY = input × 2; backgroundY = input × .5. The shared input is
       scaled once for a usable DOM range; the requested 4:1 relationship is
       preserved and now produces visible travel through the viewport. */
    var globalInput = renderedY * motionScale;
    var backgroundY = globalInput * .5;
    var sparkleY = globalInput;
    root.style.setProperty('--aet-background-y', backgroundY.toFixed(2) + 'px');
    root.style.setProperty('--aet-sparkle-y', sparkleY.toFixed(2) + 'px');
    root.style.setProperty('--aet-sparkle-y-2', (sparkleY * -.55).toFixed(2) + 'px');
    root.style.setProperty('--aet-sparkle-y-3', (sparkleY * .3).toFixed(2) + 'px');

    var viewportCenter = renderedY + window.innerHeight / 2;
    metrics.forEach(function (metric) {
      var localInput = (viewportCenter - metric.center) * motionScale;
      localInput = Math.max(-localInputClamp, Math.min(localInputClamp, localInput));
      metric.element.style.setProperty('--aet-foreground-y', (localInput * 2).toFixed(2) + 'px');
    });

    var remaining = Math.abs(targetY - renderedY);
    if (remaining > .1) {
      window.requestAnimationFrame(render);
    } else {
      ticking = false;
    }
  }

  function requestRender() {
    targetY = window.scrollY;
    root.style.setProperty('--aet-sparkle-energy', String(Math.min(.68, .44 + Math.abs(targetY - renderedY) * .0025)));
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(render);
    }
  }

  window.addEventListener('scroll', requestRender, { passive: true });
  window.addEventListener('resize', function () {
    measure();
    requestRender();
  });
  requestRender();
})();
