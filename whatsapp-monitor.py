#! /usr/bin/python3


'''
Author- RIZWAN AHMAD

download https://github.com/mozilla/geckodriver/releases

set path paste binary file /usr/local/bin 

sudo apt-get install libnotify-bin

'''


from selenium import webdriver
import os


driver = webdriver.Firefox()
driver.get("http://web.whatsapp.com")
print("Started when your friend will be online you will get notification Please open chat window of friend")
os.system('notify-send  "-i" call-start "Whatsapp Monitor Start" "Developed By RIZWAN AHMAD(rizwansoaib@gmail.com)"')



def offline(title):
    while True:
        title = driver.find_element_by_class_name("_315-i")
        if title.text=='typing...':
            typing=title.text
            user = driver.find_element_by_class_name("_19RFN")
            name=user.text
            os.system('notify-send  "-i" call-start "Whatsapp Monitor" "{0}  {1} "'.format(name,typing))
            continue


        elif title.text!='online' and title.text!='typing...':
            user = driver.find_element_by_class_name("_19RFN")
            name=user.text
            offline=title.text
            os.system('notify-send  "-i" call-start "Whatsapp Monitor" "{0}  {1} "'.format(name,offline))
            
            online(title)


        else:
            continue


def online(title):

    title = driver.find_element_by_class_name("_315-i")

    while title.text!='online':
        continue

    if title.text=='online':
        try:
            title = driver.find_element_by_class_name("_315-i")
            user = driver.find_element_by_class_name("_19RFN")
            name=user.text
            os.system('notify-send  "-i" call-start "Whatsapp Monitor" "{0} is online now"'.format(name))
            offline(title)

            

        except:
            pass

        
     
        

while True:

    try:
        title = driver.find_element_by_class_name("_315-i")
        online(title)

    except:
        pass


        

