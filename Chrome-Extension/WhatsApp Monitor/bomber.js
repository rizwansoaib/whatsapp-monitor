
function get() {

	var n=document.getElementById('count').value;
	var s=document.getElementById('message').value;


	
chrome.storage.local.set({
    'n': n,
    's':s
});

chrome.tabs.executeScript({
    file: 'bomb_inject.js'
  }); 



    




  
   




  
}

document.getElementById('bomb_start').addEventListener('click', get);