<?php
/**
 * Seeds demo content for local development.
 *
 * Runs through `npm run env:seed`. A page that already exists is left alone,
 * so edits made in the editor survive a restart. Delete a page to reseed it.
 *
 * @package show-hide-section-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

switch_theme( 'twentytwentyfive' );

global $wp_rewrite;
$wp_rewrite->set_permalink_structure( '/%postname%/' );
flush_rewrite_rules();

$hp_shs_pages = [
	'show-hide-faq'       => [ 'Show / Hide: FAQ with open all', 'faq.html' ],
	'show-hide-anchors'   => [ 'Show / Hide: anchors without a toggle', 'anchors.html' ],
	'show-hide-no-script' => [ 'Show / Hide: no front-end script', 'no-script.html' ],
	'show-hide-2x-markup' => [ 'Show / Hide: 2.x markup', 'legacy-2x.html' ],
];

foreach ( $hp_shs_pages as $hp_shs_slug => $hp_shs_page ) {
	$hp_shs_existing = get_page_by_path( $hp_shs_slug );

	if ( $hp_shs_existing ) {
		WP_CLI::log( 'Exists:  ' . get_permalink( $hp_shs_existing ) );
		continue;
	}

	// wp_insert_post() unslashes its input, which would break block attribute JSON.
	$hp_shs_id = wp_insert_post(
		wp_slash(
			[
				'post_type'    => 'page',
				'post_status'  => 'publish',
				'post_name'    => $hp_shs_slug,
				'post_title'   => $hp_shs_page[0],
				'post_content' => (string) file_get_contents( __DIR__ . '/content/' . $hp_shs_page[1] ),
			]
		),
		true
	);

	if ( is_wp_error( $hp_shs_id ) ) {
		WP_CLI::warning( $hp_shs_id->get_error_message() );
		continue;
	}

	WP_CLI::log( 'Created: ' . get_permalink( $hp_shs_id ) );
}
