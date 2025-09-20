const cartIconBtn = document.querySelector('.cart');
const cartItems = JSON.parse(sessionStorage.getItem('cart'));

const cartModal = document.querySelector('.cart-modal');
const cartContentWrap = document.querySelector('.cart-content');

const body = document.querySelector('.body');

export const cartFunct = (e) => {
	if (cartIconBtn) {
		cartIconBtn.addEventListener('click', () => {
			if (cartModal && cartItems && cartContentWrap) {
				cartContentWrap.innerHTML = cartItems
					.map((selectedProd) => {
						const { title, image } = selectedProd;

						return `
          <div class="cart-item-wrap">
            <div class="img-wrap">
              <img src="${image}" alt="${title}" />
            </div>

            <h4 class="title">${title}</h4>
          </div>
        `;
					})
					.join('');
			}

			cartModal.classList.add('show-cart-modal');
			body.style.overflow = 'hidden';
		});
	}
};
