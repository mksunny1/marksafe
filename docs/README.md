**marksafe** • [**Docs**](globals.md)

***

# Marksafe

Marksafe is a simple and pragmatic library for allowing user-generated content in a web application. It is an alternative to makdown which already guarantees safety of generated markup without the need for HTML sanitizers. 

Marksafe is almost like regular HTML but maintains an allow-list of tag names and disallows manual entry of attributes. Marksafe internally generates the attributes of elements that require them to function, such as `<a>` and `img`. 

Due to how marksafe functions, you have to run it in the browser. But fear not because this is a tiny library that weighs in at 2kb unminified.

## Installation

### NPM

`npm i marksafe`

## Importing

### NPM

`import { Marksafe } from "marksafe"`

### CDN

`import { Marksafe } from "https://cdn.jsdelivr.net/npm/marksafe/marksafe.js"`

## Usage

```html
    <section id="ms">
        [h3]
            This is escaped Marksafe text. &quot;h1&quot; tag is allowed
        [/h3]
        [p]
            This is the first paragraph. &quot;p&quot; tag is allowed
        [/p]
        [p]
            Links like [a]https://github.com/mksunny1/marksafe|this[/a] can be present.
        [/p]
        [p]
            Images like [figure]https://github.com/mksunny1/marksafe/logo.png|marksafe logo[/figure] can also be present.
        [/p]
        [p]
            ... Many more tags are allowed
        [/p]
        [section]
            Althogh [b]section[/b] tag is allowed, this will not parse because the whole marksafe content is inside a [b]section[/b]. As a result, parts of the section outside the internal nodes will appear as [b]text[/b] nodes in the generated markup instead of being part of an output [b]section[/b] node.
        [/section]
        [footer]
            End of marksafe content
        [/footer]
    </section>

```

```js
    Marksafe.tags.add('footer');    // we can trivially add/remove allowed tags
    Marksafe.process(document.querySelector('#ms'));
```

## Documentation

The above example already shows everything you need to know about using marksafe. These are the points to note:

1. Use marksafe in the browser.
2. Marksafe is just html with the angle brackets `(< and >)` replaced with square brackets `([ and ])`. 
3. Every HTML thing (like quotes) should be escaped. Just escape the whole marksafe code as untrusted HTML.
4. Put link urls as the link text. If you want a different text content to show up in the generated markup, place it after the url separated by `|`.
5. Do the same thing for images placing the `src` (and optionally `alt`) as the text content of a `figure` element. We use `figure` instead of `img` because we can close a `figure`.
6. Put the whole marksafe code inside any element that is not present within the marksafe code. For example if you put marksafe inside a `div`, any `divs` inside the marksafe code will render as simple text nodes.
7. Just call `Marksafe.process` with the containing element as the sole argument. The previously escaped textContent inside the element becomes innerHTML instead.
8. To learn more you can read the [API docs](https://github.com/mksunny1/marksafe/blob/main/docs/classes/Marksafe.md) or the source code which is under 100 lines. You can easily modify the allow-list of tags and add post-processing for specific tags using the JavaScript API. Post-processing is how we manage to sneak in the `href` attribute for `a` elements, convert `figure` elements to valid image elements and so on.
