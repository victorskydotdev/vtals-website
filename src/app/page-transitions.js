const animationElems = document.querySelectorAll('.text-area-animation');

const imgAnimationElems = document.querySelectorAll('.animation-img');

const transitionClasses = [
	'fade-in',
	'slideIn-from-left',
	'slideIn-from-right',
];

const allElems = [...animationElems, ...imgAnimationElems];

const intersectionObserver = new IntersectionObserver((entries) => {
	entries.forEach((element, index) => {
		if (element.isIntersecting) {
			setTimeout(() => {
				const AllElems = [...animationElems, ...imgAnimationElems];

				const index = AllElems.indexOf(element.target);

				// Fallback to first class if index > available classes
				const className = transitionClasses[index % transitionClasses.length];

				element.target.classList.add(className);
				// console.log(element);

				// Stop observing once animated
				// intersectionObserver.unobserve(element.target);
			}, 200 * index);
		}
	});
});

const options = {
	root: null, // Use the viewport as root
	rootMargin: '0px 0px 800px 0px', // Start animation when element is 20% from bottom of viewport
	threshold: -1,
};

export const triggerPageTransition = () => {
	[...animationElems, ...imgAnimationElems].forEach((el) =>
		intersectionObserver.observe(el)
	);
};
