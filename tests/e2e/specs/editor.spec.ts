/**
 * Editor tests for the Show / Hide Section blocks.
 *
 * Asserts the core authoring experience: the top-level block is discoverable,
 * inserting it scaffolds the expected nested details/summary structure, and a
 * post containing it can be published.
 *
 * @package show-hide-section-block
 */
import { test, expect } from '@wordpress/e2e-test-utils-playwright';

test.describe( 'Show / Hide Section block — editor', () => {
	test( 'the group block is available in the inserter', async ( {
		admin,
		page,
	} ) => {
		await admin.createNewPost();

		await page.getByRole( 'button', { name: 'Block Inserter' } ).click();
		await page
			.getByRole( 'searchbox', { name: 'Search' } )
			.fill( 'Show Hide Group' );

		await expect(
			page.getByRole( 'option', { name: 'Show Hide Group' } )
		).toBeVisible();
	} );

	test( 'inserting the group scaffolds a section, summary, and details', async ( {
		admin,
		editor,
	} ) => {
		await admin.createNewPost();

		// Inserting only the top-level block should template in the nested
		// section → summary + details structure.
		await editor.insertBlock( { name: 'happyprime/show-hide-group' } );

		const [ group ] = await editor.getBlocks();
		expect( group.name ).toBe( 'happyprime/show-hide-group' );

		const section = group.innerBlocks[ 0 ];
		expect( section?.name ).toBe( 'happyprime/show-hide-section' );
		// A section is collapsed by default.
		expect( section?.attributes.isOpen ).toBe( false );

		const childNames = ( section?.innerBlocks ?? [] ).map(
			( block ) => block.name
		);
		expect( childNames ).toContain( 'happyprime/show-hide-summary' );
		expect( childNames ).toContain( 'happyprime/show-hide-details' );
	} );

	test( 'a post containing the block can be published', async ( {
		admin,
		editor,
		page,
	} ) => {
		await admin.createNewPost();

		await editor.canvas
			.getByRole( 'textbox', { name: 'Add title' } )
			.fill( 'Show / Hide editor test' );

		await editor.insertBlock( { name: 'happyprime/show-hide-group' } );

		await editor.publishPost();

		await expect(
			page.locator(
				'.editor-post-publish-panel__header-published, .components-snackbar'
			)
		).toBeVisible();
	} );
} );
