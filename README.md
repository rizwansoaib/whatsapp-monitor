
[![forthebadge made-with-python](http://ForTheBadge.com/images/badges/made-with-python.svg)](https://www.python.org/) 
[![star this repo](http://githubbadges.com/star.svg?user=rizwansoaib&repo=whatsapp-monitor)](https://github.com/rizwansoaib/whatsapp-monitor)
[![fork this repo](http://githubbadges.com/fork.svg?user=rizwansoaib&repo=whatsapp-monitor)](http://github.com/rizwansoaib/whatsapp-monitor/fork)
[![HitCount](http://hits.dwyl.io/rizwansoaib/whatsapp-monitor.svg)](http://hits.dwyl.io/rizwansoaib/whatsapp-monitor)


# Whatsapp Monitor

When your crush be online on Whatsapp get notification in your Desktop and voice notification and  in smartphone notification without any installed app.

[Windows Desktop App](https://github.com/rizwansoaib/whatsapp-monitor/tree/master/Windows)

## Use Case:

* When your girlfriend or boyfriend become online get notification and history of online-offline
* Compare two people history and predict whether coversation(chat) had done between them or not [ if both will be online same time and close Whatsapp within 1-3 minute difference ]
* Get notification when two people become online at same time
* Parents uses to track your child when child gone for bed in night or whether whole night chatting with someone
* Message Scheduler option adding soon with GUI
* Send same messages multiple times

# Windows
* Tkinter based GUI Desktop App released Beta Version install setup and find issue and report

  [Click here for more details](https://github.com/rizwansoaib/whatsapp-monitor/tree/master/Windows)


# Video 
 ## Linux
   [![video](https://user-images.githubusercontent.com/29729380/59044166-4296d380-889b-11e9-9848-7f6b97d75f63.png)](https://youtu.be/3Xo45yhncwg)


# Requirements
     geckodriver or chromedriver                    :- Automation Driver
     pip3 install selenium                          :- Automation Library
     sudo apt-get install libnotify-bin             :- Ubuntu Notification
     sudo apt-get install espeak                    :- Voice Notification
     pip3 install pillow                            :- Image Library 
     pip3 install notify_run                        :- Cross Platform Notification
     
     
Download geckodriver [Click here](https://github.com/mozilla/geckodriver/releases)
paste binary file in directory /usr/local/bin/ 


Download Chrome Webdriver [Click here](https://chromedriver.chromium.org/downloads)
paste chromedriver binary file in directory /usr/bin/ 

# Architecture
![overall](/DeployAWS/arc%20-%201.jpg)
![architecture](/DeployAWS/architecture.jpg)

# Installation

 Open Terminal and run-

         sudo apt install libnotify-bin espeak 
         git clone https://github.com/rizwansoaib/whatsapp-monitor.git
         cd whatsapp-monitor
         pip3 install -r requirements.txt
         chmod +x script_name
         ./script_name
         

Enjoy Now you will get notification when your friend be Online.
  


## Smartphone Notification
  Successfully Tested on Android
    
   [Click for more](https://github.com/rizwansoaib/whatsapp-monitor/tree/master/DeployAWS)
  ![mobile](/DeployAWS/noti.png)
  
## Desktop Notification
Successfully Tested on Ubuntu 18.04
   ![online](https://user-images.githubusercontent.com/29729380/59040056-96052380-8893-11e9-8ea4-318a2d0d2404.png)
  
   ![typing](https://user-images.githubusercontent.com/29729380/59040073-9d2c3180-8893-11e9-9260-81375c316437.png)
   
## Contributions
<a href="https://github.com/rizwansoaib/whatsapp-monitor/issues"> Issues </a>
and <a href ="https://github.com/rizwansoaib/whatsapp-monitor/pulls"> Pull
requests </a> are most welcome.
   
   
## License
As of November 2019 Whatsapp-Monitor is Licensed under the Private License: [Read License](/LICENSE)

## Terms and conditions
* You will NOT use this software for marketing purposes and commercial usage allow only for self usage.
* We reserve the right to block any user of this repository that does not meet these conditions.

## Legal
   This code is in no way affiliated with, authorized, maintained, sponsored or endorsed by WhatsApp or any of its affiliates or subsidiaries. This is an independent and unofficial code. Use at your own risk.
   
## FAQ (Frequently Asked Question)
**Question:**  QR code is showing but in my phone not scanned successfully?

**Answer:** Change your Default Image Viewer Image Background should be White not in black you can use Magisk image Viewer.



## Author:
## <a href="https://www.linkedin.com/in/rizwansoaib/">RIZWAN AHMAD</a>
rizwan.178208@knit.ac.in

Feel free to mail me for any queries.
 
# Donation
If this project help you , you can give me a cup of coffee :) 

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.me/rizwansoaib)
