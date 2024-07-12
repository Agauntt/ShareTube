import src.app.db

from flask import Flask
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)


class Login(Resource):

    def get(self):
        return "At the login Screen"


    def post(self):
        return "Attempting to log in..."


class Home(Resource):

    def get(self):
        return "Fetch Home page data"


    def post(self):
        pass