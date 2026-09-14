'use strict';
const CALENDLY_URL = 'https://calendly.com/nxgmedia/gratis-15-minuten-strategiegesprek';
const dialog = document.getElementById('booking-dialog');
let previousFocus;
document.querySelectorAll('.book-trigger').forEach(button => button.addEventListener('click', () => {
  previousFocus = button;
  if (CALENDLY_URL && !dialog.dataset.connected) {
    const url = new URL(CALENDLY_URL);
    if (url.protocol !== 'https:' || url.hostname !== 'calendly.com') throw new Error('Use a verified HTTPS Calendly URL.');
    const content = document.getElementById('booking-content');
    content.replaceChildren();
    const embedUrl = new URL(url.href);
    embedUrl.searchParams.set('embed_domain', window.location.hostname);
    embedUrl.searchParams.set('embed_type', 'Inline');
    embedUrl.searchParams.set('hide_event_type_details', '1');
    embedUrl.searchParams.set('hide_gdpr_banner', '1');
    const frame = document.createElement('iframe');
    const loadAgenda = () => { frame.src = embedUrl.href; };
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) { loadAgenda(); observer.disconnect(); }
      });
      observer.observe(frame);
    } else { loadAgenda(); }
    frame.title = 'Plan je gratis strategiegesprek van 15 minuten met NXG-media';
    frame.className = 'booking-frame';
    content.append(frame);
    const link = document.createElement('a');
    link.href = url.href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'text-link';
    link.textContent = 'Agenda niet zichtbaar? Open Calendly ↗';
    content.append(link);
    dialog.dataset.connected = 'true';
    dialog.classList.add('has-calendar');
  }
  dialog.showModal();
}));
document.querySelectorAll('.dialog-close,.dialog-dismiss').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => previousFocus?.focus());
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
