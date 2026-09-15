(() => {
  'use strict';
  const source = new URL('leberch-love-song-590429.mp3', document.currentScript.src);
  const audio = new Audio(source.href);
  audio.loop = true;
  audio.preload = 'none';
  audio.volume = 1;
  const key = 'wedding-review-music-muted';
  let muted = false;
  try { muted = localStorage.getItem(key) === 'true'; } catch {}
  let pending = false;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'wedding-sound';
  button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5 5 9H2v6h3l5 4Z"/><g class="sound-waves"><path d="M14 8a6 6 0 0 1 0 8M17 5a10 10 0 0 1 0 14"/></g><path class="sound-slash" d="m15 9 6 6m0-6-6 6"/></svg><span></span>';
  document.body.append(button);
  function render() {
    if (button.disabled) return;
    const playing = !audio.paused && !muted;
    button.dataset.playing = String(playing);
    const label = playing ? 'Mute music' : 'Play music';
    button.querySelector('span').textContent = label;
    button.setAttribute('aria-label', label);
    button.title = label;
  }
  async function start() {
    if (document.body.dataset.invitationOpen === 'false' || muted || pending || document.hidden || button.disabled) return;
    pending = true;
    try {
      await audio.play();
      if (muted || document.hidden) audio.pause();
    } catch { /* A user gesture may be needed before sound is allowed. */ }
    finally { pending = false; render(); }
  }
  function save() { try { localStorage.setItem(key, String(muted)); } catch {} }
  button.addEventListener('click', () => {
    if (!audio.paused) { muted = true; audio.pause(); }
    else { muted = false; start(); }
    save();
    render();
  });
  // Retry blocked autoplay on real interactions, without overriding a mute choice.
  document.addEventListener('click', event => {
    if (!button.contains(event.target) && audio.paused) start();
  });
  document.addEventListener('keydown', event => {
    if (!event.repeat && !button.contains(event.target) && audio.paused) start();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) audio.pause();
    else start();
  });
  window.addEventListener('pagehide', () => audio.pause());
  window.addEventListener('pageshow', () => start());
  audio.addEventListener('play', render);
  audio.addEventListener('pause', render);
  audio.addEventListener('error', () => {
    button.disabled = true;
    button.dataset.playing = 'false';
    button.querySelector('span').textContent = 'Music unavailable';
    button.setAttribute('aria-label', 'Music unavailable');
    button.title = 'The music could not be loaded. Please reload the page to retry.';
  });
  render();
  start();
})();
