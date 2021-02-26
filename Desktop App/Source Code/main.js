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




//var player = require('play-sound')(opts = {});

const notifier = require('node-notifier');



const fs = require("fs");
const websockets = fs.readFileSync(path.join(__dirname, 'assets/websockets.js')).toString();
//const mobchatjs = fs.readFileSync('mobchat.js').toString();
//const onlinejs = fs.readFileSync(path.join(__dirname, 'websockets.js')).toString();

const protobuf = fs.readFileSync(path.join(__dirname, 'assets/protobuf.js')).toString();














let win;
function createWindow()
{
    win=new BrowserWindow({
        webPreferences:{
        nodeIntegration: true
       }

    });
    win.loadURL('http://web.whatsapp.com');

    


    //console.log("Window is created");


    win.on('closed',() =>{

        win=null;
        
        
    }
    
    );


   


  // win.webContents.openDevTools();
  

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

         /* {label:'Open Chat',click:function(){
            win.webContents.executeJavaScript(mobchatjs).then(result => {
              
            })
            .catch(err => {
              

            });

            openmnwindow();
        }, accelerator:'CmdOrCtrl+Shift+O'},*/
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

                openonlineWindow();
            }, accelerator:'CmdOrCtrl+Shift+M'

            }
            ,
            {label:'Online History',click:function()
            
            {

                electron.shell.openExternal('https://whatsappanalysis.in/online');
             
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
                    message: "Community Edition  v1.2",
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


/*
ctxmenu.append(new MenuItem({
    label:"Open Chat",
    click:function()
    {
        win.webContents.executeJavaScript(mobchatjs);
        openmnwindow();
    }
}
)) */




win.webContents.on('context-menu',function(e,params)
{
    ctxmenu.popup(win,params.x,params.y);
}
)


}



);
app.userAgentFallback = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36";


var flag=0

function notify(user)
{
    notifier.notify({
        title: 'WhatsApp Monitor',
        message: "📱 "+user+' is Online',
        sound: 'Ping',
        time: 5000,
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
    onlineWindow.webContents.send('offline', user);
    
      //onlineWindow.webContents.send('online', user);

})

ipc.on('imgsrc',function(event,imgurl){
    
    //console.log(imgurl);
    //console.log('recevied imgurl')
    if (onlineWindow)
    onlineWindow.webContents.send('imgsrc', imgurl);
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
    frame:false,
    fullscreen: true,
    title: 'Online Manager',
    webPreferences: {
            nodeIntegration: true
        }
    
    
  })

  onlineWindow.loadURL('file://' + __dirname + '/window/online/contact.html')
  onlineWindow.maximize();

  globalShortcut.register('ESC', function () {

    onlineWindow.minimize();
    
});
 
  onlineWindow.setMenu(null);
  //onlineWindow.webContents.openDevTools();

  onlineWindow.on('closed', function() {
    onlineWindow = null
  })
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

  olhistwin.loadURL('https://whatsappanalysis.in/online')
 
  olhistwin.setMenu(null);
 

  olhistwin.on('closed', function() {
    olhistwin = null
  })
}


