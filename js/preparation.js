/* Essential Preparation stays client-controlled: submit opens a prepared
   email to Amber. The static site does not silently store sensitive answers. */
(function () {
  'use strict';

  var form = document.getElementById('essential-preparation-form');
  if (!form) return;

  var status = document.getElementById('prep-status');
  var supportChecks = Array.prototype.slice.call(form.querySelectorAll('input[name="support"]'));

  supportChecks.forEach(function (check) {
    check.addEventListener('change', function () {
      var selected = supportChecks.filter(function (item) { return item.checked; });
      if (selected.length > 2) {
        check.checked = false;
        status.textContent = 'Choose no more than two kinds of support.';
      } else {
        status.textContent = '';
      }
    });
  });

  function all(data, name) {
    var values = data.getAll(name).filter(Boolean);
    return values.length ? values.join(', ') : 'Not selected';
  }

  function one(data, name) {
    return data.get(name) || 'Not answered';
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var selectedSupport = supportChecks.filter(function (item) { return item.checked; });
    if (!selectedSupport.length) {
      status.textContent = 'Choose one or two kinds of support.';
      supportChecks[0].focus();
      return;
    }
    if (!form.reportValidity()) return;

    var data = new FormData(form);
    var name = one(data, 'name');
    var lines = [
      'ESSENTIAL PREPARATION',
      '',
      'Name: ' + name,
      'Email: ' + one(data, 'email'),
      'Preferred contact: ' + one(data, 'preferredContact'),
      '',
      'Support requested: ' + all(data, 'support'),
      'Teen or senior: ' + one(data, 'teenSenior'),
      "Familiar with Amber's proprietary oil blend: " + one(data, 'familiar'),
      '',
      'Looking for: ' + one(data, 'lookingFor'),
      'Anything Amber should know: ' + one(data, 'notes'),
      'Email updates: ' + (data.get('updates') ? 'Yes' : 'No')
    ];

    var subject = encodeURIComponent('Essential Preparation · ' + name);
    var body = encodeURIComponent(lines.join('\n'));
    status.textContent = 'Your email app is opening with the preparation attached.';
    window.location.href = 'mailto:ambersessentialtouch@gmail.com?subject=' + subject + '&body=' + body;
  });
})();
