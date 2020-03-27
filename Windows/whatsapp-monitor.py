import tkinter as tk
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os,sys
from PIL import ImageTk, Image
from time import sleep,strftime
from datetime import datetime
from notify_run import Notify
import tkinter.messagebox as tmsg
notify=Notify()
from threading import Thread
from playsound import playsound

user=os.getlogin()






# --- functions ---

def quit():
    sys.exit()


def monitor():
    th = Thread(target=start)
    th.start()



def noti_url():
    global user
    try:
        with open('C:\\Users\\{}\\.config\\notify-run'.format(user)) as f:
            notify_url="http:"+list(f)[0].split(":")[2][:-2:]
    except:
        pass
    return notify_url



def about():
    msg='''
    
              Developed By RIZWAN AHMAD
    
    http://github.com/rizwansoaib/whatsapp-monitor/
    
    '''
    a=tmsg.showinfo("About Whatsapp Monitor",msg)



def show_url():
    notify_url=noti_url()
    tmsg.showinfo("Notification url Link", notify_url)


def noti_active():
    global is_noti
    is_noti=True
def new_url():
    a=notify.register()
    tmsg.showinfo("Successfully Generated", "Success")
    

def on_open():
    global driver
    global current_path

    if not driver:
        options = Options()
        options.add_argument("user-data-dir={}/profile/".format(current_path))
        driver = webdriver.Chrome(executable_path=current_path+"/chromedriver.exe",options=options)
        driver.get("http://web.whatsapp.com")


def start():
    global driver,root,current_path,show_status,name,panel,history,is_noti,f
    curr_name = driver.find_element_by_class_name("_3XrHh").text
    name.config(text=curr_name)
    name.update_idletasks()
    try:
        img_path=driver.find_element_by_xpath('/html/body/div[1]/div/div/div[4]/div/header/div[1]/div/img')
        src = img_path.get_attribute('src')
        driver.execute_script('''window.open("''' +src + '''","_blank");''')
        driver.switch_to.window(driver.window_handles[1])
        driver.save_screenshot("pro.png")
        driver.execute_script('''window.close();''')
        driver.switch_to.window(driver.window_handles[0])
    except:
        pass

    img_path = current_path + '/pro.png'
    image = Image.open(img_path)
    width, height = image.size
    image = image.resize((round(180 / height * width), round(280)))
    img = ImageTk.PhotoImage(image)
    panel.configure(image=img)
    panel.pack(padx=20)
    panel.image = img
    updateo, updatef = True, True


    ut=True
    i=0
    while True:
        sleep(1)
        try:
            status = driver.find_element_by_xpath('//*[@id="main"]/header/div[2]/div[2]/span').text
            t = strftime("%Y-%m-%d %H:%M:%S")
            print("{1} :  {2} is {0}".format(status, t[11:], curr_name))

            if status=='online':
                show_status.config(text=' ONLINE ',fg='green')
                show_status.update_idletasks()
                sleep(1)
                show_status.config(text='                  ', fg='white')
                show_status.update_idletasks()
                if ut:
                    pt=datetime.now()
                    ut=False
                if updateo:
                    print("{} : online".format(t[11:]) + '\n')
                    if is_noti:notify.send('📱 ' + curr_name + ' is online 📱 ')
                    playsound('beep.mp3')
                    history.insert(0,"{} 📱  {} is Online".format(t[11:],curr_name) )
                    history.itemconfig(0, {'fg': 'green'})
                    updateo = False
                    updatef = True
                continue



            else:
                show_status.config(text=' OFFLINE ',fg='red')
                show_status.update_idletasks()
                updateo = True
                if updatef:
                    if is_noti:notify.send('📱 ' + curr_name + ' is offline 📱 ')
                    history.insert(0, "{} 📱  {} is Offline".format(t[11:],curr_name))
                    history.itemconfig(0, {'fg': 'red'})
                    updatef = False


        except:
            updateo = True
            show_status.config(text=' OFFLINE ', fg='red')
            show_status.update_idletasks()
            t = strftime("%Y-%m-%d %H:%M:%S")
            if not ut:
                ct = datetime.now()
                history.insert(0,"{} 📱  duration of online".format(str(ct-pt)[:-7]))
                ut=True

            if updatef:
                if is_noti:notify.send('📱 ' + curr_name + ' is offline 📱 ')
                history.insert(0, "{} 📱  {} is Offline".format(t[11:], curr_name))
                history.itemconfig(0, {'fg': 'red'})

                updatef=False
            pass

# --- main ---

#notify url

is_noti=False




#driver
driver = None
current_path = os.getcwd()
root = tk.Tk()
root.geometry("880x620")
root.title('Whatsapp Monitor')
root.config(background='white')
root.wm_iconbitmap()





#link



#Frames bottom=Graph,top=Button,right=Pic&status
bf=tk.Frame(root,bg="red",borderwidth=1)
bf.pack(side='bottom',fill='y')

tf=tk.Frame(root,bg="white",relief='sunken')
tf.pack(side='top',fill='y')




rf=tk.Frame(root,bg="",borderwidth=1)
rf.pack(side='right',fill='y',pady=100)

mf=tk.Frame(root,bg="white",borderwidth=1)
mf.pack(fill='y')





#profile pic
img_path=current_path+'/pro.png'
image=Image.open(img_path)
width, height = image.size
image = image.resize((round(180 / height * width), round(280)))
img = ImageTk.PhotoImage(image)
panel = tk.Label(rf, image = img)
#panel.place(x=0,y=0)
panel.pack(padx=20)



#name
name = tk.Label(rf,text="Name", fg='Black',bg='white',font="Helvetica 25 bold")
name.pack()

#status
show_status = tk.Label(rf,text="Status", fg='blue',bg='white',font="Helvetica 25 bold")
show_status.pack()







#Button in top frame
b = tk.Button(tf, text='Open WhatsApp Web', command=on_open)
b.pack()

b = tk.Button(tf, text='Start Monitor', command=monitor)
b.pack()



#Real Time Graph
#graph = tk.Label(bf,text="GRAPH will be plot here", fg='Black',font="Helvetica 35 bold")
#graph.pack(padx=180,pady=40)

#history

lishis = tk.Label(mf,text="History Online :: Offline", fg='black',bg='white',font="Helvetica 15 bold")
lishis.pack(pady=10)
history = tk.Listbox(mf,height=50,width=60,font="Helvetica 20 bold")



history.pack(pady=0)







#Menu

mymenu=tk.Menu(root)
notimenu=tk.Menu(mymenu,tearoff=0)
mymenu.add_cascade(label="Notification",menu=notimenu)
mymenu.add_command(label="About",command=about)
mymenu.add_command(label="Exit",command=quit)

notimenu.add_command(label="Show url",command=show_url)
notimenu.add_separator()
notimenu.add_command(label="Generate url",command=new_url)
notimenu.add_command(label="Activate",command=noti_active)
root.config(menu=mymenu)


root.mainloop()
