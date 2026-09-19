/**
 * Migration tests for the Show / Hide Section block.
 *
 * Posts saved by 2.x hold the summary text directly in the section's
 * <summary> and the body directly in the <details>. Opening such a post must
 * migrate each section to the summary + details inner blocks without a
 * validation failure and without losing the section's own attributes.
 *
 * @package show-hide-section-block
 */
import { test, expect } from '@wordpress/e2e-test-utils-playwright';

/**
 * Markup as saved by 2.0.3: one section with an anchor and wide alignment,
 * one with an empty summary.
 */
const LEGACY_CONTENT = `<!-- wp:happyprime/show-hide-group -->
<div class="wp-block-happyprime-show-hide-group"><!-- wp:happyprime/show-hide-section {"anchor":"legacy-anchor","align":"wide"} -->
<details id="legacy-anchor" class="wp-block-happyprime-show-hide-section alignwide"><summary>Legacy <strong>summary</strong> &amp; more</summary><!-- wp:paragraph -->
<p>Legacy body.</p>
<!-- /wp:paragraph --></details>
<!-- /wp:happyprime/show-hide-section -->

<!-- wp:happyprime/show-hide-section -->
<details class="wp-block-happyprime-show-hide-section"><summary></summary><!-- wp:paragraph -->
<p>Body under an empty summary.</p>
<!-- /wp:paragraph --></details>
<!-- /wp:happyprime/show-hide-section --></div>
<!-- /wp:happyprime/show-hide-group -->`;

test.describe( 'Show / Hide Section block — 2.x migration', () => {
	test( 'sections saved by 2.x migrate without losing attributes', async ( {
		admin,
		editor,
		requestUtils,
	} ) => {
		const post = await requestUtils.createPost( {
			title: 'Legacy show/hide markup',
			content: LEGACY_CONTENT,
			status: 'draft',
		} );

		await admin.editPost( post.id );

		const [ group ] = await editor.getBlocks( { full: true } );
		expect( group.name ).toBe( 'happyprime/show-hide-group' );
		expect( group.isValid ).toBe( true );
		expect( group.innerBlocks ).toHaveLength( 2 );

		const [ anchored, emptySummary ] = group.innerBlocks;

		for ( const section of [ anchored, emptySummary ] ) {
			expect( section.name ).toBe( 'happyprime/show-hide-section' );
			expect( section.isValid ).toBe( true );
			expect(
				section.innerBlocks.map( ( block ) => block.name )
			).toEqual( [
				'happyprime/show-hide-summary',
				'happyprime/show-hide-details',
			] );
		}

		// The section keeps its own attributes; only the summary moves.
		expect( anchored.attributes.anchor ).toBe( 'legacy-anchor' );
		expect( anchored.attributes.align ).toBe( 'wide' );
		expect( anchored.attributes.summary ).toBeUndefined();

		const [ summary, details ] = anchored.innerBlocks;
		expect( summary.attributes.summary ).toBe(
			'Legacy <strong>summary</strong> &amp; more'
		);
		expect( details.innerBlocks[ 0 ].attributes.content ).toBe(
			'Legacy body.'
		);

		expect( emptySummary.innerBlocks[ 0 ].attributes.summary ).toBe( '' );
		expect(
			emptySummary.innerBlocks[ 1 ].innerBlocks[ 0 ].attributes.content
		).toBe( 'Body under an empty summary.' );
	} );
} );
