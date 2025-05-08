<?php
/**
 * Manage the block.
 *
 * @package show-hide-section-block
 */

namespace HappyPrime\Blocks\ShowHideGroup;

add_action( 'init', __NAMESPACE__ . '\register' );
add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets', 2 );

/**
 * Register the block.
 */
function register() {
	register_block_type_from_metadata( HP_SHS_PLUGIN_DIR . '/build/show-hide-group' );
}

/**
 * Make front-end scripting available for enqueue if the block is in use.
 */
function register_assets() {
	if ( ! has_block( 'happyprime/show-hide-group' ) || is_admin() ) {
		return;
	}

	$asset_data = require HP_SHS_PLUGIN_DIR . '/build/show-hide-group/view.asset.php';

	wp_register_script(
		'happyprime-show-hide-group-view',
		plugins_url( 'build/show-hide-group/view.js', HP_SHS_PLUGIN_FILE ),
		$asset_data['dependencies'],
		$asset_data['version'],
		true
	);
}
