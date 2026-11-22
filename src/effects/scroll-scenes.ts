/**
 * Motor de escenas ligadas al desplazamiento.
 *
 * - [data-scroll-scene] (portada, introducciones y transiciones): recibe
 *   --enter (0→1 mientras entra en pantalla) y --p (0→1 mientras su escenario
 *   fijo recorre la sección). Todo lo visual se resuelve en CSS con esas dos
 *   variables, así que solo se escriben números en cada frame.
 * - [data-reveal] (viñetas): aparecen una sola vez al entrar en pantalla con
 *   IntersectionObserver; nunca se desvanecen mientras se leen.
 * - Barra de progreso de lectura y capítulo activo (color de acento + menú).
 *
 * Con «reducir movimiento» no se registra nada: el CSS muestra todo estático.
 */
const clamp = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value);

export function setupScrollScenes() {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scenes = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-scene]'));
  const chapters = Array.from(document.querySelectorAll<HTMLElement>('[data-chapter]'));
  const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.story-nav a'));
  const progressBar = document.querySelector<HTMLElement>('[data-reading-progress]');
  const story = document.querySelector<HTMLElement>('.story');

  let frame = 0;
  let activeChapter = '';
  let observer: IntersectionObserver | undefined;

  function update() {
    frame = 0;
    const vh = window.innerHeight;

    for (const scene of scenes) {
      const { top, height } = scene.getBoundingClientRect();
      if (top > vh * 1.2 || top + height < -vh * 0.2) continue;
      const travel = Math.max(1, height - vh);
      scene.style.setProperty('--enter', clamp((vh - top) / vh).toFixed(4));
      scene.style.setProperty('--p', clamp(-top / travel).toFixed(4));
    }

    if (progressBar && story) {
      const { top, height } = story.getBoundingClientRect();
      progressBar.style.setProperty('--progress', clamp(-top / Math.max(1, height - vh)).toFixed(4));
    }

    let current = '';
    for (const chapter of chapters) {
      if (chapter.getBoundingClientRect().top <= vh * 0.5) current = chapter.dataset.chapter ?? '';
    }
    if (current !== activeChapter) {
      activeChapter = current;
      const article = chapters.find((chapter) => chapter.dataset.chapter === current);
      const accent = article ? getComputedStyle(article).getPropertyValue('--accent') : '';
      if (accent) root.style.setProperty('--active-accent', accent.trim());
      else root.style.removeProperty('--active-accent');
      for (const link of navLinks) {
        if (link.hash === `#${current}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    }
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  function revealAll() {
    for (const element of document.querySelectorAll<HTMLElement>('[data-reveal]')) element.classList.add('is-in');
  }

  function enable() {
    root.classList.add('motion');
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        observer?.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    for (const element of document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)')) {
      // Lo que ya está por encima de la pantalla (p. ej. al llegar por un ancla) aparece de inmediato.
      if (element.getBoundingClientRect().bottom < 0) element.classList.add('is-in');
      else observer.observe(element);
    }
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
  }

  function disable() {
    root.classList.remove('motion');
    observer?.disconnect();
    revealAll();
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    for (const scene of scenes) {
      scene.style.removeProperty('--enter');
      scene.style.removeProperty('--p');
    }
    // La barra de progreso y el capítulo activo siguen siendo útiles sin animación.
    window.addEventListener('scroll', schedule, { passive: true });
    schedule();
  }

  // Un enlace o el foco por teclado nunca deben caer en una viñeta invisible.
  document.addEventListener('focusin', (event) => {
    const panel = (event.target as HTMLElement).closest?.('[data-reveal]');
    panel?.classList.add('is-in');
  });
  window.addEventListener('hashchange', () => {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    target?.closest('[data-reveal]')?.classList.add('is-in');
  });

  const sync = () => (reducedMotion.matches ? disable() : enable());
  reducedMotion.addEventListener('change', sync);
  sync();
}
