
function start(mcnkey) {

	b.innerText='Stop';
	//console.log(b.innerText);

	b.className="btn-danger";

	//alert("stop set");



	chrome.storage.local.set({
    'flag': 1
    
   
});


	chrome.storage.local.set({
    'mcnkey': mcnkey
    
   
});


chrome.storage.local.set({
    'mcpso': mcpso
    
   
});




chrome.tabs.executeScript({
    file: 'mconline.js'
  }); 
  
}


function stop() {

	chrome.storage.local.set({
    'flag': 0
   
});


  
}

function get()
{
	var mcnkey=document.getElementById('mcnkey').value;
	mcpso=document.querySelector('input[name="mcps"]:checked').value; 
	b=document.getElementById('mcstart')
    contactlist=new Array();
	contactlist=document.getElementById('mcl').value;
    contactlist=contactlist.split(',');
    alert(contactlist);
    console.log(contactlist);
    
	//alert(b.innerText);
	//console.log(nkey,pso,b);
	if(b.innerText=='Start'){start(mcnkey);}
	else{stop();b.innerText='Start';b.className="btn-success";}
       

}

document.getElementById('mcstart').addEventListener('click', get);





