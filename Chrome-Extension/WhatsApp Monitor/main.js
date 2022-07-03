
//console.log('main.js working')



function save(user,t1,t2,t){
  var d   = new Date();
  var curd=d.toLocaleDateString("en-GB").split(' ')[0]
  user=user.replace(/[^a-zA-Z0-9]/g, "")
  curd=curd.replace(/[^a-zA-Z0-9]/g, "")

  const surl='https://wpmonitor.tech/save/'+user+'/'+curd+'/'+t1+'/'+t2+'/'+t
  var xhr = new XMLHttpRequest();
   xhr.open("GET",surl);
  xhr.send()
 
  
}






setInterval(function(){

 try{
    uname=document.querySelectorAll('#usernamebtn')[0].innerHTML
    t1=document.querySelectorAll('#startbtn')[0].innerHTML
    t2=document.querySelectorAll('#stopbtn')[0].innerHTML
    t=document.querySelectorAll('#durbtn')[0].innerHTML

    if(uname!='null'&&t1!='null'&&t2!='null'&&t!='null'){
    save(uname,t1,t2,t);

    }

    
    
  }
  catch(err){
     
  }



},2000);