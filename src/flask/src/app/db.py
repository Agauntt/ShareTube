import os, sys
import configparser
import time

from pprint import pprint
from pymongo import MongoClient
from bson import ObjectId


# pprint(sys.path)
config = configparser.ConfigParser()
config.read(r'C:\Coding\ShareTube\config\db_config.ini')

MONGODB_URI = config.get('CONNECTION', 'DB_URI')
client = MongoClient(MONGODB_URI)
db = client['app_users']
app_users = db['app_user']
media = db['media_metadata']


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
    app_user['_id'] = str(app_user['_id'])
    print('FETCH BY USERNAME')
    print(app_user)
    if app_user is not None:
        return app_user
    print("User not found")
    return app_user
    


def fetch_app_user_by_uid(app_users, id):
    print("in fetch_by_uid function")
    app_user = app_users.find_one({"_id": ObjectId(id)})
    app_user['_id'] = str(app_user['_id'])
    print('FETCH BY ID')
    print(app_user)
    return app_user


def fetch_img_by_mid(media_metadata, mid):
    print("Fetch img by ID function")
    img = media_metadata.find_one({"_id": ObjectId(mid), "type": "IMG"})
    img['_id'] = str(img['_id'])
    print(img)
    return img


def fetch_imgs_by_uid(media_metadata, uid):
    print("Fetch all img paths owned by uid")
    imgs = media_metadata.find_all({"owner": uid, "type": "IMG"})
    for img in imgs:
        img['_id'] = str(img['_id'])
    print(imgs)
    return imgs


def fetch_all_media_by_uid(media_metadata, uid):
    print("fetching all media owned by uid from DB")
    all_media = media_metadata.find_all("owner", uid)
    for media in all_media:
        media['_id'] = str(media['_id'])


def upload_media_metadata(media_metadata, media:dict):
    print("Uploading media metadata")
    print(media)
    ret_val = media_metadata.insert_one({
        'filename': media.get('filename', 'DEFAULT_FILENAME'),
        'owner': media.get('owner', 'DEFAULT_FILE_OWNER'),
        'type': media.get('type', 'IMG'),
        'path': media.get('path', ''),
        'visible': media.get('visible', False),
        'timestamp': media.get('timestamp', time.time())
    }).inserted_id
    # TODO - move all this into a config file
    path_base = r'C://Coding/ShareTube/'
    uri = 'data/media/images/' if media.get('type') == 'IMG' else 'data/media/video/'
    hosted_path = path_base + uri + str(ret_val)
    print(hosted_path)
    ret = {'id': str(ret_val), 'path': hosted_path}
    print(ret_val)
    print(ret)
    return str(ret)

    


