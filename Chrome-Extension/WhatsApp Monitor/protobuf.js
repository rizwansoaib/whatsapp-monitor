
/*



var btn = document.createElement("BUTTON");   
btn.innerHTML = "Chat Contacts Online History";  
btn.style.width="100px";
btn.id="download";                 
document.querySelector("#side > header").appendChild(btn);
btn.style.backgroundColor="#075e54";
btn.style.color="white";
document.getElementById('download').addEventListener('click', dcsv);

function dcsv() {

    let csvContent = "data:text/csv;charset=utf-8," 
    + rows.map(e => e.join(",")).join("\n");

var encodedUri = encodeURI(csvContent);
var link = document.createElement("a");
link.setAttribute("href", encodedUri);
link.setAttribute("download", "online"+".csv");
document.body.appendChild(link); 
link.click();

}

*/







var os = document.createElement('script');
        //s.src = chrome.extension.getURL('pagescript.js');
        os.innerHTML = `













function notify(user) {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  else if (Notification.permission === "granted") {
    var notification = new Notification("📱WhatsApp Monitor: "+user+" is Online");
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
    alert('Permission is ${Notification.permission}');
  }
}




function ms2HMS( ms ) {
   
    var seconds = ms / 1000;
 
    var hours = parseInt( seconds / 3600 ); 
    seconds = seconds % 3600; 
    var minutes = parseInt( seconds / 60 ); 
    seconds = Math.floor(seconds % 60);
    return( hours+":"+minutes+":"+seconds);
}


rows = [];
rows.push(["[WhatsApp","Monitor","Extension]","Online","Chat", "Contacts"]);
rows.push(["   name  ","  Date  "," Start ", "  Stop  ", " Duration"," Status "]);
let i=2;



function createTable(tableData) {
  try{
    document.body.querySelectorAll('table')[0].remove()
  }
  catch(err){
    //
  }
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  document.body.appendChild(table);
}






function updatebtn(value){


  try{
      document.querySelectorAll('#userbtn')[0].remove()
    
  }
  catch(err){
    //
  }

 
var userbtn = document.createElement("BUTTON");   
userbtn.innerHTML = value;  
userbtn.id="userbtn";                 
document.body.appendChild(userbtn);
  
}



function usernamebtn(value){
  try{
      document.querySelectorAll('#usernamebtn')[0].remove()    
  }
  catch(err){
    //
  }
var usernbtn = document.createElement("BUTTON");   
usernbtn.innerHTML = value;  
usernbtn.id="usernamebtn";                 
document.body.appendChild(usernbtn);
  
}


function online_list_btn(value){
  try{
      document.querySelectorAll('online_list_btn')[0].remove()    
  }
  catch(err){
    //
  }
var online_list_btn = document.createElement("BUTTON");   
online_list_btn.innerHTML = value;  
online_list_btn.id="online_list_btn";                 
document.body.appendChild(online_list_btn);
  
}


online_list_btn("false");



function startbtn(value){
  try{
      document.querySelectorAll('#startbtn')[0].remove()    
  }
  catch(err){
    //
  }
var startbtn = document.createElement("BUTTON");   
startbtn.innerHTML = value;  
startbtn.id="startbtn";                 
document.body.appendChild(startbtn);
  
}

function stopbtn(value){
  try{
      document.querySelectorAll('#stopbtn')[0].remove()    
  }
  catch(err){
    //
  }
var stopbtn = document.createElement("BUTTON");   
stopbtn.innerHTML = value;  
stopbtn.id="stopbtn";                 
document.body.appendChild(stopbtn);
  
}

function durbtn(value){
  try{
      document.querySelectorAll('#durbtn')[0].remove()    
  }
  catch(err){
    //
  }
var durbtn = document.createElement("BUTTON");   
durbtn.innerHTML = value;  
durbtn.id="durbtn";                 
document.body.appendChild(durbtn);
  
}




function contactbtn(value){
  try{
      document.querySelectorAll('#contactbtn')[0].remove()    
  }
  catch(err){
    //
  }
var contactbtn = document.createElement("BUTTON");   
contactbtn.innerHTML = value;  
contactbtn.id="contactbtn";                 
document.body.appendChild(contactbtn);
  
}











var h={};




        console.log('WhatsApp Monitor Started Successfully')

setInterval(function(){


  try{
    document.querySelectorAll('#contactbtn')[0].innerHTML='null';

    
    prev=document.querySelectorAll('#userbtn')[0].innerHTML
    if(prev!='null'){
      prevDate=new Date(prev);
      currDate   = new Date();
    diff_time=currDate.getTime()-prevDate.getTime()
    if(diff_time>2000)
      updatebtn("null");
      


    }

  
    
  }
  catch(err){
     updatebtn("null");
     contactbtn("null")
     
  }












 try{
    document.querySelectorAll('#usernamebtn')[0].innerHTML='null';
    document.querySelectorAll('#startbtn')[0].innerHTML='null';
    document.querySelectorAll('#stopbtn')[0].innerHTML='null';
    document.querySelectorAll('#durbtn')[0].innerHTML='null';
     

  }
  catch(err){
     
  }









 

	 //console.log(window.Store)
    try{  
        online_list=window.Store.Presence.filter(a=>a.__x_isOnline==true);
        offline_list=window.Store.Presence.filter(a=>a.__x_isOnline==false);
        if(online_list.length>0){
         
          document.querySelectorAll('#online_list_btn')[0].innerHTML='true';
        }
        else
        {
         
          document.querySelectorAll('#online_list_btn')[0].innerHTML='false';
        }
        
        online_list.forEach(onlineFun);
        offline_list.forEach(offlineFun);

function onlineFun(item, index) {
    num=item["__x_id"]["user"]
   if(window.Store.Contact._index[item.id].name)
    name=window.Store.Contact._index[item.id].name
   else
    name="+"+num;

    
      
   
     //console.log("num: "+num);
    
  //console.log("name: "+name);
  startDate   = new Date();
  
  //console.log(t1)
  if(h[num]==undefined||h[num]==null){
    h[num]=[name,1,startDate,"Wait"]
    //console.log(h);
    try{
          document.querySelector('[title="'+name+'"]').innerText='💚 '+name;
    document.querySelector('[title="'+name+'"]').style.color='green';
    }
    catch(err)
    {
      //
    }

    updatebtn(startDate);

    notify(name)
     try{
      document.querySelectorAll('#contactbtn')[0].innerHTML=name;
     }
     catch(err){}
  }
  else{
    if(h[num][1]==0){
       h[num][1]=1;
       h[num][2]=startDate; 
       updatebtn(startDate);
       notify(name)
 try{
      document.querySelectorAll('#contactbtn')[0].innerHTML=name;
     }
     catch(err){}
       
         try{
          document.querySelector('[title="'+name+'"]').innerText='💚 '+name;
    document.querySelector('[title="'+name+'"]').style.color='green';
    }
    catch(err)
    {
      //
    }


    }
  }
  

  

}





function offlineFun(item, index) {
num=item["__x_id"]["user"]
   if(window.Store.Contact._index[item.id].name)
    name=window.Store.Contact._index[item.id].name
   else
    name="+"+num;
//console.log(h[num])
    if(h[num]!=undefined&&h[num]!=null){
        if(h[num][1]==1){
              endDate   = new Date();
              startDate=h[num][2];
             t2=endDate.toTimeString().split(' ')[0]
             t1=startDate.toTimeString().split(' ')[0]
          h[num][1]=0;
          h[num][2]=t1;
          h[num][3]=t2;
          //console.log(h[num])
          var curd=startDate.toLocaleDateString("en-GB").split(' ')[0]
        diff_time=ms2HMS(endDate.getTime()-startDate.getTime());
       // console.log(name+" "+curd+" "+t1+" "+t2+" "+diff_time)
          rows[i]=[name+"  ",curd+"  ",t1+" ",t2+" ",diff_time+" "," online "];
          i++;
          //console.log(rows)
          usernamebtn(num);
          startbtn(t1);
          stopbtn(t2);
          durbtn(diff_time);

          createTable(rows)















          try{
          document.querySelector('[title="'+name+'"]').innerText='❤️ '+name;
          document.querySelector('[title="'+name+'"]').style.color='red';
          }
          catch(err){
            //
          }
       

        } 
    
  }
  //console.log(item["__x_id"]["user"]);
}

        
    }

    catch(err){
        console.log(err);
        //console.log("No One is Online");
    }
        }, 2000); `

        document.body.append(os); 


     



console.log("Protobuf connecting")





