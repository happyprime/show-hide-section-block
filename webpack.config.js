const defaultConfig = require('@wordpress/scripts/config/webpack.config');
module.exports = {
	...defaultConfig,
	entry: {
		'show-hide-group': './blocks/show-hide-group',
		'show-hide-section': './blocks/show-hide-section',
		'front-end': './blocks/show-hide-group/front-end.js'
	},
};
