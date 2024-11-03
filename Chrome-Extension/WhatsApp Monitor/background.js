    // background.js

    chrome.runtime.onInstalled.addListener(() => {
      console.log("Extension installed and background script running.");
        const manifest = chrome.runtime.getManifest();
        const serverUrl = manifest.SERVER_URL;  // Access your custom field
        console.log('Server URL:', serverUrl);  // Outputs: https://example.com/api

        // Store the value using chrome.storage API if needed
        chrome.storage.local.set({ serverUrl });
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === "open_popup") {
            chrome.action.setPopup({popup: "popup.html"}, () => {
                chrome.action.openPopup();
            });
        }
    });
  /*

    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.status === 'complete' && tab.url.includes("*://web.whatsapp.com/*")) {
          chrome.scripting.executeScript(
              {
                  target: {tabId: tab.id},
                  files: ['websocket.js'],
                  // function: () => {}, // files or function, both do not work.
              });
      }
    });

     // Load the server URL if present
    chrome.storage.local.get(['serverUrl'], (result) => {
        if (result.serverUrl) {
            document.getElementById('serverUrl').value = result.serverUrl;
        }
    });

    */