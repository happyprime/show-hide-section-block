import { createBlock } from '@wordpress/blocks';
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';

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
 *
 * A deprecation entry does not inherit the block's `supports`; without them
 * the regenerated markup has no anchor, alignment, color or spacing classes
 * and a 2.x section that used any of them fails validation. These are the
 * supports 2.0.3 declared.
 */
const v2 = {
	attributes: {
		summary: {
			type: 'string',
			source: 'html',
			selector: 'summary',
		},
	},
	supports: {
		anchor: true,
		align: true,
		alignWide: true,
		color: {
			background: true,
			enableContrastChecker: true,
			text: true,
			link: true,
			gradients: true,
		},
		defaultStylePicker: true,
		dimensions: {
			minHeight: true,
		},
		html: false,
		multiple: true,
		position: {
			sticky: false,
		},
		spacing: {
			margin: true,
			padding: true,
		},
		typography: {
			fontSize: true,
			lineHeight: true,
		},
	},
	save({ attributes }) {
		return (
			<details {...useBlockProps.save()}>
				<RichText.Content
					tagName="summary"
					value={attributes.summary}
				/>
				<InnerBlocks.Content />
			</details>
		);
	},
	migrate(attributes, innerBlocks) {
		// Everything but the summary (anchor, align, style, ...) stays on
		// the section.
		const { summary, ...sectionAttributes } = attributes;

		const newInnerBlocks = [
			// The existing summary content is moved to a summary block.
			createBlock('happyprime/show-hide-summary', { summary }),
			// All existing inner blocks are moved to a details block.
			createBlock('happyprime/show-hide-details', {}, innerBlocks),
		];

		return [sectionAttributes, newInnerBlocks];
	},
	isEligible({ summary }) {
		return typeof summary === 'string' && summary.length > 0;
	},
};

export default [v2];
