;(function () {
    let namespace = Ext.namespace('Ext.Chrome');

    namespace.Storage = function () {

        /**
         * @param {Object} data
         * @param {function} callback
         */
        this.setOption = function (data, callback) {
            chrome.storage.local.set(data, function () {
                if (typeof callback === 'function') {
                    callback();
                }
            })
        }

        /**
         * @param {string|string[]} keys
         * @param {function} callback
         */
        this.getOptions = function (keys, callback) {
            chrome.storage.local.get(keys, function (data) {
                if (typeof callback === 'function') {
                    callback(data);
                }
            });
        }

        /**
         * @param {string|string[]} keys
         * @param {function} callback
         */
        this.removeOption = function (keys, callback) {
            chrome.storage.local.remove(keys, function () {
                if (typeof callback === 'function') {
                    callback();
                }
            })
        }

        this.clearOptions = function (callback) {
            chrome.storage.local.clear(function () {
                if (typeof callback === 'function') {
                    callback();
                }
            });
        }
    }
})();