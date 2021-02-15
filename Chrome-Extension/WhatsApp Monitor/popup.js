
function start(nkey,save_interval) {

	b.innerText='Cancel';
	//console.log(b.innerText);

	b.className="btn-danger";

	//alert("stop set");



	chrome.storage.local.set({
    'flag': 1
    
   
});


	chrome.storage.local.set({
    'nkey': nkey
    
   
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



 


chrome.tabs.executeScript({
    file: 'online.js'
  }); 









  
}








function stop() {

	chrome.storage.local.set({
    'flag': 0
   
});


  
}




save_interval=0;


function get()
{

 




    var nkey=document.getElementById('nkey').value;
   

    save_interval=document.getElementById('interval').value;


    chrome.storage.sync.set({"nkey": nkey}, function() {
        document.getElementById('nkey').value=nkey;


      });




	pso=document.querySelector('input[name="ps"]:checked').value; 
	b=document.getElementById('start')
	
    
	//alert(b.innerText);
	//console.log(nkey,pso,b);
	if(b.innerText=='OK'){start(nkey,save_interval);}
	else{stop();b.innerText='OK';b.className="btn-success";}
       

}

document.getElementById('start').addEventListener('click', get);


try {

    chrome.storage.sync.get(['nkey'], function(result) {
       
        document.getElementById('nkey').value=result.nkey;
      });
    
} catch (error) {
    
    chrome.storage.sync.get(['nkey'], function(result) {
        document.getElementById('nkey').value=result.nkey;
      });
}


function mobchat()
{
    mob=document.getElementById('mob').value;

chrome.storage.local.set({
    'mob': mob
    
   
});




chrome.tabs.executeScript({
    file: 'mobchat.js'
  }); 




 

}





document.getElementById('mobchat').addEventListener('click', mobchat);






try{
	al=document.querySelectorAll('#userbtn')[0].innerHTML
	
}
catch(err){

	chrome.tabs.executeScript({
    file: 'websocket.js'
  }); 


chrome.tabs.executeScript({
    file: 'protobuf.js'
  });



chrome.tabs.executeScript({
    file: 'main.js'
  });


 


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







