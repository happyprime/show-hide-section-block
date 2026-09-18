import { registerBlockType } from '@wordpress/blocks';
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

// Internal dependencies.
import metadata from './block.json';

const Edit = (props) => {
	const {
		attributes: { hasToggle },
		setAttributes,
	} = props;

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<ToggleControl
						label={__(
							'Has open/close all toggle',
							'show-hide-section-block'
						)}
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
						checked={hasToggle}
						onChange={(value) => {
							setAttributes({ hasToggle: value });
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				{hasToggle && (
					// Sections are always expanded in the editor, so the
					// button is a preview of the front-end control only.
					<button className="toggle-all" aria-expanded="false">
						{__('Open all', 'show-hide-section-block')}
					</button>
				)}
				<InnerBlocks
					allowedBlocks={['happyprime/show-hide-section']}
					template={[['happyprime/show-hide-section', {}]]}
					templateLock={false}
				/>
			</div>
		</>
	);
};

const Save = (props) => {
	const {
		attributes: { hasToggle },
	} = props;

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
};

// Register the block.
registerBlockType(metadata, {
	edit: Edit,
	save: Save,
});
