#! /usr/bin/python3

'''
Author- RIZWAN AHMAD

download https://github.com/mozilla/geckodriver/releases

set path paste binary file /usr/local/bin 

sudo apt-get install libnotify-bin espeak

'''

from selenium import webdriver
import os
import time
driver = webdriver.Firefox()
driver.get("http://web.whatsapp.com")
os.system('notify-send  "-i" call-start "Whatsapp Monitor Start" "Developed By RIZWAN AHMAD(rizwansoaib@gmail.com)"')
name=input("Please Enter Name for search online status: ")

while True:

    try:
        chat=driver.find_element_by_xpath("/html/body/div[1]/div/div/div[3]/div/header/div[2]/div/span/div[2]/div")
        chat.click()
        time.sleep(2)
        search=driver.find_element_by_xpath("/html/body/div[1]/div/div/div[2]/div[1]/span/div/span/div/div[1]/div/label/input")
        search.click()
        time.sleep(2)
        search.send_keys(name)
        time.sleep(2)
        open=driver.find_element_by_xpath("/html/body/div[1]/div/div/div[2]/div[1]/span/div/span/div/div[2]/div[1]/div/div/div[2]/div/div")
        open.click()
        time.sleep(2)


        while True:
            try:
                status = driver.find_element_by_class_name("_315-i").text
                name = driver.find_element_by_class_name("_19vo_").text
                os.system('notify-send  "-i" call-start "Whatsapp Monitor" "{0}  {1} "'.format(name,status))
                # -v=language en-us, f= 1 to 5 for male m ,s= speed,a= volume
                os.system('espeak -ven-us+f4 -s140 -a 500 "{0} has {1}  in whatsapp"'.format(name,status))
                print("{0} {1}".format(name,status))
                time.sleep(55)
            except:
                pass


    except:
            pass


            

