#! /usr/bin/python3


'''


Under Developement Please dont trust this script...

accuracy is very low..


'''



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
    file.write(driver.find_element_by_xpath('/html/body/div[1]/div/div/div[2]/div[1]/div/div[2]/div/canvas').screenshot_as_png)

name1=input("Please Enter First Person Name : ")
name2=input("Please Enter Second Person Name : ")

ot={name1:"60:00",name2:"50:30"}

check=False



def track(name):
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
		status = driver.find_element_by_class_name("_315-i").text
		t=strftime("%Y-%m-%d %H:%M:%S")
		if status=='online' or status=='typing...':
			ot[name]=t[11:-3]
		print("{1} :  {0}".format(status,t[11:-3]))
	except:
		pass


while True:
	print("Name: {0}".format(name1))
	track(name1)
	sleep(20)
	print("Name: {0}".format(name2))
	track(name2)
	sleep(20)
	h1,m1=int(ot[name1][:2]),int(ot[name1][3:])
	h2,m2=int(ot[name2][:2]),int(ot[name2][3:])
	if h1-h2==0 and abs(m1-m2)<3:
		check=True
		ct=str(min(h1,h2))+":"+str(min(m1,m2))
		per=100-(20*abs(m1-m2))

	if check:
		print("{0}% chances are there chat among {1} and {2} at {3}".format(per,name1,name2,ct))

