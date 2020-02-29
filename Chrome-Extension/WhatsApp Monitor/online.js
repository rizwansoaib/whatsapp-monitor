var online = document.getElementsByClassName("_315-i");
var user = document.querySelector("#main > header > div._3V5x5 > div > div > span").innerText
n=document.querySelector("#main > header > div._3V5x5 > div > div > span")

var d   = new Date();
var curd=d.toLocaleDateString().split(' ')[0]
i=2;


rows = [];


rows.push(["********",user, curd,"********"]);
rows.push([" Start ", "  Stop ", " Duration "," Status "]);


 

console.log(rows);






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





function trackuser(rows) {	   
   
      
      

   var flag=1;
   wrif=1
 


 
		setTimeout(function(){


			
			try {
				if (online[0].innerText == "online" || online[0].innerText == "typing..." ) {
					n.style.color="green";
					online[0].style.color="green";

					if(wrif==1){


                        wrif=0
                        wri=1
						startDate   = new Date();
            t1=startDate.toTimeString().split(' ')[0]

					}
					
					notify(user);
					console.log(user+ " is Online");

					let url = chrome.runtime.getURL('beep.mp3')
	                let a = new Audio(url)
	                a.play()

	                flag=0; 
	                
  
				}  else {
						console.log(online[0].innerText);
            console.error(wrif,wri);
           
					    n.style.color="red";

					    

                        if(wrif==1 && wri==1)
                        {

                          

                        	var t2=endDate.toTimeString().split(' ')[0]
                        var diff = (endDate.getTime() - startDate.getTime()) / 1000;
                        var hour="00";
                        var minute=(Math.floor(diff/60)).toString();
                        var seconds=(Math.floor(diff%60)).toString();
                        var t=hour+":"+minute+":"+seconds;
                        console.error("Saving History");
                        rows[i]=[t1, t2, t," online "];
                        i++;
                        	
                        }

						flag=1;
						wri=0
            wrif=1
					}
				}
			 catch(error) {
				console.error("User offline");
        console.error(wrif,wri);

					    n.style.color="red";
					    
                        if(wrif==1 && wri==1)
                        {
                          
                        var endDate   = new Date();
                        var endDate   = new Date();
                        var t2=endDate.toTimeString().split(' ')[0]
                        var diff = (endDate.getTime() - startDate.getTime()) / 1000;
                        var hour="00";
                        var minute=(Math.floor(diff/60)).toString();
                        var seconds=(Math.floor(diff%60)).toString();
                        var t=hour+":"+minute+":"+seconds;
                           console.error("Saving csv");
                        	rows[i]=[t1, t2, t," online "];
                          i++;
                        	
                        }
				flag=1
				wri=0
        wrif=1
			}

			var flag=""
chrome.storage.local.get('flag', function (result) {
        flag = result.flag;
        if(flag==1){trackuser(rows);}
            
    });
            
			
		}, 3000);
	
}


wri=0

trackuser(rows)
















function dcsv() {
	let csvContent = "data:text/csv;charset=utf-8," 
    + rows.map(e => e.join(",")).join("\n");

var encodedUri = encodeURI(csvContent);
var link = document.createElement("a");
link.setAttribute("href", encodedUri);
link.setAttribute("download", user+d+".csv");
document.body.appendChild(link); 
link.click();


}











var btn = document.createElement("BUTTON");   
btn.innerHTML = "Download History";  
btn.id="download";                 
document.querySelector("#main > header").appendChild(btn);
btn.style.backgroundColor="cyan";



document.getElementById('download').addEventListener('click', dcsv);
