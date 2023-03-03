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

	/**
	 * Insert a space at the current position of the cursor and then adjust
	 * the cursor position, accounting for any selection it has made.
	 *
	 * @param {Node} node
	 */
	const insertSpace = ( node ) => {
		const { ownerDocument } = node;
		const { defaultView } = ownerDocument;

		const sel = defaultView.getSelection();
		const range = sel.getRangeAt( 0 );
		const textNode = document.createTextNode( ' ' );

		range.deleteContents();
		range.insertNode( textNode );
		range.setStartAfter( textNode );
	};

	return (
		<details { ...useBlockProps() } open={ isOpen }>
			<RichText
				tagName="summary"
				label={ __( 'Summary', 'show-hide-section-block' ) }
				placeholder={ __( 'Summary', 'show-hide-section-block' ) }
				value={ summary }
				allowedFormats={ [ 'core/bold', 'core/italic' ] }
				onChange={ ( value ) => {
					setAttributes( { summary: value } );
				} }
				onKeyUp={ ( evt ) => {
					if ( ' ' === evt.key ) {
						evt.preventDefault(); // Stop the details element from toggling.
						insertSpace( evt.target ); // But make sure the space character is added.
					}
				} }
			/>
			<InnerBlocks />
		</details>
	);
};

const Save = ( props ) => {
	const {
		attributes: { summary },
	} = props;

	return (
		<details { ...useBlockProps.save() }>
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
