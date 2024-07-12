from src.app.db import *
from src.app.routes import Home, Login, Landing
from flask import Flask
from flask_restful import Api, Resource


app = Flask(__name__)
api = Api(app)


class Test(Resource):

    def get(self):
        return f"app running..."
    

api.add_resource(Landing, '/')
api.add_resource(Home, '/home')
api.add_resource(Login, '/login')
api.add_resource(Test, '/testing')

if __name__ == '__main__':
    app.run(port=8000, debug=True)

# def start_app():
#     return api