const footer = document.querySelector('.footer');

const newsletterModal = document.querySelector('.newsletter-modal');

const sendNewsletterEmail = () => {
	const mutationObserver = new MutationObserver((entries) => {
		entries.forEach((entry) => {
			const newsletterForm = document.querySelector('.newsletter-form');

			// console.log(entry);
			if (newsletterForm) {
				newsletterForm.addEventListener('submit', async (e) => {
					e.preventDefault();

					const formData = new FormData(e.target);
					const jsonData = {};

					console.log('formData:', formData);

					for (const [key, value] of formData.entries()) {
						jsonData[key] = value;
					}

					// const data = JSON.stringify(jsonData);

					// console.log(data);

					const endPoint = `/.netlify/functions/newsletter-notification`;

					try {
						const res = await fetch(endPoint, {
							method: 'POST',
							headers: {
								'Content-type': 'application/json',
							},

							body: JSON.stringify(jsonData),
						});

						if (!res.ok) {
							console.log('Form not submitted');
						} else {
							if (newsletterModal) {
								newsletterModal.classList.add('newsletter-success');

								const newsCloseBtn = document.querySelector(
									'.newsletter-close-btn'
								);

								if (newsCloseBtn) {
									newsCloseBtn.addEventListener('click', () => {
										newsletterModal.classList.remove('newsletter-success');
									});
								}

								// logic to clear the email address from the input field goes below
							}
						}
					} catch (error) {
						console.log('Error submitting form:', error);
					}
				});

				// Mark listener as added to prevent duplicates
				// newsletterForm.dataset.listenerAdded = 'true';
			} else {
				console.log('Form not seen in the DOM');
				// alert('Form not submitted');
			}
		});
	});

	if (footer) {
		mutationObserver.observe(footer, {
			subtree: true,
			childList: true,
			attributes: true,
		});
	}
};
// mutationObserver.disconnect();

export { sendNewsletterEmail };
