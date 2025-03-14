import { describe, it } from 'node:test'
import { strict as assert } from 'node:assert'
import { Marksafe } from '../marksafe.js'
import { JSDOM } from "jsdom";

const window = new JSDOM(`<!DOCTYPE html><body></body>`).window;
const document = window.document;
const body = document.body;

global.document = document;
global.Element = window.Element;
global.Node = window.Node;


describe("marksafe.Marksafe", () => {
    body.innerHTML = `
    <section id="ms">
        [h3]
            This is escaped Marksafe text. &quot;h3&quot; tag is allowed
        [/h3]
        [p]
            This is the first paragraph. &quot;p&quot; tag is allowed
        ;;
            Links like [a]href=https://github.com/mksunny1/marksafe2,,this[/a] can be present.
        ;;
            Images like [img]src=https://github.com/mksunny1/marksafe2/logo.png,,alt=marksafe2 logo,,[/img] can also be present.
        ;;
            ... Many more tags are allowed
        [/p]
        [section]
            Althogh [b]section[/b] tag is allowed, this will not parse because the whole marksafe2 content is inside a [b]section[/b]. As a result, parts of the section outside the internal nodes will appear as [b]text[/b] nodes in the generated markup instead of being part of an output [b]section[/b] node.
        [/section]
        [footer]
            End of marksafe2 content
        [/footer]
    </section>
    `

    it("Should process marksafe2 text correctly.", (t) => {
        Marksafe.process(body.firstElementChild);
        console.log(body.firstElementChild.outerHTML);

        assert.equal(body.querySelector('a').href.trim(), 'https://github.com/mksunny1/marksafe2');
        assert.equal(body.querySelector('img').src.trim(), 'https://github.com/mksunny1/marksafe2/logo.png');
        assert.equal(body.querySelector('a').textContent.trim(), 'this');
        assert.equal(body.querySelector('img').alt.trim(), 'marksafe2 logo');
        assert.equal(body.querySelectorAll('p').length, 4);
        assert.equal(body.querySelector('footer').innerHTML.trim(), 'End of marksafe2 content');
    });
});

