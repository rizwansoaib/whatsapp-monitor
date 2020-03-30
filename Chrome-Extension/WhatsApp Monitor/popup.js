
function start(nkey) {

	b.innerText='Stop';

	b.style.backgroundColor="red";



	chrome.storage.local.set({
    'flag': 1
    
   
});


	chrome.storage.local.set({
    'nkey': nkey
    
   
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

	b=document.getElementById('start')
	if(b.innerText=='Start'){start(nkey);}
	else{stop();b.innerText='Start';b.style.backgroundColor="green";}
       

}

document.getElementById('start').addEventListener('click', get);





