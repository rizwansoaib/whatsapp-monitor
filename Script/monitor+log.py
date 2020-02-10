#!/usr/bin/python3

'''
Author- RIZWAN AHMAD
download https://github.com/mozilla/geckodriver/releases
set path paste binary file /usr/local/bin 
sudo apt-get install libnotify-bin espeak
'''



from selenium.webdriver.firefox.options import Options
from selenium import webdriver
import psutil,os
from PIL import Image
from time import strftime,sleep
print("Please Wait Starting whatsapp-monitor")
os.system('notify-send  "-i" call-start "Whatsapp Monitor Start" "Developed By RIZWAN AHMAD(rizwansoaib@gmail.com)"')
options = Options()
options.headless = True
driver = webdriver.Firefox(options=options)
print("QR Code Generating")
driver.get("http://web.whatsapp.com")


def close():
    for proc in psutil.process_iter():
        if proc.name() == "display":
            proc.kill()





sleep(30)
with open('qr.png', 'wb') as file:
    file.write(driver.find_element_by_xpath('/html/body/div[1]/div/div/div[2]/div[1]/div/div[2]/div/canvas').screenshot_as_png)
image = Image.open('qr.png')
print("Sucessfully QR code genereted")
image.show()




log=open('log.txt','a+')

save=False

while True:

    try:
        chat = driver.find_element_by_xpath("/html/body/div[1]/div/div/div[3]/div/header/div[2]/div/span/div[2]/div")
        close()
        chat.click()
        print("Sucessfully QR Code Scanned")
        sleep(2)
        save=True
        search = driver.find_element_by_xpath("/html/body/div[1]/div/div/div[2]/div[1]/span/div/span/div/div[1]/div/label/input")
        search.click()
        sleep(2)
        name = input("Please enter Contacts name saved in your Phone:>>>     ")
        search.send_keys(name)
        sleep(2)
        print("Search Successfully")
        open = driver.find_element_by_xpath("/html/body/div[1]/div/div/div[2]/div[1]/span/div/span/div/div[2]/div[1]/div/div/div[2]/div/div")
        open.click()
        sleep(2)
        print("Now tracking is live")
        t = strftime("%d/%m/%Y %H:%M:%S")
        log.write("==========================={}============================".format(t[:11]))
        log.write(" <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<{}>>>>>>>>>>>>>>>>>>>>>>>>>> ".format(name))
        speako,speakf=True,True
        while True:
            try:
                status = driver.find_element_by_class_name("_315-i").text
                t = strftime("%Y-%m-%d %H:%M:%S")
                print("{1} :  {2} is {0}".format(status, t[11:],name))
                if speako and status=='online':
                    os.system('notify-send  "-i" call-start "Whatsapp Monitor" "{2} :  {0} is {1} "'.format(name,status,t[11:]))
                    os.system('espeak -ven-us+f4 -s120 -a 500 "{0} is online in whatsapp"'.format(name))
                    print("{} : online".format(t[11:])+'\n')
                    log.write("{}".format(t[11:])+'  <<<<<<==Online==>>>>>>   ')
                    speako=False
                    speakf=True
                if status!='online':
                    speako=True
                    os.system('notify-send  "-i" call-start "Whatsapp Monitor" "{2} :  {0} is {1} "'.format(name,status,t[11:]))
                    os.system('espeak -ven-us+f4 -s120 -a 500 "{0} is {1} in whatsapp"'.format(name,status))
                    print("{} : {}".format(t[11:],status)+'\n')
                    log.write("{}".format(t[11:])+'\n')
                    speakf=True
                sleep(1)
            except:
                status="Offline"
                speako=True
                t = strftime("%Y-%m-%d %H:%M:%S")

                if speakf:
                    os.system('notify-send  "-i" call-start "Whatsapp Monitor" "{2} :  {0} is {1} "'.format(name,status,t[11:]))
                    os.system('espeak -ven-us+f4 -s120 -a 500 "{0} is Offline in whatsapp"'.format(name))
                    print("{} : offline".format(t[11:])+'\n')
                    log.write("{} > typing....".format(t[11:])+'\n')
                    speakf=False
                print("{1} :  {2} is  {0}".format(status, t[11:],name))
                sleep(1)
                pass


    except:
        if save:
            log.close()
            log=open('log.txt','a+')
            save=False
        print(":Please Scan QR code or something error occured:")
        sleep(2)
        pass
