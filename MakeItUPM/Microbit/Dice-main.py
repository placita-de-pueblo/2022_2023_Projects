# Imports go at the top
from microbit import *
import random
showedNumber = 0

# Code in a 'while True:' loop repeats forever
while True:
    if button_a.was_pressed():
        number = random.randint(1,6)
        while number == showedNumber:
            number = random.randint(1,6)
        showedNumber = number
        display.show(number)
    
    