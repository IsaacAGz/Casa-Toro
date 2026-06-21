function setupMenu() {
  const menu = document.querySelector('.menu');

  // Safely remove any existing clone listeners to prevent accidental double-binding
  menu?.removeEventListener('click', handleMenuToggle);
  menu?.addEventListener('click', handleMenuToggle);
}

function handleMenuToggle() {
  const menu = document.querySelector('.menu');
  if (!menu) return;
  const isExpanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', `${!isExpanded}`);
}

// 1. Initial configuration set up for the very first page load
setupMenu();

// 2. Re-run configuration logic every single time Astro completes a fluid page swap animation
document.addEventListener('astro:page-load', setupMenu);