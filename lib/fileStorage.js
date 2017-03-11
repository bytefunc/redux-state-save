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
    return JSON.parse(_fs2.default.readFileSync(FilePath, 'utf-8'));
}

/**
 * @param {string} file_path
 * @param {string} file_name
 * @param {object} data
 */
function saveFileStorage(file_path, file_name, data) {
    var FilePath = _path2.default.join(file_path, file_name);
    _fs2.default.writeFileSync(FilePath, JSON.stringify(data));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9maWxlU3RvcmFnZS5qcyJdLCJuYW1lcyI6WyJsb2FkRmlsZVN0b3JhZ2UiLCJzYXZlRmlsZVN0b3JhZ2UiLCJmaWxlX3BhdGgiLCJmaWxlX25hbWUiLCJGaWxlUGF0aCIsImpvaW4iLCJleGlzdHNTeW5jIiwiSlNPTiIsInBhcnNlIiwicmVhZEZpbGVTeW5jIiwiZGF0YSIsIndyaXRlRmlsZVN5bmMiLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiI7Ozs7O1FBUWdCQSxlLEdBQUFBLGU7UUFjQUMsZSxHQUFBQSxlOztBQXRCaEI7Ozs7QUFDQTs7Ozs7O0FBRUE7Ozs7O0FBS08sU0FBU0QsZUFBVCxDQUF5QkUsU0FBekIsRUFBb0NDLFNBQXBDLEVBQStDO0FBQ2xELFFBQU1DLFdBQVcsZUFBS0MsSUFBTCxDQUFVSCxTQUFWLEVBQXFCQyxTQUFyQixDQUFqQjs7QUFFQSxRQUFJLENBQUMsYUFBR0csVUFBSCxDQUFjRixRQUFkLENBQUwsRUFBOEI7QUFDMUIsZUFBTyxFQUFQO0FBQ0g7QUFDRCxXQUFPRyxLQUFLQyxLQUFMLENBQVcsYUFBR0MsWUFBSCxDQUFnQkwsUUFBaEIsRUFBMEIsT0FBMUIsQ0FBWCxDQUFQO0FBQ0g7O0FBRUQ7Ozs7O0FBS08sU0FBU0gsZUFBVCxDQUF5QkMsU0FBekIsRUFBb0NDLFNBQXBDLEVBQStDTyxJQUEvQyxFQUFxRDtBQUN4RCxRQUFNTixXQUFXLGVBQUtDLElBQUwsQ0FBVUgsU0FBVixFQUFxQkMsU0FBckIsQ0FBakI7QUFDQSxpQkFBR1EsYUFBSCxDQUFpQlAsUUFBakIsRUFBMkJHLEtBQUtLLFNBQUwsQ0FBZUYsSUFBZixDQUEzQjtBQUNIIiwiZmlsZSI6ImZpbGVTdG9yYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBmcyBmcm9tICdmcydcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZV9wYXRoXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZV9uYW1lXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2FkRmlsZVN0b3JhZ2UoZmlsZV9wYXRoLCBmaWxlX25hbWUpIHtcbiAgICBjb25zdCBGaWxlUGF0aCA9IHBhdGguam9pbihmaWxlX3BhdGgsIGZpbGVfbmFtZSk7XG5cbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoRmlsZVBhdGgpKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKEZpbGVQYXRoLCAndXRmLTgnKSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpbGVfcGF0aFxuICogQHBhcmFtIHtzdHJpbmd9IGZpbGVfbmFtZVxuICogQHBhcmFtIHtvYmplY3R9IGRhdGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhdmVGaWxlU3RvcmFnZShmaWxlX3BhdGgsIGZpbGVfbmFtZSwgZGF0YSkge1xuICAgIGNvbnN0IEZpbGVQYXRoID0gcGF0aC5qb2luKGZpbGVfcGF0aCwgZmlsZV9uYW1lKTtcbiAgICBmcy53cml0ZUZpbGVTeW5jKEZpbGVQYXRoLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG59Il19