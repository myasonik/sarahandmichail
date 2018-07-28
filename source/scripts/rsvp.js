import URLSearchParams from 'url-search-params';
import Awesomplete from 'awesomplete';

const input = document.getElementById('family_name');
const baseUrl = 'https://script.google.com/macros/s/AKfycbwvk33B7BqgzQLLWTr8KYGyQ1ZnJBUsL0chOKnnXMPiqf3y3g0l/exec';

let awesompleteTriggered = false;
let attending = false;
let mapping = document.querySelectorAll('#guests option');
mapping = [...mapping].reduce((mapping, element) => {
  mapping[String(element.innerHTML).replace(/&amp;/g, '&')] = element.dataset.count;
  return mapping;
}, {});
new Awesomplete(input);

function unhide() {
  let hidden = document.querySelectorAll('.hidden');
  [...hidden].forEach((element) => {
    element.classList.add('is-not-hidden');
  });
}

window.addEventListener('awesomplete-select', function(event) {
  let guestCount = mapping[event.text.label];
  let countContainer = document.querySelector('.rsvp__count');

  awesompleteTriggered = true;
  if (attending) unhide();

  while (countContainer.firstChild) {
    countContainer.removeChild(countContainer.firstChild);
  }

  if (guestCount > 1) {
    let fields = document.createDocumentFragment();

    for (let i = 0; i < guestCount; i++) {
      let label = document.createElement('label');
      let input = document.createElement('input');
      input.name = 'guest_name';

      let personString = location.href.indexOf('/ru') > 0 ? 'Человек' : 'Person';

      label.appendChild(document.createTextNode(`${personString} ${i+1}:`));
      label.appendChild(input);
      fields.appendChild(label);
    }

    countContainer.appendChild(fields);
  }
});

document.getElementById('attending').addEventListener('click', function() {
  attending = true;
  if (awesompleteTriggered) unhide();
});

document.getElementById('nope').addEventListener('click', function() {
  let hidden = document.querySelectorAll('.hidden');
  [...hidden].forEach((element) => {
    element.classList.remove('is-not-hidden');
  });
});

// Allows for user submissions of RSVPs
// Finds and submits all RSVPs for a family. Handles success/error redirect logic.
const rsvpSubmit = document.getElementById('rsvp-submit');
rsvpSubmit.addEventListener('click', () => {
  if (!document.querySelector('.error--match').hasAttribute('hidden')) {
    return;
  }

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
});

// Applies error class to form fields with invalid content
document.getElementById('family_name').addEventListener('blur', (event) => {
  let step = input.parentElement;

  while (!step.classList.contains('step')) {
    step = step.parentElement;
  }

  let value = event.target.value;
  if (!mapping[value]) {
    step.querySelector('.error--match').removeAttribute('hidden');
  } else {
    step.querySelector('.error--match').setAttribute('hidden', 'hidden');
  }
});

const requiredIds = ['family_name', 'attending', 'nope'];
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

var outdatedBrowser=function(t){function o(t){s.style.opacity=t/100,s.style.filter="alpha(opacity="+t+")";}function e(t){o(t),1==t&&(s.style.display="block"),100==t&&(u=!0);}function r(){var t=document.getElementById("btnCloseUpdateBrowser"),o=document.getElementById("btnUpdateBrowser");s.style.backgroundColor=bkgColor,s.style.color=txtColor,s.children[0].style.color=txtColor,s.children[1].style.color=txtColor,o.style.color=txtColor,o.style.borderColor&&(o.style.borderColor=txtColor),t.style.color=txtColor,t.onmousedown=function(){return s.style.display="none",!1;},o.onmouseover=function(){this.style.color=bkgColor,this.style.backgroundColor=txtColor;},o.onmouseout=function(){this.style.color=txtColor,this.style.backgroundColor=bkgColor;};}function l(){var t=!1;if(window.XMLHttpRequest)t=new XMLHttpRequest;else if(window.ActiveXObject)try{t=new ActiveXObject("Msxml2.XMLHTTP");}catch(o){try{t=new ActiveXObject("Microsoft.XMLHTTP");}catch(o){t=!1;}}return t;}function a(t){var o=l();return o&&(o.onreadystatechange=function(){n(o);},o.open("GET",t,!0),o.send(null)),!1;}function n(t){var o=document.getElementById("outdated");return 4==t.readyState&&(o.innerHTML=200==t.status||304==t.status?t.responseText:d,r()),!1;}var s=document.getElementById("outdated");this.defaultOpts={bgColor:"#f25648",color:"#ffffff",lowerThan:"transform",languagePath:"../outdatedbrowser/lang/en.html"},t?("IE8"==t.lowerThan||"borderSpacing"==t.lowerThan?t.lowerThan="borderSpacing":"IE9"==t.lowerThan||"boxShadow"==t.lowerThan?t.lowerThan="boxShadow":"IE10"==t.lowerThan||"transform"==t.lowerThan||""==t.lowerThan||"undefined"==typeof t.lowerThan?t.lowerThan="transform":("IE11"==t.lowerThan||"borderImage"==t.lowerThan)&&(t.lowerThan="borderImage"),this.defaultOpts.bgColor=t.bgColor,this.defaultOpts.color=t.color,this.defaultOpts.lowerThan=t.lowerThan,this.defaultOpts.languagePath=t.languagePath,bkgColor=this.defaultOpts.bgColor,txtColor=this.defaultOpts.color,cssProp=this.defaultOpts.lowerThan,languagePath=this.defaultOpts.languagePath):(bkgColor=this.defaultOpts.bgColor,txtColor=this.defaultOpts.color,cssProp=this.defaultOpts.lowerThan,languagePath=this.defaultOpts.languagePath);var u=!0,i=function(){var t=document.createElement("div"),o="Khtml Ms O Moz Webkit".split(" "),e=o.length;return function(r){if(r in t.style)return!0;for(r=r.replace(/^[a-z]/,function(t){return t.toUpperCase();});e--;)if(o[e]+r in t.style)return!0;return!1;};}();if(!i(""+cssProp)){if(u&&"1"!==s.style.opacity){u=!1;for(var c=1;100>=c;c++)setTimeout(function(t){return function(){e(t);};}(c),8*c);}" "===languagePath||0==languagePath.length?r():a(languagePath);var d='<h6>Your browser is out-of-date!</h6><p>Update your browser to view this website correctly. <a id="btnUpdateBrowser" href="http://outdatedbrowser.com/">Update my browser now </a></p><p class="last"><a href="#" id="btnCloseUpdateBrowser" title="Close">&times;</a></p>';}};


function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
      window.onload = func;
  } else {
      window.onload = function() {
          if (oldonload) {
              oldonload();
          }
          func();
      };
  }
}
//call plugin function after DOM ready
addLoadEvent(function(){
  outdatedBrowser({
    bgColor: '#f25648',
    color: '#ffffff',
    lowerThan: 'transform',
    languagePath: ''
  });
});
