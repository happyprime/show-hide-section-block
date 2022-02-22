module.exports = {
	plugins: {
		'postcss-import': {
			plugins: [
				require('stylelint'),
			  ],
		},
		'precss': {},
		'autoprefixer': {},
		'postcss-generate-asset-php': {},
	}
};
