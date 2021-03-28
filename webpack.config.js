const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	mode: 'production',
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'@components': path.resolve(__dirname, 'src/components/'),
			'@styles': path.resolve(__dirname, 'src/styles/'),
		},
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
		// para limpiar codigo repetido
		new CleanWebpackPlugin(),
	],
	optimization: {
		minimize: true,
		minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
	},
};
