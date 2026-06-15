/**
 * Playwright global setup.
 *
 * Ensures a wp-env instance is running before the suite. If one is already up
 * (e.g. from a manual `npm run env:start` for interactive work), it is reused
 * and left running. If we start it here, a marker file is written so the
 * matching teardown knows to stop it again — so `npm run test:e2e` leaves the
 * machine as it found it, while a manually started env stays put.
 */
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

export const STARTED_MARKER = 'tests/e2e/.env-started-by-tests';

const isUp = async ( url: string ): Promise< boolean > => {
	try {
		const response = await fetch( url, { redirect: 'manual' } );
		return response.status > 0;
	} catch {
		return false;
	}
};

export default async function globalSetup() {
	const url = process.env.WP_BASE_URL || 'http://localhost:8891';

	if ( ! ( await isUp( url ) ) ) {
		execSync( 'npm run env:start', { stdio: 'inherit' } );
		writeFileSync( STARTED_MARKER, 'started by playwright global setup\n' );
	}

	// Ensure a known-good theme is active. The env can otherwise be left on an
	// arbitrary (or broken) theme, which makes the frontend rendering tests
	// fail with blank pages unrelated to the plugin under test. Done over
	// wp-cli (rather than the REST/HTML helper) so it stays reliable across
	// WordPress versions. Twenty Twenty-Five ships with core, so no download.
	execSync( 'npm run --silent env:cli -- wp theme activate twentytwentyfive', {
		stdio: 'inherit',
	} );
}
