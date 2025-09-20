import './scss/global/main.scss';

import { renderNavbar } from './app/navbar';
import { renderHeroSlider } from './app/hero-section-animation';
import { triggerPageTransition } from './app/page-transitions';
import { triggerSwiper } from './app/swiper2';

import { renderReviewVideo } from './app/fetch-scripts/testimonial-script';
import { navigateToProdPage } from './app/fetch-scripts/products-script';

import { renderSelectedProdCategory } from './app/fetch-scripts/render-products';

import { cartFunct } from './app/fetch-scripts/cart';

import { renderFooter } from './app/footer';

import { sendNewsletterEmail } from './app/fetch-scripts/send-newsletter';

// contact form function
import { submitForm } from './app/fetch-scripts/submit-form';

renderNavbar();
renderHeroSlider();
triggerPageTransition();

renderReviewVideo(); // review from Contentful, video rendering function call
navigateToProdPage();
renderSelectedProdCategory();

cartFunct();

triggerSwiper();

document.addEventListener('DOMContentLoaded', () => {
	renderFooter();
});

sendNewsletterEmail();
submitForm();
