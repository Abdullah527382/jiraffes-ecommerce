'''
Functions which test the backend item related functions, 
'''
from items import (displayItems, addItem, editItem)

def test_display_items():
    return displayItems()

def test_add_item():
    item = {
        "name": "Fridge",
        "price": 125, 
        "quantity": 10,
        "keywords": [],
        "image": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.birite.com.au%2Fwp-content%2Fuploads%2FTeco-TFF210WNTBM-210L-Top-Mount-White-Fridge-Main.jpg&imgrefurl=https%3A%2F%2Fwww.birite.com.au%2Fproduct%2Fteco-tff210wntcm-210l-top-mount-white-fridge%2F&tbnid=O_LkPURb2O9CeM&vet=12ahUKEwiY1paiq9DvAhVMeSsKHSrABBgQMygBegUIARCgAw..i&docid=URdPPiO1a6tXNM&w=700&h=550&q=fridge&ved=2ahUKEwiY1paiq9DvAhVMeSsKHSrABBgQMygBegUIARCgAw"
    }
    addItem(item)

def test_edit_item():
    
    editItem(item)

if __name__ == '__main__':
    print(test_add_item())