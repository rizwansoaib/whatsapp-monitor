
var os = document.createElement('script');
        //s.src = chrome.extension.getURL('pagescript.js');
        os.src = chrome.runtime.getURL('inject_wp.js');

        (document.head || document.documentElement).appendChild(os);


     



console.log("Protobuf connecting")


