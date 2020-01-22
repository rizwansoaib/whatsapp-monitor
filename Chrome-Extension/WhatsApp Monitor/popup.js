
function start() {

	b.innerText='Stop';

	b.style.backgroundColor="red";

	chrome.storage.local.set({
    'flag': 1
   
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
	b=document.getElementById('start')
	if(b.innerText=='Start'){start();}
	else{stop();b.innerText='Start';b.style.backgroundColor="green";}

}

document.getElementById('start').addEventListener('click', get);





