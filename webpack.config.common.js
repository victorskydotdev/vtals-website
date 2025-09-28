const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'none',

	entry: './src/index.js',
	output: {
		filename: '[name.[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			inject: 'body',
		}),

		new HtmlWebpackPlugin({
			template: './src/html/about.html',
			filename: './about/index.html',
			inject: 'body',
		}),

		new HtmlWebpackPlugin({
			template: './src/html/products.html',
			filename: './products/index.html',
			inject: 'body',
		}),

		new HtmlWebpackPlugin({
			template: './src/html/contact.html',
			filename: './contact/index.html',
			inject: 'body',
		}),

		new HtmlWebpackPlugin({
			template: './src/html/selected-products.html',
			filename: './products/selected-products.html',
			inject: 'body',
		}),

		// cart page
		new HtmlWebpackPlugin({
			template: './src/html/cart.html',
			filename: './cart/index.html',
			inject: 'body',
		}),
	],

	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},

			// as of Webpack v5, we use asset/resource to copy the image to the dist folder. No need to install any extra loaders.
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'images/[name]-[hash][ext]',
				},
			},

			{
				test: /\.html$/,
				use: ['html-loader'], // process the HTML files
			},
		],
	},
};
