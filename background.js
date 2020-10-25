chrome.browserAction.onClicked.addListener(function(activeTab){
    var optionUrl = chrome.runtime.getURL('/options.html');
    chrome.tabs.create({ url: optionUrl });
});