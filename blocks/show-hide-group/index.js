import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { dispatch, useSelect } from '@wordpress/data';

// Internal dependencies.
import metadata from './block.json';
import './style.css';

// Register the block.
registerBlockType(metadata, {
	edit: (props) => {
		const blockProps = useBlockProps(); // eslint-disable-line react-hooks/rules-of-hooks
		const { setAttributes } = props;
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const innerBlocks = useSelect((select) => {
			const currentBlocks = select('core/block-editor').getBlocks(
				props.clientId
			);
			return currentBlocks;
		});

		// Update inner blocks' htmlId attributes when the inner blocks change.
		let newId = '';
		let currentIds = '';
		for (let i = 0; i < innerBlocks.length; i++) {
			newId = 'show-hide-section-' + i;
			currentIds += ' ' + newId;
			dispatch('core/block-editor').updateBlockAttributes(
				innerBlocks[i].clientId,
				{ htmlId: newId }
			);
		}

		// Save the number of inner blocks and the list of IDs the Toggle All button controls.
		const currentCount = innerBlocks.length;
		setAttributes({ blockCount: currentCount, allIds: currentIds });

		return (
			<div {...blockProps}>
				<InnerBlocks
					allowedBlocks={['happyprime/show-hide-section']}
					template={[
						[
							'happyprime/show-hide-section',
							{ htmlId: 'show-hide-section-0' },
							[['core/paragraph', {}]],
						],
						[
							'happyprime/show-hide-section',
							{ htmlId: 'show-hide-section-1' },
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
		const { blockCount, allIds } = props.attributes;
		const toggleAll = (
			<button
				className="toggle-all"
				aria-expanded="false"
				aria-controls={allIds}
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
