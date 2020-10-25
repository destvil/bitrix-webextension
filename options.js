let Options = function () {

    this.globalSettingsSelector = '.global-settings';
    this.globalSettingsNames = [
        'format-bitrix-name',
        'comment-format'
    ];

    this.advancedSettingsListSelector = '.advanced-settings-list';
    this.advancedSettingsItemSelector = '.advanced-settings-item';
    this.advancedSettingsBtnAddSelector = '.advanced-settings-add';
    this.advancedSettingsItemContainerSelector = this.advancedSettingsItemSelector + '.container'
    this.advancedSettingsNames = [
        'domain',
        'format-bitrix-name',
        'comment-format',
        'white-list'
    ];

    this.commentOptionListSelector = '.comment-option-list';
    this.commentOptionFieldSelector = 'input.comment-option-field';
    this.commentOptionBtnAddSelector = '.comment-option-add';
    this.commentOptionFieldContainerSelector = this.commentOptionFieldSelector + '.container';

    this.optionSaveButtonSelector = '.btn-options-save';
    this.optionStatusSelector = '.options-status';

    /**
     * Регистрация обработчиков
     */
    this.bindEvents = function () {
        let advancedSettingsBtn = document.querySelector(this.advancedSettingsBtnAddSelector);
        if (advancedSettingsBtn) {
            advancedSettingsBtn.addEventListener('click', (e) => this.addAdvancedOptionHandle(e));
        }

        let commentOptionBtn = document.querySelector(this.commentOptionBtnAddSelector);
        if (commentOptionBtn) {
            commentOptionBtn.addEventListener('click', (e) => this.addCommentOptionHandle(e));
        }

        let saveOptionBtn = document.querySelector(this.optionSaveButtonSelector);
        if (saveOptionBtn) {
            saveOptionBtn.addEventListener('click', () => this.saveOptionsHandle());
        }
    }

    this.loadSettings = function () {
        let storage = new Ext.Chrome.Storage();
        storage.getOptions(null, (settings) => {
            console.log(settings);
            if (settings.hasOwnProperty('global')) {
                this.loadGlobalSettings(settings['global']);
            }

            if (settings.hasOwnProperty('comments')) {
                this.loadCommentOptions(settings['comments']);
            }

            if (settings.hasOwnProperty('advanced')) {
                this.loadAdvancedSettings(settings['advanced']);
            }
        })
    }

    /**
     * Загрузка глобальных настроек
     *
     * @param {{}} data
     */
    this.loadGlobalSettings = function (data) {
        let globalSettingsNode = document.querySelector(this.globalSettingsSelector);
        if (!globalSettingsNode) {
            return;
        }

        for (let key in data) {
            if (!data.hasOwnProperty(key)) {
                continue;
            }

            let field = globalSettingsNode.querySelector('[name="'+key+'"]');
            if (!field) {
                continue;
            }

            if (field.type === 'checkbox') {
                field.checked = data[key];
            } else if (field.type === 'text') {
                field.value = data[key];
            } else {
                continue;
            }
        }
    }

    /**
     * Загрузка дополнительных настроек
     *
     * @param {{}} data
     */
    this.loadAdvancedSettings = function (data) {
        let advancedListItems = document.querySelector(this.advancedSettingsListSelector);
        if (!advancedListItems) {
            return;
        }

        let emptyAdvancedItem = document.querySelector(this.advancedSettingsItemContainerSelector);
        if (!emptyAdvancedItem) {
            return;
        }

        for (let domain in data) {

            console.log(data[domain]);
            if (!data.hasOwnProperty(domain)) {
                continue;
            }

            let advancedItem = emptyAdvancedItem.cloneNode(true);
            advancedItem.classList.remove('container');
            advancedItem.open = false;

            advancedItem.querySelector('summary').innerText = domain;

            for (let key in data[domain]) {
                if (!data[domain].hasOwnProperty(key)) {
                    continue;
                }

                let field = advancedItem.querySelector('[name="'+key+'"]');
                if (!field) {
                    continue;
                }

                if (field.type === 'checkbox') {
                    field.checked = data[domain][key];
                } else if (field.type === 'text') {
                    field.value = data[domain][key].trim();
                } else {
                    continue;
                }

            }

            advancedListItems.appendChild(advancedItem);
        }
    }

    /**
     * Загрузка комментариев
     *
     * @param {Array} data
     */
    this.loadCommentOptions = function (data) {
        if (!Array.isArray(data)) {
            return;
        }

        let listCommentsNode = document.querySelector(this.commentOptionListSelector);
        if (!listCommentsNode) {
            return;
        }

        let emptyCommentNode = document.querySelector(this.commentOptionFieldContainerSelector);
        if (!emptyCommentNode) {
            return;
        }

        data.forEach((comment) => {
            let newCommentNode = emptyCommentNode.cloneNode(true);

            newCommentNode.classList.remove('container');
            newCommentNode.value = comment.trim();

            listCommentsNode.appendChild(newCommentNode);

        });
    }

    /**
     * Добавить пустую опцию в дополнительные настроки
     */
    this.addAdvancedOptionHandle = function (e) {
        e.preventDefault();

        this.addOptionContainer(
            this.advancedSettingsItemContainerSelector,
            this.advancedSettingsListSelector
        );
    }

    /**
     * Добавить пустое поле для ввода нового комментария
     */
    this.addCommentOptionHandle = function (e) {
        e.preventDefault();

        this.addOptionContainer(
            this.commentOptionFieldContainerSelector,
            this.commentOptionListSelector
        );
    }

    /**
     * Метод, используемый для добавления пустого контейнера-опций в список опций.
     *
     * @param {string} optionContainerSelector Селектор пустой-опции
     * @param {string} optionListSelector Селектор списка
     */
    this.addOptionContainer = function (optionContainerSelector, optionListSelector) {
        let optionEmptyContainer = document.querySelector(optionContainerSelector);
        if (!optionEmptyContainer) {
            return;
        }

        let optionsList = document.querySelector(optionListSelector);
        if (!optionsList) {
            return;
        }

        let optionNode = optionEmptyContainer.cloneNode(true);
        optionNode.classList.remove('container');

        optionsList.appendChild(optionNode);
    }

    /**
     * Обработчик сохранения настроек
     */
    this.saveOptionsHandle = function () {
        let settings = {
            global: this.getGlobalSettings(),
            advanced: this.getAdvancedSettings(),
            comments: this.getCommentOptions()
        }

        let storage = new Ext.Chrome.Storage();
        storage.setOption(settings, () => {
            this.setOptionStatus('Настройки сохранены', 'success');
        });

        storage.getOptions(null, function (data) {
            console.log(data);
        });
    }

    /**
     * Получить значения полей глобальных настроек
     * Используется для сохранения настроек
     *
     * @returns {{}}
     */
    this.getGlobalSettings = function () {
        let settings = {};

        let globalSettingsNode = document.querySelector(this.globalSettingsSelector);
        if (!globalSettingsNode) {
            return settings;
        }

        this.globalSettingsNames.forEach(function (name) {
            let fieldValue = globalSettingsNode.querySelector('input[name="'+name+'"]');
            if (fieldValue.type === 'checkbox') {
                settings[name] = fieldValue.checked;
            } else {
                settings[name] = fieldValue.value;
            }
        });

        return settings;
    }

    /**
     * Получить значения полей дополнительных настроек
     * Используется для сохранения настроек
     *
     * @returns {{}}
     */
    this.getAdvancedSettings = function () {
        let settings = {};

        let advancedListSettings = document.querySelector(this.advancedSettingsListSelector);
        if (!advancedListSettings) {
            return settings;
        }

        let additionItemsSettings = advancedListSettings.querySelectorAll(this.advancedSettingsItemSelector);
        additionItemsSettings.forEach((item) => {
            let settingsItem = {};

            this.advancedSettingsNames.forEach((settingsName) => {
                let field = item.querySelector('[name="'+settingsName+'"]');
                if (!field) {
                    return true;
                }

                let value = null;
                if (field.type === 'checkbox') {
                    value = field.checked;
                } else if(field.type === 'text') {
                    value = field.value;
                } else {
                    return true;
                }

                settingsItem[settingsName] = value;
            });

            if (!settingsItem.domain || settingsItem.domain.length <= 0) {
                return true;
            }

            settings[settingsItem.domain] = settingsItem;
        });

        return settings;
    }

    /**
     * Получить значения полей комментариев
     * Используется для сохранения настроек
     *
     * @returns {{}}
     */
    this.getCommentOptions = function () {
        let settings = [];

        let commentListNode = document.querySelector(this.commentOptionListSelector);
        if (!commentListNode) {
            return settings;
        }

        let commentItems = commentListNode.querySelectorAll(this.commentOptionFieldSelector);
        commentItems.forEach(function (item) {
            let comment = item.value.trim();
            if (comment.length === 0) {
                return true;
            }

            settings.push(comment);
        });

        return settings;
    }

    /**
     * Устанавливает сообщение-статус
     * через 5 секунд сообщение исчезает
     *
     * @param {string} text
     * @param {string|string[]} additionClasses
     */
    this.setOptionStatus = function (text, additionClasses) {

        let optionStatusNode = document.querySelector(this.optionStatusSelector);
        if (!optionStatusNode) {
            return;
        }

        if (!Array.isArray(additionClasses)) {
            additionClasses = [additionClasses];
        }

        if (additionClasses !== null) {
            optionStatusNode.classList.add(...additionClasses);
        }

        optionStatusNode.textContent = text;

        setTimeout(function () {
            optionStatusNode.textContent = '';
            if (additionClasses !== null) {
                optionStatusNode.classList.remove(...additionClasses);
            }
        }, 5000);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    let options = new Options();
    options.loadSettings();
    options.bindEvents();
});