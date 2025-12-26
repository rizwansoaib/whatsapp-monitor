//console.log("main is working now");


const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const path = require('path');
const url = require('url');
const ipc = electron.ipcMain;
const dialog = electron.dialog;
const globalShortcut = electron.globalShortcut;



const Store = require('electron-store');
const store = new Store();

// --- Universal Branding Setup ---
app.name = 'TrackWapp';
app.setName('TrackWapp');

// Required for Windows Notifications to show app name correctly
if (process.platform === 'win32') {
  app.setAppUserModelId('com.trackwapp.app');
}

process.title = 'TrackWapp';


// Helper for cross-platform icons
const getIconPath = () => {
  if (process.platform === 'win32') return path.join(__dirname, 'assets/logo.ico');
  return path.join(__dirname, 'assets/logo.png');
};



// --- System Event Streaming ---
function systemLog(event_name, detail = '') {
  if (onlineWindow && !onlineWindow.isDestroyed()) {
    onlineWindow.webContents.send('system-log', {
      timestamp: new Date().toLocaleTimeString(),
      event: event_name,
      detail: detail
    });
  }
}

function broadcastMetrics() {
  if (onlineWindow && !onlineWindow.isDestroyed()) {
    const mem = process.memoryUsage();
    const metrics = app.getAppMetrics();

    // Average CPU usage across processes
    const avgCPU = metrics.reduce((acc, m) => acc + m.cpu.percentCPUUsage, 0) / metrics.length;

    // Total private memory
    const totalMem = metrics.reduce((acc, m) => acc + m.memory.privateBytes, 0);

    onlineWindow.webContents.send('performance-metrics', {
      ram: (mem.heapUsed / 1024 / 1024).toFixed(2) + ' MB',
      process_size: (totalMem / 1024 / 1024).toFixed(2) + ' MB',
      bandwidth: (Math.random() * 5 + 0.5).toFixed(2) + ' Mbps', // Simulated bandwidth
      cpu: avgCPU.toFixed(1) + '%'
    });
  }
}

setInterval(broadcastMetrics, 3000);



function get_today() {
  return new Date(Date.now()).toLocaleString().split(',')[0];
}



var today = get_today();

//store.delete('last_date');

var last_date = store.get('last_date');

if (last_date == undefined) {
  store.set('last_date', today);
  last_date = store.get('last_date');
}



console.log(last_date)





function get_diff_days(today, last_date) {


  today = new Date(today.split('/')[2], today.split('/')[1] - 1, today.split('/')[0]);
  var date2 = last_date
  date2 = new Date(date2.split('/')[2], date2.split('/')[1] - 1, date2.split('/')[0]);
  var timeDiff = Math.abs(date2.getTime() - today.getTime());
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return diffDays;

}




diff_days = get_diff_days(today, last_date)

console.log(last_date, today, diff_days)

if (diff_days > 6) {
  console.log('updation required');
}


//var player = require('play-sound')(opts = {});





const fs = require("fs");
const { Console } = require("console");
const { spawn } = require("child_process");
const websockets = fs.readFileSync(path.join(__dirname, 'assets/websockets.js')).toString();
//const mobchatjs = fs.readFileSync('mobchat.js').toString();
//const onlinejs = fs.readFileSync(path.join(__dirname, 'websockets.js')).toString();

const protobuf = fs.readFileSync(path.join(__dirname, 'assets/protobuf.js')).toString();














let win;
let onlineWindow;

function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      // nodeIntegrationInWorker: true,
      //javascript: true,
      //contextIsolation:true,
      //enableRemoteModule: true,

      preload: path.join(__dirname, "/assets/preload.js"),
      backgroundThrottling: false
    },
    icon: path.join(__dirname, 'assets/logo.png')

  });

  // Simulate Mouse Activity to keep session active
  setInterval(() => {
    if (win && !win.isDestroyed()) {
      win.focus();
      win.webContents.focus();
      systemLog('KEEP_ALIVE', 'Main window focus ping');
      // Simulate small mouse movement
      win.webContents.sendInputEvent({ type: 'mouseMove', x: 10, y: 10 });
      setTimeout(() => {
        if (win && !win.isDestroyed()) {
          win.webContents.sendInputEvent({ type: 'mouseMove', x: 20, y: 20 });
        }
      }, 500);
    }
  }, 5000); // Every 5 seconds

  win.loadURL('https://web.whatsapp.com', { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36' });


  win.webContents.executeJavaScript(`console.log("hello TrackWapp");`);



  //console.log("Window is created");


  win.on('closed', () => {

    win = null;


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

  if (win === null) {
    createWindow()
  }
})

app.on('close', function () {

  app.quit()
})


app.on('ready', function () {
  app.userAgentFallback = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";

  if (process.platform === 'darwin') {
    app.dock.setIcon(path.join(__dirname, 'assets/logo.png'));
  }

  createWindow();






  var menu = Menu.buildFromTemplate([
    ...(process.platform === 'darwin' ? [{
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : [{
      label: 'App',
      submenu: [
        {
          label: 'Restart', click: function () {
            win.reload()
          }, accelerator: 'CmdOrCtrl+Shift+R'
        },
        {
          label: 'Exit', click: function () {
            win.close()
          },
          accelerator: 'Alt+f4'
        }
      ]
    }]),
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'Tools',
      submenu: [
        {
          label: 'Start Monitor', click: function () {
            win.webContents.executeJavaScript(websockets).then(result => { }).catch(err => { });
            win.webContents.executeJavaScript(protobuf).then(result => { }).catch(err => { });
            openonlineWindow();
          }, accelerator: 'CmdOrCtrl+Shift+M'
        },
        {
          label: 'Online History', click: function () {
            electron.shell.openExternal('https://trackwapp.online/online');
          }, accelerator: 'CmdOrCtrl+Shift+H'
        }
      ]
    },
    {
      label: 'Developer',
      submenu: [
        {
          label: 'Toggle Developer Tools',
          accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.toggleDevTools();
          }
        },
        {
          role: 'reload'
        }
      ]
    },
    {
      label: 'About',
      submenu: [
        {
          label: 'License Key', click: function () {
            dialog.showMessageBox({ type: 'info', buttons: ['OK'], title: "License Key", message: "Community Edition v1.4", detail: "Price: Free" })
          }
        },
        {
          label: 'Shortcut', click: function () {
            dialog.showMessageBox({ type: 'info', buttons: ['OK'], title: "Shortcut", message: "ESC: minimize Online Window", detail: "ALT + F4: Close Online Window" })
          }
        },
        {
          label: 'About Us', click: function () {
            electron.shell.openExternal('https://github.com/rizwansoaib/whatsapp-monitor/');
          }
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu);

  const ctxmenu = new Menu();
  ctxmenu.append(new MenuItem({
    label: 'Notification Key',
    click: function () {
      // no-op
    }
  }));

  if (win) {
    win.webContents.on('context-menu', function (e, params) {
      ctxmenu.popup(win, params.x, params.y);
    });
  }






  var flag = 0




  /*
  function playsound()
  {
      player.play(path.join(__dirname, 'assets/beep.mp3'),function(err){
          if (err) throw err
        });
  }
  
  */





  ipc.on('toMain', function (event, msg) {

    //console.log(msg);



  })



  ipc.on("profile_data", function (event, data) {

    //console.log('profile data received');
    //console.log(data);


    if (onlineWindow) {
      onlineWindow.webContents.send('profile_data', data);

    }



    //store.set('profile_data',data);



  })



  ipc.on("contact_data", function (event, data) {

    //console.log('profile data received');
    //console.log(data);


    if (onlineWindow) {
      onlineWindow.webContents.send('contact_data', data);

    }



    //store.set('profile_data',data);



  })








  var whatsapp_username;

  ipc.on('whatsapp_username', function (event, msg) {

    //console.log("main_whatsapp_username",msg);

    whatsapp_username = msg;

    if (onlineWindow)
      onlineWindow.webContents.send('whatsapp_username', msg);
    else
      console.log('onlinewindow not opened')





  })



  ipc.on('online', function (event, user) {
    //dialog.showErrorBox('Online','Now Online');
    //console.log(user+" is Online");
    if (flag == 0) {
      // notify(user); -- Removed
      //playsound();
      flag = 1

    }



    if (onlineWindow)
      onlineWindow.webContents.send('online', user);

  })


  ipc.on('number', function (event, num) {

    //console.log(num+' is online now');

    if (onlineWindow)
      onlineWindow.webContents.send('number', num);

  })


  ipc.on('first', function (event, h) {
    //console.log(h+' array data');
    if (onlineWindow) onlineWindow.webContents.send('first', h);
  })

  ipc.on('data', function (event, his) {
    //console.log('his data received')
    //console.log(his);

    if (onlineWindow)
      onlineWindow.webContents.send('data', his);

  })



  ipc.on('offnum', function (event, num) {

    //console.log(num+' is offine now');

    //if (onlineWindow)
    //onlineWindow.webContents.send('number', num);

  })

  ipc.on('focus-window', function (event) {
    if (onlineWindow) {
      if (onlineWindow.isMinimized()) onlineWindow.restore();
      onlineWindow.show();
      onlineWindow.focus();
    }
  })



  ipc.on('offline', function (event, user) {

    //console.log(user+" is offline");
    flag = 0;
    if (onlineWindow) {
      onlineWindow.webContents.send('offline', user);

    }


    //onlineWindow.webContents.send('online', user);

  })

  ipc.on('imgsrc', function (event, imgurl) {

    //console.log(imgurl);
    //console.log('recevied imgurl')
    if (onlineWindow) {
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














  function openonlineWindow() {
    if (onlineWindow) {
      onlineWindow.focus()
      return
    }

    onlineWindow = new BrowserWindow({
      height: 600,
      width: 900,
      frame: true,
      // fullscreen: true,
      title: 'TrackWapp Manager',
      icon: path.join(__dirname, 'assets/logo.png'),
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

    onlineWindow.on('focus', () => systemLog('HUD_ACTIVE', 'Monitor window prioritized'));
    onlineWindow.on('blur', () => systemLog('HUD_BG', 'Monitor window backgrounded'));

    onlineWindow.on('closed', () => {
      onlineWindow = null
      systemLog('HUD_TERMINATED', 'Monitor session ended');
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

    olhistwin.loadURL('https://trackwapp.online/online')

    olhistwin.setMenu(null);


    olhistwin.on('closed', function () {
      olhistwin = null
    })
  }



















  // Removed opennotifywindow function definition as per instructions.
  // Removed var notifywindow = null as per instructions.


  ipc.on('send_noti_link', function (event, new_url) {
    store.set('noti_link', new_url);
    //console.log('new url saved in db')   

  })


  ipc.on('get_noti_link', function (event, data) {
    // Removed reference to notifywindow as per instructions.

    if (onlineWindow) {
      //console.log(data)
      var noti_link = store.get('noti_link');
      if (noti_link != undefined)
        onlineWindow.webContents.send('noti_link', noti_link);

    }


























  });

});
