/**
 * A powerful, safe and simple library to enable rich user-generated text in
 * web applications
 *
 * @module
 */
/**
 * The Marksafe singleton class for parsing marksafe text. Text should already be escaped
 * and only contain markasfe tag specifies. Text should be the textContent of an
 * element so we simply call {@link Marksafe.process} with the element to convert the
 * textContent to innerHTML.
 *
 */
export class Marksafe {
    static { this.tags = new Set([
        'a', 'figure', 'p', 'em', 'b', 'mark', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'ul',
        'ol', 'details', 'summary', 'table', 'thead', 'tbody', 'tr', 'td', 'dl', 'dt', 'dd', 'span',
        'div', 'small', 'sup', 'sub', 'abbr', 'aside', 'section', 'article', 'button',
        'blockquote', 'q', 'address', 'code'
    ]); }
    /**
     * Converts the marksafe-formated textContent of the element into HTML. Marksafe is
     * simply HTML with no attributes, angle brackets (`< and >`) replaced with square brackets
     * (`[ and ]`) and a set of permitted tags.
     *
     * @example
     * import { Marksafe } from 'marksafe'
     * document.body.innerHTML = `
     * <main>
     *   [p]
     *      This is the first paragraph. &quot;p&quot; tag is allowed
     *   [/p]
     *   [p]
     *       Links like [a]https://github.com/mksunny1/marksafe|this[/a] can be present.
     *   [/p]
     * </main>
     * `
     * Marksafe.process(document.querySelector('main'));
     * console.log(document.querySelector('a').textContent);  // this
     * console.log(document.querySelector('a').href);         // https://github.com/mksunny1/marksafe
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
            text = text.replaceAll(`[${tag}]`, `<${tag}>`).replaceAll(`[/${tag}]`, `</${tag}>`);
        }
        element.innerHTML = text;
        for (let tag of allowed) {
            if (tag.toUpperCase() === disallowed)
                continue;
            if (Reflect.has(this, tag))
                this[tag](element.querySelectorAll(tag));
        }
        return element; // returns the same input so we can use this transparently.
    }
    /**
     * Special post-processing for links to set the href and link text.
     *
     * @param links
     */
    static a(links) {
        for (let link of links) {
            const props = link.innerHTML.split('|');
            link.setAttribute('href', props[0]);
            link.textContent = (props.length > 1) ? props[1] : props[0];
        }
    }
    /**
     * Special post-processing for images to set the src and optional alt
     * and swap the figure elements for img elements.
     *
     * @param figures
     */
    static figure(figures) {
        for (let fig of figures) {
            const props = fig.innerHTML.split('|');
            const img = document.createElement('img');
            img.setAttribute('src', props[0]);
            if (props.length > 1) {
                img.setAttribute('alt', props[1]);
            }
            fig.replaceWith(img);
        }
    }
}
