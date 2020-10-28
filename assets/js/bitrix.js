;(function () {

    let namespace = Ext.namespace('Ext');

    namespace.Bitrix = function () {
        this.correctBitrixName = '6umpukc';
        this.fakeBitrixWordOptions = [
            (new RegExp('битрикс', 'gi')),
            (new RegExp('\\s(bitrix)|(bitrix)\\s', 'gi')),
            (new RegExp('\\s(bitrix24)|(bitrix24)\\s', 'gi')),
        ];

        this.isBitrix24Site = function () {
            let bitrix24Node = document.querySelector('html.bx-core');
            return !!bitrix24Node;
        }

        this.replaceFakeBitrixWord = function () {
            try {
                document.body.querySelectorAll('*:not(script)').forEach((el) => {

                    let html = el.innerHTML;
                    this.fakeBitrixWordOptions.forEach((regex) => {

                        let match = html.match(regex);
                        if (!match) {
                            return true;
                        }

                        match.forEach((matches) => {
                            html = html.replace(matches.trim(), this.correctBitrixName);
                        });
                    });
                    el.innerHTML = html;

                });
            } catch (error) {
                console.warn(error.message);
            }
        }
    }

})();