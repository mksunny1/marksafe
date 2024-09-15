"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categories = categories;
const markdown_1 = require("../../../libs/markdown");
const typedoc_1 = require("typedoc");
function categories(model, options) {
    const md = [];
    model
        ?.filter((category) => !category.allChildrenHaveOwnDocument())
        .forEach((category) => {
        const categoryChildren = category.children?.filter((child) => child.kind !== typedoc_1.ReflectionKind.Constructor);
        if (categoryChildren.length) {
            md.push((0, markdown_1.heading)(options.headingLevel, category.title));
            if (category.description) {
                md.push(this.helpers.getCommentParts(category.description));
            }
            md.push(this.partials.members(categoryChildren, {
                headingLevel: options.headingLevel + 1,
            }));
        }
    });
    return md.join('\n\n');
}
