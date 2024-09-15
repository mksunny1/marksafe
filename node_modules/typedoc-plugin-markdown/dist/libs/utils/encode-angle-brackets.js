"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeAngleBrackets = encodeAngleBrackets;
function encodeAngleBrackets(str) {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
