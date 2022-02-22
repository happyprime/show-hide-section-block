# Show/Hide Section Block

An interactive heading that enables users to reveal or hide its associated content.

## About

This is a WordPress plugin that adds a Show/Hide Section block to the Block Editor.

The block allows users to add a section heading with an appropriate level (`h2` through `h5` are available) and associated content. The display of the associated content can be displayed or hidden by interacting with the heading.

The markup output by the block is based on the [W3 Accordion design pattern](https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html). It starts out as the following:
```html
<h{level} class="show-hide-toggle">Heading</h{level}>
<div class="show-hide-panel">
	<p>Content.</p>
</div>
```
If JavaScript is disabled, all the content is simply displayed.

If JavaScript is enabled, the markup is progressively enhanced:
```html
<h{level} class="show-hide-toggle">
	<button
		id="show-hide-toggle-{n}"
		aria-controls="show-hide-section-{n}"
		aria-expanded="true"
	>Heading</button>
</h{level}>
<div
	class="show-hide-panel"
	aria-labelledby="show-hide-toggle-{n}"
	id="show-hide-section-{n}"
	role="region"
>
	<p>Content.</p>
</div>
```

If more than one Show/Hide Section block is included on a page, a master toggle button is added above the first Show/Hide Section block:
```html
<h{level} class="show-hide-toggle_master">
	<button
		aria-expanded="false"
		aria-controls="show-hide-section-0 show-hide-section-1" <!-- and so on for each block -->
	>Open All</button>
</h{level}>
```

The section headings are navigable by keyboard, providing the same support as the [W3 Accordion](https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html#kbd_label).
