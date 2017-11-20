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