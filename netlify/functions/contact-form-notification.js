const mailgun = require('mailgun-js');

exports.handler = async (event) => {
	if (event.httpMethod !== 'POST') {
		return { statusCode: 405, body: 'Method Not Allowed' };
	}

	// console.log(event.body);

	try {
		const { firstname, surname, email, number, message } = JSON.parse(
			event.body
		);

		console.log(firstname, surname, email, number, message);

		const DOMAIN = process.env.MAILGUN_DOMAIN;
		const toEmail = 'vtalsmedia@gmail.com';

		const mg = mailgun({ apiKey: process.env.MAILGUN_SECRET, domain: DOMAIN });

		const response = await mg.messages().send({
			from: `Contact Form <no-reply@${DOMAIN}>`,
			to: toEmail,
			subject: 'Contact Form Submission',

			text: `Hello Admin, a customer has has made an inquiry and below are the details: 
      
      Name of customer: ${firstname} ${surname}.
      Customer Email: ${email}.
      Customer Phone Number: ${number}.
      Inquiry Message: ${message}`,
		});

		// const responseTwo = await mg.messages().send({
		// 	from: `Vtals Integrated Services <no-reply@${DOMAIN}>`,
		// 	to: email,
		// 	subject: 'Vtals Response',

		// 	text: `
		//     Hello ${firstname},

		//     Thank you for reaching out to us via our contact form.

		//     Someone from our team will get in touch with you soon.

		//     Kind Regards, Vtals Customer Team.
		//   `,
		// });

		return {
			statusCode: 200,
			body: JSON.stringify({ success: true, response }),
		};
	} catch (err) {
		console.error('Mailgun error:', err);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: err.message }),
		};
	}
};
