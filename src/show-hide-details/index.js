import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

// Internal dependencies.
import metadata from './block.json';

const Edit = () => {

	const TEMPLATE = [
		[ 'core/paragraph', { placeholder: __( 'Remaining', 'show-hide-section-block' ) } ],
	];

	return (
		<>
			<InnerBlocks
				template={ TEMPLATE }
				templateLock={ false }
			/>
		</>
	);
};

const Save = () => {
	return (
		<InnerBlocks.Content />
	);
};

// Register the block.
registerBlockType( metadata, {
	edit: Edit,
	save: Save,
} );
