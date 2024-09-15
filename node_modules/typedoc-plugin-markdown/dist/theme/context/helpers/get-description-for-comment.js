"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDescriptionForComment = getDescriptionForComment;
function getDescriptionForComment(comment) {
    if (comment?.summary?.length) {
        return this.helpers
            .getCommentParts(comment.summary)
            ?.split(/(\r?\n){2}/)[0]
            .replace(/\r?\n/g, ' ');
    }
    return null;
}
