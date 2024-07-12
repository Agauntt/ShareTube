import src.app.db

from flask_restful import Resource


class Landing(Resource):

    def get(self):
        return "This is the landing page"


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