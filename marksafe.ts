const tagSep = 'fgkjgiuegigu598';
const attrSep = 'r98w938g737gy247';

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
    /**
     * Get or set the list of allowed tag names.
     */
    static tags = new Set([
        'a', 'img', 'figure', 'p', 'em', 'b', 'mark', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'ul', 
        'ol', 'details', 'summary', 'table', 'thead', 'tbody', 'tfoot', 'tr', 'td', 'dl', 'dt', 'dd', 
        'span', 'div', 'small', 'sup', 'sub', 'abbr', 'aside', 'section', 'article', 'button', 
        'blockquote', 'q', 'address', 'code', 'header', 'footer', 'hr'
    ]);
    /**
     * Get or set the list of self-closing tags like `img` and `br`.
     */
    static selfTags = new Set(['img', 'hr']);   // form field tags like input are not allowed.

    /**
     * Get or set the list of allowed attribute names.
     */
    static attrs = new Set([
        'href', 'src', 'class', 'style', 'width', 'height', 'alt', 'colspan', 'rowspan', 'title'
    ]);

    /**
     * Separator for consecutive elements of the same type.
     */
    static tagSep = ';;';

    /**
     * Separator for attributes. Also separates the last attribute from the text content. 
     */
    static attrSep = ',,';
    static shorthands = {
        '[*]': '[strong]',
        '[/*]': '[/strong]',
        '[bq]': '[blockquote]',
        '[/bq]': '[/blockquote]',
        '[uli]': '[ul][li]',
        '[/uli]': '[/li][/ul]',
        '[oli]': '[ol][li]',
        '[/oli]': '[/li][/ol]'
    };
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
     * @param element The element to process
     */
    static process(element: Element) {
        const allowed = this.tags;
        const disallowed = element.tagName;
        let text = element.textContent.replaceAll(`\\${this.tagSep}`, tagSep).replaceAll(`\\${this.attrSep}`, attrSep);
        for (let [key, value] of Object.entries(this.shorthands)) {
            text = text.replaceAll(key, value);
        }
        for (let tag of allowed) {
            if (tag.toUpperCase() === disallowed) continue;
            text = this.replace(text, tag);
        }
        element.innerHTML = text;
        this.processElement(element, true);
        return element;   // returns the same input so we can use this transparently.
    }
    /**
     * Replaces the opening ([tag]) and closing ([/tag]) square brackets for the specified tag in the text 
     * with the angle brackets. This does not process attributes.
     * 
     * @param text The raw or partially processed Marksafe text before the tag is processed
     * @param tag  The tag to be processed (converted from Marksafe syntax to HTML syntax)
     * @returns The same text with all instances of the tag converted from Marksafe Syntax to HTML syntax
     */
    static replace(text: string, tag: string): string {
        const tempTag = this.selfTags.has(tag)? 'span': '';
        return text.replaceAll(`[${tag}]`, `<${tempTag || tag}${tempTag? ` data-real-tag="${tag}"`: ''}>`).replaceAll(`[/${tag}]`, `</${tempTag || tag}>`);
    }
    /**
     * Runs final processing of the elements (recursively from the top down) first to replace any intermediate 
     * elements with their correct final elements and then to proccess all attributes and remove them from 
     * the text content where they are specified.
     * 
     * @param element The element to process
     * @param top Whether this is the top-level element.
     */
    static processElement(element: Element, top=false) {
        // potentially convert into 1 (this.selfTags) or multiple elements (this.tagSep)
        const tag = element.getAttribute('data-real-tag') || element.tagName.toLowerCase();
        
        const children = [...element.children];
        for (let child of children) this.processElement(child);

        const elements: Element[] = [];
        let lastElement: Element = document.createElement(tag);
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
            } else {
                lastElement.append(child);
            }
        }
        if (!top) element.replaceWith(...elements);
        else {
            element.replaceChildren(...lastElement.childNodes);
        }
    }
    /**
     * Processes and xxtracts any attributes specified within the text content of the element. 
     * 
     * @param element The element to process
     * @param text The input textContent of the element containing attributes and/or intended textContent.
     */
    static processAttrs(element: Element, text: string) {
        const parts = text.split(this.attrSep);
        let name: string, value: string[];
        for (let i = 0; i < parts.length - 1; i++) {
            [name, ...value] = parts[i].split('=');
            name = name.trim();
            if (this.attrs.has(name)) element.setAttribute(name, value.join('=').replaceAll(tagSep, this.tagSep).replaceAll(attrSep, this.attrSep));
        }
        const lastPart = parts[parts.length - 1];
        if (lastPart.trim()) element.append(lastPart.replaceAll(tagSep, this.tagSep).replaceAll(attrSep, this.attrSep));   // set textContent...
    }
}

