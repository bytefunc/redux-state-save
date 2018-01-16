/**
 * JSON.stringify Serialize functions
 */
export function serializeJsonFunctions(k, f) {
    if (typeof f === "function") {
        return f.toString();
    }
    return f;
}

/**
 * JSON.parse Deserialize functions
 */
export function deserializeJsonFunctions(k, f) {
    if (typeof f === "string" && f.match(/^function/)) {
        return Function.call(this, "return " + f)();
    }
    return f;
}
