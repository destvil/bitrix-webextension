;(function () {
    let injector = Ext.namespace('injector');

    injector.injectFunction = function (func, args) {
        let injection = '';
        let argumentNames = [];

        for (let index in args) {
            if (!args.hasOwnProperty(index)) {
                continue;
            }

            injection += 'let ' + index + ' = ' + args[index] + ";\n";
            argumentNames.push(index);
        }
        injection += '(' + func.toString() + ')(' + argumentNames.join(', ') +');';

        injector.injectJs(injection);
    };

    injector.injectJs = function (js) {
        let node = document.createElement('script');
        node.innerHTML = js;
        document.body.appendChild(node);
    }
})();