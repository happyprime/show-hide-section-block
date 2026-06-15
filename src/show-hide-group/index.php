<?php
/**
 * Manage the block.
 *
 * @package show-hide-section-block
 */

namespace HappyPrime\Blocks\ShowHideGroup;

add_action( 'init', __NAMESPACE__ . '\register' );
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\deregister_default', 11 );
add_action( 'enqueue_block_assets', __NAMESPACE__ . '\register_assets', 2 );
add_filter( 'pre_render_block', __NAMESPACE__ . '\maybe_enqueue_script', 10, 2 );

/**
 * Register the block.
 */
function register(): void {
	register_block_type_from_metadata( HP_SHS_PLUGIN_DIR . '/build/show-hide-group' );
}

/**
 * Deregister the default script handle added via WordPress via block.json.
 */
function deregister_default(): void {
	wp_deregister_script( 'happyprime-show-hide-group-view-script' );
}

/**
 * Make front-end scripting available for enqueue if the block is in use.
 */
function register_assets(): void {
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

/**
 * Enqueue the toggle script if a Show / Hide Group block exists and the toggle
 * attribute is set to true.
 *
 * @param string|null                                                                    $pre_render   Content if previously rendered, otherwise null.
 * @param array{blockName: string|null, attrs?: array<string, mixed>, innerHTML: string} $parsed_block The parsed block data.
 * @return string|null Unmodified.
 */
function maybe_enqueue_script( $pre_render, array $parsed_block ) {
	$enqueued = false;

	if ( 'happyprime/show-hide-group' !== $parsed_block['blockName'] && 'happyprime/show-hide-section' !== $parsed_block['blockName'] ) {
		return $pre_render;
	}

	// If a group has the toggle attribute, enqueue the script to support
	// toggle all behaviour.
	if ( 'happyprime/show-hide-group' === $parsed_block['blockName'] && isset( $parsed_block['attrs']['hasToggle'] ) && $parsed_block['attrs']['hasToggle'] ) {
		wp_enqueue_script( 'happyprime-show-hide-group-view' );
		$enqueued = true;
	} elseif ( 'happyprime/show-hide-section' === $parsed_block['blockName'] ) {
		$inner_html = new \WP_HTML_Tag_Processor( $parsed_block['innerHTML'] );

		// If a section has an ID attribute, enqueue the script to support
		// improved hash navigation.
		if ( $inner_html->next_tag( [ 'id' => true ] ) ) {
			wp_enqueue_script( 'happyprime-show-hide-section-view' );
			$enqueued = true;
		}
	}

	// If we've enqueued the script, remove the filter to avoid unnecessary processing.
	if ( $enqueued ) {
		remove_filter( 'pre_render_block', __NAMESPACE__ . '\maybe_enqueue_script', 10 );
	}

	return $pre_render;
}
