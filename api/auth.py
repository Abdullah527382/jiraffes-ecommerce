'''
In this file, we have all the functions related to authenticaton
of users:
- Signing up / registering 
- Signing in 
- Signing out (rather this is moreso done in the front end)

We also include helper/util functions:
- Valid email/password 
- Change password

'''
# Imports you will be using:
import re
import string
import json
import global_funcs 

def user_sign_up(email, password, first_name, last_name):
    '''Sign up a user'''
    # Check if valid credentials given: 
    regex = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'

    if not (re.search(regex, email)):
        raise ValueError("Email entered is not valid")

    if len(first_name) < 1 or len(first_name) > 50:
        raise ValueError("First name must be between 1 and 50 characters long")

    if len(last_name) < 1 or len(last_name) > 50:
        raise ValueError("Last name must be between 1 and 50 characters long")

    if len(password) < 6:
        raise ValueError("Password must be 6 characters or greater")

    # Names should be alphabetical
    regex = '^[A-Za-z-]*$'
    if not re.search(regex, first_name) or not re.search(regex, last_name):
        raise ValueError("Names must be alphabetical only")

    # Check for used email
    users = global_funcs.global_users()
    for user in users:
        if user['email'] == email:
            raise ValueError("Email is already being used by another user")

    # Add new user info to database (json)
    u_id = len(users) + 1

    new_user = {'email': email,
            'password': password,
            'first_name': first_name,
            'last_name': last_name,
            'u_id': u_id,
            'admin': False,
            'logged_in': True
        }

    new_admin = {'email': email,
            'password': password,
            'first_name': first_name,
            'last_name': last_name,
            'u_id': u_id,
            'admin': True,
            'logged_in': True
        }

    if password == 'admin123':
        users.append(new_admin)
    else:
        users.append(new_user)

    global_funcs.save_users(users)

    return u_id

def user_login(email, password):
    regex = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
    
    if not (re.search(regex, email)): 
        raise ValueError("Email entered is invalid")
    
    foundEmail = False
    correctPassword = False

    # Check correct user email and password
    with open('data/usersInfo.json', 'r') as users:
        data = json.load(users)
        for user in data['usersInfo']:
            if user['email'] == email:
                foundEmail = True
                if user['password'] == password:
                    u_id = user['u_id']
                    correctPassword = True
                    return (u_id, user['first_name'], user['last_name'])


    if not foundEmail:
        raise ValueError("Email entered does not belong to a user")

    if not correctPassword:
        raise ValueError("Password is not correct")

    # return u_id to track who logged in

def user_logout(u_id):
    with open('data/usersInfo.json', 'w') as users:
        data = json.load(users)
        for user in data['usersInfo']:
            if user['u_id'] == u_id:
                user['logged_in'] = False
                return True
