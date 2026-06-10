import './styles/tokens.css';
import './styles/reset.css';
import './styles/global.css';
import './styles/components/cursor.css';
import './styles/components/nav.css';
import './styles/components/hero.css';
import './styles/components/services.css';
import './styles/components/work.css';
import './styles/components/about.css';
import './styles/components/process.css';
import './styles/components/testimonials.css';
import './styles/components/cta.css';
import './styles/components/footer.css';

import { initLenis }    from './modules/lenis.js';
import { initCursor }    from './modules/cursor.js';
import { initNav }       from './modules/nav.js';
import { initAnimations } from './modules/animations.js';
import { initWorkFilter, initTestimonialsCarousel } from './modules/work-filter.js';

function init() {
  initLenis();
  initCursor();
  initNav();
  initAnimations();
  initWorkFilter();
  initTestimonialsCarousel();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
