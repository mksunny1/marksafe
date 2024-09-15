"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroupIndexTable = getGroupIndexTable;
const markdown_1 = require("../../../libs/markdown");
const utils_1 = require("../../../libs/utils");
const typedoc_1 = require("typedoc");
function getGroupIndexTable(children) {
    const leftAlignHeadings = this.options.getValue('tableColumnSettings').leftAlignHeaders;
    const isHtmlTable = this.options.getValue('indexFormat') === 'htmlTable';
    const childKindStrings = children.map((child) => typedoc_1.ReflectionKind.singularString(child.kind));
    const headers = [[...new Set(childKindStrings)].join(', ')];
    headers.push(this.i18n.theme_description());
    const rows = [];
    children.forEach((child) => {
        const row = [];
        if (child.url) {
            row.push((0, markdown_1.link)((0, utils_1.escapeChars)(child.name), this.getRelativeUrl(child.url)));
        }
        const description = () => {
            if (child instanceof typedoc_1.DocumentReflection) {
                return child.frontmatter.description;
            }
            const comment = child.comment || child.signatures?.[0]?.comment;
            if (!comment) {
                return '';
            }
            return isHtmlTable
                ? this.partials.comment(comment, {
                    isTableColumn: true,
                })
                : this.helpers.getDescriptionForComment(comment);
        };
        row.push(description() || '-');
        rows.push(row);
    });
    return isHtmlTable
        ? (0, markdown_1.htmlTable)(headers, rows, leftAlignHeadings)
        : (0, markdown_1.table)(headers, rows, leftAlignHeadings);
}
