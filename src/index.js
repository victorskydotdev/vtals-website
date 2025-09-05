import './scss/global/main.scss';

import { renderNavbar } from './app/navbar';
import { renderHeroSlider } from './app/hero-section-animation';
import { triggerPageTransition } from './app/page-transitions';
import { triggerSwiper } from './app/swiper2';
import { renderFooter } from './app/footer';

renderNavbar();
renderHeroSlider();
triggerPageTransition();
triggerSwiper();
