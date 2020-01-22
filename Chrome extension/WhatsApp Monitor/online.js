var online = document.getElementsByClassName("_315-i");
var user = document.getElementsByClassName("_19RFN");
n=document.querySelector("#main > header > div._3V5x5 > div > div > span")
function trackuser() {

	   var flag=1;


 
		setTimeout(function(){


			
			try {
				if (online[0].innerText == "online" || online[0].innerText == "typing..." ) {
					n.innerText=user[0].innerText+"\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0🅦🅗🅐🅣🅢🅐🅟🅟 \u00a0\u00a0\u00a0\u00a0\u00a0\u00a0🅜🅞🅝🅘🅣🅞🅡";
					n.style.color="green";
					online[0].style.color="green";
					
					console.log(user[0].innerText + " is Online");
					let url = chrome.runtime.getURL('beep.mp3')
	                let a = new Audio(url)
	                a.play()
	                flag=0; 
	                
  
				}  else {
						console.log(online[0].innerText);
					    n.innerText=user[0].innerText+" [Offine]"+"\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0🅦🅗🅐🅣🅢🅐🅟🅟\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0🅜🅞🅝🅘🅣🅞🅡";
					    n.style.color="red";

						flag=1;
					}
				}
			 catch(error) {
				console.error("User offline");
				n.innerText=user[0].innerText+" [Offine]"+"\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0🅦🅗🅐🅣🅢🅐🅟🅟\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0🅜🅞🅝🅘🅣🅞🅡";
					    n.style.color="red";
				flag=1
			}

			var flag=""
chrome.storage.local.get('flag', function (result) {
        flag = result.flag;
        if(flag==1){trackuser();}
            
    });
            
			
		}, 3000);
	
}
trackuser()
