import happyprimeConfig from '@happyprime/eslint-config';

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
];
