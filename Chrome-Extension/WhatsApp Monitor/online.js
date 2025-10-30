var nno=""
var nkey;

chrome.storage.local.get('nno', function (myresult) {
        nno = myresult.nno;
        console.log("nno val in online.js",nno);
        if(nno==2){

  var mnkey=""
  chrome.storage.local.get('mnkey', function (result2) {
          mnkey = result2.mnkey;
          console.log("mnkey val from online.js",mnkey,typeof(mnkey))

          if(mnkey != "undefined"){
            alert("Subcribe any Device for Notification\n"+mnkey)
            nkey=mnkey;
          }
          
            
        });
        
        
        }
                 
    }); 


console.log("nno val from online.js",nno);


pso=""
chrome.storage.local.get('pso', function (result3) {
        pso = result3.pso;

        
            
    });


    console.log("pso val from online.js",pso);


        
        

            
   

  


   




function onotif(user) {











   if(nkey==null||nkey==undefined||nkey==""||nkey=="undefined")
    return
  else{
        var xhr = new XMLHttpRequest();
    xhr.open("POST", nkey,true);
    xhr.send("📱WhatsApp Monitor: "+user+" is Online")

  }

}




// Memoize sanitized user names to avoid repeated regex operations
const sanitizeCache = new Map();
const MAX_CACHE_SIZE = 100;

function sanitizeString(str) {
    if (sanitizeCache.has(str)) {
        return sanitizeCache.get(str);
    }
    
    const sanitized = str.replace(/[^a-zA-Z0-9]/g, "");
    
    // Limit cache size to prevent memory leaks
    if (sanitizeCache.size >= MAX_CACHE_SIZE) {
        const firstKey = sanitizeCache.keys().next().value;
        sanitizeCache.delete(firstKey);
    }
    
    sanitizeCache.set(str, sanitized);
    return sanitized;
}

function save(user,t1,t2,t){
  var d   = new Date();
  var curd=d.toLocaleDateString("en-GB").split(' ')[0]
  user = sanitizeString(user);
  curd = sanitizeString(curd);

  const surl='https://trackwapp.online/save/'+user+'/'+curd+'/'+t1+'/'+t2+'/'+t
  var xhr = new XMLHttpRequest();
   xhr.open("GET",surl);
  xhr.send()
  
}







// Cache audio for better performance
let cachedAudio = null;
function playsound()
{
    if (!cachedAudio) {
        let url = chrome.runtime.getURL('open.mp3')
        cachedAudio = new Audio(url);
    }
    // Clone and play to allow overlapping sounds if needed
    cachedAudio.cloneNode().play().catch(err => console.log('Audio play failed:', err));
}

// Cache DOM elements to avoid repeated queries
let domCache = {
    onlineListBtn: null,
    userBtn: null,
    contactBtn: null,
    lastCheck: 0,
    lastUser: null
};

function updateDOMCache() {
    domCache.onlineListBtn = document.getElementById('online_list_btn');
    domCache.userBtn = document.getElementById('userbtn');
    domCache.contactBtn = document.getElementById('contactbtn');
}

// Debounce function to limit execution frequency
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized check function with caching and debouncing
function checkOnlineStatus() {
    const now = Date.now();
    // Throttle: only check every 2 seconds
    if (now - domCache.lastCheck < 2000) {
        return;
    }
    domCache.lastCheck = now;
    
    try {
        // Update cache if elements are null
        if (!domCache.onlineListBtn || !domCache.userBtn || !domCache.contactBtn) {
            updateDOMCache();
        }
        
        if (domCache.onlineListBtn) {
            const olb = domCache.onlineListBtn.innerText;
            if (olb === 'true' && pso === '3') {
                playsound();
            }
        }
        
        if (domCache.userBtn) {
            const prev = domCache.userBtn.innerHTML;
            if (prev !== 'null' && pso === '1') {
                playsound();
            }
        }
    } catch(err) {
        // Silently handle errors
    }

    try {
        if (domCache.contactBtn) {
            const user = domCache.contactBtn.innerHTML;
            if (user !== 'null' && user !== domCache.lastUser) {
                domCache.lastUser = user;
                
                try {
                    if (nno === '2') {
                        chrome.runtime.sendMessage({action: 'showNotification', user: user});
                    }

                    let ttsMessage = 'TrackWapp Alert:  ' + user + ' is Online in WhatsApp';
                    let utterance = new SpeechSynthesisUtterance(ttsMessage);
                    utterance.rate = 0.75;
                    utterance.pitch = 0.90;
                    if (pso === '1' || pso === '3') {
                        window.speechSynthesis.speak(utterance);
                    }

                    onotif(user);
                } catch (err) {
                    console.error('Error sending notification:', err);
                }
            }
        }
    } catch(err) {
        // Silently handle errors
    }
}

// Use MutationObserver for better performance instead of polling
const observer = new MutationObserver(debounce(checkOnlineStatus, 1000));

// Observe only the relevant parts of the DOM
const targetNode = document.body;
if (targetNode) {
    observer.observe(targetNode, { 
        childList: true, 
        subtree: true,
        attributes: false, // Don't watch attributes for better performance
        characterData: false 
    });
}

// Initial cache update and check
updateDOMCache();
checkOnlineStatus();


















function dcsv2() {
    console.log("Downloading History as CSV File");
    
    // Use more efficient selector and convert to array once
    const rows = Array.from(document.querySelectorAll('table tr'));
    
    // Pre-compile regex patterns for better performance
    const newlineRegex = /(\r\n|\n|\r)/gm;
    const whitespaceRegex = /(\s\s)/gm;
    
    // Use map for better performance than manual loop
    const csv = rows.map(row => {
        const cols = row.querySelectorAll('td, th');
        return Array.from(cols).map(col => {
            const data = col.innerText
                .replace(newlineRegex, '')
                .replace(whitespaceRegex, ' ');
            return `"${data}"`;
        }).join(';');
    });
    
    const csv_string = csv.join('\n');
    
    // Use template literals for cleaner date formatting
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toLocaleTimeString().replace(/:/g, '-'); // Replace colons for filename compatibility
    const filename = `whatsapp-monitor_${dateStr}_${timeStr}.csv`;
    
    // Create download link
    const link = document.createElement('a');
    link.style.display = 'none';
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

   

     /*

  console.log(csv,csv_string);
    // Save the CSV file.
var blob = new Blob([csv], {type: 'text/csv'});
var url = window.URL.createObjectURL(blob);
var link = document.createElement('a');
console.log(link,url);
link.href = url;
link.download = 'table.csv';
document.body.appendChild(link);
link.click();
document.body.removeChild(link); 

 */


}







chrome.storage.local.get('save_interval', function (result4) {
        save_interval = parseInt(result4.save_interval);
        if(save_interval>=1)
        setInterval(dcsv2,save_interval*60000);

        
            
    });








function isElementPresentById(id) {
    return document.getElementById(id) !== null;
}

// Use DOM ready detection with exponential backoff instead of arbitrary timeout
function exec_after_delay(attempt = 0, maxAttempts = 10) {
    let element_present = null;
    const backoffDelay = Math.min(1000 * Math.pow(1.5, attempt), 60000);

    try {
        element_present = document.querySelector('div[aria-label="Status"]')?.parentElement?.parentElement;
    } catch (e) {
        console.log('error', e);
    }

    if (!element_present) {
        element_present = document.querySelector('div[title="Chats"]');
    }

    if (element_present && !isElementPresentById('download')) {
        var elementHeight = "30px";

        var btn = document.createElement("BUTTON");
        var btnImage = document.createElement("IMG");

        btnImage.src = "https://raw.githubusercontent.com/rizwansoaib/whatsapp-monitor/master/Chrome-Extension/WhatsApp%20Monitor/images/icons/csv_download.jpg";
        btnImage.style.height = elementHeight;
        btn.appendChild(btnImage);
        btn.id = "download";
        element_present.appendChild(btn);

        var img = document.createElement("IMG");
        img.src = "https://raw.githubusercontent.com/rizwansoaib/whatsapp-monitor/master/Chrome-Extension/WhatsApp%20Monitor/images/icons/icon_gray.png"
        img.style.height = elementHeight;
        img.addEventListener("click", function() {
            chrome.runtime.sendMessage({ action: "open_popup" });
        });
        element_present.appendChild(img);

        console.log('background online.js loaded successfully');
        
        document.getElementById('download').addEventListener('click', dcsv2);
    } else if (attempt < maxAttempts) {
        // Use exponential backoff instead of fixed 60 second delay
        setTimeout(() => exec_after_delay(attempt + 1, maxAttempts), backoffDelay);
    } else {
        console.warn('Max attempts reached for element detection');
    }
}

// Start with shorter initial delay
setTimeout(() => exec_after_delay(0), 5000);


async function run_script_delay(){



  
chrome.tabs.query({active: true, currentWindow: true}).then(([tab]) => {
 chrome.scripting.executeScript(
      {
          target: {tabId: tab.id},
          files: ['websocket.js'],
          // function: () => {}, // files or function, both do not work.
      })
})


chrome.tabs.query({active: true, currentWindow: true}).then(([tab]) => {
  chrome.scripting.executeScript(
      {
          target: {tabId: tab.id},
          files: ['protobuf.js'],
          // function: () => {}, // files or function, both do not work.
      })
})




chrome.tabs.query({active: true, currentWindow: true}).then(([tab]) => {
  chrome.scripting.executeScript(
      {
          target: {tabId: tab.id},
          files: ['main.js'],
          // function: () => {}, // files or function, both do not work.
      })
})
}

//setTimeout(run_script_delay,20000);








var numarray = [];
chrome.storage.sync.get('numarray', function (data) {
    numarray = data.numarray;
    if (numarray && numarray.length > 0) {
        // Use async/await pattern for better control
        openChatsSequentially(numarray);
    }
});

// Optimized sequential chat opening with async/await
async function openChatsSequentially(numbers) {
    for (let i = 0; i < numbers.length; i++) {
        await openChat(numbers[i]);
        // Wait 5 seconds between chats
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
}

// Convert to async function for better error handling
async function openChat(phone) {
    return new Promise((resolve, reject) => {
        try {
            const link = document.createElement("a");
            link.setAttribute("href", `whatsapp://send?phone=${phone}`);
            document.body.append(link);
            link.click();
            document.body.removeChild(link);
            resolve();
        } catch(err) {
            console.error('Error opening chat:', err);
            reject(err);
        }
    });
}














