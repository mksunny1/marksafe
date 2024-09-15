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
export declare class Marksafe {
    static tags: Set<string>;
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
    static process(element: Element): Element;
    /**
     * Special post-processing for links to set the href and link text.
     *
     * @param links
     */
    static a(links: HTMLAnchorElement[]): void;
    /**
     * Special post-processing for images to set the src and optional alt
     * and swap the figure elements for img elements.
     *
     * @param figures
     */
    static figure(figures: HTMLElement[]): void;
}
