
function start(nkey) {

	b.innerText='Stop';
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




function get()
{

 




	var nkey=document.getElementById('nkey').value;
	pso=document.querySelector('input[name="ps"]:checked').value; 
	b=document.getElementById('start')
	
    
	//alert(b.innerText);
	//console.log(nkey,pso,b);
	if(b.innerText=='Start'){start(nkey);}
	else{stop();b.innerText='Start';b.className="btn-success";}
       

}

document.getElementById('start').addEventListener('click', get);



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


document.getElementById('chat').addEventListener('click', mobchat);



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