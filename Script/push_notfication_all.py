#!/usr/bin/python3
'''
Author- RIZWAN AHMAD
download https://github.com/mozilla/geckodriver/releases
set path paste binary file /usr/local/bin 
sudo apt-get install libnotify-bin espeak
print(notify.register()) for registration first time or "notify-run register" cmd
'''



from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os
from time import strftime,sleep
from notify_run import Notify
print("Please Wait Starting whatsapp-monitor")
options = Options()
notify = Notify()
current_path=os.getcwd()
files=os.listdir()
if 'profile' in files:
    options.add_argument("--headless")


options.add_argument("user-data-dir={}/profile/".format(current_path))
driver = webdriver.Chrome(options=options)
driver.get("http://web.whatsapp.com")


while True:

    try:
        chat = driver.find_element_by_xpath("/html/body/div[1]/div/div/div[3]/div/header/div[2]/div/span/div[2]/div")
        chat.click()
        print("Connected to Whatsapp Server")
        sleep(2)
        save=True
        search = driver.find_element_by_xpath("/html/body/div[1]/div/div/div[2]/div[1]/span/div/span/div/div[1]/div/label/input")
        search.click()
        sleep(2)
        name = "RIZWAN"
        search.send_keys(name)
        sleep(2)
        open = driver.find_element_by_xpath("/html/body/div[1]/div/div/div[2]/div[1]/span/div/span/div/div[2]/div[1]/div/div/div[2]/div/div")
        open.click()
        sleep(2)
        print("Now tracking is live")
        t = strftime("%d/%m/%Y %H:%M:%S")
        speako,speakf=True,True
        while True:
            try:
                status = driver.find_element_by_class_name("_315-i").text
                t = strftime("%Y-%m-%d %H:%M:%S")
                print("{1} :  {2} is {0}".format(status, t[11:],name))
                if speako and status=='online':
                    print("{} : online".format(t[11:])+'\n')
                    os.system('notify-send  "-i" call-start "Whatsapp Monitor" "{2} :  {0} is {1} "'.format(name,status,t[11:]))
                    notify.send('📱 '+name+' is online 📱 ')
                    speako=False
                    speakf=True
                if status!='online':
                    speako=True
                    os.system('notify-send  "-i" call-start "Whatsapp Monitor" "{2} :  {0} is {1} "'.format(name,status,t[11:]))
                    notify.send('📴 {} is {} 📴 '.format(name,status))
                    print("{} : {}".format(t[11:],status)+'\n')
                    speakf=True
                sleep(1)
            except:
                status="Offline"
                speako=True
                t = strftime("%Y-%m-%d %H:%M:%S")

                if speakf:
                	os.system('notify-send  "-i" call-start "Whatsapp Monitor" "{2} :  {0} is {1} "'.format(name,status,t[11:]))
                    notify.send('📴 {} is {} 📴 '.format(name,status))
                    print("{} : offline".format(t[11:])+'\n')
                    speakf=False
                print("{1} :  {2} is  {0}".format(status, t[11:],name))
                sleep(1)
                pass


    except:
        print("Please open whatsapp in your phone")
        print("Connecting to Whatsapp Server.",end="")
        for i in range(30):
            sleep(0.5)
            print('.',end="")
        print()
        pass
