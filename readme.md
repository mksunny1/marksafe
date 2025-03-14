# Marksafe

Marksafe is a simple and pragmatic library for allowing user-generated content in a web application. It is an alternative to makdown which already guarantees safety of generated markup without the need for HTML sanitizers. 

Marksafe is almost like regular HTML but maintains an allow-list of tag and attribute names. These can be easily modified to suit particular situations.

Due to how marksafe functions, you have to run it in the browser. But fear not because this is a tiny library that weighs in at only 5kb unminified.


## Installation

### NPM

`npm i marksafe`


## Importing

### NPM

`import { Marksafe } from "marksafe"`

### CDN

`import { Marksafe } from "https://cdn.jsdelivr.net/npm/marksafe/marksafe.js"`


## Usage

### Input
```html
    <section id="ms">
        [h3]
            This is escaped Marksafe text. &quot;h1&quot; tag is allowed
        [/h3]
        [p]
            This is the first paragraph. &quot;p&quot; tag is allowed
        ;;
            Links like [a]href=https://github.com/mksunny1/marksafe,,this[/a] can be present.
        ;;
            Images like [img]src=https://github.com/mksunny1/marksafe/logo.png,,alt=marksafe logo[/img] can also be present.
        ;;
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
    // Marksafe.tags.add('footer');    // we can trivially add/remove allowed tags, but this line is no longer needed since `footer` is allowed by default.
    Marksafe.process(document.querySelector('#ms'));
```

### Output
```html
<section id="ms">
    <h3>
        This is escaped Marksafe text. "h3" tag is allowed
    </h3>
    <p>
        This is the first paragraph. "p" tag is allowed
    </p>
    <p>
        Links like <a href="https://github.com/mksunny1/marksafe2">this</a> can be present.
    </p>
    <p>
        Images like <img src="https://github.com/mksunny1/marksafe2/logo.png" alt="marksafe2 logo"> can also be present.
    </p>
    <p>
        ... Many more tags are allowed
    </p>
    [section]
        Althogh <b>section</b> tag is allowed, this will not parse because the whole marksafe2 content is inside a <b>section</b>. As a result, parts of the section outside the internal nodes will appear as <b>text</b> nodes in the generated markup instead of being part of an output <b>section</b> node.
    [/section]
    <footer>
        End of marksafe2 content
    </footer>
</section>

```

## Documentation

The above example shows all you need to know to use marksafe effectively. These are the points to note:

1. Use marksafe in the browser.
2. Marksafe is just html with the angle brackets `(< and >)` replaced with square ones `([ and ])`. 
3. Every HTML thing (like quotes) should be escaped. Just escape the whole marksafe code as untrusted HTML.
4. Marksafe v2 now supports an allow-list of attribute names. Place the attributes in the content area separated by `Marksafe.attrSep (',,' by default)`. Use the same separator to separate the attributes from the actual content as shown in the example. If the final element only has attributes, the content you enter in marksafe code should end with the separator. For example `[div]class=flex,,title=The title,,[/div]` or  `[div]class=flex,,title=The title,,The content[/div]`. Attributes do not require quotes.
5. Marksafe v2 also now supports a shorthand syntax to reduce boilerplate, also seen in the example with the 4 `p` tags written like a single one. Another example is `[a]href=link1,,text 1;;href=link2,,text2[/a]`
6. Put the whole marksafe code inside any element that is not present within the marksafe code. For example if you put marksafe inside a `div`, any `divs` inside the marksafe code will render as simple text nodes.
7. Just call `Marksafe.process` with the containing element as the sole argument. The previously escaped textContent inside the element becomes innerHTML instead.
8. You can easily modify the allow-list of tags and attributes or even extend the Marksafe class to further customise Marksafe according to your needs.

To learn more you can read the [API docs](https://github.com/mksunny1/marksafe/blob/main/docs/classes/Marksafe.md) or the source code which is 115 lines. 

Cheers and kindly share and promote this. You can also [sponsor me on GitHub](https://github.com/sponsors/mksunny1). It's important...


