import { __ } from '@wordpress/i18n';

const SECTION_SELECTOR = 'details.wp-block-happyprime-show-hide-section';

/**
 * Wires each group's open/close all button to the sections it contains.
 */
const handleToggleButtons = () => {
	const toggles = document.querySelectorAll(
		'.wp-block-happyprime-show-hide-group > .toggle-all'
	);

	toggles.forEach((toggle) => {
		toggle.addEventListener('click', () => {
			const sections =
				toggle.parentElement.querySelectorAll(SECTION_SELECTOR);
			const open = 'true' !== toggle.getAttribute('aria-expanded');

			sections.forEach((section) => {
				section.open = open;
			});

			toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
			toggle.textContent = open
				? __('Close all', 'show-hide-section-block')
				: __('Open all', 'show-hide-section-block');
		});
	});
};

/**
 * Opens every section that contains the element the URL hash points at.
 *
 * The hash is looked up by id rather than used in a selector. A hash such as
 * `#1` or `#:~:text=…` is not a valid selector and would throw.
 */
const handleHashNavigation = () => {
	const { hash } = window.location;

	if (hash.length < 2) {
		return;
	}

	let id;

	try {
		id = decodeURIComponent(hash.slice(1));
	} catch {
		return;
	}

	let section = document.getElementById(id)?.closest(SECTION_SELECTOR);

	while (section) {
		section.open = true;
		section = section.parentElement?.closest(SECTION_SELECTOR);
	}
};

const init = () => {
	handleToggleButtons();
	handleHashNavigation();
	window.addEventListener('hashchange', handleHashNavigation);
};

if ('loading' === document.readyState) {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}
