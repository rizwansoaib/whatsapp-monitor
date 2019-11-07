# INSTALL


sudo nano /etc/apt/sources.list.d/google-chrome.list
paste deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main
sudo apt-key add linux_signing_key.pub
sudo apt update
sudo apt install google-chrome-stable
google-chrome --version



wget https://chromedriver.storage.googleapis.com/78.0.3904.70/chromedriver_linux64.zip
unzip chromedriver_linux64.zip 
sudo mv chromedriver /usr/bin/


pip3 install selenium notify_run --user



upload whatsapp.zip that contain profile+python script
scp -i rizwan.pem whatsapp.zip ubuntu@ec2-52-207-136-37.compute-1.amazonaws.com:/home/ubuntu/



notify-run register and subscribe from url 
