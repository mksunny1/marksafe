import { describe, it } from 'node:test'
import { strict as assert } from 'node:assert'
import { Marksafe } from '../marksafe.js'
import { JSDOM } from "jsdom";

const window = new JSDOM(`<!DOCTYPE html><body></body>`).window;
const document = window.document;
const body = document.body;

global.document = document;
global.Element = window.Element;

describe("marksafe.Marksafe", () => {
    body.innerHTML = `
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
    `

    it("Should process marksafe text correctly.", (t) => {
        Marksafe.tags.add('footer');
        Marksafe.process(body.firstElementChild);
        assert.equal(body.querySelector('a').href.trim(), 'https://github.com/mksunny1/marksafe');
        assert.equal(body.querySelector('img').src.trim(), 'https://github.com/mksunny1/marksafe/logo.png');
        assert.equal(body.querySelector('a').textContent.trim(), 'this');
        assert.equal(body.querySelector('img').alt.trim(), 'marksafe logo');
        assert.equal(body.querySelector('footer').innerHTML.trim(), 'End of marksafe content');
    });
});

