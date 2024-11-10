// background.js
chrome.runtime.onInstalled.addListener(() => {

    chrome.tabs.create({ url: 'https://github.com/rizwansoaib/whatsapp-monitor/tree/master' });

    chrome.notifications.create('notificationId', {
        type: 'basic',
        iconUrl: 'images/icons/128.png',
        title: 'TrackWapp Notification',
        message: 'Notification are Enabled and Working',
        priority: 2
    });
});


chrome.power.requestKeepAwake('system');
chrome.power.requestKeepAwake('display');


chrome.runtime.setUninstallURL('https://htmlpreview.github.io/?https://github.com/rizwansoaib/whatsapp-monitor/blob/master/Chrome-Extension/uninstall.html');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "open_popup") {
        chrome.action.setPopup({popup: "popup.html"}, () => {
            chrome.action.openPopup();
        });
    } else if (message.action === 'showNotification') {


        chrome.notifications.create('notificationId', {
            type: 'basic',
            iconUrl: 'images/icons/128.png',
            title: 'TrackWapp Notification',
            message: `📱${message.user} is Online in WhatsApp`,
            priority: 2
        });

        // Automatically delete the notification after 30 seconds
        setTimeout(() => {
            chrome.notifications.clear('notificationId');
        }, 10000);

    }
});
