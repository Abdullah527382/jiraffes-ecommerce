'''
In this file, we have all the functions related to items:
- Display items
- Add items (check admin)
- Remove items (check admin)
- Edit items (check admin)
- Search items
- etc...
'''
'''
Items are formatted as a dictionary, like below:
item = {
    'name': string
    'id': int
    'price': float
    'quantity': int
    'keywords': list (of strings)
    'description': string
    'image': file path (string)
    'recscore': int
}
'''
'''
Search history is formatted like this:
{
    "searchHistory": [{
        "id": 1, 
        "History": []
    }, {
        "id": 2, 
        "History": []
    }]
}
'''

from global_funcs import global_addItem, global_items, global_removeItem, global_searchHistory, global_addSearch, global_users, save_users, global_user_messages, save_user_messages
import datetime

# Consider using the data from /data/itemsList and manipulate it
def displayItems():
    # Get all items from database:
    items = global_items()
    # Return them
    return items

def addItem(item):
    '''
    adds an item to the database if it doesn't already exist
    '''
    '''validate_admin(u_id)'''
            
    #check if an item with that ID already exists
    items = displayItems()

    # Error handling to the front end
    if not item['name']:
        raise ValueError("Item name can't be empty")

    if not item['image']:
        raise ValueError("Image link can't be empty")

    if not item['keywords']:
        raise ValueError("Keywords can't be empty")

    if not item['description']:
        raise ValueError("Description can't be empty")

    if int(item['price']) <= 0:
        raise ValueError("Price must be greater than 0")

    if int(item['quantity']) < 0:
        raise ValueError("Quantity must be greater than 0")
    
    # An item already exists like the one youre trying to create
    if item['id'] is None:
        if itemExists(item['name'], items):
            raise ValueError("Item already exists")
        item['id'] = generateItemId()

    items.append(item)
    global_addItem(items)
    
    return

def generateItemId():
    # Called every time we create a new item, + 1 from the prev max Id
    items = displayItems()
    maxId = 0
    for item in items: 
        if item["id"] > maxId:
            maxId = item["id"]
    #print(maxId)
    newId = maxId + 1
    return newId


def removeItem(itemId):
    '''
    removes an item by name from the database if it exists
    '''
    '''validate_admin(u_id)'''
    items = displayItems()
    # If the item already exists in cart 

    res = [i for i in items if not (i['id'] == itemId)]
    global_addItem(res)    
    return

# This is our function to compare 2 objects and determine what fields have changed, used in edit history
def changes(A, B):
    return {x: {'old': A[x], 'new': B[x]} for x in A if x in B and A[x] != B[x]}

def editItem(newItem, uId):
    
    # Get all the items which contain the one we need to edit
    items = displayItems()

    # Save the old item into some history list
    oldItem = findById(newItem['id'], items)

    removeItem(newItem['id'])
    addItem(newItem)

    # Save changed values of the old item and new item
    users = global_users()
    for user in users:
        if user['u_id'] == uId:
            changeObject = changes(oldItem, newItem)
            if not changeObject:
                raise ValueError("No edit made")
                return
            # Save the timestamp of the edit made
            now = datetime.datetime.now()
            changeObject["time"] = now.strftime('%Y-%m-%dT%H:%M:%S') + ('-%02d' % (now.microsecond / 10000))
            changeObject["id"] = newItem["id"]
            if "edit_history" not in user:
                user["edit_history"] = [changeObject]
            else:
                user["edit_history"].append(changeObject)
        
    save_users(users)
    return

# Find the appropriate item in the overall list
def findById(itemId, itemList):
    '''
    finds an item in a list by name (or returns None)
    '''
    for item in itemList:
        if item['id'] == itemId:
            return item
    return None

# Add the recommendation score value to an item
def addRecScore(itemId, amount):
    item = findById(itemId, global_items())
    if item == None:
        return
    # Add to the rec score of an item
    item['recscore'] += amount
    
    # Now we actually save the item 
    removeItem(itemId)
    addItem(item)
   
    return

# Remove points off an item
def removeRecScore(itemId, amount, u_id):
    addRecScore(itemId, -amount, u_id)

# Check if the item even exists
def itemExists(itemName, itemList):
    '''
    finds an item in a list by name (or returns False)
    '''
    for item in itemList:
        if item['name'] == itemName:
            return True
    return False

# Display user search history
def showHistory(u_id):
    searchHistory = global_searchHistory()
    for x in searchHistory:
        if int(u_id) == x['u_id']:
            return x['History']
    return

# Delete user search history
def removeUserSearchHistory(u_id):
    searchHistory = global_searchHistory()    
    res = [hist for hist in searchHistory if not (hist['u_id'] == u_id)]
    global_addSearch(res)
    return 

# Add a review to the list of reviews associated to an item
def addReview(itemId, u_id, review):
    items = displayItems()
    newItem = findById(itemId, items)
    test = 0
    # Check the reviews of the item first, cant spam reviews
    for x in range(0, len(newItem['reviews'])):
        sentence = newItem['reviews'][x].split("(!+A)")
        if int(sentence[3]) == u_id:
            test = 1
            newItem['reviews'][x] = review
            break
    if test == 0:
        newItem['reviews'].append(review)
    removeItem(itemId)
    addItem(newItem)
    return

# User message to the admin
def addUserMessage(message):
    messages = global_user_messages()
    messages.append(message)
    save_user_messages(messages)
    return

# Show the overall messages to an admin
def returnAdminUserMessages():
    return global_user_messages()
    
def searchItem(search):
    # Save searchQuery into searchHistory
    u_id = search['u_id']
    searchQuery = search['searchQuery']
    searchHistory = global_searchHistory()

    # We want to save the search item into a user's history
    for x in searchHistory:
        if int(u_id) == x['u_id']:
            if searchQuery in x['History']:
                x['History'].remove(searchQuery)
            x['History'].append(searchQuery)
            global_addSearch(searchHistory)
            return x['History']
        
    # IF we Didnt find a user's search history, make a new field:

    newSearchDict = {
        "u_id": u_id, 
        "History": [],
    }

    newSearchDict["History"].append(searchQuery)

    # Save the search history field
    searchHistory.append(newSearchDict)
    global_addSearch(searchHistory)
    return searchHistory[u_id]["History"]