;(function () {

    let namespace = Ext.namespace('Ext');

    namespace.Bitrix = function () {
        this.correctBitrixName = '6umpukc';
        this.fakeBitrixWordOptions = [
            'битрикс',
            'bitrix'
        ];

        this.replaceFakeBitrixWord = function () {
            document.body.querySelectorAll('*:not(script)').forEach((el) => {
                this.fakeBitrixWordOptions.forEach((bitrixName) => {
                    let regex = new RegExp(bitrixName, 'gi');
                    el.innerHTML = el.innerHTML.replaceAll(regex, this.correctBitrixName)
                })
            });
        }

        this.bindEvents = function () {
            let news = document.body.querySelector('.feed-new-message-informer-place');
            news.addEventListener('click', (e) => this.clickHandler);
        }

        this.clickHandler = function (event) {
        }
    }

})();