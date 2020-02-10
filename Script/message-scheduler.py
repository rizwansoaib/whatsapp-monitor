#!/usr/bin/python3

'''
Author- RIZWAN AHMAD
download https://github.com/mozilla/geckodriver/releases
set path paste binary file /usr/local/bin 
sudo apt-get install libnotify-bin 
'''



from selenium.webdriver.firefox.options import Options
from selenium import webdriver
import psutil,os
from PIL import Image
from time import strftime,sleep
print("Please Wait Starting whatsapp-scheduler")
os.system('notify-send  "-i" call-start "Whatsapp message scheduler Start" "Developed By RIZWAN AHMAD(rizwansoaib@gmail.com)"')
options = Options()
options.headless = True
driver = webdriver.Firefox(options=options)
driver.get("http://web.whatsapp.com")


def close():
    for proc in psutil.process_iter():
        if proc.name() == "display":
            proc.kill()



def sendnow(name,message):
	try:
		print("Processing name > {}".format(name))
		search = driver.find_element_by_xpath("/html/body/div[1]/div/div/div[2]/div[1]/span/div/span/div/div[1]/div/label/input")
		search.click()
		sleep(2)
		search.send_keys(name)
		sleep(2)
		print("Search Successfully")
		open = driver.find_element_by_xpath("/html/body/div[1]/div/div/div[2]/div[1]/span/div/span/div/div[2]/div[1]/div/div/div[2]/div/div")
		open.click()
		sleep(2)
		type = driver.find_element_by_xpath("/html/body/div[1]/div/div/div[4]/div/footer/div[1]/div[2]/div/div[2]")
		send = driver.find_element_by_xpath("/html/body/div[1]/div/div/div[4]/div/footer/div[1]/div[3]")
		type.send_keys(message)
		send.click()
		print("Successfully Send to {}".format(name))
	except:
		pass



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
		break
	except:
		pass






name=input("Enter Contacts Name: ")
message=input("Enter Message: ")
ct=strftime("%Y-%m-%d %H:%M:%S")
t=input("Enter Time hr:min > {}  ||  ".format(ct[11:16]))



while True:
	ct=strftime("%Y-%m-%d %H:%M:%S")
	if int(ct[11:13])==int(t[:2]) and int(ct[14:16])==int(t[3:]):
		try:
			print("sending now your messages:")
			sendnow(name,message)
			break
		except:
			print("something error occured:")
			pass
	
	sleep(30)
	print("Time remaining > {}:{}".format(int(t[:2])-int(ct[11:13]),int(t[3:])-int(ct[14:16])))
	
	


