const mailgun = require('mailgun-js');

exports.handler = async (event, context) => {
	console.log(event.body);

	try {
		const {
			customer_name,
			customer_phone,
			customer_email,
			addition_quote_message,
			quoteItems,
		} = JSON.parse(event.body);

		const vtalsEmail = 'vtalsmedia@gmail.com';

		const DOMAIN = process.env.MAILGUN_DOMAIN;

		const mg = mailgun({
			apiKey: process.env.MAILGUN_SECRET,
			domain: DOMAIN,
		});

		console.log(DOMAIN);

		console.log('DOMAIN:', process.env.MAILGUN_DOMAIN);
		console.log('SECRET:', process.env.MAILGUN_SECRET ? 'exists' : 'missing');

		const response = await mg.messages().send({
			from: `Vtals Quote form <postmaster@${DOMAIN}>`,

			to: vtalsEmail,

			subject: 'Customer Quote Request Details',

			html: `
				<h1>New Quote Request:</h1> <br />
		    <strong>Name of customer:</strong> ${customer_name},
		    <strong>Customer Phone:</strong> ${customer_phone},
		    <strong>Customer Email:</strong> ${customer_email},
		    <strong>Additional Quote Message:</strong> ${addition_quote_message},

				<br />

				<strong>Below is the customer selected Products for Quotation:</strong>

				${quoteItems}
		  `,
		});

		console.log('Mailgun response:', response);

		const autoRes = await mg.messages().send({
			from: `Vtals Integrated Business <postmaster@${DOMAIN}>`,
			to: customer_email,
			subject: 'Quote Form Response',

			html: `
				<h3 style="color: red">Thank you for shopping with us</h3>
				<br />

				<p>We have received your quote request. Our team would reach out to you soonest.</p>
				
				<br />
				<br />

				<p>From Vtals Sales Teams</p>
			`,
		});

		console.log('Auto-Res response:', autoRes);

		return {
			statusCode: 200,
			body: JSON.stringify({ message: 'success' }),
		};
	} catch (error) {
		console.log(error);

		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Email not sent', error }),
		};
	}
};
