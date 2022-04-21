chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        var: "local storage set here"
    });

    chrome.contextMenus.create ({
        id: 'start',
        title: "context-menu title goes here",
        contexts: ["all"]
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
        chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["/css/foreground.css"]
        })
        .then(() => {
            console.log("Injected: /css/foreground.css");

            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ["/js/foreground.js"]
            })
            .then(() => {
                console.log("Injected: /js/foreground.js");
            });
        })
        .catch(err => console.log(err));
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'get_var') {
        chrome.storage.local.get('var', data => {
            if (chrome.runtime.lastError) {
                sendResponse({
                    message: 'fail'
                });
                return;
            }
            sendResponse({
                message: 'success',
                payload: data.var
            });
        });

        return true;
    } else if (request.message === 'change_var') {
        chrome.storage.local.set({
            var: request.payload
        }, () => {
            if (chrome.runtime.lastError) {
                sendResponse({ message: 'fail' });
                return;
            }

            sendResponse({ message: 'success' });
        })

        return true;
    }
});
