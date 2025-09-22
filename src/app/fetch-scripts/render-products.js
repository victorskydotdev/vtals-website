const productRenderWrap = document.querySelector('.render-container');

const fetchedProducts = JSON.parse(sessionStorage.getItem('matchedProducts'));

function getImageUrl(assetId) {
	const assets = JSON.parse(sessionStorage.getItem('contentfulAssets')) || [];
	const asset = assets.find((a) => a.sys.id === assetId);
	return asset ? `https:${asset.fields.file.url}` : '';
}

export const renderSelectedProdCategory = () => {
	// console.log('Fetched products in the product render page', fetchedProducts);

	if (productRenderWrap && Array.isArray(fetchedProducts)) {
		productRenderWrap.innerHTML = fetchedProducts
			.map((product, index) => {
				// console.log('PRODUCT:', product);
				const { title, image, description } = product;

				return `
          <div class="product-card" data-index="${index}">
            <div class='img-wrap'>
              <img src="${image}" alt="${title}" class="product-image" />
            </div>
            
            <h3 class="product-title">${title}</h3>
            

            <div class="btn-wrap">
              <button class="product-btn" data-index="${index}">
                <span class="text">Add to cart</span>
                <span class="icon">
                  <i class="fa-solid fa-cart-shopping"></i>
                </span>
              </button>
            </div>
          </div>
        `;
			})
			.join('');

		const buttons = document.querySelectorAll('.product-btn');
		console.log(buttons);

		if (buttons) {
			buttons.forEach((button) => {
				button.addEventListener('click', (e) => {
					const index = Number(e.currentTarget.dataset.index);
					const selectedProduct = fetchedProducts[index];

					console.log(selectedProduct);

					// Retrieve the current cart or create an empty array
					const cart = JSON.parse(sessionStorage.getItem('cart')) || [];

					// console.log('dataset.index:', e.currentTarget.dataset.index);
					// console.log('Fetched Products:', fetchedProducts);
					// console.log(
					// 	'Selected Product:',
					// 	fetchedProducts[Number(e.currentTarget.dataset.index)]
					// );

					// Optional: Check if product is already in cart
					const exists = cart.find((item) => item.id === selectedProduct.id);
					if (!exists) {
						cart.push({
							...selectedProduct,
							quantity: 1, // you can track quantity here
						});
					} else {
						// Increase quantity if already added
						exists.quantity += 1;
					}

					// Save back to sessionStorage
					sessionStorage.setItem('cart', JSON.stringify(cart));

					console.log('🛒 Cart Updated:', cart);
					alert(`${selectedProduct.title} added to cart!`);
				});
			});
		}
	}
};
