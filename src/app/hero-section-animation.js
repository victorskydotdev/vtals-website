import Swiper from 'swiper';

import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/autoplay';

// dom elements
const heroBgWrap = document.querySelector('.carousel');

// heading elements
const headingOne = document.querySelector('.text1');
const headingTwo = document.querySelector('.text2');
const paragraph = document.querySelector('.main-subheading');

const texts = [headingOne, headingTwo, paragraph];
const textClasses = ['showTextOne', 'showTextTwo', 'showTextThree'];

// slider
export const renderHeroSlider = () => {
	const swiper = new Swiper(heroBgWrap, {
		modules: [Navigation, Autoplay],

		loop: true,
		speed: 1500,
		direction: 'horizontal',
		slidesPerView: 1,

		autoplay: {
			delay: 1000,
			disableOnInteraction: false,
		},

		navigation: {
			prevEl: '.swiper-button-prev',
			nextEl: '.swiper-button-next',
		},
	});
};

const textSlideIns = () => {
	window.addEventListener('DOMContentLoaded', () => {
		texts.forEach((text, index) => {
			setTimeout(() => {
				if (text) {
					text.classList.add(textClasses[index]);
				}
			}, 400 * index);
		});
	});
};

textSlideIns();
