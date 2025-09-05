exports.handler = (event, context) => {
	return {
		statusCode: 200,
		body: JSON.stringify({
			message: 'Email notification function is working!',
		}),
	};
};
