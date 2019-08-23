//cache
var HG = {};
HG.cache = (function() {
    /*
    说明：
    1: JSON.stringfy --> set --> get --> JSON.parse
    2: data format well return as set`s
    3: undefined in array will be null after stringfy+parse
    4: NS --> namespace 缩写
    */
    var keyNS = 'hg-default-';

    function get(key) {
        /*
        legal data: "" [] {} null flase true

        illegal: undefined
            1: key not set
            2: key is cleared
            3: key removed
            4: wrong data format
        */
        var tempKey = keyNS + key;
        if (!isKeyExist(tempKey)) {
            return null;
        }
        // maybe keyNS could avoid conflict
        var val = localStorage.getItem(tempKey) || sessionStorage.getItem(tempKey);
        val = JSON.parse(val);
        // val format check
        if (val !== null
            && Object.prototype.hasOwnProperty.call(val, 'type')
            && Object.prototype.hasOwnProperty.call(val, 'data')) {
            return val.data;
        }
        return null;
    }
    // isPersistent
    function set(key, val, isTemp) {
        var store;
        if (isTemp) {
            store = sessionStorage;
        } else {
            store = localStorage;
        }
        store.setItem(keyNS + key, JSON.stringify({
            data: val,
            type: (typeof val)
        }));
    }

    function remove(key) {
        var tempKey = keyNS + key;
        localStorage.removeItem(tempKey);
        sessionStorage.removeItem(tempKey);
    }

    function isKeyExist(key) {
        // do not depend on value cause of ""和0
        return Object.prototype.hasOwnProperty.call(localStorage, key)
            || Object.prototype.hasOwnProperty.call(sessionStorage, key);
    }

    function setKeyNS(NS) {
        var isString = typeof NS === 'string';
        if (isString && NS !== '') {
            keyNS = NS;
        }
    }

    return {
        setKeyNS: setKeyNS,
        get: get,
        set: set,
        isSame: function(key1, key2){
            return keyNS + key1 == key2;
        },
        remove: remove
    };
})();