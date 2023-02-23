import { registerBlockType } from '@wordpress/blocks';
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { dispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

// Internal dependencies.
import metadata from './block.json';

const Edit = ( props ) => {
	const {
		attributes: { hasToggle },
		setAttributes,
	} = props;

	// Create an Open/Close All button which will only be shown if there is more than one inner block.
	const details = useSelect( ( select ) => {
		const currentBlocks = select( 'core/block-editor' ).getBlocks(
			props.clientId
		);

		return currentBlocks;
	} );

	const toggleAllSections = ( evt ) => {
		if ( 'open all' === evt.target.innerText.toLowerCase() ) {
			// Open all.
			details.forEach( ( detail ) => {
				dispatch( 'core/block-editor' ).updateBlockAttributes(
					detail.clientId,
					{ isOpen: 'open' }
				);
			} );
			// Update button.
			evt.target.innerText = __( 'Close all', 'show-hide-section' );
			evt.target.ariaExpanded = true;
		} else {
			// Close all.
			details.forEach( ( detail ) => {
				dispatch( 'core/block-editor' ).updateBlockAttributes(
					detail.clientId,
					{ isOpen: '' }
				);
			} );
			// Update button.
			evt.target.innerText = __( 'Open all', 'show-hide-section' );
			evt.target.ariaExpanded = false;
		}
	};

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<ToggleControl
						label={ __(
							'Has open/close all toggle',
							'show-hide-section'
						) }
						help={
							hasToggle
								? __(
										'Open/close all toggle will display.',
										'show-hide-section'
								  )
								: __(
										'Open/close all toggle will not display.',
										'show-hide-section'
								  )
						}
						checked={ hasToggle }
						onChange={ ( value ) => {
							setAttributes( { hasToggle: value } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				{ hasToggle && (
					<button
						className="toggle-all"
						aria-expanded="false"
						onClick={ toggleAllSections }
					>
						Open All
					</button>
				) }
				<InnerBlocks
					allowedBlocks={ [ 'happyprime/show-hide-section' ] }
					template={ [
						[
							'happyprime/show-hide-section',
							{ htmlId: 'show-hide-section-0' },
							[ [ 'core/paragraph', {} ] ],
						],
						[
							'happyprime/show-hide-section',
							{ htmlId: 'show-hide-section-1' },
							[ [ 'core/paragraph', {} ] ],
						],
					] }
					templateLock={ false }
				/>
			</div>
		</>
	);
};

const Save = ( props ) => {
	const {
		attributes: { hasToggle },
	} = props;

	return (
		<div { ...useBlockProps.save() }>
			{ hasToggle && (
				<button className="toggle-all" aria-expanded="false">
					Open All
				</button>
			) }
			<InnerBlocks.Content />
		</div>
	);
};

// Register the block.
registerBlockType( metadata, {
	edit: Edit,
	save: Save,
} );
