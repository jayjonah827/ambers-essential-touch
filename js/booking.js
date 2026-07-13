/* AMBER'S ESSENTIAL TOUCH — booking flow (book.html)
   4 steps per 03_SPECIFICATION.md: Service → Time → Intake → Confirm.
   Phase 1 is request-based: the client composes a request, Amber confirms.
   Requests persist to localStorage and hand off via prefilled SMS / email,
   plus an .ics calendar file. Swap sendRequest() when a live provider
   (Square / Calendly / Acuity) is chosen. */

(function () {
  var LEAD_HOURS = 24;      // matches the 24-hour cancellation policy
  var WEEKS_AHEAD = 8;      // how far out the calendar opens
  var SLOT_STEP = 30;       // minutes between offered start times

  var state = {
    step: 1,
    service: null,
    date: null,   // Date at midnight local
    time: null,   // minutes from midnight
    details: null,
    monthCursor: null,
  };

  var $ = function (sel) { return document.querySelector(sel); };
  var stepsEl = document.querySelectorAll('.booking-steps li');
  var panels = document.querySelectorAll('[data-panel]');

  /* ---------- helpers ---------- */
  function fmtTime(mins) {
    var h = Math.floor(mins / 60), m = mins % 60;
    var ap = h >= 12 ? 'PM' : 'AM';
    var h12 = h % 12 === 0 ? 12 : h % 12;
    return h12 + ':' + String(m).padStart(2, '0') + ' ' + ap;
  }
  function fmtDate(d) {
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  }
  function minSelectable() {
    return new Date(Date.now() + LEAD_HOURS * 3600 * 1000);
  }
  function maxSelectable() {
    return new Date(Date.now() + WEEKS_AHEAD * 7 * 24 * 3600 * 1000);
  }
  function dayOpen(d) {
    return AET.hours[d.getDay()] || null;
  }
  function slotsFor(d) {
    var open = dayOpen(d);
    if (!open || !state.service) return [];
    var out = [];
    var lead = minSelectable();
    for (var t = open.open; t + state.service.duration <= open.close; t += SLOT_STEP) {
      var slotDate = new Date(d);
      slotDate.setMinutes(t);
      if (slotDate > lead) out.push(t);
    }
    return out;
  }

  /* ---------- step navigation ---------- */
  function goTo(step) {
    state.step = step;
    stepsEl.forEach(function (li, i) {
      li.classList.toggle('is-current', i + 1 === step);
      li.classList.toggle('is-done', i + 1 < step);
    });
    panels.forEach(function (p) {
      p.hidden = Number(p.dataset.panel) !== step;
    });
    if (step === 2) renderCalendar();
    if (step === 4) renderReview();
    $('.booking-shell').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ---------- step 1: services ---------- */
  function renderServices() {
    var wrap = $('#svc-list');
    wrap.innerHTML = '';
    AET.services.forEach(function (svc) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'svc-option';
      btn.innerHTML =
        '<span class="tile__dot" style="background:' + svc.gradient + '"></span>' +
        '<span style="flex:1">' +
        '<span class="svc-option__name">' + svc.name + '</span>' +
        '<span class="svc-option__meta">' + svc.meta + '</span>' +
        '<span class="svc-option__desc">' + svc.desc + '</span>' +
        '</span>';
      btn.addEventListener('click', function () {
        state.service = svc;
        state.time = null; // duration changed → slots change
        wrap.querySelectorAll('.svc-option').forEach(function (b) { b.classList.remove('is-selected'); });
        btn.classList.add('is-selected');
        $('#to-step-2').disabled = false;
      });
      wrap.appendChild(btn);
    });

    // deep link: book.html?service=acne
    var pre = new URLSearchParams(location.search).get('service');
    if (pre) {
      var idx = AET.services.findIndex(function (s) { return s.id === pre; });
      if (idx >= 0) wrap.children[idx].click();
    }
  }

  /* ---------- step 2: calendar + slots ---------- */
  function renderCalendar() {
    if (!state.monthCursor) {
      var first = minSelectable();
      state.monthCursor = new Date(first.getFullYear(), first.getMonth(), 1);
    }
    var cur = state.monthCursor;
    $('#cal-title').textContent = cur.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    var today = new Date();
    var thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    $('#cal-prev').disabled = cur <= thisMonth;
    $('#cal-next').disabled = new Date(cur.getFullYear(), cur.getMonth() + 1, 1) > maxSelectable();

    var grid = $('#cal-grid');
    grid.querySelectorAll('.cal__day').forEach(function (n) { n.remove(); });

    var firstDow = new Date(cur.getFullYear(), cur.getMonth(), 1).getDay();
    var daysInMonth = new Date(cur.getFullYear(), cur.getMonth() + 1, 0).getDate();
    for (var pad = 0; pad < firstDow; pad++) {
      var spacer = document.createElement('span');
      spacer.className = 'cal__day';
      grid.appendChild(spacer);
    }
    var lead = minSelectable(), max = maxSelectable();
    for (var day = 1; day <= daysInMonth; day++) {
      (function (day) {
        var d = new Date(cur.getFullYear(), cur.getMonth(), day);
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'cal__day';
        btn.textContent = day;
        var endOfDay = new Date(d); endOfDay.setHours(23, 59);
        var openable = dayOpen(d) && endOfDay > lead && d < max && slotsFor(d).length > 0;
        if (!openable) {
          btn.disabled = true;
        } else {
          if (state.date && d.getTime() === state.date.getTime()) btn.classList.add('is-selected');
          btn.addEventListener('click', function () {
            state.date = d;
            state.time = null;
            grid.querySelectorAll('.cal__day').forEach(function (b) { b.classList.remove('is-selected'); });
            btn.classList.add('is-selected');
            renderSlots();
          });
        }
        grid.appendChild(btn);
      })(day);
    }
    renderSlots();
  }

  function renderSlots() {
    var wrap = $('#slot-grid');
    var label = $('#slot-label');
    wrap.innerHTML = '';
    $('#to-step-3').disabled = true;
    if (!state.date) {
      label.textContent = 'Pick an open day to see times.';
      return;
    }
    label.textContent = fmtDate(state.date) + ' — choose a start time (' + state.service.duration + ' min held for you):';
    slotsFor(state.date).forEach(function (t) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'slot';
      b.textContent = fmtTime(t);
      if (state.time === t) b.classList.add('is-selected');
      b.addEventListener('click', function () {
        state.time = t;
        wrap.querySelectorAll('.slot').forEach(function (x) { x.classList.remove('is-selected'); });
        b.classList.add('is-selected');
        $('#to-step-3').disabled = false;
      });
      wrap.appendChild(b);
    });
  }

  /* ---------- step 3: intake ---------- */
  function wireIntake() {
    var form = $('#intake-form');
    var age = form.elements.age;
    var guardianRow = $('#guardian-row');
    age.addEventListener('change', function () {
      var minor = age.value === 'Under 18';
      guardianRow.hidden = !minor;
      form.elements.guardianName.required = minor;
      form.elements.guardianPhone.required = minor;
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var f = form.elements;
      state.details = {
        name: f.name.value.trim(),
        phone: f.phone.value.trim(),
        smsOk: f.smsOk.checked,
        email: f.email.value.trim(),
        age: f.age.value,
        guardianName: f.guardianName.value.trim(),
        guardianPhone: f.guardianPhone.value.trim(),
        firstVisit: f.firstVisit.value,
        goals: f.goals.value.trim(),
        health: f.health.value.trim(),
        heard: f.heard.value,
        skinNotes: f.skinNotes.checked,
      };
      goTo(4);
    });
  }

  /* ---------- step 4: review + send ---------- */
  function requestText() {
    var d = state.details;
    var when = fmtDate(state.date) + ' at ' + fmtTime(state.time);
    var lines = [
      'Booking request — Amber\'s Essential Touch',
      'Service: ' + state.service.name + ' (' + state.service.meta + ')',
      'When: ' + when,
      'Name: ' + d.name,
      'Phone: ' + d.phone + (d.smsOk ? ' (ok to text)' : ''),
      'Email: ' + d.email,
      'Age: ' + d.age + (d.guardianName ? ' — guardian: ' + d.guardianName + ' ' + d.guardianPhone : ''),
      'First visit: ' + d.firstVisit,
    ];
    if (d.goals) lines.push('Skin goals: ' + d.goals);
    if (d.health) lines.push('Allergies/medications/procedures: ' + d.health);
    lines.push('Heard about Amber via: ' + d.heard);
    return lines.join('\n');
  }

  function renderReview() {
    var box = $('#review-box');
    var d = state.details;
    box.textContent = '';
    var dl = document.createElement('dl');
    dl.style.margin = '0';
    var row = function (label, value) {
      if (!value) return;
      var dt = document.createElement('dt');
      dt.textContent = label;
      var dd = document.createElement('dd');
      dd.textContent = value; // user-typed values stay inert text
      dl.appendChild(dt);
      dl.appendChild(dd);
    };
    row('Service', state.service.name + ' · ' + state.service.meta);
    row('When', fmtDate(state.date) + ' at ' + fmtTime(state.time));
    row('Client', d.name + ' · ' + d.phone + ' · ' + d.email);
    row('Age bracket', d.age + (d.guardianName ? ' — guardian ' + d.guardianName + ', ' + d.guardianPhone : ''));
    row('First visit', d.firstVisit);
    row('Skin goals', d.goals);
    row('Health notes', d.health);
    box.appendChild(dl);
  }

  function icsFile() {
    var start = new Date(state.date);
    start.setMinutes(state.time);
    var end = new Date(start.getTime() + state.service.duration * 60000);
    var stamp = function (dt) {
      return dt.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    };
    return [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Ambers Essential Touch//Booking//EN',
      'BEGIN:VEVENT',
      'UID:' + Date.now() + '@ambersessentialtouch',
      'DTSTAMP:' + stamp(new Date()),
      'DTSTART:' + stamp(start),
      'DTEND:' + stamp(end),
      'SUMMARY:' + state.service.name + ' — Amber\'s Essential Touch (requested)',
      'LOCATION:' + AET.address,
      'DESCRIPTION:Requested appointment. Amber confirms by text or email.',
      'END:VEVENT', 'END:VCALENDAR',
    ].join('\r\n');
  }

  function sendRequest() {
    // Phase 1: persist locally + hand off. Replace with the live
    // provider call (Square / Calendly / Acuity) once one is chosen.
    try {
      var list = JSON.parse(localStorage.getItem('aet-booking-requests') || '[]');
      list.push({
        at: new Date().toISOString(),
        service: state.service.id,
        date: state.date.toISOString(),
        time: state.time,
        details: state.details,
      });
      localStorage.setItem('aet-booking-requests', JSON.stringify(list));
    } catch (err) { /* private mode — handoff links still work */ }

    var body = requestText();
    $('#send-sms').href = 'sms:' + AET.phone + '?&body=' + encodeURIComponent(body);
    $('#send-email').href = 'mailto:' + AET.email +
      '?subject=' + encodeURIComponent('Booking request — ' + state.details.name) +
      '&body=' + encodeURIComponent(body);
    $('#send-ics').href = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(icsFile());
    $('#send-ics').download = 'ambers-essential-touch.ics';

    $('#panel-review').hidden = true;
    $('#panel-confirm').hidden = false;
    $('#confirm-when').textContent = fmtDate(state.date) + ' at ' + fmtTime(state.time) + ' — ' + state.service.name;
  }

  /* ---------- wire up ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    renderServices();
    wireIntake();
    $('#to-step-2').addEventListener('click', function () { goTo(2); });
    $('#to-step-3').addEventListener('click', function () { goTo(3); });
    $('#back-1').addEventListener('click', function () { goTo(1); });
    $('#back-2').addEventListener('click', function () { goTo(2); });
    $('#back-3').addEventListener('click', function () { goTo(3); });
    $('#cal-prev').addEventListener('click', function () {
      state.monthCursor = new Date(state.monthCursor.getFullYear(), state.monthCursor.getMonth() - 1, 1);
      renderCalendar();
    });
    $('#cal-next').addEventListener('click', function () {
      state.monthCursor = new Date(state.monthCursor.getFullYear(), state.monthCursor.getMonth() + 1, 1);
      renderCalendar();
    });
    $('#send-request').addEventListener('click', sendRequest);
    goTo(1);
  });
})();
