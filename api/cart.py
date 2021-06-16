'''
In this file, we have all the functions related to items:
- Display items in cart
- Add items to cart
- Remove items in cart
- etc...

'''
# Imports you will be using:
import string
import json
import global_funcs
from items import displayItems, findById

# Get a cart for a certain user: 
def getCartItems(u_id):
    # Get all items in cart from database:
    globalCart = global_funcs.global_cartItems()
    cartItems = []
    for user in globalCart:
        if user['u_id'] == u_id:
        	cartItems = user['cart']
    # Return them
    return cartItems

def addCartItems(u_id, itemId):
    globalCart = global_funcs.global_cartItems()
    found = False
    for user in globalCart:
        if user['u_id'] == u_id:
            found = True
            cartItems = user['cart']
            # If the item already exists in cart
            for item in cartItems:
                if item['itemId'] == itemId:
                    # Increase quantity 
                    item['quantity'] += 1
                    global_funcs.save_cart(globalCart)
                    return 
            # If item doesnt exist in cart
            globalItems = displayItems()
            # Find our item from global item list
            for item in globalItems:
                if item['id'] == itemId:
                    # Add to our cart
                    newItem = {
                        "itemId": item['id'], 
                        "itemName": item['name'], 
                        "quantity": 1, 
                        "price": item['price'], 
                        "img": item['image']
                    }
                    cartItems.append(newItem)
    if not found: 
        globalItems = displayItems()

        item = findById(itemId, globalItems)
        newCart = {"u_id": u_id, "cart": [{
                        "itemId": item['id'], 
                        "itemName": item['name'], 
                        "quantity": 1, 
                        "price": item['price'], 
                        "img": item['image']
                    }]}
        globalCart.append(newCart)

    global_funcs.save_cart(globalCart)
    return

def decreaseCartItemQuantity(u_id, itemId):
    globalCart = global_funcs.global_cartItems()
    for user in globalCart:
        if user['u_id'] == u_id:
            cartItems = user['cart']
            # If the item already exists in cart
            for item in cartItems:
                if item['itemId'] == itemId:
                    # If theres only 1 item quantity in the cart, delete the whole instance
                    if item['quantity'] == 1:
                        res = [i for i in cartItems if not (i['itemId'] == itemId)]
                        user['cart'] = res
                    else: 
                        item['quantity'] -= 1
                    global_funcs.save_cart(globalCart)
                    return 
                
def removeCartItems(u_id, itemId):
    globalCart = global_funcs.global_cartItems()
    for user in globalCart:
        if user['u_id'] == u_id:
            cartItems = user['cart']
            # If the item already exists in cart
            res = [i for i in cartItems if not (i['itemId'] == itemId)]
            user['cart'] = res
            global_funcs.save_cart(globalCart)
            return 

def deleteCart(u_id):
    globalCart = global_funcs.global_cartItems()
    res = [i for i in globalCart if not (i['u_id'] == u_id)]
    globalCart = res 
    global_funcs.save_cart(globalCart)
    return     

# Purchase history for a user
def checkoutHistory(u_id):
    cartItems = getCartItems(u_id)
    users = global_users()
    for user in users:
        if user['u_id'] == u_id:
            if "purchase_history" not in user:
                user['purchase_history'] = cartItems
            else:
                user['purchase_history'].append(cartItems)
    return
    