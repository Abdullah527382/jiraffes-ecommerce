'''
Place all of our global functions here. We require these quite frequently
'''

import json

def load_file(filename):
    """Load a file with data in it"""
    with open(f'data/{filename}.json', 'r') as data_file:
        data = json.load(data_file)
        return data


def global_users():
    '''
    Return our list of users
    '''
    return load_file('usersInfo')['usersInfo']

def store_data(data, filename):
    """
    Stores the data into the given file
    """
    with open(f'data/{filename}.json', 'w') as data_file:
        json.dump(data, data_file)


def save_users(users):
    """
    Stores data into the usersList.json file
    """
    data = {
        'usersInfo': users
    }
    store_data(data, 'usersInfo')

def save_cart(cart):
    data = {
        'cartItemsList': cart
    }
    store_data(data, 'cartItemsList')

def global_items():
    '''
    Return our list of items
    '''
    return load_file('itemsList')['itemsList']

def global_cartItems():
    """
    Return list of cart items
    """
    return load_file('cartItemsList')['cartItemsList']

def global_addItem(items):
    '''
    Add a new correctly-formatted item to the items JSON
    '''
    data = {
        'itemsList': items
    }
    store_data(data, 'itemsList')

def  global_removeItem(itemId):
    '''
    Removes an item with matching name from the items JSON
    '''
    
    # More of a primitive approach to the removeItem function, still works
    with open(f'data/itemsList.json','r+') as list_file:
        data = json.load(list_file)     
        for i in data['itemslist']:
            if i['id'] == itemId:
                data['itemslist'].Remove(i)
                break
        list_file.write(data)
    return

def global_addSearch(searches):
    '''
    Add a new correctly-formatted item to the items JSON
    '''

    data = {
        'searchHistory': searches
    }
    store_data(data, 'searchHistory')

def global_searchHistory():
    '''
    Return our list of searchHistory
    '''
    return load_file('searchHistory')['searchHistory']

def global_user_messages():
    '''
    Return our list of messages to admin
    '''
    return load_file('userMessages')['userMessages']

def save_user_messages(messages):
    data = {
        'userMessages': messages
    }
    store_data(data, 'userMessages')
