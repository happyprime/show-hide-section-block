/**
 * Enables users to reveal or hide the associated content of an interactive heading.
 *
 * Based on the pattern at https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html.
 */

const showHide = () => {
	'use strict';

	const toggles = Array.prototype.slice.call(
		document.querySelectorAll('.show-hide-toggle')
	);

	const length = toggles.length;

	/**
	 * Toggle the `aria-expanded` and innerText of the Toggle All button.
	 *
	 * @param {Object}  toggler  The button that toggles all sections.
	 * @param {boolean} expanded Whether the show/hide sections are expanded.
	 */
	function toggleAll(toggler, expanded) {
		if (expanded) {
			toggler.setAttribute('aria-expanded', 'false');
			toggler.innerText = 'Open All';
		} else {
			toggler.setAttribute('aria-expanded', 'true');
			toggler.innerText = 'Close All';
		}
	}

	/**
	 * Call `toggleAll()` if there is a Toggle All button.
	 */
	function maybetoggleAll() {
		const toggler = document.querySelector('.show-hide-all-toggler');

		// Return early if there is no Toggle All button.
		if (!toggler) {
			return;
		}

		// Check if every show/hide section is expanded.
		const expanded = !toggles.every(
			(toggle) =>
				'true' === toggle.firstChild.getAttribute('aria-expanded')
		);

		toggleAll(toggler.firstChild, expanded);
	}

	/**
	 * Toggle the `aria-expanded` state on the toggle button,
	 * and the display of the the toggle section.
	 *
	 * @param {Object}  toggle   The show/hide section toggle button.
	 * @param {boolean} expanded Whether the show/hide section is expanded.
	 */
	function toggleSection(toggle, expanded) {
		// Get the section.
		const section = toggle.parentElement.nextElementSibling;

		if (expanded) {
			toggle.setAttribute('aria-expanded', 'false');
			section.setAttribute('hidden', true);
		} else {
			toggle.setAttribute('aria-expanded', 'true');
			section.removeAttribute('hidden');
		}
	}

	// Set up interactivity for each show/hide heading on the page.
	toggles.forEach((heading, index) => {
		// Get the section associated with the heading.
		const section = heading.nextElementSibling;

		// Create a button to insert into the section heading.
		const toggle = document.createElement('button');

		// Add the heading text inside the button.
		toggle.appendChild(document.createTextNode(heading.innerText));

		// Create ids for the toggle button and section.
		const toggleId = `show-hide-toggle-${index}`;
		const sectionId = `show-hide-section-${index}`;

		// Set the toggle button id and its associated section `aria-labelledby`.
		toggle.id = toggleId;
		section.setAttribute('aria-labelledby', toggleId);

		// Set the toggle button `aria-controls` and its associated section id.
		toggle.setAttribute('aria-controls', sectionId);
		section.id = sectionId;

		// Set the toggle button `aria-expanded` to false.
		toggle.setAttribute('aria-expanded', 'false');

		// Set the section role to `region` and hide it.
		section.setAttribute('role', 'region');
		section.setAttribute('hidden', true);

		// Replace the heading text with the toggle button.
		heading.innerText = '';
		heading.appendChild(toggle);

		// Bind click behaviors on the toggle button.
		toggle.addEventListener('click', (event) => {
			// Just for good measure - the buttons shouldn't do anything by default.
			event.preventDefault();

			const expanded = toggle.getAttribute('aria-expanded') === 'true';

			toggleSection(toggle, expanded);
			maybetoggleAll();
		});

		// Bind keyboard behaviors on the toggle button.
		toggle.addEventListener('keydown', (event) => {
			const key = event.which.toString();

			// 33 = Page Up, 34 = Page Down.
			const ctrlModifier = event.ctrlKey && key.match(/33|34/);

			// Up/Down arrow and Control + Page Up/Page Down keyboard operations.
			// 38 = Up, 40 = Down.
			if (key.match(/38|40/) || ctrlModifier) {
				event.preventDefault();

				const currentIndex = toggles.indexOf(toggle.parentElement);
				const direction = key.match(/34|40/) ? 1 : -1;
				const newIndex = (currentIndex + length + direction) % length;

				toggles[newIndex].firstChild.focus();
			} else if (key.match(/35|36/)) {
				event.preventDefault();

				// 35 = End, 36 = Home keyboard operations.
				switch (key) {
					// Go to the first toggle.
					case '36':
						toggles[0].focus();
						break;
					// Go to the last toggle.
					case '35':
						toggles[length - 1].focus();
						break;
				}
			}
		});
	});

	// Add a Toggle All button if there are more than one show/hide sections.
	if (1 < length) {
		// Get the first toggle section
		const firstToggle = toggles[0];

		// Set up a button wrapped in the same `h{n}` tag as the first toggle section.
		const togglerHeading = document.createElement(firstToggle.localName);
		const toggler = document.createElement('button');
		const toggleSectionIds = Array.from(toggles.keys())
			.map((index) => `show-hide-section-${index}`)
			.join(' ');

		togglerHeading.className = 'show-hide-all-toggler';
		toggler.setAttribute('aria-expanded', 'false');
		toggler.setAttribute('aria-controls', toggleSectionIds);
		toggler.appendChild(document.createTextNode('Open All'));
		togglerHeading.appendChild(toggler);

		// Insert the Toggle All button before the first toggle section.
		firstToggle.parentNode.insertBefore(togglerHeading, firstToggle);

		// Bind click behaviors on the Toggle All button.
		toggler.addEventListener('click', (event) => {
			// Just for good measure - the button shouldn't do anything by default.
			event.preventDefault();

			const expanded = toggler.getAttribute('aria-expanded') === 'true';

			toggles.forEach((toggle) =>
				toggleSection(toggle.firstChild, expanded)
			);

			toggleAll(toggler, expanded);
		});
	}
};

showHide();
