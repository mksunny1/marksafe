"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAngleBracket = getAngleBracket;
function getAngleBracket(bracket) {
    const useEntities = this.options.getValue('useHTMLEncodedBrackets');
    if (bracket === '<') {
        return useEntities ? '&lt;' : '\\<';
    }
    return useEntities ? '&gt;' : '\\>';
}
