#! /usr/bin/python3


from selenium.webdriver.firefox.options import Options
from selenium import webdriver
import os
import sys
from time import strftime,sleep
options = Options()
options.headless = True
options.add_argument("user-data-dir="+os.path.dirname(sys.argv[0]))
driver = webdriver.Firefox(options=options)
driver.get("http://web.whatsapp.com")
with open('qr.png', 'wb') as file:
    file.write(driver.find_element_by_xpath('/html/body/div[1]/div/div/div[2]/div[1]/div/div[2]/div/img').screenshot_as_png)
name=input("Please Enter Name for search online status: ")

while True:

    try:
        chat=driver.find_element_by_xpath("/html/body/div[1]/div/div/div[3]/div/header/div[2]/div/span/div[2]/div")
        chat.click()
        sleep(2)
        search=driver.find_element_by_xpath("/html/body/div[1]/div/div/div[2]/div[1]/span/div/span/div/div[1]/div/label/input")
        search.click()
        sleep(2)
        search.send_keys(name)
        sleep(2)
        open=driver.find_element_by_xpath("/html/body/div[1]/div/div/div[2]/div[1]/span/div/span/div/div[2]/div[1]/div/div/div[2]/div/div")
        open.click()
        sleep(2)


        while True:
            try:
                status = driver.find_element_by_class_name("_315-i").text
                t=strftime("%Y-%m-%d %H:%M:%S")
                print("{1} :  {0}".format(status,t[11:-3]))
                sleep(55)
            except:
                pass


    except:
            pass


            

