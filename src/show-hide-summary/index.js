import { registerBlockType } from '@wordpress/blocks';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

// Internal dependencies.
import metadata from './block.json';

const Edit = (props) => {
	const {
		attributes: { summary },
		setAttributes,
	} = props;

	return (
		<summary {...useBlockProps()}>
			<RichText
				tagName="div"
				label={__('Summary', 'show-hide-section-block')}
				placeholder={__('Summary', 'show-hide-section-block')}
				value={summary}
				allowedFormats={['core/bold', 'core/italic']}
				onChange={(value) => {
					setAttributes({ summary: value });
				}}
			/>
		</summary>
	);
};

const Save = (props) => {
	const {
		attributes: { summary },
	} = props;

	return (
		<summary {...useBlockProps.save()}>
			<RichText.Content tagName="div" value={summary} />
		</summary>
	);
};

// Register the block.
registerBlockType(metadata, {
	edit: Edit,
	save: Save,
});
