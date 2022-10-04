import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

// Internal dependencies.
import metadata from './block.json';

// Register the block.
registerBlockType( metadata, {
	edit: ( props ) => {
		const blockProps = useBlockProps(); // eslint-disable-line react-hooks/rules-of-hooks
		const {
			attributes: { isOpen, summary },
			setAttributes,
		} = props;

		return (
			<details { ...blockProps } open={ isOpen }>
				<RichText
					tagName="summary"
					label={ __( 'Summary', 'happy-prime' ) }
					hideLabelFromVision={ true }
					placeholder={ __( 'Summary', 'happy-prime' ) }
					value={ summary }
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
					onChange={ ( value ) => {
						setAttributes( { summary: value } );
					} }
				/>
				<InnerBlocks />
			</details>
		);
	},
	save: ( props ) => {
		const blockProps = useBlockProps.save();
		const {
			attributes: { htmlId, summary },
		} = props;
		return (
			<details { ...blockProps } id={ htmlId }>
				<summary>{ summary }</summary>
				<InnerBlocks.Content />
			</details>
		);
	},
} );
