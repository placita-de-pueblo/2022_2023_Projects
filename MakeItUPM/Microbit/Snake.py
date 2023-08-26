# Imports go at the top
from microbit import *
import random

snake = [(2,2)]
lastMovement = "right"
score = 0
apple = [0,0]
state = "beginning"

def pintarSnake(s):
    display.clear()
    for elemento in s:
        display.set_pixel(elemento[0], elemento[1],9)

def nuevaManzana():
    global apple, snake
    x = random.randint(0,4)
    y = random.randint(0,4)
    for elemento in snake:
        if elemento[0]==x and elemento[1]==y:
           x = random.randint(0,4)
           y = random.randint(0,4)     
    apple = [x,y]
 
def pintarManzana(manzana):
    display.set_pixel(manzana[0], manzana[1],9)
        
def moverSnake(s, pos):
    global nuevaSnake,state
    if(state=="playing"):
        nuevaSnake = [pos]
        s.pop(len(s)-1)
        for elemento in s:
            nuevaSnake.append(elemento)
    elif(state=="eating"):
        nuevaSnake = [pos]
        for elemento in s:
            nuevaSnake.append(elemento)
        state = "playing"
    return nuevaSnake
                
def checkCollisionsAndDraw():
    #colisiones
    global snake, lastMovement, posX, posY, score, apple, state
    if posX >= 0 and posX <= 4 and posY >= 0 and posY <= 4:
        if snake[0][0] == apple[0] and snake[0][1] == apple[1]:
            score += 1
            nuevaManzana()
            state = "eating"
        snake = moverSnake(snake, (posX, posY))
        pintarSnake(snake)
        pintarManzana(apple)
    else:
        state = "dead"
        
def checkMovement():
    global snake, lastMovement, posX, posY, score, apple, state
    #si a la derecha
    if accelerometer.get_x()>300:
        if lastMovement != "left":
            posX = snake[0][0] + 1
            posY = snake[0][1]
            lastMovement = "right"
            if (posX, posY) in snake:
                print("dead")
                state = "dead"
            else:
                print("alive")
                checkCollisionsAndDraw()
    #si a la izquierda
    elif accelerometer.get_x()<-300:
        if lastMovement != "right":
            posX = snake[0][0] - 1
            posY = snake[0][1]
            lastMovement = "left"
            if (posX, posY) in snake:
                print("dead")
                state = "dead"
            else:
                print("alive")
                checkCollisionsAndDraw()
    #si arriba
    elif accelerometer.get_y()<-300:
        if lastMovement != "down":
            posX = snake[0][0]
            posY = snake[0][1] - 1
            lastMovement = "up"
            if (posX, posY) in snake:
                print("dead")
                state = "dead"
            else:
                print("alive")
                checkCollisionsAndDraw()           
    #si abajo
    elif accelerometer.get_y()>300:
        if lastMovement != "up":
            posX = snake[0][0]
            posY = snake[0][1] + 1
            lastMovement = "down"
            if (posX, posY) in snake:
                print("dead")
                state = "dead"
            else:
                print("alive")
                checkCollisionsAndDraw()
    else:
        if lastMovement == "right":
            posX = snake[0][0] + 1
            posY = snake[0][1]
            lastMovement = "right"
            if (posX, posY) in snake:
                print("dead")
                state = "dead"
            else:
                print("alive")
                checkCollisionsAndDraw()
        elif lastMovement== "left":
            posX = snake[0][0] - 1
            posY = snake[0][1]
            lastMovement = "left"
            if (posX, posY) in snake:
                print("dead")
                state = "dead"
            else:
                print("alive")
                checkCollisionsAndDraw()
        elif lastMovement == "up":
            posX = snake[0][0]
            posY = snake[0][1] - 1
            lastMovement = "up"
            if (posX, posY) in snake:
                print("dead")
                state = "dead"
            else:
                print("alive")
                checkCollisionsAndDraw()
        elif lastMovement == "down":
            posX = snake[0][0]
            posY = snake[0][1] + 1
            lastMovement = "down"
            if (posX, posY) in snake:
                print("dead")
                state = "dead"
            else:
                print("alive")
                checkCollisionsAndDraw()
    

while True:
    if state == "beginning":
        pintarSnake(snake)
        pintarManzana(apple)
        state = "playing"
    elif state == "playing":
        checkMovement()
        sleep(800)
    elif state == "dead":
        display.scroll("Game Over")
        display.scroll(score)
        if button_a.was_pressed() or button_b.was_pressed():
            snake = [(2,2)]
            score = 0
            state = "beginning"
    elif len(snake) == 25:
        display.scroll("You win!")
    