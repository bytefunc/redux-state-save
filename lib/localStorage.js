'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadLocalStorage = loadLocalStorage;
exports.saveLocalStorage = saveLocalStorage;

var _serializeJson = require('./serializeJson.js');

/**
 * @param {string} local_key
 * @return {object}
 */
function loadLocalStorage(local_key) {
    if (!window.localStorage[local_key]) {
        return {};
    }
    return JSON.parse(window.localStorage[local_key], _serializeJson.deserializeJsonFunctions);
}

/**
 * @param {string} local_key
 * @param {object} data
 */
function saveLocalStorage(local_key, data) {
    window.localStorage[local_key] = JSON.stringify(data, _serializeJson.serializeJsonFunctions);
}