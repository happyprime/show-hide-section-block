<?php
/**
 * Loads assets for the Show/Hide Section block.
 *
 * @package show-hide-section
 */

namespace HappyPrime\Show_Hide_Section\Block;

add_action( 'init', __NAMESPACE__ . '\register_block', 10 );
add_action( 'enqueue_block_assets', __NAMESPACE__ . '\enqueue_block_assets', 10 );

/**
 * Provides a block version number for scripts.
 *
 * @since 1.0.0
 *
 * @return string The version number.
 */
function block_version() {
	return '1.0.0';
}

/**
 * Registers the Show/Hide Section block.
 *
 * @since 1.0.0
 */
function register_block() {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	wp_register_script(
		'happyprime-show-hide-section',
		plugins_url( 'build/index.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-element' ),
		block_version(),
		true
	);

	wp_register_style(
		'happyprime-show-hide-section',
		plugins_url( 'style.css', __FILE__ ),
		array(),
		block_version()
	);

	register_block_type(
		'happyprime/show-hide-section',
		array(
			'editor_script' => 'happyprime-show-hide-section',
			'script'        => 'happyprime-show-hide-section-front-end',
			'style'         => 'happyprime-show-hide-section',
		)
	);
}

/**
 * Enqueues front-end assets for the Show/Hide Section block if appropriate.
 *
 * @since 1.0.0
 */
function enqueue_block_assets() {
	if ( is_admin() || ! has_block( 'happyprime/show-hide-section' ) ) {
		return;
	}

	wp_enqueue_script(
		'happyprime-show-hide-section-front-end',
		plugins_url( 'build/front-end.js', dirname( __FILE__ ) ),
		array(),
		block_version(),
		true
	);
}
