import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Markup saved by 3.1.0 and earlier.
 *
 * The toggle button's label went through `__()` in `save()`, so the saved
 * text depended on the locale of whoever saved the post. The current save
 * writes the untranslated label and the front-end script translates it.
 * This entry regenerates the translated label so those posts migrate
 * instead of failing validation.
 */
const v1 = {
	save({ attributes: { hasToggle } }) {
		return (
			<div {...useBlockProps.save()}>
				{hasToggle && (
					<button className="toggle-all" aria-expanded="false">
						{__('Open all', 'show-hide-section-block')}
					</button>
				)}
				<InnerBlocks.Content />
			</div>
		);
	},
};

export default [v1];
