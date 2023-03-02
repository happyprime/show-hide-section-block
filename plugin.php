<?php
/**
 * Plugin Name: Show / Hide Section Block
 * Description: Display an accessible show/hide interface with details and summary elements.
 * Version: 2.0.0
 * Plugin URI: https://github.com/happyprime/show-hide-section
 * Author: Happy Prime
 * Author URI: https://happyprime.co/
 * Text Domain: show-hide-section
 * Domain Path: /languages
 * Requires at least: 6.1
 * Requires PHP: 7.4
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * @package show-hide-section
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

require_once __DIR__ . '/includes/block.php';
