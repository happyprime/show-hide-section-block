/**
 * Authentication setup for E2E tests.
 *
 * This setup project runs before all other tests to:
 * 1. Handle any WordPress database upgrade screens
 * 2. Log in as admin
 * 3. Save the authenticated state for reuse by other tests
 *
 * @see https://playwright.dev/docs/auth
 */
import { test as setup, expect } from '@wordpress/e2e-test-utils-playwright';

const authFile = 'tests/e2e/.auth/admin.json';

setup('authenticate as admin', async ({ page, baseURL }) => {
	// Navigate to wp-admin which will redirect to login or upgrade screen.
	await page.goto(`${baseURL}/wp-admin/`);

	// Handle database upgrade screen if present.
	const upgradeButton = page.locator('input[name="upgrade"], a.button:has-text("Update WordPress Database")');
	if ((await upgradeButton.count()) > 0) {
		await upgradeButton.click();

		// Wait for upgrade to complete and click continue if needed.
		const continueLink = page.locator('a:has-text("Continue")');
		await continueLink.waitFor({ timeout: 30000 });
		await continueLink.click();
	}

	// Handle "No Update Required" screen if present.
	const noUpdateContinue = page.locator('a:has-text("Continue")');
	if ((await noUpdateContinue.count()) > 0 && (await page.locator('text=No Update Required').count()) > 0) {
		await noUpdateContinue.click();
	}

	// Now we should be at the login page or already logged in.
	const loginForm = page.locator('#loginform');
	if ((await loginForm.count()) > 0) {
		// Fill in login credentials (wp-env defaults).
		await page.locator('#user_login').fill('admin');
		await page.locator('#user_pass').fill('password');
		await page.locator('#wp-submit').click();

		// Wait for dashboard to load.
		await page.waitForURL('**/wp-admin/**');
	}

	// Dismiss any welcome modals or notices.
	const welcomeModal = page.locator('.components-modal__header button[aria-label="Close"]');
	if ((await welcomeModal.count()) > 0) {
		await welcomeModal.click();
	}

	// Verify we're logged in by checking for the admin bar.
	await expect(page.locator('#wpadminbar')).toBeVisible();

	// Save the authenticated state.
	await page.context().storageState({ path: authFile });
});
