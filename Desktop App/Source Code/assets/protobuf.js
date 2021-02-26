



var os = document.createElement('script');


os.innerHTML=`



const ipc = require('electron').ipcRenderer;




`



document.body.append(os); 





console.log('protobuf loaded')





console.log('WhatsApp Monitor Started Successfully')


function save(user,t1,t2,t){
  var d   = new Date();
  var curd=d.toLocaleDateString("en-GB").split(' ')[0]
  user=user.replace(/[^a-zA-Z0-9]/g, "")
  curd=curd.replace(/[^a-zA-Z0-9]/g, "")

  const surl='https://whatsappanalysis.in/save/'+user+'/'+curd+'/'+t1+'/'+t2+'/'+t
  var xhr = new XMLHttpRequest();
   xhr.open("GET",surl);
  xhr.send()
  
}



function ms2HMS( ms ) {
   
  var seconds = ms / 1000;

  var hours = parseInt( seconds / 3600 ); 
  seconds = seconds % 3600; 
  var minutes = parseInt( seconds / 60 ); 
  seconds = Math.floor(seconds % 60);
  return( hours+":"+minutes+":"+seconds);
}



var h={}

function track(){

  console.log(h)

  
    
    try{  
        online_list=window.Store.Presence.filter(a=>a.__x_isOnline==true);
        if (!online_list.length)
        ipc.send('offline','All Contacts');


        offline_list=window.Store.Presence.filter(a=>a.__x_isOnline==false);
        online_list.forEach(onlineFun);
        offline_list.forEach(offlineFun);
function onlineFun(item, index) {
    num=item["__x_id"]["user"]
    console.log(num)
   if(window.Store.Contact._index[item.id].name)
    name=window.Store.Contact._index[item.id].name
   else
    name="+"+num;

    startDate   = new Date();

     if(h[num]==undefined||h[num]==null){
      

      h[num]=[name,1,startDate,"Wait"]
     console.log("added num in h first time");
      
    }


      else{
        if(h[num][1]==0){

          //console.log("online phir hua  h ")
           h[num][1]=1;
           h[num][2]=startDate; 
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
        
      
      

    ipc.send('online',name);
    ipc.send('number',num);
    
    imgurl=Store.ProfilePicThumb._index[num+'@c.us']["__x_img"]
    console.log(imgurl)
    if(imgurl!=undefined);
    ipc.send('imgsrc',imgurl);
    console.log("online : "+name);
    
    
  }
  
}

catch(err){

};


function offlineFun(item, index) {
num=item["__x_id"]["user"]
   if(window.Store.Contact._index[item.id].name)
    name=window.Store.Contact._index[item.id].name
   else
    name="+"+num;

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
      console.log(name+" "+curd+" "+t1+" "+t2+" "+diff_time);

      his=[num,name,curd,t1,t2,diff_time]
      
      ipc.send('data',his);

     // save(num,t1,t2,diff_time);
      //console.log('data saved on server');
      }
    }
   // ipc.send('offnum',num);
   

    console.log("offline : "+name);




}


    



}




setInterval(track,2000)
     


