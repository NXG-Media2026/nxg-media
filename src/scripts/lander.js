'use strict';
document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('.logos-toggle').forEach(button => button.addEventListener('click', () => {
  const paused = button.closest('.client-proof').classList.toggle('is-paused');
  button.setAttribute('aria-pressed', String(paused));
  button.textContent = paused ? 'Logo’s afspelen' : 'Logo’s pauzeren';
}));

// Rotate portraits without moving the offer or the primary action.
(() => {
  const hero = document.querySelector('.hero-visual');
  const frames = [...document.querySelectorAll('.portrait-frame')];
  if (!hero || frames.length < 2) return;
  const pause = hero.querySelector('.portrait-pause');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0, timer, paused = false, visible = true, changeId = 0;
  function schedule() {
    clearTimeout(timer);
    if (!paused && !reducedMotion.matches && visible && !document.hidden) timer = setTimeout(() => show(index + 1), 6000);
  }
  async function show(next) {
    clearTimeout(timer);
    const request = ++changeId;
    const target = (next + frames.length) % frames.length;
    const image = frames[target].querySelector('img');
    image.loading = 'eager';
    try { await image.decode(); } catch { schedule(); return; }
    if (request !== changeId) return;
    frames.forEach((frame, i) => {
      frame.classList.toggle('is-leaving', i === index && i !== target);
      frame.classList.toggle('is-active', i === target);
      frame.setAttribute('aria-hidden', String(i !== target));
    });
    index = target;
    schedule();
  }
  hero.querySelector('.portrait-prev').addEventListener('click', () => show(index - 1));
  hero.querySelector('.portrait-next').addEventListener('click', () => show(index + 1));
  pause.addEventListener('click', () => {
    paused = !paused;
    pause.textContent = paused ? '▶' : 'Ⅱ';
    pause.setAttribute('aria-pressed', String(paused));
    pause.setAttribute('aria-label', paused ? 'Portretten afspelen' : 'Portretten pauzeren');
    schedule();
  });
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    schedule();
  }, { threshold: .1 }).observe(hero);
  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener('change', schedule);
  schedule();
})();
