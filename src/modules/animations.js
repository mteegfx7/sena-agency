export function initAnimations() {
  /* ---- Hero headline character split ---- */
  const headline = document.getElementById('heroHeadline');
  if (headline) {
    // Split into segments: br tags, spaces, and words
    const raw = headline.innerHTML;
    const segments = raw.split(/(<br\s*\/?>)/gi);

    const result = segments.map(seg => {
      // Preserve explicit line breaks
      if (/^<br\s*\/?>$/i.test(seg)) return seg;

      // Wrap each word's characters; keep spaces as-is between words
      return seg.replace(/(\s+)|(\S+)/g, (match, space, word) => {
        if (space) return space;
        // Wrap the word in a no-break container, chars animate inside
        const chars = [...word].map(ch => `<span class="char">${ch}</span>`).join('');
        return `<span class="char-word">${chars}</span>`;
      });
    });

    headline.innerHTML = result.join('');

    const chars = headline.querySelectorAll('.char');
    if (window.gsap) {
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.022,
        delay: 0.2,
      });
    } else {
      chars.forEach(c => { c.style.opacity = '1'; c.style.transform = 'none'; });
    }
  }

  /* ---- GSAP ScrollTrigger reveals ---- */
  if (!window.gsap || !window.ScrollTrigger) {
    /* Fallback: IntersectionObserver plain reveal */
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('[data-reveal]').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });
  });

  /* ---- Count-up stats ---- */
  const stats = document.querySelectorAll('.stat__value[data-count]');
  stats.forEach((el) => {
    const target  = parseInt(el.dataset.count, 10);
    const prefix  = el.dataset.prefix || '';
    let started   = false;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => {
        if (started) return;
        started = true;
        const duration = 1400;
        const startTime = performance.now();

        function step(now) {
          const elapsed  = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased    = 1 - Math.pow(1 - progress, 3);
          el.textContent = prefix + Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = prefix + target;
        }
        requestAnimationFrame(step);
      },
    });
  });
}
