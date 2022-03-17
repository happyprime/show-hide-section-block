<?php
/**
 * The main plugin file.
 *
 * @package happy-prime
 */

/**
 * Plugin Name: Show/Hide Section Block
 * Plugin URI: https://github.com/happyprime/show-hide-section
 * Description: Creates accessible summaries that can be toggled to show or hide additional details.
 * Author: Happy Prime
 * Author URI: https://happyprime.co/
 * Version: 1.1.0
 * Requires at least: 5.9
 * Requires PHP: 7.2
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

require_once __DIR__ . '/includes/block-show-hide-group.php';
require_once __DIR__ . '/includes/block-show-hide-section.php';

add_action( 'enqueue_block_assets', 'hp_show_assets' );

/**
 * Enqueue frontend assets in the document footer.
 */
function hp_show_assets() {
	if ( ! has_block( 'happyprime/show-hide-group' ) || is_admin() ) {
		return;
	}

	$asset_data = require_once __DIR__ . '/build/js/front-end.asset.php';

	wp_enqueue_script(
		'hp-show',
		plugin_dir_url( __FILE__ ) . 'build/js/front-end.js',
		$asset_data['dependencies'],
		$asset_data['version'],
		true
	);
}
