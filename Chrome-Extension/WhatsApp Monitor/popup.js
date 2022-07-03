


console.log('popup.js working')




try {

    chrome.storage.sync.get(['nkey'], function(result) {
       
       
        document.getElementById('qr').src=result.nkey+'/qr.svg';
        document.getElementById('link').innerText=result.nkey;
        document.getElementById('link').setAttribute("data-url", result.nkey);
        document.getElementById('link').setAttribute("href", result.nkey);
        document.getElementById('new_key').innerHTML='Generate New'

      });
    
} catch (error) {
    
    chrome.storage.sync.get(['nkey'], function(result) {
        document.getElementById('qr').src=result.nkey+'/qr.svg';
        document.getElementById('link').innerText=result.nkey;
        document.getElementById('link').setAttribute("data-url", result.nkey);
        document.getElementById('link').setAttribute("href", result.nkey);
        document.getElementById('new_key').innerHTML='Generate New'
      });
}





var myTabId;

//chrome.tabs.query({active:true,windowType:"normal", currentWindow: true},function(d){myTabId=d[0].id;})




update_numarrray();




function start(mnkey,save_interval) {

	b.innerText='Cancel';
	//console.log(b.innerText);

	b.className="btn-danger";

	//alert("stop set");

    console.log("mnkey from start_fun",mnkey);



	chrome.storage.local.set({
    'flag': 1
    
   
});


if(mnkey)
{
    console.log("mnkey is not undefined");

    chrome.storage.local.set({
        'mnkey': mnkey
        
       
    });
}

	



chrome.storage.sync.set({
    'numarray': numarray
    
   
});



console.log("nno val start_fun",nno);

chrome.storage.local.set({
    'nno': nno
    
   
});


chrome.storage.local.set({
    'pso': pso
    
   
});


if(save_interval!='null')
{
    chrome.storage.local.set({
        'save_interval':save_interval 
        
       
    });
}





chrome.storage.local.set({
    'mob': mob
    
   
});



 


chrome.tabs.query({active: true, currentWindow: true}).then(([tab]) => {
    chrome.scripting.executeScript(
      {
        target: {tabId: tab.id},
        files: ['online.js'],
        // function: () => {}, // files or function, both do not work.
      })
  })
















  
}








function stop() {

	chrome.storage.local.set({
    'flag': 0
   
});


  
}




save_interval=0;


function get()
{

    var mnkey=document.getElementById('link').innerText;
    save_interval=document.getElementById('interval').value;

	pso=document.querySelector('input[name="ps"]:checked').value; 
    nno=document.querySelector('input[name="nn"]:checked').value; 
	b=document.getElementById('start')
	

    console.log("nno value:",nno);
    if(nno==1 || mnkey=="Please Generate")
    {
        mnkey=undefined;
    }
   
    
    
	//alert(b.innerText);
	console.log("nkey val popup.js",mnkey);
	if(b.innerText=='OK'){start(mnkey,save_interval);}
	else{stop();b.innerText='OK';b.className="btn-success";}
       

}

document.getElementById('start').addEventListener('click', get);






function mobchat()
{
    console.log("enter mobchat");
    mob=document.getElementById('mob').value;
    console.log(mob)

chrome.storage.local.set({
    'mob': mob
    
   
});











chrome.tabs.query({active: true, currentWindow: true}).then(([tab]) => {
    chrome.scripting.executeScript(
      {
        target: {tabId: tab.id},
        files: ['mobchat.js'],
        // function: () => {}, // files or function, both do not work.
      })
  })






 

}



function new_key(){
  
  
    document.getElementById('new_key').innerHTML=' <i class="fas fa-circle-notch fa-spin"></i>'
     
     
    const req = new XMLHttpRequest();
    const baseUrl = "https://notify.run/api/register_channel";

    req.open("POST", baseUrl, true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send();

    req.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
           
            var body = JSON.parse(req.responseText || null);
            new_url=body['endpoint']
            console.log(new_url)
            

            chrome.storage.sync.set({"nkey": new_url}, function() {
            document.getElementById('qr').src=new_url+'/qr.svg';
            document.getElementById('link').innerText=new_url;
            document.getElementById('link').setAttribute("data-url", new_url);
            document.getElementById('link').setAttribute("href", new_url);
            document.getElementById('new_key').innerHTML='Generate New'
        
        
              });

        }
    }
     
    }  



document.getElementById('mobchat').addEventListener('click', mobchat);
document.getElementById('savenum').addEventListener('click', savenum);
document.getElementById('delnum').addEventListener('click', delnum);
document.getElementById('new_key').addEventListener('click', new_key);







try{
	al=document.querySelectorAll('#userbtn')[0].innerHTML
	
}
catch(err){

	



chrome.tabs.query({active: true, currentWindow: true}).then(([tab]) => {
    chrome.scripting.executeScript(
      {
        target: {tabId: tab.id},
        files: ['websocket.js'],
        // function: () => {}, // files or function, both do not work.
      })
  })


  chrome.tabs.query({active: true, currentWindow: true}).then(([tab]) => {
    chrome.scripting.executeScript(
      {
        target: {tabId: tab.id},
        files: ['protobuf.js'],
        // function: () => {}, // files or function, both do not work.
      })
  })




  chrome.tabs.query({active: true, currentWindow: true}).then(([tab]) => {
    chrome.scripting.executeScript(
      {
        target: {tabId: tab.id},
        files: ['main.js'],
        // function: () => {}, // files or function, both do not work.
      })
  })






 

}





var numarray;


function update_numarrray(){

    console.log('update_numarray call')

chrome.storage.sync.get(
    ['numarray']
,
function(data) {
    if(data.numarray==undefined)
    data.numarray=[];
    if(numarray==undefined)
    numarray=new Array();
    numarray=data.numarray;

   console.log(numarray)
   document.getElementById('numarray').innerHTML=''

   

   numarray.forEach(number => {
    
    document.getElementById('numarray').innerHTML+='<span>+'+number+'</span><br>'




});

   


}

);
}  












function savenum() {

    
    var mob_number = document.getElementById('mob').value;

    console.log(mob_number);

    console.log(mob_number);
    if(mob_number.startsWith("+")) {
        mob_number=mob_number.substring(1);
    }





chrome.storage.sync.set({
    numarray:numarray
}, function() {
   
});

    if(mob_number!=null || mob_number!=undefined && mob_number.length > 8){

      
          
if(numarray!=undefined){
        
            numarray.push(mob_number)

}

            //then call the set to update with modified value
            chrome.storage.sync.set({
                numarray:numarray
            }, function() {
                console.log("added to list with new values");
            });
            }

update_numarrray();
    


}



function delnum() {

    
    var mob_number = document.getElementById('mob').value;
    
    console.log(mob_number);
    if(mob_number.startsWith("+")) {
        mob_number=mob_number.substring(1);
    }


    if(mob_number!=null || mob_number!=undefined && mob_number.length > 8){


        
            numarray = numarray.filter(item => item !== mob_number)
    
            chrome.storage.sync.set({"numarray": numarray}, function() {
                console.log('deleted'+number);
                console.log(numarray);
        
        
              });
        
              update_numarrray();
            
               
                }
    
    update_numarrray();
         
    


}








document.addEventListener('DOMContentLoaded', function () {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
});






