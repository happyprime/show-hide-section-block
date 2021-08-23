module.exports = {
	plugins: {
		'postcss-import': {
			plugins: [
				require('stylelint'),
			  ],
		},
		'precss': {},
		'autoprefixer': {},
		'postcss-custom-media': {},
		'postcss-generate-asset-php': {},
	}
};
