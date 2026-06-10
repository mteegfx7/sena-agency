import Lenis from 'lenis';

export function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  // Integrate with GSAP ScrollTrigger if available
  function connectGSAP() {
    if (window.gsap && window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      // GSAP not yet loaded (defer), run RAF manually
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  // GSAP is loaded via defer — wait for it
  if (document.readyState === 'complete') {
    connectGSAP();
  } else {
    window.addEventListener('load', connectGSAP, { once: true });
  }

  // Make anchor smooth-scroll work through Lenis
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const nav = document.getElementById('nav');
      const offset = nav ? nav.offsetHeight + 16 : 80;
      lenis.scrollTo(target, { offset: -offset, duration: 1.4 });
    });
  });

  return lenis;
}
