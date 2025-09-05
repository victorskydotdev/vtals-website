const footer = document.querySelector('footer');

const footerTemplate = (cb) => {
	return ``;
};

export const renderFooter = () => {
	if (footer) {
		footer.innerHTML += footerTemplate();
	}
};
