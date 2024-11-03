
var os = document.createElement('script');
        //s.src = chrome.extension.getURL('pagescript.js');
        os.src = chrome.runtime.getURL('inject_wp.js');
        /*
window.onload = function() {
        setTimeout(function() {
                os.src = chrome.runtime.getURL('inject_wp.js');
        }, 10000); // 10000 milliseconds = 10 seconds
};
*/

        (document.head || document.documentElement).appendChild(os);


     



console.log("Protobuf connecting")


