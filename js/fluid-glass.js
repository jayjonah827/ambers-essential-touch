/* Amber's glass material: the user's fluid-ui sine displacement adapted to
   backdrop pixels. No artwork or portrait is copied into the lens. */
(function () {
  'use strict';
  var selector = [
    '.hdr', '.site-header', '.btn', '.sanctuary-location', '.quote-card',
    '.trust', '.promise__grid > li', '.card', '.service-entry', '.product',
    '.testimonial', '.tst', '.booking-shell', '.capture', '.step-card',
    '.concern', '.finder__row', '.quote', '.result', '.prep-shell',
    '.review-source', '.sanctuary-tabs a', '.price-list li', '.dl',
    '.book-bar', '.stickybook'
  ].join(',');
  var elements = Array.from(document.querySelectorAll(selector));
  elements.forEach(function (el) { el.classList.add('aet-fluid-glass'); });

  var ns = 'http://www.w3.org/2000/svg';
  function svgNode(name, attrs) {
    var el = document.createElementNS(ns, name);
    Object.keys(attrs).forEach(function (key) { el.setAttribute(key, attrs[key]); });
    return el;
  }
  var svg = svgNode('svg', { width: '0', height: '0', 'aria-hidden': 'true', focusable: 'false' });
  svg.style.cssText = 'position:absolute;pointer-events:none;overflow:hidden';
  var defs = svgNode('defs', {});
  var filter = svgNode('filter', { id: 'aet-fluid-refraction', x: '0%', y: '0%', width: '100%', height: '100%', 'color-interpolation-filters': 'sRGB' });
  var map = svgNode('feImage', { x: '0', y: '0', width: '100%', height: '100%', preserveAspectRatio: 'none', result: 'fluidMap' });
  filter.appendChild(map);
  filter.appendChild(svgNode('feDisplacementMap', { in: 'SourceGraphic', in2: 'fluidMap', scale: '12', xChannelSelector: 'R', yChannelSelector: 'G', result: 'refracted' }));
  filter.appendChild(svgNode('feGaussianBlur', { in: 'refracted', stdDeviation: '.65' }));
  defs.appendChild(filter); svg.appendChild(defs); document.body.appendChild(svg);

  var canvas = document.createElement('canvas');
  canvas.width = canvas.height = 96;
  var context = canvas.getContext('2d');
  if (!context) return;
  var pixels = context.createImageData(96, 96);
  function drawMap(phase) {
    for (var y = 0; y < 96; y++) for (var x = 0; x < 96; x++) {
      var dx = (x - 47.5) / 47.5, dy = (y - 47.5) / 47.5;
      var edge = Math.pow(Math.max(Math.abs(dx), Math.abs(dy)), 5);
      // The same two sine waves as fluid-ui, with restrained optical edge lift.
      var wx = Math.sin(dy * 4 + phase) + .35 * Math.sin((dx + dy) * 3 - phase * .7);
      var wy = .6 * Math.sin(dx * 4 - phase);
      var offset = (y * 96 + x) * 4;
      pixels.data[offset] = 128 + 48 * (wx * (1 - edge) + dx * edge);
      pixels.data[offset + 1] = 128 + 48 * (wy * (1 - edge) + dy * edge);
      pixels.data[offset + 2] = 128;
      pixels.data[offset + 3] = 255;
    }
    context.putImageData(pixels, 0, 0);
    map.setAttribute('href', canvas.toDataURL('image/png'));
  }
  drawMap(0);
  document.documentElement.classList.add('aet-refraction-ready');

  var reduce = matchMedia('(prefers-reduced-motion: reduce)');
  var visible = new Set();
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) { if (entry.isIntersecting) visible.add(entry.target); else visible.delete(entry.target); });
    sync();
  });
  elements.forEach(function (el) { observer.observe(el); });
  var timer = null, phase = 0, animatePhase = null, phaseAnimation = null;
  var motionState = { phase: 0 };
  // Reuse the same Motion version as the site's atmospheric scroll layer.
  import('https://cdn.jsdelivr.net/npm/motion@12.39.0/+esm').then(function (Motion) {
    animatePhase = Motion.animate;
    sync();
  }).catch(function () { /* The static refractive material remains usable. */ });
  function sync() {
    if (timer) { clearInterval(timer); timer = null; }
    if (phaseAnimation) { phaseAnimation.stop(); phaseAnimation = null; }
    if (reduce.matches || document.hidden || !visible.size || !animatePhase) return;
    phaseAnimation = animatePhase(motionState, { phase: [phase, phase + Math.PI * 20] }, { duration: 180, ease: 'linear', repeat: Infinity });
    // A shared low-resolution field is updated at 10fps; HTML remains sharp.
    timer = setInterval(function () { phase = motionState.phase; drawMap(phase); }, 100);
  }
  reduce.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pagehide', function () { if (timer) clearInterval(timer); if (phaseAnimation) phaseAnimation.stop(); });
  window.addEventListener('pageshow', sync);
})();
