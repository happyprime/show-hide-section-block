import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

// Internal dependencies.
import metadata from './block.json';

const Edit = ( props ) => {
	const {
		attributes: { isOpen, summary },
		setAttributes,
	} = props;

	return (
		<details { ...useBlockProps() } open={ isOpen }>
			<RichText
				tagName="summary"
				label={ __( 'Summary', 'show-hide-section' ) }
				placeholder={ __( 'Summary', 'show-hide-section' ) }
				value={ summary }
				allowedFormats={ [ 'core/bold', 'core/italic' ] }
				onChange={ ( value ) => {
					setAttributes( { summary: value } );
				} }
			/>
			<InnerBlocks />
		</details>
	);
};

const Save = ( props ) => {
	const blockProps = useBlockProps.save();
	const {
		attributes: { summary },
	} = props;

	return (
		<details { ...blockProps }>
			<summary>
				<RichText.Content tag={ 'summary' } value={ summary } />
			</summary>
			<InnerBlocks.Content />
		</details>
	);
};

// Register the block.
registerBlockType( metadata, {
	edit: Edit,
	save: Save,
} );
