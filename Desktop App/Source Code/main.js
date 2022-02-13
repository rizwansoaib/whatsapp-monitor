//console.log("main is working now");


const electron= require("electron");
const app=electron.app;
const BrowserWindow=electron.BrowserWindow;
const Menu=electron.Menu;
const MenuItem=electron.MenuItem;
const path=require('path');
const url=require('url');
const ipc=electron.ipcMain;
const dialog=electron.dialog;
const globalShortcut=electron.globalShortcut;



const Store = require('electron-store');
const store = new Store();



/* 


// Future implementation advance version...

const Store = require('electron-store');
const store = new Store();



function get_today()
{
    return new Date(Date.now()).toLocaleString().split(',')[0];
}



var today = get_today();

//store.delete('last_date');

var last_date=store.get('last_date');

if(last_date==undefined)
{
  store.set('last_date', today);
  last_date=store.get('last_date');
}



console.log(last_date)





function get_diff_days(today,last_date)
{

  
  today = new Date(today.split('/')[2],today.split('/')[1]-1,today.split('/')[0]);
  var date2 = last_date
  date2 = new Date(date2.split('/')[2],date2.split('/')[1]-1,date2.split('/')[0]);
  var timeDiff = Math.abs(date2.getTime() - today.getTime());
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

  return diffDays;

}




diff_days= get_diff_days(today,last_date)

console.log(last_date,today,diff_days)

if(diff_days>6)
{
console.log('updation required');
}

*/

//var player = require('play-sound')(opts = {});

const notifier = require('node-notifier');



const fs = require("fs");
const { Console } = require("console");
const { spawn } = require("child_process");
const websockets = fs.readFileSync(path.join(__dirname, 'assets/websockets.js')).toString();
//const mobchatjs = fs.readFileSync('mobchat.js').toString();
//const onlinejs = fs.readFileSync(path.join(__dirname, 'websockets.js')).toString();

const protobuf = fs.readFileSync(path.join(__dirname, 'assets/protobuf.js')).toString();














let win;
function createWindow()
{
    win=new BrowserWindow({
        webPreferences:{
        nodeIntegration: true,
       // nodeIntegrationInWorker: true,
        //javascript: true,
       //contextIsolation:true,
       //enableRemoteModule: true,

       preload: path.join(__dirname, "/assets/preload.js"),
      


       }

    });
    win.loadURL('http://web.whatsapp.com');

    
    win.webContents.executeJavaScript(`console.log("hello whatsapp monitor");`); 
    


    //console.log("Window is created");


    win.on('closed',() =>{

        win=null;
        
        
    }
    
    );


   

   //developer mode
   //win.webContents.openDevTools();




  

    /*win.webContents.on('dom-ready', function(e) {
        win.webContents.executeJavaScript('alert("hello");')
      })*/

}










app.on('window-all-closed', function () {

    if (process.platform !== 'darwin') {
      app.quit()
     
      
    }
  })


  app.on('activate', function () {

    if (mainWindow === null) {
      createWindow()
    }
  })

  app.on('close', function () {

   app.quit()
  })


app.on('ready',function(){


createWindow();






var menu = Menu.buildFromTemplate([

    {
        label: 'App',
        submenu: [
            {label:'Restart',click:function(){
                win.reload()
            },accelerator:'CmdOrCtrl+Shift+R'},
            {label:'Exit',click:function(){
                win.close()
                
                
            },
            accelerator:'Alt+f4'
          }
           
            
        ]
    },
    
    {
        label: 'Tools',
        submenu: [

          
            {label:'Start Monitor',click:function()
            
            {

                win.webContents.executeJavaScript(websockets).then(result => {
                  //console.log('result (no callback one)', result)
                  

                })
                .catch(err => {
                  //console.log('error (no callback one)', err);
                  
                });

                win.webContents.executeJavaScript(protobuf).then(result => {
                  //console.log('result (no callback one)', result)
                  

                })
                .catch(err => {
                  //console.log('error (no callback one)', err);
                  
                });

                //console.log('online window opened');

                openonlineWindow();
            }, accelerator:'CmdOrCtrl+Shift+M'

            } ,


            {label:'Notification Key',click:function(){
            

              opennotifywindow();
          }, accelerator:'CmdOrCtrl+Shift+N'},


            {label:'Online History',click:function()
            
            {
              
             // win.webContents.executeJavaScript("console.log('Hello There!')");

                electron.shell.openExternal('https://www.wpmonitor.tech/online');
             
            }, accelerator:'CmdOrCtrl+Shift+H'

            }
            
           
            
        ]

    },

    {
        label: 'About',
        submenu: [
            {label:'License Key',click:function()
            
            {
                
                dialog.showMessageBox({
                    type: 'info',
                    buttons: ['OK'],
                    title: "License Key",
                    message: "Community Edition v1.4",
                    detail:"Price: Free"
                   })


            }

            },

            {label:'Shortcut',click:function(){
              
              dialog.showMessageBox({
                type: 'info',
                buttons: ['OK'],
                title: "Shortcut",
                message: "ESC: minimize Online Window",
                detail:"ALT + F4: Close Online Window"
               })

            }
        
        },




            {label:'Contact us',click:function(){
              
              dialog.showMessageBox({
                type: 'info',
                buttons: ['OK'],
                title: "App Developer",
                message: "Github: rizwansoaib",
                detail:"Email: rizwansoaib@gmail.com"
               })

            }
        
        },
            {label:'Check for Updates'},
            {
              label:'Official Page',
              click:function(){
                  electron.shell.openExternal('http://github.com/rizwansoaib/whatsapp-monitor');
              },
              
      
      
          }
            
        ]

    }
    
])
Menu.setApplicationMenu(menu); 

const ctxmenu=new Menu();



ctxmenu.append(new MenuItem({
    label:"Notification Key",
    click:function()
    {
        opennotifywindow();
    }
}
)) 




win.webContents.on('context-menu',function(e,params)
{
    ctxmenu.popup(win,params.x,params.y);
}
)


}



);
app.userAgentFallback = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)  AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36";


var flag=0

function notify(user)
{
    notifier.notify({
        title: 'WhatsApp Monitor',
        subtitle: 'Online Notification',
        message: "📲  "+user+' is Online',
        icon: __dirname + '/assets/64.png',
        sound: 'Ping',
        time: 5000,
        contentImage:path.join(__dirname,'assets/logo.png'),
      });
}


/*
function playsound()
{
    player.play(path.join(__dirname, 'assets/beep.mp3'),function(err){
        if (err) throw err
      });
}

*/





ipc.on('toMain',function(event,msg){
  
  //console.log(msg);
   
   

})



ipc.on("profile_data",function(event,data){
  
  //console.log('profile data received');
  //console.log(data);


  if (onlineWindow)
    {
      onlineWindow.webContents.send('profile_data', data);
      
    }

  

  //store.set('profile_data',data);
   
   

})



ipc.on("contact_data",function(event,data){
  
  //console.log('profile data received');
  //console.log(data);


  if (onlineWindow)
    {
      onlineWindow.webContents.send('contact_data', data);
      
    }

  

  //store.set('profile_data',data);
   
   

})








var whatsapp_username;

ipc.on('whatsapp_username',function(event,msg){
  
  //console.log("main_whatsapp_username",msg);

  whatsapp_username=msg;

  if(onlineWindow)
  onlineWindow.webContents.send('whatsapp_username', msg);
  else
  console.log('onlinewindow not opened')

  
   
   

})



ipc.on('online',function(event,user){
    //dialog.showErrorBox('Online','Now Online');
    //console.log(user+" is Online");
    if(flag==0)
    {
        notify(user);
        //playsound();
        flag=1
        
    }


     
      if (onlineWindow)
      onlineWindow.webContents.send('online', user);

})


ipc.on('number',function(event,num){
  
  //console.log(num+' is online now');
   
    if (onlineWindow)
    onlineWindow.webContents.send('number', num);

})


ipc.on('first',function(event,h){
  
  //console.log(h+' array data');
   
  

})

ipc.on('data',function(event,his){
  //console.log('his data received')
  //console.log(his);
   
    if (onlineWindow)
    onlineWindow.webContents.send('data', his);

})



ipc.on('offnum',function(event,num){
  
  //console.log(num+' is offine now');
   
  //if (onlineWindow)
  //onlineWindow.webContents.send('number', num);

})



ipc.on('offline',function(event,user){
    
    //console.log(user+" is offline");
    flag=0;
    if (onlineWindow)
    {
      onlineWindow.webContents.send('offline', user);
      
    }
    
    
      //onlineWindow.webContents.send('online', user);

})

ipc.on('imgsrc',function(event,imgurl){
    
    //console.log(imgurl);
    //console.log('recevied imgurl')
    if (onlineWindow)
    {
      onlineWindow.webContents.send('imgsrc', imgurl);
      onlineWindow.webContents.send('whatsapp_username', whatsapp_username);
    }
   
   // console.log('send to html Online Monitor');
    
      //onlineWindow.webContents.send('online', user);

})

/*ipc.on('omob',function(event,mob){
    win.webContents.send('omob', mob); 
     
 //console.log(mob);
 mnwindow.close();

})*/












var onlineWindow = null

function openonlineWindow() {
  if (onlineWindow) {
    onlineWindow.focus()
    return
  }

  onlineWindow = new BrowserWindow({
    height: 600,
    width: 900,
    frame:true,
   // fullscreen: true,
    title: 'Online Manager',
    webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            contextIsolation: false,
        }
    
    
  })


  // In the main process.
  



  


  onlineWindow.loadURL('file://' + __dirname + '/window/online/contact.html')
  onlineWindow.maximize();

  globalShortcut.register('ESC', function () {

    onlineWindow.minimize();
    
});
 
  onlineWindow.setMenu(null);
  //developer mode
  //onlineWindow.webContents.openDevTools();

  onlineWindow.on('closed', function() {
    onlineWindow = null
  })



  /*


  //Browser view code 

  const {  BrowserView } = require('electron')

    const view = new BrowserView()
  onlineWindow.setBrowserView(view)
  view.setBounds({ x: 0, y: 0, width: 500, height: 400 })
  view.webContents.loadURL('https://web.whatsapp.com')
  */
  
}




var olhistwin = null

function olhistwindow() {
  if (olhistwin) {
    olhistwin.focus()
    return
  }

olhistwin = new BrowserWindow({
    height: 600,
    width: 900,
    title: 'Online History Manager',
    webPreferences: {
            nodeIntegration: true
        }
    
    
  })

  olhistwin.loadURL('https://www.wpmonitor.tech/online')
 
  olhistwin.setMenu(null);
 

  olhistwin.on('closed', function() {
    olhistwin = null
  })
}



















var notifywindow= null

function opennotifywindow() {
    if (notifywindow) {
      notifywindow.focus()
      return
    }
  
    notifywindow = new BrowserWindow({
      height: 375,
      width: 300,
     
      title: 'Notification Key',
      webPreferences: {
              nodeIntegration: true,
              contextIsolation:false
          }
      
      
    })
  
    notifywindow.loadURL('file://' + __dirname + '/window/Open/notify.html')
   
    notifywindow.setMenu(null);

    notifywindow.setResizable(false)
   //notifywindow.webContents.openDevTools();


  
  
   notifywindow.on('closed', function() {
    notifywindow = null
    })
  }




ipc.on('send_noti_link',function(event,new_url){
  store.set('noti_link', new_url);
  //console.log('new url saved in db')   

})


ipc.on('get_noti_link',function(event,data){
  if (notifywindow)
  {
    //console.log(data)
    var noti_link=store.get('noti_link');
    if(noti_link!=undefined)
    notifywindow.webContents.send('noti_link', noti_link);
    
    
  } 

  if(onlineWindow)
  {
    //console.log(data)
    var noti_link=store.get('noti_link');
    if(noti_link!=undefined)
    onlineWindow.webContents.send('noti_link', noti_link);
     
  }

})









  


 
 
 
  

  






