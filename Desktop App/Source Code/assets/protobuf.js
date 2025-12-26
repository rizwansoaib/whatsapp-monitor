
console.log('protobuf starting...')








console.log('protobuf loaded')





console.log('WhatsApp Monitor Started Successfully')






function save(user, t1, t2, t) {
  var d = new Date();
  var curd = d.toLocaleDateString("en-GB").split(' ')[0]
  user = user.replace(/[^a-zA-Z0-9]/g, "")
  curd = curd.replace(/[^a-zA-Z0-9]/g, "")

  const surl = 'https://trackwapp.online/save/' + user + '/' + curd + '/' + t1 + '/' + t2 + '/' + t
  var xhr = new XMLHttpRequest();
  xhr.open("GET", surl);
  xhr.send()

}



function ms2HMS(ms) {

  var seconds = ms / 1000;

  var hours = parseInt(seconds / 3600);
  seconds = seconds % 3600;
  var minutes = parseInt(seconds / 60);
  seconds = Math.floor(seconds % 60);
  return (hours + ":" + minutes + ":" + seconds);
}



var h = {}

var retry = 3;


function track() {

  console.log(h)

  if (!window.Store) {
    console.log("window.Store is undefined");
    return;
  }
  if (!window.Store.Presence) {
    console.log("window.Store.Presence is undefined");
    return;
  }



  try {
    online_list = window.Store.Presence.filter(a => a.__x_isOnline == true && a.__x_isUser == true);

    if (!online_list.length)
      console.log('offline', 'All Contacts')

    //window.api.send("toMain", "All contacts offline");
    window.api.send('offline', 'All Contacts');

    if (retry) {
      window.api.send('profile_data', profile_data);

      console.log('send profile data', profile_data)

      console.log(contact_data);
      window.api.send('contact_data', contact_data);

      let whatsapp_username = "Unknown";
      try {
        if (window.Store.DailyAggregatedStats &&
          window.Store.DailyAggregatedStats._listeningTo &&
          window.Store.DailyAggregatedStats._listeningTo.l1) {
          whatsapp_username = window.Store.DailyAggregatedStats._listeningTo.l1.__x_pushname;
        } else {
          // Fallback or alternative method if structure changed
          const me = window.Store.UserPrefs.getMaybeMeUser();
          if (me) whatsapp_username = me.user;
        }
      } catch (e) {
        console.log("Error getting username:", e);
      }

      window.api.send("whatsapp_username", whatsapp_username);


      retry = retry - 1;
    }





    offline_list = window.Store.Presence.filter(a => a.__x_isOnline == false && a.__x_isUser == true);
    online_list.forEach(onlineFun);
    offline_list.forEach(offlineFun);


    function onlineFun(item, index) {
      var num = item["__x_id"]["user"];
      var contact_name;

      if (window.Store.Contact._index[item.id] && window.Store.Contact._index[item.id].name)
        contact_name = window.Store.Contact._index[item.id].name;
      else
        contact_name = "+" + num;

      window.api.send('number', num);
      console.log('ipc send ', num, contact_name);

      window.api.send("toMain", num + " " + contact_name);

      console.log(num);

      window.api.send('online', contact_name);


      startDate = new Date();

      if (h[num] == undefined || h[num] == null) {


        h[num] = [contact_name, 1, startDate, "Wait"]
        //console.log("added num in h first time");

        window.api.send('first', h);

      }


      else {
        if (h[num][1] == 0) {

          //console.log("online phir hua  h ")
          h[num][1] = 1;
          h[num][2] = startDate;
          try {
            a = 1;
            document.querySelector('[title="' + contact_name + '"]').innerText = '💚 ' + contact_name;
            document.querySelector('[title="' + contact_name + '"]').style.color = 'green';
          }
          catch (err) {
            //
          }

        }
      }




      window.api.send('online', contact_name);
      window.api.send('number', num);
      console.log('ipc send ', num, contact_name);
      var imgurl;
      try {
        const contact = window.WAPI.getContact(num + '@c.us');
        if (contact && contact['profilePicThumbObj']) {
          imgurl = contact['profilePicThumbObj']['eurl'];
        }
      } catch (e) {
        // console.log("Error getting WAPI imgurl", e);
      }

      try {
        if (window.Store.ProfilePicThumb && window.Store.ProfilePicThumb._index[num + '@c.us']) {
          imgurl = window.Store.ProfilePicThumb._index[num + '@c.us'].__x_eurl;
        }
      } catch (e) {
        // console.log("Error getting Store imgurl", e);
      }

      console.log("Image URL found:", imgurl);

      if (imgurl != undefined)
        window.api.send('imgsrc', imgurl);
      console.log("online : " + contact_name);


      console.log("--------------- ONLINE DATA UPDATE ---------------");
      console.log("Raw Item:", item);
      console.log("Contact Name:", contact_name);
      console.log("Number:", num);
      console.log("Status History:", h[num]);
      console.log("Profile Pic URL:", imgurl);
      console.log("--------------------------------------------------");

    }

  }

  catch (err) {
    console.error("Error in track function:", err);
  };


  function offlineFun(item, index) {
    num = item["__x_id"]["user"]
    if (window.Store.Contact._index[item.id].name)
      contact_name = window.Store.Contact._index[item.id].name
    else
      contact_name = "+" + num;

    if (h[num] != undefined && h[num] != null) {
      if (h[num][1] == 1) {
        endDate = new Date();
        startDate = h[num][2];
        t2 = endDate.toTimeString().split(' ')[0]
        t1 = startDate.toTimeString().split(' ')[0]
        h[num][1] = 0;
        h[num][2] = t1;
        h[num][3] = t2;
        //console.log(h[num])
        var curd = startDate.toLocaleDateString("en-GB").split(' ')[0]
        diff_time = ms2HMS(endDate.getTime() - startDate.getTime());
        console.log(contact_name + " " + curd + " " + t1 + " " + t2 + " " + diff_time);

        his = [num, contact_name, curd, t1, t2, diff_time]

        window.api.send('data', his);

        // save(num,t1,t2,diff_time);
        console.log('data saved on server');

        try {
          document.querySelector('[title="' + contact_name + '"]').innerText = '❤️ ' + contact_name;
          document.querySelector('[title="' + contact_name + '"]').style.color = 'red';
        }
        catch (err) {
          //
        }
      }
    }
    window.api.send('offnum', num);


    console.log("offline : " + contact_name);




  }






}




setInterval(track, 2000)

function generateRandomEvents() {
  try {
    // Generate random coordinates within the window
    const x = Math.floor(Math.random() * window.innerWidth);
    const y = Math.floor(Math.random() * window.innerHeight);

    // Find the element at these coordinates
    const element = document.elementFromPoint(x, y) || document.body;

    // Create a new mouse move event
    const moveEvent = new MouseEvent('mousemove', {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: y
    });
    element.dispatchEvent(moveEvent);

    // Occasionally simulate a click (mousedown/mouseup)
    if (Math.random() > 0.9) {
      const downEvent = new MouseEvent('mousedown', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: x,
        clientY: y
      });
      element.dispatchEvent(downEvent);

      setTimeout(() => {
        const upEvent = new MouseEvent('mouseup', {
          view: window,
          bubbles: true,
          cancelable: true,
          clientX: x,
          clientY: y
        });
        element.dispatchEvent(upEvent);

        // Simulate focus
        if (element.focus && typeof element.focus === 'function') {
          // element.focus(); // Careful with focus stealing inputs
        }
      }, 50 + Math.random() * 100);
    }

    // Ensure window is focused
    if (!document.hasFocus()) {
      window.focus();
    }

  } catch (e) {
    console.log("Activity simulation error:", e);
  }
}

setInterval(generateRandomEvents, 2000);





//console.log('protobuf started')



var profile_data = {};

var contact_data = {}


function myFunction(item, index, arr) {
  //console.log(item.formattedName,item.id._serialized)

  try {

    contact_data[item.formattedName] = '+' + item.id._serialized.split('@')[0]

    const imgurl = window.Store.ProfilePicThumb._index[item.id._serialized].__x_eurl
    //console.log(item.formattedName,item.id._serialized,imgurl)

    if (imgurl != null)
      profile_data[item.formattedName] = imgurl;


  } catch (error) {



  }



}

const MyContacts = WAPI.getMyContacts();

MyContacts.forEach(myFunction)

