import brandLogo from '../media/vtals-brand-logo.png';

const navbar = document.querySelector('.navbar');

const navTemplate = (cb) => {
	return `
    <nav class="container">
				<div class="brand-wrap">
					<a href="/">
						<img src="${brandLogo}" class="logo" alt="vtals brand logo" />
					</a>
				</div>

				<ul class="nav-links mobile-nav">
					<div class="wrap">
						<li class="link-list">
							<a href="/" class="link">Home</a>
						</li>
						<li class="link-list">
							<a href="/about" class="link">About</a>
						</li>
						<li class="link-list">
							<a href="/contact" class="link">Contact</a>
						</li>
					</div>

					<div class="social-media-wrap">
						

						<a class="facebook" href="https://www.facebook.com/vtalsbuildingmaterials/" target="_blank">
							<i class="fa-brands fa-facebook-f"></i>
						</a>

						<a class="instagram" href="https://www.instagram.com/vtalsbuildingmaterials/" target="_blank">
							<i class="fa-brands fa-instagram"></i>
						</a>

						<a class="tiktok" href="http://www.tiktok.com/@vtalsbuildingmaterials" target="_blank">
							<i class="fa-brands fa-tiktok"></i>
						</a>

						
					</div>

					<div class="wrap">
						<div class="link-list">
							<a href="/products" class="link contact">Products</a>
						</div>
					</div>

					
				</ul>

				<div class="hamburger">
						<button class="menu-btn">
							<i class="fa-solid fa-bars"></i>
						</button>
						
						<button class="menu-close-btn">
							<i class="fa-solid fa-xmark"></i>
						</button>
					</div>
			</nav>
  `;
};

export const renderNavbar = () => {
	if (navbar) {
		navbar.innerHTML += navTemplate();

		// blocking off the product page from working until products have been uploaded with Contentful, afterward, the product page will be made open
		const toProductBtn = document.querySelector('.to-product-btn');

		document.addEventListener('scroll', () => {
			if (scrollY >= 100) {
				navbar.classList.add('update-nav-bg');
			} else navbar.classList.remove('update-nav-bg');
		});

		const menuBtn = document.querySelector('.menu-btn');

		const mobileNav = document.querySelector('.mobile-nav');

		if (menuBtn) {
			menuBtn.addEventListener('click', () => {
				mobileNav.classList.toggle('show-mobile-nav');
			});
		}
	}
};
