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

const details = document.querySelectorAll(
	'.wp-block-happyprime-show-hide-group details'
);

docReady(function () {
	const toggleAll = document.querySelectorAll(
		'.wp-block-happyprime-show-hide-group .toggle-all'
	);
	if (toggleAll.length === 1) {
		toggleAll[0].addEventListener('click', () => {
			if ('open all' === toggleAll[0].innerText.toLowerCase()) {
				// Open all.
				details.forEach((detail) => {
					detail.setAttribute('open', true);
				});
				// Update button.
				toggleAll[0].innerText = 'Close All';
				toggleAll[0].ariaExpanded = true;
			} else {
				// Close all.
				details.forEach((detail) => {
					detail.removeAttribute('open');
				});
				// Update button.
				toggleAll[0].innerText = 'Open All';
				toggleAll[0].ariaExpanded = false;
			}
		});
	}
});
