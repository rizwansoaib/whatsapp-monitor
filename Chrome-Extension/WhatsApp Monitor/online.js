var online = document.getElementsByClassName("_315-i");
var user = document.querySelector("#main > header > div._3V5x5 > div > div > span").innerText
n=document.querySelector("#main > header > div._3V5x5 > div > div > span")

function notify(user) {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  else if (Notification.permission === "granted") {
    var notification = new Notification("📱"+user+" is Online in WhatsApp 📱");
  }
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {

      if(!('permission' in Notification)) {
        Notification.permission = permission;
      }

      if (permission === "granted") {
        var notification = new Notification("📱"+user+" is Online in WhatsApp 📱");
      }
    });
  } else {
    alert(`Permission is ${Notification.permission}`);
  }
}





function trackuser() {

	   var flag=1;


 
		setTimeout(function(){


			
			try {
				if (online[0].innerText == "online" || online[0].innerText == "typing..." ) {
					n.style.color="green";
					online[0].style.color="green";
					notify(user);
					console.log(user+ " is Online");

					let url = chrome.runtime.getURL('beep.mp3')
	                let a = new Audio(url)
	                a.play()

	                flag=0; 
	                
  
				}  else {
						console.log(online[0].innerText);
					    n.style.color="red";

						flag=1;
					}
				}
			 catch(error) {
				console.error("User offline");
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
