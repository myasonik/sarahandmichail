import Rellax from 'rellax';
import A11yDialog from 'a11y-dialog';
import Siema from 'siema';

let relax;
let siema;

establishPhotoCollection();

function establishPhotoCollection() {
  if (siema && siema.destroy) siema.destroy(true);
  if (relax && relax.destroy) relax.destroy();

  if (window.matchMedia('(min-width:1024px)').matches) {
    relax = new Rellax('.rellax', {
      speed: ((window.innerWidth - 946)*76)/656,
      center: false,
      wrapper: null,
      round: true,
      vertical: true,
      horizontal: false
    });
  } else {
    siema = new Siema();
  }
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

var myEfficientFn = debounce(establishPhotoCollection, 250);

window.addEventListener('resize', myEfficientFn);

/**
 * Nav
 */
const nav = document.getElementById('nav');
const navBtn = document.getElementById('navigation-btn');

const setNav = () => {
  const expanded = navBtn.getAttribute('aria-expanded') === 'true' || false;

  navBtn.setAttribute('aria-expanded', `${!expanded}`);

  if (expanded) {
    nav.classList.add('is-open');
  } else {
    nav.classList.remove('is-open');
  }
};

nav.removeAttribute('hidden');

setNav();

navBtn.addEventListener('click', setNav);
nav.addEventListener('click', (event) => {
  if (event.target.classList.contains('nav__link')) {
    setNav();
  }
});

/**
 * Countdown
 */
const countdown = document.getElementById('countdown');
const weddingTime = new Date('Sept 8, 2018 15:30').getTime();
const msPerDay = 86400000;
const msPerHour = 3600000;
const msPerMin = 60000;
const minute = 6000;
let timer = '';

const setTime = () => {
  const now = new Date().getTime();
  const diff = weddingTime - now;
  const days = Math.floor(diff / msPerDay);
  const hrs = Math.floor(diff % msPerDay / msPerHour);
  const mins = Math.floor(diff % msPerHour / msPerMin);
  let time = `${mins} minutes!`;

  if (days > 0) {
    time = `${days}d ${hrs}h ${mins}m`;
  } else if (hrs > 0) {
    time = `${hrs}h ${mins}m`;
  }

  if (diff > 0) {
    countdown.innerHTML = time;
  } else {
    clearInterval(timer);
  }
};

setTime();
timer = setInterval(setTime, minute);

let didRSVP = localStorage.getItem('didRSVP');

if (didRSVP === 'true') {
  document.querySelector('.rsvp-button').setAttribute('hidden', 'hidden');

  if (!localStorage.getItem('seenThankYouModal')) {
    const rsvpDialog = new A11yDialog(document.getElementById('rsvp-dialog'));
    rsvpDialog.show();
    localStorage.setItem('seenThankYouModal', 'true');
  }
}
