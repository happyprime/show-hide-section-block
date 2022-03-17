import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { dispatch, withSelect } from '@wordpress/data';

// Internal dependencies.
import metadata from './block.json';

// Register the block.
registerBlockType(metadata, {
	edit: withSelect((select, props) => {
		return {
			innerBlocks: select('core/block-editor').getBlocks(props.clientId),
		};
	})((props) => {
		const blockProps = useBlockProps(); // eslint-disable-line react-hooks/rules-of-hooks
		const { innerBlocks, setAttributes } = props;

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

		// Save the number of inner blocks.
		const currentCount = props.innerBlocks.length;
		// TODO: fix the problem setting both atts at once
		setAttributes({ blockCount: currentCount });
		setAttributes({ allIds: currentIds });

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
	}),
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
