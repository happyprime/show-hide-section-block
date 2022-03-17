import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

// Internal dependencies.
import metadata from './block.json';

// Register the block.
registerBlockType(metadata, {
	edit: (props) => {
		const blockProps = useBlockProps(); // eslint-disable-line react-hooks/rules-of-hooks
		const { setAttributes } = props;
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const { blockCount } = useSelect((select) => ({
			blockCount: select('core/block-editor').getBlockCount(
				props.clientId
			),
		}));
		setAttributes({ blockCount });
		console.log("Group's props", props);
		return (
			<div {...blockProps}>
				<InnerBlocks
					allowedBlocks={['happyprime/show-hide-section']}
					template={[
						[
							'happyprime/show-hide-section',
							{},
							[['core/paragraph', {}]],
						],
						[
							'happyprime/show-hide-section',
							{},
							[['core/paragraph', {}]],
						],
					]}
					templateLock={false}
				/>
			</div>
		);
	},
	save: (props) => {
		const blockProps = useBlockProps.save();
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const { blockCount } = props.attributes;
		const toggleAll = (
			<button
				className="toggle-all"
				aria-expanded="false"
				aria-controls=""
			>
				Open All
			</button>
		);
		return (
			<div {...blockProps}>
				{blockCount > 1 && toggleAll}
				<InnerBlocks.Content />
			</div>
		);
	},
});
