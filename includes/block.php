<?php
/**
 * Handle the server-side registration of the blocks.
 *
 * @package show-hide-section
 */

namespace HappyPrime\ShowHideSection\Block;

add_action( 'init', __NAMESPACE__ . '\register' );
add_action( 'enqueue_block_assets', __NAMESPACE__ . '\hp_show_assets' );

/**
 * Register the blocks on the server.
 */
function register() {
	register_block_type_from_metadata(
		dirname( __DIR__ ) . '/blocks/show-hide-group'
	);

	register_block_type_from_metadata(
		dirname( __DIR__ ) . '/blocks/show-hide-section'
	);
}

/**
 * Enqueue frontend assets in the document footer.
 */
function hp_show_assets() {
	if ( ! has_block( 'happyprime/show-hide-group' ) || is_admin() ) {
		return;
	}

	$asset_data = require_once dirname( __DIR__ ) . '/build/front-end.asset.php';

	wp_enqueue_script(
		'hp-show',
		plugins_url( '/build/front-end.js', __DIR__ ),
		$asset_data['dependencies'],
		$asset_data['version'],
		true
	);
}
