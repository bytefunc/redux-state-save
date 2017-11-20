"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.serializeJsonFunctions = serializeJsonFunctions;
exports.deserializeJsonFunctions = deserializeJsonFunctions;
/**
 * JSON.stringify Serialize functions
 */
function serializeJsonFunctions(k, f) {
    if (typeof f === "function") {
        return f.toString();
    };
    return f;
}

/**
 * JSON.parse Deserialize functions
 */
function deserializeJsonFunctions(k, f) {
    if (typeof f === "string" && f.match(/^function/)) {
        return Function.call(this, "return " + f)();
    }
    return f;
}