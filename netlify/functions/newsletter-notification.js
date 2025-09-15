const mailgun = require('mailgun-js');

exports.handler = async (event) => {
	if (event.httpMethod !== 'POST') {
		return { statusCode: 405, body: 'Method Not Allowed' };
	}

	console.log(event.body);

	try {
		const { subscriberEmail } = JSON.parse(event.body);

		console.log(subscriberEmail);
		const DOMAIN = process.env.MAILGUN_DOMAIN;
		const toEmail = 'vtalsmedia@gmail.com';

		const mg = mailgun({ apiKey: process.env.MAILGUN_SECRET, domain: DOMAIN });

		const response = await mg.messages().send({
			from: `Form Submission <no-reply@${DOMAIN}>`,
			to: toEmail,
			subject: 'Newsletter Form Submission',
			text: `New subscriber: ${subscriberEmail}`,
		});

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
