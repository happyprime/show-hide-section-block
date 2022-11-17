<?php
/**
 * Plugin Name: Show/Hide Section Block
 * Plugin URI: https://github.com/happyprime/show-hide-section
 * Description: Creates accessible summaries that can be toggled to show or hide additional details.
 * Author: Happy Prime
 * Author URI: https://happyprime.co/
 * Version: 1.1.0
 * Requires at least: 5.9
 * Requires PHP: 7.4
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package show-hide-section
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

require_once __DIR__ . '/includes/block.php';
