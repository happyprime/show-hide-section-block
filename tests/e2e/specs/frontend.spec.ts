/**
 * Front-end tests for the Show / Hide Section blocks.
 *
 * Publishes posts with fully-authored block trees, then asserts the rendered
 * output is the accessible native details/summary interface and that the
 * show/hide interactions behave as expected — both the native per-section
 * toggle and the group's optional "toggle all" control (which exercises the
 * front-end view script and its conditional enqueue).
 *
 * @package show-hide-section-block
 */
import { test, expect } from '@wordpress/e2e-test-utils-playwright';
import type { Admin, Editor } from '@wordpress/e2e-test-utils-playwright';
import type { Page } from '@playwright/test';

const SUMMARY_TEXT = 'Toggle this section heading';
const DETAILS_TEXT = 'This content is hidden until the section is opened.';
const SECTION = 'details.wp-block-happyprime-show-hide-section';

/**
 * Build one section's block tree with a summary and a paragraph of details.
 *
 * Authoring via insertBlock (rather than typing into template-locked inner
 * blocks) keeps content deterministic across WordPress versions.
 */
const section = ( summary: string, details: string ) => ( {
	name: 'happyprime/show-hide-section',
	innerBlocks: [
		{
			name: 'happyprime/show-hide-summary',
			attributes: { summary },
		},
		{
			name: 'happyprime/show-hide-details',
			innerBlocks: [
				{ name: 'core/paragraph', attributes: { content: details } },
			],
		},
	],
} );

/**
 * Publish the given group block and return its front-end permalink.
 */
async function publish(
	admin: Admin,
	editor: Editor,
	page: Page,
	block: object
): Promise< string > {
	await admin.createNewPost();
	await editor.insertBlock( block );
	await editor.publishPost();

	// The publish panel surfaces several "View Post" links (button, snackbar,
	// header), all pointing at the same permalink — take the first.
	const viewLink = page.getByRole( 'link', { name: 'View Post' } ).first();
	await expect( viewLink ).toBeVisible();

	return ( await viewLink.getAttribute( 'href' ) ) as string;
}

test.describe( 'Show / Hide Section block — front end', () => {
	test( 'renders a details/summary interface that toggles open', async ( {
		admin,
		editor,
		page,
	} ) => {
		const url = await publish( admin, editor, page, {
			name: 'happyprime/show-hide-group',
			innerBlocks: [ section( SUMMARY_TEXT, DETAILS_TEXT ) ],
		} );
		await page.goto( url );

		const details = page.locator( SECTION );
		await expect( details ).toBeVisible();

		// The summary is always visible; a closed native <details> hides its
		// non-summary children, so the details content is not.
		const summary = details.locator( 'summary' ).first();
		await expect( summary ).toBeVisible();
		await expect( summary ).toContainText( SUMMARY_TEXT );
		expect( await details.getAttribute( 'open' ) ).toBeNull();
		await expect( page.getByText( DETAILS_TEXT ) ).toBeHidden();

		// Activating the summary expands the section and reveals the content.
		await summary.click();

		expect( await details.getAttribute( 'open' ) ).not.toBeNull();
		await expect( page.getByText( DETAILS_TEXT ) ).toBeVisible();
	} );

	test( 'the group toggle-all control opens and closes every section', async ( {
		admin,
		editor,
		page,
	} ) => {
		const url = await publish( admin, editor, page, {
			name: 'happyprime/show-hide-group',
			attributes: { hasToggle: true },
			innerBlocks: [
				section( 'First section', 'First hidden body.' ),
				section( 'Second section', 'Second hidden body.' ),
			],
		} );
		await page.goto( url );

		const sections = page.locator( SECTION );
		await expect( sections ).toHaveCount( 2 );

		const toggleAll = page.locator(
			'.wp-block-happyprime-show-hide-group .toggle-all'
		);
		await expect( toggleAll ).toBeVisible();

		// Both sections start closed.
		await expect( page.getByText( 'First hidden body.' ) ).toBeHidden();
		await expect( page.getByText( 'Second hidden body.' ) ).toBeHidden();

		// Opening all reveals both sections' content.
		await toggleAll.click();
		await expect( page.getByText( 'First hidden body.' ) ).toBeVisible();
		await expect( page.getByText( 'Second hidden body.' ) ).toBeVisible();

		// Toggling again collapses them back.
		await toggleAll.click();
		await expect( page.getByText( 'First hidden body.' ) ).toBeHidden();
		await expect( page.getByText( 'Second hidden body.' ) ).toBeHidden();
	} );
} );
