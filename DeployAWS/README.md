# Deploy on AWS [support is over]
## Architecture
### AWS
![architecture](https://user-images.githubusercontent.com/29729380/74177725-51baf600-4c60-11ea-8cbe-99be93961cd5.jpg)
### Complete

![overall](https://user-images.githubusercontent.com/29729380/74177712-4bc51500-4c60-11ea-819d-8951bbdcdea3.jpg)

#### 1. Developer Setup
  * A Desktop 24/7 with internet Connectivity or use Cloud(AWS/GCP/DigitalOcean etc.)
  * Smartphone with whatsapp installed
#### 2. User
  * Smartphone or Desktop with internet
  * Victim Whatsapp Contact Number Whose want to track user
  
### Notification
        notify-run register
  Run command from terminal and send user to subcribe notification from given link.
  User can subcribed many devices and able to see log from that url
     



###### Let's Deploy this Script on AWS EC2 instances before deploy please setup in local first to save your Session Whatsapp data first run this script in local change your contact name in given script. To setup local follow same method (Skip 4th step) but atleast run local only one time for building profile (Save Whatsapp Session).

## 1. Install Chrome 
     sudo nano /etc/apt/sources.list.d/google-chrome.list
     paste deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main
     sudo apt-key add linux_signing_key.pub
     sudo apt update
     sudo apt install google-chrome-stable
     google-chrome --version


## 2. Install ChromeDriver
    wget https://chromedriver.storage.googleapis.com/78.0.3904.70/chromedriver_linux64.zip
    unzip chromedriver_linux64.zip 
    sudo mv chromedriver /usr/bin/

## 3. Install Requirements
      pip3 install selenium notify_run --user

## 4. Upload Your Session and Script to Instance
  it's contain aws.py and please setup in local first to save your Session Whatsapp data first run this script in local and change your contact name in given script. and zip all folder 
  
            scp -i {pem file path} {all_file.zip} {ubuntu@your_instance_address}:/home/ubuntu/

## 5. Register Push Notification

     notify-run register 
   Subscribe from url 
     
## 6. Run Script aws.py

![androidnoti](https://user-images.githubusercontent.com/29729380/74177679-3fd95300-4c60-11ea-8d84-1efc188c1119.png)


 
# Donation
If this project help you , you can give me a cup of coffee :) 

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.me/rizwansoaib)

       
