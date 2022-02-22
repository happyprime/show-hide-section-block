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
	 * Toggles the `aria-expanded` and innerText of the master toggle button.
	 *
	 * @param {Object}  masterToggle The master toggle button.
	 * @param {boolean} expanded     Whether the show/hide sections are expanded.
	 */
	function toggleMaster(masterToggle, expanded) {
		if (expanded) {
			masterToggle.setAttribute('aria-expanded', 'false');
			masterToggle.innerText = 'Open All';
		} else {
			masterToggle.setAttribute('aria-expanded', 'true');
			masterToggle.innerText = 'Close All';
		}
	}

	/**
	 * Calls `toggleMaster()` if there is a master toggle button.
	 */
	function maybeToggleMaster() {
		const masterToggle = document.querySelector('.show-hide-toggle_master');

		// Return early if there is no master toggle button.
		if (!masterToggle) {
			return;
		}

		// Check if every show/hide section is expanded.
		const expanded = !toggles.every(
			(toggle) =>
				'true' === toggle.firstChild.getAttribute('aria-expanded')
		);

		toggleMaster(masterToggle.firstChild, expanded);
	}

	/**
	 * Toggles the `aria-expanded` state on the toggle button,
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
			maybeToggleMaster();
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

	// Adds a master toggle button if there are more than one show/hide sections.
	if (1 < length) {
		// Get the first toggle section
		const firstToggle = toggles[0];

		// Set up a button wrapped in the same `h{n}` tag as the first toggle section.
		const masterToggleHeading = document.createElement(
			firstToggle.localName
		);
		const masterToggle = document.createElement('button');
		const toggleSectionIds = Array.from(toggles.keys())
			.map((index) => `show-hide-section-${index}`)
			.join(' ');

		masterToggleHeading.className = 'show-hide-toggle_master';
		masterToggle.setAttribute('aria-expanded', 'false');
		masterToggle.setAttribute('aria-controls', toggleSectionIds);
		masterToggle.appendChild(document.createTextNode('Open All'));
		masterToggleHeading.appendChild(masterToggle);

		// Insert the master toggle button before the first toggle section.
		firstToggle.parentNode.insertBefore(masterToggleHeading, firstToggle);

		// Bind click behaviors on the master toggle button.
		masterToggle.addEventListener('click', (event) => {
			// Just for good measure - the button shouldn't do anything by default.
			event.preventDefault();

			const expanded =
				masterToggle.getAttribute('aria-expanded') === 'true';

			toggles.forEach((toggle) =>
				toggleSection(toggle.firstChild, expanded)
			);

			toggleMaster(masterToggle, expanded);
		});
	}
};

showHide();
