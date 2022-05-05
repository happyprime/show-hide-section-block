function docReady(fn) {
	// see if DOM is already available
	if (
		document.readyState === 'complete' ||
		document.readyState === 'interactive'
	) {
		// call on next available tick
		setTimeout(fn, 1);
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

docReady(function () {
	const toggleAll = document.querySelectorAll(
		'.wp-block-happyprime-show-hide-group .toggle-all'
	);
	if (toggleAll.length > 0) {
		toggleAll.forEach((toggle) =>
			toggle.addEventListener('click', () => {
				const details = toggle.parentElement.querySelectorAll(
					'details.wp-block-happyprime-show-hide-section'
				);
				if ('open all' === toggle.innerText.toLowerCase()) {
					// Open all.
					details.forEach((detail) => {
						detail.setAttribute('open', true);
					});
					// Update button.
					toggle.innerText = 'Close All';
					toggle.ariaExpanded = true;
				} else {
					// Close all.
					details.forEach((detail) => {
						detail.removeAttribute('open');
					});
					// Update button.
					toggle.innerText = 'Open All';
					toggle.ariaExpanded = false;
				}
			})
		);
	}
});
