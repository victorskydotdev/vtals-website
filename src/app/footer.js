import footerLogo from '../media/brand-logo.png';

const footer = document.querySelector('footer');

const footerTemplate = (cb) => {
	return `
		<div class="container">
				<div class="wrap">
					<div class="brand">
						<img src="${footerLogo}" alt="" class="img" />
					</div>
				</div>

				<div class="wrap">
					<div class="wrapper">
						<h4 class="heading">Quick links</h4>

						<ul class="footer-links">
							<li><a href="/" class="link">Home</a></li>
							<li><a href="/about" class="link">about</a></li>
							<!-- <li><a href="" class="link to-product-btn">Our products</a></li> -->
							<li><a href="/contact" class="link">Contact</a></li>
						</ul>
					</div>
				</div>

				<div class="wrap">
					<div class="wrapper">
						<h4 class="heading">
							Subscribe to our newsletter and be the first to get product
							updates and discounts
						</h4>

						<form action="" class="newsletter-form">
							<input
								type="email" name="subscriberEmail"
								placeholder="johndoe@gmail.com"
								class="form-input" />

							<div class="btn-wrap">
								<button type="submit" class="submit-btn">
									<span class="text">Submit</span>
									<!-- <span class="icon">
										<i class="fa-solid fa-arrow-right"></i>
									</span> -->
								</button>
							</div>
						</form>
					</div>

					<div class="social-media-wrap">
						<a href="#">Facebook</a>
						<a href="#">Instagram</a>
						<a href="#">X</a>
					</div>
				</div>
			</div>
	`;
};

export const renderFooter = () => {
	if (footer) {
		footer.innerHTML += footerTemplate();

		// blocking off the product page from working until products have been uploaded with Contentful, afterward, the product page will be made open
		const toProductBtn = document.querySelector('.to-product-btn');

		if (toProductBtn) {
			toProductBtn.addEventListener('click', (e) => {
				e.preventDefault();
			});
		}

		// if (toProductBtn) {
		// 	toProductBtn.addEventListener('click', (e) => {
		// 		e.preventDefault();

		// 		alert(
		// 			'Products not rendered yet... Upload your products with Contentful'
		// 		);
		// 	});
		// } else console.log('element not detected');
	}
};
