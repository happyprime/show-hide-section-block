const path = require('path');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	entry: {
		'show-hide-details/index': path.resolve(
			__dirname,
			'src/show-hide-details',
			'index.js'
		),
		'show-hide-group/index': path.resolve(
			__dirname,
			'src/show-hide-group',
			'index.js'
		),
		'show-hide-group/view': path.resolve(
			__dirname,
			'src/show-hide-group',
			'view.js'
		),
		'show-hide-section/index': path.resolve(
			__dirname,
			'src/show-hide-section',
			'index.js'
		),
		'show-hide-summary/index': path.resolve(
			__dirname,
			'src/show-hide-summary',
			'index.js'
		),
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js',
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: false,
			}),
		],
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
						plugins: ['@babel/plugin-transform-runtime'],
					},
				},
			},
		],
	},
	plugins: [
		new DependencyExtractionWebpackPlugin(),
		new CopyPlugin({
			patterns: [
				{
					from: 'src/**/block.json',
					to({ context, absoluteFilename }) {
						const srcDir = path.resolve(context, 'src');
						const relativeToSrc = path.relative(
							srcDir,
							absoluteFilename
						);
						const dir = path.dirname(relativeToSrc);
						return path.resolve(
							context,
							'build',
							dir,
							'[name][ext]'
						);
					},
				},
			],
		}),
	],

	// External dependencies that should not be bundled.
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
};
