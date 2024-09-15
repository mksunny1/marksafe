"use strict";
/**
 * Maps a given value to the option type.
 *
 * @module
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayFormat = exports.OutputFileStrategy = void 0;
/**
 * The allowed values of the `--outputFileStrategy` option.
 */
var OutputFileStrategy;
(function (OutputFileStrategy) {
    OutputFileStrategy["Members"] = "members";
    OutputFileStrategy["Modules"] = "modules";
})(OutputFileStrategy || (exports.OutputFileStrategy = OutputFileStrategy = {}));
/**
 * The allowed values for formatting reflections and indexes.
 */
var DisplayFormat;
(function (DisplayFormat) {
    DisplayFormat["List"] = "list";
    DisplayFormat["Table"] = "table";
    DisplayFormat["HtmlTable"] = "htmlTable";
})(DisplayFormat || (exports.DisplayFormat = DisplayFormat = {}));
