require('dotenv').config();

const accessToken = process.env.CONTENTFUL_API;
const spaceId = process.env.SPACE_ID;
const contentfulEnvironment = process.env.CONTENTFUL_ENVIRONMENT;

// console.log('Access Token:', accessToken);

exports.handler = async (event, context) => {
	const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${contentfulEnvironment}/entries?access_token=${accessToken}&content_type=testimonialContent&include=1`;

	try {
		const response = await fetch(url);
		const data = await response.json();

		return {
			statusCode: 200,
			body: JSON.stringify({ data }),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: 'Error fetching testimonial',
				error: error.message,
			}),
		};
	}
};
