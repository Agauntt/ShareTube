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
    app_users.insert_one({
    'first_name': user.get('first_name', 'DEFAULT_FIRST_NAME'),
    'last_name': user.get('last_name', 'DEFAULT_LAST_NAME'),
    'is_admin': user.get('is_admin', False),
    'is_active': user.get('is_active', True),
    'pfp_id': user.get('pfp_id', 'DEFAULT_PFP')
    })


def remove_app_user(app_users, user_id):
    pass
