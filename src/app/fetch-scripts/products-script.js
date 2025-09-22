const toProductBtns = document.querySelectorAll('.to-product-btn');

const productContainer = document.querySelector('.product-container');

const categoryCards = document.querySelectorAll('.category-card');

const navigateToProdPage = () => {
	if (toProductBtns) {
		toProductBtns.forEach((btn) => {
			btn.addEventListener('click', () => {
				window.location.href = '/products';

				// we would have the different products dynamically render when the page loads
			});
		});

		window.addEventListener('DOMContentLoaded', async (e) => {
			const productsUrl = '/.netlify/functions/fetch-products';

			try {
				const response = await fetch(productsUrl);
				const data = await response.json();

				// console.log('API data:', data);

				// Assets array that contains all image files
				const assets = data.data.includes.Asset;

				const categoryId = data.data.items.flatMap((item) => {
					return item.metadata.tags.map((tag) => tag.sys.id);
				});

				console.log('FlatMapped Category Array:', categoryId);

				if (categoryCards) {
					categoryCards.forEach((card) => {
						card.addEventListener('click', async (e) => {
							// const id = card.getAttribute('data-tags-id');
							const id = card.dataset.tagsId;
							console.log('Card Category Id:', id);

							if (categoryId.includes(id)) {
								const matchedItems = data.data.items.filter((products) => {
									return products.metadata.tags.some(
										(tag) => tag.sys.id === id
									);
								});

								const productWithImages = matchedItems.map((item) => {
									const f = item.fields;
									const imageLinkId = f.productImage?.[0]?.sys?.id;

									// Find the matching asset to get the actual file URL
									const asset = assets.find((a) => a.sys.id === imageLinkId);
									const imageUrl = asset
										? `https:${asset.fields.file.url}`
										: null;

									return {
										id: item.sys.id,
										title: f.productTitle,
										description: f.productDescription,
										slug: f.slug,
										image: imageUrl, // ✅ Correct URL from includes.Asset
										raw: item, // Keep raw entry if needed
									};
								});

								console.log('product with images:', productWithImages);

								sessionStorage.setItem(
									'matchedProducts',
									JSON.stringify(productWithImages)
								);

								window.location.href = '/products/selected-products';
							} else {
								alert('No products available in this category');
								// console.log("They don't match!:", id);
							}
						});
					});
				}
			} catch (error) {
				console.log('Products not fetched successfully', error);
				// if (categoryCards) {
				// 	alert('Server Network Error. Page will reload now!');
				// }
			}
		});
	}
};

export { navigateToProdPage };
