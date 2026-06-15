# Show / Hide Section Block

Display an accessible show/hide interface with details and summary elements.

## Description

Show / Hide Section Block provides four blocks that are used to display a group of `<details>` elements that each contain a `<summary>` and an arbitrary number of additional blocks.

* The Show Hide Group block is a wrapping `<div>`.
* The Show Hide Section block is a wrapping `<details>`. One or more of these blocks is added to a Show Hide Group block.
* The Show Hide Summary block contains the content for a `<summary>` tag. One of these blocks is inside each Show Hide Section block.
* The Show Hide Details block contains arbitrary content. One of these blocks is added inside each Show Hide Section block.

The HTML output for an individual section is:

	<!-- Each section block has a details element. -->
	<details class="wp-block-happyprime-show-hide-section">
		<!-- Each details element has a summary and additional, collapsible content. -->
		<summary class="wp-block-happyprime-show-hide-summary">Summary text</summary>
		<!-- Additional inner blocks of any type are populated here. -->
	</details>

The HTML output for the group is:

	<div class="wp-block-happyprime-show-hide-group">
		<!-- Optional based on attribute -->
		<button class="toggle-all" aria-expanded="false">Open all</button>
		<details class="wp-block-happyprime-show-hide-section">
			<summary class="wp-block-happyprime-show-hide-summary"></summary>
			<!-- Additional blocks to be shown/hidden -->
		</details>
		<details class="wp-block-happyprime-show-hide-section">
			<summary class="wp-block-happyprime-show-hide-summary"></summary>
			<!-- Additional blocks to be shown hidden -->
		</details>
		<!-- Additional section blocks -->
	</div>

An option is provided in the block's side panel to toggle an "Open all"/"Close all" button. If this is toggled on for a block, an additional `<button>` element will be inserted and JavaScript will be used on the front-end to control the show/hide behavior of all `<details>` elements in the group at once.

If the toggle is off, no JavaScript is loaded on the front end and only the browser's default behavior is used for opening and closing `<details>` elements.

## Development & testing

A local WordPress environment is provided via [`@wordpress/env`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) on port `8891`:

	npm install
	npm run build
	npm run env:start

End-to-end tests use [Playwright](https://playwright.dev/) and assert the core functionality in both the editor and on the front end (the block scaffolds and publishes, the native `<details>`/`<summary>` interface toggles, and the group "Open all"/"Close all" control works):

	npx playwright install chromium   # first run only
	npm run test:e2e

`npm run test:e2e` starts wp-env automatically if it is not already running and stops it again afterward; an environment started manually with `npm run env:start` is reused and left running.

## Changelog

### 3.1.0

* Automatically open an associated `<details>` element when its anchor is used in a URL.
* Update dependencies.
* Confirm compatibility with WordPress 6.8.
* Confirm license in plugin header.

### 3.0.0

* Refactor block markup to improve editorial experience and formatting options.
* Introduce `happyprime/show-hide-summary` block to manage `<summary>` content.
* Introduce `happyprime/show-hide-details` block to manage remaningin `<details>` content.
* Upgrade `happyprime/show-hide-group` and `happyprime/show-hide-section` blocks to API v3.
* Add a deprecation routine to transform 2.0.x block markup into the new format.
* Replace `@wordpress/scripts` with slimmer build configuration.
* Bump minimum WordPress version to 6.4; confirm compatibility with 6.7.

### 2.0.3

* Fix an issue where the front-end script was enqueued twice.

### 2.0.2

* Fix an issue preventing Open All toggle from working in Chrome.
* Update `@wordpress/scripts` dependency to 26.3.0.
* Improve block organization, use of `block.json`.

### 2.0.1

* Add a variety of `supports` options to `block.json` so that core styles can be applied as expected.
* Improve asset loading so that the front-end script is only enqueued when the block is in use **and** when the the open/close all option is selected.
* Add languages directory, POT file for translations.
* Update `@wordpress/scripts` dependency to 25.5.0

### 2.0.0

Initial public release.
