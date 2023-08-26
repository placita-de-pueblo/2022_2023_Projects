# Imports go at the top
from microbit import *
number = 6

# Code in a 'while True:' loop repeats forever
display.show(number)
while True:
    if button_b.was_pressed():
        number += 1
        display.show(number)
    elif button_a.was_pressed():
        number -= 1
        display.show(number)
        
