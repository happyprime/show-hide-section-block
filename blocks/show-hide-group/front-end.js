{
	const handleToggleButton = () => {
		const toggleAll = document.querySelectorAll(
			'.wp-block-happyprime-show-hide-group .toggle-all'
		);

		if ( toggleAll.length > 0 ) {
			toggleAll.forEach( ( toggle ) =>
				toggle.addEventListener( 'click', () => {
					const details = toggle.parentElement.querySelectorAll(
						'details.wp-block-happyprime-show-hide-section'
					);

					if ( false === Boolean( toggle.ariaExpanded ) ) {
						details.forEach( ( detail ) => {
							detail.setAttribute( 'open', true );
						} );

						toggle.innerText = 'Close All';
						toggle.ariaExpanded = true;
					} else {
						details.forEach( ( detail ) => {
							detail.removeAttribute( 'open' );
						} );

						toggle.innerText = 'Open All';
						toggle.ariaExpanded = false;
					}
				} )
			);
		}
	};

	document.addEventListener( 'DOMContentLoaded', handleToggleButton );
}
