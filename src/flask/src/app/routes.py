from src.app.db import *
from flask import request, jsonify
from flask_restful import Resource, reqparse
from pprint import pprint


parser = reqparse.RequestParser()
parser.add_argument('user')

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
            print(type(x))
            print(x)
            return x
        return '1'
            
        


class Home(Resource):

    def get(self):
        return "Fetch Home page data"


    def post(self):
        pass


class SignUp(Resource):

    def get(self):
        pass


    def post(self):
        print('Posted user data')
        user = request.get_json()
        insert_app_user(app_users, user)
        pprint(user)
        