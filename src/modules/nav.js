export function initNav() {
  const nav        = document.getElementById('nav');
  const burger     = document.getElementById('navBurger');
  const overlay    = document.getElementById('navOverlay');
  const overlayLinks = overlay?.querySelectorAll('.nav-overlay__link, .nav-overlay__cta');

  if (!nav) return;

  /* --- Scroll-based compact mode --- */
  let lastY = window.scrollY;

  const heroEl = document.getElementById('hero');
  if (heroEl) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        nav.classList.toggle('scrolled', !entry.isIntersecting);
      },
      { rootMargin: '-80px 0px 0px 0px', threshold: 0 }
    );
    observer.observe(heroEl);
  }

  /* --- Mobile burger --- */
  function openMenu() {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    burger.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  burger?.addEventListener('click', () => {
    const isOpen = overlay.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  /* Close on overlay link click */
  overlayLinks?.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  /* Close on Escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeMenu();
  });

  // Anchor smooth-scroll is handled by Lenis (lenis.js)
}
