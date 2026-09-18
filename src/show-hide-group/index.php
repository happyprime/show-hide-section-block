<?php
/**
 * Manage the block.
 *
 * @package show-hide-section-block
 */

namespace HappyPrime\Blocks\ShowHideGroup;

const VIEW_SCRIPT_HANDLE = 'happyprime-show-hide-group-view';

add_action( 'init', __NAMESPACE__ . '\register' );
add_filter( 'pre_render_block', __NAMESPACE__ . '\maybe_enqueue_script', 10, 2 );

/**
 * Registers the block and its front-end script.
 *
 * The script is registered here instead of as `viewScript` in block.json.
 * WordPress enqueues a `viewScript` for every rendered block; this one is
 * only needed by some blocks, so it is enqueued in `maybe_enqueue_script()`.
 */
function register(): void {
	register_block_type_from_metadata( HP_SHS_PLUGIN_DIR . '/build/show-hide-group' );

	$asset_data = require HP_SHS_PLUGIN_DIR . '/build/show-hide-group/view.asset.php';

	wp_register_script(
		VIEW_SCRIPT_HANDLE,
		plugins_url( 'build/show-hide-group/view.js', HP_SHS_PLUGIN_FILE ),
		$asset_data['dependencies'],
		$asset_data['version'],
		true
	);
}

/**
 * Enqueues the front-end script when a rendered block needs it.
 *
 * A group needs it for its open/close all toggle. A section needs it so it
 * opens when its anchor is in the URL.
 *
 * @param string|null          $pre_render   Content if previously rendered, otherwise null.
 * @param array<string, mixed> $parsed_block The parsed block data.
 * @return string|null Unmodified.
 */
function maybe_enqueue_script( $pre_render, array $parsed_block ) {
	$block_name = $parsed_block['blockName'] ?? null;

	if ( 'happyprime/show-hide-group' === $block_name ) {
		$needs_script = ! empty( $parsed_block['attrs']['hasToggle'] );
	} elseif ( 'happyprime/show-hide-section' === $block_name ) {
		$needs_script = section_has_anchor( $parsed_block );
	} else {
		return $pre_render;
	}

	if ( $needs_script ) {
		wp_enqueue_script( VIEW_SCRIPT_HANDLE );

		// One enqueue covers the page; stop inspecting blocks.
		remove_filter( 'pre_render_block', __NAMESPACE__ . '\maybe_enqueue_script', 10 );
	}

	return $pre_render;
}

/**
 * Determines whether a section block's `<details>` element has an id.
 *
 * The anchor lives only in the saved HTML, not in the block's attributes,
 * so the markup is inspected.
 *
 * @param array<string, mixed> $parsed_block The parsed block data.
 * @return bool
 */
function section_has_anchor( array $parsed_block ): bool {
	$inner_html = $parsed_block['innerHTML'] ?? '';

	if ( ! is_string( $inner_html ) || '' === $inner_html ) {
		return false;
	}

	$tags = new \WP_HTML_Tag_Processor( $inner_html );

	if ( ! $tags->next_tag( 'details' ) ) {
		return false;
	}

	$id = $tags->get_attribute( 'id' );

	return is_string( $id ) && '' !== $id;
}
