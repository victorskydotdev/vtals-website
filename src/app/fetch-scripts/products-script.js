const toProductBtns = document.querySelectorAll('.to-product-btn');

const navigateToProdPage = () => {
	if (toProductBtns) {
		toProductBtns.forEach((btn) => {
			btn.addEventListener('click', () => {
				// window.location.href = '/products';

				alert(
					'Products not rendered yet... Upload your products with Contentful'
				);

				// we would have the different products dynamically render when the page loads
			});
		});
	}
};

export { navigateToProdPage };
