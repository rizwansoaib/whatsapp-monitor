
setTimeout(function(){
        var os = document.createElement('script');
 
        os.src = chrome.runtime.getURL('inject_wp.js');      

        (document.head || document.documentElement).appendChild(os);
        console.log("Protobuf connecting");

},20000);


     






