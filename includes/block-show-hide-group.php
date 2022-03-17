<?php
/**
 * Handle the server-side registration of the block.
 *
 * @package happy-prime
 */

namespace HappyPrime\Block\ShowHideGroup;

add_action( 'init', __NAMESPACE__ . '\register' );

/**
 * Register the `happyprime/show-hide-group` block on the server.
 */
function register() {
	register_block_type_from_metadata(
		dirname( __DIR__ ) . '/src/blocks/show-hide-group'
	);
}
