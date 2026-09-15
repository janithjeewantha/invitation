const hero = document.querySelector('.hero');
document.querySelector('.replay')?.addEventListener('click', () => {
  hero.classList.remove('animate');
  void hero.offsetWidth;
  hero.classList.add('animate');
});
const wedding = new Date('2026-10-21T08:30:00+05:30').getTime();
function updateCountdown() {
  const seconds = Math.max(0, Math.floor((wedding - Date.now()) / 1000));
  const values = {days: Math.floor(seconds / 86400), hours: Math.floor(seconds / 3600) % 24, minutes: Math.floor(seconds / 60) % 60, seconds: seconds % 60};
  for (const [unit, value] of Object.entries(values)) {
    document.querySelector(`[data-unit="${unit}"]`).textContent = String(value).padStart(2, '0');
  }
}
updateCountdown();
setInterval(updateCountdown, 1000);
const dialog = document.querySelector('.lightbox');
let opener;
document.querySelectorAll('[data-photo]').forEach(button => button.addEventListener('click', () => {
  opener = button;
  dialog.querySelector('img').src = `../assets/photo-${button.dataset.photo}.jpeg`;
  dialog.showModal();
}));
document.querySelector('.close-lightbox').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {if(event.target === dialog) dialog.close();});
dialog.addEventListener('close', () => opener?.focus());

// Native scrolling drives the scale of each photo; no carousel dependency.
const album = document.querySelector('.theme-1:not(.theme-reverie) .gallery');
if (album) {
  const photos = [...album.querySelectorAll('.gallery-item')];
  const mobile = matchMedia('(max-width: 700px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const slots = photos.map((photo, i) => {
    const slot = document.createElement('div');
    slot.className = 'album-slot';
    photo.before(slot);
    slot.append(photo);
    slot.style.setProperty('--tilt', `${[-8, 4, -5][i % 3]}deg`);
    slot.style.setProperty('--lift', `${[18, -8, 25][i % 3]}px`);
    return slot;
  });
  const hint = document.createElement('p');
  hint.className = 'album-hint';
  hint.textContent = 'A few moments of us · Swipe & tap to open';
  album.after(hint);
  album.classList.add('floating-album');
  album.setAttribute('aria-label', 'Photo album. Swipe to browse, tap a photo to enlarge.');
  let active = 1;
  function sync() {
    if (!mobile.matches) return;
    const center = album.scrollLeft + album.clientWidth / 2;
    let closest = Infinity;
    slots.forEach((slot, i) => {
      const distance = Math.abs(slot.offsetLeft + slot.offsetWidth / 2 - center);
      const focus = Math.max(0, 1 - distance / (album.clientWidth * .65));
      slot.style.setProperty('--scale', reduced.matches ? 1 : (.73 + .27 * focus).toFixed(3));
      slot.style.setProperty('--fade', (.65 + .35 * focus).toFixed(3));
      slot.style.zIndex = String(Math.round(focus * 10));
      if (distance < closest) { closest = distance; active = i; }
    });
  }
  function centerPhoto(i, smooth = false) {
    const slot = slots[i];
    album.scrollTo({left: slot.offsetLeft + slot.offsetWidth / 2 - album.clientWidth / 2,
      behavior: smooth && !reduced.matches ? 'smooth' : 'instant'});
  }
  let frame;
  album.addEventListener('scroll', () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(sync);
  }, {passive: true});
  photos.forEach((photo, i) => photo.addEventListener('focus', () => {
    if (mobile.matches) centerPhoto(i, true);
  }));
  let width = 0;
  new ResizeObserver(() => {
    if (!mobile.matches || width === album.clientWidth) return;
    width = album.clientWidth;
    centerPhoto(active);
    sync();
  }).observe(album);
  mobile.addEventListener('change', () => {
    if (mobile.matches) { centerPhoto(active); sync(); }
    else album.scrollLeft = 0;
  });
  reduced.addEventListener('change', sync);
  if (mobile.matches) { centerPhoto(active); sync(); }
}
