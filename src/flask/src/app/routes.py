from src.app.db import *
from flask import request, jsonify
from flask_restful import Resource, reqparse
from pprint import pprint


parser = reqparse.RequestParser()
parser.add_argument('user')
parser.add_argument('uid')

class Landing(Resource):

    def get(self):
        return "This is the landing page"


class Login(Resource):

    def get(self, user_id):
        user = fetch_app_user_by_uid(app_users, user_id)
        print(jsonify(user))
        return jsonify(user)


    def post(self):
        user = request.get_json()
        ret = fetch_app_user_by_uname(app_users, user['username'], user['password'])
        print(type(ret))
        if ret is not None:
            print('user found')
            x = str(ret.get('_id', 1))
            return x
        return '1'
            

class Home(Resource):

    def get(self, user_id):
        user = fetch_app_user_by_uid(app_users, user_id)
        print(jsonify(user))
        return jsonify(user)


    def post(self):
        pass


class SignUp(Resource):

    def get(self):
        pass


    def post(self):
        print('Posted user data')
        user = request.get_json()
        user_id = insert_app_user(app_users, user)
        pprint(user_id)
        return user_id


class GetUser(Resource):

    def get(self, uid):
        print("getting user by ID")
        print(uid)
        user = fetch_app_user_by_uid(app_users, uid)
        print(jsonify(user))
        return jsonify(user)
    

class UploadMedia(Resource):

    def post(self):
        media_metadata = request.get_json()
        print("Uploading media")
        print(media_metadata)
        ret_val = upload_media_metadata(media, media_metadata)
        return ret_val


class userMedia(Resource):

    def get(self, uid):
        print("getting all media owned by uid")
        print(f"ID: {uid}")
        media = fetch_all_media_by_uid(media, uid)
        return jsonify(media)
