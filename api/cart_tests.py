from cart import (addCartItems, decreaseCartItemQuantity, removeCartItems)

def test_add_cart_items(u_id, itemId):
    # Add a windproof umbrella to user 1's shopping cart
    # (u_id, itemId)
    addCartItems(u_id, itemId)

def test_decrease_quantity(u_id, itemId):
    # (u_id, itemId)
    decreaseCartItemQuantity(u_id, itemId)

def test_deleteItem(u_id, itemId):
    # (u_id, itemId)
    removeCartItems(u_id, itemId)

# def test_cart_existing_item():
#     addCartItems()

if __name__ == '__main__':
    #test_cart_items()
    test_decrease_quantity(1, 2)