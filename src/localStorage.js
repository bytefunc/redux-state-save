import {
    serializeJsonFunctions,
    deserializeJsonFunctions,
} from './serializeJson.js';

/**
 * @param {string} local_key
 * @return {object}
 */
export function loadLocalStorage(local_key) {
    if (!window.localStorage[local_key]) {
        return {};
    }
    return JSON.parse(window.localStorage[local_key], deserializeJsonFunctions);
}


/**
 * @param {string} local_key
 * @param {object} data
 */
export function saveLocalStorage(local_key, data) {
    window.localStorage[local_key] = JSON.stringify(data, serializeJsonFunctions);
}