
curr_user_num=-1;

var openChat = phone => {
  var link = document.createElement("a");
  link.setAttribute("href", `whatsapp://send?phone=${phone}`);
  document.body.append(link);
  link.click();
  document.body.removeChild(link);
};



contactlist="";
n="";

chrome.storage.local.get('contactlist', function (result) {
         contactlist = result.contactlist; 
          n=contactlist.length; 
        
            
    });


/*
let mcnkey;
chrome.storage.local.get('mcnkey', function (result2) {
        mcnkey = result2.mcnkey;
        
        if(mcnkey!="")
        alert("Subcribe any Device for Notification\nhttps://notify.run/"+mcnkey)
        
        
            
    });





let mcpso;
chrome.storage.local.get('mcpso', function (result3) {
        mcpso = result3.mcpso;

        
            
    });




*/

var d   = new Date();
var curd=d.toLocaleDateString().split(' ')[0]
i=2;




rows = [];

rows.push(["WhatsApp Monitor","Multiple",curd]);
rows.push(["Name"," Time ", " Status "]);


 











function onotif(user) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://notify.run/"+nkey,true);
    xhr.send("📱WhatsApp Monitor: "+user+" is Online")
}









function playsound()
{

let url = chrome.runtime.getURL('beep.mp3')
                  let a = new Audio(url)
                  if(pso=="1")
                  a.play()

}





function notify(user) {

  
  if(pso=="2")
  {
    let url = chrome.runtime.getURL('beep.mp3')
    let a = new Audio(url)
    a.play()
  }
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

    setTimeout(function(){


 
 

    a=contactlist;
    n=a.length;
    curr_user_num++;
     var key=curr_user_num%n;
     
     var x=a[key]

     console.log("Start Monitor: ",x);
     openChat(x);
  




 online = document.getElementsByClassName("_3-cMa _3Whw5");
 user = document.querySelector("#main > header > div._33QME > div._2FCjS > div > span").innerText
 n=document.querySelector("#main > header > div._33QME > div._2ruUq._3xjAz > span")

   
     

   var flag=1;


 
 


 
	





      
			
      
			try {
				if (online[0].innerText == "online" || online[0].innerText == "typing..." ) {
					 online = document.getElementsByClassName("_3-cMa _3Whw5");
           user = document.querySelector("#main > header > div._33QME > div._2FCjS > div > span").innerText
           n=document.querySelector("#main > header > div._33QME > div._2ruUq._3xjAz > span")

          if(n!=undefined)
					n.style.color="green";
					online[0].style.color="green";
          console.log(user+ " is Online");
          //console.error("if",wrif,wri,stopdate)
					if(wrif==1 && wri==0 && stopdate==0){

               
                        wrif=1
                        wri=1
                        stopdate=1
						startDate   = new Date();
            t1=startDate.toTimeString().split(' ')[0]
            oldt= startDate.getTime();
            //console.error("startDate writing",oldt);

					}
           console.error("Saving csv");
            rows[i]=[user,t1," online "];
            i++;
                            

          /*console.log("notif val: ",notif);
					
          if(notif==1)
          {
            //console.log("Notification Starting:",user);
              notify(user);
              onotif(user);
              notif=0
          }
				
       // console.log("Playing Sound");
					playsound();

					*/

	                flag=0; 
	                
  
				}  else {
            
						console.log(online[0].innerText);
            //console.error("else",wrif,wri);
            notif=1 ;  
                        if(n!=undefined)
					    n.style.color="red";

					     if(wrif==1 && wri==1 && stopdate==1)
                        {
                          
                        console.error(oldt)
                        var endDate   = new Date();
                        var t2=endDate.toTimeString().split(' ')[0]
                        var diff = (endDate.getTime() - oldt) / 1000;
                        var hour="00";
                        var minute=(Math.floor(diff/60)).toString();
                        var seconds=(Math.floor(diff%60)).toString();
                        var t=hour+":"+minute+":"+seconds;
                           //console.error("Saving csv");
                          rows[i]=[user,t1," online "];
                          i++;
                            
                           wrif=1
                           wri=0
                           stopdate=0
                          
                        }

                        

						flag=1;
					
					}
				}
			 catch(error) {
				
       
              notif=1
                        if(n!=undefined)
					    n.style.color="red";
              console.error("User offline");
               //console.error("catch",wrif,wri,stopdate);
					    
                        if(wrif==1 && wri==1 && stopdate==1)
                        {
                          
                        console.error(oldt)
                        var endDate   = new Date();
                        var t2=endDate.toTimeString().split(' ')[0]
                        var diff = (endDate.getTime() - oldt) / 1000;
                        var hour="00";
                        var minute=(Math.floor(diff/60)).toString();
                        var seconds=(Math.floor(diff%60)).toString();
                        var t=hour+":"+minute+":"+seconds;
                          
                           wrif=1
                           wri=0
                           stopdate=0
                          
                        }
				flag=1
			
			}

			var flag=""
chrome.storage.local.get('flag', function (result) {
        flag = result.flag;





        if(flag==1){trackuser(rows);}
            
    });




            
			
		}, 1500);
	
}

wrif=1
wri=0
stopdate=0
notif=1

trackuser(rows)
















function dcsv() {
	let csvContent = "data:text/csv;charset=utf-8," 
    + rows.map(e => e.join(",")).join("\n");

var encodedUri = encodeURI(csvContent);
var link = document.createElement("a");
link.setAttribute("href", encodedUri);
link.setAttribute("download", "Multiple"+d+".csv");
document.body.appendChild(link); 
link.click();


}











var btn = document.createElement("BUTTON");   
btn.innerHTML = " WhatsApp Monitor Online History";  
btn.style.width="100px";
btn.id="download";                 
document.querySelector("#side > header").appendChild(btn);
btn.style.backgroundColor="#075e54";
btn.style.color="white";


var img=document.createElement("IMG");
img.src="https://raw.githubusercontent.com/rizwansoaib/whatsapp-monitor/master/Chrome-Extension/WhatsApp%20Monitor/images/icons/64.png"
document.querySelector("#side > header").appendChild(img);




document.getElementById('download').addEventListener('click', dcsv);
