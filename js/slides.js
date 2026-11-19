(() => {
  'use strict';
  const slides = [...document.querySelectorAll('.slide')];
  const chapters = [
    'O COMEÇO','O PROBLEMA','A TRANSFORMAÇÃO','NOSSAS SOLUÇÕES','IA NA PRÁTICA',
    'PESSOAS + IA','NOSSO MÉTODO','SUA REALIDADE','NOSSO DIFERENCIAL','O CONVITE'
  ];
  const $ = id => document.getElementById(id);
  const overview = $('overview');
  const help = $('help-dialog');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fromHash = () => {
    const found = location.hash.match(/^#slide-(\d+)$/);
    return found ? Math.max(0, Math.min(slides.length - 1, Number(found[1]) - 1)) : 0;
  };
  let current = fromHash();
  let previousFocus = null;

  function goTo(index) {
    if (!Number.isInteger(index) || index < 0 || index >= slides.length) return;
    current = index;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.hidden = !active;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      slide.scrollTop = 0;
    });
    $('chapter-label').textContent = chapters[current];
    $('slide-counter').textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    $('toolbar-progress-fill').style.width = `${(current + 1) / slides.length * 100}%`;
    $('slide-prev').disabled = current === 0;
    $('slide-next').disabled = current === slides.length - 1;
    document.querySelectorAll('.overview-tile').forEach((item, i) => item.classList.toggle('active', i === current));
    history.replaceState(null, '', `#slide-${current + 1}`);
    document.title = `Modernize — ${chapters[current]}`;
  }

  function openOverview() {
    previousFocus = document.activeElement;
    overview.hidden = false;
    document.querySelector('.overview-tile.active')?.focus();
  }
  function closeOverview() {
    overview.hidden = true;
    (previousFocus?.isConnected ? previousFocus : $('overview-open')).focus();
  }
  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    } else {
      document.documentElement.requestFullscreen?.().catch(() => {});
    }
  }

  slides.forEach((slide, i) => {
    const button = document.createElement('button');
    button.className = 'overview-tile';
    button.type = 'button';
    const number = document.createElement('small');
    number.textContent = `${String(i + 1).padStart(2, '0')} / 10`;
    const title = document.createElement('strong');
    title.textContent = chapters[i];
    button.append(number, title);
    button.addEventListener('click', () => { closeOverview(); goTo(i); });
    $('overview-grid').append(button);
  });

  $('slide-prev').addEventListener('click', () => goTo(current - 1));
  $('slide-next').addEventListener('click', () => goTo(current + 1));
  document.querySelectorAll('[data-next]').forEach(button => button.addEventListener('click', () => goTo(current + 1)));
  $('overview-open').addEventListener('click', openOverview);
  $('overview-close').addEventListener('click', closeOverview);
  overview.addEventListener('click', event => { if (event.target === overview) closeOverview(); });
  $('print-slides').addEventListener('click', () => window.print());
  $('fullscreen').addEventListener('click', toggleFullscreen);
  $('help-open').addEventListener('click', () => help.showModal());
  $('help-close').addEventListener('click', () => help.close());

  document.addEventListener('keydown', event => {
    const target = event.target;
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target?.tagName) || target?.isContentEditable) return;
    if (help.open) return;
    if (!overview.hidden) {
      if (event.key === 'Escape') { event.preventDefault(); closeOverview(); }
      return;
    }
    if (event.key === ' ' && target?.closest?.('button, a, summary, [role="button"]')) return;
    const key = event.key.toLowerCase();
    if (['arrowright', 'pagedown', ' '].includes(key)) { event.preventDefault(); goTo(current + 1); }
    else if (['arrowleft', 'pageup'].includes(key)) { event.preventDefault(); goTo(current - 1); }
    else if (key === 'home') { event.preventDefault(); goTo(0); }
    else if (key === 'end') { event.preventDefault(); goTo(slides.length - 1); }
    else if (key === 'escape') { event.preventDefault(); openOverview(); }
    else if (key === 'f') { event.preventDefault(); toggleFullscreen(); }
    else if (key === 'p') { event.preventDefault(); window.print(); }
  });

  window.addEventListener('hashchange', () => goTo(fromHash()));
  if (!reducedMotion) document.documentElement.classList.add('motion-allowed');
  goTo(current);
  window.ModernizeSlides = Object.freeze({ goTo, current: () => current, slideCount: slides.length });
})();
