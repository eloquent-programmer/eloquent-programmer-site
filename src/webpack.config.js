const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
	entry: [
		path.resolve('js', 'app.js'),
		path.resolve('styles', 'main.scss')
	],

	module: {
		rules: [
			{
        test: /\.s[ac]ss$/i,
        use: [
					MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
					'css-loader',
					// Add vendor prefix
					'postcss-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ],
			},
			{
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader?name=/images/[name].[ext]'
        ],
      }
		]
	},

	output: {
		path: path.resolve('../static'),
		filename: 'js/[name].[chunkhash].js'
	},

	plugins: [
		new AssetsPlugin({
			includeAllFileTypes: false,
			path: path.resolve('../data'),
			filename: 'webpack_assets.json',
			prettyPrint: true
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash].css',
			chunkFilename: '[id].css'
		})
	]
};
