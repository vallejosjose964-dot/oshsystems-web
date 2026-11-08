/* Progressive enhancements only. Every report also works as an ordinary HTML link. */
(() => {
  'use strict';
  const menu = document.querySelector('.menu');
  const nav = document.getElementById('navlinks');
  function closeMenu(restoreFocus = false) {
    menu.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
    if (restoreFocus) menu.focus();
  }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      closeMenu(true);
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.mast')) closeMenu();
  });
  document.addEventListener('focusin', event => {
    if (!event.target.closest('.mast')) closeMenu();
  });
  window.matchMedia('(min-width: 1081px)').addEventListener('change', event => {
    if (event.matches) closeMenu();
  });

  function reveal(hash, moveFocus = false) {
    if (!hash || hash === '#') return;
    let id; try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target) return;
    const ancestors = [];
    for (let node = target; node && node !== document.body; node = node.parentElement) ancestors.unshift(node);
    for (const node of ancestors) {
      if (node.tagName === 'DETAILS') node.open = true;
      if (node.getAttribute('role') === 'tabpanel' && node.hidden) {
        const controllingTab = [...document.querySelectorAll('[role="tab"]')].find(tab => tab.getAttribute('aria-controls') === node.id);
        if (controllingTab) controllingTab.click();
      }
    }
    requestAnimationFrame(() => {
      target.scrollIntoView({block: 'start', behavior: 'instant'});
      if (moveFocus) {
        if (!target.matches('a,button,input,select,textarea,summary,[tabindex]')) target.setAttribute('tabindex', '-1');
        target.focus({preventScroll: true});
      }
    });
  }
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button > 0) return;
    const link = event.target.closest('a[href^="#"]');
    if (!link || link.hasAttribute('download')) return;
    const hash = link.getAttribute('href');
    let target; try { target = document.getElementById(decodeURIComponent(hash.slice(1))); } catch { return; }
    if (!target) return;
    event.preventDefault();
    if (location.hash !== hash) history.pushState(null, '', hash);
    reveal(hash, true);
  });
  window.addEventListener('hashchange', () => reveal(location.hash));
  window.addEventListener('popstate', () => reveal(location.hash));
  if (location.hash) reveal(location.hash);

  const search = document.getElementById('report-search');
  const category = document.getElementById('report-category');
  const reports = [...document.querySelectorAll('#report-list .doc')];
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const index = reports.map(element => ({element, text: normalize(element.textContent)}));
  function filterReports() {
    const words = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
    let count = 0;
    for (const item of index) {
      const show = (category.value === 'all' || item.element.dataset.category === category.value) && words.every(word => item.text.includes(word));
      item.element.hidden = !show;
      if (show) count++;
    }
    document.getElementById('report-count').textContent = count + ' of ' + reports.length + ' reports' + (count === 1 ? ' matches' : ' match');
    document.getElementById('report-empty').hidden = count !== 0;
  }
  search.addEventListener('input', filterReports);
  category.addEventListener('change', filterReports);
  document.querySelector('.library-reset').addEventListener('click', () => {
    search.value = ''; category.value = 'all'; filterReports(); search.focus();
  });
  document.querySelector('.library-tools').hidden = false;

  const progress = document.querySelector('.reading-progress');
  const backTop = document.querySelector('.back-top');
  const navigation = [...nav.querySelectorAll('a[href^="#"]')].map(link => ({link, section: document.querySelector(link.getAttribute('href'))}));
  let scheduled = false;
  function updatePosition() {
    scheduled = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0) + ')';
    backTop.classList.toggle('is-visible', window.scrollY > window.innerHeight);
    let current = null;
    for (const item of navigation) if (item.section && item.section.getBoundingClientRect().top <= 230) current = item.link;
    for (const {link} of navigation) {
      if (link === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }
  function schedulePosition() { if (!scheduled) { scheduled = true; requestAnimationFrame(updatePosition); } }
  window.addEventListener('scroll', schedulePosition, {passive: true});
  window.addEventListener('resize', schedulePosition);
  document.addEventListener('toggle', schedulePosition, true);
  updatePosition();
})();
