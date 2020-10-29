;(function () {
    let injector = Ext.namespace('injector');

    injector.injectJs = function (js) {
        let node = document.createElement('script');
        node.innerHTML = js;
        document.body.appendChild(node);
    }
})();