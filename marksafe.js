/**
 * A powerful, safe and simple library to enable rich user-generated text in
 * web applications
 *
 * @module
 */
/**
 * The Marksafe singleton class for parsing marksafe text. Text should already be escaped
 * and only contain markasfe tag specifiers. Text should be the textContent of an
 * element so we simply call {@link Marksafe.process} with the element to convert the
 * textContent to innerHTML.
 *
 */
export class Marksafe {
    static { this.tags = new Set([
        'a', 'img', 'figure', 'p', 'em', 'b', 'mark', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'ul',
        'ol', 'details', 'summary', 'table', 'thead', 'tbody', 'tfoot', 'tr', 'td', 'dl', 'dt', 'dd',
        'span', 'div', 'small', 'sup', 'sub', 'abbr', 'aside', 'section', 'article', 'button',
        'blockquote', 'q', 'address', 'code', 'header', 'footer', 'hr'
    ]); }
    static { this.selfTags = new Set(['img', 'hr']); } // form field tags like input are not allowed.
    static { this.attrs = new Set([
        'href', 'src', 'class', 'style', 'width', 'height', 'alt', 'colspan', 'rowspan', 'title'
    ]); }
    static { this.tagSep = ';;'; }
    static { this.attrSep = ',,'; }
    /**
     * Converts the marksafe-formated textContent of the element into HTML. Marksafe is
     * simply HTML with attributes specified within the content, angle
     * brackets (`< and >`) replaced with square brackets
     * (`[ and ]`) and only a set of permitted tags and attributes.
     * It also features a tag separator to make the code more concise.
     *
     * @example
     * import { Marksafe } from 'marksafe'
     * document.body.innerHTML = `
     * <main>
     *   [p]
     *      This is the first paragraph. &quot;p&quot; tag is allowed
     *   [/p]
     *   [p]
     *       Links like [a]href=https://github.com/mksunny1/marksafe2,,this[/a] can be present.
     *   ;;
     *       Yet another paragraph
     *   ;;
     *       class=bolder,,And another one with a class attribute...
     *   [/p]
     *   [img]
     *       src=https://images.com/first.png,,alt=First image,,width=100%,,height=200px,,
     *   [/img]
     * </main>
     * `
     * Marksafe.process(document.querySelector('main'));
     * console.log(document.querySelector('a').textContent);  // this
     * console.log(document.querySelector('a').href);         // https://github.com/mksunny1/marksafe2
     *
     * @param element
     */
    static process(element) {
        const allowed = this.tags;
        const disallowed = element.tagName;
        let text = element.textContent;
        for (let tag of allowed) {
            if (tag.toUpperCase() === disallowed)
                continue;
            text = this.replace(text, tag);
        }
        element.innerHTML = text;
        this.processElement(element);
        return element; // returns the same input so we can use this transparently.
    }
    static replace(text, tag) {
        const tempTag = this.selfTags.has(tag) ? 'span' : '';
        return text.replaceAll(`[${tag}]`, `<${tempTag || tag}${tempTag ? ` data-real-tag="${tag}"` : ''}>`).replaceAll(`[/${tag}]`, `</${tempTag || tag}>`);
    }
    static processElement(element) {
        // potentially convert into 1 (this.selfTags) or multiple elements (this.tagSep)
        const tag = element.getAttribute('data-real-tag') || element.tagName.toLowerCase();
        const children = [...element.children];
        for (let child of children)
            this.processElement(child);
        const elements = [];
        let lastElement = document.createElement(tag);
        elements.push(lastElement);
        const childNodes = [...element.childNodes];
        for (let child of childNodes) {
            if (!(child instanceof Element)) {
                const parts = child.textContent.split(this.tagSep);
                this.processAttrs(lastElement, parts[0]);
                for (let i = 1; i < parts.length; i++) {
                    lastElement = document.createElement(tag);
                    this.processAttrs(lastElement, parts[i]);
                    elements.push(lastElement);
                }
            }
            else {
                lastElement.append(child);
            }
        }
        element.replaceWith(...elements);
    }
    static processAttrs(element, text) {
        const parts = text.split(this.attrSep);
        let name, value;
        for (let i = 0; i < parts.length - 1; i++) {
            [name, ...value] = parts[i].split('=');
            name = name.trim();
            if (this.attrs.has(name))
                element.setAttribute(name, value.join('='));
        }
        const lastPart = parts[parts.length - 1];
        if (lastPart.trim())
            element.append(lastPart); // set textContent...
    }
}
