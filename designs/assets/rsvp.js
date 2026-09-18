(() => {
  'use strict';
  const form = document.querySelector('.theme-reverie .reverie-rsvp');
  if (!form) return;
  const MAX_GUESTS = 5;
  const STORAGE = 'sp-wedding-rsvp-2026-attempt-v1';
  const button = form.querySelector('[type="submit"]');
  const status = form.querySelector('.rsvp-preview-status');
  const note = form.querySelector('.rsvp-form-note');
  const name = form.elements.namedItem('name');
  const contact = form.elements.namedItem('contact');
  const guests = form.elements.namedItem('guests');
  const message = form.elements.namedItem('message');
  const choices = [...form.querySelectorAll('[name="attendance"]')];
  const controls = [...form.querySelectorAll('input,textarea,select,button')].filter(el => el !== button);
  const url = window.WEDDING_RSVP?.deploymentUrl || '';
  const configured = /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(url);
  let channel, bridgeWindow, bridgeOrigin, frame, readyPromise, attempt = null;
  let busy = false, responseTimer, readyTimer, resolveReady, rejectReady;
  let storageAvailable = true;
  const attendance = () => choices.find(choice => choice.checked)?.value || '';
  function announce(text) { status.textContent = text; }
  function id() {
    const bytes = new Uint8Array(16);crypto.getRandomValues(bytes);
    return Array.from(bytes, n => n.toString(16).padStart(2,'0')).join('');
  }
  function saveAttempt() {
    try { sessionStorage.setItem(STORAGE, JSON.stringify(attempt)); }
    catch { storageAvailable = false; }
  }
  function clearAttempt() { attempt = null; try { sessionStorage.removeItem(STORAGE); } catch {} }
  function lockFields(locked) {
    controls.forEach(control => control.disabled = locked);
    if (!locked) {
      guests.disabled = attendance() !== 'yes';
      form.querySelector('[data-step="-1"]').disabled = guests.valueAsNumber <= 1;
      form.querySelector('[data-step="1"]').disabled = guests.valueAsNumber >= MAX_GUESTS;
    }
  }
  function validate() {
    name.setCustomValidity(name.value.trim().length < 2 ? 'Please enter your full name.' : '');
    const value = contact.value.trim();
    const digits = value.replace(/\D/g,'');
    const validContact = !value || (value.includes('@') ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      : /^\+?[\d\s().-]+$/.test(value) && digits.length >= 7 && digits.length <= 15);
    contact.setCustomValidity(validContact ? '' : 'Enter an email address or phone number, or leave this blank.');
    guests.required = attendance() === 'yes';
    guests.setCustomValidity(attendance() === 'yes' && (!Number.isInteger(guests.valueAsNumber) || guests.valueAsNumber < 1 || guests.valueAsNumber > MAX_GUESTS)
      ? `Enter 1 to ${MAX_GUESTS} guests, including yourself.` : '');
    return form.reportValidity();
  }
  form.addEventListener('input', () => {
    [name, contact, guests].forEach(field => field.setCustomValidity(''));
    if (!attempt) announce('');
  });
  guests.max = String(MAX_GUESTS);
  guests.inputMode = 'numeric';
  name.minLength = 2;
  contact.autocapitalize = 'none';
  contact.spellcheck = false;
  // A honeypot is basic noise filtering, not a replacement for CAPTCHA or authentication.
  const honey = document.createElement('input');
  honey.name = 'website';honey.type = 'text';honey.tabIndex = -1;honey.autocomplete = 'off';
  honey.className = 'rsvp-honeypot';honey.setAttribute('aria-hidden','true');form.append(honey);

  function trustedGoogleOrigin(origin) {
    try { const parsed = new URL(origin);return parsed.protocol === 'https:' &&
      (parsed.hostname === 'script.google.com' || parsed.hostname.endsWith('.googleusercontent.com')); }
    catch { return false; }
  }
  window.addEventListener('message', event => {
    const packet = event.data;
    if (!channel || !trustedGoogleOrigin(event.origin) || !packet || packet.app !== 'sp-wedding-rsvp' || packet.channel !== channel) return;
    if (packet.type === 'ready' && resolveReady) {
      bridgeWindow = event.source;bridgeOrigin = event.origin;clearTimeout(readyTimer);
      const resolve = resolveReady;resolveReady = rejectReady = null;resolve();return;
    }
    if (event.source !== bridgeWindow || event.origin !== bridgeOrigin || packet.type !== 'result' || !attempt || packet.submissionId !== attempt.payload.submissionId) return;
    clearTimeout(responseTimer);
    const result = packet.result;
    busy = false;form.removeAttribute('aria-busy');
    if (result?.ok === true && result.submissionId === attempt.payload.submissionId) {
      attempt.confirmed = true;saveAttempt();button.disabled = true;button.textContent = 'Response received';
      announce('Thank you! Your RSVP has been saved. To change your reply, please contact Sasindu or Piyumi.');
    } else if (result?.code === 'VALIDATION') {
      clearAttempt();lockFields(false);button.disabled = false;button.textContent = 'Send RSVP';
      announce(result.message || 'Please check your details and try again.');
    } else if (result?.code === 'CLOSED' || result?.code === 'CONFLICT') {
      button.disabled = true;announce(result.message);
    } else uncertain(result?.message);
  });
  function connect() {
    if (bridgeWindow) return Promise.resolve();
    if (readyPromise) return readyPromise;
    channel = id();
    readyPromise = new Promise((resolve, reject) => {
      resolveReady = resolve;rejectReady = reject;
      frame = document.createElement('iframe');
      frame.title = 'Secure RSVP connection';frame.hidden = true;frame.setAttribute('aria-hidden','true');
      frame.src = url + '?channel=' + channel;
      readyTimer = setTimeout(() => {
        frame.remove();frame = null;channel = null;resolveReady = rejectReady = null;readyPromise = null;
        reject(new Error('Connection timed out'));
      }, 20000);
      document.body.append(frame);
    });
    return readyPromise;
  }
  function uncertain(text) {
    busy = false;form.removeAttribute('aria-busy');button.disabled = false;button.textContent = 'Retry same response';
    announce((text || 'We could not confirm whether your RSVP was saved. Retry here; this will not add a duplicate.') +
      (!storageAvailable ? ' Keep this page open until you receive confirmation.' : ' Your details are kept in this tab for retrying.'));
  }
  function fillAttempt() {
    const data = attempt.payload;
    name.value = data.name;contact.value = data.contact;message.value = data.message;
    choices.forEach(choice => choice.checked = choice.value === data.attendance);
    guests.value = String(data.guests || 1);
    form.querySelector('.guest-count-group').hidden = data.attendance !== 'yes';
    lockFields(true);
  }
  try {
    const stored = JSON.parse(sessionStorage.getItem(STORAGE) || 'null');
    if (stored?.payload && /^[a-f0-9]{32}$/.test(stored.payload.submissionId) && ['name','contact','message'].every(k=>typeof stored.payload[k] === 'string')) attempt = stored;
  } catch { /* Storage may be unavailable; in-page retries still retain the same reference. */ }
  button.disabled = false;
  button.textContent = configured ? 'Send RSVP' : 'Check response';
  note.hidden = configured;
  note.textContent = configured ? ''
    : 'RSVP is not connected yet. You can check your details here, but nothing will be sent.';
  if (configured && attempt) {
    fillAttempt();
    if (attempt.confirmed) {
      button.disabled = true;button.textContent = 'Response received';
      announce('Your RSVP was already saved from this tab. Please contact the couple if you need to change it.');
    } else uncertain();
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (busy || (configured && attempt?.confirmed)) return;
    if (!configured) {
      if (validate()) announce('Your details look ready. Online RSVP is not connected yet; nothing has been sent or saved.');
      return;
    }
    if (location.protocol !== 'https:') { announce('Please open the published invitation over HTTPS to send your RSVP.');return; }
    if (!attempt) {
      if (!validate()) return;
      attempt = {confirmed:false, payload:{submissionId:id(),name:name.value.trim(),contact:contact.value.trim(),
        attendance:attendance(),guests:attendance()==='yes' ? guests.valueAsNumber : 0,message:message.value.trim(),website:honey.value}};
      saveAttempt();
    }
    busy = true;lockFields(true);button.disabled = true;button.textContent = 'Sending…';form.setAttribute('aria-busy','true');announce('Saving your response…');
    try {
      await connect();
      responseTimer = setTimeout(() => uncertain(), 35000);
      bridgeWindow.postMessage({app:'sp-wedding-rsvp',channel,type:'submit',payload:attempt.payload},bridgeOrigin);
    } catch { uncertain('The RSVP service could not be reached. Please retry, or contact the couple.'); }
  });
})();
