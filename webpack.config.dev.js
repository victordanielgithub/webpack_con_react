const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	mode: 'development',
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	module: {
		rules: [
			// Aca conectaremos babel con webpack
			{
				test: /\.(js|jsx)$/, // utiliza cualquier instruccion que termine con mjs, js o jsx
				exclude: /node_modules/, // excluir todo lo que esta dentro de la carpeta node_modules/
				use: {
					loader: 'babel-loader',
				},
			},
			// Aca conectaremos HTML con webpack
			{
				test: /\.html$/, // utiliza cualquier instruccion que termine con html
				use: [{ loader: 'html-loader' }],
			},
			// Aca conectaremos CSS con webpack
			{
				test: /\.s[ac]ss$/,
				use: [
					//MiniCssExtractPlugin.loader,
					'style-loader',
					'css-loader',
					'sass-loader',
				],
			},
		],
	},
	plugins: [
		// con este plugin webpack crea un html donde injectara el javascript compilado.
		new HtmlWebpackPlugin({
			template: './public/index.html', // de donde va a leer webpack el html de entrada.
			filename: './index.html', // webpack compilara un nuevo html en la carpeta ./dist
		}),
		// con este plugin webpack usara CSS
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 3006,
	},
};
