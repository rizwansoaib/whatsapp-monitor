//console.log('preload is loading...')

const {
    contextBridge,
    ipcRenderer
} = require("electron");


//console.log('hello from preload...')

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["toMain","online","number","data","offnum","offline","imgsrc","whatsapp_username","profile_data","contact_data"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["fromMain"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);


//console.log('preload loaded successfully')