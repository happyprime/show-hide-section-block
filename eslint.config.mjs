import happyprimeConfig from '@happyprime/eslint-config';
import wordpressPlugin from '@wordpress/eslint-plugin';

export default [
	{
		// Playwright writes its bundled trace viewer into the HTML report;
		// linting it hangs ESLint.
		ignores: [
			'artifacts/**',
			'tests/e2e/playwright-report/**',
			'tests/e2e/test-results/**',
		],
	},
	...happyprimeConfig,
	// Only the i18n rules. The rest of the WordPress config overlaps the
	// happyprime one.
	...wordpressPlugin.configs.i18n,
	{
		rules: {
			'@wordpress/i18n-text-domain': [
				'error',
				{ allowedTextDomain: 'show-hide-section-block' },
			],
		},
	},
];
