
function start(contactlist) {

	b.innerText='Stop';
	//console.log(b.innerText);

	b.className="btn-danger";

	//alert("stop set");



	chrome.storage.local.set({
    'flag': 1
    
   
});

/*



	chrome.storage.local.set({
    'mcnkey': mcnkey
    
   
});

chrome.storage.local.set({
    'mcpso': mcpso
    
   
});
*/

chrome.storage.local.set({
    'contactlist': contactlist
    
    
   
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
	//var mcnkey=document.getElementById('mcnkey').value;
	//var mcpso=document.querySelector('input[name="mcps"]:checked').value; 
	b=document.getElementById('mcstart')
	//alert(mcnkey)
    //contactlist=new Array();
    contactlist=[];
	var contactlist=document.getElementById('mcl').value;
    contactlist=contactlist.split(',');
 
	//alert(b.innerText);
	//console.log(nkey,pso,b);
	if(b.innerText=='Start'){start(contactlist);}
	else{stop();b.innerText='Start';b.className="btn-success";}
       

}

document.getElementById('mcstart').addEventListener('click', get);


//alert("Enter in mc.js");


