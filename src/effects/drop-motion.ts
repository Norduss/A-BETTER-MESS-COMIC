export function setupDropMotion() {
  const scenes = Array.from(document.querySelectorAll<HTMLElement>('[data-drop-scene]'));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;

  const clamp = (value: number) => Math.min(1, Math.max(0, value));

  function update() {
    frame = 0;
    for (const scene of scenes) {
      const start = window.innerHeight * 0.82;
      const travel = window.innerHeight * 0.4;
      const progress = clamp((start - scene.getBoundingClientRect().top) / travel);
      const fall = clamp(progress / 0.72);
      const splash = clamp((progress - 0.72) / 0.28);

      scene.style.setProperty('--fall', String(fall ** 2));
      scene.style.setProperty('--drop-opacity', String(1 - clamp((fall - 0.95) / 0.05)));
      scene.style.setProperty('--splash', String(splash));
      scene.style.setProperty('--ripple-opacity', String(Math.sin(splash * Math.PI)));
    }
  }

  function schedule() {
    if (!frame) frame = window.requestAnimationFrame(update);
  }

  function syncPreference() {
    if (reducedMotion.matches) {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.cancelAnimationFrame(frame);
      frame = 0;
      for (const scene of scenes) {
        for (const property of ['--fall', '--drop-opacity', '--splash', '--ripple-opacity']) {
          scene.style.removeProperty(property);
        }
      }
      return;
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
  }

  reducedMotion.addEventListener('change', syncPreference);
  syncPreference();
}
