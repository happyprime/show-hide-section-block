# Code Audit: Show / Hide Section Block Plugin (v3.1.0)

## 1. BUG — Wrong script handle for hash navigation enqueue

**File:** `src/show-hide-group/index.php:74`

The `maybe_enqueue_script()` function enqueues `'happyprime-show-hide-section-view'`
when a section has an ID attribute, but this handle is never registered. The registered
handle is `'happyprime-show-hide-group-view'` (registered at line 40). This means hash
navigation will never work on the frontend — the view script will not be loaded when a
section has an anchor but the group doesn't have `hasToggle` enabled.

```php
// Line 74 — incorrect handle:
wp_enqueue_script( 'happyprime-show-hide-section-view' );

// Should be:
wp_enqueue_script( 'happyprime-show-hide-group-view' );
```

## 2. BUG — Double `<summary>` nesting in saved markup

**File:** `src/show-hide-summary/index.js:35-38`

The `Save` component wraps output in `<summary {...useBlockProps.save()}>` and then uses
`<RichText.Content tag={'summary'}>` inside it. This produces invalid nested HTML:
`<summary><summary>content</summary></summary>`. The inner `RichText.Content` tag should
be something like `span` or `div`, or the `tag` prop should be omitted.

```jsx
// Current (produces nested <summary><summary>):
<summary {...useBlockProps.save()}>
    <RichText.Content tag={'summary'} value={summary} />
</summary>

// Should use a non-summary inner tag:
<summary {...useBlockProps.save()}>
    <RichText.Content value={summary} />
</summary>
```

## 3. BUG — `ariaExpanded` type mismatch breaks first toggle click in editor

**File:** `src/show-hide-group/index.js:29`

The JSX `aria-expanded="false"` sets the DOM property `ariaExpanded` to the string
`"false"`. The comparison `false === evt.target.ariaExpanded` uses strict equality between
a boolean and a string, which will never be `true`. On the first click, the else branch
runs (closing sections that are already closed and resetting text to "Open all"). The
toggle only starts working correctly on the second click, after `ariaExpanded` has been
reassigned to a boolean.

```js
// Current — strict comparison between boolean and string:
if (false === evt.target.ariaExpanded) {

// Should compare against the string value:
if ('false' === evt.target.ariaExpanded || false === evt.target.ariaExpanded) {
```

A more robust approach would be to track the expanded state in React state rather than
reading from the DOM.

## 4. BUG — `isOpen` attribute defined but has no effect

**Files:** `src/show-hide-section/block.json:12-15`, `src/show-hide-section/index.js:11`

The `isOpen` attribute is declared in `block.json` and destructured in `Edit`, but it's
never used. The `Save` component renders `<details>` without ever setting the `open`
attribute based on `isOpen`. Meanwhile, the group's `toggleAllSections` in
`src/show-hide-group/index.js:31-33` dispatches `updateBlockAttributes` to set `isOpen`
on child blocks — but since `isOpen` is never read in Section's Edit, these updates have
no visible effect in the editor.

## 5. I18N — Hardcoded English strings in frontend view script

**File:** `src/show-hide-group/view.js:19,25`

The toggle button text `'Close All'` and `'Open All'` are hardcoded English strings. The
editor-side code correctly uses `__('Open all', 'show-hide-section-block')`, but the
frontend code that runs on the actual page does not use `wp.i18n.__()`. This means
translated sites will see English text on the frontend toggle button.

There is also a casing inconsistency: editor uses "Open all" / "Close all" (lowercase
"a") while the frontend uses "Open All" / "Close All" (uppercase "A").

## 6. SECURITY — Unsanitized `location.hash` in `querySelector`

**File:** `src/show-hide-group/view.js:44-46`

`window.location.hash` is interpolated directly into a `document.querySelector()` call.
If the hash contains CSS selector meta-characters (e.g., `#foo:bar` or `#foo[attr]`),
`querySelector` will throw a `DOMException`. Using `CSS.escape()` on the hash value
(minus the `#` prefix) or switching to `document.getElementById()` would prevent this.

```js
// Current — can throw on malformed hashes:
document.querySelector(
    `details.wp-block-happyprime-show-hide-section${window.location.hash}`
);

// Safer approach:
const hash = window.location.hash.substring(1);
if (hash) {
    const el = document.getElementById(hash);
    if (el && el.matches('details.wp-block-happyprime-show-hide-section')) {
        el.setAttribute('open', 'true');
    }
}
```

## 7. CODE QUALITY — `WP_HTML_Tag_Processor` usage may not filter by ID

**File:** `src/show-hide-group/index.php:69-73`

`WP_HTML_Tag_Processor::next_tag()` is called with `[ 'id' => true ]`. The documented
filter keys for `next_tag()` are `tag_name`, `class_name`, `tag_closers`, and
`breadcrumbs`. Passing `id => true` is not a documented query filter and may be silently
ignored, causing the condition to match any tag regardless of whether it has an `id`
attribute. If so, the script would be enqueued for all section blocks, not just those
with anchors.

A correct approach would be:

```php
$inner_html = new \WP_HTML_Tag_Processor( $parsed_block['innerHTML'] );
if ( $inner_html->next_tag() && null !== $inner_html->get_attribute( 'id' ) ) {
    wp_enqueue_script( 'happyprime-show-hide-group-view' );
    $enqueued = true;
}
```

## 8. CODE QUALITY — Unused destructured variables

**File:** `src/show-hide-section/index.js:12-13`

Both `setAttributes` and `isSelected` are destructured from props but never used in the
`Edit` component. These should be removed to avoid dead code and potential linting
warnings.

## 9. CODE QUALITY — Missing `useBlockProps` in Details block editor

**File:** `src/show-hide-details/index.js:16-20`

The Details block's `Edit` component doesn't use `useBlockProps()`. It wraps
`InnerBlocks` in a bare fragment (`<>...</>`), which means it won't receive the standard
WordPress block editor wrapper attributes (block ID class, data attributes for selection,
etc.). Every other block in this plugin uses `useBlockProps()` in its Edit component.

## 10. BUILD — Custom webpack config instead of `@wordpress/scripts`

**File:** `webpack.config.js`

The plugin uses a fully custom webpack configuration with manually configured Babel
presets, TerserPlugin, CopyPlugin, and DependencyExtractionWebpackPlugin. The standard
`@wordpress/scripts` package provides all of this out of the box with less configuration,
automatic updates when WordPress block API conventions change, and built-in support for
features like hot module replacement, CSS extraction, and source maps. Migrating to
`@wordpress/scripts` would reduce the maintenance surface and keep the build pipeline
aligned with WordPress core conventions.

Additionally, the explicit `terser-webpack-plugin` dependency is unnecessary — Webpack 5
includes TerserPlugin by default.

## Summary by severity

| Severity | # | Finding |
|----------|---|---------|
| Bug | 1 | Wrong script handle breaks hash navigation |
| Bug | 2 | Nested `<summary>` tags in saved HTML |
| Bug | 3 | `ariaExpanded` type mismatch on first click |
| Bug | 4 | `isOpen` attribute has no effect |
| I18N | 5 | Hardcoded English in frontend view.js |
| Security | 6 | Unsanitized hash in querySelector |
| Quality | 7 | WP_HTML_Tag_Processor may not filter by ID |
| Quality | 8 | Unused destructured variables |
| Quality | 9 | Missing useBlockProps in Details Edit |
| Build | 10 | Custom webpack vs @wordpress/scripts |
