
//console.log('main.js working')



function save(user,t1,t2,t){
  var d   = new Date();
  var curd=d.toLocaleDateString("en-GB").split(' ')[0]
  user=user.replace(/[^a-zA-Z0-9]/g, "")
  curd=curd.replace(/[^a-zA-Z0-9]/g, "")

  const surl='https://trackwapp.online/save/'+user+'/'+curd+'/'+t1+'/'+t2+'/'+t
  var xhr = new XMLHttpRequest();
   xhr.open("GET",surl);
  xhr.send()
 
  
}

(function() {
    function simulateMouseMove() {
        var event = new MouseEvent('mousemove', {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: window.innerWidth / 2,
            clientY: window.innerHeight / 2
        });

        document.dispatchEvent(event);
    }

    function keepActive() {
        setInterval(simulateMouseMove, 30000); // Simulate activity every 30 seconds
    }

    keepActive();
})();






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