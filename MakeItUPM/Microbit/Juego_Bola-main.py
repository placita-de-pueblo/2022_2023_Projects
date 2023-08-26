# Imports go at the top
from microbit import *
posX = 2
posY = 2
display.set_pixel(posX,posY,9)


def showBall():
    display.clear()
    display.set_pixel(posX,posY,9)

def checkPosition():
    global posX, posY
    if accelerometer.get_x()>300:
        if posX<4:
            posX+=1
    elif accelerometer.get_x()<-300:
        if posX>0:
            posX-=1
    if accelerometer.get_y()>300:
        if posY<4:
            posY+=1
    elif accelerometer.get_y()<-300:
        if posY>0:
            posY-=1

while True:
    checkPosition()
    showBall()
    sleep(400)



    
  
