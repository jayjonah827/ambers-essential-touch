/* Essential Preparation stays client-controlled: submit opens a prepared
   email to Amber. The static site does not silently store sensitive answers. */
(function () {
  'use strict';

  var form = document.getElementById('essential-preparation-form');
  if (!form) return;

  var status = document.getElementById('prep-status');
  var spiritChecks = Array.prototype.slice.call(form.querySelectorAll('input[name="spirit"]'));

  spiritChecks.forEach(function (check) {
    check.addEventListener('change', function () {
      var selected = spiritChecks.filter(function (item) { return item.checked; });
      if (selected.length > 2) {
        check.checked = false;
        status.textContent = 'Choose one or two items for what is on your spirit.';
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
    var selectedSpirit = spiritChecks.filter(function (item) { return item.checked; });
    if (!selectedSpirit.length) {
      status.textContent = 'Choose one or two items for what is on your spirit.';
      spiritChecks[0].focus();
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
      "What's on your spirit: " + all(data, 'spirit'),
      "What's on your heart: " + one(data, 'heart'),
      'Teen or senior: ' + one(data, 'teenSenior'),
      "Familiar with Amber's proprietary oil blend: " + one(data, 'familiar'),
      'Aromatic preferences: ' + all(data, 'aroma'),
      '',
      "What's on your mind: " + one(data, 'mind'),
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
