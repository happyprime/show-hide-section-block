/**
 * This file was copied from the Gutenberg project.
 * @see https://github.com/WordPress/gutenberg/blob/8c3ca76906ddb61f1e7639442815e70fa068cc85/packages/block-library/src/heading/heading-level-dropdown.js
 *
 * WordPress dependencies
 */
import { ToolbarDropdownMenu } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import HeadingLevelIcon from './heading-level-icon';

const HEADING_LEVELS = [1, 2, 3, 4, 5, 6];

const POPOVER_PROPS = {
	className: 'block-library-heading-level-dropdown',
};

/** @typedef {import('@wordpress/element').WPComponent} WPComponent */

/**
 * HeadingLevelDropdown props.
 *
 * @typedef WPHeadingLevelDropdownProps
 *
 * @property {number}                 selectedLevel The chosen heading level.
 * @property {(newValue:number)=>any} onChange      Callback to run when
 *                                                  toolbar value is changed.
 */

/**
 * Dropdown for selecting a heading level (1 through 6).
 *
 * @param {WPHeadingLevelDropdownProps} props Component props.
 *
 * @return {WPComponent} The toolbar.
 */
export default function HeadingLevelDropdown({ selectedLevel, onChange }) {
	return (
		<ToolbarDropdownMenu
			popoverProps={POPOVER_PROPS}
			icon={<HeadingLevelIcon level={selectedLevel} />}
			label={__('Change heading level')}
			controls={HEADING_LEVELS.map((targetLevel) => {
				{
					const isActive = targetLevel === selectedLevel;

					return {
						icon: (
							<HeadingLevelIcon
								level={targetLevel}
								isPressed={isActive}
							/>
						),
						label: sprintf(
							// translators: %s: heading level e.g: "1", "2", "3"
							__('Heading %d'),
							targetLevel
						),
						isActive,
						onClick() {
							onChange(targetLevel);
						},
					};
				}
			})}
		/>
	);
}
