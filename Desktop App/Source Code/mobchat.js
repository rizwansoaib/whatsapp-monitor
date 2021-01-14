const electron=require("electron");
const ipc=electron.ipcRenderer;
const BrowserWindow=electron.BrowserWindow;

console.log("mobchat.js loaded");


var openChat = phone => {
    var link = document.createElement("a");
    link.setAttribute("href", `whatsapp://send?phone=${phone}`);
    document.body.append(link);
    link.click();
    document.body.removeChild(link);
  };
  

ipc.on('omob',function(event,mob){
      
   // console.log(mob);
    //console.log("Mobile Number Received");

    openChat(mob);
   
   })