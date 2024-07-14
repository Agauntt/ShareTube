import os, sys
import configparser

from pprint import pprint
from pymongo import MongoClient


# pprint(sys.path)
config = configparser.ConfigParser()
config.read(r'C:\Coding\ShareTube\config\db_config.ini')

MONGODB_URI = config.get('CONNECTION', 'DB_URI')
client = MongoClient(MONGODB_URI)
db = client['app_users']
app_users = db['app_user']


def insert_app_user(app_users, user:dict):
    ret_val = app_users.insert_one({
    'username': user.get('username', 'DEFAULT_USERNAME'),
    'password': user.get('password', ''),
    'first_name': user.get('first_name', 'DEFAULT_FIRST_NAME'),
    'last_name': user.get('last_name', 'DEFAULT_LAST_NAME'),
    'is_admin': user.get('is_admin', False),
    'is_active': user.get('is_active', True),
    'pfp_id': user.get('pfp_id', 'DEFAULT_PFP')
    })
    user['_id'] = str(ret_val.inserted_id)
    return user['_id']


def remove_app_user(app_users, user_id):
    pass


def fetch_app_user_by_uname(app_users, user, pswd):
    print("USERNAME & PW")
    print(user)
    print(pswd)
    app_user = app_users.find_one({"username": user, "password": pswd})
    print('FETCH BY USERNAME')
    print(app_user)
    if app_user is not None:
        return app_user
    print("User not found")
    return app_user
    


def fetch_app_user_by_uid(app_users, id):
    app_user = app_users.find_one({"_id": id})
    print('FETCH BY ID')
    print(app_user)
    return app_user

