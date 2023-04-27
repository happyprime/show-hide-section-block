<?php
/**
 * Manage the block.
 *
 * @package show-hide-section-block
 */

namespace HappyPrime\Blocks\ShowHideSection;

add_action( 'init', __NAMESPACE__ . '\register' );

/**
 * Register the block.
 */
function register() {
	register_block_type_from_metadata( HP_SHS_PLUGIN_DIR . '/build/show-hide-section' );
}
