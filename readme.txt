# Show / Hide Section Block
Contributors: jeremyfelt, slocker, philcable
Tags: collapsible, details, summary
Requires at least: 6.1
Tested up to: 6.1
Stable tag: 2.0.0
License: GPLv2 or later
Requires PHP: 7.4

Display an accessible show/hide interface with details and summary elements.

## Description

Show / Hide Section Block provides two blocks: a Show / Hide Group block that is populated with one or more Show / Hide Section blocks.

The HTML output is as so:

	<!-- Each section block has a details element. -->
	<details>
		<!-- Each details element has a summary and additional, collapsible content. -->
		<summary>Summary text</summary>
		<!-- Additional inner blocks of any type are populated here. -->
	</details>

If the option for an open/close all toggle is turned on, an additional `<button>` element will be added to the top of the group with JavaScript that opens and closes all of the `<details>` elements at once.

## Changelog

### 2.0.0

Initial public release.
