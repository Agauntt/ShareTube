from src.app.db import *
from src.app.routes import Home, Login, Landing, SignUp, GetUser, UploadMedia
from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource


app = Flask(__name__)
cors = CORS(app, resources='*')
api = Api(app)


class Test(Resource):

    def get(self):
        return f"app running..."
    

api.add_resource(Landing, '/')
api.add_resource(Home, '/home')
api.add_resource(Login, '/login')
api.add_resource(Test, '/testing')
api.add_resource(SignUp, '/signup')
api.add_resource(GetUser, '/getuser/<string:uid>')
api.add_resource(UploadMedia, '/upload/')


if __name__ == '__main__':
    app.run(port=8000, debug=True)
