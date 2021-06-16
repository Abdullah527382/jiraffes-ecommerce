from json import dumps
from flask import (
    Flask,
    request,
    render_template,
    send_from_directory,
    session,
    redirect, 
    url_for, 
    flash,
    jsonify
    )
from auth import user_login, user_sign_up

from items import (displayItems, addItem, removeItem, editItem, findById, addRecScore, 
removeRecScore, searchItem, showHistory, removeUserSearchHistory, addReview, addUserMessage, returnAdminUserMessages)

from cart import (getCartItems, addCartItems, decreaseCartItemQuantity, removeCartItems, deleteCart)


app = Flask(__name__)
app.secret_key = 'secret_jiraffes_key'

#TO-DO: Implement a token system for generating user_ids and item_ids


@app.route("/api/signup", methods =['GET', 'POST'])
def signup():
    error=None
    # Get the request sent from the frontend and retrieve individual fields
    if request.method == 'POST':
        isAdmin=False

        req = request.get_json(force=True)
        first_name = req.get('first_name', None)
        last_name = req.get('last_name', None)
        email = req.get('email', None)
        password = req.get('password', None)

        # Initialize an empty cart for a user
        cart = []

        if password == 'admin123':
            isAdmin=True
        # Now we check our login function from auth
        try: 
            u_id = user_sign_up(email, password, first_name, last_name)
            if (u_id > 0):
                
                return jsonify({
                    "first_name": first_name,
                    "last_name": last_name, 
                    "admin" : isAdmin,
                    "key" : u_id,
                    "cart": cart
                })
        except Exception as e: 
            error = str(e)
        return jsonify({
            "error": error
        })
    return jsonify({
        "error": error
    })

@app.route("/api/login", methods =['GET', 'POST'])
def login():
    error=None
    # Using the front end request object we can extract email and password
    if request.method == 'POST':

        req = request.get_json(force=True)
        email = req.get('email', None)
        password = req.get('password', None)
        isAdmin = False
        if password == 'admin123':
            isAdmin=True
        # Now we check our login function from auth
        try: 
            (u_id, first_name, last_name) = user_login(email, password)
            if (u_id > 0):
                # Get the cart associated with the user
                cart = getCartItems(u_id)
                return jsonify({
                    "first_name": first_name, 
                    "last_name": last_name, 
                    "admin" : isAdmin,
                    "key" : u_id,
                    "cart": cart
                })
                # Return any errors we face to the front end
        except Exception as e: 
            error = str(e)
        return jsonify({
            "error": error
        })
    return jsonify({
        "error": error
    })

#For product page
@app.route("/api/items", methods=['GET', 'POST'])
def displayAllItems():
    return dumps(displayItems())

# Admin can add an item to the itemsList
@app.route("/api/items/add", methods=['POST'])
def addSingleItem():
    error = None
    if request.method == 'POST':
        req = request.get_json(force=True)                

        try:
            # The req itself is an item object, send it to the appropriate func
            addItem(req)
        
        # Return any errors we face to the front end
        except Exception as e: 
            error = str(e)
        return jsonify({
        "error": error
    })
    return ""

@app.route("/api/items/edit", methods=['POST'])
def editSingleItem():
    error = None
    if request.method == 'POST':
        req = request.get_json(force=True)   
        # Also gives an id   
        uId = req['userId']
        # Remove that field from req 
        del req['userId']
        try:
            # edit the item given the user if and item itself
            editItem(req, uId)
        except Exception as e: 
            error = str(e)
        return jsonify({
        "error": error
    })
    return jsonify({
        "error": error
    })

@app.route("/api/item/remove", methods=['POST'])
def removeSingleItem():
    error=None
    if request.method == 'POST':
        # Get the request object
        req = request.get_json(force=True)
        itemId = req.get('itemId', None)
        try:
            # Try removing the item given its
            removeItem(itemId)
        
        # Return any errors we face to the front end
        except Exception as e: 
            error = str(e)
        return jsonify({
        "error": error
    })
    return jsonify({
        "error": error
    })

@app.route("/api/item/recommend", methods=['POST'])
def recommendProduct():
    if request.method == 'POST':
        req = request.get_json(force=True)
        itemId = req.get('itemId', None)
        # Change an items recommendation score
        addRecScore(itemId, 1)
        return ""
    return ""

@app.route("/api/cart/item/decrease", methods=['POST'])
def decreaseItem():
    if request.method == 'POST':
        req = request.get_json(force=True)
        u_id = req.get('u_id', None)
        itemId = req.get('itemId', None)
        # Lower an item's quantity in the cart
        decreaseCartItemQuantity(u_id, itemId)
    return ""

@app.route("/api/cart/item/add", methods=['POST'])
def addItemToCart():
    if request.method == 'POST':
        req = request.get_json(force=True)
        u_id = req.get('u_id', None)
        itemId = req.get('itemId', None)
        # Add the item to the specific user's cart
        addCartItems(u_id, itemId)
    return ""

@app.route("/api/cart/item/remove", methods=['POST'])
def removeItemFromCart():
    if request.method == 'POST':
        req = request.get_json(force=True)
        u_id = req.get('u_id', None)
        itemId = req.get('itemId', None)
        # Remove the specific item from a user's cart
        removeCartItems(u_id, itemId)
    return ""

@app.route("/api/cart", methods=['POST'])
def showCartItems():
    if request.method == 'POST':
        req = request.get_json(force=True)
        u_id = req.get('u_id', None)
        # We retrieve all the user's cart items
        cart = getCartItems(u_id)
        return dumps(cart)

@app.route("/api/cart/delete", methods=['POST'])
def deleteWholeCart():
    if request.method == 'POST':
        req = request.get_json(force=True)
        u_id = req.get('u_id', None)
        # We delete the cart from existence, done when payment is processed
        deleteCart(u_id)
        return ""

@app.route("/api/user/search/add", methods =['GET', 'POST'])
def addUserSearch():
    if request.method == 'POST':
        req = request.get_json(force=True)
        # Below returns the search history of u_id
        history = searchItem(req)
        return dumps(history)
    return ""

@app.route("/api/user/search/erase", methods=['GET', 'POST'])
def eraseUserHistory():
    if request.method == 'POST':
        req = request.get_json(force=True)
        u_id = req.get('u_id', None)
        # Erase user search history
        removeUserSearchHistory(u_id)
    return ""

@app.route("/api/user/search/history", methods =['GET', 'POST'])
def showUserHistory():
    #Display user search history
    if request.method == 'POST':
        req = request.get_json(force=True)
        u_id = req.get('u_id', None)
        return dumps(showHistory(u_id))

@app.route("/api/cart/item/reviewadd", methods=['POST'])
def reviewAdd():
    # Given a bunch of fields, we add this to a users info and display them according to the item
    if request.method == 'POST':
        req = request.get_json(force=True)
        review = req.get('review', None)
        rating = req.get('rating', None)
        u_id = req.get('u_id', None)
        itemId = req.get('itemId', None)
        firstName = req.get('firstName')
        sentence = review + "(!+A)" + str(rating) + "(!+A)" + firstName + "(!+A)" + str(u_id)
        addReview(itemId, u_id, sentence)
    return ""

@app.route("/api/item/userMessage", methods=['POST'])
def userMessageAdd():
    # The message sent to the admin by a user (feedback)
    if request.method == 'POST':
        req = request.get_json(force=True)
        addUserMessage(req)
    return ""

@app.route("/api/item/showuseradminmessage", methods =['GET', 'POST'])
def showUserAdminMessages():
    # Just a list of messages for an admin sent by different users
    return dumps(returnAdminUserMessages())

@app.route("/user/purchase", methods =['GET', 'POST'])
def purchase():
    # purchase field gets updated
    if request.method == 'POST':
        req = request.get_json(force=True)
        purchaseCart = req.get('cart', None)
        uId = req.get('uId', None)
    return ""

if __name__ == '__main__':
    app.run(debug=True)
