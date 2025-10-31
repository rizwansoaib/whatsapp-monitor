
//console.log('main.js working')



// Memoize sanitized strings to avoid repeated regex operations
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






// Cache DOM element references to avoid repeated queries
let cachedElements = {
    username: null,
    start: null,
    stop: null,
    duration: null,
    lastUpdate: 0
};

function updateCachedElements() {
    try {
        cachedElements.username = document.getElementById('usernamebtn');
        cachedElements.start = document.getElementById('startbtn');
        cachedElements.stop = document.getElementById('stopbtn');
        cachedElements.duration = document.getElementById('durbtn');
    } catch(err) {
        // Elements not ready yet
    }
}

// Use MutationObserver instead of polling for better performance
const targetNode = document.body;
const observerConfig = { childList: true, subtree: true };

const observer = new MutationObserver(function(mutations) {
    // Throttle to prevent excessive calls
    const now = Date.now();
    if (now - cachedElements.lastUpdate < 2000) {
        return;
    }
    cachedElements.lastUpdate = now;
    
    try {
        // Update cached elements if needed
        if (!cachedElements.username || !cachedElements.start || 
            !cachedElements.stop || !cachedElements.duration) {
            updateCachedElements();
        }
        
        // Check if all elements exist and have valid values
        if (cachedElements.username && cachedElements.start && 
            cachedElements.stop && cachedElements.duration) {
            const uname = cachedElements.username.innerHTML;
            const t1 = cachedElements.start.innerHTML;
            const t2 = cachedElements.stop.innerHTML;
            const t = cachedElements.duration.innerHTML;
            
            if (uname !== 'null' && t1 !== 'null' && t2 !== 'null' && t !== 'null') {
                save(uname, t1, t2, t);
            }
        }
    } catch(err) {
        // Silently handle errors
    }
});

// Start observing
if (targetNode) {
    observer.observe(targetNode, observerConfig);
}

// Initial cache update
updateCachedElements();