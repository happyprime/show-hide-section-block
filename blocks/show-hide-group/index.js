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

	const details = useSelect( ( select ) => {
		const currentBlocks = select( 'core/block-editor' ).getBlocks(
			props.clientId
		);

		return currentBlocks;
	} );

	const toggleAllSections = ( evt ) => {
		if ( false === evt.target.ariaExpanded ) {
			details.forEach( ( detail ) => {
				dispatch( 'core/block-editor' ).updateBlockAttributes(
					detail.clientId,
					{ isOpen: true }
				);
			} );

			evt.target.innerText = __( 'Close all', 'show-hide-section-block' );
			evt.target.ariaExpanded = true;
		} else {
			details.forEach( ( detail ) => {
				dispatch( 'core/block-editor' ).updateBlockAttributes(
					detail.clientId,
					{ isOpen: false }
				);
			} );

			evt.target.innerText = __( 'Open all', 'show-hide-section-block' );
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
							'show-hide-section-block'
						) }
						help={
							hasToggle
								? __(
										'Open/close all toggle will display.',
										'show-hide-section-block'
								  )
								: __(
										'Open/close all toggle will not display.',
										'show-hide-section-block'
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
						{ __( 'Open all', 'show-hide-section-block' ) }
					</button>
				) }
				<InnerBlocks
					allowedBlocks={ [ 'happyprime/show-hide-section' ] }
					template={ [
						[
							'happyprime/show-hide-section',
							{},
							[ [ 'core/paragraph', {} ] ],
						],
						[
							'happyprime/show-hide-section',
							{},
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
					{ __( 'Open all', 'show-hide-section-block' ) }
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
