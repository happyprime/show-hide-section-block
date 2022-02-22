<?php
/**
 * Plugin Name: Show/Hide Section
 * Plugin URI: https://github.com/happyprime/show-hide-section
 * Description: Add an interactive heading that enables users to reveal or hide its associated content.
 * Author: Happy Prime
 * Author URI: https://happyprime.co/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

require_once __DIR__ . '/includes/block.php';
