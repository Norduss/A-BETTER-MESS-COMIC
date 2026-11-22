export function setupStoryMotion() {
  const story = document.querySelector<HTMLElement>('.story');
  if (!story) return;
  story.dataset.scrollActive = '';

  const chapters = Array.from(story.querySelectorAll<HTMLElement>('.chapter'));
  const links = story.querySelectorAll<HTMLAnchorElement>('.story-nav a');
  const navigation = story.querySelector('.story-nav');
  const scenes = Array.from(story.querySelectorAll<HTMLElement>('.panel, .chapter-heading')).map((trigger) => ({
    trigger,
    visual: trigger.querySelector<HTMLElement>('[data-scroll-visual]')!,
  }));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let currentChapter = '';

  function update() {
    frame = 0;
    let activeChapter = '';
    const fadeDistance = Math.min(160, innerHeight * 0.18);
    const topEdge = navigation?.getBoundingClientRect().bottom ?? 0;

    for (const { trigger, visual } of scenes) {
      if (reducedMotion.matches) {
        visual.style.removeProperty('--scroll-visibility');
        visual.style.removeProperty('--scroll-offset');
        continue;
      }

      const { top, bottom } = trigger.getBoundingClientRect();
      const entering = Math.min(1, Math.max(0, (innerHeight - top) / fadeDistance));
      const leaving = Math.min(1, Math.max(0, (bottom - topEdge) / fadeDistance));
      const visibility = Math.min(entering, leaving);
      // Smooth the edges, keeping a fully visible reading area in the middle.
      const eased = visibility * visibility * (3 - 2 * visibility);
      visual.style.setProperty('--scroll-visibility', String(eased));
      visual.style.setProperty('--scroll-offset', String((leaving - entering) * 20));
    }

    for (const chapter of chapters) {
      const bounds = chapter.getBoundingClientRect();
      if (bounds.top <= innerHeight * 0.5) activeChapter = chapter.id;
    }

    if (currentChapter === activeChapter) return;
    currentChapter = activeChapter;
    for (const link of links) {
      if (link.hash === `#${activeChapter}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  reducedMotion.addEventListener('change', schedule);
  schedule();
}
