'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _localStorage = require('./localStorage.js');

var _fileStorage = require('./fileStorage.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Storage = function () {
    function Storage() {
        _classCallCheck(this, Storage);

        this.defaultConfig = {
            storage_type: 'local_storage', // "local_storage", "file_storage"
            filter_type: 'blacklist', // "whitelist", "blacklist"
            filter_list: [],
            file_path: '',
            file_name: 'redux-states.json',
            local_key: 'redux-states'
        };
        this.config = {};
    }

    _createClass(Storage, [{
        key: 'loadState',
        value: function loadState(store) {
            var config = this.getConfig();
            var data = this._getDate(config);
            for (var state_key in data) {
                if (!this._isFiltering(config, state_key)) {
                    store.getState()[state_key] = data[state_key];
                }
            }
            return store;
        }
    }, {
        key: 'saveState',
        value: function saveState() {
            var _this = this;

            return function (_ref) {
                var getState = _ref.getState;

                return function (next) {
                    return function (action) {
                        next(action);

                        var config = _this.getConfig();
                        var state = getState();
                        var d = {};
                        for (var state_key in state) {
                            if (!_this._isFiltering(config, state_key)) {
                                d[state_key] = state[state_key];
                            }
                        }
                        _this._setDate(config, d);
                    };
                };
            };
        }

        /**
         * @param {object} config
         */

    }, {
        key: 'setConfig',
        value: function setConfig(config) {
            this.config = Object.assign({}, this.defaultConfig, config);
        }

        /**
         * @return {object}
         */

    }, {
        key: 'getConfig',
        value: function getConfig() {
            return this.config;
        }

        /**
         * @param {object} config
         * @param {object} data
         */

    }, {
        key: '_setDate',
        value: function _setDate(config, data) {
            var storage_type = config.storage_type;
            if (storage_type === 'local_storage') {
                var local_key = config.local_key;
                (0, _localStorage.saveLocalStorage)(local_key, data);
            } else {
                var file_path = config.file_path;
                var file_name = config.file_name;
                (0, _fileStorage.saveFileStorage)(file_path, file_name, data);
            }
        }

        /**
         * @param {object} config
         * @return {object}
         */

    }, {
        key: '_getDate',
        value: function _getDate(config) {
            var storage_type = config.storage_type;
            var data = void 0;
            if (storage_type === 'local_storage') {
                var local_key = config.local_key;
                data = (0, _localStorage.loadLocalStorage)(local_key);
            } else {
                var file_path = config.file_path;
                var file_name = config.file_name;
                data = (0, _fileStorage.loadFileStorage)(file_path, file_name);
            }
            return data;
        }

        /**
         * @param {object} config
         * @param {string} state_key
         * @return {bool}
         */

    }, {
        key: '_isFiltering',
        value: function _isFiltering(config, state_key) {
            var filter_type = config.filter_type;
            var filter_list = config.filter_list;
            if (filter_type === 'blacklist') {
                for (var i = 0; i < filter_list.length; i++) {
                    if (filter_list[i] === state_key) {
                        return true;
                    }
                }
                return false;
            } else {
                for (var i = 0; i < filter_list.length; i++) {
                    if (filter_list[i] === state_key) {
                        return false;
                    }
                }
                return true;
            }
        }
    }]);

    return Storage;
}();

exports.default = Storage;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJTdG9yYWdlIiwiZGVmYXVsdENvbmZpZyIsInN0b3JhZ2VfdHlwZSIsImZpbHRlcl90eXBlIiwiZmlsdGVyX2xpc3QiLCJmaWxlX3BhdGgiLCJmaWxlX25hbWUiLCJsb2NhbF9rZXkiLCJjb25maWciLCJzdG9yZSIsImdldENvbmZpZyIsImRhdGEiLCJfZ2V0RGF0ZSIsInN0YXRlX2tleSIsIl9pc0ZpbHRlcmluZyIsImdldFN0YXRlIiwibmV4dCIsImFjdGlvbiIsInN0YXRlIiwiZCIsIl9zZXREYXRlIiwiT2JqZWN0IiwiYXNzaWduIiwiaSIsImxlbmd0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFLQTs7OztJQUtxQkEsTztBQUNqQix1QkFBYztBQUFBOztBQUNWLGFBQUtDLGFBQUwsR0FBcUI7QUFDakJDLDBCQUFjLGVBREcsRUFDYztBQUMvQkMseUJBQWEsV0FGSSxFQUVTO0FBQzFCQyx5QkFBYSxFQUhJO0FBSWpCQyx1QkFBVyxFQUpNO0FBS2pCQyx1QkFBVyxtQkFMTTtBQU1qQkMsdUJBQVc7QUFOTSxTQUFyQjtBQVFBLGFBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0g7Ozs7a0NBRVNDLEssRUFBTztBQUNiLGdCQUFNRCxTQUFTLEtBQUtFLFNBQUwsRUFBZjtBQUNBLGdCQUFNQyxPQUFTLEtBQUtDLFFBQUwsQ0FBY0osTUFBZCxDQUFmO0FBQ0EsaUJBQUssSUFBTUssU0FBWCxJQUF3QkYsSUFBeEIsRUFBOEI7QUFDMUIsb0JBQUksQ0FBQyxLQUFLRyxZQUFMLENBQWtCTixNQUFsQixFQUEwQkssU0FBMUIsQ0FBTCxFQUEyQztBQUN2Q0osMEJBQU1NLFFBQU4sR0FBaUJGLFNBQWpCLElBQThCRixLQUFLRSxTQUFMLENBQTlCO0FBQ0g7QUFDSjtBQUNELG1CQUFPSixLQUFQO0FBQ0g7OztvQ0FFVztBQUFBOztBQUNSLG1CQUFPLGdCQUFrQjtBQUFBLG9CQUFmTSxRQUFlLFFBQWZBLFFBQWU7O0FBQ3JCLHVCQUFPLFVBQUNDLElBQUQ7QUFBQSwyQkFBVSxVQUFDQyxNQUFELEVBQVk7QUFDekJELDZCQUFLQyxNQUFMOztBQUVBLDRCQUFNVCxTQUFTLE1BQUtFLFNBQUwsRUFBZjtBQUNBLDRCQUFNUSxRQUFTSCxVQUFmO0FBQ0EsNEJBQUlJLElBQUksRUFBUjtBQUNBLDZCQUFLLElBQU1OLFNBQVgsSUFBd0JLLEtBQXhCLEVBQStCO0FBQzNCLGdDQUFJLENBQUMsTUFBS0osWUFBTCxDQUFrQk4sTUFBbEIsRUFBMEJLLFNBQTFCLENBQUwsRUFBMkM7QUFDdkNNLGtDQUFFTixTQUFGLElBQWVLLE1BQU1MLFNBQU4sQ0FBZjtBQUNIO0FBQ0o7QUFDRCw4QkFBS08sUUFBTCxDQUFjWixNQUFkLEVBQXNCVyxDQUF0QjtBQUNILHFCQVpNO0FBQUEsaUJBQVA7QUFhSCxhQWREO0FBZUg7O0FBRUQ7Ozs7OztrQ0FHVVgsTSxFQUFRO0FBQ2QsaUJBQUtBLE1BQUwsR0FBY2EsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsS0FBS3JCLGFBQXZCLEVBQXNDTyxNQUF0QyxDQUFkO0FBQ0g7O0FBRUQ7Ozs7OztvQ0FHWTtBQUNSLG1CQUFPLEtBQUtBLE1BQVo7QUFDSDs7QUFFRDs7Ozs7OztpQ0FJU0EsTSxFQUFRRyxJLEVBQU07QUFDbkIsZ0JBQU1ULGVBQWVNLE9BQU9OLFlBQTVCO0FBQ0EsZ0JBQUlBLGlCQUFpQixlQUFyQixFQUFzQztBQUNsQyxvQkFBTUssWUFBWUMsT0FBT0QsU0FBekI7QUFDQSxvREFBaUJBLFNBQWpCLEVBQTRCSSxJQUE1QjtBQUNILGFBSEQsTUFHTztBQUNILG9CQUFNTixZQUFZRyxPQUFPSCxTQUF6QjtBQUNBLG9CQUFNQyxZQUFZRSxPQUFPRixTQUF6QjtBQUNBLGtEQUFnQkQsU0FBaEIsRUFBMkJDLFNBQTNCLEVBQXNDSyxJQUF0QztBQUNIO0FBQ0o7O0FBRUQ7Ozs7Ozs7aUNBSVNILE0sRUFBUTtBQUNiLGdCQUFNTixlQUFlTSxPQUFPTixZQUE1QjtBQUNBLGdCQUFJUyxhQUFKO0FBQ0EsZ0JBQUlULGlCQUFpQixlQUFyQixFQUFzQztBQUNsQyxvQkFBTUssWUFBWUMsT0FBT0QsU0FBekI7QUFDQUksdUJBQU8sb0NBQWlCSixTQUFqQixDQUFQO0FBQ0gsYUFIRCxNQUdPO0FBQ0gsb0JBQU1GLFlBQVlHLE9BQU9ILFNBQXpCO0FBQ0Esb0JBQU1DLFlBQVlFLE9BQU9GLFNBQXpCO0FBQ0FLLHVCQUFPLGtDQUFnQk4sU0FBaEIsRUFBMkJDLFNBQTNCLENBQVA7QUFDSDtBQUNELG1CQUFPSyxJQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7O3FDQUthSCxNLEVBQVFLLFMsRUFBVztBQUM1QixnQkFBTVYsY0FBY0ssT0FBT0wsV0FBM0I7QUFDQSxnQkFBTUMsY0FBY0ksT0FBT0osV0FBM0I7QUFDQSxnQkFBSUQsZ0JBQWdCLFdBQXBCLEVBQWlDO0FBQzdCLHFCQUFLLElBQUlvQixJQUFJLENBQWIsRUFBZ0JBLElBQUluQixZQUFZb0IsTUFBaEMsRUFBd0NELEdBQXhDLEVBQTZDO0FBQ3pDLHdCQUFJbkIsWUFBWW1CLENBQVosTUFBbUJWLFNBQXZCLEVBQWtDO0FBQzlCLCtCQUFPLElBQVA7QUFDSDtBQUNKO0FBQ0QsdUJBQU8sS0FBUDtBQUNILGFBUEQsTUFPTztBQUNILHFCQUFLLElBQUlVLElBQUksQ0FBYixFQUFnQkEsSUFBSW5CLFlBQVlvQixNQUFoQyxFQUF3Q0QsR0FBeEMsRUFBNkM7QUFDekMsd0JBQUluQixZQUFZbUIsQ0FBWixNQUFtQlYsU0FBdkIsRUFBa0M7QUFDOUIsK0JBQU8sS0FBUDtBQUNIO0FBQ0o7QUFDRCx1QkFBTyxJQUFQO0FBQ0g7QUFDSjs7Ozs7O2tCQWpIZ0JiLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIGxvYWRMb2NhbFN0b3JhZ2UsXG4gICAgc2F2ZUxvY2FsU3RvcmFnZSxcbn0gZnJvbSAnLi9sb2NhbFN0b3JhZ2UuanMnO1xuXG5pbXBvcnQge1xuICAgIGxvYWRGaWxlU3RvcmFnZSxcbiAgICBzYXZlRmlsZVN0b3JhZ2UsXG59IGZyb20gJy4vZmlsZVN0b3JhZ2UuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yYWdlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5kZWZhdWx0Q29uZmlnID0ge1xuICAgICAgICAgICAgc3RvcmFnZV90eXBlOiAnbG9jYWxfc3RvcmFnZScsIC8vIFwibG9jYWxfc3RvcmFnZVwiLCBcImZpbGVfc3RvcmFnZVwiXG4gICAgICAgICAgICBmaWx0ZXJfdHlwZTogJ2JsYWNrbGlzdCcsIC8vIFwid2hpdGVsaXN0XCIsIFwiYmxhY2tsaXN0XCJcbiAgICAgICAgICAgIGZpbHRlcl9saXN0OiBbXSxcbiAgICAgICAgICAgIGZpbGVfcGF0aDogJycsXG4gICAgICAgICAgICBmaWxlX25hbWU6ICdyZWR1eC1zdGF0ZXMuanNvbicsXG4gICAgICAgICAgICBsb2NhbF9rZXk6ICdyZWR1eC1zdGF0ZXMnLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNvbmZpZyA9IHt9O1xuICAgIH1cblxuICAgIGxvYWRTdGF0ZShzdG9yZSkge1xuICAgICAgICBjb25zdCBjb25maWcgPSB0aGlzLmdldENvbmZpZygpO1xuICAgICAgICBjb25zdCBkYXRhICAgPSB0aGlzLl9nZXREYXRlKGNvbmZpZyk7XG4gICAgICAgIGZvciAoY29uc3Qgc3RhdGVfa2V5IGluIGRhdGEpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5faXNGaWx0ZXJpbmcoY29uZmlnLCBzdGF0ZV9rZXkpKSB7XG4gICAgICAgICAgICAgICAgc3RvcmUuZ2V0U3RhdGUoKVtzdGF0ZV9rZXldID0gZGF0YVtzdGF0ZV9rZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdG9yZTtcbiAgICB9XG4gIFxuICAgIHNhdmVTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuICh7IGdldFN0YXRlIH0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiAobmV4dCkgPT4gKGFjdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIG5leHQoYWN0aW9uKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuZ2V0Q29uZmlnKCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdGUgID0gZ2V0U3RhdGUoKTtcbiAgICAgICAgICAgICAgICBsZXQgZCA9IHt9O1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc3RhdGVfa2V5IGluIHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5faXNGaWx0ZXJpbmcoY29uZmlnLCBzdGF0ZV9rZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkW3N0YXRlX2tleV0gPSBzdGF0ZVtzdGF0ZV9rZXldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX3NldERhdGUoY29uZmlnLCBkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBzZXRDb25maWcoY29uZmlnKSB7XG4gICAgICAgIHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0Q29uZmlnLCBjb25maWcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge29iamVjdH1cbiAgICAgKi9cbiAgICBnZXRDb25maWcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gY29uZmlnXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBfc2V0RGF0ZShjb25maWcsIGRhdGEpIHtcbiAgICAgICAgY29uc3Qgc3RvcmFnZV90eXBlID0gY29uZmlnLnN0b3JhZ2VfdHlwZTtcbiAgICAgICAgaWYgKHN0b3JhZ2VfdHlwZSA9PT0gJ2xvY2FsX3N0b3JhZ2UnKSB7XG4gICAgICAgICAgICBjb25zdCBsb2NhbF9rZXkgPSBjb25maWcubG9jYWxfa2V5O1xuICAgICAgICAgICAgc2F2ZUxvY2FsU3RvcmFnZShsb2NhbF9rZXksIGRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZmlsZV9wYXRoID0gY29uZmlnLmZpbGVfcGF0aDtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVfbmFtZSA9IGNvbmZpZy5maWxlX25hbWU7XG4gICAgICAgICAgICBzYXZlRmlsZVN0b3JhZ2UoZmlsZV9wYXRoLCBmaWxlX25hbWUsIGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZ1xuICAgICAqIEByZXR1cm4ge29iamVjdH1cbiAgICAgKi9cbiAgICBfZ2V0RGF0ZShjb25maWcpIHtcbiAgICAgICAgY29uc3Qgc3RvcmFnZV90eXBlID0gY29uZmlnLnN0b3JhZ2VfdHlwZTtcbiAgICAgICAgbGV0IGRhdGE7XG4gICAgICAgIGlmIChzdG9yYWdlX3R5cGUgPT09ICdsb2NhbF9zdG9yYWdlJykge1xuICAgICAgICAgICAgY29uc3QgbG9jYWxfa2V5ID0gY29uZmlnLmxvY2FsX2tleTtcbiAgICAgICAgICAgIGRhdGEgPSBsb2FkTG9jYWxTdG9yYWdlKGxvY2FsX2tleSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBmaWxlX3BhdGggPSBjb25maWcuZmlsZV9wYXRoO1xuICAgICAgICAgICAgY29uc3QgZmlsZV9uYW1lID0gY29uZmlnLmZpbGVfbmFtZTtcbiAgICAgICAgICAgIGRhdGEgPSBsb2FkRmlsZVN0b3JhZ2UoZmlsZV9wYXRoLCBmaWxlX25hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWdcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGVfa2V5XG4gICAgICogQHJldHVybiB7Ym9vbH1cbiAgICAgKi9cbiAgICBfaXNGaWx0ZXJpbmcoY29uZmlnLCBzdGF0ZV9rZXkpIHtcbiAgICAgICAgY29uc3QgZmlsdGVyX3R5cGUgPSBjb25maWcuZmlsdGVyX3R5cGU7XG4gICAgICAgIGNvbnN0IGZpbHRlcl9saXN0ID0gY29uZmlnLmZpbHRlcl9saXN0O1xuICAgICAgICBpZiAoZmlsdGVyX3R5cGUgPT09ICdibGFja2xpc3QnKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbHRlcl9saXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlcl9saXN0W2ldID09PSBzdGF0ZV9rZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWx0ZXJfbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJfbGlzdFtpXSA9PT0gc3RhdGVfa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=