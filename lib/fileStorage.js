'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadFileStorage = loadFileStorage;
exports.saveFileStorage = saveFileStorage;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _serializeJson = require('./serializeJson.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {string} file_path
 * @param {string} file_name
 * @return {object}
 */
function loadFileStorage(file_path, file_name) {
    var FilePath = _path2.default.join(file_path, file_name);

    if (!_fs2.default.existsSync(FilePath)) {
        return {};
    }
    return JSON.parse(_fs2.default.readFileSync(FilePath, 'utf-8'), _serializeJson.deserializeJsonFunctions);
}

/**
 * @param {string} file_path
 * @param {string} file_name
 * @param {object} data
 */
function saveFileStorage(file_path, file_name, data) {
    var FilePath = _path2.default.join(file_path, file_name);
    _fs2.default.writeFileSync(FilePath, JSON.stringify(data, _serializeJson.serializeJsonFunctions));
}