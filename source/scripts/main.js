import Rellax from 'rellax';

let relax = new Rellax('.rellax', {
  speed: ((window.innerWidth - 946)*76)/656,
  center: false,
  wrapper: null,
  round: true,
  vertical: true,
  horizontal: false
});

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

var myEfficientFn = debounce(function() {
  relax.destroy();
  relax = new Rellax('.rellax', {
    speed: ((window.innerWidth - 946)*76)/656,
    center: false,
    wrapper: null,
    round: true,
    vertical: true,
    horizontal: false
  });
}, 250);

window.addEventListener('resize', myEfficientFn);

!function(){function t(t){var e=Array.isArray(t)?{label:t[0],value:t[1]}:"object"==typeof t&&"label"in t&&"value"in t?t:{label:t,value:t};this.label=e.label||e.value,this.value=e.value;}function e(t,e,i){for(var n in e){var s=e[n],r=t.input.getAttribute("data-"+n.toLowerCase());"number"==typeof s?t[n]=parseInt(r):!1===s?t[n]=null!==r:s instanceof Function?t[n]=null:t[n]=r,t[n]||0===t[n]||(t[n]=n in i?i[n]:s);}}function i(t,e){return"string"==typeof t?(e||document).querySelector(t):t||null;}function n(t,e){return o.call((e||document).querySelectorAll(t));}function s(){n("input.awesomplete").forEach(function(t){new r(t);});}var r=function(t,n){var s=this;Awesomplete.count=(Awesomplete.count||0)+1,this.count=Awesomplete.count,this.isOpened=!1,this.input=i(t),this.input.setAttribute("autocomplete","off"),this.input.setAttribute("aria-owns","awesomplete_list_"+this.count),this.input.setAttribute("role","combobox"),n=n||{},e(this,{minChars:2,maxItems:10,autoFirst:!1,data:r.DATA,filter:r.FILTER_CONTAINS,sort:!1!==n.sort&&r.SORT_BYLENGTH,item:r.ITEM,replace:r.REPLACE},n),this.index=-1,this.container=i.create("div",{className:"awesomplete",around:t}),this.ul=i.create("ul",{hidden:"hidden",role:"listbox",id:"awesomplete_list_"+this.count,inside:this.container}),this.status=i.create("span",{className:"visually-hidden",role:"status","aria-live":"assertive","aria-atomic":!0,inside:this.container,textContent:0!=this.minChars?"Type "+this.minChars+" or more characters for results.":"Begin typing for results."}),this._events={input:{input:this.evaluate.bind(this),blur:this.close.bind(this,{reason:"blur"}),keydown:function(t){var e=t.keyCode;s.opened&&(13===e&&s.selected?(t.preventDefault(),s.select()):27===e?s.close({reason:"esc"}):38!==e&&40!==e||(t.preventDefault(),s[38===e?"previous":"next"]()));}},form:{submit:this.close.bind(this,{reason:"submit"})},ul:{mousedown:function(t){t.preventDefault();},click:function(t){var e=t.target;if(e!==this){for(;e&&!/li/i.test(e.nodeName);)e=e.parentNode;e&&0===t.button&&(t.preventDefault(),s.select(e,t.target));}}}},i.bind(this.input,this._events.input),i.bind(this.input.form,this._events.form),i.bind(this.ul,this._events.ul),this.input.hasAttribute("list")?(this.list="#"+this.input.getAttribute("list"),this.input.removeAttribute("list")):this.list=this.input.getAttribute("data-list")||n.list||[],r.all.push(this);};r.prototype={set list(t){if(Array.isArray(t))this._list=t;else if("string"==typeof t&&t.indexOf(",")>-1)this._list=t.split(/\s*,\s*/);else if((t=i(t))&&t.children){var e=[];o.apply(t.children).forEach(function(t){if(!t.disabled){var i=t.textContent.trim(),n=t.value||i,s=t.label||i;""!==n&&e.push({label:s,value:n});}}),this._list=e;}document.activeElement===this.input&&this.evaluate();},get selected(){return this.index>-1;},get opened(){return this.isOpened;},close:function(t){this.opened&&(this.ul.setAttribute("hidden",""),this.isOpened=!1,this.index=-1,this.status.setAttribute("hidden",""),i.fire(this.input,"awesomplete-close",t||{}));},open:function(){this.ul.removeAttribute("hidden"),this.isOpened=!0,this.status.removeAttribute("hidden"),this.autoFirst&&-1===this.index&&this.goto(0),i.fire(this.input,"awesomplete-open");},destroy:function(){i.unbind(this.input,this._events.input),i.unbind(this.input.form,this._events.form);var t=this.container.parentNode;t.insertBefore(this.input,this.container),t.removeChild(this.container),this.input.removeAttribute("autocomplete"),this.input.removeAttribute("aria-autocomplete");var e=r.all.indexOf(this);-1!==e&&r.all.splice(e,1);},next:function(){var t=this.ul.children.length;this.goto(this.index<t-1?this.index+1:t?0:-1);},previous:function(){var t=this.ul.children.length,e=this.index-1;this.goto(this.selected&&-1!==e?e:t-1);},goto:function(t){var e=this.ul.children;this.selected&&e[this.index].setAttribute("aria-selected","false"),this.index=t,t>-1&&e.length>0&&(e[t].setAttribute("aria-selected","true"),this.status.textContent=e[t].textContent+", list item "+(t+1)+" of "+e.length,this.input.setAttribute("aria-activedescendant",this.ul.id+"_item_"+this.index),this.ul.scrollTop=e[t].offsetTop-this.ul.clientHeight+e[t].clientHeight,i.fire(this.input,"awesomplete-highlight",{text:this.suggestions[this.index]}));},select:function(t,e){if(t?this.index=i.siblingIndex(t):t=this.ul.children[this.index],t){var n=this.suggestions[this.index];i.fire(this.input,"awesomplete-select",{text:n,origin:e||t})&&(this.replace(n),this.close({reason:"select"}),i.fire(this.input,"awesomplete-selectcomplete",{text:n}));}},evaluate:function(){var e=this,i=this.input.value;i.length>=this.minChars&&this._list&&this._list.length>0?(this.index=-1,this.ul.innerHTML="",this.suggestions=this._list.map(function(n){return new t(e.data(n,i));}).filter(function(t){return e.filter(t,i);}),!1!==this.sort&&(this.suggestions=this.suggestions.sort(this.sort)),this.suggestions=this.suggestions.slice(0,this.maxItems),this.suggestions.forEach(function(t,n){e.ul.appendChild(e.item(t,i,n));}),0===this.ul.children.length?(this.status.textContent="No results found",this.close({reason:"nomatches"})):(this.open(),this.status.textContent=this.ul.children.length+" results found")):(this.close({reason:"nomatches"}),this.status.textContent="No results found");}},r.all=[],r.FILTER_CONTAINS=function(t,e){return RegExp(i.regExpEscape(e.trim()),"i").test(t);},r.FILTER_STARTSWITH=function(t,e){return RegExp("^"+i.regExpEscape(e.trim()),"i").test(t);},r.SORT_BYLENGTH=function(t,e){return t.length!==e.length?t.length-e.length:t<e?-1:1;},r.ITEM=function(t,e,n){return i.create("li",{innerHTML:""===e.trim()?t:t.replace(RegExp(i.regExpEscape(e.trim()),"gi"),"<mark>$&</mark>"),"aria-selected":"false",id:"awesomplete_list_"+this.count+"_item_"+n});},r.REPLACE=function(t){this.input.value=t.value;},r.DATA=function(t){return t;},Object.defineProperty(t.prototype=Object.create(String.prototype),"length",{get:function(){return this.label.length;}}),t.prototype.toString=t.prototype.valueOf=function(){return""+this.label;};var o=Array.prototype.slice;i.create=function(t,e){var n=document.createElement(t);for(var s in e){var r=e[s];if("inside"===s)i(r).appendChild(n);else if("around"===s){var o=i(r);o.parentNode.insertBefore(n,o),n.appendChild(o);}else s in n?n[s]=r:n.setAttribute(s,r);}return n;},i.bind=function(t,e){if(t)for(var i in e){var n=e[i];i.split(/\s+/).forEach(function(e){t.addEventListener(e,n);});}},i.unbind=function(t,e){if(t)for(var i in e){var n=e[i];i.split(/\s+/).forEach(function(e){t.removeEventListener(e,n);});}},i.fire=function(t,e,i){var n=document.createEvent("HTMLEvents");n.initEvent(e,!0,!0);for(var s in i)n[s]=i[s];return t.dispatchEvent(n);},i.regExpEscape=function(t){return t.replace(/[-\\^$*+?.()|[\]{}]/g,"\\$&");},i.siblingIndex=function(t){for(var e=0;t=t.previousElementSibling;e++);return e;},"undefined"!=typeof Document&&("loading"!==document.readyState?s():document.addEventListener("DOMContentLoaded",s)),r.$=i,r.$$=n,"undefined"!=typeof self&&(self.Awesomplete=r),"object"==typeof module&&module.exports&&(module.exports=r);}();

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

if (nav) {
  nav.removeAttribute('hidden');

  setNav();

  navBtn.addEventListener('click', setNav);
  nav.addEventListener('click', (event) => {
    if (event.target.classList.contains('nav__link')) {
      setNav();
    }
  });
}

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

if (countdown) {
  setTime();
  timer = setInterval(setTime, minute);
}


/**
 * RSVP
 */
const input = document.getElementById('family_name');
const baseUrl = 'https://script.google.com/macros/s/AKfycbwvk33B7BqgzQLLWTr8KYGyQ1ZnJBUsL0chOKnnXMPiqf3y3g0l/exec';

if (input) {
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
}

// Allows for user submissions of RSVPs
document.getElementById('rsvp-submit').addEventListener('click', submitHandler);

// Finds and submits all RSVPs for a family. Handles success/error redirect logic.
// TODO: Include polyfill for Promise.
// @return void
function submitHandler() {
  const pendingRsvps = getPendingRsvps();

  Promise.all(pendingRsvps).then(function(resp) {
    // TODO: Include a modal here for redirect functionality!
    console.log(resp);
  });
};

// accesses RSVP form to determine which RSVPs should be created.
// TODO: Include polyfills for URLSearchParams.
// @return [Array<Promise>]
function getPendingRsvps() {
  const keys = ['family_name', 'is_attending', 'dietary_restrictions', 'song_selections', 'advice', 'additional_comments'];
  let formData = new FormData(document.getElementById('rsvp'));

  // TODO: Raise error if family_name ("This RSVP is for:") is not included in the mapping.

  let pendingRsvps = formData.getAll('guest_name').map(guestName => {
    if (guestName === '') return;

    let params = new URLSearchParams();
    params.set('guest_name', guestName);
    keys.forEach(function(key) {
      params.set(key, formData.get(key));
    });

    const url = baseUrl + '?' + params.toString();
    return fetch(url);
  }).filter(rsvp => rsvp != undefined);
}
