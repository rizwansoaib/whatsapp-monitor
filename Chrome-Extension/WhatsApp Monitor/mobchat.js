
var openChat = phone => {
  var link = document.createElement("a");
  link.setAttribute("href", `whatsapp://send?phone=${phone}`);
  document.body.append(link);
  link.click();
  document.body.removeChild(link);
};

var mob=""
chrome.storage.local.get('mob', function (result4) {
        mob = result4.mob;

        if(mob!="")
        openChat(mob);

            
    });
