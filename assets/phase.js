// Wording follows the wedding day, in Sri Lanka time (UTC+5:30).
// An element with data-show="morning during" is shown only in those phases;
// the HTML ships with the "before" wording visible, so it also works without JavaScript.
(() => {
  const ends = [
    ['before', '2026-10-21T00:00:00+05:30'], // the eve: "tomorrow"
    ['morning', '2026-10-21T09:00:00+05:30'], // the day, before the Poruwa
    ['during', '2026-10-21T16:00:00+05:30'], // the celebration
  ]; // afterwards: "after", the thank-you
  const root = document.documentElement;
  function update() {
    const now = Date.now();
    const phase = ends.find(([, end]) => now < Date.parse(end))?.[0] || 'after';
    if (root.dataset.phase === phase) return;
    root.dataset.phase = phase;
    document.querySelectorAll('[data-show]').forEach(el => { el.hidden = !el.dataset.show.split(' ').includes(phase); });
  }
  update();
  setInterval(update, 30000); // a page left open still turns over at midnight, 9.00 am and 4.00 pm
})();
