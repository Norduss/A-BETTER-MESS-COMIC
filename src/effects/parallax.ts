export function setupParallax() {
  const frames = document.querySelectorAll<HTMLElement>('[data-parallax]');
  if (!frames.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let animationFrame = 0;

  function update() {
    animationFrame = 0;
    const viewportHeight = window.innerHeight;

    for (const frame of frames) {
      const { top, bottom, height } = frame.getBoundingClientRect();
      if (bottom <= 0 || top >= viewportHeight) continue;

      const progress = (viewportHeight - top) / (viewportHeight + height);
      frame.style.setProperty('--parallax-progress', String(2 * progress - 1));
    }
  }

  function schedule() {
    if (!animationFrame) animationFrame = window.requestAnimationFrame(update);
  }

  function syncPreference() {
    if (reducedMotion.matches) {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      for (const frame of frames) frame.style.removeProperty('--parallax-progress');
      return;
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
  }

  reducedMotion.addEventListener('change', syncPreference);
  syncPreference();
}
