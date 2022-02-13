
console.log('protobuf starting...')








console.log('protobuf loaded')





console.log('WhatsApp Monitor Started Successfully')






function save(user,t1,t2,t){
  var d   = new Date();
  var curd=d.toLocaleDateString("en-GB").split(' ')[0]
  user=user.replace(/[^a-zA-Z0-9]/g, "")
  curd=curd.replace(/[^a-zA-Z0-9]/g, "")

  const surl='https://www.wpmonitor.tech/save/'+user+'/'+curd+'/'+t1+'/'+t2+'/'+t
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

var retry=3;


function track(){

  //console.log(h)

  
    
    try{  
      online_list=window.Store.Presence.filter(a=>a.__x_isOnline==true && a.__x_isUser==true);
      
        if (!online_list.length)
        //console.log('offline','All Contacts')

        //window.api.send("toMain", "All contacts offline");
        window.api.send('offline','All Contacts');
        
        if(retry)
        {
          window.api.send('profile_data', profile_data);

         //console.log('send profile data',profile_data)

         //console.log(contact_data);
         window.api.send('contact_data',contact_data);

         var whatsapp_username=window.Store.DailyAggregatedStats._listeningTo.l1.__x_pushname

         window.api.send("whatsapp_username", whatsapp_username);


          retry=retry-1;
        }
        

        


        offline_list=window.Store.Presence.filter(a=>a.__x_isOnline==false && a.__x_isUser==true);
        online_list.forEach(onlineFun);
        offline_list.forEach(offlineFun);


function onlineFun(item, index) {
    num=item["__x_id"]["user"]

    window.api.send('number',num);
    //console.log('ipc send ',num,contact_name);

   window.api.send("toMain", num+" "+contact_name);

    //console.log(num)


   if(window.Store.Contact._index[item.id].name)
    contact_name=window.Store.Contact._index[item.id].name
   else
    contact_name="+"+num;

   window.api.send('online',contact_name);


    startDate   = new Date();

     if(h[num]==undefined||h[num]==null){
      

      h[num]=[contact_name,1,startDate,"Wait"]
     //console.log("added num in h first time");

     window.api.send('first',h);
      
    }


      else{
        if(h[num][1]==0){

          //console.log("online phir hua  h ")
           h[num][1]=1;
           h[num][2]=startDate; 
             try{
               a=1;
             // document.querySelector('[title="'+contact_name+'"]').innerText='💚 '+contact_name;
             //document.querySelector('[title="'+contact_name+'"]').style.color='green';
        }
        catch(err)
        {
          //
        }

      }
    }
        
      
      

    window.api.send('online',contact_name);
    window.api.send('number',num);
    //console.log('ipc send ',num,contact_name);
    imgurl=window.WAPI.getContact(num+'@c.us')['profilePicThumbObj']['eurl']
   // console.log(imgurl)
    imgurl=window.Store.ProfilePicThumb._index[num+'@c.us'].__x_eurl
   // console.log(imgurl)
    if(imgurl!=undefined);
    window.api.send('imgsrc',imgurl);
   // console.log("online : "+contact_name);
    
    
  }
  
}

catch(err){

};


function offlineFun(item, index) {
num=item["__x_id"]["user"]
   if(window.Store.Contact._index[item.id].name)
   contact_name=window.Store.Contact._index[item.id].name
   else
   contact_name="+"+num;

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
      //console.log(contact_name+" "+curd+" "+t1+" "+t2+" "+diff_time);

      his=[num,contact_name,curd,t1,t2,diff_time]
      
      window.api.send('data',his);

     // save(num,t1,t2,diff_time);
      //console.log('data saved on server');
      }
    }
    window.api.send('offnum',num);
   

    //console.log("offline : "+contact_name);




}


    



}




setInterval(track,2000)
     




//console.log('protobuf started')



var profile_data = {};

var contact_data ={}


function myFunction(item, index, arr) {
  //console.log(item.formattedName,item.id._serialized)

  try {

    contact_data[item.formattedName]='+'+item.id._serialized.split('@')[0]

    const imgurl=window.Store.ProfilePicThumb._index[item.id._serialized].__x_eurl
    //console.log(item.formattedName,item.id._serialized,imgurl)

    if(imgurl!=null)
    profile_data[item.formattedName]=imgurl;
    
    
  } catch (error) {

  
    
  }


 
}

const MyContacts=WAPI.getMyContacts();

MyContacts.forEach(myFunction)

