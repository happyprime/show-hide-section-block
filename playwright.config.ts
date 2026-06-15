/**
 * Playwright configuration for e2e tests.
 *
 * @see https://playwright.dev/docs/test-configuration
 */
import { defineConfig, devices } from '@playwright/test';

// Pin the base URL to this plugin's dedicated wp-env port (see .wp-env.json)
// so the suite never reuses another project's WordPress on the shared 8888.
// This must be set on the environment, not just locally: @wordpress/e2e-test-
// utils-playwright reads process.env.WP_BASE_URL (default 8889) for requestUtils
// REST calls, so the browser and the REST client would otherwise target two
// different WordPress instances.
process.env.WP_BASE_URL = process.env.WP_BASE_URL || 'http://localhost:8891';
const baseURL = process.env.WP_BASE_URL;

export default defineConfig({
	testDir: './tests/e2e',
	outputDir: './tests/e2e/test-results',
	// Bring wp-env up before the suite and stop it afterwards — but only if we
	// started it. A manually started env is reused and left running.
	globalSetup: './tests/e2e/global-setup.ts',
	globalTeardown: './tests/e2e/global-teardown.ts',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: [['html', { outputFolder: './tests/e2e/playwright-report' }]],
	use: {
		baseURL,
		trace: 'retain-on-failure',
		screenshot: 'only-on-failure',
	},
	projects: [
		{
			name: 'setup',
			testDir: './tests/e2e/setup',
			testMatch: /.*\.setup\.ts/,
		},
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				// Use the stored auth state from the setup project.
				storageState: 'tests/e2e/.auth/admin.json',
			},
			dependencies: ['setup'],
			testDir: './tests/e2e/specs',
		},
	],
});
