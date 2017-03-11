# redux-state-save

Save and load the redux state.


## Installation

```
npm install --save redux-state-save
```


# Usage

## Example 1  (Use the local storage)
Example of the most simple method of use. Save all of the redux state that have registered to reducers to local storage.


```
import Storage from 'redux-state-save'

var storage1 = new Storage();
storage1.setConfig({
    storage_type: 'local_storage',
    local_key: 'redux-states',
});
var store = createStore(
    reducers,
    applyMiddleware(
        storage1.saveState()
    )
);

// state data load from local storage
store = storage1.loadState(store);
```

## Example 2 (Use the file storage)
If you use file storage. have to set "storage_type" and "path" for config option.

```
import Storage from 'redux-state-save'

var storage1 = new Storage();
storage1.setConfig({
    storage_type: 'file_storage',
    file_path: 'c:\test',
    file_name: 'user.json',
});
var store = createStore(
    reducers,
    applyMiddleware(
        storage1.saveState()
    )
);

// state data load from local storage
store = storage1.loadState(store);
```



## Example 3  (Use multi storage)
State saved using both of local storage and file storage in the below example.

```
import Storage from 'redux-state-save'

var storage1 = new Storage();
var storage2 = new Storage();

storage1 = {
    storage_type: 'local_storage',
    local_key: 'state-log',
    filter_type: 'whitelist',
    filter_list: [
        'stateLog',
    ],
};

storage2 = {
    storage_type: 'file_storage',
    file_path: 'c:\abc',
    file_name: 'user.json',
    filter_type: 'whitelist',
    filter_list: [
        'stateUser',
    ],
};

var store = createStore(
    reducers,
    applyMiddleware(
        storage1.saveState(),
        storage2.saveState()
    )
);

store = storage1.loadState(store);
store = storage2.loadState(store);
```
## API

### .saveState()


### .loadState(createStore())


### .setConfig({options})
|   options  |    type    |      default       |   description   |
|:-----------|-----------:|:------------------:|:---------------:|
|storage_type|   string   |      "local_storage"       |   "local_storage" or "file_storage"   |
| filter_type|   string   |    "blacklist"     |   "whitelist" or "blacklist"   |
| filter_list|   array    |        []          |   set the state name to filter   |
| file_path  |   string   |        ""          |   If you use file storage. have to set path value   |
| file_name  |   string   |"redux-states.json" |   Can set the file name for save the file   |
| local_key  |   string   |   "redux-states"   |   local storage key name   |


## License

WTFPL