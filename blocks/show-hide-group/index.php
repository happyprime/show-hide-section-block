<?php
/**
 * Handle the server-side registration of the blocks.
 *
 * @package show-hide-section-block
 */

namespace HappyPrime\Blocks\ShowHideGroup;

add_action( 'init', __NAMESPACE__ . '\register' );
add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets' );
add_filter( 'pre_render_block', __NAMESPACE__ . '\maybe_enqueue_script', 10, 2 );

/**
 * Register the blocks on the server.
 */
function register() {
	register_block_type_from_metadata(
		HP_SHS_PLUGIN_DIR . '/blocks/show-hide-group'
	);

	register_block_type_from_metadata(
		HP_SHS_PLUGIN_DIR . '/blocks/show-hide-section'
	);
}

/**
 * Make front-end scripting available for enqueue if the block is in use.
 */
function register_assets() {
	if ( ! has_block( 'happyprime/show-hide-group' ) || is_admin() ) {
		return;
	}

	$asset_data = require_once HP_SHS_PLUGIN_DIR . '/build/front-end.asset.php';

	wp_register_script(
		'happyprime-show-hide-group-block',
		plugins_url( 'build/front-end.js', HP_SHS_PLUGIN_FILE ),
		$asset_data['dependencies'],
		$asset_data['version'],
		true
	);
}

/**
 * Enqueue the toggle script if a Show / Hide Group block exists and the
 * toggle attribute is set to true.
 *
 * @param string|null $pre_render   Content if previously rendered, otherwise null.
 * @param array       $parsed_block The parsed block data.
 * @return string|null Unmodified.
 */
function maybe_enqueue_script( $pre_render, array $parsed_block ) {
	if ( 'happyprime/show-hide-group' === $parsed_block['blockName'] && isset( $parsed_block['attrs']['hasToggle'] ) && $parsed_block['attrs']['hasToggle'] ) {
		wp_enqueue_script( 'happyprime-show-hide-group-block' );
	}

	return $pre_render;
}