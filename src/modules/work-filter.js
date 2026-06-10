export function initWorkFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.work-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      /* Update active tab */
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      /* Filter cards */
      cards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        if (match) {
          card.classList.remove('is-hidden');
          /* Small re-entrance animation */
          card.style.opacity = '0';
          card.style.transform = 'scale(0.97)';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            });
          });
        } else {
          card.classList.add('is-hidden');
          card.style.opacity = '';
          card.style.transform = '';
          card.style.transition = '';
        }
      });
    });
  });
}

export function initTestimonialsCarousel() {
  const track = document.getElementById('testimonialsTrack');
  const prev  = document.getElementById('testimonialsPrev');
  const next  = document.getElementById('testimonialsNext');

  if (!track || !prev || !next) return;

  function getCardWidth() {
    const card = track.querySelector('.testimonial-card');
    if (!card) return 0;
    const gap = parseInt(getComputedStyle(track).gap) || 24;
    return card.offsetWidth + gap;
  }

  prev.addEventListener('click', () => {
    track.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
  });
  next.addEventListener('click', () => {
    track.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
  });
}
