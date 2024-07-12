import os, sys
import configparser

from pprint import pprint
from pymongo import MongoClient

# pprint(sys.path)
pprint(sys.argv)

config = configparser.ConfigParser()
config.read('db_config.ini')

print(config.sections())

MONGODB_URI = config.get('CONNECTION', 'DB_URI')
print(MONGODB_URI)
client = MongoClient(MONGODB_URI)


for db_info in client.list_database_names():
    print(db_info)


db = client['app_users']
collections = db.list_collection_names()
for collection in collections:
   print(collection)
