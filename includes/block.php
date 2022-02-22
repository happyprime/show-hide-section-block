<?php
/**
 * Loads assets for the Show/Hide Section block.
 *
 * @package show-hide-section
 */

namespace HappyPrime\Show_Hide_Section\Block;

add_action( 'init', __NAMESPACE__ . '\register_block', 10 );
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\register_script' );

/**
 * Registers the Show/Hide Section block.
 *
 * @since 1.0.0
 */
function register_block() {
	register_block_type_from_metadata(
		dirname( __DIR__ )
	);
}

/**
 * Register the front-end script so that it is enqueued in the footer.
 */
function register_script() {
	$asset_data = require_once dirname( __DIR__ ) . '/build/js/front-end.asset.php';

	wp_register_script(
		'show-hide-section',
		plugin_dir_url( __DIR__ ) . '/build/js/front-end.js',
		$asset_data['dependencies'],
		$asset_data['version'],
		true
	);
}
