import path from 'path'
import fs from 'fs'

import {
    serializeJsonFunctions,
    deserializeJsonFunctions,
} from './serializeJson.js';

/**
 * @param {string} file_path
 * @param {string} file_name
 * @return {object}
 */
export function loadFileStorage(file_path, file_name) {
    const FilePath = path.join(file_path, file_name);

    if (!fs.existsSync(FilePath)) {
        return {};
    }
    return JSON.parse(fs.readFileSync(FilePath, 'utf-8'), deserializeJsonFunctions);
}

/**
 * @param {string} file_path
 * @param {string} file_name
 * @param {object} data
 */
export function saveFileStorage(file_path, file_name, data) {
    const FilePath = path.join(file_path, file_name);
    fs.writeFileSync(FilePath, JSON.stringify(data, serializeJsonFunctions));
}