// footer stamp
const now = new Date();
const pad = n => String(n).padStart(2, '0');
const clockEl = document.getElementById('clock');
if (clockEl) {
  clockEl.textContent = `SIST OPPDATERT ${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear()}`;
}

// dropdown menu
const navMenu = document.querySelector('.nav-menu');
const navToggle = document.querySelector('.nav-menu-toggle');

if (navMenu && navToggle) {
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target)) {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

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
  link.addEventListener('click', () => {
    navMenu?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('hashchange', () => showTab(currentTabId()));
