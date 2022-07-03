   

    if(document.head != null) {
        //clearInterval(clear)
        var s = document.createElement('script');
        s.src = chrome.runtime.getURL('wapi.js');
        




        s.onload = function() {
            //this.remove();
        };
        (document.head || document.documentElement).appendChild(s);
    }






console.log("websockets started")











