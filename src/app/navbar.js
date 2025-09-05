const navbar = document.querySelector('.navbar');

const navTemplate = (cb) => {
	return `
    <nav class="container">
				<div class="brand-wrap">
					<a href="/">
						<h2 class="logo">V-TALS</h2>
					</a>
				</div>

				<ul class="nav-links">
					<div class="wrap">
						<li class="link-list">
							<a href="#" class="link">Home</a>
						</li>
						<li class="link-list">
							<a href="#" class="link">About</a>
						</li>
						<li class="link-list">
							<a href="#" class="link">Products</a>
						</li>
					</div>

					<div class="social-media-wrap">
						<a href="" class="facebook">
							<i class="fa-brands fa-facebook-f"></i>
						</a>

						<a href="" class="instagram">
							<i class="fa-brands fa-instagram"></i>
						</a>

						<a href="" class="x-twitter">
							<i class="fa-brands fa-x-twitter"></i>
						</a>
					</div>

					<div class="wrap">
						<div class="link-list">
							<a href="#" class="link contact">Contact</a>
						</div>
					</div>

					
				</ul>

				<div class="hamburger">
						<button class="menu-btn">
							<i class="fa-solid fa-bars"></i>
						</button>
					</div>
			</nav>
  `;
};

export const renderNavbar = () => {
	if (navbar) {
		navbar.innerHTML += navTemplate();

		document.addEventListener('scroll', () => {
			if (scrollY >= 500) {
				navbar.classList.add('update-nav-bg');
			} else navbar.classList.remove('update-nav-bg');
		});
	}
};
