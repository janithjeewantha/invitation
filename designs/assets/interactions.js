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
