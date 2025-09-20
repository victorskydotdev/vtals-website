const contactForm = document.querySelector('.contact-form');

const submitForm = () => {
	if (contactForm) {
		contactForm.addEventListener('submit', async (e) => {
			e.preventDefault();

			const formData = new FormData(e.target);
			const jsonData = {};

			for (const [key, value] of formData.entries()) {
				jsonData[key] = value;
			}

			const url = '/.netlify/functions/contact-form-notification';

			try {
				const response = await fetch(url, {
					method: 'POST',
					headers: {
						'Content-type': 'application/json',
					},

					body: JSON.stringify(jsonData),
				});

				e.target.reset();

				if (!response.ok) {
					console.log('form data not sent successfully');
				} else {
					alert(
						`Your form has been submitted successfully, click Ok to get redirected to the home page`
					);

					window.location.href = '/';
				}
			} catch (error) {
				console.log('Form not submitted:', error.message);
			}
		});
	}
};

export { submitForm };
