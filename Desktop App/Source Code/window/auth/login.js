
const electron=require("electron");
const ipc=electron.ipcRenderer;
const BrowserWindow=electron.BrowserWindow;

console.log("login.js loaded")


    var btn=document.getElementById('signin');
    btn.addEventListener('click',function(){
      signin();
    })




   

     function signin()
     {
      var user=document.getElementById('user').value;
      var pwd=document.getElementById('pwd').value;
      var show=document.getElementById('show');

      const loginurl='http://whatsappmonitor.pythonanywhere.com/login/'+user+'/'+pwd+'?format=json'
 
      var request = require('request');
     request(loginurl, function (error, response, body) {
         console.log('error:', error); // 0Print the error if one occurred 
         console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
         console.log('body:', body);
         var obj = JSON.parse(body);
         console.log(obj[0]['active']);

         show.innerHTML=obj[0]
        // console.log(response)
   
     })






     
    }