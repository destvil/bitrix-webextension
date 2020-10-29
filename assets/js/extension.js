;(function () {

    let Ext = function () {
        this.run = function () {
            let bitrix = new Ext.Bitrix();

            if(bitrix.isBitrix24Site()) {
                bitrix.replaceFakeBitrixWord();
            }

            bitrix.modifyNotificationSound(0.1);
        }
    };

    Ext.namespace = function (namespace) {
        let path = window;

        let namespaceParts = namespace.split('.');
        namespaceParts.forEach(function (part) {
            if (path[part] === undefined) {
                path[part] = {};
            }
            path = path[part];
        });

        return path;
    };

    window.Ext = Ext;

})();