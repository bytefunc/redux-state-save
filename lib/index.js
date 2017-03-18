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
            storage_type: 'file_storage', // "local_storage", "file_storage"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJTdG9yYWdlIiwiZGVmYXVsdENvbmZpZyIsInN0b3JhZ2VfdHlwZSIsImZpbHRlcl90eXBlIiwiZmlsdGVyX2xpc3QiLCJmaWxlX3BhdGgiLCJmaWxlX25hbWUiLCJsb2NhbF9rZXkiLCJjb25maWciLCJzdG9yZSIsImdldENvbmZpZyIsImRhdGEiLCJfZ2V0RGF0ZSIsInN0YXRlX2tleSIsIl9pc0ZpbHRlcmluZyIsImdldFN0YXRlIiwibmV4dCIsImFjdGlvbiIsInN0YXRlIiwiZCIsIl9zZXREYXRlIiwiT2JqZWN0IiwiYXNzaWduIiwiaSIsImxlbmd0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFLQTs7OztJQUtxQkEsTztBQUNqQix1QkFBYztBQUFBOztBQUNWLGFBQUtDLGFBQUwsR0FBcUI7QUFDakJDLDBCQUFjLGNBREcsRUFDYTtBQUM5QkMseUJBQWEsV0FGSSxFQUVTO0FBQzFCQyx5QkFBYSxFQUhJO0FBSWpCQyx1QkFBVyxFQUpNO0FBS2pCQyx1QkFBVyxtQkFMTTtBQU1qQkMsdUJBQVc7QUFOTSxTQUFyQjtBQVFBLGFBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0g7Ozs7a0NBRVNDLEssRUFBTztBQUNiLGdCQUFNRCxTQUFTLEtBQUtFLFNBQUwsRUFBZjtBQUNBLGdCQUFNQyxPQUFTLEtBQUtDLFFBQUwsQ0FBY0osTUFBZCxDQUFmO0FBQ0EsaUJBQUssSUFBTUssU0FBWCxJQUF3QkYsSUFBeEIsRUFBOEI7QUFDMUIsb0JBQUksQ0FBQyxLQUFLRyxZQUFMLENBQWtCTixNQUFsQixFQUEwQkssU0FBMUIsQ0FBTCxFQUEyQztBQUN2Q0osMEJBQU1NLFFBQU4sR0FBaUJGLFNBQWpCLElBQThCRixLQUFLRSxTQUFMLENBQTlCO0FBQ0g7QUFDSjtBQUNELG1CQUFPSixLQUFQO0FBQ0g7OztvQ0FFVztBQUFBOztBQUNSLG1CQUFPLGdCQUFrQjtBQUFBLG9CQUFmTSxRQUFlLFFBQWZBLFFBQWU7O0FBQ3JCLHVCQUFPLFVBQUNDLElBQUQ7QUFBQSwyQkFBVSxVQUFDQyxNQUFELEVBQVk7QUFDekJELDZCQUFLQyxNQUFMOztBQUVBLDRCQUFNVCxTQUFTLE1BQUtFLFNBQUwsRUFBZjtBQUNBLDRCQUFNUSxRQUFTSCxVQUFmO0FBQ0EsNEJBQUlJLElBQUksRUFBUjtBQUNBLDZCQUFLLElBQU1OLFNBQVgsSUFBd0JLLEtBQXhCLEVBQStCO0FBQzNCLGdDQUFJLENBQUMsTUFBS0osWUFBTCxDQUFrQk4sTUFBbEIsRUFBMEJLLFNBQTFCLENBQUwsRUFBMkM7QUFDdkNNLGtDQUFFTixTQUFGLElBQWVLLE1BQU1MLFNBQU4sQ0FBZjtBQUNIO0FBQ0o7QUFDRCw4QkFBS08sUUFBTCxDQUFjWixNQUFkLEVBQXNCVyxDQUF0QjtBQUNILHFCQVpNO0FBQUEsaUJBQVA7QUFhSCxhQWREO0FBZUg7O0FBRUQ7Ozs7OztrQ0FHVVgsTSxFQUFRO0FBQ2QsaUJBQUtBLE1BQUwsR0FBY2EsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsS0FBS3JCLGFBQXZCLEVBQXNDTyxNQUF0QyxDQUFkO0FBQ0g7O0FBRUQ7Ozs7OztvQ0FHWTtBQUNSLG1CQUFPLEtBQUtBLE1BQVo7QUFDSDs7QUFFRDs7Ozs7OztpQ0FJU0EsTSxFQUFRRyxJLEVBQU07QUFDbkIsZ0JBQU1ULGVBQWVNLE9BQU9OLFlBQTVCO0FBQ0EsZ0JBQUlBLGlCQUFpQixlQUFyQixFQUFzQztBQUNsQyxvQkFBTUssWUFBWUMsT0FBT0QsU0FBekI7QUFDQSxvREFBaUJBLFNBQWpCLEVBQTRCSSxJQUE1QjtBQUNILGFBSEQsTUFHTztBQUNILG9CQUFNTixZQUFZRyxPQUFPSCxTQUF6QjtBQUNBLG9CQUFNQyxZQUFZRSxPQUFPRixTQUF6QjtBQUNBLGtEQUFnQkQsU0FBaEIsRUFBMkJDLFNBQTNCLEVBQXNDSyxJQUF0QztBQUNIO0FBQ0o7O0FBRUQ7Ozs7Ozs7aUNBSVNILE0sRUFBUTtBQUNiLGdCQUFNTixlQUFlTSxPQUFPTixZQUE1QjtBQUNBLGdCQUFJUyxhQUFKO0FBQ0EsZ0JBQUlULGlCQUFpQixlQUFyQixFQUFzQztBQUNsQyxvQkFBTUssWUFBWUMsT0FBT0QsU0FBekI7QUFDQUksdUJBQU8sb0NBQWlCSixTQUFqQixDQUFQO0FBQ0gsYUFIRCxNQUdPO0FBQ0gsb0JBQU1GLFlBQVlHLE9BQU9ILFNBQXpCO0FBQ0Esb0JBQU1DLFlBQVlFLE9BQU9GLFNBQXpCO0FBQ0FLLHVCQUFPLGtDQUFnQk4sU0FBaEIsRUFBMkJDLFNBQTNCLENBQVA7QUFDSDtBQUNELG1CQUFPSyxJQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7O3FDQUthSCxNLEVBQVFLLFMsRUFBVztBQUM1QixnQkFBTVYsY0FBY0ssT0FBT0wsV0FBM0I7QUFDQSxnQkFBTUMsY0FBY0ksT0FBT0osV0FBM0I7QUFDQSxnQkFBSUQsZ0JBQWdCLFdBQXBCLEVBQWlDO0FBQzdCLHFCQUFLLElBQUlvQixJQUFJLENBQWIsRUFBZ0JBLElBQUluQixZQUFZb0IsTUFBaEMsRUFBd0NELEdBQXhDLEVBQTZDO0FBQ3pDLHdCQUFJbkIsWUFBWW1CLENBQVosTUFBbUJWLFNBQXZCLEVBQWtDO0FBQzlCLCtCQUFPLElBQVA7QUFDSDtBQUNKO0FBQ0QsdUJBQU8sS0FBUDtBQUNILGFBUEQsTUFPTztBQUNILHFCQUFLLElBQUlVLElBQUksQ0FBYixFQUFnQkEsSUFBSW5CLFlBQVlvQixNQUFoQyxFQUF3Q0QsR0FBeEMsRUFBNkM7QUFDekMsd0JBQUluQixZQUFZbUIsQ0FBWixNQUFtQlYsU0FBdkIsRUFBa0M7QUFDOUIsK0JBQU8sS0FBUDtBQUNIO0FBQ0o7QUFDRCx1QkFBTyxJQUFQO0FBQ0g7QUFDSjs7Ozs7O2tCQWpIZ0JiLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIGxvYWRMb2NhbFN0b3JhZ2UsXG4gICAgc2F2ZUxvY2FsU3RvcmFnZSxcbn0gZnJvbSAnLi9sb2NhbFN0b3JhZ2UuanMnO1xuXG5pbXBvcnQge1xuICAgIGxvYWRGaWxlU3RvcmFnZSxcbiAgICBzYXZlRmlsZVN0b3JhZ2UsXG59IGZyb20gJy4vZmlsZVN0b3JhZ2UuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yYWdlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5kZWZhdWx0Q29uZmlnID0ge1xuICAgICAgICAgICAgc3RvcmFnZV90eXBlOiAnZmlsZV9zdG9yYWdlJywgLy8gXCJsb2NhbF9zdG9yYWdlXCIsIFwiZmlsZV9zdG9yYWdlXCJcbiAgICAgICAgICAgIGZpbHRlcl90eXBlOiAnYmxhY2tsaXN0JywgLy8gXCJ3aGl0ZWxpc3RcIiwgXCJibGFja2xpc3RcIlxuICAgICAgICAgICAgZmlsdGVyX2xpc3Q6IFtdLFxuICAgICAgICAgICAgZmlsZV9wYXRoOiAnJyxcbiAgICAgICAgICAgIGZpbGVfbmFtZTogJ3JlZHV4LXN0YXRlcy5qc29uJyxcbiAgICAgICAgICAgIGxvY2FsX2tleTogJ3JlZHV4LXN0YXRlcycsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY29uZmlnID0ge307XG4gICAgfVxuXG4gICAgbG9hZFN0YXRlKHN0b3JlKSB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuZ2V0Q29uZmlnKCk7XG4gICAgICAgIGNvbnN0IGRhdGEgICA9IHRoaXMuX2dldERhdGUoY29uZmlnKTtcbiAgICAgICAgZm9yIChjb25zdCBzdGF0ZV9rZXkgaW4gZGF0YSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9pc0ZpbHRlcmluZyhjb25maWcsIHN0YXRlX2tleSkpIHtcbiAgICAgICAgICAgICAgICBzdG9yZS5nZXRTdGF0ZSgpW3N0YXRlX2tleV0gPSBkYXRhW3N0YXRlX2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0b3JlO1xuICAgIH1cbiAgXG4gICAgc2F2ZVN0YXRlKCkge1xuICAgICAgICByZXR1cm4gKHsgZ2V0U3RhdGUgfSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChuZXh0KSA9PiAoYWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgbmV4dChhY3Rpb24pO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5nZXRDb25maWcoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0ZSAgPSBnZXRTdGF0ZSgpO1xuICAgICAgICAgICAgICAgIGxldCBkID0ge307XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBzdGF0ZV9rZXkgaW4gc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pc0ZpbHRlcmluZyhjb25maWcsIHN0YXRlX2tleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRbc3RhdGVfa2V5XSA9IHN0YXRlW3N0YXRlX2tleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0RGF0ZShjb25maWcsIGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIHNldENvbmZpZyhjb25maWcpIHtcbiAgICAgICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRDb25maWcsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7b2JqZWN0fVxuICAgICAqL1xuICAgIGdldENvbmZpZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWdcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIF9zZXREYXRlKGNvbmZpZywgZGF0YSkge1xuICAgICAgICBjb25zdCBzdG9yYWdlX3R5cGUgPSBjb25maWcuc3RvcmFnZV90eXBlO1xuICAgICAgICBpZiAoc3RvcmFnZV90eXBlID09PSAnbG9jYWxfc3RvcmFnZScpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsX2tleSA9IGNvbmZpZy5sb2NhbF9rZXk7XG4gICAgICAgICAgICBzYXZlTG9jYWxTdG9yYWdlKGxvY2FsX2tleSwgZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBmaWxlX3BhdGggPSBjb25maWcuZmlsZV9wYXRoO1xuICAgICAgICAgICAgY29uc3QgZmlsZV9uYW1lID0gY29uZmlnLmZpbGVfbmFtZTtcbiAgICAgICAgICAgIHNhdmVGaWxlU3RvcmFnZShmaWxlX3BhdGgsIGZpbGVfbmFtZSwgZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gY29uZmlnXG4gICAgICogQHJldHVybiB7b2JqZWN0fVxuICAgICAqL1xuICAgIF9nZXREYXRlKGNvbmZpZykge1xuICAgICAgICBjb25zdCBzdG9yYWdlX3R5cGUgPSBjb25maWcuc3RvcmFnZV90eXBlO1xuICAgICAgICBsZXQgZGF0YTtcbiAgICAgICAgaWYgKHN0b3JhZ2VfdHlwZSA9PT0gJ2xvY2FsX3N0b3JhZ2UnKSB7XG4gICAgICAgICAgICBjb25zdCBsb2NhbF9rZXkgPSBjb25maWcubG9jYWxfa2V5O1xuICAgICAgICAgICAgZGF0YSA9IGxvYWRMb2NhbFN0b3JhZ2UobG9jYWxfa2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVfcGF0aCA9IGNvbmZpZy5maWxlX3BhdGg7XG4gICAgICAgICAgICBjb25zdCBmaWxlX25hbWUgPSBjb25maWcuZmlsZV9uYW1lO1xuICAgICAgICAgICAgZGF0YSA9IGxvYWRGaWxlU3RvcmFnZShmaWxlX3BhdGgsIGZpbGVfbmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZ1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZV9rZXlcbiAgICAgKiBAcmV0dXJuIHtib29sfVxuICAgICAqL1xuICAgIF9pc0ZpbHRlcmluZyhjb25maWcsIHN0YXRlX2tleSkge1xuICAgICAgICBjb25zdCBmaWx0ZXJfdHlwZSA9IGNvbmZpZy5maWx0ZXJfdHlwZTtcbiAgICAgICAgY29uc3QgZmlsdGVyX2xpc3QgPSBjb25maWcuZmlsdGVyX2xpc3Q7XG4gICAgICAgIGlmIChmaWx0ZXJfdHlwZSA9PT0gJ2JsYWNrbGlzdCcpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlsdGVyX2xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyX2xpc3RbaV0gPT09IHN0YXRlX2tleSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbHRlcl9saXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlcl9saXN0W2ldID09PSBzdGF0ZV9rZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==