


console.log('popup.js working')

update_numarrray();


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



chrome.storage.sync.set({
    'numarray': numarray
    
   
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
    console.log("enter mobchat");
    mob=document.getElementById('mob').value;
    console.log(mob)

chrome.storage.local.set({
    'mob': mob
    
   
});




chrome.tabs.executeScript({
    file: 'mobchat.js'
  }); 




 

}





document.getElementById('mobchat').addEventListener('click', mobchat);
document.getElementById('savenum').addEventListener('click', savenum);
document.getElementById('delnum').addEventListener('click', delnum);








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






