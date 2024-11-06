import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

// Internal dependencies.
import metadata from './block.json';
import deprecated from './deprecated';

const Edit = (props) => {
	const {
		attributes: { isOpen },
		setAttributes,
		isSelected,
	} = props;

	// Create an inner blocks template for the content.
	const TEMPLATE = [
		[
			'happyprime/show-hide-summary',
			{ summary: __('Summary', 'show-hide-section-block') },
		],
		[
			'happyprime/show-hide-details',
			{ details: __('Details', 'show-hide-section-block') },
		],
	];

	return (
		<div {...useBlockProps()}>
			<InnerBlocks
				template={TEMPLATE}
				allowedBlocks={[
					'happyprime/show-hide-summary',
					'happyprime/show-hide-details',
				]}
				templateLock="all"
			/>
		</div>
	);
};

const Save = () => {
	return (
		<details {...useBlockProps.save()}>
			<InnerBlocks.Content />
		</details>
	);
};

// Register the block.
registerBlockType(metadata, {
	edit: Edit,
	save: Save,
	deprecated,
});
