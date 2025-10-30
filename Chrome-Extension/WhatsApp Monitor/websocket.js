// Use proper DOM ready detection instead of arbitrary timeout
function waitForElement(selector, callback, maxAttempts = 60, interval = 1000) {
    let attempts = 0;
    
    const checkElement = () => {
        const element = document.head;
        
        if (element) {
            callback();
        } else if (attempts < maxAttempts) {
            attempts++;
            setTimeout(checkElement, interval);
        } else {
            console.error('websockets: Element not found after maximum attempts');
        }
    };
    
    checkElement();
}

waitForElement('head', function() {
    var s = document.createElement('script');
    s.src = chrome.runtime.getURL('wapi.js');
    
    s.onload = function() {
        // Script loaded successfully
        console.log("websockets started");
    };
    
    s.onerror = function() {
        console.error("Failed to load wapi.js");
    };
    
    (document.head || document.documentElement).appendChild(s);
});


















