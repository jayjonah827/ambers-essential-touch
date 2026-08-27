/* AMBER'S ESSENTIAL TOUCH — request-based booking flow.
   Clients choose a service and a preferred visit window. Nothing presented
   here claims live availability: Amber confirms the exact appointment. */

(function () {
  var state = {
    step: 1,
    service: null,
    date: '',
    time: '',
    details: null,
  };

  var $ = function (sel) { return document.querySelector(sel); };
  var stepsEl = document.querySelectorAll('.booking-steps li');
  var panels = document.querySelectorAll('[data-panel]');

  function parseLocalDate(value) {
    var parts = value.split('-').map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2], 12, 0, 0);
  }

  function fmtDate(value) {
    if (!value) return '';
    return parseLocalDate(value).toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    });
  }

  function goTo(step) {
    state.step = step;
    stepsEl.forEach(function (li, i) {
      li.classList.toggle('is-current', i + 1 === step);
      li.classList.toggle('is-done', i + 1 < step);
    });
    panels.forEach(function (panel) {
      panel.hidden = Number(panel.dataset.panel) !== step;
    });
    if (step === 4) renderReview();
    $('.booking-shell').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderServices() {
    var wrap = $('#svc-list');
    wrap.innerHTML = '';
    AET.services.forEach(function (service) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'svc-option';
      button.innerHTML =
        '<span class="tile__dot" style="background:' + service.gradient + '"></span>' +
        '<span style="flex:1">' +
        '<span class="svc-option__name">' + service.name + '</span>' +
        '<span class="svc-option__meta">' + service.meta + '</span>' +
        '<span class="svc-option__desc">' + service.desc + '</span>' +
        '</span>';
      button.addEventListener('click', function () {
        state.service = service;
        wrap.querySelectorAll('.svc-option').forEach(function (item) {
          item.classList.remove('is-selected');
        });
        button.classList.add('is-selected');
        $('#to-step-2').disabled = false;
      });
      wrap.appendChild(button);
    });

    var requestedService = new URLSearchParams(location.search).get('service');
    if (requestedService) {
      var index = AET.services.findIndex(function (service) {
        return service.id === requestedService;
      });
      if (index >= 0) wrap.children[index].click();
    }
  }

  function setDateLimits() {
    var input = $('#preferred-date');
    var min = new Date();
    min.setDate(min.getDate() + 1);
    var max = new Date();
    max.setDate(max.getDate() + 56);
    var isoLocal = function (date) {
      var year = date.getFullYear();
      var month = String(date.getMonth() + 1).padStart(2, '0');
      var day = String(date.getDate()).padStart(2, '0');
      return year + '-' + month + '-' + day;
    };
    input.min = isoLocal(min);
    input.max = isoLocal(max);
  }

  function updateVisitWindow() {
    state.date = $('#preferred-date').value;
    state.time = $('#preferred-time').value;
    $('#to-step-3').disabled = !(state.date && state.time);
  }

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
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      var fields = form.elements;
      state.details = {
        name: fields.name.value.trim(),
        phone: fields.phone.value.trim(),
        smsOk: fields.smsOk.checked,
        email: fields.email.value.trim(),
        age: fields.age.value,
        guardianName: fields.guardianName.value.trim(),
        guardianPhone: fields.guardianPhone.value.trim(),
        firstVisit: fields.firstVisit.value,
        goals: fields.goals.value.trim(),
        health: fields.health.value.trim(),
        heard: fields.heard.value,
        skinNotes: fields.skinNotes.checked,
      };
      goTo(4);
    });
  }

  function requestText() {
    var details = state.details;
    var lines = [
      'Booking request — Amber\'s Essential Touch',
      'Service: ' + state.service.name + ' (' + state.service.meta + ')',
      'Preferred visit: ' + fmtDate(state.date) + ' — ' + state.time,
      'Name: ' + details.name,
      'Phone: ' + details.phone + (details.smsOk ? ' (ok to text)' : ''),
      'Email: ' + details.email,
      'Age: ' + details.age + (details.guardianName ? ' — guardian: ' + details.guardianName + ' ' + details.guardianPhone : ''),
      'First visit: ' + details.firstVisit,
    ];
    if (details.goals) lines.push('Skin goals: ' + details.goals);
    if (details.health) lines.push('Allergies/medications/procedures: ' + details.health);
    lines.push('Heard about Amber via: ' + details.heard);
    lines.push('Please confirm the exact appointment date and time.');
    return lines.join('\n');
  }

  function renderReview() {
    var box = $('#review-box');
    var details = state.details;
    box.textContent = '';
    var list = document.createElement('dl');
    list.style.margin = '0';
    var addRow = function (label, value) {
      if (!value) return;
      var term = document.createElement('dt');
      var description = document.createElement('dd');
      term.textContent = label;
      description.textContent = value;
      list.appendChild(term);
      list.appendChild(description);
    };
    addRow('Service', state.service.name + ' · ' + state.service.meta);
    addRow('Preferred visit', fmtDate(state.date) + ' · ' + state.time);
    addRow('Client', details.name + ' · ' + details.phone + ' · ' + details.email);
    addRow('Age bracket', details.age + (details.guardianName ? ' — guardian ' + details.guardianName + ', ' + details.guardianPhone : ''));
    addRow('First visit', details.firstVisit);
    addRow('Skin goals', details.goals);
    addRow('Health notes', details.health);
    box.appendChild(list);
  }

  function sendRequest() {
    try {
      var requests = JSON.parse(localStorage.getItem('aet-booking-requests') || '[]');
      requests.push({
        at: new Date().toISOString(),
        service: state.service.id,
        preferredDate: state.date,
        preferredTime: state.time,
        details: state.details,
      });
      localStorage.setItem('aet-booking-requests', JSON.stringify(requests));
    } catch (error) { /* Handoff links remain usable if storage is unavailable. */ }

    var body = requestText();
    $('#send-sms').href = 'sms:' + AET.phone + '?&body=' + encodeURIComponent(body);
    $('#send-email').href = 'mailto:' + AET.email +
      '?subject=' + encodeURIComponent('Booking request — ' + state.details.name) +
      '&body=' + encodeURIComponent(body);
    $('#panel-review').hidden = true;
    $('#panel-confirm').hidden = false;
    $('#confirm-when').textContent = fmtDate(state.date) + ' · ' + state.time + ' — ' + state.service.name;
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderServices();
    setDateLimits();
    wireIntake();
    $('#preferred-date').addEventListener('change', updateVisitWindow);
    $('#preferred-time').addEventListener('change', updateVisitWindow);
    $('#to-step-2').addEventListener('click', function () { goTo(2); });
    $('#to-step-3').addEventListener('click', function () { goTo(3); });
    $('#back-1').addEventListener('click', function () { goTo(1); });
    $('#back-2').addEventListener('click', function () { goTo(2); });
    $('#back-3').addEventListener('click', function () { goTo(3); });
    $('#send-request').addEventListener('click', sendRequest);
    goTo(1);
  });
})();
