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
    /**
     * Get or set the list of allowed tag names.
     */
    static tags: Set<string>;
    /**
     * Get or set the list of self-closing tags like `img` and `br`.
     */
    static selfTags: Set<string>;
    /**
     * Get or set the list of allowed attribute names.
     */
    static attrs: Set<string>;
    /**
     * Separator for consecutive elements of the same type.
     */
    static tagSep: string;
    /**
     * Separator for attributes. Also separates the last attribute from the text content.
     */
    static attrSep: string;
    static shorthands: {
        '[*]': string;
        '[/*]': string;
        '[bq]': string;
        '[/bq]': string;
        '[uli]': string;
        '[/uli]': string;
        '[oli]': string;
        '[/oli]': string;
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
    static process(element: Element): Element;
    /**
     * Replaces the opening ([tag]) and closing ([/tag]) square brackets for the specified tag in the text
     * with the angle brackets. This does not process attributes.
     *
     * @param text The raw or partially processed Marksafe text before the tag is processed
     * @param tag  The tag to be processed (converted from Marksafe syntax to HTML syntax)
     * @returns The same text with all instances of the tag converted from Marksafe Syntax to HTML syntax
     */
    static replace(text: string, tag: string): string;
    /**
     * Runs final processing of the elements (recursively from the top down) first to replace any intermediate
     * elements with their correct final elements and then to proccess all attributes and remove them from
     * the text content where they are specified.
     *
     * @param element The element to process
     * @param top Whether this is the top-level element.
     */
    static processElement(element: Element, top?: boolean): void;
    /**
     * Processes and xxtracts any attributes specified within the text content of the element.
     *
     * @param element The element to process
     * @param text The input textContent of the element containing attributes and/or intended textContent.
     */
    static processAttrs(element: Element, text: string): void;
}
