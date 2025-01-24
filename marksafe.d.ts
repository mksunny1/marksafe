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
export declare class Marksafe {
    static tags: Set<string>;
    static selfTags: Set<string>;
    static attrs: Set<string>;
    static tagSep: string;
    static attrSep: string;
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
    static process(element: Element): Element;
    static replace(text: string, tag: string): string;
    static processElement(element: Element, top?: boolean): void;
    static processAttrs(element: Element, text: string): void;
}
