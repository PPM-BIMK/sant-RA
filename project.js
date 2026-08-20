// footer stamp
const now = new Date();
const pad = n => String(n).padStart(2, '0');
const clockEl = document.getElementById('clock');
if (clockEl) {
  clockEl.textContent = `SIST OPPDATERT ${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear()}`;
}

// dropdown menus (nav can hold more than one, e.g. project switcher + tab menu)
const navMenus = document.querySelectorAll('.nav-menu');

function closeAllMenus(except) {
  navMenus.forEach(menu => {
    if (menu === except) return;
    menu.classList.remove('open');
    menu.querySelector('.nav-menu-toggle')?.setAttribute('aria-expanded', 'false');
  });
}

navMenus.forEach(menu => {
  const toggle = menu.querySelector('.nav-menu-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const open = !menu.classList.contains('open');
    closeAllMenus(open ? menu : null);
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
});

document.addEventListener('click', (e) => {
  const insideAnyMenu = Array.from(navMenus).some(menu => menu.contains(e.target));
  if (!insideAnyMenu) closeAllMenus();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllMenus();
});

// tab switching, hash-driven so links/back-button work
const tabs = document.querySelectorAll('.tab-section');
const tabLinks = document.querySelectorAll('.nav-dropdown a[data-tab]');

function showTab(id) {
  let matched = false;
  tabs.forEach(section => {
    const isMatch = section.id === id;
    section.classList.toggle('active', isMatch);
    if (isMatch) matched = true;
  });
  if (!matched && tabs.length) {
    tabs[0].classList.add('active');
  }
  tabLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.tab === id);
  });
}

function currentTabId() {
  return (window.location.hash || '#oversikt').slice(1);
}

showTab(currentTabId());

tabLinks.forEach(link => {
  link.addEventListener('click', () => closeAllMenus());
});

window.addEventListener('hashchange', () => showTab(currentTabId()));
