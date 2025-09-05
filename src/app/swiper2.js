import Swiper from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

export const triggerSwiper = () => {
	const swiper = new Swiper('.showcase-swiper', {
		modules: [Navigation, Autoplay],
		loop: true,

		direction: 'horizontal',
		speed: 500,
		spaceBetween: 20,
		slidesPerView: 'auto',
		centeredSlides: true,

		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},

		breakpoints: {
			1000: {
				slidesPerView: 'auto',
				spaceBetween: 20,
				// centeredSlides: false,
			},
		},
	});
};
