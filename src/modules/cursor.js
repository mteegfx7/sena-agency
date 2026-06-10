export function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot  = document.querySelector('.cursor__dot');
  const ring = document.querySelector('.cursor__ring');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;
  let rafId  = null;
  const LERP = 0.12;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function tick() {
    ringX += (mouseX - ringX) * LERP;
    ringY += (mouseY - ringY) * LERP;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    rafId = requestAnimationFrame(tick);
  }
  rafId = requestAnimationFrame(tick);

  const hoverTargets = 'a, button, [role="tab"], .work-card, .service-card';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      ring.classList.add('is-hovering');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      ring.classList.remove('is-hovering');
    }
  });

  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });

  return () => cancelAnimationFrame(rafId);
}
