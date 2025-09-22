require('dotenv').config();

const accessToken = process.env.CONTENTFUL_API;
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const contentfulEnvironment = process.env.CONTENTFUL_ENVIRONMENT;

// console.log('Access Token:', accessToken);

exports.handler = async (event, context) => {
	const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${contentfulEnvironment}/entries?access_token=${accessToken}&content_type=productContent&include=1`;

	// console.log(event);

	try {
		const res = await fetch(url);
		const data = await res.json();

		console.log('Product Data from Contentful:', data);

		return {
			statusCode: 200,
			body: JSON.stringify({ data }),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: 'Error fetching products',
				error: error.message,
			}),
		};
	}
};
