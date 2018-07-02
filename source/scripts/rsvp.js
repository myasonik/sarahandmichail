import URLSearchParams from 'url-search-params';
import Awesomplete from 'awesomplete';

const input = document.getElementById('family_name');
const baseUrl = 'https://script.google.com/macros/s/AKfycbwvk33B7BqgzQLLWTr8KYGyQ1ZnJBUsL0chOKnnXMPiqf3y3g0l/exec';

let awesompleteTriggered = false;
let attending = false;
let mapping = document.querySelectorAll('#guests option');
mapping = [...mapping].reduce((mapping, element) => {
  mapping[element.innerHTML] = element.dataset.count;
  return mapping;
}, {});
new Awesomplete(input, {
  filter: (text, input) => Awesomplete.FILTER_CONTAINS(text.label.split(' Family')[0], input)
});

window.addEventListener('awesomplete-select', function(event) {
  let guestCount = mapping[event.text.label];
  let countContainer = document.querySelector('.rsvp__count');

  awesompleteTriggered = true;
  if (attending) {
    document.querySelector('.step--3').classList.add('is-required');
  }

  while (countContainer.firstChild) {
    countContainer.removeChild(countContainer.firstChild);
  }

  if (guestCount > 1) {
    let fields = document.createDocumentFragment();

    for (let i = 0; i < guestCount; i++) {
      let label = document.createElement('label');
      let input = document.createElement('input');
      input.name = 'guest_name';

      label.appendChild(document.createTextNode(`Person ${i+1}:`));
      label.appendChild(input);
      fields.appendChild(label);
    }

    countContainer.appendChild(fields);
  }
});

document.getElementById('attending').addEventListener('click', function() {
  attending = true;
  if (awesompleteTriggered) {
    let hidden = document.querySelectorAll('.hidden');
    [...hidden].forEach((element) => {
      element.classList.add('is-not-hidden');
    });
  }
});

document.getElementById('nope').addEventListener('click', function() {
  let hidden = document.querySelectorAll('.hidden');
  [...hidden].forEach((element) => {
    element.classList.remove('is-not-hidden');
  });
});

// Allows for user submissions of RSVPs
const rsvpSubmit = document.getElementById('rsvp-submit');
  rsvpSubmit.addEventListener('click', submitHandler);

// Applies error class to form fields with invalid content
const requiredIds = ['family_name', 'attending', 'nope'];
document.getElementById('family_name').addEventListener('blur', (event) => {
  let step = input.parentElement;

  while (!step.classList.contains('step')) {
    step = step.parentElement;
  }

  if (!mapping[event.target.value]) {
    step.querySelector('.error--match').removeAttribute('hidden');
  } else {
    step.querySelector('.error--match').setAttribute('hidden', 'hidden');
  }
});
requiredIds.forEach(id => {
  const input = document.getElementById(id);
  if (input) {
    input.addEventListener(
      'invalid',
      () => {
        let step = input.parentElement;

        while (!step.classList.contains('step')) {
          step = step.parentElement;
        }

        step.querySelector('.error--required').removeAttribute('hidden');
      },
      false
    );
    input.addEventListener('blur', () => {
      let step = input.parentElement;

      while (!step.classList.contains('step')) {
        step = step.parentElement;
      }

      step.querySelector('.error--required').setAttribute('hidden', 'hidden');
    });
  }
});

// Finds and submits all RSVPs for a family. Handles success/error redirect logic.
// @return void
function submitHandler() {
  const pendingRsvps = getPendingRsvps();

  if (!pendingRsvps) return;

  Promise.all(pendingRsvps).then(() => {
    let href = window.location.href;

    localStorage.setItem('didRSVP', 'true');

    if (href.indexOf('/ru/') > 0) {
      window.location.assign(`${window.location.origin}/ru/`);
    } else {
      window.location.assign(`${window.location.origin}`);
    }
  });
};

// accesses RSVP form to determine which RSVPs should be created.
// @return [Array<Promise>]
function getPendingRsvps() {
  const keys = ['family_name', 'is_attending', 'dietary_restrictions', 'song_selections', 'advice', 'additional_comments'];
  let formData = new FormData(document.getElementById('rsvp'));

  if (!document.getElementById('rsvp').checkValidity()) return;

  document.getElementById('rsvp-submit').setAttribute('disabled', 'disabled');

  return formData.getAll('guest_name').map(guestName => {
    let params = new URLSearchParams();
    params.set('guest_name', guestName);
    keys.forEach(function(key) {
      params.set(key, formData.get(key));
    });

    if (guestName === '') {
      params.set('guest_name', 'n/a');
    }

    const url = baseUrl + '?' + params.toString();
    return fetch(url);
  });
}
