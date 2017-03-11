import {
    loadLocalStorage,
    saveLocalStorage,
} from './localStorage.js';

import {
    loadFileStorage,
    saveFileStorage,
} from './fileStorage.js';

export default class Storage {
    constructor() {
        this.defaultConfig = {
            storage_type: 'local_storage', // "local_storage", "file_storage"
            filter_type: 'blacklist', // "whitelist", "blacklist"
            filter_list: [],
            file_path: '',
            file_name: 'redux-states.json',
            local_key: 'redux-states',
        };
        this.config = {};
    }

    loadState(store) {
        const config = this.getConfig();
        const data   = this._getDate(config);
        for (const state_key in data) {
            if (!this._isFiltering(config, state_key)) {
                store.getState()[state_key] = data[state_key];
            }
        }
        return store;
    }
  
    saveState() {
        return ({ getState }) => {
            return (next) => (action) => {
                next(action);

                const config = this.getConfig();
                const state  = getState();
                let d = {};
                for (const state_key in state) {
                    if (!this._isFiltering(config, state_key)) {
                        d[state_key] = state[state_key];
                    }
                }
                this._setDate(config, d);
            }
        }
    }

    /**
     * @param {object} config
     */
    setConfig(config) {
        this.config = Object.assign({}, this.defaultConfig, config);
    }

    /**
     * @return {object}
     */
    getConfig() {
        return this.config;
    }

    /**
     * @param {object} config
     * @param {object} data
     */
    _setDate(config, data) {
        const storage_type = config.storage_type;
        if (storage_type === 'local_storage') {
            const local_key = config.local_key;
            saveLocalStorage(local_key, data);
        } else {
            const file_path = config.file_path;
            const file_name = config.file_name;
            saveFileStorage(file_path, file_name, data);
        }
    }

    /**
     * @param {object} config
     * @return {object}
     */
    _getDate(config) {
        const storage_type = config.storage_type;
        let data;
        if (storage_type === 'local_storage') {
            const local_key = config.local_key;
            data = loadLocalStorage(local_key);
        } else {
            const file_path = config.file_path;
            const file_name = config.file_name;
            data = loadFileStorage(file_path, file_name);
        }
        return data;
    }

    /**
     * @param {object} config
     * @param {string} state_key
     * @return {bool}
     */
    _isFiltering(config, state_key) {
        const filter_type = config.filter_type;
        const filter_list = config.filter_list;
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
}