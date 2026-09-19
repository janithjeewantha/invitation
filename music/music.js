(() => {
  'use strict';
  const source = new URL('leberch-love-song-590429.mp3', document.currentScript.src);
  const audio = new Audio(source.href);
  audio.loop = true;
  audio.preload = 'none';
  audio.volume = 1;
  let boostContext;
  async function boostMusic() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    // Local file previews cannot reliably route media through Web Audio (CORS).
    if (!AudioContext || location.protocol === 'file:') return;
    // Create the audio route only during a gesture, once the context can run.
    if (!boostContext && navigator.userActivation?.isActive) {
      const context = new AudioContext();
      try {
        await context.resume();
        if (context.state !== 'running') { await context.close(); return; }
        const gain = context.createGain();
        gain.gain.value = 2;
        const source = context.createMediaElementSource(audio);
        source.connect(gain);
        gain.connect(context.destination);
        boostContext = context;
      } catch { await context.close().catch(() => {}); }
    } else if (boostContext?.state === 'suspended') {
      await boostContext.resume();
    }
  }

  const key = 'wedding-review-music-muted';
  let muted = false;
  try { muted = localStorage.getItem(key) === 'true'; } catch {}
  let pending = false;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'wedding-sound';
  button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5 5 9H2v6h3l5 4Z"/><g class="sound-waves"><path d="M14 8a6 6 0 0 1 0 8M17 5a10 10 0 0 1 0 14"/></g><path class="sound-slash" d="m15 9 6 6m0-6-6 6"/></svg>';
  document.body.append(button);
  function render() {
    if (button.disabled) return;
    const playing = !audio.paused && !muted && (!boostContext || boostContext.state === 'running');
    button.dataset.playing = String(playing);
    const label = playing ? 'Mute music' : 'Play music';
    button.setAttribute('aria-label', label);
    button.title = label;
  }
  async function start() {
    if (document.body.dataset.invitationOpen === 'false' || muted || pending || document.hidden || button.disabled) return;
    pending = true;
    try {
      // Start playback during the click itself; awaiting context.resume() first
      // can lose the browser's user-gesture permission or stall indefinitely.
      const boosting = boostMusic();
      const playback = audio.play();
      boosting.catch(() => {}).finally(render);
      await playback;
      if (muted || document.hidden) audio.pause();
    } catch { /* A user gesture may be needed before sound is allowed. */ }
    finally { pending = false; render(); }
  }
  function save() { try { localStorage.setItem(key, String(muted)); } catch {} }
  button.addEventListener('click', () => {
    if (!audio.paused && (!boostContext || boostContext.state === 'running')) { muted = true; audio.pause(); }
    else { muted = false; start(); }
    save();
    render();
  });
  // Retry blocked autoplay on real interactions, without overriding a mute choice.
  document.addEventListener('click', event => {
    if (!button.contains(event.target) && (audio.paused || (boostContext && boostContext.state !== 'running'))) start();
  });
  document.addEventListener('keydown', event => {
    if (!event.repeat && !button.contains(event.target) && (audio.paused || (boostContext && boostContext.state !== 'running'))) start();
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
    button.setAttribute('aria-label', 'Music unavailable');
    button.title = 'The music could not be loaded. Please reload the page to retry.';
  });
  render();
  start();
})();
