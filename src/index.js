/**
 * Registers a show/hide block for the block editor.
 */

import HeadingLevelDropdown from './heading-level-dropdown';

import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

import {
	useBlockProps,
	BlockControls,
	InnerBlocks,
	RichText,
} from '@wordpress/block-editor';

import metadata from '../block.json';

const headingTag = (level) => {
	return `h${level}`;
};

// Register the block.
registerBlockType(metadata, {
	edit: ({ attributes, setAttributes }) => {
		const { heading, headingLevel } = attributes;

		return (
			<div {...useBlockProps()}>
				<BlockControls group="block">
					<HeadingLevelDropdown
						selectedLevel={headingLevel}
						onChange={(newLevel) =>
							setAttributes({ headingLevel: newLevel })
						}
					/>
				</BlockControls>
				<RichText
					className="show-hide-toggle"
					allowedFormats={['core/bold', 'core/italic']}
					keepPlaceholderOnFocus
					onChange={(value) => setAttributes({ heading: value })}
					placeholder={__('Show/Hide Section heading…')}
					tagName={headingTag(headingLevel)}
					value={heading}
				/>
				<div className="show-hide-panel">
					<InnerBlocks />
				</div>
			</div>
		);
	},

	save: ({ attributes }) => {
		const { heading, headingLevel } = attributes;

		return (
			<>
				<RichText.Content
					className="show-hide-toggle"
					tagName={headingTag(headingLevel)}
					value={heading}
				/>
				<div className="show-hide-panel">
					<InnerBlocks.Content />
				</div>
			</>
		);
	},
});
