// cart icon button
const cartIconBtn = document.querySelector('.cart-btn');

export const cartFunct = (e) => {
	if (!cartIconBtn) {
		return;
	} else {
		cartIconBtn.addEventListener('click', () => {
			// dynamically fetching the cart items
			const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];

			if (cartItems.length === 0) {
				alert('Cart is empty');

				return;
			} else {
				window.location.href = '/cart';
			}
		});
	}
};

const renderCartItems = () => {
	const cartContentWrap = document.querySelector('.cart-content');

	if (cartContentWrap) {
		console.log('CartContent Element:', cartContentWrap);

		const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];

		cartContentWrap.innerHTML = cartItems
			.map((selectedProd) => {
				const { title, image } = selectedProd;
				return `
						<div class="cart-item-wrap">
							<div class="product-content">
								<div class="img-wrap">
									<img src="${image}" alt="${title}" />
								</div>

								<h4 class="title">${title}</h4>
							</div>

							<div class="prod-function">
								<i class="fa-solid fa-trash"></i>
							</div>
						</div>
					`;
			})
			.join('');

		const getQuoteBtn = document.querySelector('.get-quote-btn');
		const quoteFormModal = document.querySelector('.quote-form-modal');

		const btnLoader = document.querySelector('.quote-btn-loader');

		if (getQuoteBtn) {
			getQuoteBtn.addEventListener('click', () => {
				quoteFormModal.classList.add('show-form');

				const quoteFormCloseBtn = document.querySelector('.form-close-btn');

				// fetch selected cart products to submit them as part of the quote request payload
				const exitingCartItems = JSON.parse(sessionStorage.getItem('cart'));

				console.log(exitingCartItems);

				const items = exitingCartItems.map(({ title }) => title);

				// console.log(items);

				const quoteForm = document.querySelector('.quote-form');

				quoteForm.addEventListener('submit', async (e) => {
					e.preventDefault();

					btnLoader.style.display = 'inline-block';

					const formData = new FormData(e.target);
					const jsonData = {};

					formData.append('quoteItems', items);

					for (const [key, value] of formData.entries()) {
						jsonData[key] = value;
					}

					const url = '/.netlify/functions/send-quote-data';

					try {
						const response = await fetch(url, {
							method: 'POST',
							headers: {
								'Content-type': 'application/json',
							},

							body: JSON.stringify(jsonData),
						});

						setTimeout(() => {
							if (!response.ok) {
								console.log('form not submitted successfully');
							} else {
								console.log(response);

								alert(
									"Your Quote has been submitted successfully. You'll be redirected to homepage"
								);

								window.location.href = '/';
							}
						}, 500);
					} catch (error) {
						console.log(error);

						alert('Your form quote did not go through. Please try again!');
					}
				});

				if (quoteFormCloseBtn) {
					quoteFormCloseBtn.addEventListener('click', () => {
						quoteFormModal.classList.remove('show-form');

						// alert('Button exists');
					});
				} else console.log('Not seeing it');
			});
		}
	}
};

renderCartItems();
