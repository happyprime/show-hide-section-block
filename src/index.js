/**
 * Registers a show/hide block for the block editor.
 */

import HeadingToolbar from './heading-toolbar';

const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

const { Fragment } = wp.element;

const { BlockControls, InnerBlocks, RichText } =
	'undefined' === typeof wp.blockEditor ? wp.editor : wp.blockEditor;

const headingTag = ( level ) => {
	return `h${ level }`;
};

// Register the block.
registerBlockType( 'happyprime/show-hide-section', {
	title: __( 'Show/Hide Section' ),

	description: __(
		'Add an interactive heading that enables users to reveal or hide its associated content.'
	),

	icon: 'hidden',

	category: 'widgets',

	keywords: [ __( 'accordion' ), __( 'faq' ) ],

	attributes: {
		heading: {
			type: 'string',
			default: '',
			source: 'html',
			selector: '.show-hide-toggle',
		},
		headingLevel: {
			type: 'number',
			default: 3,
		},
	},

	supports: {
		className: false,
		customClassName: false,
	},

	edit: ( props ) => {
		const {
			attributes: { heading, headingLevel },
			setAttributes,
		} = props;

		return (
			<Fragment>
				<BlockControls>
					<HeadingToolbar
						minLevel={ 2 }
						maxLevel={ 6 }
						selectedLevel={ headingLevel }
						onChange={ ( value ) =>
							setAttributes( { headingLevel: value } )
						}
					/>
				</BlockControls>
				<RichText
					className="show-hide-toggle"
					allowedFOrmats={ [ 'bold', 'italic' ] }
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
