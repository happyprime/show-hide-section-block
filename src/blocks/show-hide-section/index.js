import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { select, subscribe } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

// Internal dependencies.
import metadata from './block.json';

// Register the block.
registerBlockType(metadata, {
	edit: (props) => {
		const blockProps = useBlockProps(); // eslint-disable-line react-hooks/rules-of-hooks
		const {
			attributes: { htmlId, summary },
			setAttributes,
		} = props;

		// Create an ID for this section based on its order within the parent Show/Hide Group block.
		const allChildren = select('core/block-editor').getBlocks(props.clientId);
		console.log('allChildren',allChildren);

		return (
			<details {...blockProps}>
				<RichText
					tagName="summary"
					label={__('Summary', 'happy-prime')}
					hideLabelFromVision={true}
					placeholder={__('Summary', 'happy-prime')}
					value={summary}
					allowedFormats={['core/bold', 'core/italic']}
					onChange={(value) => {
						setAttributes({ summary: value });
					}}
				/>
				<InnerBlocks />
			</details>
		);
	},
	save: (props) => {
		const blockProps = useBlockProps.save();
		const {
			attributes: { summary },
		} = props;
		return (
			<details {...blockProps} id={props.clientId}>
				<summary>{summary}</summary>
				<InnerBlocks.Content />
			</details>
		);
	},
});
