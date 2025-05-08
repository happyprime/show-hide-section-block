{
	const handleToggleButton = () => {
		const toggleAll = document.querySelectorAll(
			'.wp-block-happyprime-show-hide-group .toggle-all'
		);

		if (toggleAll.length > 0) {
			toggleAll.forEach((toggle) =>
				toggle.addEventListener('click', () => {
					const details = toggle.parentElement.querySelectorAll(
						'details.wp-block-happyprime-show-hide-section'
					);

					if ('true' !== toggle.ariaExpanded) {
						details.forEach((detail) => {
							detail.setAttribute('open', 'true');
						});

						toggle.innerText = 'Close All';
						toggle.ariaExpanded = 'true';
					} else {
						details.forEach((detail) => {
							detail.removeAttribute('open');
						});

						toggle.innerText = 'Open All';
						toggle.ariaExpanded = 'false';
					}
				})
			);
		}
	};

	/**
	 * Set a details element to `open` if its corresponding hash is in the URL.
	 *
	 * @returns {void}
	 */
	const handleHashNavigation = () => {
		if (!window.location.hash) {
			return;
		}

		const targetDetails = document.querySelector(
			`details.wp-block-happyprime-show-hide-section${window.location.hash}`
		);

		if (targetDetails) {
			targetDetails.setAttribute('open', 'true');
		}
	};

	document.addEventListener('DOMContentLoaded', () => {
		handleToggleButton();
		handleHashNavigation();
		window.addEventListener('hashchange', handleHashNavigation);
	});
}
