import { createBlock } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Deprecate the block markup provided with Show Hide Section 2.x.x.
 *
 * The original markup did not split the summary and details into separate
 * blocks and relied on entering content directly into the summary tag.
 *
 * This caused issues when using the space bar to enter spaces in the summary
 * content. The key press would be registered as an opening of the details tag
 * instead and our override would slow down the editor experience.
 *
 * Now, we wrap summary and details content into separate blocks so that we
 * can improve the editing experience and provide more formatting options around
 * these individual tags.
 */
const v2 = {
	attributes: {
		summary: {
			type: 'string',
			source: 'html',
			selector: 'summary',
		},
	},
	save({ attributes }) {
		return (
			<details {...useBlockProps.save()}>
				<summary>{attributes.summary}</summary>
				<InnerBlocks.Content />
			</details>
		);
	},
	migrate(attributes, innerBlocks) {
		const newInnerBlocks = [
			// The existing summary content is moved to a summary block.
			createBlock('happyprime/show-hide-summary', {
				summary: attributes.summary,
			}),
			// All existing inner blocks are moved to a details block.
			createBlock('happyprime/show-hide-details', {}, innerBlocks),
		];

		return [{}, newInnerBlocks];
	},
	supports: {
		html: true,
		anchor: true,
	},
	isEligible({ summary }) {
		return typeof summary === 'string' && summary.length > 0;
	},
};

export default [v2];
