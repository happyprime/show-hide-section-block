/**
 * Registers a show/hide block for the block editor.
 */

import HeadingLevelDropdown from './heading-level-dropdown';

import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

import { Fragment } from '@wordpress/element';

import { BlockControls, InnerBlocks, RichText } from '@wordpress/block-editor';

import metadata from '../block.json';

const headingTag = ( level ) => {
	return `h${ level }`;
};

// Register the block.
registerBlockType( metadata, {

	edit: ( props ) => {
		const {
			attributes: { heading, headingLevel },
			setAttributes,
		} = props;

		return (
			<Fragment>
				<BlockControls group="block">
					<HeadingLevelDropdown
						selectedLevel={ headingLevel }
						onChange={ ( newLevel ) =>
							setAttributes( { headingLevel: newLevel } )
						}
					/>
				</BlockControls>
				<RichText
					className="show-hide-toggle"
					allowedFormats={ [ 'bold', 'italic' ] }
					keepPlaceholderOnFocus
					onChange={ ( value ) =>
						setAttributes( { heading: value } )
					}
					placeholder={ __( 'Show/Hide Section heading…' ) }
					tagName={ headingTag( headingLevel ) }
					value={ heading }
				/>
				<div className="show-hide-panel">
					<InnerBlocks />
				</div>
			</Fragment>
		);
	},

	save: ( { attributes } ) => {
		const { heading, headingLevel } = attributes;

		return (
			<Fragment>
				<RichText.Content
					className="show-hide-toggle"
					tagName={ headingTag( headingLevel ) }
					value={ heading }
				/>
				<div className="show-hide-panel">
					<InnerBlocks.Content />
				</div>
			</Fragment>
		);
	},
} );
