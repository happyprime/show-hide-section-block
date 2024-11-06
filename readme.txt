# Show / Hide Section Block
Contributors: happyprime, jeremyfelt, slocker, philcable
Tags: collapsible, details, summary
Requires at least: 6.4
Tested up to: 6.7
Stable tag: 3.0.0
License: GPLv2 or later
Requires PHP: 7.4

Display an accessible show/hide interface with details and summary elements.

## Description

Show / Hide Section Block provides two blocks: a Show / Hide Group block that is populated with one or more Show / Hide Section blocks.

The HTML output for an individual section is:

	<!-- Each section block has a details element. -->
	<details>
		<!-- Each details element has a summary and additional, collapsible content. -->
		<summary>Summary text</summary>
		<!-- Additional inner blocks of any type are populated here. -->
	</details>

The HTML output for the group is:

	<div>
		<details>
			<summary></summary>
			<!-- Additional blocks to be shown/hidden -->
		</details>
		<details>
			<summary></summary>
			<!-- Additional blocks to be shown hidden -->
		</details>
		<!-- Additional section blocks -->
	</div>

An option is provided in the block's side panel to toggle an "Open all"/"Close all" button. If this is toggled on for a block, an additional `<button>` element will be inserted and JavaScript will be used on the front-end to control the show/hide behavior of all `<details>` elements in the group at once.

If the toggle is off, no JavaScript is loaded on the front end.

## Changelog

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

### 2.0.0

Initial public release.
