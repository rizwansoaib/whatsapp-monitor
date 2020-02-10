#!/usr/bin/python3

'''
Author- RIZWAN AHMAD
download https://github.com/mozilla/geckodriver/releases
set path paste binary file /usr/local/bin 
sudo apt-get install libnotify-bin 





Please Dont't use it in spam messages.
'''



from selenium.webdriver.firefox.options import Options
from selenium import webdriver
import psutil,os
from PIL import Image
from time import strftime,sleep
print("Please Wait Starting whatsapp-bomber")
os.system('notify-send  "-i" call-start "Whatsapp bomber Start" "Developed By RIZWAN AHMAD(rizwansoaib@gmail.com)"')
options = Options()
options.headless = True
driver = webdriver.Firefox(options=options)
driver.get("http://web.whatsapp.com")


def close():
    for proc in psutil.process_iter():
        if proc.name() == "display":
            proc.kill()



print("QR Code Generating")
sleep(2)

with open('qr.png', 'wb') as file:
    file.write(driver.find_element_by_xpath('/html/body/div[1]/div/div/div[2]/div[1]/div/div[2]/div/canvas').screenshot_as_png)
image = Image.open('qr.png')
print("Sucessfully QR code genereted")
image.show()



while True:

    try:
        chat = driver.find_element_by_xpath("/html/body/div[1]/div/div/div[3]/div/header/div[2]/div/span/div[2]/div")
        close()
        chat.click()
        print("Sucessfully QR Code Scanned")
        sleep(2)
        search = driver.find_element_by_xpath("/html/body/div[1]/div/div/div[2]/div[1]/span/div/span/div/div[1]/div/label/input")
        search.click()
        sleep(2)
        name = input("Please enter Contacts name saved in your Phone:>>> ")
        search.send_keys(name)
        sleep(2)
        print("Search Successfully")
        open = driver.find_element_by_xpath("/html/body/div[1]/div/div/div[2]/div[1]/span/div/span/div/div[2]/div[1]/div/div/div[2]/div/div")
        open.click()
        sleep(2)
        n=int(input("Enter no. of messages don't more than 100 maybe whatsapp will suspend your account: "))
    
        message=input("Enter Your Messages: ")
        type = driver.find_element_by_xpath("/html/body/div[1]/div/div/div[4]/div/footer/div[1]/div[2]/div/div[2]")
        send = driver.find_element_by_xpath("/html/body/div[1]/div/div/div[4]/div/footer/div[1]/div[3]")
        for i in range(n):
        	type.send_keys(message)
        	send.click()
        	print(i+1,": Successfully Send")

    except:
        print(":Please Scan QR code or something error occured:")
        sleep(2)
        pass
