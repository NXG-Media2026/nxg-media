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
