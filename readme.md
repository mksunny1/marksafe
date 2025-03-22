# Marksafe - Secure, Concise, and Flexible Markup Language

Marksafe is a simple yet powerful syntax for writing HTML-like markup in a secure and concise way. It’s designed to make content authoring easier by providing a more flexible syntax and ensuring security by avoiding common pitfalls like XSS vulnerabilities.

## Features

- **Concise Syntax:** Shorten your code with simplified tag names and structure.
- **Security:** Prevent XSS vulnerabilities by avoiding angle brackets and special characters in HTML.
- **Compatibility:** Easily convert Marksafe to HTML and Markdown.
- **Shorthands:** Use shorthand notations for commonly used HTML elements, such as:
  - `[uli]` for `[ul][li]` (unordered list items)
  - `[oli]` for `[ol][li]` (ordered list items)
  - `[*]` for `[strong]` (bold text)
  - `[bq]` for `[blockquote]` (blockquote)

## Marksafe Syntax

### Basic Structure

- Tags are enclosed in square brackets `[ ]`.
- Closing tags are wrapped with `/` at the start: `[tag]` becomes `[/tag]`.
- Inline elements (like links) and block elements (like paragraphs) are treated similarly but retain their block-level behavior.

### Basic Elements
```marksafe
[h1]Heading[/h1]
[p]This is a paragraph.[/p]
[bq]This is a blockquote.[/bq]
```

### Lists
```marksafe
[uli]Item 1;;Item 2;;Item 3[/uli]
[oli]First;;Second;;Third[/oli]
```

### Links and Images
```marksafe
[a]href=example.com,,Click here[/a]
[img]src=example.jpg,,alt=An example image,,[/img]
```

### Tables
```marksafe
[table]
  [tr][th]Header 1;;Header 2;;Header 3[/th][/tr]
  [tr][td]Row 1 Col 1;;Row 1 Col 2;;Row 1 Col 3[/td][/tr]
  [tr][td]Row 2 Col 1;;Row 2 Col 2;;Row 2 Col 3[/td][/tr]
[/table]
```

### Example

```markdown
[h1]Shopping List[/h1]

[p]Here’s a list of things to buy:[/p]

[uli]Apples;;Bananas;;Carrots
  [uli]Carrot A;;Carrot B
    [uli]Carrot B1;;Carrot B2[/uli]
  [/uli]
;;Dates[/uli]

[p]For more details, visit [a]href=https://example.com,,Example[/a].[/p]

[bq]This is a blockquote.[/bq]
```

### Shorthands
- **`[uli]`** for `[ul][li]` (unordered list items).
- **`[oli]`** for `[ol][li]` (ordered list items).
- **`[*]`** for `[strong]` (bold text).
- **`[bq]`** for `[blockquote]` (blockquote).

### Self-closing Elements

- For elements like `img`, the attributes and content are written inside the tag with a special delimiter `,,` to separate them.

```markdown
[img]src=example.jpg,,alt=An example image,,[/img]
```

### Key Conversion Points

- The following tags are expanded for clarity:
  - `[uli]` expands to `[ul][li]`.
  - `[oli]` expands to `[ol][li]`.
  - `[*]` expands to `[strong]`.
  - `[bq]` expands to `[blockquote]`.

## Delimiters and Escaping
- Consecutive elements of the same type can be separated by `;;`.
- Attributes and content inside a tag are separated by `,,`.
- If a delimiter (`;;` or `,,`) is intended to be part of the content or an attribute, it must be escaped using `\`.

## Customization
Marksafe allows integrators to modify delimiters and add/remove shorthands as needed.

## Security Benefits

Marksafe's design eliminates the need for angle brackets, making it safe for embedding content without the risk of cross-site scripting (XSS) attacks. All attributes are safely handled within the body of the tag.

## Converting to HTML

Marksafe can be easily converted to valid HTML by replacing its syntax with standard HTML tags.

Example:

```markdown
[h1]Shopping List[/h1]

[uli]Apples;;Bananas;;Carrots;;Dates[/uli]
```

Converts to:

```html
<h1>Shopping List</h1>
<ul>
  <li>Apples</li>
  <li>Bananas</li>
  <li>Carrots</li>
  <li>Dates</li>
</ul>
```

## Converting to Markdown

You can also convert Marksafe to Markdown, which is useful for simpler content structures.

Example:

```markdown
[h1]Shopping List[/h1]
[uli]Apples;;Bananas;;Carrots;;Dates[/uli]
```

Converts to:

```markdown
# Shopping List
- Apples
- Bananas
- Carrots
- Dates
```

## Installation

To use Marksafe in your project:

1. Install via `npm`:

   ```bash
   npm install Marksafe
   ```

2. Alternatively, clone the repository:

   ```bash
   git clone https://github.com/mksunny1/marksafe.git
   ```

Once installed, you can integrate Marksafe into your content authoring or markdown processing systems.

## Usage

Marksafe currently only works in the browser. Here’s an example of how to process Marksafe code:

import { Marksafe } from 'Marksafe';

const input = "[h1]Hello, World![/h1]";
const output = Marksafe.process(input);
console.log(output); // Outputs: <h1>Hello, World!</h1>

Customizing Marksafe

Marksafe allows customization of default delimiters and shorthand syntax. For example, you can redefine the ,, delimiter or add/remove shorthand tags.


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
    [section]
        Althogh <b>section</b> tag is allowed, this will not parse because the whole marksafe2 content is inside a <b>section</b>. As a result, parts of the section outside the internal nodes will appear as <b>text</b> nodes in the generated markup instead of being part of an output <b>section</b> node.
    [/section]
    <footer>
        End of marksafe2 content
    </footer>
</section>

```

## API Documention

The complete API documentation can be found [here](https://github.com/mksunny1/marksafe/blob/main/docs/classes/Marksafe.md).

## License

MIT License. See [LICENSE](LICENSE) for details.

