function setupMenu() {
  const menu = document.querySelector('.menu');
  const drawer = document.getElementById('main-menu');
  const backdrop = document.querySelector('[data-nav-backdrop]');
  const closeBtn = document.querySelector('[data-nav-close]');

  if (!menu || !drawer) return;

  menu.removeEventListener('click', handleMenuToggle);
  menu.addEventListener('click', handleMenuToggle);

  closeBtn?.removeEventListener('click', closeMenu);
  closeBtn?.addEventListener('click', closeMenu);

  backdrop?.removeEventListener('click', closeMenu);
  backdrop?.addEventListener('click', closeMenu);

  document.removeEventListener('keydown', handleEscape);
  document.addEventListener('keydown', handleEscape);

  // Close drawer after in-drawer navigation (View Transitions may remount)
  drawer.querySelectorAll('a').forEach((link) => {
    link.removeEventListener('click', closeMenu);
    link.addEventListener('click', closeMenu);
  });
}

function openMenu() {
  const menu = document.querySelector('.menu');
  const drawer = document.getElementById('main-menu');
  const backdrop = document.querySelector('[data-nav-backdrop]');
  if (!menu || !drawer) return;

  menu.setAttribute('aria-expanded', 'true');
  menu.setAttribute('aria-label', 'Close menu');
  drawer.setAttribute('aria-hidden', 'false');
  drawer.classList.add('is-open');
  backdrop?.removeAttribute('hidden');
  backdrop?.classList.add('is-visible');
  document.documentElement.classList.add('nav-open');
}

function closeMenu() {
  const menu = document.querySelector('.menu');
  const drawer = document.getElementById('main-menu');
  const backdrop = document.querySelector('[data-nav-backdrop]');
  if (!menu || !drawer) return;

  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open menu');
  drawer.setAttribute('aria-hidden', 'true');
  drawer.classList.remove('is-open');
  backdrop?.classList.remove('is-visible');
  backdrop?.setAttribute('hidden', '');
  document.documentElement.classList.remove('nav-open');
}

function handleMenuToggle(event) {
  event.preventDefault();
  const menu = document.querySelector('.menu');
  const isExpanded = menu?.getAttribute('aria-expanded') === 'true';
  if (isExpanded) closeMenu();
  else openMenu();
}

function handleEscape(event) {
  if (event.key === 'Escape') closeMenu();
}

setupMenu();
document.addEventListener('astro:page-load', setupMenu);
document.addEventListener('astro:before-swap', closeMenu);
