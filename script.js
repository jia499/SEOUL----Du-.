const navButtons = [...document.querySelectorAll('[data-page]')];
const pages = [...document.querySelectorAll('.page')];
const nav = document.querySelector('.main-nav');
const toggle = document.querySelector('.menu-toggle');

function showPage(id) {
  const target = document.getElementById(id);
  if (!target || !target.classList.contains('page')) return;
  pages.forEach(page => page.classList.toggle('active', page.id === id));
  document.querySelectorAll('.nav-link').forEach(button => {
    button.classList.toggle('active', button.dataset.page === id);
  });
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', `#${id}`);
}

navButtons.forEach(button => button.addEventListener('click', () => showPage(button.dataset.page)));
document.querySelectorAll('[data-page-link]').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  if (link.dataset.pageLink === 'contact') {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  } else {
    showPage(link.dataset.pageLink);
  }
}));
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

const floorTabs = [...document.querySelectorAll('.floor-tab')];
floorTabs.forEach(tab => tab.addEventListener('click', () => {
  floorTabs.forEach(item => item.classList.toggle('active', item === tab));
  document.querySelectorAll('.floor-content').forEach(panel => {
    panel.classList.toggle('active', panel.id === `floor-${tab.dataset.floor}`);
  });
}));

// Support direct links such as index.html#payment.
const initial = location.hash.slice(1);
if (initial && document.getElementById(initial)?.classList.contains('page')) showPage(initial);
